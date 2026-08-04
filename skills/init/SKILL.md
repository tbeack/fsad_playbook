---
description: >
  Initialize a new project with a standard directory structure, template files, and a git repository.
  Use this skill whenever the user starts a new project, types /init, asks to "set up a new project",
  "initialize a repo", "scaffold a project", or wants to create the standard folder layout. Run once
  per project at the start of the work. Even if the user only mentions creating a repo or setting up
  folders, trigger this skill — it handles all of it in one shot.
---

# Project Init Skill

Sets up a new project in the current working directory: creates the standard folder structure, writes
template files for any that are missing, and initializes a local + remote git repository.

**Project name** is always taken from the current directory name — never ask for it.

---

## Step 1 — Establish project name

Use the Bash tool to run `pwd`, then take the last path segment (everything after the final `/`) as the project name. Store this as `PROJECT_NAME`. Use it to personalize template content where indicated below.

---

## Step 2 — Determine task prefix

The task prefix is a short uppercase identifier used to tag tasks in `todo.md` (e.g., `FSAD-001`,
`MNA-042`). Each project gets a unique prefix so tasks are globally unambiguous across repos.

### 2a — Derive a suggestion from the directory name

Apply these rules to `PROJECT_NAME` to produce a 3–4 character uppercase suggestion:

- Split on `_`, `-`, spaces, and camelCase word boundaries to get a list of words
- **Multi-word name**: take the first letter of each word, uppercase. If that gives fewer than 3
  characters, append the next letters of the longest word until you reach 3.
  - `fsad_playbook` → `FP` → pad to `FPL` (3 chars from "playbook")
  - `my_new_app` → `MNA`
  - `data_pipeline` → `DP` → pad to `DPI`
- **Single-word name**: take the first 3–4 consonant-dominant characters, uppercase.
  - `recall` → `RCL`
  - `dashboard` → `DASH`
- Cap at 4 characters.

### 2b — Check for conflicts

Sweep two independent sources for prefixes already in use, and treat a hit in either as a conflict:

1. **Sibling `todo.md` files** — use the Bash tool to grep across `../*/planning/to do/todo.md` for
   lines matching a task identifier pattern (backtick, 2–5 uppercase letters, hyphen, digit), extract
   just the prefix, and sort for uniqueness.
2. **Registered config** — read `~/.claude/commands/fsd/projects.yaml` and collect every `prefix:`
   value present. A prefix can be reserved in config before any task file using it exists, so this
   catches conflicts the todo-file grep alone would miss.

If the suggested prefix appears in either source, note the conflict and adjust: append a digit or
swap one letter to make it unique (e.g., `MNA` → `MNA2`).

### 2c — Confirm with the user

Present your suggestion and the conflict check result, then ask the user to confirm or override:

> Suggested task prefix: **`MNA`** (from `my_new_app`) — no conflicts found in sibling projects.
> Use this prefix, or type a different one?

Wait for the user's response before continuing. Store the confirmed value as `TASK_PREFIX`.

---

## Step 3 — Create directory structure

Create each of the following directories if they don't already exist. Never delete or modify
directories that already exist.

```
planning/
planning/design/
planning/research/
planning/plan/
planning/to do/
planning/to do/completed/
```

On macOS/Linux, `mkdir -p` is idempotent — safe to run even if the directory exists.

---

## Step 4 — Write template files

For each file below, check whether it already exists in the project root. If it does, **skip it
entirely** — never overwrite existing files. If it doesn't exist, copy the corresponding template
from this skill's `templates/` directory.

| File to create | Template source |
|---|---|
| `README.md` | `templates/README.md` |
| `CHANGELOG.md` | `templates/CHANGELOG.md` |
| `CLAUDE.md` | `templates/CLAUDE.md` |
| `planning/to do/todo.md` | `templates/todo.md` |
| `.gitignore` | `templates/.gitignore` |

Read each template with the Read tool. Before writing, substitute these placeholders:

| Placeholder | Replace with |
|---|---|
| `{{PROJECT_NAME}}` | The directory name from Step 1 |
| `{{TASK_PREFIX}}` | The confirmed prefix from Step 2 |
| `{{DATE}}` | Today's date in `YYYY-MM-DD` format |

Then write the result to the destination with the Write tool.

---

## Step 5 — Initialize git repository

**Confirmation gate:** Steps 5 and 6 create durable artifacts — a local git commit and a remote
GitHub repository. Before proceeding, ask the user once, covering both together:

> Ready to `git init` + commit and create a private GitHub repo for **PROJECT_NAME**? (yes/no)

Wait for an affirmative response before running anything in Step 5 or Step 6. If the user declines,
skip both steps and note it in the Step 9 output.

Check whether `.git/` already exists in the project root.

**If it does not exist:**
```bash
git init
git add .
git commit -m "Initial commit"
```

**If it already exists:** skip git init and the initial commit. The repo is already set up.

---

## Step 6 — Create GitHub remote

Check whether a remote named `origin` already exists:
```bash
git remote -v
```

**If no `origin` remote exists:**
```bash
gh repo create PROJECT_NAME --private --source=. --remote=origin --push
```

Replace `PROJECT_NAME` with the actual directory name. Use `--private` by default.

**If `origin` already exists:** skip this step.

---

## Step 7 — Register in p_mon

Invoke the `p_mon` skill via the Skill tool, passing `add-project PROJECT_NAME` as the argument (substitute the actual project name). This appends the project to `~/repo/p_mon/p_mon.config.json` if not already present, or reports it as already registered.

---

