# CBP-072 — sec-review-team: add frontend-security-auditor + container-runtime-auditor + ci-cd-security-auditor specialists

## Source
Specialist roster audit in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md) — the second-tier missing specialists (after iac + prompt-injection in CBP-069). Covers modern deployment / build-time / web-specific attack surfaces that the original 6-specialist roster addresses only partially (or not at all).

## Summary
Add three specialists that materially extend coverage for web apps, containerized deployments, and CI/CD pipelines:
- **frontend-security-auditor** — CSP, CORS, SameSite cookies, SRI, postMessage handlers, clickjacking, third-party scripts. (Also absorbs CSP scope from `data-exposure-auditor` — see CBP-074.)
- **container-runtime-auditor** — Dockerfile / compose / Helm chart review; rootful containers, exposed ports, missing USER, shell injection in RUN, base-image CVEs.
- **ci-cd-security-auditor** — GitHub Actions / workflow trigger safety (`pull_request_target` gotchas), secrets in workflow logs, action SHA-pinning, artifact integrity, SLSA-style build provenance.

## Assessment
- **Current state:** After CBP-069, roster has 8 specialists. After this task, 11. The remaining 2 (concurrency-race + privacy-telemetry) land in CBP-073 for a total of 13 after CBP-073.
- **Overlap with existing:** 
  - `frontend-security-auditor` picks up CSP from `data-exposure-auditor` (CBP-074 prunes this from data-exposure).
  - `ci-cd-security-auditor` overlaps with `dependency-supplychain-auditor` on action-pinning; deep CI workflow auditing is distinct.
- **Dependency:** CBP-064 (specialist library). Also benefits from CBP-067 (scanners — `hadolint` for Dockerfiles, `actionlint` for GHA).

**Location:** `.claude/skills/sec-review-team/specialists/frontend-security-auditor.md`, `container-runtime-auditor.md`, `ci-cd-security-auditor.md` (new); `stack-signals.md` updated.

## Plan

### frontend-security-auditor

1. Scope:
   - CSP header — presence, strictness, absence of `unsafe-inline` / `unsafe-eval` / remote origins without `nonce`.
   - CORS — `Access-Control-Allow-Origin: *` on credentialed endpoints, missing `Vary: Origin`.
   - Cookie flags — `Secure`, `HttpOnly`, `SameSite=Strict/Lax` on session cookies.
   - Subresource Integrity (SRI) on `<script src=>` and `<link>` to third-party CDNs.
   - postMessage / BroadcastChannel handlers — origin verification.
   - Clickjacking — `X-Frame-Options` / `frame-ancestors` CSP directive.
   - Third-party script hygiene — analytics, fonts, CDN scripts; async loading patterns.
2. Scanner integration: `retire.js` for known-vulnerable JS libs; `observatory.mozilla.org`-style header checks.
3. Preferred subagent_type: `general-purpose`. Relevant for: webapp + desktop-with-webview (Tauri, Electron).

### container-runtime-auditor

1. Scope:
   - Dockerfile review — `FROM` pinning (digest, not just tag), `USER` not root, `COPY` not `ADD` for local, `--chown`, no secrets in layers.
   - Base image freshness + known CVEs.
   - `RUN` shell-injection risk via build-args.
   - `docker-compose.yml` — `privileged`, exposed ports, volume mounts into `/etc/`, `/var/run/docker.sock`.
   - Kubernetes pod spec — `runAsRoot`, `allowPrivilegeEscalation`, `capabilities.add`, missing `readOnlyRootFilesystem`, `hostPID`/`hostNetwork`/`hostIPC`.
   - Helm chart values — defaults that open ports or privileges.
2. Scanner integration: `hadolint` (Dockerfile), `trivy image` (base image CVEs), `kube-score`, `kubesec`.
3. Preferred subagent_type: `general-purpose`. Relevant for: any repo with `Dockerfile`, `docker-compose.yml`, `helm/`, `charts/`, `k8s/`.

### ci-cd-security-auditor

1. Scope:
   - GitHub Actions:
     - `pull_request_target` on workflows that check out untrusted PR code (classic RCE pattern).
     - Third-party actions not SHA-pinned — `actions/checkout@v4` is weaker than `actions/checkout@<sha>`.
     - `permissions:` block — prefer `read-all` as default, explicit escalation only where needed.
     - Secrets exposure — `echo ${{ secrets.X }}` in logs, `env:` pass-through to untrusted steps.
     - `on: pull_request` + `secrets` reachable from forks.
   - GitLab CI / CircleCI / Jenkins equivalents where applicable.
   - Artifact integrity — signed builds, SLSA provenance, cosign attestations.
   - Build-time dependency fetch — `curl | sh` installs, unpinned deps in scripts.
2. Scanner integration: `actionlint` for GitHub Actions syntax; `zizmor` (if available) for security-specific Actions audit.
3. Preferred subagent_type: `general-purpose`. Relevant for: any repo with `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, `.circleci/`.

### Wiring

1. Update `stack-signals.md` to add trigger signals + roster inclusion for all three.
2. Update `data-exposure-auditor` brief to defer CSP / frontend-security axes to `frontend-security-auditor` when present (see CBP-074 for the full overlap-pruning pass).
3. Add fixture repos in CBP-068: webapp with missing CSP + unsafe CORS; Dockerfile with root + unpinned base + `COPY . .` patterns; GitHub Actions workflow with `pull_request_target` + secret echo.

## Acceptance Criteria
- [x] Three new specialist briefs in `.claude/skills/sec-review-team/specialists/`.
- [x] `stack-signals.md` triggers each specialist on the appropriate signals.
- [x] Scanner integration notes in each brief (hadolint, trivy, actionlint, retire.js).
- [x] Data-exposure-auditor's CSP bullet coordinated (points at frontend-security when present) — full cleanup in CBP-074.
- [x] Three fixture repos / additions for the harness with expected findings for each new specialist (`webapp-frontend-vulnerable`, `container-docker-vulnerable`, `cicd-github-actions-vulnerable`).
- [ ] Harness run validates the new specialists catch the planted vulns. *(pending — live run required)*
