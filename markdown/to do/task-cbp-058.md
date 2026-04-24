# CBP-058 — Add mcp_tool hook type to Four Hook Types table

## Summary
Claude Code v2.1.118 added a fifth hook type: `mcp_tool`. Hooks can now invoke MCP tools directly via `type: "mcp_tool"`. This is a significant new capability for teams using MCP integrations.

## Assessment
The "Four Hook Types" collapsible (around lines 5782–5828 of fsad-playbook.html) currently lists 4 types: `command`, `http`, `prompt`, `agent`. The `mcp_tool` type needs to be added as a fifth row, and the heading/section intro should be updated.

## Plan
1. Add `mcp_tool` row to the hook types table after `agent`
2. Update the section intro text from "4 hook types" to "5 hook types" (and any references in the lifecycle section or elsewhere)
3. Add a code example for `mcp_tool` hook after the agent hook example

## Acceptance Criteria
- Five hook types in the table including `mcp_tool`
- Description explains it invokes MCP tools directly
- Code example shows the `mcp_tool` type syntax
