---
description: Run a multi-agent code review TEAM over a codebase diff or path. Dispatches 7 specialist reviewers in parallel (correctness, design, performance, maintainability, testing, api-contract, security), consolidates findings into a severity-ranked REVIEW-REPORT.md with inter-agent agreement scoring, adversarial validation, and a merge recommendation. correctness and performance run as a loop-until-dry consensus fan-out (2-8 passes); every surviving finding is verified by a dedicated validator agent before it can appear in the report. Use when the user says "code review team", "multi-agent code review", "team review", "review this diff with a team", or similar. Review-only — no fixes.
argument-hint: `[target path] [scope: all | <subdir> | diff vs main] [--lite] [--yes]`
---

# Multi-Agent Code Review Team — Orchestration

Follow these steps. Review-only. Never apply fixes.

## Step 0: Pre-run confirmation

Never spawn specialists without showing this block (unless `--yes` / `auto-approve` is passed).

### 0.1 Parse arguments

- **Target path** — absolute path to the repo or directory to review. If missing, ask: *"What repo should I review? (absolute path)"* Verify it exists and is readable.
- **Scope** — one of:
  - `all` — full tree
  - `<subdir>` — a subdirectory, e.g. `src/api/`
  - `diff vs main` (or `diff vs <branch>`) — only files changed on current branch vs target branch
  If missing, ask: *"What scope? Full tree, a subdirectory, or diff vs main?"*
- **Flags:**
  - `--yes` / `-y` — skip confirmation block. Default: confirm.
  - `--lite` / `-l` — run only correctness, design, performance, security specialists (4-agent subset). Auto-activated when scope is a diff with ≤25 changed files.
  - `--full` — force a fresh baseline scan, ignoring any prior run history for this target (see Step 0.1a). Without this flag, a target with prior history runs in re-review mode automatically.

### 0.1a Detect prior run (re-review mode)

Every run writes its artifacts under a run-scoped directory, `RUN_DIR = <TARGET>/.planning/code-review/runs/<run_id>/` (`run_id` = an ISO-timestamp-derived slug), so a later run never overwrites an earlier one. Runs accumulate a top-level ledger at `<TARGET>/.planning/code-review/known-findings.jsonl` — one record per confirmed `root_issue` ever reported for this target (`root_issue`, `title`, `severity`, `first_seen_run_id`, `first_seen_date`).

1. Check whether `<TARGET>/.planning/code-review/known-findings.jsonl` exists.
2. **Exists, and `--full` was not passed** → `re_review_mode = true`. This run will skip `root_issue`s already in the ledger and suppress all `nit`-severity findings from the report (Step 4's consolidation, `re_review_mode` branch). Announce this in the Step 0.7 confirmation block.
3. **Missing, or `--full` was passed** → `re_review_mode = false`. This is a baseline scan; every validator-confirmed finding is eligible for the report, and the ledger is (re)built from this run's results.

All `RUN_DIR`-relative paths referenced in Steps 0.9 through 5 below resolve against the `RUN_DIR` computed here — the ledger itself is the one exception, always written at the top-level `<TARGET>/.planning/code-review/` regardless of `run_id`.

### 0.2 Enumerate scope

Use git-aware commands (fall back to `find` if not a git repo):

```bash
cd "<TARGET>"
if [[ "<SCOPE>" == "all" ]]; then
  FILE_COUNT=$(git ls-files 2>/dev/null | wc -l || find . -type f | wc -l)
  LINE_COUNT=$(git ls-files 2>/dev/null | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
elif [[ "<SCOPE>" == diff* ]]; then
  BASE="${SCOPE#diff vs }"; BASE="${BASE:-main}"
  FILES=$(git diff --name-only "$BASE"...HEAD)
  FILE_COUNT=$(echo "$FILES" | grep -c .)
  LINE_COUNT=$(echo "$FILES" | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
  # Auto-lite: activate if FILE_COUNT ≤ 25 and --lite not explicitly passed
else
  FILE_COUNT=$(git ls-files "<SCOPE>" 2>/dev/null | wc -l || find "<SCOPE>" -type f | wc -l)
  LINE_COUNT=$(git ls-files "<SCOPE>" 2>/dev/null | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
fi
```

Cap `LINE_COUNT` at 500k — if larger, warn and suggest narrowing scope.

### 0.3 Detect language signals

Read cheapest manifests: `README.md` (top 30 lines), `package.json`, `pyproject.toml` / `setup.py` / `requirements.txt`, `go.mod`, `Cargo.toml`, `Gemfile`, `pom.xml` / `build.gradle`. Two or three reads is enough. Identify primary languages (Python, TypeScript/JavaScript, Go, Rust, Java, Ruby, etc.) — used only to select pre-pass linters and specialise the specialist briefs.

### 0.4 Select roster

**Full roster (default):** all 7 specialists
- `correctness-reviewer` (loop-until-dry consensus, 2-8 passes — Step 3a)
- `design-reviewer`
- `performance-reviewer` (loop-until-dry consensus, 2-8 passes — Step 3a)
- `maintainability-reviewer`
- `testing-reviewer`
- `api-contract-reviewer`
- `security-reviewer`

**Lite roster** (`--lite` or diff ≤ 25 files):
- `correctness-reviewer` (loop-until-dry consensus, 2-8 passes — Step 3a)
- `design-reviewer`
- `performance-reviewer` (loop-until-dry consensus, 2-8 passes — Step 3a)
- `security-reviewer`

`security-reviewer` is in both rosters by design — it's not opt-in. A missed security bug outweighs the cost saved by cutting it from lite mode, the same reasoning that keeps it out of the `drop-specialist` fast path being a good idea (it can still be dropped explicitly via `drop-specialist security-reviewer` in Step 0.8 if the user insists, but it's never cut automatically).

