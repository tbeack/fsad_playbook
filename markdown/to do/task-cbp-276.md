# CBP-276 — Add `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` to hardening env vars table

## Summary
Claude Code v2.1.187 fixed remote MCP tool calls that hang indefinitely with no response — they now abort after 5 minutes. The new environment variable `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` allows overriding this timeout. This is directly useful for teams running MCP integrations in their FSAD workflows.

## Assessment
The hardening env vars table lives in the Subprocess Sandboxing section of the Claude Best Practices page. The table currently contains entries including `CLAUDE_CLIENT_PRESENCE_FILE` (~line 10721) and `CLAUDE_CODE_RETRY_WATCHDOG` (~line 10722).

`CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` is not present. A new `<tr>` row must be added to this table.

## Plan
1. Read `fsad-playbook.html` around lines 10720–10725 to confirm the table structure and last row.
2. Add a new row after `CLAUDE_CODE_RETRY_WATCHDOG`:
   ```html
   <tr><td><code>CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT</code></td><td>Override the default 5-minute abort timeout for remote MCP tool calls that produce no response. Set to an integer number of milliseconds (e.g. <code>300000</code> for 5 min). Increase for slow or high-latency MCP servers; decrease in CI to fail fast on unresponsive tools (v2.1.187).</td></tr>
   ```
3. Mark this task complete in `todo.md`.

## Acceptance Criteria
- The hardening env vars table contains a `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` row with an accurate description.
- The row is in the correct table (Subprocess Sandboxing / hardening env vars section).
- No surrounding HTML is broken.
- A search for "CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT" in the playbook returns the new row.
