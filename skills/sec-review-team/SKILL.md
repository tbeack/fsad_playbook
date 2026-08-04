---
name: sec-review-team
description: Run a multi-agent security review TEAM over a codebase or recent diff. Picks a specialist roster based on detected stack signals (webapp / desktop / iac / llm-agent / container / backend / mobile / etc.) from a library of 13 specialists. Each specialist writes structured JSONL + prose findings in parallel; input-validation-auditor and auth-authz-auditor run a 5-pass consensus fan-out; every deduped finding is adversarially verified by a dedicated validator agent before it can appear in the report. Orchestrator consolidates into a single severity-ranked REPORT.md with deduped root issues, archived per-run under a known-findings.jsonl ledger that drives auto re-review. Distinct from the built-in `/security-review` (which is a single-pass branch review). Use when the user says "multi-agent security review", "security review team", "sec-review team", "audit this branch with a team", "pre-release hardening team pass", or similar. Review-only — no fixes.
argument-hint: `[target path] [scope: all | <subdir> | diff vs main] [--lite] [--yes]`
---

# Multi-Agent Security Review Team — Orchestration

Follow these steps. Review-only. Never apply fixes.

## Step 0: Pre-run confirmation

The skill's largest user-facing safety gate. Never spawn specialists without showing this block (unless `--yes` / `auto-approve` is passed).

### 0.1 Parse arguments

- **Target path** — absolute path. If missing, ask: *"What repo should I review? (absolute path)"* Verify it exists and is readable.
- **Scope** — one of:
  - `all` — full tree
  - `<subdir>` — a subdirectory, e.g. `src/api/`
  - `diff vs main` (or `diff vs <branch>`) — only files changed on current branch vs target branch
  If missing, ask: *"What scope? Full tree, a subdirectory, or a diff?"*
- **Flags:**
  - `--yes` / `-y` — skip confirmation entirely. Default is to confirm.
  - `--lite` / `-l` — run only the baseline 4 (`secrets-crypto-auditor`, `dependency-supplychain-auditor`, `silent-failure-hunter`, `data-exposure-auditor`) plus `auth-authz-auditor` and `input-validation-auditor` when the stack roster would otherwise include them (5–6 agent subset). Auto-activated when scope is a diff with ≤25 changed files, same threshold as `code-review-team`.
  - `--full` — force a fresh baseline scan, ignoring any prior run history for this target (see Step 0.1a). Without this flag, a target with prior history runs in re-review mode automatically.

### 0.1a Detect prior run (re-review mode)

Every run writes its artifacts under a run-scoped directory, `RUN_DIR = <TARGET>/.planning/security-review/runs/<run_id>/` (`run_id` = an ISO-timestamp-derived slug), so a later run never overwrites an earlier one. Runs accumulate a top-level ledger at `<TARGET>/.planning/security-review/known-findings.jsonl` — one record per validator-confirmed `root_issue` ever reported for this target (`root_issue`, `title`, `severity`, `first_seen_run_id`, `first_seen_date`).

