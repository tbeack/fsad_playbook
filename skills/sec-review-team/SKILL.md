---
name: sec-review-team
description: Run a multi-agent security review TEAM over a codebase or recent diff. Picks a specialist roster based on detected stack signals (webapp / desktop / iac / llm-agent / container / backend / etc.) from a library of 13 specialists. Each specialist writes structured JSONL + prose findings in parallel; orchestrator consolidates into a single severity-ranked REPORT.md with deduped root issues. Distinct from the built-in `/security-review` (which is a single-pass branch review). Use when the user says "multi-agent security review", "security review team", "sec-review team", "audit this branch with a team", "pre-release hardening team pass", or similar. Review-only — no fixes. Validated on Opus 4.7 (see markdown/research/security-review-opus-4.7-validation.md).
argument-hint: `[target path] [scope: all | <subdir> | diff vs main] [--yes]`
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
- **Flags:** `--yes` / `-y` skips confirmation entirely. Default is to confirm.

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

### 0.5 Detect scanner availability

For each scanner in Step 2.5's pre-pass list, run `command -v <name>`. Flag available vs missing. Missing scanners don't block — they just reduce pre-pass coverage; dependent specialists will work in manual mode.

### 0.6 Estimate runtime + tokens + cost

Use these baselines (from CBP-060 reference run against `recall` on Opus 4.7):

- **Input tokens per specialist:** `~min(40k, 30 + 0.02 × LINE_COUNT)` k tokens — small repos float near 30k overhead; large repos grow linearly with source lines but the agent self-caps reads.
- **Output tokens per specialist:** `~5–10k` regardless of repo size (findings + prose).
- **Total tokens:** `N_specialists × (input + output)`.
- **Runtime:** longest-path specialist `≈ 3 min` baseline; add `0.6 sec / file read`. Dependency auditor is typically slowest (`~20–30 min` on a repo with a 700-package `node_modules`). Report estimate as a range: `longest × 1.1` to `longest × 1.5`.
- **Cost** (on Opus 4.7 pricing — $5/MTok input, $25/MTok output, April 2026): `(input_tokens × 5 + output_tokens × 25) / 1_000_000`. Print `$X.XX`.

Use `claude-opus-4-7[1m]` pricing if the orchestrator is running on the 1M-context variant; otherwise standard Opus 4.7. Print the pricing assumption.

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
│                                                            │
│  Specialists (<N> in roster):                              │
│    ✓ secrets-crypto-auditor                                │
│    ✓ dependency-supplychain-auditor                        │
│    ✓ silent-failure-hunter                                 │
│    ✓ data-exposure-auditor                                 │
│    ✓ <stack-specific additions>                            │
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
│                                                            │
│  Output:      <TARGET>/.planning/security-review/          │
│                                                            │
╰────────────────────────────────────────────────────────────╯

Proceed? [y / narrow / add-specialist / drop-specialist / abort]
```

### 0.8 Handle response

- **y** / **yes** / (`--yes` flag) → continue to Step 1.
- **narrow** → prompt: *"Narrow to which subdirectory or diff?"* — re-run 0.2–0.7 with the new scope.
- **add-specialist `<name>`** → append the named specialist if present in `specialists/`, reject if unknown, re-render 0.7.
- **drop-specialist `<name>`** → remove from roster, warn if dropping a baseline specialist (*"secrets-crypto is in the baseline. Drop anyway?"*), re-render 0.7.
- **abort** / **n** / **no** / empty response after 60 s (if interactive) → exit cleanly. Do NOT create `.planning/security-review/`. Do NOT spawn any agent.

### 0.9 Run-metadata capture

After confirmation, before Step 1, write `<TARGET>/.planning/security-review/run-metadata.json`:

```json
{
  "run_id": "<ISO timestamp>",
  "target": "<absolute path>",
  "scope": "<scope>",
  "stack_signals": ["..."],
  "roster": ["..."],
  "scanners_available": ["..."],
  "scanners_missing": ["..."],
  "model": "<model ID>",
  "estimated_tokens_input": <N>,
  "estimated_tokens_output": <N>,
  "estimated_cost_usd": <N.NN>,
  "confirmed_at": "<ISO timestamp>"
}
```

This is consumed later by the consolidation step (fills in REPORT.md header), by re-run comparison (CBP-066), and by telemetry if enabled.

## Step 1: Final roster

Load only the specialist brief files from `specialists/` that match the confirmed roster. Do not load briefs for specialists not in the roster.

## Step 2: Prepare findings directory

Create `<TARGET>/.planning/security-review/` if absent.

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
  append to <TARGET>/.planning/security-review/scanner-prepass.jsonl
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

Save to `<TARGET>/.planning/security-review/scanner-prepass.jsonl`.

### 2.5.4 Feed specialists

When spawning each specialist in Step 3, include a "Pre-pass context" section in the brief:

```
Pre-pass scanner findings relevant to your specialist (from `<TARGET>/.planning/security-review/scanner-prepass.jsonl`):

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

