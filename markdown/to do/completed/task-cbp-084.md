# CBP-084: Add `alwaysLoad` MCP server config option to Power Usage Plugins

## Summary
In v2.1.121, MCP server configuration gained an `alwaysLoad` boolean field. When set to `true`, all tools from that server bypass the tool-search deferral system and remain permanently available in the session — no `ToolSearch` call required before using them.

## Assessment
The Power Usage Plugins collapsible covers MCP server setup but did not mention `alwaysLoad`. Teams using servers they rely on every session (e.g., a project-specific context server) can benefit from this option to avoid deferral overhead. Needs a new paragraph + JSON example code block added to the existing Plugins collapsible.

## Plan
1. Read the Power Usage Plugins collapsible in fsad-playbook.html
2. Add a descriptive paragraph after existing MCP server content explaining `alwaysLoad: true`
3. Add a JSON code block showing the config structure with `alwaysLoad` set

## Acceptance Criteria
- Plugins collapsible includes `alwaysLoad` paragraph with usage guidance
- JSON example shows `"alwaysLoad": true` in a valid MCP server config block
- No other sections changed
