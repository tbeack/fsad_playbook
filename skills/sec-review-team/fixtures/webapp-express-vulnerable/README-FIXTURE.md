# webapp-express-vulnerable — Test Fixture

**DO NOT DEPLOY. DO NOT COPY PATTERNS FROM HERE.**

This is a deliberately-vulnerable fixture for the `sec-review-team` regression harness. Every vulnerability is intentional.

## Planted vulnerabilities

| # | Root issue | Specialist | Severity | Location |
|---|---|---|---|---|
| 1 | `hardcoded-db-password` | secrets-crypto-auditor | high | `src/app.js:12` |
| 2 | `missing-auth-on-admin-endpoint` | auth-authz-auditor | high | `src/app.js:16` |
| 3 | `db-error-to-client` | data-exposure-auditor | medium | `src/app.js:18` |
| 4 | `sql-injection-via-template-literal` | input-validation-auditor | high | `src/app.js:24` |
| 5 | `hardcoded-jwt-secret` | secrets-crypto-auditor | critical | `src/config.js:3-4` |
| 6 | `hardcoded-stripe-api-key` | secrets-crypto-auditor | high | `src/config.js:7` |
| 7 | `weak-session-secret` | secrets-crypto-auditor | medium | `src/config.js:10` |
| 8 | `jwt-verify-error-swallowed` | silent-failure-hunter | high | `src/app.js:35-38` |
| 9 | `xss-via-innerHTML` | input-validation-auditor | high | `src/routes/user.js:6-7` |
| 10 | `open-redirect` | input-validation-auditor | medium | `src/routes/user.js:10-12` |
| 11 | `path-traversal` | input-validation-auditor | high | `src/routes/user.js:16-20` |
| 12 | `vulnerable-lodash-pin` | dependency-supplychain-auditor | high | `package.json:10` |

## What the harness asserts

`expected-findings.jsonl` lists the minimum set of findings the skill must emit. Failing to detect any line is a regression.

`expected-coverage.jsonl` lists categories the skill must check (not skip).

## What the harness does NOT assert

- Exact finding text, wording, or phrasing
- Exact line numbers (within ±2)
- Confidence level (certain vs likely — both acceptable)
- Additional findings beyond the expected set (those may indicate improved detection)
