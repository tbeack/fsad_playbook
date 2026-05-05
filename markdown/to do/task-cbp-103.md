# CBP-103 — Add MCP `workspace` reserved server name warning to Plugins/MCP section

## Summary
In Claude Code v2.1.128, `workspace` is now a **reserved MCP server name**. Any existing `mcpServers` config with a server named `workspace` will be skipped with a warning at startup. Teams need to rename such servers.

## Assessment
The Plugins / MCP section in Power Usage does not currently mention reserved server names. The `alwaysLoad` paragraph and MCP config examples are the closest related content (~lines 6780–6800).

This is actionable content: teams with `"workspace": { ... }` in their `mcpServers` config will be silently broken and need to know.

## Plan
1. Read lines 6775–6800 of `fsad-playbook.html` (the Plugins collapsible bullet list area)
2. Add a new list item to the `<ul>` in the Plugins collapsible warning that `workspace` is a reserved MCP server name — servers with that name are skipped with a warning; rename to avoid breakage

Pattern: add as a `<li>` with a `<strong>` note, e.g.:
```html
<li><strong>Reserved server name:</strong> <code>workspace</code> is reserved — an <code>mcpServers</code> entry named <code>workspace</code> will be skipped with a warning; rename it to avoid silent breakage</li>
```

## Acceptance Criteria
- The Plugins collapsible mentions `workspace` as a reserved MCP server name
- Warning is clear enough that teams will know to check their config
- HTML remains valid
