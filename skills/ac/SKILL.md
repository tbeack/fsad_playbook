---
description: Verify acceptance criteria for a task. Reads the task's detail file, fans every unchecked AC out to an independent verifier subagent, adversarially refutes each PASS before marking it, and inserts a "All criteria verified" timestamp when all pass. Use when you want to run or re-run ACs independently of task execution — e.g. after implementation, in a follow-up session, or to get an honest mid-task progress check.
argument-hint: '`<PREFIX-NNN | NNN>`'
---

# fsad-harness:ac — acceptance criteria verifier

Fan every unchecked AC in a task file out to an independent verifier subagent, adversarially refute each claimed PASS before marking it, and let only the orchestrator edit the task file.

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

## Definitions used throughout

### `VERIFIER_TOOLS` — the read-only tool allowlist

```
VERIFIER_TOOLS = Read, Grep, Glob, Bash (read-only commands only)
```

- **Read-only `Bash`** means commands that inspect and never mutate: `grep`, `ls`, `cat`, `head`, `sed -n`, `wc`, `diff`, `cmp`, `git diff`, `git log`, `git show`, `git status`. Never `rm`, `git reset`, `git checkout`, `git stash`, `git clean`, package installs, or build/dist scripts.
- **Never granted:** `Edit`, `Write`, `MultiEdit`, `NotebookEdit`. No verifier or refuter subagent may receive these under any circumstances.
- **Enforcement is the Agent call, not the prompt.** Every verifier `Agent` call in Step 4 and every refuter `Agent` call in Step 5 must pass the allowlist explicitly — `tools: VERIFIER_TOOLS` (or, when the `Agent` tool takes a `subagent_type` instead of a `tools:` field, a read-only agent type such as `Explore` whose tool set is a subset of `VERIFIER_TOOLS`). A prompt sentence saying "read-only" is advisory; the allowlist is what prevents a verifier from editing the task file or reverting a build.

### `trivial` — the trivial-change predicate

```
trivial = (files_changed ≤ 1) AND (lines_changed ≤ 10) AND non-behavioural
```

- `files_changed` / `lines_changed`: from `git diff --stat` of the change under verification (the working tree or worktree branch against its base), scoped to the files the task file names. `lines_changed` = insertions + deletions.
- `non-behavioural`: the diff touches only a docstring, comment, label, or copy text — no code path, config value, data, or build output changes.
- If the diff cannot be determined, or any AC needs runtime/browser evidence, the change is **not** trivial.
- `fsad-harness:do-task` Step 5e (TBS-086) mirrors this predicate, and the `ENUM` block below, by name and thresholds; keep all three definitions identical.

### `ENUM` — the optional per-AC enumeration block

<!-- ENUM:begin -->
**`ENUM`** — the optional per-AC self-healing enumeration block. An AC may declare a deterministic, read-only enumeration command as an indented child bullet immediately beneath its `- [ ]` line:

```markdown
- [ ] <criterion text, unchanged>
  - enumerate: `<ENUM_CMD>`
```

Declaration syntax:
1. The child bullet is the very next non-blank line after the AC item, indented by at least two spaces, and begins `- enumerate:`. At most one per AC. Anything else beneath the item is ignored by the parser.
2. `ENUM_CMD` is one inline-code span on the line. Multi-line logic lives in a version-controlled script the command calls (e.g. `` `bash scripts/ac/no-cli-phrase.sh` ``).
3. `ENUM_CMD` runs from `$ROOT`, prints one line per violation on stdout (`path:line:text` recommended), and prints nothing when there are no violations, using grep exit-code semantics: `0`/`1` are normal, `≥2` is an error. The command is responsible for exiting `≥2` when its target does not exist; the canonical pattern is a leading guard, `test -d <dir> || exit 2;` (or `test -f <file> || exit 2;`), because `grep --include` on a missing directory exits `1` silently on macOS.
4. `ENUM_CMD` must be read-only in the `VERIFIER_TOOLS` sense — the orchestrator refuses to run a command matching a forbidden form (`rm`, `git reset`, `git checkout`, `git stash`, `git clean`, package installs, or redirection into the tree) and treats it as `enum.status = error` rather than running it.

