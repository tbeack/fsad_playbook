# CBP-069 — sec-review-team: add iac-auditor + prompt-injection-auditor specialists

## Source
Recommendation P0.4/B in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md) — the two highest-priority specialists missing from the current roster. Specialist roster audit explicitly calls out these as "bigger demand than almost any other addition" and "dedicated coverage … beats folding the concern into input-validation-auditor."

## Summary
The current 6-specialist roster has no IaC coverage (Terraform, Kubernetes, Helm, CloudFormation) and folds prompt-injection review into `input-validation-auditor` where it gets insufficient depth on modern LLM-touching apps. Add `iac-auditor` and `prompt-injection-auditor` as first-class specialists in the library (post-CBP-064 refactor), wired into the stack-signal detection so they're picked automatically for IaC repos and LLM agents.

## Assessment
- **Current state:** `input-validation-auditor` brief mentions prompt injection as one bullet; `iac-auditor` does not exist. On the CBP-060 reference run against `recall` (no LLM, no IaC) these gaps didn't matter. They will matter the moment the skill is pointed at a production Terraform repo or an LLM agent.
- **Prerequisite:** CBP-064 (specialist library refactor). This task adds two briefs to `specialists/` and two entries to `stack-signals.md`.
- **Also depends on:** CBP-068 (test harness) — iac and llm-agent fixture repos should land here or in CBP-068, whichever ships first.

**Location:** `.claude/skills/sec-review-team/specialists/iac-auditor.md` (new); `.claude/skills/sec-review-team/specialists/prompt-injection-auditor.md` (new); `.claude/skills/sec-review-team/stack-signals.md` (updated).

## Plan

### iac-auditor

1. Create `.claude/skills/sec-review-team/specialists/iac-auditor.md` with scope:
   - Public-by-default resources (S3 buckets, RDS, blob storage) — check ACL / bucket policy / encryption-at-rest.
   - Wildcards in IAM / RBAC (`Action: "*"`, `Resource: "*"`, `ClusterRoleBinding` with `cluster-admin`).
   - Missing encryption (in-transit via TLS, at-rest via KMS, secrets in plain SSM parameters).
   - Network policies — overly broad `0.0.0.0/0` ingress, missing egress restrictions.
   - Kubernetes pod security — `runAsRoot`, `privileged`, `allowPrivilegeEscalation`, missing `readOnlyRootFilesystem`.
   - Tagging / naming for audit trail and ownership.
   - Hardcoded credentials in `*.tfvars`, `values.yaml`, `.env.tpl`.
2. Integrate with scanners (CBP-067 dependency): `tfsec`, `checkov`, `kube-score`, `kubesec`.
3. Preferred subagent_type: `security-auditor` (if plugin loaded), fallback `general-purpose`.
4. Add to `stack-signals.md`: triggered by `*.tf`, `*.tfvars`, `helm/`, `charts/`, `kustomization.yaml`, `k8s/*.yaml`, `.cloudformation`.

### prompt-injection-auditor

1. Create `.claude/skills/sec-review-team/specialists/prompt-injection-auditor.md` with scope:
   - Untrusted input reaching tool-use arguments (direct or via system prompt concat).
   - Prompt assembly via string concat — `f"You are {user_role}. User: {user_msg}"` patterns.
   - Missing output sanitization — LLM response rendered as HTML, executed as code, or used in SQL without validation.
   - Tool-use role confusion — tools that give the model power the user shouldn't have (arbitrary file write, shell exec) without auth gates.
   - Context poisoning — untrusted documents ingested into RAG pipelines without provenance tracking.
   - Memory / skill / system-prompt injection — user content that can alter agent memory, skill files, or next-turn system prompts.
   - Indirect prompt injection via external data (web pages, emails, PDFs) fetched into the model's context.
   - Secret exfiltration via prompts — LLM instructed to echo env vars / config / other users' data.
2. Preferred subagent_type: `general-purpose` (no dedicated plugin type known today).
3. Add to `stack-signals.md`: triggered by imports of `anthropic`, `openai`, `langchain`, `llama-index`, `@anthropic-ai/sdk`, `@openai/openai`; presence of `prompt.md`/`system_prompt.py`/`PROMPT_TEMPLATE`; tool-use patterns in agent frameworks.
4. Integrate (future) with emerging prompt-injection scanners (Garak, PromptGuard).

### Wiring

1. Update `stack-signals.md` to include both new specialists and their trigger signals.
2. Update default rosters:
   - `iac` roster → **add** iac-auditor as primary.
   - `llm-agent` roster → **add** prompt-injection-auditor; `input-validation-auditor` drops prompt-injection bullet (covered more deeply by new specialist).
3. Update the `input-validation-auditor` brief to explicitly defer prompt-injection to `prompt-injection-auditor` when present ("if prompt-injection-auditor is in the roster, scope yourself to the non-LLM injection axes only").
4. Add an `llm-agent` fixture repo in CBP-068 / here: small Python app using `anthropic` SDK with a deliberate prompt-concat vulnerability. Add an `iac-terraform` fixture: Terraform config with a public S3 bucket + IAM wildcard. Both get `expected-findings.jsonl` asserting the new specialists catch them.

## Acceptance Criteria
- [x] `.claude/skills/sec-review-team/specialists/iac-auditor.md` exists with full brief + scanner integration notes.
- [x] `.claude/skills/sec-review-team/specialists/prompt-injection-auditor.md` exists with full brief covering at least 8 attack classes listed above.
- [x] `stack-signals.md` triggers iac-auditor on IaC signals and prompt-injection-auditor on LLM-SDK signals.
- [x] `input-validation-auditor` brief updated to defer prompt-injection when `prompt-injection-auditor` is present.
- [x] Two fixture repos added: `fixtures/iac-terraform-vulnerable/` (8 findings: 1C/4H/2M + hardcoded tfvars cred) and `fixtures/llm-agent-python-vulnerable/` (7 findings: 2C/5H), each with `expected-findings.jsonl`, `expected-coverage.jsonl`, and `README-FIXTURE.md`.
- [ ] Harness run (from CBP-068) picks up the new specialists and validates the fixtures. _(pending: requires authorized run against each fixture)_
