# Stack Signals → Specialist Roster

Maps detected stack signals to a default specialist roster. Orchestrator reads this at Step 1 to pick the roster before spawning. User can override in the Step 0 confirmation.

## Detection rules (ordered; multiple can match)

| Signal | Match |
|---|---|
| `webapp` | `package.json` has express/fastify/koa/next/nest/django/fastapi/flask/rails; OR `routes/`, `pages/`, `app/`, `api/` directory; OR `Gemfile` with `rails`. |
| `desktop` | `src-tauri/tauri.conf.json` OR `electron` in `package.json` dependencies. |
| `desktop-with-webview` | `desktop` AND (renders user content OR has `<script>` in index.html). |
| `iac` | `*.tf`, `*.tfvars`, `helm/`, `charts/`, `kustomization.yaml`, `k8s/*.yaml`, `.cloudformation`, `cfn-template.*`. |
| `container` | `Dockerfile`, `docker-compose.yml`, `docker-compose.yaml`, `.dockerignore`. |
| `kubernetes` | K8s manifests (`kind: Deployment/Pod/etc.` in YAML) OR `helm/`. |
| `llm-agent` | imports of `anthropic`/`openai`/`langchain`/`llama-index`/`@anthropic-ai/sdk`; OR `prompt.md`/`system_prompt.py`/`PROMPT_TEMPLATE` file. |
| `backend` | Server-side language (Python/Go/Rust/Node/Java/Ruby) with HTTP handlers, background workers, or message queues. |
| `realtime` | WebSocket / SSE / gRPC-streaming server code. |
| `multi-user` | auth code present (JWT, OAuth, session middleware); non-single-user data model. |
| `cli` | entry point with `main.rs`/`main.py` + `argparse`/`click`/`clap`; no server/webview. |
| `mobile` | `ios/`, `android/`, `react-native`, `expo`, `flutter`. |
| `consumer-desktop` | `desktop` AND analytics SDK dependency (Sentry, PostHog, Segment). |
| `all-with-ci` | `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, `.circleci/`. |

## Default rosters

Minimum roster for any stack = baseline 4: `secrets-crypto-auditor`, `dependency-supplychain-auditor`, `silent-failure-hunter`, `data-exposure-auditor`. Then add per signal:

| Stack | Roster additions |
|---|---|
| `webapp` | + `auth-authz-auditor`, `input-validation-auditor`, `frontend-security-auditor` |
| `desktop` | + `auth-authz-auditor` (focus on IPC/capabilities, not user auth), `input-validation-auditor` |
| `desktop-with-webview` | + `frontend-security-auditor` (CSP matters here too) |
| `iac` | + `iac-auditor` |
| `container` | + `container-runtime-auditor` |
| `kubernetes` | + `container-runtime-auditor`, `iac-auditor` |
| `llm-agent` | + `prompt-injection-auditor`, `input-validation-auditor` (defers prompt-injection to specialist) |
| `backend` | + `auth-authz-auditor`, `input-validation-auditor`, `concurrency-race-auditor` |
| `realtime` | + `concurrency-race-auditor` |
| `multi-user` | + `auth-authz-auditor`, `concurrency-race-auditor` (session races) |
| `cli` | (baseline only) |
| `consumer-desktop` | + `privacy-telemetry-auditor` |
| `webapp + consumer-facing` | + `privacy-telemetry-auditor` |
| `all-with-ci` | + `ci-cd-security-auditor` |

## Merge rule
Union specialists across all matching signals. De-duplicate. User can remove or add at confirmation.

## Example mappings

**Tauri desktop note app (recall):**
- Signals: `desktop`, `desktop-with-webview`
- Roster: baseline (4) + `auth-authz-auditor`, `input-validation-auditor`, `frontend-security-auditor` = 7 specialists.

**Django + Postgres SaaS app:**
- Signals: `webapp`, `backend`, `multi-user`, `all-with-ci`
- Roster: baseline (4) + `auth-authz-auditor`, `input-validation-auditor`, `frontend-security-auditor`, `concurrency-race-auditor`, `ci-cd-security-auditor` = 9 specialists.

**Terraform + Helm infra repo:**
- Signals: `iac`, `kubernetes`, `all-with-ci`
- Roster: baseline (4) + `iac-auditor`, `container-runtime-auditor`, `ci-cd-security-auditor` = 7 specialists.

**Python LLM agent with RAG:**
- Signals: `llm-agent`, `backend`
- Roster: baseline (4) + `prompt-injection-auditor`, `input-validation-auditor`, `auth-authz-auditor`, `concurrency-race-auditor` = 8 specialists.
