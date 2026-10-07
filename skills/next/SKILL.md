---
description: Pick the next open task from the current project's todo file and invoke `/fsad-harness:do-task` with that task ID. Ranks candidates by readiness (has a task-detail file, no stated unmet dependency) and reports why one was chosen. Accepts an optional count (`/fsad-harness:next 3`) to hand off multiple ranked candidates to `do-task`'s concurrent multi-task dispatch. Auto-detects the current project from the working directory using the same YAML config as other skills. Use when the user says "do the next task", "what's next", "next task", "next 3 tasks", or similar.
argument-hint: '`[N]`'
---

# fsad-harness:next — pick the next ready task and hand off to do-task

You find the most **ready** unchecked task(s) in the current project's todo file and invoke `fsad-harness:do-task` with the chosen ID(s). Readiness — not file order — decides which candidate wins.

## Asking the user

This rule covers every question this skill asks the user: a confirmation, a choice, a missing value, a numbered decision list, or a stop-and-ask. It applies even where a later step says "ask the user" or "ask exactly once". The user may watch the decisions pane rather than the chat, so a question that only goes to chat can go unanswered.

- **When `mcp__decision-tracker__decision` is in your tool list** (loaded, or named as a deferred tool; load a deferred one with `ToolSearch` first), log each question before you ask it:
  1. Call it with `action: "open"`, the question (ending in `?`), and `options` when the answers are a closed set. Set `required: false` when the work can go on without an answer. A numbered list of questions opens one decision per item. Keep each returned `id`.
  2. Ask the question in chat as this skill says. The open call does not replace the chat question.
  3. When the user answers, in chat or as a `Decision Dn: <answer>` message from the plugin, call the tool with `action: "close"`, the `id` and the answer.
  4. When the change the answer asked for is in place, call it with `action: "implement"`, the `id` and a `path:line`.
- **When the tool is absent**, ask in chat only.
- An `AskUserQuestion` call is logged on its own. Do not open it again.
- This rule changes where a question is logged. It does not change when this skill asks, or how many times.

## Step 0 — Detect the project

1. Determine the current working directory.
2. Read `${CLAUDE_PLUGIN_ROOT}/skills/add-task/add-task-projects.yaml`.
3. Match cwd against each project's `match_paths` (expand `~`). Prefer the longest (most specific) match if multiple match.
4. If a project matches, refer to its entry as `cfg` and the resolved project root as `project_root`. Proceed.
5. If **no project matches** in `add-task-projects.yaml`:
   - Tell the user the project is not registered.
   - Suggest running `/fsad-harness:add-task` from the project to register it.
   - Stop.

## Step 1 — Parse the optional count argument

`$ARGUMENTS` is either empty or a single positive integer `N`.

- Empty → `N = 1`.
- A positive integer → `N` = that value.
- Anything else (non-numeric, zero, negative) → tell the user: "Expected an optional count, e.g. `/fsad-harness:next` or `/fsad-harness:next 3`." Stop.

## Step 2 — Find candidate open tasks (targeted grep, not a full-file Read)

Run a targeted grep against the todo file instead of reading it in full:

```bash
grep -nE '^- \[ \] .*{prefix}-[0-9]+' "{todo_file_path}"
```

Use the resolved absolute path for `{todo_file_path}` and quote it to handle spaces. This returns only the open (`- [ ]`) lines that mention the project's `cfg.prefix`, each with its line number — never pull the whole backlog into context.

- **No matches**: tell the user "No open tasks found in `[cfg.todo_file]`. All done!" Stop.
- **One or more matches**: extract the canonical `PREFIX-NNN` identifier from each matching line. These are the candidate set. Continue.

## Step 3 — Rank candidates by readiness

For each candidate ID, gather three readiness signals without a full-file read:

