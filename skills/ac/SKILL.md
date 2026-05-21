---
description: Verify acceptance criteria for a task. Reads the task's detail file, walks every unchecked AC one by one, inspects the codebase for evidence, marks each passing AC [x] immediately, and inserts a "All criteria verified" timestamp when all pass. Use when you want to run or re-run ACs independently of task execution — e.g. after implementation, in a follow-up session, or to get an honest mid-task progress check.
argument-hint: `<PREFIX-NNN | NNN>`
---

# fsd:ac — acceptance criteria verifier

Walk every unchecked AC in a task file, prove each one with evidence, and mark it done progressively.

## Step 0 — Detect the project

1. Determine the current working directory.
2. Read `~/.claude/commands/tb/projects.yaml`.
3. Match cwd against each project's `match_paths` (expand `~`). Prefer the longest match if multiple match.
4. If a project matches, use its entry as `cfg` and resolve `project_root`. Proceed.
5. If **no project matches**:
   - Tell the user: "This directory isn't registered. Run `/fsd:add-task` from the project to register it."
   - Stop.

## Step 1 — Resolve the task identifier

Normalize `$ARGUMENTS` to canonical form `PREFIX-NNN`:

- Prefix: `cfg.prefix` (exact casing — e.g. `TBS`, `CBP`, `FSD_Train`).
- Number: zero-padded to `cfg.number_digits` digits.
- If `$ARGUMENTS` is empty, ask: "Which `[cfg.prefix]` task? (e.g. `[cfg.prefix]-001`)"

## Step 2 — Locate the task file

Resolve the path using the same rules as `do-task`:

- `{nnn}` = zero-padded number
- `{prefix_lower}` = `cfg.prefix_in_filename` if set, else `cfg.prefix` lowercased
- `{ID}` = canonical identifier

```
{project_root}/{cfg.task_dir}/{rendered cfg.task_filename_template}
```

- **File not found**: Tell the user the task file doesn't exist. Suggest running `/fsd:do-task {ID}` to create it first. Stop.
- **File found**: Read it end-to-end. Continue.

## Step 3 — Find the Acceptance Criteria section

Scan the task file for a `## Acceptance Criteria` heading.

- **Section absent**: Tell the user: "No `## Acceptance Criteria` section found in `{task_file_path}`. Add one before running `/fsd:ac`." Stop.
- **Section present but all items already `[x]`**: Tell the user all ACs are already checked. Check whether the "All criteria verified" timestamp line exists above the list. If it's missing, add it (Step 5). Otherwise report: "All ACs already verified — nothing to do." Stop.
- **At least one `- [ ]` item present**: Continue.

## Step 4 — Verify each unchecked AC

For every `- [ ]` item in the `## Acceptance Criteria` section, in order:

1. **Print the AC text** so the user can see which one is being checked.
2. **Gather evidence** — inspect the codebase, read relevant files, run safe read-only commands (e.g. `grep`, `ls`, checking file contents). Do not run destructive commands.
3. **Print a verdict**:
   - `PASS — <one-sentence evidence summary>` (e.g. file path, line number, output snippet)
   - `FAIL — <what's missing or broken>`
4. **On PASS**: immediately edit the task file to flip `- [ ]` → `- [x]` for that item. Use enough surrounding context in `old_string` to make the match unambiguous.
5. **On FAIL**: record the failure, continue to the next AC. Do **not** flip it to `[x]`.

Never edit AC text to make a failing item pass.

## Step 5 — Insert the verified timestamp (all-pass only)

When all ACs in the section are `[x]` (either just verified or already checked from before):

Insert the following line immediately above the `## Acceptance Criteria` heading:

```
All criteria verified YYYY-MM-DD before commit.
```

Substitute today's date in `YYYY-MM-DD` format. If the line is already present, skip this step.

## Step 6 — Report

Print a summary table:

```
AC                                                     Verdict
------------------------------------------------------  -------
[AC text, truncated to 50 chars if long]               PASS
[AC text]                                              FAIL
```

Then:

- If **all passed**: "All ACs verified. Timestamp added to task file. Ready to commit."
- If **any failed**: List each failing AC and what evidence was missing. Tell the user: "Fix the failing ACs and re-run `/fsd:ac {ID}`."

## Guardrails

- **Never mark an AC `[x]` without evidence.** Print the evidence before flipping.
- **Mark progressively** — flip each item the moment it passes, not in a batch at the end.
- **Never edit AC text** to make a failing item pass — that's falsifying the record.
- **Do not run destructive commands** while gathering evidence (no `rm`, `git reset`, etc.).
- **Do not modify the Plan or Summary sections** of the task file — only the AC checkboxes and the verified timestamp line.
- **Re-entrant**: if some ACs are already `[x]` from a prior run, skip them and only verify the remaining `- [ ]` items.
