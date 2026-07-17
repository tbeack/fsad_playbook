# CBP-281 — Add MCP tool search by default note to Codex MCP section (rust-v0.142.2)

## Summary

Codex rust-v0.142.2 changed MCP tools to use tool search by default when the model supports it. This improves tool discovery for large MCP server setups while preserving compatibility with older models and providers. Users setting up MCP servers with Codex should know this behavior changed.

## Assessment

The Codex MCP Integrations section (around line 12083) covers how to add MCP servers via `codex mcp add`, but does not mention tool search behavior. The Claude Code page already has coverage of the `alwaysLoad` option (line 10578) for opting out of tool-search deferral.

A note in the Codex MCP section explaining the default tool-search behavior and how to opt out (if needed) would help users who migrate from MCP setups that relied on all tools being always available.

## Plan

Add a styled note paragraph after the intro paragraph in the Codex MCP section (around line 12093, after the "Setting Up MCP Connections" description paragraph).

**Location:** After line 12093 (the `<p>` introducing the codex mcp CLI), before the first `<div class="step-card">`.

**New HTML to insert:**
```html
<p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;"><strong>Tool search by default (rust-v0.142.2):</strong> Codex now uses MCP tool search by default when the selected model supports it — tools are discovered on demand rather than loaded all at once at session start. This speeds up startup with large MCP server inventories. If you need a server's tools always available without deferral, add <code>"alwaysLoad": true</code> to that server's entry in <code>~/.codex/config.toml</code>.</p>
```

**File:** `fsad-playbook.html`, around line 12093

## Acceptance Criteria

- [ ] Note appears in the Codex Integrations (MCP) section
- [ ] Note explains tool search is now on by default
- [ ] Note explains how to opt a server out with alwaysLoad
- [ ] Version attribution (rust-v0.142.2) is included
- [ ] Styling matches adjacent secondary paragraphs
- [ ] No HTML structure broken
