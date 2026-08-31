---
description: Add a new task to any of your local projects. Auto-detects the current project from the working directory and conforms to that project's conventions — prefix, numbering, todo-file layout, task-file template. Reads conventions from `~/.claude/commands/fsd/projects.yaml`. Use when the user wants to add a task, capture a TODO, or track a new idea.
argument-hint: `[brief task title]`
---

# fsad-harness:add-task — multi-project task adder

You add a new task entry (and, where the project warrants it, a per-task detail file) in whichever local project the user is currently working in. Project-specific conventions are defined in `~/.claude/commands/fsd/projects.yaml` — always read that file before doing anything else.

`$ARGUMENTS` (if present) is the brief task title.

**What "done" means for a task-creation run:**
- The new task ID is unique in the todo file — verified with a re-grep, not assumed from arithmetic alone.
- The new bullet matches the formatting of its sibling entries (`cfg.todo_entry_template`, or the file's actual format if it has drifted from the cfg).
- Every acceptance criterion in the generated task-detail file (when one is created) is falsifiable — a future reader can check it against the codebase and get a clear pass/fail, not a vague judgment call.

The steps below exist to satisfy these criteria, not just to move mechanically from prefix to written bullet.

## Step 0 — Detect the project

1. Determine the current working directory.
2. Read `~/.claude/commands/fsd/projects.yaml`.
3. Match cwd against each project's `match_paths` (expand `~`). The cwd may be a descendant of a match path. If multiple match, prefer the longest (most specific) match.
4. If a project matches, refer to its entry as `cfg` and proceed.
5. If **no** project matches:
   - Tell the user the project is not registered.
   - Show the values you'd use from the `default` block.
   - Ask whether to (a) proceed using the defaults this once, (b) register the project now, or (c) abort.
   - If (b), collect the following fields one at a time, showing the suggested default for each:
     - `name` — project key in the YAML (e.g. `my_project`)
     - `match_paths` — root path (default: current working directory)
     - `prefix` — task identifier prefix (e.g. `MYP`)
     - `number_digits` — zero-pad width (default: `3`)
     - `todo_file` — relative path to the todo file (default: `planning/to do/todo.md`)
     - `task_dir` — relative path to the task detail directory (default: `planning/to do`)
     - `use_full_template` — whether to create per-task detail files (default: `true`)
     - `version_scheme` — versioning convention: `semver`, `integer`, `calver`, or `none` (default: `semver`)
     - `version_files` — file(s) that carry the version string (default: `README.md`; user may specify `package.json` or others)
   - Write all collected fields as a new entry under `projects:` in the YAML before continuing.

## Step 1 — Compute the next number

**Success criteria for this step:** the computed `ID` must be numerically correct (the highest existing number for `{prefix}` in the todo file, plus one) regardless of whether `{prefix}` itself contains a hyphen (e.g. `KHB-Todo`), and must be verified as unique in the todo file — not merely assumed — before it is ever written.

Do **not** read the full todo file. Use targeted Bash commands instead:

1. **Find every existing ID** — run:
   ```bash
   grep -oE '{prefix}-[0-9]+' "{todo_file_path}"
   ```
   Substitute the literal prefix (e.g. `CBP`, `TBS`, `KHB-Todo`, `FSD_Train`) for `{prefix}` and the resolved absolute path for `{todo_file_path}`. Quote the path to handle spaces. If the output is empty, no tasks exist yet — start at 1 and skip to step 3.

2. **Parse the numeric suffix yourself — do not pipe through `sort`.** `sort -t- -k2 -n | tail -1` assumes the number always lands in field 2 when splitting on `-`. That assumption breaks the moment the prefix itself contains a hyphen: for `KHB-Todo-0010`, splitting on `-` gives fields `KHB` / `Todo` / `0010`, so field 2 is the literal string `"Todo"` on every matched line — `sort -n` can't numerically order a constant string, and `tail -1` just returns whichever line happens to sort last (effectively grep/file order), not the actual highest number. Instead, for each line grep returned, split on the **last** `-` (not a fixed field position) to isolate the trailing digits regardless of how many hyphens the prefix contains, parse each as an integer, and take the max. This is you reasoning over the grep output directly — not another shell pipeline.

3. **Clean up empty placeholder entries** — run:
   ```bash
   grep -nE '^- \[ \] `{prefix}-[0-9]+`\s*$' "{todo_file_path}"
   ```
   If any lines are returned, remove each with `Edit` using the exact line text as `old_string`. If the only entry removed was the last real line, treat the file as empty and start numbering from 1.

4. **Increment** the highest-seen number by 1; zero-pad to `cfg.number_digits` digits → `nnn`.
5. Build:
   - `ID = "{prefix}-{nnn}"` (e.g. `CBP-031`, `KHB-Todo-0010`, `FSD_Train-012`).
   - `prefix_lower` = `cfg.prefix_in_filename` if set, otherwise the prefix lowercased.
   - `slug` (only if the filename template uses it) = title lowercased, non-alphanumerics → `_`, collapsed runs of `_`, trimmed.

6. **Pre-write uniqueness check** — before `ID` is used anywhere else, derive a format-agnostic match string from `cfg.todo_entry_template` rather than assuming a backtick wrapper. The template varies per project — most backtick-wrap the ID (`` `{ID}` ``), but e.g. `KHB`'s bolds it instead (`**{ID}**`) — and a hardcoded backtick produces a false "0 hits" (spurious retry, or a silently-skipped uniqueness check) on every run for any project whose format differs. Take the substring of `cfg.todo_entry_template` from its start through the delimiter(s) that immediately close `{ID}` (e.g. `` - [ ] `{ID}` `` for a backtick template, `- [ ] **{ID}**` for a bold template), substitute `{ID}` with the literal `ID`, and grep for that exact literal string:
   ```bash
   grep -cF "{id_pattern}" "{todo_file_path}"
   ```
   - **0 hits** — `ID` is confirmed unique; continue to Step 2.
   - **≥1 hit** — a collision (a concurrent `add-task` run, or a miscalculation upstream). Increment `nnn` by 1, rebuild `ID`, and re-run the check exactly once more.
   - **Second collision** — stop and ask the user how to proceed. Do not keep incrementing and guessing.

## Step 2 — Get the title

If `$ARGUMENTS` is non-empty, use it. Otherwise ask:
> What's the task title? (one-liner — I'll prompt for details next.)