The canonical runner. Bash tool shell state does not persist between separate tool calls, so a shell function declared in one call is gone in the next; the orchestrator therefore writes this runner once per run to a script file (e.g. `${TMPDIR:-/tmp}/enum_gate.sh`) via the `Write` tool before its first use, then invokes it by path in every call — never as an inline function re-declared per call:

```bash
#!/usr/bin/env bash
# enum_gate.sh — usage: bash enum_gate.sh '<ENUM_CMD>'
# invoked as: (cd "$ROOT" && bash "$SCRIPT_PATH" '<ENUM_CMD>')
out=$(bash -c "set -o pipefail; $1" 2>"${TMPDIR:-/tmp}/enum.err"); rc=$?
err=$(cat "${TMPDIR:-/tmp}/enum.err")
if [ "$rc" -ge 2 ]; then
  printf 'ENUM_ERROR rc=%s\n%s\n' "$rc" "$err"
  exit 2
fi
n=$(printf '%s\n' "$out" | grep -c .)
printf '%s\n' "$out"; printf 'ENUM_COUNT %s\n' "$n"
[ "$n" -eq 0 ]
```

`set -o pipefail` inside the inner `bash -c` subshell means a piped `ENUM_CMD` (e.g. `rg … | sort`) now surfaces an earlier stage's failure — a missing tool, `command not found` — as the subshell's own exit code, so the `rc -ge 2` guard catches it and reports `ENUM_ERROR` instead of silently scoring zero violations.

The gate predicate is `converged ⇔ enum_gate exits 0 ∧ survivors_after_spot_check = ∅`, where a "survivor" is a location the blind refuter (below) still stands behind after the orchestrator spot-checks its claim:

| `enum_gate` exit | blind refuter | outcome |
|---|---|---|
| 0 | no survivors | `PASS` (eligible for checkbox flip) |
| 0 | survivor(s) stand spot-check | `FAIL`, `root_cause = enumeration_undercovers` |
| 1 | anything | `FAIL` — the subagent's view is recorded but cannot change the verdict |
| 2 | not consulted | `UNCLEAR`, `enum.status = error`, stop-and-ask |

**Ownership.** A `- enumerate:` declaration is authored and edited by a human only — a verifier, refuter, or repair agent never authors or edits a declaration line; an agent that identifies a need for one proposes it in prose for a human to add.
<!-- ENUM:end -->
`$ROOT` is the working tree — the same tree `trivial`'s `git diff --stat` is computed against.

## Step 0 — Detect the project

1. Determine the current working directory.
2. Read `${CLAUDE_PLUGIN_ROOT}/skills/add-task/add-task-projects.yaml`.
3. Match cwd against each project's `match_paths` (expand `~`). Prefer the longest match if multiple match.
4. If a project matches, use its entry as `cfg` and resolve `project_root`. Proceed.
5. If **no project matches** in `add-task-projects.yaml`:
   - Tell the user: "This directory isn't registered. Run `/fsad-harness:add-task` from the project to register it."
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

- **File not found**: Tell the user the task file doesn't exist. Suggest running `/fsad-harness:do-task {ID}` to create it first. Stop.
- **File found**: Read it end-to-end. Continue.

## Step 3 — Find the Acceptance Criteria section

Scan the task file for a `## Acceptance Criteria` heading.

- **Section absent**: Tell the user: "No `## Acceptance Criteria` section found in `{task_file_path}`. Add one before running `/fsad-harness:ac`." Stop.
- **Section present but all items already `[x]`**: Tell the user all ACs are already checked. Check whether the "All criteria verified" timestamp line exists above the list. If it's missing, add it (Step 7). Otherwise report: "All ACs already verified — nothing to do." Stop.
- **At least one `- [ ]` item present**: Continue. While collecting `- [ ]` items, attach the `- enumerate:` child (if any) per `ENUM` above to the AC it sits under; a child under an `- [x]` item is ignored.

## Step 4 — Fan unchecked ACs out to independent verifier subagents