1. Check whether `<TARGET>/.planning/security-review/known-findings.jsonl` exists.
2. **Exists, and `--full` was not passed** → `re_review_mode = true`. This run skips `root_issue`s already in the ledger and suppresses all `low`/`info`-severity findings from the report (Step 4's consolidation, `re_review_mode` branch — sec-review-team's severity floor for "nit-equivalent" is `low`/`info`, mirroring `code-review-team`'s nit suppression). Announce this in the Step 0.7 confirmation block.
3. **Missing, or `--full` was passed** → `re_review_mode = false`. This is a baseline scan; every validator-confirmed finding is eligible for the report, and the ledger is (re)built from this run's results.

All `RUN_DIR`-relative paths referenced in Steps 0.9 through 5 below resolve against the `RUN_DIR` computed here — the ledger itself is the one exception, always written at the top-level `<TARGET>/.planning/security-review/` regardless of `run_id`.

### 0.2 Enumerate scope

Use git-aware commands (fall back to `find` if not a git repo):

```bash
# File count + line count (scoped)
cd "<TARGET>"
if [[ "<SCOPE>" == "all" ]]; then
  FILE_COUNT=$(git ls-files | wc -l)
  LINE_COUNT=$(git ls-files | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
elif [[ "<SCOPE>" == diff* ]]; then
  BASE="${SCOPE#diff vs }"; BASE="${BASE:-main}"
  FILES=$(git diff --name-only "$BASE"...HEAD)
  FILE_COUNT=$(echo "$FILES" | wc -l)
  LINE_COUNT=$(echo "$FILES" | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
else
  FILE_COUNT=$(git ls-files "<SCOPE>" | wc -l)
  LINE_COUNT=$(git ls-files "<SCOPE>" | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
fi
```

Cap `LINE_COUNT` at 500k (anything larger: warn and suggest scope narrowing).

### 0.3 Detect stack signals

Read the highest-signal manifests first (cheapest): `README.md` top 50 lines, `package.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`, `Gemfile`, `tauri.conf.json`, `Dockerfile`, `.github/workflows/` (existence only), `requirements.txt`. Two or three file-reads is enough.

Apply each rule in `stack-signals.md` against what you observe. Collect matching signals (multiple can match). Example: a Tauri note app emits `desktop` + `desktop-with-webview`.

### 0.4 Pick default roster

Per `stack-signals.md`: union the specialist sets across all matching stack signals. Always include the baseline 4 (`secrets-crypto-auditor`, `dependency-supplychain-auditor`, `silent-failure-hunter`, `data-exposure-auditor`).

**`--lite` mode** (explicit flag or diff ≤25 files, per 0.1): restrict the roster to the baseline 4 plus `auth-authz-auditor` and `input-validation-auditor` — but only if the stack-signal union would have included them anyway. Do not add either specialist in lite mode if the full-roster resolution wouldn't have included it (e.g. a pure `iac`-only target stays baseline-only in lite mode, not baseline+auth+input-validation). All other stack-specific additions (`iac-auditor`, `container-runtime-auditor`, `frontend-security-auditor`, etc.) are dropped in lite mode. `--lite` never drops `input-validation-auditor` or `auth-authz-auditor` when they'd otherwise be in roster — mirroring `code-review-team`'s decision to keep `security-reviewer` mandatory in its lite roster, on the same reasoning: a missed injection or authz bug outweighs the tokens saved by cutting these two.

### 0.5 Detect scanner availability

For each scanner in Step 2.5's pre-pass list, run `command -v <name>`. Flag available vs missing. Missing scanners don't block — they just reduce pre-pass coverage; dependent specialists will work in manual mode.

### 0.6 Estimate runtime + tokens + cost

**Historical baseline** (from the CBP-060 reference run against a mid-size repo, executed on Opus 4.7 — kept as a labeled historical data point, not a current default):

- **Input tokens per specialist:** `~min(40k, 30 + 0.02 × LINE_COUNT)` k tokens — small repos float near 30k overhead; large repos grow linearly with source lines but the agent self-caps reads.
- **Output tokens per specialist:** `~5–10k` regardless of repo size (findings + prose).
- **Total tokens:** `input-validation-auditor` and `auth-authz-auditor` each run as a 5-pass consensus fan-out when in roster (Step 3a), not a single pass. Treat each as 5 "specialist-equivalents" when estimating: `Total tokens = (N_specialists + 4 × N_consensus_specialists_in_roster) × (input + output)` — the `+4` per consensus specialist accounts for it costing 5× instead of 1× (5-1=4 extra specialist-equivalents). The Step 4.5 validator adds roughly one more agent call per surviving finding group after consolidation — this can't be sized until findings exist, so note it as "+validator passes (post-consolidation, ~1 call per finding group)" rather than folding it into this estimate.
- **Runtime:** longest-path specialist `≈ 3 min` baseline; add `0.6 sec / file read`. Dependency auditor is typically slowest (`~20–30 min` on a repo with a 700-package `node_modules`). Report estimate as a range: `longest × 1.1` to `longest × 1.5`. The two 5-pass specialists run their passes concurrently (single message), so they add roughly one specialist's worth of wall-clock, not five — but add a consolidation/tally step afterward (~30s each).
- **Cost (compute at run time, not from the historical baseline above):** look up the current model tier's per-MTok input/output pricing (e.g. via the `claude-api` skill's model catalog or the Models API) for whatever model the orchestrator is actually running on, then compute `(input_tokens × price_in + output_tokens × price_out) / 1_000_000`, using the consensus-adjusted token total above plus the validator caveat. Print `$X.XX` along with the pricing assumption used (model name + rate) so the estimate doesn't silently rot next generation.

