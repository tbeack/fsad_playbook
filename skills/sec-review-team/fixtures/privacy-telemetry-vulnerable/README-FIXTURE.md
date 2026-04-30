# privacy-telemetry-vulnerable — Test Fixture

**DO NOT DEPLOY. DO NOT COPY PATTERNS FROM HERE.**

Deliberately-vulnerable frontend fixture for the `sec-review-team` regression harness. Every vulnerability is intentional. Targets `privacy-telemetry-auditor`.

## Planted vulnerabilities

| # | Root issue | Specialist | Severity | Location |
|---|---|---|---|---|
| 1 | `analytics-loads-before-consent` | privacy-telemetry-auditor | high | `index.html:7-20` |
| 2 | `pii-in-analytics-payload` | privacy-telemetry-auditor | high | `app.js:1-14` |
| 3 | `client-storage-pii` | privacy-telemetry-auditor | medium | `app.js:17-23` |
| 4 | `missing-consent-gating` | privacy-telemetry-auditor | medium | `index.html:26-48` |

## Stack signals triggered

- `webapp` — `index.html` + analytics package deps (`@segment/analytics-next`, `posthog-js`) → roster adds `privacy-telemetry-auditor`

## What the harness asserts

`expected-findings.jsonl` — minimum finding set matched on `root_issue` + `severity`.

`expected-coverage.jsonl` — privacy-telemetry-auditor must check `outbound-destinations`, `analytics-sdks`, `cookies`, `client-storage-pii`, `third-party-scripts`, `cross-border-transfer`, `consent-flow-gating`; must mark `retention-dsar` as `not-checked` (no server-side code in fixture).

See `../webapp-express-vulnerable/README-FIXTURE.md` for harness assertion semantics.
