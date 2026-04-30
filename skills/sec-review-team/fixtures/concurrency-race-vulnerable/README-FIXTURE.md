# concurrency-race-vulnerable — Test Fixture

**DO NOT DEPLOY. DO NOT COPY PATTERNS FROM HERE.**

Deliberately-vulnerable Node.js backend fixture for the `sec-review-team` regression harness. Every vulnerability is intentional. Targets `concurrency-race-auditor`.

## Planted vulnerabilities

| # | Root issue | Specialist | Severity | Location |
|---|---|---|---|---|
| 1 | `transactional-integrity` | concurrency-race-auditor | critical | `wallet.js:7-18` |
| 2 | `rate-limit-race` | concurrency-race-auditor | high | `auth.js:4-13` |
| 3 | `toctou-auth-check` | concurrency-race-auditor | high | `auth.js:19-30` |
| 4 | `session-fixation-race` | concurrency-race-auditor | high | `session.js:8-23` |

## Stack signals triggered

- `backend` — `package.json` with `express` + DB layer → roster adds `concurrency-race-auditor`

## What the harness asserts

`expected-findings.jsonl` — minimum finding set matched on `root_issue` + `severity`.

`expected-coverage.jsonl` — concurrency-race-auditor must check `toctou`, `rate-limit-race`, `session-race`, `transactional-integrity`, `double-check-locking`, `shared-state-unsynced`, `async-cancellation`.

See `../webapp-express-vulnerable/README-FIXTURE.md` for harness assertion semantics.