### 0.7 Render confirmation block

```
╭─ sec-review-team ──────────────────────────────────────────╮
│                                                            │
│  Target:     <absolute path>                               │
│  Scope:      <scope>                                       │
│              <N> files, <N> lines                          │
│                                                            │
│  Stack:      <detected signals, comma-separated>           │
│  Model:      <current model ID>                            │
│  Mode:       <full | lite>                                 │
│  Run mode:   <baseline | re-review (vs run <prior_run_id>)>│
│                                                            │
│  Specialists (<N> in roster):                              │
│    ✓ secrets-crypto-auditor                                │
│    ✓ dependency-supplychain-auditor                        │
│    ✓ silent-failure-hunter                                 │
│    ✓ data-exposure-auditor                                 │
│    ✓ auth-authz-auditor          (5-pass consensus)        │
│    ✓ input-validation-auditor    (5-pass consensus)        │
│    ✓ <stack-specific additions>  (full mode only)          │
│                                                            │
│  Pre-pass scanners:                                        │
│    ✓ gitleaks          (found on PATH)                     │
│    ✗ trufflehog        (missing — skip)                    │
│    ✓ semgrep                                               │
│    ✓ npm audit                                             │
│    ✗ cargo audit       (missing — skip)                    │
│                                                            │
│  Estimated:                                                │
│    Tokens:    ~<N>k input / ~<N>k output                   │
│    Runtime:   <N>–<N> min (wall-clock)                     │
│    Cost:      ~$<N.NN> (<model pricing tier>)              │
│    + validator passes after consolidation (~1 call/finding)│
│                                                            │
│  Output:     <TARGET>/.planning/security-review/runs/<run_id>/│
│              (+ known-findings.jsonl ledger, one level up) │
│                                                            │
╰────────────────────────────────────────────────────────────╯

Proceed? [y / lite / narrow / add-specialist / drop-specialist / abort]
```

### 0.8 Handle response

- **y** / **yes** / (`--yes` flag) → continue to Step 1.
- **lite** → switch to lite roster (per 0.4), re-render 0.7.
- **narrow** → prompt: *"Narrow to which subdirectory or diff?"* — re-run 0.2–0.7 with the new scope.
- **add-specialist `<name>`** → append the named specialist if present in `specialists/`, reject if unknown, re-render 0.7.
- **drop-specialist `<name>`** → remove from roster, warn if dropping a baseline specialist (*"secrets-crypto is in the baseline. Drop anyway?"*), re-render 0.7.
- **abort** / **n** / **no** / empty response after 60 s (if interactive) → exit cleanly. Do NOT create `.planning/security-review/`. Do NOT spawn any agent.

### 0.9 Run-metadata capture

After confirmation, before Step 1, write `<RUN_DIR>/run-metadata.json` (`<RUN_DIR>` from Step 0.1a):

```json
{
  "run_id": "<ISO timestamp>",
  "target": "<absolute path>",
  "scope": "<scope>",
  "stack_signals": ["..."],
  "roster": ["..."],
  "mode": "full | lite",
  "run_mode": "baseline | re-review",
  "prior_run_id": "<run_id of the most recent prior run, or null in baseline mode>",
  "scanners_available": ["..."],
  "scanners_missing": ["..."],
  "model": "<model ID>",
  "estimated_tokens_input": <N>,
  "estimated_tokens_output": <N>,
  "estimated_cost_usd": <N.NN>,
  "confirmed_at": "<ISO timestamp>"
}
```

