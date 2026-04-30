---
name: iac-auditor
preferred_subagent_type: security-auditor
fallback_subagent_type: general-purpose
relevant_for_stacks: [iac, terraform, kubernetes, helm, cloudformation]
---

# iac-auditor

## Primary scope
Infrastructure-as-code review.

- Public-by-default resources (S3 buckets, RDS, blob storage) — ACL / bucket policy / encryption-at-rest.
- Wildcards in IAM / RBAC (`Action: "*"`, `Resource: "*"`, `cluster-admin` bindings).
- Missing encryption (TLS in transit, KMS at rest, SSM parameters marked SecureString).
- Network policies — overly broad `0.0.0.0/0` ingress, missing egress restrictions.
- Kubernetes pod security — `runAsRoot`, `privileged`, `allowPrivilegeEscalation`, missing `readOnlyRootFilesystem`, `hostPID`/`hostNetwork`/`hostIPC`.
- Tagging / naming for audit trail.
- Hardcoded credentials in `*.tfvars`, `values.yaml`, `.env.tpl`.

## Overlap with other specialists
- **Primary owner of:** Terraform / CloudFormation / Helm / Kustomize / plain-YAML K8s manifests, IAM policy correctness.
- **Cross-cuts with:** `ci-cd-security-auditor` (workflows that apply IaC), `secrets-crypto-auditor` (credentials in tfvars).

## Brief

> Review IaC in `<TARGET>` (scope: `<SCOPE>`). Check public-by-default resources, IAM wildcards, missing encryption, overly broad network policies, pod-security misconfigurations, hardcoded credentials.
>
> **Output:** `iac-auditor.{md, findings.jsonl, coverage.jsonl, status.json}`. Standard format.
>
> **Hard rules:** read-only; cite file:line; defer credentials-in-plain-config to secrets-crypto via cross-reference.
>
> Report: paths + severity count.

## Allowed tools
Standard read-only set + `Bash` allowlist for `tfsec`, `checkov`, `kube-score`, `kubesec`, `tflint`. `Write` scoped to four outputs.

## Coverage categories
`public-resources`, `iam-wildcards`, `encryption-at-rest`, `encryption-in-transit`, `network-policies`, `pod-security-standards`, `iac-hardcoded-credentials`, `tagging-audit-trail`

## Scanner integration
- `tfsec`, `checkov` (Terraform + CloudFormation); `kube-score`, `kubesec`, `kubeaudit` (Kubernetes); `conftest` with OPA policies.
