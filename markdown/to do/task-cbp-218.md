# CBP-218 — Update /mcp Cheat Sheet row: collapses unused claude.ai connectors

## Summary
In Claude Code v2.1.161, `/mcp` now collapses claude.ai connectors you have never signed in to behind a "Show unused connectors" row. This reduces visual noise in teams where many built-in connectors are configured but most are unused.

## Assessment
**Existing content:** Line 9401 in `fsad-playbook.html`:
```
<tr><td><code>/mcp</code></td><td>Manage MCP server connections; shows tool count per server and flags servers with 0 tools (usually a misconfiguration)</td></tr>
```
This row does not mention the connector visibility management behavior introduced in v2.1.161.

**Action needed:** UPDATE EXISTING — append a note about the "Show unused connectors" collapse behavior.

## Plan
1. Locate the `/mcp` row in the Cheat Sheet (already confirmed at line 9401).
2. Edit the description to append the new connector-collapse behavior.

**Old text:**
```
<tr><td><code>/mcp</code></td><td>Manage MCP server connections; shows tool count per server and flags servers with 0 tools (usually a misconfiguration)</td></tr>
```

**New text:**
```
<tr><td><code>/mcp</code></td><td>Manage MCP server connections; shows tool count per server and flags servers with 0 tools (usually a misconfiguration). As of v2.1.161, claude.ai connectors you have never signed in to are collapsed behind a "Show unused connectors" row to reduce visual noise</td></tr>
```

## Acceptance Criteria
- The `/mcp` row in the Cheat Sheet configuration table includes the unused-connectors collapse note.
- Table structure and surrounding rows are unchanged.
