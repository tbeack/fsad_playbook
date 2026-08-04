---
description: Pick the next open task from the current project's todo file and invoke `/fsd:do-task` with that task ID. Ranks candidates by readiness (has a task-detail file, no stated unmet dependency) and reports why one was chosen. Accepts an optional count (`/fsd:next 3`) to hand off multiple ranked candidates to `do-task`'s concurrent multi-task dispatch. Auto-detects the current project from the working directory using the same YAML config as other fsd skills. Use when the user says "do the next task", "what's next", "next task", "next 3 tasks", or similar.
argument-hint: `[N]`
---

# fsd:next — pick the next ready task and hand off to do-task

You find the most **ready** unchecked task(s) in the current project's todo file and invoke `fsd:do-task` with the chosen ID(s). Readiness — not file order — decides which candidate wins.

## Step 0 — Detect the project

1. Determine the current working directory.
2. Read `~/.claude/commands/fsd/projects.yaml`.
3. Match cwd against each project's `match_paths` (expand `~`). Prefer the longest (most specific) match if multiple match.
4. If a project matches, refer to its entry as `cfg` and the resolved project root as `project_root`. Proceed.
5. If **no project matches**:
   - Tell the user the project is not registered.
   - Suggest running `/fsd:add-task` from the project to register it.
   - Stop.

## Step 1 — Parse the optional count argument

`$ARGUMENTS` is either empty or a single positive integer `N`.

- Empty → `N = 1`.
- A positive integer → `N` = that value.
- Anything else (non-numeric, zero, negative) → tell the user: "Expected an optional count, e.g. `/fsd:next` or `/fsd:next 3`." Stop.

## Step 2 — Find candidate open tasks (targeted grep, not a full-file Read)

Run a targeted grep against the todo file instead of reading it in full:

```bash
grep -nE '^- \[ \] .*{prefix}-[0-9]+' "{todo_file_path}"
```

Use the resolved absolute path for `{todo_file_path}` and quote it to handle spaces. This returns only the open (`- [ ]`) lines that mention the project's `cfg.prefix`, each with its line number — never pull the whole backlog into context.

- **No matches**: tell the user "No open tasks found in `[cfg.todo_file]`. All done!" Stop.
- **One or more matches**: extract the canonical `PREFIX-NNN` identifier from each matching line. These are the candidate set. Continue.

## Step 3 — Rank candidates by readiness

For each candidate ID, gather two readiness signals without a full-file read:

1. **Has a task-detail file** — check whether `{project_root}/{cfg.task_dir}/{rendered cfg.task_filename_template}` exists for that ID (same path resolution `do-task` uses). A candidate with an existing task-detail file already has a plan drafted and is ready to execute immediately.
2. **No stated unmet dependency** — inspect the candidate's todo-line text (and, if it has a task-detail file, its Summary/Assessment section) for an explicit reference to another task ID as a blocker (e.g. "depends on TBS-040", "blocked by", "after TBS-045 lands"). If that referenced task is not yet checked `[x]` in the todo file, treat the candidate as **not ready**.

Rank the candidate set:

- **Tier 1 — ready**: has a task-detail file AND no unmet dependency.
- **Tier 2 — plannable**: no task-detail file, no unmet dependency (would enter `do-task` plan mode).
- **Tier 3 — blocked**: has a stated unmet dependency. Exclude from selection unless every candidate is Tier 3 (in which case surface this to the user rather than silently picking one).

Within a tier, preserve file order (top-to-bottom) as the tiebreaker.

Select the top `N` candidates from this ranking (Tier 1 first, then Tier 2, then Tier 3 only if nothing else is available).

Report the choice and reason before proceeding, e.g.:

> Selected **TBS-042** (Tier 1 — ready: task-detail file exists, no unmet dependency) over TBS-044 (Tier 3 — blocked: references open TBS-041).

If `N > 1`, list all selected candidates with their tier and reason in the same format.

## Step 4 — Verify before handoff

Before invoking `do-task`, validate every selected ID:

1. Each ID matches the canonical `PREFIX-NNN` pattern exactly — correct prefix casing (`cfg.prefix`), a literal hyphen, and a numeric suffix zero-padded to `cfg.number_digits` digits.
2. Each ID corresponds to exactly one open (`- [ ]`) line in the candidate set from Step 2 — no duplicates, no ambiguous partial matches (e.g. two lines that could both plausibly resolve to the same prefix/number).

If any selected ID fails either check — malformed pattern, or an ambiguous/duplicate match — **stop and ask** the user to disambiguate rather than guessing or handing off a bad value. Show the conflicting lines so the user can pick.

If `N` exceeds the number of available (non-Tier-3, or all-Tier-3-if-forced) candidates, hand off as many as are available and tell the user how many were found vs. requested.

## Step 5 — No open tasks

(Covered in Step 2 — no separate action needed here.)

## Step 6 — Hand off to do-task

- **`N = 1`**: Tell the user which task was selected and why, e.g.:

  > Next task: **TBS-006** — "Add a new skill `fsd:next`" (Tier 1 — ready). Handing off to `fsd:do-task`…

  Then invoke `fsd:do-task` via the Skill tool, passing the single canonical task identifier as the argument.

- **`N > 1`**: Tell the user the full ranked list being dispatched, e.g.:

  > Dispatching 3 ready tasks to `fsd:do-task`: **TBS-042, TBS-044, TBS-046**.

  Then invoke `fsd:do-task` via the Skill tool, passing all selected canonical identifiers space-separated as a single argument string (e.g. `TBS-042 TBS-044 TBS-046`). `do-task`'s own Step 0.5 multi-task dispatch takes over from there — each ID is planned/executed concurrently in its own isolated worktree.