Before adding, check for an existing entry with a similar title using:
```bash
grep -i "{keyword_from_title}" "{todo_file_path}"
```
Pick 2–3 distinctive words from the title as the keyword. If any lines are returned, surface them and ask whether to proceed, edit the existing one, or abandon.

## Step 3 — Add the bullet to the todo file

Render `cfg.todo_entry_template` by substituting `{ID}`, `{title}`, `{nnn}`, `{prefix_lower}`.

Insertion point — use grep to find the right location without a full-file read:
- If `cfg.insert_before_section` is set → run `grep -n "{section_heading}" "{todo_file_path}"` to get the line number. Then `Read` with `offset` set to ~5 lines before that line number and `limit` of ~10 lines to get enough context for a unique `Edit` match.
- Else if `cfg.insert_under_section` is set → run `grep -n "^##" "{todo_file_path}"` to find section boundaries. Read ~10 lines around the target section's end to locate the last bullet.
- Else → run `grep -c "" "{todo_file_path}"` to get the total line count, then `Read` with `offset` set to the last ~10 lines to find the final bullet.

Use the `Edit` tool with enough surrounding context to be unique. Don't rewrite the whole file.

**Post-write uniqueness re-grep** — immediately after the `Edit` completes, re-use the same `{id_pattern}` derived in Step 1.6 (do not fall back to a hardcoded backtick here either):
```bash
grep -cF "{id_pattern}" "{todo_file_path}"
```
- **Exactly 1 hit** — the write is confirmed clean; continue to Step 4.
- **0 hits** — the `Edit` didn't land where expected (bad `old_string` match, wrong file, etc.). Retry the insertion once. If the retry also fails to produce exactly 1 hit, stop and ask the user.
- **≥2 hits** — the ID already existed elsewhere in the file (the pre-write check in Step 1.6 missed it, or a concurrent write landed in between). Stop and ask the user how to resolve the duplicate rather than silently leaving two entries with the same ID.

## Step 4 — Gather task details

Skip this step if `cfg.use_full_template` is `false`.

Ask one question at a time (don't dump a form):

1. **Source** — Where did this task come from? (release note, feedback, bug report, own idea). Omit the section if not applicable.
2. **Summary** — What's changing and why? 1-3 sentences.
3. **Assessment** — Current state? Where does the relevant content live? File paths and line numbers if you have them.
4. **Plan** — Step-by-step implementation.
5. **Acceptance Criteria** — `- [ ]` checkbox list of verification steps.

If the user says "use your best judgment", "fill it in", or similar, proceed without blocking — infer from the title and project context.

## Step 5 — Write the task-detail file

Skip this step if `cfg.use_full_template` is `false`.

Resolve the path:

```
{project_root}/{cfg.task_dir}/{rendered cfg.task_filename_template}
```

Write this content (em-dash, not hyphen, in the H1):

```markdown
# {ID} — {title}

## Source
[Where this came from — or omit this section if not applicable]

## Summary
[1-3 sentences: what's changing and why]

## Assessment
[Current state of the relevant content. Does it exist? Where? What needs to change?]

**Location:** `[file path]` — [section/line reference]

## Plan

[Step-by-step implementation]

1. [Step one]
2. [Step two]

## Acceptance Criteria
- [ ] [Verification step 1]
- [ ] [Verification step 2]
```

If `cfg.notes` mentions style cues (e.g. "reference task-cbp-030.md"), peek at that file first and match its tone.

## Step 6 — Confirm completion

In one short response, report:
- The project that was matched (and its root path).
- The new `ID`.
- That the bullet was appended to `cfg.todo_file`.
- The task-detail file path (if one was created).

## Conventions to honour

- **Number format:** always zero-pad to `cfg.number_digits` digits.
- **Filename casing:** lowercase the prefix unless `cfg.prefix_in_filename` overrides.
- **Heading separator:** em-dash (`—`), not hyphen.
- **Identifier casing in IDs:** preserve `cfg.prefix` exactly (e.g. `FSD_Train-012`, `KHB-Todo-0010`).
- **One question at a time** when gathering details.

## Guardrails

- **Always grep the todo file for the highest number first** — never guess the next number, and verify uniqueness before and after the write.
- **Never duplicate titles** — scan existing entries before creating.
- **Trust the file over the cfg.** If the file's existing entries clearly use a different format than `cfg.todo_entry_template`, follow the file and flag the drift to the user (the cfg may be stale).
- **Don't modify other projects.** Only touch the matched project's files.
- **Don't implement the task.** Only create planning artifacts; the user will do the work separately.
- **Don't add a task-detail file when `cfg.use_full_template` is false.** Lightweight projects intentionally keep the bullet alone.
