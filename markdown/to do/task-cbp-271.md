# CBP-271 — Env vars: `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1`

## Summary
Claude Code v2.1.193 added automatic memory-pressure reaping for idle background shell commands. When memory pressure is detected, idle background shell commands are automatically terminated to free resources. This can be disabled with the env var `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1`.

## Assessment
The hardening env vars table in the Subprocess Sandboxing collapsible (lines 10605–10633) lists env vars for controlling Claude Code behavior. The `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1` env var is not currently documented. It belongs at the end of this table alongside similar background-process-control vars.

## Plan
1. Read lines 10630–10635 of `fsad-playbook.html` to confirm the last row of the table.
2. Add a new `<tr>` after `CLAUDE_CODE_RETRY_WATCHDOG` (line 10633), before the closing `</tbody>` (line 10634):
   - `<tr><td><code>CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1</code></td><td>Disables automatic memory-pressure reaping of idle background shell commands. By default, Claude Code terminates idle background shell processes when system memory pressure is detected — set this to preserve them in environments where background shell state must be retained regardless of memory conditions (v2.1.193)</td></tr>`

## Acceptance Criteria
- `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP` appears in the hardening env vars table
- grep confirms it is present in the playbook
