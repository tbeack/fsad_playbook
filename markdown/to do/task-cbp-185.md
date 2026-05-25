# CBP-185 — Update `/usage` Cheat Sheet row: per-category breakdown

## Summary
Claude Code v2.1.149 added a per-category breakdown to `/usage` that shows what's driving your limits usage — skills, subagents, plugins, and per-MCP-server cost.

## Assessment
The `/usage` row at line 6410 of `fsad-playbook.html` currently reads:

```
Unified usage dashboard with three tabs: session cost & token usage, plan usage & rate limits, and daily usage streaks. `/cost` and `/stats` remain as typing shortcuts that open the relevant tab.
```

This is accurate but missing the new per-category cost breakdown feature. The description needs to note that the plan usage tab now shows a breakdown by category.

## Plan
1. Read line 6410 of `fsad-playbook.html`
2. Edit the `/usage` row td to append a mention of the per-category breakdown:
   - Change: `...and daily usage streaks.`
   - Add: `As of v2.1.149, the plan usage tab includes a per-category breakdown showing spend by skills, subagents, plugins, and individual MCP servers.`

## Acceptance Criteria
- The `/usage` Cheat Sheet row mentions the per-category breakdown with the specific categories: skills, subagents, plugins, MCP servers.
- Existing content about the three tabs and `/cost`/`/stats` shortcuts is preserved.
