# CBP-626 — Add `--oauth-client-secret` flag to `codex mcp add` documentation

## Summary
rust-v0.158.0 added `codex mcp add --oauth-client-secret <value>` to support MCP servers that require a pre-registered OAuth client secret. Codex stores the secret alongside the server entry. This covers servers that issue a client ID and secret at registration instead of using a standard public OAuth flow.

## Assessment
The MCP section (`src/pages/codex.html`, around line 365) has a series of `<p>` callout notes for MCP improvements (tool search, interactive auth, 2026-07-28 protocol, OAuth reauthentication, configurable grace period, extensions, per-tool output token limits). The `--oauth-client-secret` flag is a new `codex mcp add` option that belongs right after the per-tool output token limits note (line 365), before the "Add an MCP Server" step card (line 367–369).

## Plan
1. Read `src/pages/codex.html` around line 365.
2. Add a new `<p>` tag after the per-tool output token limits paragraph and before `<div class="step-card">`.

New paragraph to insert:
```html
    <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;"><strong>Pre-registered OAuth client secrets (rust-v0.158.0):</strong> Use <code>codex mcp add --oauth-client-secret &lt;value&gt;</code> to register MCP servers that require a pre-registered OAuth client secret. Codex stores the secret alongside the server entry. This supports servers that issue a client ID and secret at registration rather than using a standard public OAuth flow.</p>
```

3. Mark CBP-626 complete in `todo.md`.

## Acceptance Criteria
- The new `<p>` appears immediately after the per-tool output token limits paragraph and before the "Add an MCP Server" step card.
- The paragraph uses the same `font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;` styling as the other MCP callout notes.
- No other content is changed.
