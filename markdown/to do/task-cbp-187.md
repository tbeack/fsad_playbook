# CBP-187 — Update `/usage` Cheat Sheet row: add per-category breakdown

## Summary

Claude Code v2.1.149 added a per-category breakdown to the `/usage` command showing what's driving limits usage — broken down by skills, subagents, plugins, and per-MCP-server cost. The current cheat sheet row describes three tabs but does not mention the per-category breakdown.

## Assessment

**Current state in playbook (line ~6410):**
```html
<tr><td><code>/usage</code></td><td>Unified usage dashboard with three tabs: session cost &amp; token usage, plan usage &amp; rate limits, and daily usage streaks. <code>/cost</code> and <code>/stats</code> remain as typing shortcuts that open the relevant tab.</td></tr>
```

**Problem:** Missing the per-category breakdown feature that shows skills, subagents, plugins, and per-MCP-server cost — useful for teams debugging runaway token spend.

**Action:** Update existing — extend the description with the per-category breakdown.

## Plan

1. Read `fsad-playbook.html` around line 6410 to locate the `/usage` row
2. Edit the description td to add: "Includes a per-category breakdown showing what's driving limits usage — skills, subagents, plugins, and per-MCP-server cost (v2.1.149)."

**New text for the description td:**
```
Unified usage dashboard with three tabs: session cost &amp; token usage, plan usage &amp; rate limits, and daily usage streaks. Includes a per-category breakdown showing what's driving limits usage — skills, subagents, plugins, and per-MCP-server cost. <code>/cost</code> and <code>/stats</code> remain as typing shortcuts that open the relevant tab.
```

## Acceptance Criteria

- [ ] The `/usage` cheat sheet row mentions per-category breakdown with examples (skills, subagents, plugins, MCP servers)
- [ ] The three-tab description is preserved
- [ ] No other content is changed
