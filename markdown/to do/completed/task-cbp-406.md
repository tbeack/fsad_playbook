# CBP-406 — Diagnose the `playbook-updater` self-invocation / self-misidentification failure from the 2026-08-20 run

## Source
Live incident during the 2026-08-20 `/cbp-update` run. This is a distinct incident from CBP-365 (2026-08-07: hallucinated async batch completions, then stalling) — that run correctly dispatched all its Phase 5 batches and failed downstream. This run failed at the very start, before Phase 0, and never touched `fsad-playbook.html` or any other project file.

## Summary
The `playbook-updater` agent, on being spawned correctly (foreground, depth 1, no `name:` field — the calling session's dispatch was correct throughout), did not begin Phase 0 as its own agent definition instructs. Instead it called `Skill({skill: "cbp-update"})` on itself, then — following that skill's spawn instructions literally — issued its own `Agent()` call to spawn a second, nested `playbook-updater` agent. That nested agent reported its own tool list was missing `Agent` (plausibly a harness-level recursion-depth cap). The outer agent then lost track of its own place in the call chain: after a `ListAgents` call returned a subagent entry sharing its own ID, it explicitly asserted "I'm the top-level session working directly for the user here" and rejected a legitimate check-in message from its actual parent (the calling root session) as illegitimate. The run ended ~4 minutes after dispatch having never reached Phase 0. No commits, no branch, no file edits — repo confirmed clean on `main` throughout.

## Assessment

Full evidence-grounded findings are written to `markdown/updates/cbp-406-diagnostic.md`, sourced directly from the spawned agent's own transcript (`~/.claude/projects/-Users-theobeack-Repo-fsad-playbook/f4d78551-18ca-4326-9ad9-89569c7047b8/subagents/agent-a65d036f7cb02110d.jsonl`), not inferred from spec text. Summary of the six findings:

1. **Spurious self-invocation of the `cbp-update` skill** — the agent's first action was to call `Skill('cbp-update')` instead of beginning Phase 0. Nothing in its own agent definition instructs this.
2. **Redundant nested spawn** — following that skill's text literally, it spawned a second nested `playbook-updater` agent via `Agent()` instead of doing the work itself.
3. **Nested agent lost `Agent`-tool access** — the child reported a tool list missing `Agent` despite the frontmatter declaring it, plausibly a harness recursion-depth cap (echoing the `Workflow` tool's documented one-level-only nesting restriction).
4. **Self-misidentification as the root/top-level session** — confirmed directly against its own `.meta.json` (`spawnDepth: 1`); it is not the top-level session, but asserted that it was and rejected a legitimate parent instruction on that basis.
5. **Unresolved: possible agent-ID collision** — whether the nested spawn produced a distinct child that got mislabeled with the parent's own ID, or the harness reused the ID across the nesting boundary, isn't resolved by available evidence. Left open rather than guessed at.
6. **`Skill` tool callable despite not being declared in `allowed-tools`** — a broader declared-vs-runtime tool-grant mismatch, flagged as a platform-level question rather than an agent-definition fix.

## Plan

1. ~~Locate the actual transcript rather than reason from spec text alone.~~ **Done.** Found immediately via this session's own scratchpad path (session UUID known up front, unlike CBP-365's initial wrong-directory search).
2. ~~Extract and quote the real sequence of tool calls and text, with timestamps.~~ **Done** — see `cbp-406-diagnostic.md`.
3. ~~Determine root cause for the spurious `Skill` self-invocation and nested re-spawn.~~ **Done, to the extent the evidence supports** — plausible trigger identified (prompt-text similarity to the skill's own trigger phrasing), not proven with certainty; recorded as such rather than overclaimed.
4. ~~Determine root cause for the self-misidentification.~~ **Done** — directly confirmed via the agent's own `.meta.json` spawn depth versus its own claimed identity.
5. Write the diagnostic findings plus a prioritized, concrete fix plan to `markdown/updates/cbp-406-diagnostic.md`, consistent with the CBP-365 precedent.
6. Do not implement the fix as part of this task — hand the prioritized plan back for a follow-up CBP task, consistent with `CLAUDE.md`'s "Research > Plan > Implement" workflow and the precedent CBP-365 → CBP-366 set.

## Acceptance Criteria

- [x] The failure sequence is root-caused with concrete, transcript-verified evidence (exact tool calls, timestamps, and quoted text from `agent-a65d036f7cb02110d.jsonl`), not speculation from the agent definition's spec text alone.
- [x] The spurious `Skill('cbp-update')` self-invocation and the resulting redundant nested `Agent()` spawn are identified as the proximate cause, distinguishing this from CBP-365's distinct failure mode (which occurred well after correct dispatch, downstream in Phase 5).
- [x] The self-misidentification ("I'm the top-level session") is confirmed directly against the agent's own `.meta.json` spawn depth, not just inferred from its text.
- [x] Genuinely unresolved questions (the possible agent-ID collision) are left open rather than guessed at, matching this project's established diagnostic rigor.
- [x] The written plan proposes specific, concrete guardrail additions for `~/.claude/agents/playbook-updater.md` (no-self-skill-invocation, no-self-respawn, self-identity grounding, documented depth-1 invocation invariant).
- [x] No changes are made to `~/.claude/agents/playbook-updater.md` or `~/.claude/skills/cbp-update/SKILL.md` as part of this task — diagnosis and planning only.

All criteria verified 2026-08-20 during this task's own execution.
