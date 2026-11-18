# CBP-781: Add `claude mcp add-json <name> -` stdin note (v2.1.327)

## Summary
Claude Code v2.1.327 added `claude mcp add-json <name> -` to read the server's JSON from stdin, so tokens can stay off the command line; not available inside a Claude Code session.

## Assessment
`src/pages/practices.html`'s `/mcp` row (~line 1877) already chains CLI-equivalent notes for MCP server management (`claude mcp login`, `claude mcp logout`, `claude mcp list`/`get`, `/mcp reconnect all`). This is a direct continuation covering a security-conscious way to register a server's JSON config.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/mcp` row (~line 1877), append a new sentence before the closing `</td></tr>`:
   ```
    As of v2.1.327, <code>claude mcp add-json &lt;name&gt; -</code> reads the server's JSON config from stdin instead of a shell argument, so API keys and tokens in the config don't land in shell history or process listings; not available from inside a running Claude Code session.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/mcp` row documents the v2.1.327 `add-json` stdin option.
- HTML is valid (no unclosed tags).
