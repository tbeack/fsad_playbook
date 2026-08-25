# CBP-451 — Diff the AI-native SDLC blog post against the FSAD Playbook and plan incorporation

## Source

Todo entry: review https://claude.com/blog/the-ai-native-sdlc-playbook, diff it against the FSAD Playbook, identify unique insights not already covered, and develop a plan to incorporate them.

## Summary

The blog post frames a six-stage AI-native SDLC (Plan → Design → Build → Test → Deploy → Maintain) built around versioned markdown artifacts (`intent.md` → `spec.md` → `plan.md`), continuous evals, and closed-loop production monitoring. Most of its artifact/skill/hook concepts already exist in the playbook under different framing. The clearest gaps are the "Maintain" stage (production monitoring with statistical breach detection that closes the loop back to a new intent), continuous evals in CI, and a leading/lagging process-metrics framework. This task's deliverable is a written diff + prioritized incorporation plan — not the playbook edits themselves — so each item can become its own follow-on CBP task.

## Assessment

Full 20-item diff (blog concept → playbook coverage):

1. **Six-stage SDLC framework** — Partial. `workflow` (line ~2510, "From Intent to Deployed Feature") covers 5 phases (Intent & Discovery → Live Spec Session → Implementation Planning → Parallel Agent Execution → Human Review & Ship) — no explicit "Test" phase, no "Maintain" closing loop.
2. **`intent.md` artifact** — Partial. Phase 1 is literally "Intent & Discovery" but the file is never named as `intent.md` anywhere (0 hits).
3. **`spec.md` in a skills-constrained session** — Already covered — `markdown` (2556), `workflow` Phase 2. Missing the specific framing that skills apply brand/security/compliance policy live during generation rather than in later review.
4. **`plan.md` / Plan Mode as default start** — Already covered — `workflow` Phase 3, `project-create-spec` (3097), `best-practices` (10664).
5. **CLAUDE.md "repeat mistake twice → add to CLAUDE.md" rule + healthy-output-block convention** — Novel. `claude-setup` (9305) and `best-practices` (10664) cover structure/conciseness but not this specific maintenance trigger or the paired-healthy-output pattern.
6. **Skills as institutional/policy knowledge vs. CLAUDE.md component knowledge** — Already covered — `building-skills` (10253), `skills-library`/`skills-definitions` (3693/3831).
7. **Hooks as build-time guardrails + approval gates** — Already covered — `hooks-deep-dive` (11987) has PreToolUse external-approval and HTTP-hook recipes; the blog's specific "block deploy+production without RELEASE_APPROVAL env var" script isn't shown but the pattern exists.
8. **Parallel sessions/subagents/worktrees + "% time steering vs. waiting" metric** — Partial. Worktrees are used extensively (124 hits); "steering" appears once (2500). No steering-vs-waiting metric exists anywhere.
9. **Legacy system integration / source-of-truth linkage options** — Partial. `integrations` (9839) covers Jira/Figma/Notion/Azure DevOps MCP connectors as data pipes, not as a source-of-truth governance decision with commit-SHA cross-referencing.
10. **Feedback loops: single measurable verification commands + block agent from editing tests during bug fixes** — Partial. Verification commands are covered generally; the "write failing test first, hook-block edits to it during the fix" pattern is absent (0 hits).
11. **Continuous evals in CI** (20–50 task regression suite gating config changes; incidents become permanent evals) — Novel. 0 real matches anywhere in the file.
12. **AI in PR review loop / REVIEW.md with Important/Nit/Skip + nit cap** — Already covered (mostly) — `code-review` (10047) has a full REVIEW.md example. Missing: the ~5 nit cap and "second occurrence → CLAUDE.md" feedback tie-in (same gap as #5).
13. **Managed settings enterprise keys** — Partial. `config-cascade` (9557) already documents `allowManagedHooksOnly`, `requiredMinimumVersion`/`Maximum`, `enforceAvailableModels`, `disableAutoMode`, `sandbox.credentials`. Missing: `permissions.deny`/`permissions.allow` as named managed-settings keys, `disableBypassPermissionsMode`, `disableSideloadFlags`, `strictKnownMarketplaces`, `allowManagedMcpServerOnly`.
14. **CI/CD progression model** (read-only triage → gated writes → sandboxed short-lived tokens → MCP deploy/status/rollback tools → env tiering → rehearsed rollback) — Partial. `cloud-integrations`/`monitoring` cover OTel telemetry and enterprise config push, not this staged trust-escalation model.
15. **Control-band breach detection** (1σ/2σ/3σ tiers, Western Electric rules, `bands.yaml`, auto-diagnose → new intent.md) — Novel. `monitoring` (12729) is entirely about Claude Code's own OTel usage/cost telemetry — a different kind of "monitoring" than production anomaly detection. 0 hits for sigma/control band/Western Electric/bands.yaml.
16. **"Claude Tag" for real-time incident response in Slack/Teams** — Novel. 0 hits in playbook content.
17. **Full leading/lagging per-stage metrics framework** — Novel. `page-kpis` (14445) is entirely volume/adoption-oriented (token consumption, story points, PR/commit counts, WAU, spend, AI acceptance rate) — no cycle-time or escape-rate framing.
18. **DORA metrics tie-in** — Novel. Not mentioned anywhere.
19. **Artifact chain as a closed-loop audit trail** (intent→spec→plan→diff→review→pipeline→breach→new intent) — Partial. The forward half is well modeled in `workflow`; the loop-closing half doesn't exist because #15/#16 don't exist.
20. **Traditional vs. AI-Native stage comparison table** — Already covered, and arguably more detailed — `comparison` (2608) has a 9-row table, more granular than the blog's 6-row version.

## Plan

1. Write a new research doc at `markdown/research/ai-native-sdlc-blog-diff.md` containing:
   - A short summary of the blog's framework (six stages, artifact chain, governance model).
   - The 20-item status table above (concept → already-covered / partial / novel → playbook section id/line or "novel").
   - A prioritized incorporation list (below) — each item names a target playbook page/section and a 1–2 sentence description of the content to add.
2. In that doc, propose concrete follow-on CBP task titles for the top 3 novel/high-value items, for the user to create via `/tb:add-task` if they choose to proceed.
3. No edits to `fsad-playbook.html`, `dist/`, `README.md`, or `CHANGELOG.md` — this task is research/planning only. No version bump.

**Prioritized incorporation list** (to be written into the research doc):

1. **Continuous evals in CI** *(novel, high value)* — New subsection in `code-review` (10047) or `hooks-deep-dive` (11987): a live regression suite of 20–50 real recent tasks (prompt + acceptance checks) gating CLAUDE.md/skill/hook changes on a schedule, with each production incident becoming a permanent eval case.
2. **KPI framework: leading/lagging process metrics** *(novel, high value)* — Extend `page-kpis` (14445) with a "Process Health" subsection: cycle time from spec→plan→merged-PR, first-pass CI success rate, PR review time, defect-escape rate (pre- vs. post-merge), repeat-incident rate.
3. **Production monitoring / control-band breach detection** *(novel, high value)* — New subsection (sibling to `monitoring` at 12729, or new section): statistical breach tiers (log / diagnose read-only / propose-fix) on a rolling baseline metric, with diagnosis written back as a new spec-ready markdown artifact — this is the "Maintain" stage closing the workflow loop.
4. **CLAUDE.md maintenance rule + healthy-output-block convention** *(novel, low-lift)* — Add to `claude-setup` (9305)/`best-practices` (10664): "second occurrence of a mistake → goes into CLAUDE.md," plus pairing each verification command with a known-healthy output example.
5. **Bug-fix TDD pattern** *(novel, low-lift)* — Add to `best-practices` (10664) or `hooks-deep-dive` (11987): write the failing test before the fix, hook-block edits to that test file during the fix.
6. **Managed-settings key gaps** *(novel, low-lift, high enterprise value)* — Extend `config-cascade` (9559): add `permissions.deny`/`permissions.allow`, `disableBypassPermissionsMode`, `disableSideloadFlags`, `strictKnownMarketplaces`, `allowManagedMcpServerOnly`, matching the existing key-callout format.
7. **Nit cap + review-to-CLAUDE.md feedback loop** *(partial, low-lift)* — Add to the existing `code-review` REVIEW.md example (10118): a stated ~5-nit cap and the rule that a repeated finding gets promoted into CLAUDE.md.
8. **CI/CD trust-escalation model** *(partial, medium value)* — Add to `cloud-integrations` (12445): read-only triage → gated writes → sandboxed short-lived-token execution → MCP-exposed deploy/status/rollback tools → dev/staging/prod tiering, with rollback as the most-rehearsed pipeline path.
9. **Source-of-truth linkage governance for legacy tools** *(partial, low-lift)* — Add a callout to `integrations` (9839): repo-as-truth-with-legacy-references vs. legacy-as-truth-with-markdown-copies vs. minimum-bar bidirectional linkage (record IDs ↔ commit SHAs).
10. **`intent.md` as a named artifact** *(terminology gap, optional/low priority)* — Name the artifact explicitly in `workflow` Phase 1 (2510) and `markdown` (2556) alongside the already-named `spec.md`/`plan.md`.

## Acceptance Criteria

All criteria verified 2026-08-25 before commit.

- [x] `markdown/research/ai-native-sdlc-blog-diff.md` exists and contains the 20-item diff table covering the six-stage framework, intent.md/spec.md/plan.md artifacts, CLAUDE.md rules, skills, hooks, parallel sessions, legacy integration, feedback loops, continuous evals, PR review loop, managed settings, CI/CD progression, control-band monitoring, Claude Tag, metrics framework, DORA, artifact chain, and the comparison table
- [x] Every diff item cites either a specific existing playbook section id/line or is explicitly marked novel
- [x] Doc contains a prioritized incorporation list of at least 8 items, each naming a target playbook section/page and a 1–2 sentence description of the content to add
- [x] Doc proposes concrete next-step CBP task titles for at least the top 3 novel/high-value items
- [x] No changes made to `fsad-playbook.html`, `dist/fsad-playbook.html`, `README.md`, or `CHANGELOG.md`
