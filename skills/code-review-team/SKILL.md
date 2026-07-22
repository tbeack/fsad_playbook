---
description: Run a multi-agent code review TEAM over a codebase diff or path. Dispatches 7 specialist reviewers in parallel (correctness, design, performance, maintainability, testing, api-contract, security), consolidates findings into a severity-ranked REVIEW-REPORT.md with inter-agent agreement scoring, adversarial validation, and a merge recommendation. correctness and performance run as a 5-pass consensus fan-out; every surviving finding is verified by a dedicated validator agent before it can appear in the report. Use when the user says "code review team", "multi-agent code review", "team review", "review this diff with a team", or similar. Review-only — no fixes.
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
- `correctness-reviewer` (5-pass consensus — Step 3a)
- `design-reviewer`
- `performance-reviewer` (5-pass consensus — Step 3a)
- `maintainability-reviewer`
- `testing-reviewer`
- `api-contract-reviewer`
- `security-reviewer`

**Lite roster** (`--lite` or diff ≤ 25 files):
- `correctness-reviewer` (5-pass consensus — Step 3a)
- `design-reviewer`
- `performance-reviewer` (5-pass consensus — Step 3a)
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
- **Total tokens:** `correctness-reviewer` and `performance-reviewer` each run as a 5-pass consensus fan-out (Step 3a), not a single pass. Treat them as 5 "specialist-equivalents" each when estimating: `Total tokens = (N_specialists + 8) × (input + output)` — the `+8` accounts for those two specialists costing 5× instead of 1× (2 × (5-1) = 8 extra specialist-equivalents). The Step 4.5 validator adds roughly one more agent call per surviving finding group after consolidation — this can't be sized until findings exist, so note it as "+validator passes (post-consolidation, ~1 call per finding group)" rather than folding it into this estimate.
- **Runtime:** longest-path specialist ≈ 2–3 min baseline; range = `longest × 1.1` to `longest × 1.5`. The 5-pass specialists run their passes concurrently (single message), so they add roughly one specialist's worth of wall-clock, not five — but do add a consolidation/tally step afterward (~30s).
- **Cost** (Sonnet 4.6 pricing — $3/MTok input, $15/MTok output): `(input × 3 + output × 15) / 1_000_000`, using the `(N_specialists + 8)` token total above, plus the validator caveat. Print as `$X.XX`. Use Opus 4.7 pricing ($5/$25) if running on Opus.

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
│    ✓ correctness-reviewer        (5-pass consensus)        │
│    ✓ design-reviewer                                       │
│    ✓ performance-reviewer        (5-pass consensus)        │
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
- **add-specialist `<name>`** → append if present in `~/.claude/skills/code-review-team/specialists/`, reject if unknown, re-render 0.7.
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

**`correctness-reviewer` and `performance-reviewer` are excluded from this step** — they run via Step 3a's 5-pass consensus fan-out instead. Spawn every other roster specialist here as usual.

For each specialist (other than correctness-reviewer and performance-reviewer):
- Read its brief from `~/.claude/skills/code-review-team/specialists/<name>.md`
- Substitute `<TARGET>`, `<SCOPE>`, `<LANGUAGES>`, and include the pre-pass linter findings routed to this specialist
- Use `general-purpose` subagent type

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

`correctness-reviewer` and `performance-reviewer` are the two specialists most prone to sampling variance — a single pass can find a random subset of the real issues and miss different ones each time. Instead of spawning them once (Step 3), run each through `N_PASSES = 5` independent passes with the file scope reordered per pass, then keep only findings that reproduce across at least 2 passes. This is modeled on Cursor Bugbot's multi-pass agreement design, scaled to 5 passes / ≥2 agreement per this project's cost tolerance.

### 3a.1 File-order rotation

Enumerate the scope's file list once (same enumeration as Step 0.2). For pass `i` (1-indexed, 1..5), rotate the list by `i × floor(len/5)` positions (wrap-around) before handing it to the specialist brief as an explicit ordered file list. This produces a materially different read order per pass without depending on random-number generation, which a markdown-driven orchestration can't reliably produce.

### 3a.2 Spawn passes

For each of `correctness-reviewer` and `performance-reviewer`:
- Issue 5 `Agent` calls (one per pass) in a **single assistant message** so all 5 passes for that specialist run concurrently.
- Each pass uses the specialist's normal brief (substituting `<TARGET>`, `<LANGUAGES>`, pre-pass linter findings as usual), with the rotated file order substituted for `<SCOPE>`'s file enumeration, plus an added line: "This is pass `<i>` of 5 independent review passes over the same scope, each in a different file order. Review thoroughly as if this were the only pass — do not assume another pass covers what you skip."
- Each pass writes to `<RUN_DIR>/<name>.pass<i>.findings.jsonl` and `<name>.pass<i>.status.json` — **not** the canonical `<name>.findings.jsonl` / `<name>.status.json`. The canonical files are written by the tally step below, once all 5 passes complete.

### 3a.3 Tally and threshold

After all 5 passes for a specialist complete:
1. Read all 5 `<name>.pass<i>.findings.jsonl` files.
2. Group findings by `root_issue` across the 5 passes.
3. For each group, compute `hit_count` = number of *distinct* passes it appeared in (1–5).
4. Keep only groups with `hit_count >= 2` — drop the rest as one-off, unreproduced findings (sampling noise or hallucination).
5. For each surviving group, take the representative finding with the highest `confidence` (ties: earliest pass), tag it with `hit_count`, and write it to the canonical `<name>.findings.jsonl`, ranked by `hit_count` descending. Union the `coverage.jsonl` entries across all 5 passes into the canonical `<name>.coverage.jsonl` (a dimension is `checked-clean` only if all 5 passes checked it clean).
6. Write the canonical `<name>.status.json` as `completed`, with `severity_counts` reflecting only the survivors.
7. Print one line per specialist: `✓ correctness-reviewer consensus: <kept>/<total distinct root_issues> root_issues survived (hit_count >= 2 of 5 passes)`.