This is consumed later by the consolidation step (fills in REPORT.md header), by re-run comparison, and by telemetry if enabled.

## Step 1: Final roster

Load only the specialist brief files from `specialists/` that match the confirmed roster. Do not load briefs for specialists not in the roster.

## Step 2: Prepare findings directory

Create `<RUN_DIR>` (`<TARGET>/.planning/security-review/runs/<run_id>/`) if absent — this also creates the parent `<TARGET>/.planning/security-review/` on first run. Every specialist/validator/consolidation output for this run is written under `RUN_DIR`; only `known-findings.jsonl` lives one level up, at `<TARGET>/.planning/security-review/`.

**Pollution check:** run `git check-ignore <TARGET>/.planning/` (or grep `.gitignore`). If `.planning/` is NOT ignored, warn the user:
> "⚠ `.planning/` is not in the target's .gitignore. Findings land inside the repo. Options: (a) add to .gitignore, (b) write to /tmp/sec-review-<timestamp>/ instead, (c) proceed."

Respect choice. Default (no response) is (c).

## Step 2.5: Scanner pre-pass

Deterministic scanners run before the LLM specialists. This is the biggest accuracy-per-token lever in the skill — specialists spend tokens on signal tools can't catch (architectural, multi-step, context-dependent), not re-deriving secret-detection regexes.

### 2.5.1 Scanner inventory

| Scanner | Detects | Command | Feeds specialist |
|---|---|---|---|
| `gitleaks` | secrets at rest | `gitleaks detect --source <TARGET> --report-format json --report-path -` | secrets-crypto-auditor |
| `trufflehog` | secrets (git history + fs) | `trufflehog filesystem <TARGET> --json` | secrets-crypto-auditor |
| `semgrep` | pattern-based SAST | `semgrep scan --config auto --json --output -` | multi: input-validation, data-exposure, silent-failure (by rule category) |
| `npm audit` | npm CVEs | `cd <TARGET> && npm audit --json` | dependency-supplychain-auditor |
| `cargo audit` | crate CVEs | `cd <TARGET> && cargo audit --json` | dependency-supplychain-auditor |
| `pip-audit` | Python CVEs | `pip-audit -r <TARGET>/requirements.txt -f json` | dependency-supplychain-auditor |
| `osv-scanner` | multi-ecosystem CVEs | `osv-scanner -r <TARGET> --format json` | dependency-supplychain-auditor |
| `bandit` | Python SAST | `bandit -r <TARGET> -f json` | input-validation-auditor (Python targets) |
| `hadolint` | Dockerfile lint | `hadolint <file> -f json` | container-runtime-auditor |
| `trivy image` | base image CVEs | `trivy image --format json <image>` | container-runtime-auditor |
| `actionlint` | GHA syntax + security | `actionlint -format '{{json .}}'` | ci-cd-security-auditor |
| `tfsec` | Terraform security | `tfsec <TARGET> --format json` | iac-auditor |
| `checkov` | IaC security | `checkov -d <TARGET> --output json` | iac-auditor |
| `retire.js` | known-vulnerable JS libs | `retire --path <TARGET> --outputformat json` | frontend-security-auditor |

Full mapping: see [`docs/scanner-coverage.md`](docs/scanner-coverage.md).

### 2.5.2 Detection + invocation

For each scanner in the inventory:

```bash
if command -v <scanner> >/dev/null 2>&1; then
  run the scanner, capture stdout
  parse JSON output
  normalize to finding.schema.json format (see 2.5.3)
  append to <RUN_DIR>/scanner-prepass.jsonl
else
  log "scanner <name> not available — skipping"
fi
```

Run scanners in parallel where safe (no shared-state conflicts). Wall-clock ceiling per scanner: 120 s (kill if exceeded; log partial results).

### 2.5.3 Normalization

Every scanner emits different JSON. Normalize each finding to `finding.schema.json` with:

