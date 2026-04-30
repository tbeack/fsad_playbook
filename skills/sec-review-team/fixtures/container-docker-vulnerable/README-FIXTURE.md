# container-docker-vulnerable — Test Fixture

**DO NOT DEPLOY. DO NOT COPY PATTERNS FROM HERE.**

Deliberately-vulnerable Docker/Compose fixture for the `sec-review-team` regression harness. Every vulnerability is intentional. Targets `container-runtime-auditor`.

## Planted vulnerabilities

| # | Root issue | Specialist | Severity | Location |
|---|---|---|---|---|
| 1 | `compose-privileged-container` | container-runtime-auditor | critical | `docker-compose.yml:8` |
| 2 | `docker-socket-mount` | container-runtime-auditor | critical | `docker-compose.yml:11` |
| 3 | `secret-in-dockerfile-env` | container-runtime-auditor | high | `Dockerfile:12-13` |
| 4 | `dockerfile-runs-as-root` | container-runtime-auditor | high | `Dockerfile` (no USER) |
| 5 | `compose-db-port-exposed` | container-runtime-auditor | high | `docker-compose.yml:16` |
| 6 | `unpinned-base-image` | container-runtime-auditor | medium | `Dockerfile:2` |
| 7 | `dockerfile-add-instead-of-copy` | container-runtime-auditor | low | `Dockerfile:7` |

## Stack signals triggered

- `container` — `Dockerfile` + `docker-compose.yml` present → roster adds `container-runtime-auditor`

## What the harness asserts

`expected-findings.jsonl` — minimum finding set matched on `root_issue` + `severity`.

`expected-coverage.jsonl` — container-runtime-auditor must check `privileged-containers`, `docker-socket-mount`, `secrets-in-image`, `container-user`, `network-exposure`, `base-image-pinning`.

See `../webapp-express-vulnerable/README-FIXTURE.md` for harness assertion semantics.
