# CBP-361 — [Codex] Document MCP 2026-07-28 protocol support in Integrations

## Source
Codex CLI rust-v0.147.0

## Summary
rust-v0.147.0: "Support the opt-in MCP 2026-07-28 protocol, including paginated discovery, multi-round requests, and non-blocking server startup."

## Assessment
`fsad-playbook.html`, Codex Integrations section, lines 13202–13205. The section already has an established pattern of short version-tagged paragraphs documenting MCP behavior changes directly under the setup-guide subtitle: "Tool search by default (rust-v0.142.2)" at line 13202, and "Interactive MCP tool authentication (rust-v0.144.0)" at line 13204. No mention of MCP protocol versioning exists anywhere in the file.

## Plan

### Step 1 — Add a new paragraph after line 13204, matching the existing pattern
```html
<p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;"><strong>MCP 2026-07-28 protocol support (rust-v0.147.0, opt-in):</strong> adds paginated tool discovery for large server inventories, multi-round requests, and non-blocking server startup — Codex no longer waits on a slow-starting MCP server before the session becomes usable.</p>
```

## Acceptance Criteria
- New paragraph documents MCP 2026-07-28 protocol support (paginated discovery, multi-round requests, non-blocking server startup)
- Paragraph follows the same style/placement pattern as the existing tool-search and interactive-auth paragraphs
- HTML is valid
