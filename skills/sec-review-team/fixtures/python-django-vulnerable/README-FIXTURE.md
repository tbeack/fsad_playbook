# python-django-vulnerable — Test Fixture

**DO NOT DEPLOY.** Deliberately-vulnerable Django fixture.

## Planted vulnerabilities

| # | Root issue | Specialist | Severity | Location |
|---|---|---|---|---|
| 1 | `django-hardcoded-secret-key` | secrets-crypto-auditor | critical | `myproject/settings.py:4` |
| 2 | `django-debug-true-in-prod-config` | data-exposure-auditor | high | `myproject/settings.py:7` |
| 3 | `django-allowed-hosts-wildcard` | data-exposure-auditor | medium | `myproject/settings.py:11` |
| 4 | `django-missing-csrf-middleware` | input-validation-auditor | high | `myproject/settings.py:14-19` |
| 5 | `hardcoded-db-password` | secrets-crypto-auditor | high | `myproject/settings.py:26` |
| 6 | `insecure-session-cookie-flags` | frontend-security-auditor | medium | `myproject/settings.py:30-31` |
| 7 | `django-missing-login-required` | auth-authz-auditor | high | `myapp/views.py:6-8` |
| 8 | `sql-injection-via-raw-fstring` | input-validation-auditor | critical | `myapp/views.py:12-14` |
| 9 | `csrf-exempt-on-mutating-endpoint` | input-validation-auditor | high | `myapp/views.py:17-19` |
| 10 | `swallowed-delete-exception` | silent-failure-hunter | high | `myapp/views.py:22-24` |
| 11 | `django-3.2.0-known-cves` | dependency-supplychain-auditor | high | `requirements.txt:3` |

See `../webapp-express-vulnerable/README-FIXTURE.md` for harness assertion semantics.
