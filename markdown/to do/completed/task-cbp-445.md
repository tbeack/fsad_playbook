# CBP-445 — `managed` marker in `/mcp` and `/plugin`

## Summary
Claude Code v2.1.243 added a `managed` marker in `/mcp` and `/plugin` on claude.ai connectors whose authentication is managed by your organization.

## Assessment
The Cheat Sheet `/mcp` row (line 11046) already has a dense chain of versioned notes (v2.1.161, v2.1.186, v2.1.238) — a good fit for one more. The `/plugin` row (line 11049, note: the command is `/plugin` singular, not `/plugins`) also has an existing versioned note (v2.1.172 search bar).

## Plan
1. In `fsad-playbook.html`, locate the `/mcp` Cheat Sheet row (line 11046) and append to the end of its `<td>` (before `</td></tr>`):
   ```html
    As of v2.1.243, claude.ai connectors whose authentication is managed by your organization show a <code>managed</code> marker.
   ```
2. Locate the `/plugin` Cheat Sheet row (line 11049) and append to the end of its `<td>` (before `</td></tr>`):
   ```html
    As of v2.1.243, claude.ai connectors whose authentication is managed by your organization show a <code>managed</code> marker.
   ```

## Acceptance Criteria
- [ ] Both `/mcp` and `/plugin` rows document the v2.1.243 `managed` marker.
- [ ] Both rows remain well-formed single `<tr>` elements.
