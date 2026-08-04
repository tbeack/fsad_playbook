# Specialist output-format contract

Every `sec-review-team` specialist — regardless of which stack roster includes it — writes the same four files, in the same formats, to `<RUN_DIR>` (`<TARGET>/.planning/security-review/runs/<run_id>/`). This doc is the single source of truth for that contract. Specialist briefs reference this file instead of each other, so the contract is available on any roster (previously 9 of 13 briefs pointed at `auth-authz-auditor.md` for format details, which isn't loaded on stack-only rosters like a Terraform-only run).

## Output contract (four files per specialist, all in `<RUN_DIR>`)

1. **`<name>.md`** — prose findings, human-readable, grouped by severity. "Scope reviewed" at top, severity counts at bottom.
2. **`<name>.findings.jsonl`** — one JSON object per line per finding, conforming to `schema/finding.schema.json`. Required fields: `id`, `specialist`, `severity`, `confidence`, `title`, `root_issue`, `file`, `exploit`, `fix`, `evidence`.
3. **`<name>.coverage.jsonl`** — one record per attack-class axis in the specialist's scope, conforming to `schema/coverage.schema.json`. For each category, report `status` (`checked-clean` / `checked-issues-found` / `not-checked` / `deferred-to-other-specialist`), `confidence` (`high`/`medium`/`low`), `searches` run, `files_read`, `search_limits`.
4. **`<name>.status.json`** — write at spawn with `{status: "starting", started_at, files_read: 0, findings_written: 0}`; update every ~5 reads; on completion write `{status: "completed", finished_at, ..., severity_counts}`. Flush to disk before the `Agent` call returns.

## Prose finding format

```
[SEVERITY: critical|high|medium|low] <file>:<line> — <issue>
Exploit scenario: …
Recommended fix: …
Evidence: <exact code/config snippet>
```

Group by severity.

## Confidence

Set on every finding:

- `certain` — directly observed, fix mechanical.
- `likely` — observed + reasonable inference.
- `possible` — indirect evidence or architectural smell.
- `unverified` — cannot confirm without runtime.

## Hard rules

- Read-only (tools are allowlisted to prove it).
- Cite concrete evidence — `file:line` at minimum.
- **Flag everything you notice, even low-confidence hunches** — use `confidence: possible` or `unverified` for speculative findings rather than omitting them. The Step 4.5 validator decides keep or drop; specialists no longer self-filter on confidence (see `code-review-team`'s TBS-044 precedent for why: self-reported-confidence gates lose recall on real issues, and a dedicated adversarial validator recovers that recall without flooding the report with unconfirmed speculation).
- If a category is N/A, emit a `coverage.jsonl` entry with the searches + `search_limits` that prove the N/A.
- Don't overlap with other specialists — defer via `coverage.status=deferred-to-other-specialist`.

## Allowed tools

- `Read` — any file under target.
- `Grep`, `Glob` — any file under target.
- `Bash` allowlist: `ls`, `cat`, `head`, `tail`, `wc`, `find`, `fd`, `rg`, `grep`, `git status`, `git log`, `git diff`, `git ls-files`, `git show`, `git blame`, `jq`.
- `Write` — **scoped** to this specialist's own `<name>.{md,findings.jsonl,coverage.jsonl,status.json}` only.
- **Denied:** `Edit`, arbitrary `Bash`, `Write` outside the four output files, `NotebookEdit`, `WebFetch`, `WebSearch`.

## Report-back

Every specialist reports back: absolute paths of the four output files + one-line severity counts.
