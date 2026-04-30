# CBP-065 — sec-review-team: per-agent heartbeat files + orchestrator interim-report status lines (P0.5)

## Source
Recommendation P0.5 in [`markdown/research/sec-review-recommendations.md`](../research/sec-review-recommendations.md). Perceived reliability: a 25-minute silent run is indistinguishable from a hung run. Progress signal is the cheapest trust-building affordance the skill can add.

## Summary
Give users progress visibility during a run via two mechanisms: (1) each specialist writes a `<agent>.status.json` at spawn and updates it as it reads files + writes findings, (2) the orchestrator prints a one-line interim status as each agent completes (`"✓ input-validation-auditor done (0C/0H/0M/3L). 5 specialists still running."`).

## Assessment
- **Current state:** Step 3 of `SKILL.md` spawns all 6 agents in a single batched `Agent` call. User sees no output until all 6 return.
- **Constraint:** The `Agent` tool is synchronous per call — the orchestrator can't receive incremental updates from a running subagent. Workaround: subagents write their findings file *before* returning so the orchestrator can poll the filesystem.
- **Secondary constraint:** Today agents are spawned in parallel in a single message, so the orchestrator effectively blocks on all 6. Interim-report requires either (a) sequential spawning (loses parallelism) or (b) filesystem polling between spawn and the next user turn (possible with a background loop).

**Location:** `.claude/skills/sec-review-team/SKILL.md` — Step 3 (lines 25–42); per-specialist briefs (lines 46–108).

## Plan

1. Add a `status.json` contract to every specialist brief:
   - On spawn: write `{status: "starting", agent: "<name>", started_at: "<ISO>", files_read: 0, findings_written: 0}`.
   - Every ~5 file reads: update `files_read`, set `status: "scanning"`.
   - On writing a finding: increment `findings_written`.
   - On completion: set `status: "completed"`, `finished_at`, final severity counts.
   - On error: set `status: "error"`, include the error message.
2. Specialists must flush `.status.json` to disk *before* returning from the `Agent` tool call (so the orchestrator can see the final state).
3. Update Step 3 (spawn) in `SKILL.md`:
   - Tell the user up-front: "Spawning 6 specialists in parallel. Tail `<TARGET>/.planning/security-review/*.status.json` for live progress."
4. Update Step 4 (consolidation) to:
   - Print one status line per completed specialist as they return: `✓ auth-authz-auditor done (0C/2H/2M/1L, 12 files read, 4m 22s)` or `✗ auth-authz-auditor errored: <message>`.
   - If any specialist errored, flag it in `REPORT.md` and carry on with the rest.
5. Document in the skill that users can watch progress from a second terminal with `watch -n 5 'cat <TARGET>/.planning/security-review/*.status.json | jq ...'`.
6. Optional enhancement (future): build a `view-progress` subcommand that tails the status files in the orchestrator's own output.

## Acceptance Criteria
- [x] Every specialist brief instructs the agent to write `<agent>.status.json` on spawn and update it as it progresses.
- [x] `status.json` includes: `status`, `started_at`, `finished_at` (when done), `files_read`, `findings_written`, final severity counts.
- [x] Orchestrator prints one interim-status line per completed specialist.
- [x] Errored specialists don't block the rest; `REPORT.md` flags them clearly.
- [x] `SKILL.md` documents how users can watch live progress externally.
- [x] Schema illustration committed: `markdown/research/sec-review-recall-cbp060-status-illustration.jsonl` — 6 final-state status.json entries derived from CBP-060 timing and finding counts (0C/9H/12M/14L raw, runtimes 2m48s–29m41s). Confirms schema design against real run data; live validation (status files visible mid-run, runtime in REPORT.md) is pending an authorized re-run.
