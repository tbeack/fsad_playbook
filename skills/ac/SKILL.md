---
description: Verify acceptance criteria for a task. Reads the task's detail file, fans every unchecked AC out to an independent verifier subagent, adversarially refutes each PASS before marking it, and inserts a "All criteria verified" timestamp when all pass. Use when you want to run or re-run ACs independently of task execution — e.g. after implementation, in a follow-up session, or to get an honest mid-task progress check.
argument-hint: `<PREFIX-NNN | NNN>`
---

# fsd:ac — acceptance criteria verifier

Fan every unchecked AC in a task file out to an independent verifier subagent, adversarially refute each claimed PASS before marking it, and let only the orchestrator edit the task file.

## Step 0 — Detect the project

1. Determine the current working directory.
2. Read `~/.claude/commands/fsd/projects.yaml`.
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
- **Section present but all items already `[x]`**: Tell the user all ACs are already checked. Check whether the "All criteria verified" timestamp line exists above the list. If it's missing, add it (Step 7). Otherwise report: "All ACs already verified — nothing to do." Stop.
- **At least one `- [ ]` item present**: Continue.

## Step 4 — Fan unchecked ACs out to independent verifier subagents

Collect every `- [ ]` item into a list. Spawn one `Agent` per AC (or a small batch of 2–3 ACs per agent when the list is long enough that one-per-AC would be wasteful — never mix more than 3 ACs into one agent, since that erodes independence). Send **all Agent calls in a single message** so they run concurrently.

Each verifier subagent gets:
- The AC text verbatim.
- The relevant task-file context (Summary, Assessment, Plan — not the full AC list, to avoid anchoring on neighboring ACs).
- Read-only access to the codebase (no `Edit`/`Write`).

**Verifier subagent instructions:**

> Verify this acceptance criterion against the actual codebase: `<AC text>`.
> Gather evidence — read the relevant files, run safe read-only commands (`grep`, `ls`, file reads). Do not run destructive commands.
> Decide a verdict:
> - `PASS` — you found direct, concrete evidence (specific file, line, output) that the AC is true as written.
> - `FAIL` — you found evidence the AC is not met, or found nothing where it should be.
> - `UNCLEAR` — the AC is unfalsifiable as written, or proving it needs runtime/browser evidence you can't produce from static reading alone. Do not guess PASS to resolve ambiguity — default to `UNCLEAR`.
>
> Return **only** this structured result as your final message:
> `{ac_id, verdict, evidence, file, line, confidence}`
> - `ac_id`: the AC text (or index) you were given.
> - `verdict`: `PASS` | `FAIL` | `UNCLEAR`.
> - `evidence`: one-sentence summary of what you found (or didn't).
> - `file`, `line`: the specific location backing the verdict (empty if `UNCLEAR`/`FAIL` with nothing found).
> - `confidence`: `high` | `medium` | `low` — how directly the evidence proves the claim (not how sure you feel).

## Step 5 — Adversarial refuter gate (PASS verdicts only)

Every subagent result with `verdict: PASS` is a *claim*, not a fact yet. Before any checkbox flips, spawn one independent refuter `Agent` per PASS claim (batch all refuter calls into a single message). The refuter must not be the same subagent instance that produced the PASS.

**Refuter prompt** (substitute the claim's fields):

> A verifier claims this acceptance criterion passes: `<AC text>`.
> Their evidence: `<evidence>` at `<file>:<line>`.
> Open that location yourself and read the surrounding code. Try to refute the claim.
> - If the evidence is direct and holds up under your own reading → `CONFIRMED`.
> - If the evidence is indirect, inferred from naming/structure rather than behavior, incomplete, or you cannot verify it from the cited location → `REFUTED`. **Default to `REFUTED` on any doubt** — indirect evidence does not survive this gate.
> Return `{ac_id, refuter_verdict: CONFIRMED|REFUTED, reason}`.

**Resolve:**
- `PASS` + `CONFIRMED` → final verdict `PASS`. Eligible for checkbox flip.
- `PASS` + `REFUTED` → final verdict downgrades to `FAIL`. Record the refuter's reason.
- `FAIL` and `UNCLEAR` verdicts skip the refuter gate entirely — there's no PASS claim to adversarially test, and `UNCLEAR` already routes to Step 6.

## Step 6 — Orchestrator applies results

The orchestrator (not any subagent) makes every edit to the task file — this avoids concurrent-write races across parallel verifier/refuter agents.

For each AC, in the original list order:

1. **Print the AC text and final verdict** (`PASS`, `FAIL`, or `UNCLEAR`), citing the evidence and, for refuted claims, the refuter's reason.
2. **Final `PASS`**: edit the task file to flip `- [ ]` → `- [x]` for that item. Use enough surrounding context in `old_string` to make the match unambiguous.
3. **`FAIL`** (including refuter-downgraded): record the failure, do **not** flip it. Continue to the next AC.
4. **`UNCLEAR`**: do **not** flip it. Stop-and-ask — surface the AC text and why it's unfalsifiable/needs runtime evidence, and ask the user how to proceed (rewrite the AC to be falsifiable, supply the missing runtime evidence, or explicitly accept the risk and force a manual verdict). Do not auto-resolve `UNCLEAR` to `PASS` or `FAIL`.

Never edit AC text to make a failing or unclear item pass.

## Step 7 — Insert the verified timestamp (all-pass only)

When all ACs in the section are `[x]` (either just verified or already checked from before):

Run the real system date and insert it — never hand-write or prose-substitute a date:

```bash
date +%F
```

Insert the following line immediately above the `## Acceptance Criteria` heading, substituting the exact `date +%F` output:

```
All criteria verified {date +%F output} before commit.
```

If the line is already present, skip this step.

## Step 8 — Report

Print a summary table:

```
AC                                                     Verdict
------------------------------------------------------  -------
[AC text, truncated to 50 chars if long]               PASS
[AC text]                                              FAIL
[AC text]                                              UNCLEAR
```

Then:

- If **all passed**: "All ACs verified. Timestamp added to task file. Ready to commit."
- If **any failed**: List each failing AC — including any refuter-downgraded ones with the refuter's reason — and what evidence was missing. Tell the user: "Fix the failing ACs and re-run `/fsd:ac {ID}`."
- If **any unclear**: List each `UNCLEAR` AC with the reason and wait for the user's direction before re-running.

## Guardrails

- **Never mark an AC `[x]` without evidence that survived the refuter gate.** A verifier's PASS alone is not sufficient.
- **Independence is structural, not a suggestion** — the refuter must be a separate agent instance from the verifier it's checking, and default to `REFUTED` on indirect evidence.
- **`UNCLEAR` is a real verdict, not a fallback for laziness** — use it only when the AC is genuinely unfalsifiable from static reading or needs runtime/browser evidence unavailable to the agent. Never collapse `UNCLEAR` into `PASS` to move faster.
- **Mark progressively** — flip each item as its verdict resolves, not in one batch at the very end.
- **Never edit AC text** to make a failing or unclear item pass — that's falsifying the record.
- **Do not run destructive commands** while gathering evidence (no `rm`, `git reset`, etc.).
- **Do not modify the Plan or Summary sections** of the task file — only the AC checkboxes and the verified timestamp line.
- **Re-entrant**: if some ACs are already `[x]` from a prior run, skip them and only verify the remaining `- [ ]` items.
- **The timestamp is a real shell command's output** — `date +%F`, never a prose-guessed date.