### 0.5 Detect pre-pass linter availability

Run `command -v <tool>` for each linter. Flag available vs missing. Missing linters reduce pre-pass coverage but don't block the run.

| Tool | Language | Feeds specialist |
|---|---|---|
| `ruff` | Python | maintainability-reviewer, correctness-reviewer |
| `pylint` | Python | design-reviewer, correctness-reviewer |
| `eslint` | JS/TS | maintainability-reviewer, correctness-reviewer |
| `biome` | JS/TS/JSON | maintainability-reviewer |
| `golangci-lint` | Go | correctness-reviewer, design-reviewer |
| `clippy` (`cargo clippy`) | Rust | correctness-reviewer, design-reviewer |
| `rubocop` | Ruby | maintainability-reviewer |
| `shellcheck` | Shell | correctness-reviewer |

### 0.6 Estimate runtime + tokens + cost

- **Input tokens per specialist:** `~min(35k, 25 + 0.015 × LINE_COUNT)` k tokens
- **Output tokens per specialist:** `~5–8k`
- **Total tokens:** `correctness-reviewer` and `performance-reviewer` each run as a loop-until-dry consensus fan-out (Step 3a, `MIN_PASSES = 2` .. `MAX_PASSES = 8`), not a single pass. Since the actual pass count (`N`) isn't known until the loop terminates, estimate with `N` at its expected midpoint (`~4`, i.e. `N-1 = 3` extra specialist-equivalents each) for a planning estimate: `Total tokens ≈ (N_specialists + 6) × (input + output)` — the `+6` accounts for the two specialists at ~3 extra specialist-equivalents each (2 × 3 = 6); worst case `(N_specialists + 14) × (input + output)` if both run the full 8-pass cap (2 × 7 = 14). The Step 4.5 validator adds roughly one more agent call per surviving minor/nit finding group after consolidation, and three calls per surviving critical/major group (3-validator panel) — this can't be sized until findings exist, so note it as "+validator passes (post-consolidation, ~1 call per minor/nit group, ~3 calls per critical/major group)" rather than folding it into this estimate.
- **Runtime:** longest-path specialist ≈ 2–3 min baseline; range = `longest × 1.1` to `longest × 1.5`. The two consensus specialists run their first 2 passes concurrently, then any further passes one at a time until dry or capped — so wall-clock adds roughly one to a few specialists' worth of time depending on how quickly they dry up, not a fixed multiple — plus a consolidation/tally step afterward (~30s).
- **Cost**: look up the current model tier's per-MTok input/output pricing at run time (e.g. via the `claude-api` skill's model catalog or the Models API), then compute `(input × price_in + output × price_out) / 1_000_000`, using the `(N_specialists + 6)` midpoint token total above (or `+14` worst case), plus the validator caveat. Print as `$X.XX` along with the pricing assumption used (model name + rate). Don't hardcode a specific generation's numbers here — they age out every model release.

### 0.7 Render confirmation block

```
╭─ code-review-team ─────────────────────────────────────────╮
│                                                            │
│  Target:     <absolute path>                               │
│  Scope:      <scope>                                       │
│              <N> files, <N> lines                          │
│                                                            │
│  Languages:  <detected, comma-separated>                   │
│  Model:      <current model ID>                            │
│  Mode:       <full | lite>                                 │
│  Run mode:   <baseline | re-review (vs run <prior_run_id>)>│
│                                                            │
│  Specialists (<N> in roster):                              │
│    ✓ correctness-reviewer        (loop-until-dry consensus) │
│    ✓ design-reviewer                                       │
│    ✓ performance-reviewer        (loop-until-dry consensus) │
│    ✓ security-reviewer                                     │
│    ✓ maintainability-reviewer    (full mode)               │
│    ✓ testing-reviewer            (full mode)               │
│    ✓ api-contract-reviewer       (full mode)               │
│                                                            │
│  Pre-pass linters:                                         │
│    ✓ ruff             (found on PATH)                      │
│    ✗ eslint           (missing — skip)                     │
│    ✓ shellcheck                                            │
│                                                            │
│  Estimated:                                                │
│    Tokens:    ~<N>k input / ~<N>k output                   │
│    Runtime:   <N>–<N> min (wall-clock)                     │
│    Cost:      ~$<N.NN> (<model pricing tier>)              │
│    + validator passes after consolidation (~1 call/finding)│
│                                                            │
│  Output:     <TARGET>/.planning/code-review/runs/<run_id>/ │
│              (+ known-findings.jsonl ledger, one level up) │
│                                                            │
╰────────────────────────────────────────────────────────────╯

Proceed? [y / lite / narrow / add-specialist / drop-specialist / abort]
```

