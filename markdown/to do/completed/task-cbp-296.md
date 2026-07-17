# CBP-296 — Update Codex MCP section: MCP tools can request auth interactively without experimental opt-in (rust-v0.144.0)

## Summary
Codex rust-v0.144.0 removed the experimental flag requirement for MCP tools requesting interactive authentication. Previously, MCP tools that needed to authenticate a user mid-session required an experimental opt-in. This is now the default behavior.

## Assessment
The Codex MCP section at line 12102 has a note about tool search defaults. The authentication step is at line 12120–12127 (Step 2: Authenticate via OAuth). There's no current mention of interactive auth requiring an experimental flag — the limitation has been lifted.

The most appropriate place to document this change is as an addendum to the MCP section note at line 12102, or as an enhancement to Step 2 (Authenticate via OAuth). Since this removes a previous restriction and reflects a general availability of the feature, the best approach is to add a brief note near the tool-search-by-default paragraph at line 12102, informing readers that MCP tool authentication is now fully interactive without any experimental flag.

## Plan
1. Read the Codex MCP section around line 12102
2. Append a new sentence to the existing note paragraph at line 12102

**Text to append after the existing `<p>` at line 12102:**
```html
    <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;"><strong>Interactive MCP tool authentication (rust-v0.144.0):</strong> MCP tools can now request user authentication mid-session without any experimental opt-in flag — interactive auth flows (OAuth prompts, credential dialogs) are fully supported out of the box.</p>
```

## Acceptance Criteria
- [ ] A note about interactive MCP tool authentication appears in the Codex MCP section
- [ ] The note clarifies that no experimental flag is needed as of rust-v0.144.0
- [ ] The note is styled consistently with the existing tool-search-by-default note (same `<p>` style)
