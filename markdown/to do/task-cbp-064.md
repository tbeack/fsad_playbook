# CBP-064 — sec-review-team: refactor into specialist library with stack-signal detection (P0.4)

## Source
Recommendation P0.4 in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md). The fixed roster of 6 specialists is wasteful on stacks where specialists have little to do (e.g., `auth-authz-auditor` on a single-user local-only Tauri app) and incomplete on stacks that need specialists absent from the roster (e.g., Terraform repos, LLM agents, container-heavy deployments).

## Summary
Refactor the skill from one monolithic `SKILL.md` with 6 hardcoded specialist briefs into: (a) a thin orchestrator `SKILL.md` (~60 lines), (b) a `specialists/` directory with one brief per specialist, (c) a `stack-signals.md` that maps detected stack signals to a default roster, and (d) a `consolidation-template.md` for REPORT.md generation. The orchestrator detects stack signals at Step 0 and picks the roster automatically (user can override in confirmation screen from CBP-062).

## Assessment
- **Current state:** `.claude/skills/sec-review-team/SKILL.md` is 150 lines, ~80 of which are the 6 specialist briefs. Every invocation loads the full file.
- **Problem:** No way to add specialists without bloating `SKILL.md`; roster is fixed regardless of stack; tokens wasted on irrelevant briefs.
- **Prerequisite for:** CBP-069 (add iac + prompt-injection), CBP-072 (add frontend-security, container-runtime, ci-cd-security), CBP-073 (add concurrency-race, privacy-telemetry), CBP-074 (prune overlaps). All new specialists assume this refactor.

**Location:** `.claude/skills/sec-review-team/` — new subdirectories `specialists/`, `schema/` (from CBP-061), `docs/`. Existing `SKILL.md` slimmed.

## Plan

1. Create `.claude/skills/sec-review-team/specialists/` directory with one brief per existing specialist:
   - `auth-authz-auditor.md`
   - `input-validation-auditor.md`
   - `secrets-crypto-auditor.md`
   - `dependency-supplychain-auditor.md`
   - `silent-failure-hunter.md`
   - `data-exposure-auditor.md`
   Each brief is a standalone markdown file with: relevant-for-stacks, preferred-subagent-type, fallback, brief-body, output-contract.
2. Create `.claude/skills/sec-review-team/stack-signals.md` that lists stack-signal detection rules and maps each to a default roster. Example mappings (from recommendations-doc P0.4):
   - `webapp` (package.json has express/fastapi/django/rails, has `routes/`) → auth-authz + input-validation + secrets-crypto + dependency-supplychain + silent-failure + data-exposure + frontend-security
   - `desktop` (tauri.conf.json, electron) → same minus frontend-security; focus on IPC/capabilities
   - `iac` (`*.tf`, `helm/`, `k8s/`) → iac-auditor + secrets-crypto + dependency-supplychain + ci-cd-security
   - `llm-agent` (imports anthropic/openai/langchain) → prompt-injection + input-validation + secrets-crypto + dependency-supplychain + data-exposure
   - `cli` → secrets-crypto + dependency-supplychain + silent-failure + input-validation
3. Create `.claude/skills/sec-review-team/consolidation-template.md` that defines REPORT.md sections programmatically (depends on CBP-061 JSONL).
4. Slim `.claude/skills/sec-review-team/SKILL.md` to ~60 lines: frontmatter + orchestration steps (0. pre-run confirmation → 1. scope → 2. detect stack → 3. pick roster from `stack-signals.md` → 4. spawn → 5. consolidate → 6. deliver). The orchestrator *reads only* the specialist briefs it's about to spawn.
5. Update Step 0 (from CBP-062) to report the detected stack + proposed roster, and allow user to add/remove specialists before confirming.
6. Re-run against `recall` and confirm:
   - Detected stack: `desktop` (Tauri)
   - Proposed roster: 6 default specialists (frontend-security not yet added — will land in CBP-072)
   - Output matches CBP-060 baseline

## Acceptance Criteria
- [x] `.claude/skills/sec-review-team/specialists/` contains one file per existing specialist with its full brief.
- [x] `.claude/skills/sec-review-team/stack-signals.md` defines detection rules + roster mappings for at least: webapp, desktop, iac, llm-agent, cli.
- [ ] `.claude/skills/sec-review-team/SKILL.md` slimmed to ≤ 80 lines (orchestration only).
- [ ] Orchestrator reads only the briefs it's about to spawn (measured: token count for a typical run drops ≥ 2k vs. current).
- [x] Detected-stack + proposed-roster visible in Step 0 confirmation (from CBP-062).
- [x] User can override roster before run proceeds.
- [ ] Re-run against `recall` reproduces CBP-060's deduped severity counts.