### 0.8 Handle response

- **y** / **yes** / (`--yes` flag) → continue to Step 1.
- **lite** → switch to lite roster, re-render 0.7.
- **narrow** → prompt: *"Narrow to which subdirectory or diff?"* — re-run 0.2–0.7 with new scope.
- **add-specialist `<name>`** → append if present in `specialists/`, reject if unknown, re-render 0.7.
- **drop-specialist `<name>`** → remove from roster, re-render 0.7.
- **abort** / **n** / **no** → exit cleanly. Do NOT create output dir. Do NOT spawn any agent.

### 0.9 Run-metadata capture

After confirmation, write `<RUN_DIR>/run-metadata.json`:

```json
{
  "run_id": "<ISO timestamp>",
  "target": "<absolute path>",
  "scope": "<scope>",
  "languages": ["..."],
  "roster": ["..."],
  "mode": "full | lite",
  "run_mode": "baseline | re-review",
  "prior_run_id": "<run_id of the most recent prior run, or null in baseline mode>",
  "linters_available": ["..."],
  "linters_missing": ["..."],
  "model": "<model ID>",
  "estimated_tokens_input": 0,
  "estimated_tokens_output": 0,
  "estimated_cost_usd": 0.0,
  "confirmed_at": "<ISO timestamp>"
}
```

## Step 1: Prepare findings directory

Create `<RUN_DIR>` (`<TARGET>/.planning/code-review/runs/<run_id>/`) if absent — this also creates the parent `<TARGET>/.planning/code-review/` on first run. Every specialist/validator/consolidation output for this run is written under `RUN_DIR`; only `known-findings.jsonl` lives one level up, at `<TARGET>/.planning/code-review/`.

**Gitignore check:** run `git check-ignore <TARGET>/.planning/` (or grep `.gitignore`). If `.planning/` is NOT ignored, warn:
> "⚠ `.planning/` is not in .gitignore. Findings land inside the repo. Options: (a) add to .gitignore, (b) write to /tmp/code-review-<timestamp>/ instead, (c) proceed."

Respect choice. Default (no response): proceed.

## Step 2: Pre-pass linter run

