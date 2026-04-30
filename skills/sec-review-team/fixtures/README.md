# sec-review-team Test Harness — Fixtures

Known-vulnerable fixture repos used to regression-test the skill. Each fixture is a **deliberately broken** codebase; its vulnerabilities are documented in `README-FIXTURE.md` inside each fixture directory, and the minimum set of findings the skill must detect is encoded in `expected-findings.jsonl`.

## Contract

A fixture is a repo-shaped directory containing:

- **Deliberately vulnerable code** — minimal; just enough to trigger the target specialists.
- **`README-FIXTURE.md`** — lists each planted vulnerability, WHY it's there, and which specialist should catch it. Prevents accidental "fixes" by future maintainers.
- **`expected-findings.jsonl`** — one line per expected finding, validating against `../schema/finding.schema.json`. This is the test oracle — the harness fails if any of these are NOT detected.
- **`expected-coverage.jsonl`** — per-category coverage records expected. Harness fails if any expected category is missing or marked `not-checked`.

## Fixtures

| Fixture | Stack | Target specialists |
|---|---|---|
| `webapp-express-vulnerable` | Node.js + Express + lodash | auth-authz, input-validation, secrets-crypto, dependency-supplychain |
| `desktop-tauri-vulnerable` | Tauri v2 + Rust + SQLite | auth-authz, data-exposure, secrets-crypto |
| `python-django-vulnerable` | Django + Postgres | auth-authz, input-validation, secrets-crypto, dependency-supplychain, data-exposure |
| `iac-terraform-vulnerable` | Terraform + AWS | iac-auditor, secrets-crypto |
| `llm-agent-python-vulnerable` | Python + Anthropic SDK | prompt-injection-auditor |
| `webapp-frontend-vulnerable` | Express.js + HTML | frontend-security-auditor |
| `container-docker-vulnerable` | Dockerfile + Docker Compose | container-runtime-auditor |
| `cicd-github-actions-vulnerable` | GitHub Actions workflows | ci-cd-security-auditor |
| `concurrency-race-vulnerable` | Node.js + Express + MySQL | concurrency-race-auditor |
| `privacy-telemetry-vulnerable` | HTML + JS + Segment/GA | privacy-telemetry-auditor |

## Harness workflow

```
./run-harness.sh [fixture-name|all]
```

For each fixture:
1. Invoke `/sec-review-team <fixture-path> all --yes`.
2. Parse resulting `<fixture>/.planning/security-review/REPORT.md` + all `findings.jsonl`.
3. For each line in `expected-findings.jsonl`, assert a matching finding exists (matched on `root_issue` + `severity`).
4. For each line in `expected-coverage.jsonl`, assert coverage category is marked appropriately.
5. Exit 0 if all pass. Non-zero on any regression.

## Locking the baseline

First harness run locks in the current output. Commit it. Subsequent runs fail CI if findings regress (fewer detections than baseline) — new findings surface as additions (not failures) and get committed alongside the skill change that produced them.

## Adding a new fixture

1. Create `fixtures/<name>/` with deliberately vulnerable code.
2. Add `README-FIXTURE.md` + `expected-findings.jsonl` + `expected-coverage.jsonl`.
3. Run the harness once locally to confirm detection matches expectation.
4. Commit all four alongside any skill changes.

## NOT in fixtures

- **Real user repos** (e.g., `recall`). Fixtures are test data, not production code.
- **Secrets**. Hardcoded strings like `SECRET_KEY = 'admin123'` are test data, NOT real secrets — but never copy anything from fixtures into a real repo.
