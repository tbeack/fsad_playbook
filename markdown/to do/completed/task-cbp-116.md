# CBP-116 — Add QA Pod to Pod Compositions page

## Summary
Add a new "QA Pod" configuration (G) to the Pod Explorer on the Pod Compositions page. The QA Pod is a specialist engineering pod that builds the testing infrastructure used by all other pods — agents for code review and test generation, skills for coverage reporting, hooks for verification gates, and MCP tools for fixture management. This completes the pod taxonomy by naming the team responsible for FSAD's verification layer.

## Assessment
The Pod Compositions page currently has six configurations (A–F): Triad, Builder Duo, Experience Pod, Full Stack Pod, Platform Pod, and Discovery Pod. All live inside `#page-pods` in `fsad-playbook.html`. The Pod Explorer uses a tab system (`pod-tab` buttons + `pod-panel` divs), and the sizing table below lists work types to pod recommendations.

A QA Pod does not yet exist — neither as a tab, panel, nor sizing table row.

**Location:** `fsad-playbook.html`
- Pod tabs: line ~2401–2408 (`.pod-tabs` div)
- Pod panels: lines ~2411–2557 (six `.pod-panel` divs)
- Sizing table: lines ~2566–2580 (`.sizing-table tbody`)

## Plan

1. **Add pod tab button** — append a new `<button>` for the QA Pod inside the `.pod-tabs` div, after the Discovery tab. Use emoji 🧪, label "QA Pod", size badge "2", `data-pod="qa"`, `onclick="switchPod('qa')"`.

2. **Add pod panel** — insert a new `<div class="pod-panel" id="pod-qa">` block after the Discovery panel (before `</section>`). Structure mirrors Platform Pod (2 engineers + agents at bottom):
   - **Configuration G — The QA Pod — 2 humans + N QA agents**
   - Core artifact in ring: `test-plan.md`
   - Members: QA Lead (pos-tl, eng badge), Test Engineer (pos-tr, eng2 badge), QA Agents (pos-bottom, agents badge)
   - Intro: Specialist engineering pod that builds the testing infrastructure used by every other pod — agents for test generation and code review, skills for coverage reporting, hooks for pre-commit and post-deploy verification gates, and MCP tools for fixture management. Its output is reusable tooling, not features.
   - Role Responsibilities:
     - **QA Lead** — Owns test strategy, verification gate standards, and acceptance criteria frameworks. Reviews agent-generated test output for coverage gaps. Defines the quality contract other pods must meet.
     - **Test Engineer** — Builds custom agents, skills, hooks, and MCP tools for the team's testing stack. Maintains fixture libraries, regression suites, and test scaffolding.
     - **QA Agents** — Generate unit, integration, and e2e tests; run coverage analysis; perform spec-compliance validation; surface regressions.
   - When To Use:
     - Establishing QA infrastructure for a new product or team
     - Building custom test-generation agents and skills for specialized domains
     - Creating shared hooks and verification gates for CI/CD pipelines
     - Reducing testing tooling debt — standardizing test patterns across pods
   - Key Artifacts:
     - `test-plan.md` — QA strategy, coverage targets, and acceptance gates
     - `agents/` — Custom test generation, code review, and validation agents
     - `skills/` — Coverage reporter, regression runner, fixture builder
     - `hooks/` — PreToolUse / PostToolUse verification gates

3. **Add sizing table row** — append a new `<tr>` in the `.sizing-table tbody` for work type "QA / test infrastructure" → QA Pod, size 2, reason "Build reusable agents, skills, hooks. Engineering-only scope."
   - Use `--accent-rose` for the config-tag color (distinctive from existing six; rose is unused in the pod context).

4. **No version bump** — content addition, no version bump called for in this task.

All criteria verified 2026-05-06 before commit.

## Acceptance Criteria
- [x] Pod Explorer shows a "🧪 QA Pod" tab that activates the QA panel
- [x] QA panel renders correctly with ring visual (QA Lead, Test Engineer, QA Agents), intro paragraph, role cards, When To Use, and Key Artifacts
- [x] Configuration label reads "Configuration G" and count reads "2 humans + N QA agents"
- [x] Sizing table includes a "QA / test infrastructure" row pointing to the QA Pod
- [x] All other existing pod tabs still work correctly (no regressions)
