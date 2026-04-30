# iac-terraform-vulnerable — Test Fixture

**DO NOT DEPLOY. DO NOT COPY PATTERNS FROM HERE.**

Deliberately-vulnerable Terraform fixture for the `sec-review-team` regression harness. Every vulnerability is intentional. Targets `iac-auditor` and `secrets-crypto-auditor`.

## Planted vulnerabilities

| # | Root issue | Specialist | Severity | Location |
|---|---|---|---|---|
| 1 | `iam-action-wildcard` | iac-auditor | critical | `iam.tf:11-12` |
| 2 | `public-s3-bucket` | iac-auditor | high | `main.tf:17` |
| 3 | `rds-not-encrypted-at-rest` | iac-auditor | high | `main.tf:33` |
| 4 | `rds-publicly-accessible` | iac-auditor | high | `main.tf:35` |
| 5 | `sg-unrestricted-ssh` | iac-auditor | high | `network.tf:15` |
| 6 | `hardcoded-credential-in-tfvars` | secrets-crypto-auditor | high | `terraform.tfvars:4` |
| 7 | `sg-unrestricted-db-port` | iac-auditor | medium | `network.tf:23` |
| 8 | `s3-missing-encryption-at-rest` | iac-auditor | medium | `main.tf:15-18` |

## Stack signals triggered

- `iac` — `*.tf`, `*.tfvars` present → roster adds `iac-auditor`

## What the harness asserts

`expected-findings.jsonl` — minimum finding set matched on `root_issue` + `severity`.

`expected-coverage.jsonl` — iac-auditor must check `public-resources`, `iam-wildcards`, `encryption-at-rest`, `network-policies`, `iac-hardcoded-credentials`; must mark `pod-security-standards` as `not-checked` (no K8s here).

See `../webapp-express-vulnerable/README-FIXTURE.md` for harness assertion semantics.
