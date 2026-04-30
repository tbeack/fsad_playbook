---
name: dependency-supplychain-auditor
preferred_subagent_type: general-purpose
fallback_subagent_type: general-purpose
relevant_for_stacks: [all]
---

# dependency-supplychain-auditor

## Primary scope
Supply chain. Dependencies, lockfile integrity, install scripts, build trust.

- **npm**: `package.json`, `package-lock.json`. `npm audit` if available. Pinned vs floating versions; lockfile presence + drift. Postinstall / install scripts (`hasInstallScript: true`).
- **Cargo**: `Cargo.toml`, `Cargo.lock`. `cargo audit` if installed.
- **Python**: `requirements.txt`, `Pipfile.lock`, `poetry.lock`, `pyproject.toml`. `pip-audit`.
- **OSV**: `osv-scanner` across any ecosystem.
- Suspicious packages, typosquats, recently compromised deps.
- `build.rs`, postinstall/preinstall scripts, Dockerfile `RUN` installs.
- Plugin/core version alignment.

## Overlap with other specialists
- **Primary owner of:** package manifests, lockfiles, CVE scanning.
- **Cross-cuts with:**
  - `ci-cd-security-auditor` — action-pinning and workflow trust boundaries are theirs; package-dep security is yours.
  - `secrets-crypto-auditor` — secrets in lockfiles / dep configs overlap; credentials in `npm audit` output are theirs to triage.

## Brief

> Review supply chain in `<TARGET>` (scope: `<SCOPE>`). Stack: `<STACK CONTEXT>`. Run available scanners (`npm audit`, `cargo audit`, `pip-audit`, `osv-scanner`). If a scanner isn't available, say so — DO NOT invent CVE IDs. Check pinned-vs-floating, lockfile presence + drift, install scripts, typosquats, plugin-core alignment.
>
> **Output:** `dependency-supplychain-auditor.{md, findings.jsonl, coverage.jsonl, status.json}`. Scanner output normalized into `findings.jsonl` with `source: "scanner-<name>"`. See other specialist briefs for format.
>
> **Hard rules:** read-only; never install anything; no fabricated CVEs.
>
> Report: paths + severity count + tool-availability summary.

## Allowed tools
Standard read-only + `Bash` allowlist including `npm audit`, `cargo audit`, `pip-audit`, `osv-scanner`, `npm ls`, `cargo tree`. `Write` scoped to this specialist's outputs.

## Coverage categories
`known-cves`, `lockfile-integrity`, `version-pinning`, `install-scripts`, `typosquats`, `plugin-alignment`, `build-rs-trust`

## Scanner integration (primary consumer)
All dep/CVE scanners feed this specialist. Pre-pass (CBP-067) runs them; specialist triages + extends.
