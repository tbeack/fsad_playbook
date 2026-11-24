# CBP-811: [Codex] Lazy startup for optional stdio MCP servers (rust-v0.172.0)

## Summary
Codex rust-v0.172.0 changed optional stdio MCP servers with cached tool lists to start on their first tool call by default, rather than at session start.

## Assessment
`src/pages/codex.html`'s MCP section (~line 353-369) already documents several startup-related behaviors: tool search by default (rust-v0.142.2), configurable grace period via `startup_grace_sec` (rust-v0.151.0), and non-blocking server startup (rust-v0.147.0). This new lazy-startup default is a related but distinct change.

## Plan
1. Open `src/pages/codex.html`.
2. Add a new paragraph to the MCP section, after the "Identically named MCP servers across environments (rust-v0.170.0, experimental)" paragraph:
   ```html
   <p ...><strong>Lazy startup for optional stdio servers (rust-v0.172.0):</strong> an optional stdio MCP server with a cached tool list now starts on its first tool call by default, rather than at session start — pairs with startup_grace_sec above for servers that are slow to start but rarely used.</p>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The MCP section documents the rust-v0.172.0 lazy-startup default for optional stdio servers.
- HTML is valid (no unclosed tags).

## Status
Implemented.
