# CBP-340 — Review the `cbp-update` skill and `playbook-updater` agent; develop an improvement plan

## Source
Live incident during a 2026-08-05 `/cbp-update` run: the resumed `playbook-updater` agent produced confused, contradictory task notifications from what appeared to be multiple identities of the same agent, one of which refused to trust a relayed approval and flagged the run's own auto-merge instruction as a security concern. The run was cancelled with zero changes applied. Investigating the cause surfaced a concrete, evidence-backed root cause (see Assessment) plus a broader opportunity: `tb_skills` ran a rubric-based diagnostic + fix process ("Wave 2") over its own skill library in `~/repo/tb_skills/planning/research/skills_diagnostic_report_Aug2026.md` and `post_skills_fix_diagnostic_report_Aug2026.md`, which already scored and fixed `cbp-update` (1.7 → 4.9) and produced a canonical, hardened agent definition. This task is the same treatment applied to the actual files this project runs.

## Summary
Diagnose why the live `cbp-update` skill / `playbook-updater` agent pairing misbehaved, confirm whether the fix already exists upstream (it does), and produce a prioritized improvement plan — grounded in the tb_skills rubric — for bringing this project's live definitions fully in sync and verifying no further drift exists. This is an analysis + plan task; implementation is follow-up work (likely its own CBP task(s), same pattern CBP-339 used for the Skills Library resync).

## Assessment

**Confirmed root cause — duplicate, conflicting agent definitions for the same name.** Two files both define an agent named `playbook-updater`, and they have diverged:

- `~/.claude/agents/playbook-updater.md` — **byte-identical** to the canonical fixed version at `~/repo/tb_skills/skills/cbp-update/agent.md` (verified via `diff`, exit 0). Has `Agent` in `allowed-tools`, Phase 4a (loop-until-dry), Phase 5.5 (independent fresh-context refuter gating version bump/PR/auto-merge), fan-out for the Phase 3 HTML sweep and Phase 5 task execution, and the Phase 7 step 7 auto-merge with an explicit Success Criteria section.
- `~/.claude/plugins/local/fsad-playbook/agents/playbook-updater.md` — **stale**. Missing `Agent` from `allowed-tools` (which structurally blocks any sub-agent fan-out or the Phase 5.5 refuter — it cannot spawn one), pins `model: claude-sonnet-4-6` (a prior-generation model, exactly the "unpinned model" gap the tb_skills baseline diagnostic flagged), caps task creation at a fixed "5 Claude Code + 5 Codex = 10 total" instead of loop-until-dry, runs Phase 5 task execution and the Phase 3 HTML sweep fully serially, and has no Phase 5.5 verification gate or Phase 7 auto-merge step at all — it stops at "Never commit directly to main — always use a feature branch and PR."

Two agent definitions sharing one name is very likely why the 2026-08-05 run behaved inconsistently — different invocations plausibly resolved to different definitions, producing agents with different capabilities and different awareness of the Phase 5.5 gate, which matches the observed symptom of agents that appeared to talk past each other and disagree about what had been approved.

**`SKILL.md` is already in sync.** `diff ~/repo/tb_skills/skills/cbp-update/SKILL.md ~/.claude/skills/cbp-update/SKILL.md` returns no differences — only the agent definition has drifted, not the skill trigger.

**Broader context — this project's `CLAUDE.md` already diverges from the generic agent spec in known ways** (semver `vX.Y.Z` vs. the spec's `vNN`; 3 version-string locations vs. the spec's 2, including the changelog-modal `<section>`; a mandatory `scripts/build-dist.py` + `dist/` staging step the spec never mentions). These are legitimate project-specific overrides, not bugs, but they mean a straight file-copy sync from `tb_skills` isn't safe without re-checking these deltas are preserved — this is exactly the kind of divergence the tb_skills rubric's "Model fit" and "Failure-mode handling" dimensions are meant to catch.

**Method to reuse (from `skills_diagnostic_report_Aug2026.md`):** a fixed 6-dimension rubric — Goal framing, Loop/iteration support, Model fit, Delegation, Verification & evidence, Failure-mode handling — scored 1–5 each, applied via read-only review (agent fan-out optional given this is just two files), producing per-file findings and prioritized recommendations, the same shape as the `cbp-update` entry in that report (lines 271–286).

## Plan

1. Re-read both live files in full (`~/.claude/skills/cbp-update/SKILL.md`, `~/.claude/agents/playbook-updater.md`, and the stale `~/.claude/plugins/local/fsad-playbook/agents/playbook-updater.md`) against the tb_skills rubric; score each dimension 1–5 with a one-line justification, mirroring the format of the existing `cbp-update` diagnostic entry.
2. Determine why two `playbook-updater` definitions exist — check the `fsad-playbook` plugin's manifest/install path and git history for `~/.claude/plugins/local/fsad-playbook/agents/playbook-updater.md` to see whether it's a stale local plugin install, a leftover from before the agent moved to `~/.claude/agents/`, or something the plugin packaging step still regenerates on each install (if the latter, the fix must happen at the source the plugin builds from, not just the installed copy).
3. Confirm which definition Claude Code actually resolves when `Agent({subagent_type: "playbook-updater"})` is called with both present, if that can be determined without live experimentation that risks another unattended run.
4. Write the diagnostic findings plus a prioritized fix plan to `markdown/updates/` (or another agreed location), covering at minimum: (a) eliminating the duplicate/stale agent definition, (b) verifying the project's `CLAUDE.md`-specific deltas (semver, 3 version locations, `build-dist.py`) are preserved in whichever definition survives, (c) whether the `tb_skills`-side `post_skills_fix_diagnostic_report_Aug2026.md` gap list (e.g. `effort` tiering never implemented for `cbp-update`) applies here too.
5. Do not implement the fix as part of this task — hand the prioritized plan back for a follow-up CBP task (or tasks), consistent with `CLAUDE.md`'s "Research > Plan > Implement" workflow and this skill's own "don't implement the task" guardrail.

## Acceptance Criteria
- [ ] Both live files (`~/.claude/skills/cbp-update/SKILL.md`, `~/.claude/agents/playbook-updater.md`) and the stale duplicate (`~/.claude/plugins/local/fsad-playbook/agents/playbook-updater.md`) are scored against the 6-dimension tb_skills rubric with justifications, written to a durable file (not just chat output).
- [ ] The duplicate-agent-definition root cause is either confirmed or ruled out with concrete evidence (git history, plugin manifest, or install-path inspection), not assumed.
- [ ] The written plan explicitly addresses how this project's `CLAUDE.md`-specific deltas (version scheme, 3 version locations, `build-dist.py`) will be preserved through any resync.
- [ ] The plan produces a clear, prioritized next-action list (e.g. specific follow-up CBP task IDs or a defined scope for one), not just a list of observations.
- [ ] No changes are made to `~/.claude/skills/cbp-update/SKILL.md`, `~/.claude/agents/playbook-updater.md`, or the plugin's copy as part of this task — this task is analysis and planning only.
