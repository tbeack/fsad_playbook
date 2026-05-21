---
description: Run a multi-agent code review TEAM over a codebase diff or path. Dispatches 6 specialist reviewers in parallel (correctness, design, performance, maintainability, testing, api-contract), consolidates findings into a severity-ranked REVIEW-REPORT.md with inter-agent agreement scoring and a merge recommendation. Use when the user says "code review team", "multi-agent code review", "team review", "review this diff with a team", or similar. Review-only — no fixes.
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
  - `--lite` / `-l` — run only correctness, design, performance specialists (3-agent subset). Auto-activated when scope is a diff with ≤25 changed files.

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

**Full roster (default):** all 6 specialists
- `correctness-reviewer`
- `design-reviewer`
- `performance-reviewer`
- `maintainability-reviewer`
- `testing-reviewer`
- `api-contract-reviewer`

**Lite roster** (`--lite` or diff ≤ 25 files):
- `correctness-reviewer`
- `design-reviewer`
- `performance-reviewer`

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
- **Total tokens:** `N_specialists × (input + output)`
- **Runtime:** longest-path specialist ≈ 2–3 min baseline; range = `longest × 1.1` to `longest × 1.5`
- **Cost** (Sonnet 4.6 pricing — $3/MTok input, $15/MTok output): `(input × 3 + output × 15) / 1_000_000`. Print as `$X.XX`. Use Opus 4.7 pricing ($5/$25) if running on Opus.

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
│                                                            │
│  Specialists (<N> in roster):                              │
│    ✓ correctness-reviewer                                  │
│    ✓ design-reviewer                                       │
│    ✓ performance-reviewer                                  │
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
│                                                            │
│  Output:     <TARGET>/.planning/code-review/               │
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

After confirmation, write `<TARGET>/.planning/code-review/run-metadata.json`:

```json
{
  "run_id": "<ISO timestamp>",
  "target": "<absolute path>",
  "scope": "<scope>",
  "languages": ["..."],
  "roster": ["..."],
  "mode": "full | lite",
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

Create `<TARGET>/.planning/code-review/` if absent.

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
  append to <TARGET>/.planning/code-review/linter-prepass.jsonl
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

Save to `<TARGET>/.planning/code-review/linter-prepass.jsonl`.

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

For each specialist:
- Read its brief from `~/.claude/skills/code-review-team/specialists/<name>.md`
- Substitute `<TARGET>`, `<SCOPE>`, `<LANGUAGES>`, and include the pre-pass linter findings routed to this specialist
- Use `general-purpose` subagent type

Print before the parallel batch:

```
Spawning <N> specialists in parallel against <TARGET> (scope: <SCOPE>, mode: <mode>).

Each specialist writes to <TARGET>/.planning/code-review/<name>.{md,findings.jsonl,coverage.jsonl,status.json}.

Live progress:
  tail -f <TARGET>/.planning/code-review/*.status.json

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

Each specialist writes four files to `<TARGET>/.planning/code-review/`:
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
  "merge_recommendation": "block | recommend-fix | defer | optional"
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

## Step 4: Consolidate

Read all `*.findings.jsonl` and `*.coverage.jsonl`. Apply `~/.claude/skills/code-review-team/docs/consolidation-template.md`:

1. Group findings by `root_issue` (dedupe across specialists).
2. For each group: `max(severity)`, `max(confidence)`, `distinct(specialist) → raised_by`, `confirmed_by: [list of specialists]`.
3. Rank by: `confirmed_by.length DESC`, then `severity DESC`, then `confidence DESC`.
4. Split actionable (`certain|likely`) from worth-investigating (`possible|unverified`).
5. Derive `merge_recommendation`: if any Critical exists → "Request Changes — Critical issues present"; else if Major count > 0 → "Request Changes — Major issues found"; else → "Approved with suggestions".
6. Build coverage matrix (dimension × specialist).
7. Render `REVIEW-REPORT.md` from consolidation template.

## Step 5: Deliver

Tell the user:
- Path to `REVIEW-REPORT.md` and the four per-specialist files
- **Merge recommendation** (headline)
- Headline severity counts (deduped): `Critical: N | Major: N | Minor: N | Nit: N`
- Top 3 findings by impact (title + one-line fix)
- Tooling caveats (linters unavailable, specialists errored)

Do NOT apply fixes. Fix workflow: open the relevant file, address findings manually, re-run `/fsd:code-review-team diff vs main` to verify.

---

## Related

- **Specialist library:** `~/.claude/skills/code-review-team/specialists/` (6 briefs)
- **Consolidation template:** `~/.claude/skills/code-review-team/docs/consolidation-template.md`
- **Research basis:** `planning/research/code-review-agents-research.md` (TBS-022)
