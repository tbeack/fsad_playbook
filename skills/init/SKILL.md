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
`TBS-042`). Each project gets a unique prefix so tasks are globally unambiguous across repos.

### 2a — Derive a suggestion from the directory name

Apply these rules to `PROJECT_NAME` to produce a 3–4 character uppercase suggestion:

- Split on `_`, `-`, spaces, and camelCase word boundaries to get a list of words
- **Multi-word name**: take the first letter of each word, uppercase. If that gives fewer than 3
  characters, append the next letters of the longest word until you reach 3.
  - `fsad_playbook` → `FP` → pad to `FPL` (3 chars from "playbook")
  - `tb_skills` → `TBS`
  - `my_new_app` → `MNA`
- **Single-word name**: take the first 3–4 consonant-dominant characters, uppercase.
  - `recall` → `RCL`
  - `dashboard` → `DASH`
- Cap at 4 characters.

### 2b — Check for conflicts in sibling projects

Scan the parent directory for existing `todo.md` files to find prefixes already in use. Use the Bash tool to run a grep across `../*/planning/to do/todo.md` looking for lines that contain a task identifier pattern (backtick, 2–5 uppercase letters, hyphen, digit), extract just the prefix, and sort for uniqueness.

If the suggested prefix appears in the results, note the conflict and adjust:
append a digit or swap one letter to make it unique (e.g., `TBS` → `TBS2`).

### 2c — Confirm with the user

Present your suggestion and the conflict check result, then ask the user to confirm or override:

> Suggested task prefix: **`TBS`** (from `tb_skills`) — no conflicts found in sibling projects.
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

## Step 8 — Register in projects.yaml

Read `~/.claude/commands/fsd/projects.yaml`. Check whether an entry for this project already exists by scanning for the resolved `match_paths` value (see below).

**If already present:** skip and note in the output checklist.

**If absent:** construct and insert the following entry immediately before the `# Fallback` comment block (the line that begins `# Fallback when no project matches`):

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
    version_scheme: semver
    version_files:
      - package.json
```

Resolve the placeholders as follows:

- `PROJECT_NAME` — the directory name from Step 1.
- `RELATIVE_PATH` — derive from `pwd`: replace the home directory prefix (`/Users/<username>`) with `~`. For example `/Users/theobeack/repo/my_project` → `~/repo/my_project`.
- `TASK_PREFIX` — the confirmed prefix from Step 2.

Use the `Edit` tool to insert the block, not a full file rewrite. Use the `# Fallback` comment line as the unique anchor for the `old_string`.

---

## Step 9 — Output results

Print a checklist of every action taken. Use this format exactly:

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
  ✓ README.md
  ✓ CHANGELOG.md
  ✓ CLAUDE.md
  ✓ planning/to do/todo.md
  ✓ .gitignore
  — CLAUDE.md             (already existed, skipped)   ← example of a skip

Git
  ✓ git init + initial commit
  ✓ GitHub remote created (private): github.com/USERNAME/PROJECT_NAME
  — git already initialized, skipped
  — remote origin already exists, skipped

p_mon
  ✓ PROJECT_NAME registered in p_mon
  — PROJECT_NAME already registered, skipped

Task tracking
  ✓ PROJECT_NAME registered in projects.yaml
  — PROJECT_NAME already registered in projects.yaml, skipped
```

Show only the items that are relevant — don't show both the "created" and "skipped" lines for the
same item. A `✓` means the action was taken; a `—` means it was skipped because it already existed.
