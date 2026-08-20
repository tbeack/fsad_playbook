# CBP-407 — Implement the CBP-406 fix plan: guardrails against self-invocation and self-misidentification in `playbook-updater`

## Source
Follow-up to CBP-406's diagnostic (`markdown/updates/cbp-406-diagnostic.md`), itself triggered by a live `/cbp-update` incident on 2026-08-20 where the spawned `playbook-updater` agent, instead of beginning Phase 0, called `Skill('cbp-update')` on itself, then spawned a redundant nested `playbook-updater` agent per that skill's literal instructions. The nested agent reported losing access to the `Agent` tool, and the outer agent then lost track of its own place in the call chain — at one point asserting "I'm the top-level session working directly for the user here" and rejecting a legitimate check-in message from its actual parent (the calling root session) on that basis. The run ended ~4 minutes after dispatch having never reached Phase 0; no commits, no file edits.

## Summary
CBP-406 root-caused the incident directly against the spawned agent's own transcript (not inference) and produced a 5-item fix plan. This task implements the parts of that plan scoped to the agent definition file (`~/.claude/agents/playbook-updater.md`), consistent with the precedent CBP-365 → CBP-366 set.

## Assessment
Full findings, transcript evidence (exact tool calls, timestamps, quoted text), and reasoning are in `markdown/updates/cbp-406-diagnostic.md`. Summary of what needs to change in `~/.claude/agents/playbook-updater.md`:

- **No instruction currently prevents the agent from invoking the `cbp-update` skill on itself or re-spawning another `playbook-updater` agent.** The "Start Now" section (bottom of the file) says only "Begin Phase 0" — it doesn't explicitly forbid the detour that actually happened (CBP-406 Finding 1/2).
- **No instruction currently grounds the agent's own identity in the call chain.** Nothing in the file states that this agent is always a spawned subagent, never the root/top-level session, and that mid-task check-in messages from its spawner are legitimate instructions to act on rather than suspicious noise (CBP-406 Finding 4).
- **The Phase 3/5 fan-out design implicitly assumes the agent itself is running at spawn depth 1** (spawned once, directly, by the calling session or skill) so that its own further `Agent()` calls land at depth 2 and retain tool access. This assumption is nowhere stated as an explicit invariant, so nothing in the spec would have warned against the redundant nested spawn that violated it (CBP-406 Finding 3).
- **Finding 5 (possible agent-ID collision) and Finding 6 (`Skill` tool callable despite not being in `allowed-tools`)** are flagged in the diagnostic as platform-level/harness questions, not fixable from within the agent definition file — out of scope for this task, same as CBP-406 left them out of scope for itself.

## Plan

1. **Add an explicit no-self-invocation guardrail.** In the Guardrails section (and/or the "Start Now" section) of `~/.claude/agents/playbook-updater.md`, state directly: this agent must never call `Skill('cbp-update')` on itself, and must never spawn another agent of `subagent_type: "playbook-updater"` — Phase 0 begins immediately from the agent's own instructions, with no skill lookup or self-respawn step. This directly prevents CBP-406 Finding 1/2, the proximate cause of the incident.
2. **Add an explicit self-identity grounding statement.** State plainly: this agent is always a spawned subagent, never the root/top-level session; if a message arrives mid-task from whatever spawned it (labeled "coordinator" or otherwise), that is a legitimate instruction from its actual caller and should be acted on, not distrusted or dismissed. Directly addresses CBP-406 Finding 4.
3. **Document the depth-1 invocation invariant.** Add a line (likely near the Phase 3/5 fan-out instructions or in Guardrails) stating that this agent's own designed fan-out depends on it being invoked once, directly, at spawn depth 1 — so a future change to how it's dispatched doesn't silently reintroduce the same class of failure.
4. **Verify end to end.** After implementing 1–3, re-read the full file to confirm the new guardrail language is unambiguous and doesn't conflict with the existing CBP-366-era Phase 3/5 synchronous-dispatch instructions.

## Acceptance Criteria

All criteria verified 2026-08-20 before commit.
- [x] `~/.claude/agents/playbook-updater.md` explicitly forbids self-invoking the `cbp-update` skill and self-respawning another `playbook-updater` agent, verified by grep/read against the live file.
- [x] The file explicitly states the agent is always a spawned subagent (never the root/top-level session) and that spawner check-in messages are legitimate, verified by grep/read against the live file.
- [x] The file documents the depth-1 invocation invariant for the Phase 3/5 fan-out design, verified by grep/read against the live file.
- [x] No unrelated changes to `fsad-playbook.html` or other playbook content.
- [x] Nothing in the implementation regresses CBP-366's prior fixes (synchronous `run_in_background: false` dispatch in Phase 3/5, read-only Phase 5 sub-agent tools, Phase 4→5 completeness check) — spot-checked after the edit.
