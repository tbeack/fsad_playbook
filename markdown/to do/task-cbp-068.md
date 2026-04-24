# CBP-068 — sec-review-team: test harness with known-vulnerable fixture repos (P2.3)

## Source
Recommendation P2.3 in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md). The skill has no regression test — any future prompt edit could silently degrade finding quality without anyone noticing.

## Summary
Ship a `fixtures/` directory of small known-vulnerable repos (one per stack type), each paired with an `expected-findings.jsonl` documenting the minimum set of findings the skill should detect. A CI job re-runs the skill against every fixture and fails if expected-findings coverage drops. This is the regression-test that keeps the skill honest across prompt edits.

## Assessment
- **Current state:** No test harness. CBP-060's validation was a one-off manual run; no automated way to confirm future skill changes don't regress.
- **Depends on:** CBP-061 (structured JSONL for machine comparison), CBP-064 (specialist library for per-stack fixtures).
- **Non-goals:** The harness is not a substitute for real-world testing on production code. It catches *regressions*, not novel findings.
- **Fixture repos needed (per stack signal):**
  - `webapp-node-express` — SQLi, missing auth, hardcoded secret, vulnerable `lodash` pin, XSS via `innerHTML`.
  - `desktop-tauri-react` — `csp: null`, unscoped `sql:allow-execute`, plaintext SQLite (mirrors recall findings).
  - `python-django` — SQLi via `.raw()`, missing CSRF decorator, `DEBUG = True` in production config.
  - `iac-terraform` (lands with CBP-069 iac-auditor) — public S3, IAM wildcard, missing encryption.
  - `llm-agent-python` (lands with CBP-069 prompt-injection-auditor) — prompt concat of untrusted user input, tool-use without output validation.

**Location:** new directory `.claude/skills/sec-review-team/fixtures/<stack>/`; CI workflow under `.github/workflows/sec-review-harness.yml` (new).

## Plan

1. Create `.claude/skills/sec-review-team/fixtures/` with a README describing the harness contract.
2. Create one fixture per stack type (minimum: 3 — webapp-express, desktop-tauri, python-django). Each fixture:
   - Real runnable code (~5–15 files) with intentional vulnerabilities.
   - `README-FIXTURE.md` describing the deliberate vulns so maintainers don't accidentally "fix" them.
   - `expected-findings.jsonl` — the minimum severity-count-by-category the skill must detect.
   - `expected-coverage.jsonl` — the categories that must be marked `checked-clean` or `checked-issues-found`.
3. Write a harness runner script at `.claude/skills/sec-review-team/fixtures/run-harness.sh`:
   - For each fixture, invoke the skill against it (`/sec-review-team <fixture-path> all --yes`).
   - Parse the resulting `REPORT.md` + `findings.jsonl`.
   - Compare against `expected-findings.jsonl`.
   - Exit code 0 if coverage meets or exceeds expected, non-zero otherwise.
4. Add `.github/workflows/sec-review-harness.yml` that runs the harness on every PR that touches `.claude/skills/sec-review-team/**`. Report coverage delta as a PR comment.
5. Document the expectation that any PR editing specialist briefs must update fixtures or justify why expected-findings shouldn't change.
6. Initial baseline: run the harness once with the current skill, commit the resulting `expected-findings.jsonl` files as the baseline. Future runs compare against this.

## Acceptance Criteria
- [x] At least 3 fixture repos shipped under `.claude/skills/sec-review-team/fixtures/`.
- [x] Each fixture has `README-FIXTURE.md`, `expected-findings.jsonl`, `expected-coverage.jsonl`.
- [x] `run-harness.sh` executes the skill against every fixture and compares against expected.
- [x] `.github/workflows/sec-review-harness.yml` runs the harness on PRs touching the skill dir.
- [x] PR comment reports coverage delta when the skill is modified.
- [ ] First run locks in baseline expected-findings; subsequent regressions fail CI.
- [x] CBP-060 reference target (`recall`) *not* added to fixtures (it's a user repo, not test data).
