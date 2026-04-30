# webapp-frontend-vulnerable — Test Fixture

**DO NOT DEPLOY. DO NOT COPY PATTERNS FROM HERE.**

Deliberately-vulnerable frontend fixture for the `sec-review-team` regression harness. Every vulnerability is intentional. Targets `frontend-security-auditor`.

## Planted vulnerabilities

| # | Root issue | Specialist | Severity | Location |
|---|---|---|---|---|
| 1 | `cors-wildcard-with-credentials` | frontend-security-auditor | high | `server.js:6-7` |
| 2 | `missing-csp` | frontend-security-auditor | high | `server.js:5-9` |
| 3 | `insecure-cookie-flags` | frontend-security-auditor | high | `server.js:16` |
| 4 | `missing-sri` | frontend-security-auditor | high | `index.html:8` |
| 5 | `postmessage-no-origin-check` | frontend-security-auditor | high | `index.html:15-16` |
| 6 | `missing-clickjacking-protection` | frontend-security-auditor | medium | `server.js:5-9` |

## Stack signals triggered

- `webapp` — `server.js` + `index.html` present → roster adds `frontend-security-auditor`

## What the harness asserts

`expected-findings.jsonl` — minimum finding set matched on `root_issue` + `severity`.

`expected-coverage.jsonl` — frontend-security-auditor must check `cors-policy`, `content-security-policy`, `cookie-security`, `sri-integrity`, `postmessage-security`, `clickjacking-protection`.

See `../webapp-express-vulnerable/README-FIXTURE.md` for harness assertion semantics.
