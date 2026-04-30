---
name: ci-cd-security-auditor
preferred_subagent_type: general-purpose
fallback_subagent_type: general-purpose
relevant_for_stacks: [all-with-ci]
---

# ci-cd-security-auditor

## Primary scope
CI/CD pipeline security.

- GitHub Actions:
  - `pull_request_target` on workflows that check out untrusted PR code (classic RCE pattern).
  - Third-party actions not SHA-pinned — prefer `@<sha>` over `@v4`.
  - `permissions:` block — default `read-all`; explicit escalation only where needed.
  - Secrets exposure — `echo ${{ secrets.X }}` in logs, `env:` pass-through to untrusted steps.
  - `on: pull_request` + secrets reachable from forks.
- GitLab CI / CircleCI / Jenkins equivalents.
- Artifact integrity — signed builds, SLSA provenance, cosign attestations.
- Build-time dep fetch — `curl | sh` installs, unpinned deps in scripts.

## Overlap with other specialists
- **Primary owner of:** workflow triggers, action pinning, secrets-in-CI.
- **Cross-cuts with:** `dependency-supplychain-auditor` (action-version supply chain overlap), `secrets-crypto-auditor` (leaked secrets in CI logs).

## Brief

> Review CI/CD pipelines in `<TARGET>` (scope: `<SCOPE>`). Stack: `<STACK CONTEXT>`. Check workflow triggers, action SHA-pinning, secrets exposure, permissions hardening, artifact integrity.
>
> **Output:** `ci-cd-security-auditor.{md, findings.jsonl, coverage.jsonl, status.json}`. Standard format.
>
> **Hard rules:** read-only; cite evidence.

## Allowed tools
Standard read-only set + `Bash` allowlist for `actionlint`, `zizmor`. `Write` scoped to four outputs.

## Coverage categories
`workflow-triggers`, `action-pinning`, `permissions-block`, `secrets-in-ci`, `fork-secret-access`, `artifact-integrity`, `build-time-dep-fetch`

## Scanner integration
- `actionlint` — GitHub Actions syntax + security lint.
- `zizmor` — Actions-specific security audit.
