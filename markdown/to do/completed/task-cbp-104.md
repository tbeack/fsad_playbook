# CBP-104 — Update `/mcp` Cheat Sheet row: shows tool count, flags 0-tool servers

## Summary
In Claude Code v2.1.128, the `/mcp` command now shows the **tool count** for each connected server and flags servers that connected with **0 tools** (which usually indicates a misconfiguration or empty server).

## Assessment
The Cheat Sheet Configuration table has a `/mcp` row at line ~6229:
```
<tr><td><code>/mcp</code></td><td>Manage MCP server connections</td></tr>
```
The description is minimal. It should now mention the tool count display and 0-tool server flagging.

## Plan
1. Read line 6229 of `fsad-playbook.html`
2. Update the `/mcp` row description to: "Manage MCP server connections; shows tool count per server and flags servers with 0 tools (usually a misconfiguration)"

## Acceptance Criteria
- `/mcp` row in Cheat Sheet mentions tool count display and 0-tool server flagging
- HTML remains valid
