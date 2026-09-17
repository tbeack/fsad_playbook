# CBP-568 — Add `CLAUDE_CODE_MCP_STARTUP_WAIT_MS` to Subprocess Sandboxing hardening env vars (v2.1.274)

**Source:** Claude Code v2.1.274
**Tag:** [Claude]

## Summary
v2.1.274 adds `CLAUDE_CODE_MCP_STARTUP_WAIT_MS`, which bounds how long the first non-interactive turn (`-p` / headless) waits for connecting MCP servers before proceeding. Setting it to `0` means don't wait at all.

## Assessment
The "Hardening env vars (shared environments & CI/CD)" table inside the Subprocess Sandboxing collapsible in `src/pages/practices.html` already lists several MCP-related timeout vars (`CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT`, `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS`). This new var belongs in the same table, near those two, since it's the same category (headless/CI startup latency control).

## Plan
1. Open `src/pages/practices.html`
2. Find the `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` row (line 2823, inside the Hardening env vars `<tbody>`)
3. Insert a new `<tr>` row directly after it:
   ```html
   <tr><td><code>CLAUDE_CODE_MCP_STARTUP_WAIT_MS</code></td><td>Bounds how long the first non-interactive (<code>-p</code> / headless) turn waits for still-connecting MCP servers before proceeding. Set to <code>0</code> to not wait at all — useful in CI/scripts where a slow-starting MCP server shouldn't delay the first turn (v2.1.274).</td></tr>
   ```
4. Mark CBP-568 complete in `markdown/to do/todo.md`

## Acceptance Criteria
- The new row appears in the Hardening env vars table after `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT`
- Build passes without errors
