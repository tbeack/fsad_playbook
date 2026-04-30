# cicd-github-actions-vulnerable — Test Fixture

**DO NOT DEPLOY. DO NOT COPY PATTERNS FROM HERE.**

Deliberately-vulnerable GitHub Actions fixture for the `sec-review-team` regression harness. Every vulnerability is intentional. Targets `ci-cd-security-auditor`.

## Planted vulnerabilities

| # | Root issue | Specialist | Severity | Location |
|---|---|---|---|---|
| 1 | `pull-request-target-code-checkout` | ci-cd-security-auditor | critical | `.github/workflows/ci.yml:4+12` |
| 2 | `secret-echoed-in-ci-log` | ci-cd-security-auditor | high | `.github/workflows/ci.yml:26` |
| 3 | `action-not-sha-pinned` | ci-cd-security-auditor | high | `.github/workflows/ci.yml:12,17` |
| 4 | `missing-permissions-block` | ci-cd-security-auditor | high | `.github/workflows/deploy.yml:1-6` |
| 5 | `curl-pipe-bash-in-ci` | ci-cd-security-auditor | high | `.github/workflows/deploy.yml:19` |

## Stack signals triggered

- `all-with-ci` — `.github/workflows/*.yml` present → roster adds `ci-cd-security-auditor`

## What the harness asserts

`expected-findings.jsonl` — minimum finding set matched on `root_issue` + `severity`.

`expected-coverage.jsonl` — ci-cd-security-auditor must check `workflow-permissions`, `pull-request-target`, `action-pinning`, `secret-exposure`, `supply-chain-integrity`.

See `../webapp-express-vulnerable/README-FIXTURE.md` for harness assertion semantics.
