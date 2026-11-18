# CBP-784: [Codex] Add identically-named MCP servers note (rust-v0.170.0, experimental)

## Summary
Codex CLI rust-v0.170.0 added experimental support for identically named MCP servers across environments, keeping same-named entries from different environments (e.g. project vs. managed config) separate instead of one silently overriding the other.

## Assessment
`src/pages/codex.html`'s MCP section (~line 341-367) already chains a running list of standalone `<p>` notes documenting incremental MCP behavior changes (tool search defaults, protocol support, OAuth recovery, grace periods, extensions, per-tool limits, pre-registered OAuth secrets). This is a direct continuation.

## Plan
1. Open `src/pages/codex.html`.
2. After the "Pre-registered OAuth client secrets (rust-v0.158.0)" paragraph (~line 367), add a new paragraph:
   ```html
   <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;"><strong>Identically named MCP servers across environments (rust-v0.170.0, experimental):</strong> Codex now keeps same-named MCP server entries separate when they come from different environments (e.g. a project config and a managed config), instead of one silently overriding the other.</p>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The MCP section documents the rust-v0.170.0 identically-named-servers behavior, flagged as experimental.
- HTML is valid (no unclosed tags).
