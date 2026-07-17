# CBP-284 — Add `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1` to hardening env vars table (v2.1.193)

## Summary
Claude Code v2.1.193 added automatic memory-pressure reaping for idle background shell commands. When the system is under memory pressure, idle background shells are automatically terminated. The new env var `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1` opts out of this behaviour — useful in scenarios where long-running idle background shells must not be killed (e.g. persistent server processes).

## Assessment
The hardening env vars table in the Subprocess Sandboxing collapsible is at lines 10710–10725 of `fsad-playbook.html`. The last row is `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` at line 10725. The new env var should be added as a new row after line 10725 (before the closing `</tbody>`).

## Plan
1. Read lines 10724–10728 to confirm the exact closing structure.
2. Insert a new `<tr>` row after the `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` row (after line 10725):
   ```html
   <tr><td><code>CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1</code></td><td>Disables automatic memory-pressure reaping of idle background shell commands. By default, Claude Code kills idle background shells when the system is under memory pressure. Set this to preserve long-running background shells (e.g. persistent dev servers) at the cost of higher memory usage (v2.1.193).</td></tr>
   ```
3. Mark CBP-284 complete in `todo.md`.

## Acceptance Criteria
- A new row for `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1` appears in the hardening env vars table.
- Accurately describes default (auto-reap idle shells under memory pressure) and opt-out behaviour.
- Version tag `(v2.1.193)` is present.