## Step 8 — Detect project type and register in `projects.yaml`

### 8a — Detect project type

Before registering, inspect the project root to pick a `version_scheme`/`version_files` pair instead
of assuming every project is Node-based:

- `package.json` present → `version_scheme: semver`, `version_files: [package.json]`
- A different recognized manifest present (`plugin/.claude-plugin/plugin.json`, `pyproject.toml`,
  `Cargo.toml`, etc.) → `version_scheme: semver`, `version_files: [<that manifest>]`
- No manifest found (docs / plain-markdown project) → default to `version_scheme: semver`,
  `version_files: [README.md]` (the pattern already used for markdown-only projects in
  `projects.yaml`), or ask the user if the project's shape is ambiguous — never guess silently.

Store the resolved values as `VERSION_SCHEME` and `VERSION_FILES`.

### 8b — Write the registration entry

`~/.claude/commands/fsd/projects.yaml` is the **single** registry every `fsd:` skill reads — task
conventions (`fsd:add-task`, `fsd:do-task`, `fsd:next`) and release/sync conventions (`fsd:sync`,
`fsd:ship-it`) all resolve from this one file. There is no second config file to keep in step.

Read `~/.claude/commands/fsd/projects.yaml`. Check whether an entry for this project already exists
by scanning for the resolved `match_paths` value (see below).

**If already present:** skip and note in the output checklist.

**If absent:** construct and insert the following entry immediately before the `# Fallback` comment
block (the line that begins `# Fallback when no project matches`). If the file has no fallback
block, read it first and use its last existing entry as the unique anchor, inserting the new block
immediately after it:

```yaml
  PROJECT_NAME:
    match_paths:
      - ~/RELATIVE_PATH
    prefix: TASK_PREFIX
    number_digits: 3
    todo_file: planning/to do/todo.md
    task_dir: planning/to do
    task_filename_template: task-{prefix_lower}-{nnn}.md
    todo_entry_template: "- [ ] `{ID}` — {title} → [task-{prefix_lower}-{nnn}.md](task-{prefix_lower}-{nnn}.md)"
    use_full_template: true
    changelog_file: CHANGELOG.md
    version_scheme: VERSION_SCHEME
    version_files:
      - VERSION_FILES
    release_branch_pattern: "release/{version}"
```

Resolve the placeholders as follows:

- `PROJECT_NAME` — the directory name from Step 1.
- `RELATIVE_PATH` — derive from `pwd`: replace the home directory prefix with `~`. For example
  `<home>/repo/my_project` → `~/repo/my_project`.
- `TASK_PREFIX` — the confirmed prefix from Step 2.
- `VERSION_SCHEME` / `VERSION_FILES` — resolved in 8a.

Use the `Edit` tool to insert the block, not a full file rewrite. Use the `# Fallback` comment line
(or the last existing entry) as the unique anchor for the `old_string`.

---

## Step 9 — Verify and report

Do not report from memory of which steps ran. Re-check every artifact on disk (and in config) and
print ✓/✗ from that live check.

For each item below, perform the stated check and record the result:

- **Directories** — for each of the six paths from Step 3, confirm the directory exists (`ls -d`).
- **Files** — for each of the five files from Step 4, confirm the file exists, then grep it for `{{`
  to confirm no leftover template placeholders remain unsubstituted. A file that exists but still
  contains `{{` is a ✗, not a ✓.
- **Git** — confirm `.git/` exists on disk. If Steps 5/6 were confirmed and run, confirm
  `git remote -v` lists `origin`, and optionally run `gh repo view` to confirm the remote resolves.
  If the user declined the Step 5/6 confirmation gate, report both as skipped-by-choice, not as ✗.
- **p_mon** — confirm the project appears in `~/repo/p_mon/p_mon.config.json`.
- **Task tracking** — re-read `~/.claude/commands/fsd/projects.yaml` fresh and confirm the project's
  entry is present (not from memory of having written it in Step 8).

Print the checklist using this format:

```
Project initialized: PROJECT_NAME
─────────────────────────────────────
Directories
  ✓ planning/
  ✓ planning/design/
  ✓ planning/research/
  ✓ planning/plan/
  ✓ planning/to do/
  ✓ planning/to do/completed/
  — planning/             (already existed, skipped)   ← example of a skip

Files
  ✓ README.md             (verified: exists, no leftover placeholders)
  ✓ CHANGELOG.md
  ✓ CLAUDE.md
  ✓ planning/to do/todo.md
  ✓ .gitignore
  ✗ CLAUDE.md             (exists but still contains {{PLACEHOLDER}})  ← example of a failed verify
  — CLAUDE.md             (already existed, skipped)                  ← example of a skip

Git
  ✓ git init + initial commit (verified: .git/ present)
  ✓ GitHub remote created (private): github.com/USERNAME/PROJECT_NAME (verified: origin in git remote -v)
  — git already initialized, skipped
  — remote origin already exists, skipped
  — git/GitHub steps skipped by user choice at the Step 5/6 confirmation gate

p_mon
  ✓ PROJECT_NAME registered in p_mon (verified in p_mon.config.json)
  — PROJECT_NAME already registered, skipped

Task tracking
  ✓ PROJECT_NAME registered in projects.yaml (verified on re-read)
  — PROJECT_NAME already registered in projects.yaml, skipped
```

Show only the items that are relevant — don't show both the "created" and "skipped" lines for the
same item. A `✓` means the check passed against live state; a `✗` means the check failed (surface
this prominently, don't bury it); a `—` means the action was skipped because it already existed or
the user declined it.