Run available linters before spawning LLM specialists. Linter output feeds specialists as triage context, reducing hallucinations and saving tokens (specialists don't re-derive what a linter can catch deterministically).

### 2.1 Invocation

For each available linter:

```bash
if command -v <linter> >/dev/null 2>&1; then
  run linter, capture stdout
  normalize output to finding.schema.json format
  append to <RUN_DIR>/linter-prepass.jsonl
else
  log "linter <name> not available — skipping"
fi
```

Run linters in parallel. Wall-clock ceiling per linter: 60 s.

### 2.2 Normalization

Normalize each finding to:
- `id` — `linter-<name>-<index>` (e.g. `linter-ruff-001`)
- `specialist` — specialist this routes to (see linter table in 0.5)
- `source` — `"linter-<name>"`
- `severity` — map linter severity to `major` / `minor` / `nit`; linters rarely emit `critical`
- `confidence` — `certain` for deterministic rule hits
- `title`, `root_issue`, `file`, `line_range`, `evidence` — from linter output

Save to `<RUN_DIR>/linter-prepass.jsonl`.

### 2.3 Feed specialists

When spawning each specialist, include a "Pre-pass context" section:

```
Pre-pass linter findings for your scope (from linter-prepass.jsonl):
  [N findings from ruff]
  [M findings from eslint for your category]

Triage rules:
  1. For each linter finding, decide: true-positive / false-positive / needs-investigation.
     Emit a finding entry in your JSONL with source: "linter-<name>-confirmed" (true-positive)
     or source: "linter-<name>-false-positive" (false-positive triaged out).
  2. After triage, find what linters missed via architectural/cross-file analysis — emit with
     source: "specialist" as usual.
```

If zero linters are available, the run continues in LLM-only mode. Log a caveat in REVIEW-REPORT.md.

## Step 3: Spawn specialists in parallel

Issue one `Agent` tool call per specialist in a **single assistant message** — this is what makes them run concurrently.

**`correctness-reviewer` and `performance-reviewer` are excluded from this step** — they run via Step 3a's loop-until-dry consensus fan-out instead. Spawn every other roster specialist here as usual.

For each specialist (other than correctness-reviewer and performance-reviewer):
- Read its brief from `specialists/<name>.md`
- Substitute `<TARGET>`, `<SCOPE>`, `<LANGUAGES>`, and `<RUN_DIR>`, and include the pre-pass linter findings routed to this specialist
- Use `general-purpose` subagent type

**Every specialist must write to `<RUN_DIR>`, not `<TARGET>/.planning/code-review/` directly** — the run-scoped layout is what makes Step 0.1a's re-review detection and the `known-findings.jsonl` ledger work. `<RUN_DIR>` must always be one of the substituted tokens, alongside `<TARGET>`, `<SCOPE>`, and `<LANGUAGES>`.

Print before the parallel batch:

```
Spawning <N> specialists in parallel against <TARGET> (scope: <SCOPE>, mode: <mode>).

Each specialist writes to <RUN_DIR>/<name>.{md,findings.jsonl,coverage.jsonl,status.json}.

Live progress:
  tail -f <RUN_DIR>/*.status.json

Spawning now.
```

### 3.1 Heartbeat contract (per specialist)

Each specialist writes `<name>.status.json` at spawn and updates as it progresses:

```json
{
  "agent": "<specialist-name>",
  "status": "starting | scanning | writing-findings | completed | errored",
  "started_at": "<ISO>",
  "finished_at": "<ISO|null>",
  "files_read": 0,
  "findings_written": 0,
  "current_file": "<path|null>",
  "severity_counts": { "critical": 0, "major": 0, "minor": 0, "nit": 0 },
  "error": "<message|null>"
}
```

Write on spawn with `status: "starting"`. Update every ~5 file reads. On completion: `status: "completed"`, `finished_at`, final counts.

### 3.2 Interim reporting (orchestrator-side)

As each specialist returns, print one line:

```
✓ correctness-reviewer      done    (1C / 2M / 3m / 1N)   [2m 45s]   8 files read
✓ design-reviewer           done    (0C / 1M / 2m / 3N)   [3m 12s]   11 files read
✗ testing-reviewer          errored after 4m — timeout. Partial findings preserved.
```

Errored specialists don't block the run. After all specialists return:

```
All <N> specialists completed (<X> done, <Y> errored). Consolidating...
```

### 3.3 Output files per specialist

Each specialist writes four files to `<RUN_DIR>`:
- `<name>.md` — prose findings, human-readable, grouped by severity
- `<name>.findings.jsonl` — structured findings (see schema below)
- `<name>.coverage.jsonl` — dimensions covered, per coverage schema
- `<name>.status.json` — heartbeat / final state

**Finding JSONL schema** (per finding):

```json
{
  "id": "<specialist-name>-<zero-padded-index>",
  "specialist": "<specialist-name>",
  "source": "specialist | linter-<name>-confirmed | linter-<name>-false-positive",
  "severity": "critical | major | minor | nit",
  "confidence": "certain | likely | possible | unverified",
  "title": "<short title>",
  "root_issue": "<slug, used for deduplication across specialists>",
  "file": "<absolute path>",
  "line_range": "<start>-<end>",
  "evidence": "<exact code snippet or config excerpt>",
  "fix": "<recommended fix, concrete>",
  "related": ["<other finding IDs>"],
  "merge_recommendation": "block | recommend-fix | defer | optional",
  "hit_count": "<int, optional — consensus passes this finding was seen in; only set for correctness-reviewer/performance-reviewer (Step 3a), omitted for single-pass specialists>"
}
```

**Coverage JSONL schema** (per dimension):

```json
{
  "specialist": "<name>",
  "category": "<dimension slug>",
  "status": "checked-clean | checked-issues-found | not-checked | deferred-to-other-specialist",
  "confidence": "high | medium | low",
  "searches": ["<grep patterns or file reads performed>"],
  "files_read": 0,
  "search_limits": "<what couldn't be checked>"
}
```

## Step 3a: Multi-pass consensus fan-out (correctness-reviewer, performance-reviewer)

`correctness-reviewer` and `performance-reviewer` are the two specialists most prone to sampling variance — a single pass can find a random subset of the real issues and miss different ones each time. Instead of spawning them once (Step 3), run each through a **loop-until-dry** fan-out — independent passes with the file scope reordered per pass, keeping only findings that reproduce across at least 2 passes, and stopping once a pass stops contributing anything new rather than always running a fixed count. This is modeled on Cursor Bugbot's multi-pass agreement design, adapted so effort scales with how much variance the diff/scope is actually producing: a small diff dries up in 2-3 passes; a large baseline scan may use the full cap.

`MAX_PASSES = 8` — the hard ceiling regardless of whether passes are still finding new issues. `MIN_PASSES = 2` — the floor, since `hit_count >= 2` can never have a survivor with fewer than 2 passes.

### 3a.1 File-order rotation

Enumerate the scope's file list once (same enumeration as Step 0.2). For pass `i` (1-indexed, 1..`MAX_PASSES`), rotate the list by `i × floor(len / MAX_PASSES)` positions (wrap-around) before handing it to the specialist brief as an explicit ordered file list — rotating against the fixed ceiling (not however many passes end up running) keeps every pass's ordering distinct regardless of when the loop stops. This produces a materially different read order per pass without depending on random-number generation, which a markdown-driven orchestration can't reliably produce.

### 3a.2 Spawn passes — loop until a round is dry, capped at `MAX_PASSES`

For each of `correctness-reviewer` and `performance-reviewer`, independently:
1. Run passes 1 and 2 (`MIN_PASSES`) concurrently as 2 `Agent` calls in a **single assistant message** — the minimum needed for any `hit_count >= 2` survivor to exist at all.
2. After every pass (or batch) completes, tally (3a.3) and compare this round's distinct `root_issue` set against the union of every `root_issue` seen in all prior rounds for this specialist:
   - **This round introduced at least one `root_issue` not seen in any earlier round** → continue: spawn one more pass (`i+1`).
   - **This round introduced zero new `root_issue`s** → stop. The pass is "dry" — further passes are unlikely to surface anything new.
   - Regardless of dryness, **stop unconditionally once pass `MAX_PASSES` (8) completes.**
3. Passes after the initial 2 are spawned one at a time (each pass's file rotation depends only on its own fixed index, not on prior results — only the *stopping decision* is sequential).

Each pass uses the specialist's normal brief (substituting `<TARGET>`, `<LANGUAGES>`, `<RUN_DIR>`, pre-pass linter findings as usual), with the rotated file order substituted for `<SCOPE>`'s file enumeration, plus an added line: "This is pass `<i>` of up to `MAX_PASSES` independent review passes over the same scope, each in a different file order. Review thoroughly as if this were the only pass — do not assume another pass covers what you skip."
Each pass writes to `<RUN_DIR>/<name>.pass<i>.findings.jsonl` and `<name>.pass<i>.status.json` — **not** the canonical `<name>.findings.jsonl` / `<name>.status.json`. The canonical files are written by the tally step below, once the loop terminates.

### 3a.3 Tally and threshold

Once the loop in 3a.2 terminates (a dry round, or the `MAX_PASSES` cap) with `N` total passes run for a specialist (`MIN_PASSES <= N <= MAX_PASSES`):
1. Read all `N` `<name>.pass<i>.findings.jsonl` files.
2. Group findings by `root_issue` across the `N` passes.
3. For each group, compute `hit_count` = number of *distinct* passes it appeared in (1–`N`).
4. Keep only groups with `hit_count >= 2` — drop the rest as one-off, unreproduced findings (sampling noise or hallucination).
5. For each surviving group, take the representative finding with the highest `confidence` (ties: earliest pass), tag it with `hit_count`, and write it to the canonical `<name>.findings.jsonl`, ranked by `hit_count` descending. Union the `coverage.jsonl` entries across all `N` passes into the canonical `<name>.coverage.jsonl` (a dimension is `checked-clean` only if all `N` passes checked it clean).
6. Write the canonical `<name>.status.json` as `completed`, with `severity_counts` reflecting only the survivors.
7. Print one line per specialist: `✓ correctness-reviewer consensus: <kept>/<total distinct root_issues> root_issues survived (hit_count >= 2 of N passes, stopped <on a dry round after pass N | at the MAX_PASSES cap>)`.

Step 4's consolidation reads `<name>.findings.jsonl` and `<name>.coverage.jsonl` exactly as it does for every other specialist — it has no knowledge that these came from a variable-length tally rather than a single pass.

## Step 4: Consolidate

Read all `*.findings.jsonl` and `*.coverage.jsonl`. Validate every line against `schema/finding.schema.json` / `schema/coverage.schema.json` respectively (same schema-first contract `sec-review-team` uses) before consolidating. If any specialist failed schema validation on its JSONL, fall back to prose parse for that specialist (read `<name>.md` instead) and log a warning in `REVIEW-REPORT.md` naming the specialist and the validation failure — don't silently drop its findings or treat a malformed line as a clean run. Apply `docs/consolidation-template.md`:

1. Group findings by `root_issue` (dedupe across specialists).
2. For each group: `max(severity)`, `max(confidence)`, `distinct(specialist) → raised_by`, `confirmed_by: [list of specialists]`, `hit_count` (carried through if present).
3. Rank by: `confirmed_by.length DESC`, then `hit_count DESC` (if present), then `severity DESC`, then `confidence DESC`.
4. Build coverage matrix (dimension × specialist). **Completeness-score denominator:** the union of every roster specialist's static "Coverage dimensions owned" list (from its brief), not `count(coverage.jsonl records actually written)` — an errored specialist that wrote zero coverage records must not shrink the denominator by having its owned dimensions silently disappear from the count, which would let a less-complete run score higher than a more-complete one. Missing dimensions score as `not-checked` (✗ in the matrix), which drags the score down as it should.

Every deduped group — regardless of confidence — proceeds to Step 4.5. There is no confidence-based pre-filter here; specialists are instructed to flag everything they notice (Phase 3 of this rework), so the validator step is what decides what's real.

## Step 4.5: Verify

For every group produced by Step 4, spawn validator `Agent`(s) to try to refute it, using the proof standard for that group's specialist (4.5.1) and either a single validator or a 3-validator majority panel depending on severity (4.5.2). Batch validator calls into as few concurrent assistant messages as practical (all in one message, unless the finding count is large enough to need splitting for tool-call limits).

### 4.5.1 Category-specific proof standards

The single "concrete failing input" standard only fits findings that are bugs you can trigger with an input. Design, maintainability, testing, and API-contract findings are not bugs in that sense — applying the input-triggerable standard to them means every one gets rejected as "can't confirm," not because the finding is wrong but because the proof standard doesn't match the claim being made. Select the sentence below by the group's `specialist` field (if a group has `confirmed_by` from multiple specialists, use the proof standard for the specialist that raised the most severe instance of the finding):

| Specialist | Proof standard |
|---|---|
| `correctness-reviewer`, `performance-reviewer`, `security-reviewer` | Can you PROVE it's real with a concrete failing input? |
| `design-reviewer`, `maintainability-reviewer` | Can you PROVE it's real by naming the concrete future change this makes harder, citing both sites? |
| `testing-reviewer` | Can you PROVE it's real by naming the changed code path with no test reaching it? |
| `api-contract-reviewer` | Can you PROVE it's real by citing a breaking call site? |

**Validator prompt** (substitute the group's consolidated fields and the proof-standard line from the table above):

> Here is a claimed issue: `<title>` — `<one-line summary combining evidence + fix from the group>`.
> Open `<file>:<line_range>`, read the surrounding code and its callers.
> `<proof-standard line for this group's specialist>`
> - Yes → keep, attach the cited proof (failing case / cited sites / cited path / cited call site, per the standard above).
> - No / can't confirm from the actual code → drop it.
> Cite `file:line`. Do not infer from naming — verify against the actual code you read.

**Validator subagent constraints:** read-only (`Read`, `Grep`, `Glob`, safe `Bash` allowlist matching the specialist briefs' allowlist); no `Write` access to findings files — it returns its verdict as its final message, which the orchestrator parses.

### 4.5.2 Single validator vs. 3-validator majority panel

- **Minor/nit severity groups** — spawn one validator `Agent`, as above. Its verdict is final.
- **Critical/major severity groups** — spawn **3 independent validator `Agent`s in the same assistant message** (all 3 concurrently), each given the identical prompt from 4.5.1 (same file/line, same category-appropriate proof standard). This is a majority-vote panel, not a re-ask-until-confirmed loop — each validator sees only the finding and the code, not the other validators' verdicts. Require **2 of 3 "Yes" verdicts** to confirm. Rationale: at critical/major severity, one validator's misread, timeout, or error silently dropping a real finding is the costliest failure mode in this step; a 3-way panel means a single bad verdict can't unilaterally kill the finding.

**Handle the verdict:**
- **Confirmed** (single validator says Yes, or 2-of-3 panel says Yes) — set `validator_confirmed: true` on the group, attach the cited proof from a confirming validator. For panel groups, also record `panel_votes: "<k>/3"`. The group proceeds to the report.
- **Rejected** (single validator says No, or panel fails to reach 2-of-3 Yes) — set `validator_confirmed: false`. Drop the group from `REVIEW-REPORT.md` entirely. Append it (with the validator's/panel's rejection reasons) to `<RUN_DIR>/rejected-by-validator.jsonl` for audit/debugging — this file is never surfaced in the report body, only mentioned by count in Tooling Caveats.
- **A validator errors/times out** — for single-validator groups, treat as unconfirmed (drop, log to `<RUN_DIR>/rejected-by-validator.jsonl` with `error: true`) rather than blocking the run. For panel groups, treat the errored validator's vote as "No" and resolve the remaining votes normally (i.e. the other 2 validators still need to both say Yes to reach 2-of-3) — a single validator's error must not by itself sink a panel-eligible finding the way it would a single-validator one.

After this step, `actionable = [g for g in groups if g.validator_confirmed]` — this replaces the old confidence-based `certain|likely` filter. Everything that survives the validator is actionable by definition; everything that doesn't is dropped, not demoted.

**Re-review filter** (only when `re_review_mode` is true, from Step 0.1a): after computing `actionable`, load `<TARGET>/.planning/code-review/known-findings.jsonl` and split every non-nit ledger entry into exactly one of two disjoint sets relative to this run:

- **`reconfirmed_known`** — the entry's `root_issue` also appears in this run's `actionable` (an independent specialist re-found it and the validator re-confirmed it, this run). Drop these groups from `actionable` before rendering the report — already reported in a prior run, don't repeat it — and record `len(reconfirmed_known)` for Step 5's Tooling Caveats. A `reconfirmed_known` entry needs no lightweight re-verification below: this run's fresh validator confirmation is stronger evidence than any stored `file`/`evidence_snippet` grep could provide.
- **`carried_over_known`** — the entry's `root_issue` does **not** appear in this run's `actionable` (not independently rediscovered this run — its file may be entirely outside this run's `<SCOPE>`, or in scope but simply missed by every specialist this pass). **`<SCOPE>` never gates membership here** — a diff-scoped run's ledger entries for files outside the diff still enter `carried_over_known` exactly like any other not-rediscovered entry; `<SCOPE>` only ever governed which files specialists actively looked at, not which known findings this run is allowed to report status on. The lightweight check below (not scope) is what keeps an unverified claim from being asserted about a file this run never touched. **Before running that check, first look up this run's `<RUN_DIR>/rejected-by-validator.jsonl`:** if the entry's `root_issue` appears there (a specialist rediscovered it this run and the validator explicitly rejected it as fixed/unreachable/already-guarded), treat that rejection as authoritative and exclude the entry from "still open" without running the grep check below — a same-run validator verdict is stronger evidence either way than a stale snippet match.

Then drop every remaining `nit`-severity group from `actionable` outright (nits are never carried forward into the report) — nit-severity ledger entries are excluded from both sets above for the same reason: a nit is never carried forward whether it resurfaces in `actionable` or only survives in the ledger. Record the nit-suppressed count — `count(actionable groups dropped as nit this run)` specifically, not ledger-only nit entries, which were never part of either set and were never counted or reported to begin with — for Step 5's Tooling Caveats. Baseline runs (`re_review_mode` false) skip this filter entirely — `reconfirmed_known` and `carried_over_known` are both empty, and there is no still-open bookkeeping to do.

> **Example:** ledger has three non-nit entries — `R1` (file inside this run's diff), `R2` (file outside this run's diff), `R3` (file touched and re-examined this pass). This re-review run's specialists rediscover and the validator reconfirms `R3` this pass → `R3 ∈ reconfirmed_known` (suppressed from the report, no lightweight check needed). `R1` and `R2` are not rediscovered by any specialist this run → both land in `carried_over_known` regardless of scope — `R2` is not dropped just because it's outside the diff.

Derive `merge_recommendation` from the final (post-re-review-filter, if applicable) validator-confirmed set: if any Critical exists → "Request Changes — Critical issues present"; else if Major count > 0 → "Request Changes — Major issues found"; else if any actionable finding exists → "Approved with suggestions"; else → "Approved".

**Update the ledger:** append every validator-confirmed `root_issue` from *this* run that isn't already in `<TARGET>/.planning/code-review/known-findings.jsonl` (including ones suppressed from this run's report because they matched the re-review filter — the ledger tracks everything ever confirmed, not just what's newly shown) — with `first_seen_run_id` set to this run's `run_id`, `file` set to the finding's `file`, and `evidence_snippet` set to the finding's `evidence` field trimmed to its first line only, up to ~80 characters, whichever is shorter — never spanning a newline, since the re-verification check below matches it line-by-line — for genuinely new entries; `first_seen_run_id`/`first_seen_date` on existing entries are left unchanged (they record provenance, not current state). **Refresh `file`/`evidence_snippet` on every reconfirmation:** whenever a `root_issue` lands in `reconfirmed_known` this run (validator-confirmed, and already had a ledger entry), overwrite that entry's `file`/`evidence_snippet` with this run's finding, regardless of whether the fields were already populated. This is deliberate, not just a legacy-entry backfill: code legitimately moves (refactors, renames), and an entry frozen at its first-confirmed location would eventually cause the lightweight check below to grep a stale, possibly-nonexistent path and wrongly conclude a still-present issue is "no longer open." `first_seen_run_id`/`first_seen_date` still never change on this refresh — only the location/evidence fields track the most recent confirmation.

**Re-verify "still open" claims before reporting them (do not assert by absence alone):** for every `root_issue` in `carried_over_known` not already excluded by this run's `rejected-by-validator.jsonl` (above), don't just count it as "still open" because it's still on the ledger — a `carried_over_known` entry may have been fixed since it was first confirmed, and the ledger by itself can't tell you that. Instead:
1. Look up that `root_issue`'s ledger record's `file` and `evidence_snippet`.
2. **Legacy entries — no `file`/`evidence_snippet` on record:** these two fields didn't exist in the ledger schema before this re-verification mechanism was added, so any `known-findings.jsonl` written by an earlier version of this skill will have entries missing them. For those, the mechanical check in step 4 below is impossible to run — there's nothing to grep for. Don't treat "can't check" the same as "can't confirm" (step 4's exclusion rule): fall back to the pre-fix behavior and count the entry toward "still open" as before, but tag it in Step 5's caveats as `<N> previously-reported issues counted as still open without re-verification (ledger entry predates file/evidence tracking)` — this keeps the count from silently shrinking just because older entries lack the new fields, while being honest that those specific counts are unconfirmed. Once any of these `root_issue`s is independently reconfirmed by a specialist in a future run, it moves to that run's `reconfirmed_known` and the ledger-append step refreshes its `file`/`evidence_snippet`, so this caveat category shrinks over time and eventually empties out.
3. **Path containment check:** resolve `file` against `<TARGET>`. If it resolves outside `<TARGET>`'s tree (via `..` traversal, an absolute path pointing elsewhere, or any other escape) — a ledger value should never do this, but the ledger is ordinary repo-tracked JSON an external contributor could edit — treat it the same as a legacy entry (step 2): can't verify, count with the unverified caveat, and do not read or grep the out-of-tree path.
4. **In-tree entries with `file`/`evidence_snippet` on record:** check file existence, then run the grep as a single fixed-string, argument-safe invocation — native argument passing with an explicit `--` separator (e.g. `grep -qF -- "<evidence_snippet>" "<resolved_file_path>"`, never a shell string concatenation), or equivalently the `Grep` tool in literal mode — using the same restricted, read-only tool scope a specialist would use, never an unconstrained shell. If `file` no longer exists at that path, or the grep returns no match, the finding can no longer be confirmed present at that location.
   - **Critical/major severity:** a miss here is **not** treated as "confirmed absent" — treat it as unverified, same bucket as a legacy entry (step 2), and tag it separately in Step 5 as `<N> critical/major previously-reported issues could not be re-verified this run — status unknown, recommend manual check`. The stakes of a false "no longer open" on a critical/major finding are too high to fold silently into the same exclusion path as a minor one.
   - **Minor severity:** a miss excludes it from the "still open" count for this run's report, as before (it may have been fixed, refactored away, or moved somewhere a plain grep won't find).
5. Only `root_issue`s whose `evidence_snippet` still greps-clean in `file` (step 4) count toward `<P>` in Step 5's "previously-reported issues still open" line; legacy entries (step 2), out-of-tree entries (step 3), and critical/major unverified misses (step 4) all count toward `<P>` too, but are called out separately in the caveats as unverified. This is a cheap, mechanical check for the entries that support it, not a full re-review — it catches the common case (the file/snippet is simply gone) without re-running a specialist. Perform it as a single loop over all of `carried_over_known` (one script/`Bash` invocation), not one tool call per entry.
6. This check only affects what gets *reported* as still open this run — it never edits or removes entries from `known-findings.jsonl` itself, which remains a historical record of everything ever confirmed.

> **Example (3-run backfill trace):** Run N (pre-fix baseline, before this ledger schema existed) confirms `root_issue: R4` and appends it to the ledger with no `file`/`evidence_snippet` (legacy shape). Run N+1 (re-review; no specialist re-finds `R4` this pass): `R4 ∉ actionable` → `R4 ∈ carried_over_known`; its ledger record has no `file`/`evidence_snippet` → step 2's legacy fallback fires → `R4` counts toward `<P>`, tagged "counted without re-verification." Run N+2 (re-review; a specialist independently re-finds `R4` and the validator reconfirms it this pass): `R4 ∈ actionable` and already in the ledger → `R4 ∈ reconfirmed_known` → suppressed from the report, and the ledger-append step's refresh clause (above) now sets `R4`'s `file`/`evidence_snippet` from this run's finding. Run N+3 (re-review; `R4` not re-found again, and its file hasn't moved since N+2): `R4 ∉ actionable` → back in `carried_over_known`, its ledger record has `file`/`evidence_snippet` from N+2 → step 4's grep check runs and `R4` counts toward `<P>` as verified, no caveat. (Had `R4`'s code instead moved to a new file between N+2 and N+3 without being rediscovered, step 4's existence check on the stale N+2 path would fail — for a minor finding this excludes it as before; for a critical/major finding it's flagged unverified rather than silently dropped, per step 4's severity branch above.)

Render `<RUN_DIR>/REVIEW-REPORT.md` from the consolidation template using only the final actionable groups — `<P>` (the still-open count from the re-verification above) is now available for the template.

## Step 5: Deliver

Tell the user:
- Path to `<RUN_DIR>/REVIEW-REPORT.md` and the four (or up to nine, in loop-until-dry specialists' case — canonical + up to 8 per-pass files) per-specialist files
- **Merge recommendation** (headline)
- Headline severity counts (deduped, validator-confirmed, post-re-review-filter): `Critical: N | Major: N | Minor: N | Nit: N`
- Top 3 findings by impact (title + one-line fix)
- Validator summary: `<N> findings confirmed, <M> rejected by the validator` (rejected count only — not the rejected findings themselves)
- If `re_review_mode`: `<P> previously-reported issues still open (not repeated above — see known-findings.jsonl), <Q> nits suppressed` — if any of `<P>` are legacy entries counted per the still-open re-verification step's step 2 (predating `file`/`evidence_snippet` tracking), append `(<L> of these counted without re-verification — ledger entry predates file/evidence tracking)`; if any critical/major entries hit step 4's unverified branch, append a separate line: `<M> critical/major previously-reported issues could not be re-verified this run — status unknown, recommend manual check`
- Tooling caveats (linters unavailable, specialists errored)

Do NOT apply fixes. Fix workflow: open the relevant file, address findings manually, re-run `/fsad-harness:code-review-team diff vs main` to verify.

---

## Related

- **Specialist library:** `specialists/` (7 briefs)
- **Consolidation template:** `docs/consolidation-template.md`
