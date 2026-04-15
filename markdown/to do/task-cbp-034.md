# CBP-034 — Add `/recap` to Cheat Sheet session/context/history table

## Summary
Claude Code v2.1.108 added a `/recap` command that replays session context when returning to a long-running session. It is configurable in `/config`, manually invocable with `/recap`, and can be force-enabled with `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1` when telemetry is disabled. The command is not currently in the playbook.

## Assessment
- **Existing coverage**: None. The session/context/history table (lines 4461–4477) does not mention `/recap`.
- **Target location**: Add a new row to the session/context table after the `/rename` row (line 4469).

## Plan

1. Read `fsad-playbook.html` lines 4460–4477 to confirm the table structure.
2. Add a new row after the `/rename` row:
   ```html
   <tr><td><code>/recap</code></td><td>Replay session context — useful when returning to a long-running session. Configurable in <code>/config</code>; force with <code>CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1</code>.</td></tr>
   ```
3. Mark task complete in todo.md.

## Acceptance Criteria
- `/recap` appears in the session/context/history table in the Cheat Sheet.
- Description explains the use case (returning to a session) and mentions the `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` fallback for telemetry-disabled setups.
- HTML pattern matches the surrounding rows exactly.