1. **Has a task-detail file** — check whether `{project_root}/{cfg.task_dir}/{rendered cfg.task_filename_template}` exists for that ID (same path resolution `do-task` uses). A candidate with an existing task-detail file already has a plan drafted and is ready to execute immediately.
2. **No stated unmet dependency** — inspect the candidate's todo-line text (and, if it has a task-detail file, its Summary/Assessment section) for an explicit reference to another task ID as a blocker (e.g. "depends on TBS-040", "blocked by", "after TBS-045 lands"). If that referenced task is not yet checked `[x]` in the todo file, treat the candidate as **not ready**.
3. **Well-formed task-detail file** — only evaluated when signal 1 found a file. Run three targeted greps against it (never a full-file Read); the file is well-formed only if **all three** pass:
   - **ID matches filename** — the H1 starts with `# {ID} —` where `{ID}` is the canonical identifier the filename was rendered from: `grep -c "^# {ID} —" "{task_file}"` ≥ 1.
   - **≥1 unchecked AC** — the `## Acceptance Criteria` section itself (not the Plan or any other section) contains at least one `- [ ]` item: `awk '/^## Acceptance Criteria/{f=1;next} /^## /{f=0} f && /^- \[ \]/' "{task_file}" | grep -c .` ≥ 1. A file whose ACs are all `[x]` (or that has none) has nothing left for `do-task` to verify.
   - **No template placeholders** — no line still carries the task-file template's bracketed placeholders outside inline code (a task that *talks about* `[TBD]` in backticks is fine; one that still *contains* it as prose is not): `sed 's/`[^`]*`//g' "{task_file}" | grep -nE '\[TBD\]|\[Step (one|two)\]|\[Verification step [0-9]+\]|\[Where —|\[1–3 sentences|\[Current state\.|\[file path\]|\[section/line reference\]'` returns nothing.

   A candidate whose file fails any check is **not Tier 1** — it drops to Tier 2 with the failing check named in the report (the plan is not executable as written, so `do-task` must stop and re-plan before it can run). Do not "fix" the file here; `fsad-harness:next` never edits task files.

Rank the candidate set:

- **Tier 1 — ready**: has a well-formed task-detail file AND no unmet dependency.
- **Tier 2 — plannable**: no unmet dependency, but either no task-detail file (would enter `do-task` plan mode) or a task-detail file that fails a well-formed check (needs re-planning first).
- **Tier 3 — blocked**: has a stated unmet dependency. Exclude from selection unless every candidate is Tier 3 (in which case surface this to the user rather than silently picking one).

Within a tier, preserve file order (top-to-bottom) as the tiebreaker.

Select the top `N` candidates from this ranking (Tier 1 first, then Tier 2, then Tier 3 only if nothing else is available).

Report the choice and reason before proceeding, e.g.:

> Selected **TBS-042** (Tier 1 — ready: task-detail file exists and is well-formed, no unmet dependency) over TBS-043 (Tier 2 — task file fails well-formed check: no unchecked `- [ ]` AC) and TBS-044 (Tier 3 — blocked: references open TBS-041).

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

Resolve `desired_skill` = `cfg.skills.do_task` (if set) → else the YAML's top-level `defaults.skills.do_task` (if set) → else `"fsad-harness:do-task"`. Use `desired_skill` (not a hardcoded `fsad-harness:do-task`) for every handoff below, so a project configured for e.g. `kh:do-task` is respected here too.

- **`N = 1`**: Tell the user which task was selected and why, e.g.:

  > Next task: **TBS-006** — "Add a new skill `fsad-harness:next`" (Tier 1 — ready). Handing off to `{desired_skill}`…

  Then invoke `desired_skill` via the Skill tool, passing the single canonical task identifier as the argument.

- **`N > 1`**: Tell the user the full ranked list being dispatched, e.g.:

  > Dispatching 3 ready tasks to `{desired_skill}`: **TBS-042, TBS-044, TBS-046**.

  Then invoke `desired_skill` via the Skill tool, passing all selected canonical identifiers space-separated as a single argument string (e.g. `TBS-042 TBS-044 TBS-046`). If `desired_skill` is `fsad-harness:do-task`, its own Step 0.5 multi-task dispatch takes over from there — each ID is planned/executed concurrently in its own isolated worktree. Other skills may handle multi-ID dispatch differently; consult that skill's own instructions.
