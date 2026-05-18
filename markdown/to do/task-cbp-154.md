# CBP-154 — Projected Context Cost in /plugin Marketplace

## Summary
Claude Code v2.1.143 added projected context cost (per-turn and per-invocation token estimates) to the `/plugin` marketplace browse pane. Previously, only `claude plugin details <name>` showed per-session token cost; now the browse pane itself also displays this.

## Assessment
Current state in the playbook:
- `/plugin` Cheat Sheet row (line 6292): "Manage Claude Code plugins. Use `claude plugin details <name>` to view a plugin's component inventory: skills, MCP servers, LSP servers, and projected token cost."
- Plugins collapsible bullet (line 6857): "`claude plugin details <name>` shows the plugin's component inventory: skills, MCP servers, LSP servers, and projected per-session token cost"

The `/plugin` marketplace browse pane now also shows projected cost — this is new. The existing docs only mention cost via `claude plugin details`, not in the browse UI.

This is **update existing** — the `/plugin` row and plugins bullet need to mention the browse pane shows cost estimates too.

## Plan
1. Update the `/plugin` Cheat Sheet row (line 6292) to mention that the marketplace browse pane now shows projected per-turn and per-invocation token estimates:

   Old: `"Manage Claude Code plugins. Use <code>claude plugin details &lt;name&gt;</code> to view a plugin's component inventory: skills, MCP servers, LSP servers, and projected token cost."`

   New: `"Manage Claude Code plugins — the marketplace browse pane shows projected per-turn and per-invocation token cost estimates for each plugin. Use <code>claude plugin details &lt;name&gt;</code> for the full component inventory: skills, MCP servers, LSP servers."`

2. Update the Plugins collapsible bullet (line 6857) to mention that projected cost also appears in the browse pane:

   Old: `"<strong><code>claude plugin details &lt;name&gt;</code></strong> shows the plugin's component inventory: skills, MCP servers, LSP servers, and projected per-session token cost"`
   
   New: `"<strong><code>claude plugin details &lt;name&gt;</code></strong> shows the plugin's component inventory: skills, MCP servers, LSP servers, and projected per-session token cost. The <strong>marketplace browse pane</strong> also shows per-turn and per-invocation token estimates directly — helpful for comparing plugin overhead before installing."`

## Acceptance Criteria
- `/plugin` Cheat Sheet row mentions projected cost in the browse pane
- Plugins collapsible bullet mentions browse pane shows per-turn/per-invocation estimates
- No broken HTML