**4.0 — Trivial-change fast path.** Before fanning out, evaluate the `trivial` predicate (see Definitions). If the change is `trivial`:
- Spawn **one** verifier `Agent` with `tools: VERIFIER_TOOLS` and give it the whole AC list (the fan-out's anti-anchoring rule below does not apply here — with a read-back diff as the only admissible evidence, anchoring is not the risk).
- Its evidence must be a **direct read-back diff**: quote the exact changed lines from `git diff` (or a `Read` of the file) next to each AC, not a paraphrase. It returns one `{ac_id, verdict, evidence, file, line, confidence}` result per AC, in the same shape as the fan-out verifiers.
- The trivial fast path does not exempt declared ACs: `enum_gate` still runs for every AC that carries an `- enumerate:` child, the blind refuter is skipped exactly like the ordinary verifier is, and a non-zero exit is `FAIL` regardless of what the single verifier reports.
- Skip Step 5 (the refuter gate) entirely and go to Step 6. Record `trivial: true` in the Step 8 report so the skipped gate is visible.
If the change is not `trivial`, continue with the normal fan-out below.

Collect every `- [ ]` item into a list. Spawn one `Agent` per AC (or a small batch of 2–3 ACs per agent when the list is long enough that one-per-AC would be wasteful — never mix more than 3 ACs into one agent, since that erodes independence). Send **all Agent calls in a single message** so they run concurrently.

Each verifier subagent gets:
- The AC text verbatim.
- The relevant task-file context (Summary, Assessment, Plan — not the full AC list, to avoid anchoring on neighboring ACs).
- `tools: VERIFIER_TOOLS` on the `Agent` call — read-only codebase access, never `Edit`/`Write`/`MultiEdit`/`NotebookEdit`.

**Declared ACs:** for an AC carrying an `- enumerate:` child (see `ENUM` above), skip the ordinary verifier and instead run the declared-AC procedure: run `enum_gate` from `$ROOT` via read-only `Bash`; spawn one **blind refuter** `Agent` with `tools: VERIFIER_TOOLS` given only the criterion text — no diff, no `ENUM_CMD` output, no sibling ACs, no Plan section; spot-check every survivor it reports at its cited `file:line`, exactly as a `REFUTED` claim is spot-checked in Step 5; evaluate the gate predicate from `ENUM` above; and return the extended record `{ac_id, verdict, evidence, file, line, confidence, trivial, enum, survivors}` (`architecture.md` §6.7). The `- enumerate:` declaration wins over the browser-AC keyword heuristic below when both would otherwise apply. A declared AC that fails the gate is a hard-stop `FAIL` recorded with its `count` and complete `locations` list — `fsad-harness:ac` makes no code edit and no repair attempt either way.

**Browser ACs:** when an AC needs browser evidence (renders / visible / navigates / highlights / font-size / contrast / scroll state), if a browser-verification skill is installed (for example `browser-verify`), invoke it (via the `Skill` tool) on the built output first and use its `{ac_id, verdict, evidence}` row as the verifier result — fall back to `UNCLEAR` only for criteria that skill reports as un-automatable (`manual`).

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

Every subagent result with `verdict: PASS` is a *claim*, not a fact yet. Before any checkbox flips, spawn one independent refuter `Agent` per PASS claim, each with `tools: VERIFIER_TOOLS` (batch all refuter calls into a single message). The refuter must not be the same subagent instance that produced the PASS. Declared ACs get no second refuter here: the blind refuter run as part of the declared-AC procedure in Step 4 *is* the refuter, each survivor it reports is spot-checked exactly as a `REFUTED` claim is below, and a survivor that does not hold is recorded `REFUTATION_REJECTED`.

**Refuter prompt** (substitute the claim's fields):

> A verifier claims this acceptance criterion passes: `<AC text>`.
> Their evidence: `<evidence>` at `<file>:<line>`.
> Open that location yourself and read the surrounding code. Try to refute the claim.
> - If the evidence is direct and holds up under your own reading → `CONFIRMED`.
> - If the evidence is indirect, inferred from naming/structure rather than behavior, incomplete, or you cannot verify it from the cited location → `REFUTED`. **Default to `REFUTED` on any doubt** — indirect evidence does not survive this gate.
> Return `{ac_id, refuter_verdict: CONFIRMED|REFUTED, reason, file, line}` — `file`/`line` is the location your reason rests on.

**Orchestrator spot-check of every `REFUTED`.** A refutation is also a claim. Refuters default to `REFUTED` on doubt, so some refutations are wrong. Before any `REFUTED` downgrades an AC, the orchestrator (you, not a subagent) opens the refuter's cited `file:line` with `Read` and checks whether the stated reason actually holds there:
- The reason holds under your own reading → the refutation **stands**; proceed to Resolve.
- The reason does not hold (the cited location shows what the verifier said, the refuter misread it, or the refuter's `file:line` does not support its reason) → record `REFUTATION_REJECTED` with a one-line note of what you saw, and keep the verifier's `PASS`.
Only refutations that survive the spot-check downgrade the AC. Do not spot-check by re-running the refuter — read the location yourself.

**Resolve:**
- `PASS` + `CONFIRMED` → final verdict `PASS`. Eligible for checkbox flip.
- `PASS` + `REFUTED` (spot-check: stands) → final verdict downgrades to `FAIL`. Record the refuter's reason.
- `PASS` + `REFUTED` (spot-check: `REFUTATION_REJECTED`) → final verdict `PASS`. Record the rejected refutation and your note so the audit trail shows the gate ran.
- `FAIL` and `UNCLEAR` verdicts skip the refuter gate entirely — there's no PASS claim to adversarially test, and `UNCLEAR` already routes to Step 6.

## Step 6 — Orchestrator applies results

The orchestrator (not any subagent) makes every edit to the task file — this avoids concurrent-write races across parallel verifier/refuter agents.

For each AC, in the original list order:

1. **Print the AC text and final verdict** (`PASS`, `FAIL`, or `UNCLEAR`), citing the evidence and, for refuted claims, the refuter's reason.
2. **Final `PASS`**: edit the task file to flip `- [ ]` → `- [x]` for that item. Use enough surrounding context in `old_string` to make the match unambiguous.
3. **`FAIL`** (including refuter-downgraded): record the failure, do **not** flip it. For a declared AC, record the complete extended findings record — `enum.count`, the complete `locations` list (never truncated), and every spot-checked survivor (`STANDS` or `REFUTATION_REJECTED`) — so Step 8 can hand the invoker the full work set without re-enumerating. Continue to the next AC.
4. **`UNCLEAR`**: do **not** flip it. Stop-and-ask — surface the AC text and why it's unfalsifiable/needs runtime evidence, and ask the user how to proceed (rewrite the AC to be falsifiable, supply the missing runtime evidence, or explicitly accept the risk and force a manual verdict). Do not auto-resolve `UNCLEAR` to `PASS` or `FAIL`. A declared AC whose `enum_gate` exits `2` (`enum.status = error`) routes down this same `UNCLEAR` bullet, with the stderr captured in `evidence`; no verifier is spawned in its place, and the legacy verifier path is never used as a fallback for a declared AC.

Never edit AC text to make a failing or unclear item pass.

**AC status file.** Write each AC's final verdict to the status file as soon as it is final, and before any `UNCLEAR` stop-and-ask or `FAIL` hand-off, so the record exists while the user decides. Mods (the fleet pane) read it; the task file alone records only `[x]` and `[ ]`.

- **Path:** the task file's path with `.md` replaced by `.acs.json`, in the same directory and the same copy (worktree or main tree) as the task file you edit. Example: `planning/to do/task-tbs-103.5.md` → `planning/to do/task-tbs-103.5.acs.json`.
- **Shape:** a JSON array, one entry per AC, sorted by `index`:
  `[{ "index": 1, "verdict": "pass", "date": "YYYY-MM-DD", "refuter": "confirmed" }]`
  - `index`: the AC's 1-based position in the `## Acceptance Criteria` list.
  - `verdict`: `pass`, `fail`, or `unclear`, the final verdict above, lowercased.
  - `date`: the real system date (`date +%F`).
  - `refuter`: `confirmed` (refuter confirmed the `PASS`), `rejected` (`REFUTATION_REJECTED`, the `PASS` stands), `refuted` (the refutation stood, now `FAIL`), or `skipped` (no refuter ran: a `FAIL` or `UNCLEAR` from the verifier, or the trivial path). A declared AC records `confirmed` when no survivor stands, `refuted` when one does.
- **Update, do not rewrite:** read the file if it exists. Replace the entry for each AC this run resolved, keep every other entry as it is, and write the array back. An AC already `[x]` before this run keeps its entry.
- **Write it with `Write`** when the task file is the worktree copy; for a main-tree task file from a worktree session, write it via Bash redirection on the absolute path.
- **Never touch the AC text for this.** The status file is the only place a `fail` or `unclear` verdict persists.

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

Print a summary table with a `count` column (blank for undeclared ACs; the enumerated violation count for declared ones):

```
AC                                                     Verdict  count
------------------------------------------------------  -------  -----
[AC text, truncated to 50 chars if long]               PASS
[AC text]                                              FAIL     7
[AC text]                                              UNCLEAR
```

Below the table, print one fenced findings block per **declared** AC. An **undeclared** AC prints the unchanged six-field row only — no `count` value, no fenced block; its row above is the complete report. For a declared AC, add the fenced block in exactly this shape:

```
{ac_id, verdict, evidence, file, line, confidence, trivial, enum: {cmd, status, rc, count, locations: [{file, line, excerpt}, ...]}, survivors: [{file, line, reason, spot_check}, ...], root_cause: null}
```

`root_cause` is always `null` from `fsad-harness:ac` — it never runs a repair loop, so it never has a non-convergence cause to report; the field exists only so the shape matches the extended record the invoker's repair loop produces.

Then:

- If **all passed**: "All ACs verified. Timestamp added to task file. Ready to commit." List any `REFUTATION_REJECTED` outcomes with their notes, and state `trivial: true` if the Step 4.0 fast path was taken.
- If **any failed**: List each failing AC — including any refuter-downgraded ones with the refuter's reason. For a declared AC, point at its fenced findings block above as the complete work set. Tell the user: "Fix the failing ACs (for a declared AC, every listed location) and re-run `/fsad-harness:ac {ID}`."
- If **any unclear**: List each `UNCLEAR` AC with the reason and wait for the user's direction before re-running.

## Guardrails

- **Never mark an AC `[x]` without evidence that survived the refuter gate.** A verifier's PASS alone is not sufficient.
- **The gate for a declared AC is `enum_gate`'s exit status, not a subagent's opinion.** No verifier, refuter, or spot-check can turn a non-zero exit into `PASS` — the orchestrator tests `$?`, never a verdict string.
- **No agent creates, edits, or synthesises an `- enumerate:` line.** A `- enumerate:` declaration is human-authored and human-edited only; an agent that identifies a need for one proposes it in prose (e.g. in the Step 8 report) for a human to add, and never runs a legacy verifier as a substitute when enumeration is broken or absent.
- **`fsad-harness:ac` never repairs.** The Step 8 findings block is its complete output to the invoker for a failing declared AC — fixing the locations it lists belongs to whichever skill or person invoked `fsad-harness:ac`, never to `fsad-harness:ac` itself.
- **Independence is structural, not a suggestion** — the refuter must be a separate agent instance from the verifier it's checking, and default to `REFUTED` on indirect evidence.
- **Verifiers and refuters are read-only by allowlist, not by request.** Every verifier and refuter `Agent` call passes `VERIFIER_TOOLS`; `Edit`, `Write`, `MultiEdit`, and `NotebookEdit` are never granted to them. If a subagent reports having edited or reverted anything, discard its result and re-run it with the allowlist.
- **A `REFUTED` is a claim too.** The orchestrator spot-checks every refutation at its cited `file:line` before it downgrades an AC; a refutation that does not hold is recorded as `REFUTATION_REJECTED` and the verifier's `PASS` stands. Never downgrade on an unchecked refutation.
- **The `trivial` predicate is the only way to skip the refuter gate.** It requires `files_changed ≤ 1`, `lines_changed ≤ 10`, and a non-behavioural diff, and the single verifier's evidence must be a direct read-back diff. Anything larger, or anything behavioural, takes the full Step 4 → Step 5 path.
- **`UNCLEAR` is a real verdict, not a fallback for laziness** — use it only when the AC is genuinely unfalsifiable from static reading or needs runtime/browser evidence unavailable to the agent. Never collapse `UNCLEAR` into `PASS` to move faster.
- **Mark progressively** — flip each item as its verdict resolves, not in one batch at the very end.
- **Never edit AC text** to make a failing or unclear item pass — that's falsifying the record.
- **Do not run destructive commands** while gathering evidence (no `rm`, `git reset`, etc.).
- **Do not modify the Plan or Summary sections** of the task file — only the AC checkboxes and the verified timestamp line.
- **Re-entrant**: if some ACs are already `[x]` from a prior run, skip them and only verify the remaining `- [ ]` items.
- **The timestamp is a real shell command's output** — `date +%F`, never a prose-guessed date.