- `id` — `scanner-<name>-<index>` (e.g. `scanner-gitleaks-001`)
- `specialist` — the specialist this finding is routed to (see inventory above). Even scanner findings get routed; specialists triage them.
- `source` — `"scanner-<name>"` (so provenance is visible)
- `severity` — mapped from scanner's severity (`HIGH` → `high`, `MEDIUM` → `medium`, etc.)
- `confidence` — scanners get `certain` for deterministic rule hits, `likely` for heuristic rules
- `title`, `root_issue` — from scanner output, slug-normalized
- `file`, `line_range`, `evidence` — from scanner output
- `exploit`, `fix` — scanners often omit these; leave `""` and let the specialist agent fill during triage

Save to `<RUN_DIR>/scanner-prepass.jsonl`.

### 2.5.4 Feed specialists

When spawning each specialist in Step 3, include a "Pre-pass context" section in the brief:

```
Pre-pass scanner findings relevant to your specialist (from `<RUN_DIR>/scanner-prepass.jsonl`):

  [N findings from gitleaks]
  [M findings from semgrep for your category]

Triage rules:
  1. For each scanner-sourced finding, decide: true-positive / false-positive / needs-investigation.
     Emit a finding entry in your JSONL with `source: "scanner-<name>-confirmed"` (for true-positive) or
     `source: "scanner-<name>-false-positive"` (for false-positive triaged out).
  2. After triage, find what the scanner missed via architectural / cross-file analysis — these go in your
     JSONL with `source: "specialist"` as usual.
```

Specialists are not obligated to re-derive secret regexes. Their job is triage + judgment.

### 2.5.5 REPORT.md provenance

The consolidation step (Step 4) renders `REPORT.md` with a "Source" column for each finding so the reader sees which scanner (if any) caught it and whether a specialist confirmed or overturned the triage. Scanner-only confirmations (no specialist review) are flagged with `⚠ unreviewed by specialist` — this happens when a specialist errored before triaging the scanner pre-pass.

### 2.5.6 Scanner unavailability

If zero scanners are available in the environment, the run continues — specialists do the full job themselves, which is the CBP-060 baseline mode. Log a tooling caveat in REPORT.md so the reader knows coverage is LLM-only.

## Step 3: Spawn specialists in parallel

Issue one `Agent` tool call per specialist in a **single assistant message** — this is what makes them run concurrently.