For each specialist:

- Read its brief file (`specialists/<name>.md`).
- Substitute `<TARGET>`, `<SCOPE>`, `<STACK CONTEXT>`, `<THREAT_MODEL>`.
- Pass `allowed-tools` per the specialist's `## Allowed tools` section (hard read-only; Write scoped to the four output-file paths only).
- Use `preferred_subagent_type` from frontmatter; fall back to `fallback_subagent_type` if unregistered.

Print to the user before the parallel batch returns:

```
Spawning <N> specialists in parallel against <TARGET> (scope: <SCOPE>).

Each specialist writes to <TARGET>/.planning/security-review/<name>.{md, findings.jsonl, coverage.jsonl, status.json}.

Live progress (run in a separate terminal):
  watch -n 5 'jq -s "sort_by(.agent) | map({agent, status, files_read, findings_written})" <TARGET>/.planning/security-review/*.status.json'

Or:
  tail -f <TARGET>/.planning/security-review/*.status.json

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

Each specialist writes four files:

- `<name>.md` — prose findings (human-readable)
- `<name>.findings.jsonl` — per `schema/finding.schema.json`
- `<name>.coverage.jsonl` — per `schema/coverage.schema.json`
- `<name>.status.json` — heartbeat / final state

## Step 4: Consolidate

Read all `*.findings.jsonl` and `*.coverage.jsonl`. Apply `docs/consolidation-template.md`:

1. Group findings by `root_issue` (dedupe).
2. For each group: `max(severity)`, `max(confidence)`, `distinct(specialist) → raised_by`.
3. Split actionable (`certain|likely`) from worth-investigating (`possible|unverified`).
4. Build coverage matrix (category × specialist) from coverage.jsonl.
5. Render `REPORT.md` from template.

If any specialist failed schema validation on its JSONL, fall back to prose parse for that specialist and log a warning in REPORT.md.

As each specialist returns, print an interim-status line: `✓ <name> done (<counts>) [<runtime>]` or `✗ <name> errored: <msg>`. Don't block on errored specialists.

## Step 5: Deliver

Tell the user:
- Path to `REPORT.md` and the four per-specialist files each
- Headline severity counts (deduped)
- Top 2–3 fixes by impact
- Tooling caveats (scanners unavailable, fallbacks taken, specialists errored)
- Coverage completeness score

Do NOT apply fixes. Fix workflow → companion skill `/sec-review-fixes` (CBP-070).

---

## Related
- **Specialist library:** `specialists/` (13 briefs)
- **Stack signals:** `stack-signals.md`
- **Schemas:** `schema/finding.schema.json`, `schema/coverage.schema.json`
- **Consolidation template:** `docs/consolidation-template.md`
- **Design tradeoffs:** `docs/tradeoffs.md`
- **Canonical prompt source:** [`markdown/design/Team_of_security_agents.md`](../../../markdown/design/Team_of_security_agents.md)
- **Embedded playbook section:** `fsad-playbook.html` → `#practices/security-review`
- **Opus 4.7 validation:** [`markdown/research/security-review-opus-4.7-validation.md`](../../../markdown/research/security-review-opus-4.7-validation.md)
- **Improvement recommendations:** [`markdown/research/sec-review-recommendations.md`](../../../markdown/research/sec-review-recommendations.md)