Step 4's consolidation reads `<name>.findings.jsonl` and `<name>.coverage.jsonl` exactly as it does for every other specialist — it has no knowledge that these came from a 5-pass tally rather than a single pass.

## Step 4: Consolidate

Read all `*.findings.jsonl` and `*.coverage.jsonl`. Apply `~/.claude/skills/code-review-team/docs/consolidation-template.md`:

1. Group findings by `root_issue` (dedupe across specialists).
2. For each group: `max(severity)`, `max(confidence)`, `distinct(specialist) → raised_by`, `confirmed_by: [list of specialists]`, `hit_count` (carried through if present).
3. Rank by: `confirmed_by.length DESC`, then `hit_count DESC` (if present), then `severity DESC`, then `confidence DESC`.
4. Build coverage matrix (dimension × specialist).

Every deduped group — regardless of confidence — proceeds to Step 4.5. There is no confidence-based pre-filter here; specialists are instructed to flag everything they notice (Phase 3 of this rework), so the validator step is what decides what's real.

## Step 4.5: Verify

For every group produced by Step 4, spawn one validator `Agent` to try to refute it. Batch validator calls into as few concurrent assistant messages as practical (all in one message, unless the finding count is large enough to need splitting for tool-call limits).

**Validator prompt** (substitute the group's consolidated fields):

> Here is a claimed bug: `<title>` — `<one-line summary combining evidence + fix from the group>`.
> Open `<file>:<line_range>`, read the surrounding code and its callers.
> Can you PROVE it's real with a concrete failing input?
> - Yes → keep, attach the failing case.
> - No / can't confirm from the actual code → drop it.
> Cite `file:line`. Do not infer from naming — verify against the actual code you read.

**Validator subagent constraints:** read-only (`Read`, `Grep`, `Glob`, safe `Bash` allowlist matching the specialist briefs' allowlist); no `Write` access to findings files — it returns its verdict as its final message, which the orchestrator parses.

**Handle the verdict:**
- **Confirmed** — set `validator_confirmed: true` on the group, attach the cited `failing_case`. The group proceeds to the report.
- **Rejected** — set `validator_confirmed: false`. Drop the group from `REVIEW-REPORT.md` entirely. Append it (with the validator's rejection reason) to `<RUN_DIR>/rejected-by-validator.jsonl` for audit/debugging — this file is never surfaced in the report body, only mentioned by count in Tooling Caveats.
- **Validator itself errors/times out** — treat as unconfirmed (drop from report, log to `<RUN_DIR>/rejected-by-validator.jsonl` with `error: true`) rather than blocking the run.

After this step, `actionable = [g for g in groups if g.validator_confirmed]` — this replaces the old confidence-based `certain|likely` filter. Everything that survives the validator is actionable by definition; everything that doesn't is dropped, not demoted.

**Re-review filter** (only when `re_review_mode` is true, from Step 0.1a): after computing `actionable`, load `<TARGET>/.planning/code-review/known-findings.jsonl` and drop any group whose `root_issue` already appears there (already reported in a prior run — don't repeat it), then drop every remaining `nit`-severity group outright (nits are never carried forward). Record the two suppressed counts for Step 5's Tooling Caveats. Baseline runs (`re_review_mode` false) skip this filter entirely.

Derive `merge_recommendation` from the final (post-re-review-filter, if applicable) validator-confirmed set: if any Critical exists → "Request Changes — Critical issues present"; else if Major count > 0 → "Request Changes — Major issues found"; else if any actionable finding exists → "Approved with suggestions"; else → "Approved".

Render `<RUN_DIR>/REVIEW-REPORT.md` from the consolidation template using only the final actionable groups.

**Update the ledger:** append every validator-confirmed `root_issue` from *this* run that isn't already in `<TARGET>/.planning/code-review/known-findings.jsonl` (including ones suppressed from this run's report because they matched the re-review filter — the ledger tracks everything ever confirmed, not just what's newly shown) — with `first_seen_run_id` set to this run's `run_id` for genuinely new entries, left unchanged for entries that already existed.

## Step 5: Deliver

Tell the user:
- Path to `<RUN_DIR>/REVIEW-REPORT.md` and the four (or five, in 5-pass specialists' case — canonical + 5 per-pass files) per-specialist files
- **Merge recommendation** (headline)
- Headline severity counts (deduped, validator-confirmed, post-re-review-filter): `Critical: N | Major: N | Minor: N | Nit: N`
- Top 3 findings by impact (title + one-line fix)
- Validator summary: `<N> findings confirmed, <M> rejected by the validator` (rejected count only — not the rejected findings themselves)
- If `re_review_mode`: `<P> previously-reported issues still open (not repeated above — see known-findings.jsonl), <Q> nits suppressed`
- Tooling caveats (linters unavailable, specialists errored)

Do NOT apply fixes. Fix workflow: open the relevant file, address findings manually, re-run `/fsd:code-review-team diff vs main` to verify.

---

## Related

- **Specialist library:** `~/.claude/skills/code-review-team/specialists/` (7 briefs)
- **Consolidation template:** `~/.claude/skills/code-review-team/docs/consolidation-template.md`
- **Research basis:** `planning/research/code-review-agents-research.md` (TBS-022)