**`input-validation-auditor` and `auth-authz-auditor` are excluded from this step when they're in roster** — they run via Step 3a's 5-pass consensus fan-out instead. Spawn every other roster specialist here as usual (if neither is in roster for this run's stack signals, this step just spawns the full roster as before).

For each specialist (other than input-validation-auditor and auth-authz-auditor):

- Read its brief file (`specialists/<name>.md`).
- Substitute `<TARGET>`, `<SCOPE>`, `<STACK CONTEXT>`, `<THREAT_MODEL>`.
- Pass `allowed-tools` per the specialist's `## Allowed tools` section (hard read-only; Write scoped to the four output-file paths only).
- Use `preferred_subagent_type` from frontmatter; fall back to `fallback_subagent_type` if unregistered.
- Read the `effort` frontmatter field (`high` / `medium` / `low`; specialists without the field default to `medium`) and tune the spawn accordingly: `high` (currently `auth-authz-auditor`, `input-validation-auditor` — also applied per-pass in Step 3a) gets the model's extended-thinking / max-effort mode where the runtime exposes one, and no early-stop encouragement in the brief; `low` (currently `privacy-telemetry-auditor`, `ci-cd-security-auditor` — narrower, more mechanical scopes) gets standard effort with an added brief line: "This scope is narrow — a thorough single pass is sufficient, don't over-invest reasoning budget beyond what the category list requires."; `medium` (everything else) gets no effort-specific brief addition. This is a token/latency lever, not a quality floor — every specialist still runs the full hard-rules/flag-everything/validator pipeline regardless of effort tier.

Print to the user before the parallel batch returns:

```
Spawning <N> specialists in parallel against <TARGET> (scope: <SCOPE>, mode: <mode>).

Each specialist writes to <RUN_DIR>/<name>.{md, findings.jsonl, coverage.jsonl, status.json}.

Live progress (run in a separate terminal):
  watch -n 5 'jq -s "sort_by(.agent) | map({agent, status, files_read, findings_written})" <RUN_DIR>/*.status.json'

Or:
  tail -f <RUN_DIR>/*.status.json

Spawning now. Interim status lines will appear as each specialist returns.
```

### 3.1 Heartbeat contract (per specialist)

Every specialist brief instructs the agent to write `<name>.status.json` at spawn time and to update it as progress happens. Format:

```json
{
  "agent": "<specialist-name>",
  "status": "starting | scanning | writing-findings | completed | errored",
  "started_at": "<ISO>",
  "finished_at": "<ISO|null>",
  "files_read": <int>,
  "findings_written": <int>,
  "current_file": "<path|null>",
  "severity_counts": { "critical": 0, "high": 0, "medium": 0, "low": 0 },
  "error": "<message|null>"
}
```

- On spawn: write with `status: "starting"`, `started_at`, counters at 0.
- Every ~5 file reads: update `files_read`, `current_file`, set `status: "scanning"`.
- On each finding: increment `findings_written`, update `severity_counts`.
- On completion: set `status: "completed"`, `finished_at`, final counts.
- On error: set `status: "errored"`, `finished_at`, populate `error`.

The agent must flush `.status.json` to disk **before returning from its `Agent` tool call**, so the orchestrator sees the final state once the subagent completes.

### 3.2 Interim reports (orchestrator-side)

Batched `Agent` calls in a single message run concurrently, but the orchestrator receives their results serialized — one completion at a time. As each specialist returns:

1. Read the specialist's `status.json` file to confirm final state.
2. Print **one line** to the user:

```
✓ auth-authz-auditor       done    (0C / 2H / 2M / 1L)   [4m 22s]   12 files read
✓ input-validation-auditor done    (0C / 0H / 0M / 3L)   [3m 15s]    8 files read
✗ dependency-supplychain-auditor errored after 18m — node_modules walk timed out. Partial findings preserved.
✓ silent-failure-hunter    done    (0C / 2H / 3M / 3L)   [5m 03s]   14 files read
...
```

3. Errored specialists don't block the run. Keep processing completions from the remaining specialists. In Step 4 (consolidate), errored specialists are flagged in REPORT.md with their last-known `status.json` state.

4. After the last specialist returns, print:
```
All <N> specialists completed (<X> done, <Y> errored). Consolidating...
```

### 3.3 Output files per specialist

Each specialist writes four files to `<RUN_DIR>`:

- `<name>.md` — prose findings (human-readable)
- `<name>.findings.jsonl` — per `schema/finding.schema.json`
- `<name>.coverage.jsonl` — per `schema/coverage.schema.json`
- `<name>.status.json` — heartbeat / final state

## Step 3a: Multi-pass consensus fan-out (input-validation-auditor, auth-authz-auditor)

`input-validation-auditor` and `auth-authz-auditor` own the two highest-variance tasks in the roster — tracing every external input to its sink, and mapping every endpoint/IPC command to its auth requirement, are both enumerate-everything jobs a single pass under-samples, finding a different random subset of the real issues (and missing others) each run. When either is in the confirmed roster (per Step 0.4 / Step 1), run it through `N_PASSES = 5` independent passes with the file scope reordered per pass, then keep only findings that reproduce across at least 2 passes — the same design `code-review-team` uses for `correctness-reviewer`/`performance-reviewer`, modeled on Cursor Bugbot's multi-pass agreement design, scaled to 5 passes / ≥2 agreement per this project's cost tolerance.

If neither specialist is in roster for this run (e.g. a pure `iac`-only target), skip this step entirely — Step 3 already spawned the full roster as single-pass.

### 3a.1 File-order rotation

Enumerate the scope's file list once (same enumeration as Step 0.2). For pass `i` (1-indexed, 1..5), rotate the list by `i × floor(len/5)` positions (wrap-around) before handing it to the specialist brief as an explicit ordered file list. This produces a materially different read order per pass without depending on random-number generation, which a markdown-driven orchestration can't reliably produce.

### 3a.2 Spawn passes

For each of `input-validation-auditor` and `auth-authz-auditor` that's in roster:
- Issue 5 `Agent` calls (one per pass) in a **single assistant message** so all 5 passes for that specialist run concurrently.
- Each pass uses the specialist's normal brief (substituting `<TARGET>`, `<SCOPE>`, `<STACK CONTEXT>`, pre-pass scanner findings as usual), with the rotated file order substituted for `<SCOPE>`'s file enumeration, plus an added line: "This is pass `<i>` of 5 independent review passes over the same scope, each in a different file order. Review thoroughly as if this were the only pass — do not assume another pass covers what you skip."
- Each pass writes to `<RUN_DIR>/<name>.pass<i>.findings.jsonl` and `<name>.pass<i>.status.json` — **not** the canonical `<name>.findings.jsonl` / `<name>.status.json`. The canonical files are written by the tally step below, once all 5 passes complete.

### 3a.3 Tally and threshold

After all 5 passes for a specialist complete:
1. Read all 5 `<name>.pass<i>.findings.jsonl` files.
2. Group findings by `root_issue` across the 5 passes.
3. For each group, compute `hit_count` = number of *distinct* passes it appeared in (1–5).
4. Keep only groups with `hit_count >= 2` — drop the rest as one-off, unreproduced findings (sampling noise or hallucination).
5. For each surviving group, take the representative finding with the highest `confidence` (ties: earliest pass), tag it with `hit_count`, and write it to the canonical `<name>.findings.jsonl`, ranked by `hit_count` descending. Union the `coverage.jsonl` entries across all 5 passes into the canonical `<name>.coverage.jsonl` (a category is `checked-clean` only if all 5 passes checked it clean).
6. Write the canonical `<name>.status.json` as `completed`, with `severity_counts` reflecting only the survivors.
7. Print one line per specialist: `✓ input-validation-auditor consensus: <kept>/<total distinct root_issues> root_issues survived (hit_count >= 2 of 5 passes)`.

Step 4's consolidation reads `<name>.findings.jsonl` and `<name>.coverage.jsonl` exactly as it does for every other specialist — it has no knowledge that these came from a 5-pass tally rather than a single pass.

## Step 4: Consolidate

Read all `*.findings.jsonl` and `*.coverage.jsonl` from `<RUN_DIR>`. Apply `docs/consolidation-template.md`:

1. Group findings by `root_issue` (dedupe across specialists).
2. For each group: `max(severity)`, `max(confidence)`, `distinct(specialist) → raised_by`, `hit_count` (carried through if present).
3. Build coverage matrix (category × specialist) from coverage.jsonl. **Completeness-score denominator:** the union of every roster specialist's static "Coverage categories this specialist owns" list (from its brief), not `count(coverage.jsonl records actually written)` — an errored specialist that wrote zero coverage records must not shrink the denominator by having its owned categories silently disappear from the count, which would let a less-complete run score higher than a more-complete one. Missing categories score as `not-checked` (shown as ✗ in the matrix), which drags the score down as it should.

Every deduped group — regardless of confidence — proceeds to Step 4.5. There is no confidence-based pre-filter here; specialists are instructed to flag everything they notice (Step 3's briefs), so the validator step is what decides what's real.

If any specialist failed schema validation on its JSONL, fall back to prose parse for that specialist and log a warning in REPORT.md.

As each specialist returns, print an interim-status line: `✓ <name> done (<counts>) [<runtime>]` or `✗ <name> errored: <msg>`. Don't block on errored specialists.

## Step 4.5: Verify

For every group produced by Step 4, spawn one validator `Agent` to try to refute it. Batch validator calls into as few concurrent assistant messages as practical (all in one message, unless the finding count is large enough to need splitting for tool-call limits).

**Validator prompt** (substitute the group's consolidated fields):

> Here is a claimed security finding: `<title>` — `<one-line summary combining evidence + fix from the group>`.
> Open `<file>:<line_range>`, read the surrounding code and its callers/entry points.
> Can you PROVE it's real — with a `file:line` citation AND a working exploit *path* (the concrete chain from an attacker-reachable entry point to the vulnerable sink, since security findings often need a reachability chain rather than a single failing input value)?
> - Yes → keep, attach the exploit path.
> - No / can't confirm from the actual code, or the "vulnerable" sink is unreachable / already guarded → drop it.
> Cite `file:line`. Do not infer from naming or pattern-matching alone — verify against the actual code you read, including what calls into and guards the sink.

**Validator subagent constraints:** read-only (`Read`, `Grep`, `Glob`, safe `Bash` allowlist matching the specialist briefs' allowlist); no `Write` access to findings files — it returns its verdict as its final message, which the orchestrator parses.

**Handle the verdict:**
- **Confirmed** — set `validator_confirmed: true` on the group, attach the cited `exploit_path`. The group proceeds to the report.
- **Rejected** — set `validator_confirmed: false`. Drop the group from `REPORT.md` entirely. Append it (with the validator's rejection reason) to `<RUN_DIR>/rejected-by-validator.jsonl` for audit/debugging — this file is never surfaced in the report body, only mentioned by count in Tooling Caveats.
- **Validator itself errors/times out** — treat as unconfirmed (drop from report, log to `<RUN_DIR>/rejected-by-validator.jsonl` with `error: true`) rather than blocking the run.

After this step, `actionable = [g for g in groups if g.validator_confirmed]` — this replaces the old confidence-based `certain|likely` split that used to gate inclusion here. Everything that survives the validator is actionable by definition; everything that doesn't is dropped, not demoted.

**Re-review filter** (only when `re_review_mode` is true, from Step 0.1a): after computing `actionable`, load `<TARGET>/.planning/security-review/known-findings.jsonl` and drop any group whose `root_issue` already appears there (already reported in a prior run — don't repeat it), then drop every remaining `low`/`info`-severity group outright (sec-review-team's floor tier is never carried forward on re-review, mirroring `code-review-team`'s nit suppression). Record the two suppressed counts for Step 5's Tooling Caveats. Baseline runs (`re_review_mode` false) skip this filter entirely.

Render `<RUN_DIR>/REPORT.md` from the consolidation template using only the final actionable groups.

**Update the ledger:** append every validator-confirmed `root_issue` from *this* run that isn't already in `<TARGET>/.planning/security-review/known-findings.jsonl` (including ones suppressed from this run's report because they matched the re-review filter — the ledger tracks everything ever confirmed, not just what's newly shown) — with `first_seen_run_id` set to this run's `run_id` for genuinely new entries, left unchanged for entries that already existed.

## Step 5: Deliver

Tell the user:
- Path to `<RUN_DIR>/REPORT.md` and the per-specialist files each (four, or five/six for the two consensus specialists — canonical + 5 per-pass files)
- Headline severity counts (deduped, validator-confirmed, post-re-review-filter)
- Top 2–3 fixes by impact
- Validator summary: `<N> findings confirmed, <M> rejected by the validator` (rejected count only — not the rejected findings themselves, see `rejected-by-validator.jsonl`)
- If `re_review_mode`: `<P> previously-reported issues still open (not repeated above — see known-findings.jsonl), <Q> low/info findings suppressed`
- Tooling caveats (scanners unavailable, fallbacks taken, specialists errored)
- Coverage completeness score

Do NOT apply fixes. Fix workflow → companion skill `/fsd:sec-review-fixes`.

---

## Related
- **Specialist library:** `specialists/` (13 briefs)
- **Stack signals:** `stack-signals.md`
- **Schemas:** `schema/finding.schema.json`, `schema/coverage.schema.json`
- **Shared output-format contract:** [`docs/output-contract.md`](docs/output-contract.md)
- **Consolidation template:** [`docs/consolidation-template.md`](docs/consolidation-template.md)
- **Scanner coverage map:** [`docs/scanner-coverage.md`](docs/scanner-coverage.md)
- **Design tradeoffs:** [`docs/tradeoffs.md`](docs/tradeoffs.md)
- **Embedded playbook section:** `fsad-playbook.html` → `#practices/security-review`
