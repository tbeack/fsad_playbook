# CBP-067 — sec-review-team: integrate off-the-shelf scanners as pre-pass (P1.4)

## Source
Recommendation P1.4 in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md). Called out as the biggest accuracy-per-token lever after P0.1 (structured output).

## Summary
Before spawning LLM specialists, run deterministic off-the-shelf scanners (`gitleaks`, `trufflehog`, `semgrep --config auto`, `npm audit`, `cargo audit`, `pip-audit`, `osv-scanner`, `bandit`) where available. Feed each scanner's output into the relevant specialist's brief as context: "here's what `gitleaks` flagged; triage for false positives + look for secrets the scanner missed." Specialists now spend tokens on signal that tools can't catch — architectural, multi-step, context-dependent — instead of re-deriving secret-scanning rules.

## Assessment
- **Current state:** `dependency-supplychain-auditor` already tries `npm audit` and `cargo audit` manually. No other specialists integrate scanners. On CBP-060's reference run, `npm audit` / `cargo audit` weren't available on the host and the agent handled this correctly (documented the gap, declined to fabricate CVE IDs) — but also didn't run the scanners elsewhere.
- **Scanners to integrate (prioritized):**
  - `gitleaks`, `trufflehog` — secrets (feeds `secrets-crypto-auditor`)
  - `semgrep --config auto` — rule-based pattern matching (feeds multiple specialists based on rule category)
  - `npm audit`, `cargo audit`, `pip-audit`, `osv-scanner` — known CVE dependencies (feeds `dependency-supplychain-auditor`)
  - `bandit` — Python SAST (feeds `input-validation-auditor` for Python targets)
  - Optional: `tfsec`, `checkov` — IaC (feeds `iac-auditor` once CBP-069 lands)
- **Dependency:** CBP-061 (structured JSONL) — scanner output gets normalized into the same finding schema before being fed to specialists.

**Location:** `.claude/skills/sec-review-team/SKILL.md` — new Step 2.5 "Scanner pre-pass"; per-specialist briefs updated to accept scanner context.

## Plan

1. Add Step 2.5 to `SKILL.md`: "Scanner pre-pass."
   - For each scanner in the priority list, check if the binary is available (`command -v <tool>`).
   - If available, run the scanner against the target (scoped to `<SCOPE>`).
   - Capture JSON output where supported, otherwise parse textual output.
   - Normalize each scanner's output into `finding.jsonl` entries with `source: "scanner-<name>"` (distinguishes scanner-sourced from specialist-sourced findings).
   - Store pre-pass findings in `<TARGET>/.planning/security-review/scanner-prepass.jsonl`.
2. Update each relevant specialist brief to accept pre-pass context:
   - "You are provided with findings from `<scanner>`: <count> items. Your job is to (a) triage each (true positive / false positive / needs investigation), (b) find what the scanner missed by applying architectural judgment."
3. Add a `scanner-coverage.md` to the skill's `docs/` directory documenting which scanner feeds which specialist:
   - `gitleaks`/`trufflehog` → `secrets-crypto-auditor`
   - `semgrep` → multiple (`input-validation-auditor`, `data-exposure-auditor`, `silent-failure-hunter` based on rule category)
   - `npm audit` / `cargo audit` / `osv-scanner` / `pip-audit` → `dependency-supplychain-auditor`
   - `bandit` → `input-validation-auditor` (Python)
   - `tfsec` / `checkov` → `iac-auditor`
4. In the CBP-062 pre-run confirmation, list which scanners will run and which are unavailable. User can opt out of a scanner.
5. Update consolidation (`REPORT.md`) to show scanner-sourced findings alongside specialist-sourced, with provenance visible.
6. Re-run against `recall` with scanners available (install on audit host if needed). Expected: faster run (some axes finish in the pre-pass), more complete coverage on dependency/secrets axes.

## Acceptance Criteria
- [x] `SKILL.md` Step 2.5 "Scanner pre-pass" runs all available scanners, skips unavailable ones cleanly.
- [x] Scanner output normalized into `finding.jsonl` format with `source` field.
- [x] `scanner-prepass.jsonl` saved alongside specialist findings files.
- [x] Each relevant specialist brief instructs the agent to triage scanner-flagged items + find missed signal.
- [x] `scanner-coverage.md` documents the scanner → specialist mapping.
- [x] Pre-run confirmation (from CBP-062) lists scanner availability.
- [ ] `REPORT.md` shows finding provenance (scanner vs specialist).
- [ ] Re-run against `recall` with scanners installed shows the dependency specialist's findings either confirmed or extended by `npm audit` / `cargo audit` output.
