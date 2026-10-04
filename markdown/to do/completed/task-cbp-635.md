# CBP-635: Document `bareElicitationCapability` for MCP servers with URL prompts (v2.1.287)

## Summary

Claude Code v2.1.287 added support for URL prompts from MCP servers on the 2025-11-25 protocol. Servers can now prompt users to open a URL (for example, to sign in). If an MCP server stops connecting after this update, users must add `"bareElicitationCapability": true` to that server's MCP config entry to restore the connection.

## Assessment

The Plugins / MCP section in `src/pages/practices.html` already has a note about `alwaysLoad` near line 2697. The Elicitation hook events (lines 2195–2196) are listed but there is no mention of `bareElicitationCapability`. This is new content that belongs near the MCP server config notes.

## Plan

1. Open `src/pages/practices.html`.
2. Find the `alwaysLoad` note: `<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:1rem;"><strong>MCP server <code>alwaysLoad</code> option</strong>`.
3. Insert a new paragraph **before** that `alwaysLoad` paragraph, describing the `bareElicitationCapability` flag.

### New paragraph to insert:

```html
        <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:1rem;"><strong>MCP server <code>bareElicitationCapability</code></strong> — MCP servers on the 2025-11-25 protocol can now send URL prompts (for example, to open a sign-in page). If a server stops connecting after Claude Code v2.1.287, add <code>"bareElicitationCapability": true</code> to its config entry so Claude Code advertises support for this capability.</p>
```

## Acceptance Criteria

- The `bareElicitationCapability` option is documented near the MCP server config notes.
- The paragraph explains when to use the flag (server stops connecting after v2.1.287).
- The `alwaysLoad` paragraph is unchanged and still appears after the new paragraph.
