# Scanner Coverage Map

Which scanner feeds which specialist in the pre-pass (Step 2.5 of SKILL.md).

## By scanner

| Scanner | Primary specialist | Categories | Notes |
|---|---|---|---|
| `gitleaks` | secrets-crypto-auditor | `hardcoded-secrets`, `credential-logging` | Git-history aware; finds secrets in old commits. |
| `trufflehog` | secrets-crypto-auditor | `hardcoded-secrets` | High-entropy + regex. Noisier than gitleaks; triage hard. |
| `semgrep` | multi (routed by rule category) | see rule → specialist routing table below | Use `--config auto` for community ruleset. |
| `npm audit` | dependency-supplychain-auditor | `known-cves`, `lockfile-integrity` | Only runs with a `package-lock.json`. |
| `cargo audit` | dependency-supplychain-auditor | `known-cves` | Requires `cargo-audit` install. |
| `pip-audit` | dependency-supplychain-auditor | `known-cves` | Reads `requirements.txt` or `pyproject.toml`. |
| `osv-scanner` | dependency-supplychain-auditor | `known-cves` | Multi-ecosystem (Go, Rust, Python, npm, Ruby, Maven). |
| `bandit` | input-validation-auditor | `sql-injection`, `command-injection`, `unsafe-deserialization`, `weak-crypto` (Python) | Python SAST. Overlaps with secrets-crypto on weak-crypto — deduplicate in consolidation. |
| `hadolint` | container-runtime-auditor | `dockerfile-hardening` | Dockerfile-specific lint. |
| `trivy image` | container-runtime-auditor | `base-image-cves` | Scans built images; requires an image to be available or built. |
| `actionlint` | ci-cd-security-auditor | `workflow-triggers`, `action-pinning` | GitHub Actions syntax + some security rules. |
| `zizmor` | ci-cd-security-auditor | `workflow-triggers`, `secrets-in-ci`, `fork-secret-access` | Actions-specific security audit. More security-focused than actionlint. |
| `tfsec` | iac-auditor | `public-resources`, `iam-wildcards`, `encryption-at-rest` | Terraform-specific. |
| `checkov` | iac-auditor | multi (IaC across Terraform, CloudFormation, K8s, Helm) | Broader than tfsec; some overlap. |
| `retire.js` | frontend-security-auditor | `third-party-scripts` (vulnerable JS libs) | Client-side JS library CVE scanner. |
| `brakeman` | input-validation-auditor | `sql-injection`, `xss`, `csrf` (Ruby on Rails) | Rails-specific SAST. |

## semgrep rule → specialist routing

`semgrep --config auto` returns findings tagged with metadata. Route based on the `owasp` / `cwe` / `category` tag:

| semgrep metadata tag | Routed to specialist |
|---|---|
| `owasp.A01` (Broken access control) | auth-authz-auditor |
| `owasp.A02` (Cryptographic failures) | secrets-crypto-auditor |
| `owasp.A03` (Injection) | input-validation-auditor |
| `owasp.A05` (Security misconfiguration) | data-exposure-auditor |
| `owasp.A07` (ID and auth failures) | auth-authz-auditor |
| `owasp.A08` (Software and data integrity) | dependency-supplychain-auditor |
| `owasp.A09` (Logging and monitoring failures) | silent-failure-hunter |
| `owasp.A10` (SSRF) | input-validation-auditor |
| `cwe-79` (XSS) | input-validation-auditor |
| `cwe-89` (SQLi) | input-validation-auditor |
| `cwe-200` (Information exposure) | data-exposure-auditor |
| `cwe-209` (Information exposure via error messages) | data-exposure-auditor |
| `cwe-287` (Improper authentication) | auth-authz-auditor |
| `cwe-306` (Missing authentication) | auth-authz-auditor |
| `cwe-352` (CSRF) | input-validation-auditor |
| `cwe-502` (Deserialization of untrusted data) | input-validation-auditor |
| `cwe-611` (XXE) | input-validation-auditor |
| `cwe-798` (Hardcoded credentials) | secrets-crypto-auditor |
| unmatched / `category:security` | data-exposure-auditor (fallback) |

## By specialist (reverse lookup)

- **secrets-crypto-auditor** — gitleaks, trufflehog, semgrep (owasp.A02, cwe-798)
- **dependency-supplychain-auditor** — npm audit, cargo audit, pip-audit, osv-scanner, semgrep (owasp.A08)
- **input-validation-auditor** — semgrep (owasp.A03 / A10, cwe-79/89/352/502/611), bandit, brakeman
- **silent-failure-hunter** — semgrep (owasp.A09, empty-catch patterns)
- **data-exposure-auditor** — semgrep (owasp.A05, cwe-200/209), fallback for unmatched security rules
- **auth-authz-auditor** — semgrep (owasp.A01 / A07, cwe-287/306)
- **iac-auditor** — tfsec, checkov
- **container-runtime-auditor** — hadolint, trivy
- **ci-cd-security-auditor** — actionlint, zizmor
- **frontend-security-auditor** — retire.js
- **prompt-injection-auditor** — (no widely-available scanner today; Garak/PromptGuard when integrated)
- **concurrency-race-auditor** — (no scanner; clippy concurrency lints when running on Rust)
- **privacy-telemetry-auditor** — (no scanner; npm ls filter for analytics packages is the closest)

## Install hints

```bash
# macOS (Homebrew)
brew install gitleaks trufflehog semgrep hadolint trivy actionlint tfsec checkov osv-scanner

# Rust toolchain
cargo install cargo-audit

# Python
pip install bandit pip-audit

# Node
npm install -g retire
```

## When to skip a scanner

- **Install cost > value** for single-run usage: document in REPORT.md's tooling caveats rather than block the run.
- **Scanner is noisy on this codebase** (e.g., semgrep's community rules fire a lot of false positives on a very conventional web app): disable the scanner for that run via an explicit `--no-scanner <name>` flag (to be added in a follow-up).
- **Scanner requires network** and the user prefers offline mode: skip.

## Evolution

When a new scanner becomes broadly available, add it to this table + to `SKILL.md` Step 2.5 + to the relevant specialist brief. Preserve the principle: deterministic scanners run before specialists; specialists triage + find what scanners miss.
