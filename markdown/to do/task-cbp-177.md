# CBP-177 — Update `/plugin` row: pre-install component preview (v2.1.145)

## Summary
Claude Code v2.1.145 enhanced the `/plugin` Discover and Browse screens to show a plugin's full component inventory — commands, agents, skills, hooks, and MCP/LSP servers — before installation. This is distinct from the token estimates and last-updated date already documented (from CBP-174).

## Assessment
The current `/plugin` row at line 6294 reads:
```
Manage Claude Code plugins — the marketplace browse and discover panes show projected per-turn and per-invocation token cost estimates and when each plugin was last updated. Use `claude plugin details <name>` for the full component inventory: skills, MCP servers, LSP servers.
```

The current row mentions `claude plugin details` for component inventory, but as of v2.1.145, the Discover/Browse screens now also show this inline. The description implies component inventory is CLI-only. Update to reflect that component types (commands, agents, skills, hooks, MCP/LSP servers) are now shown in the UI before installation.

**Action:** Update the `/plugin` row to mention the pre-install component preview.

## Plan

Update line 6294 to fold the new pre-install detail into the existing description.

**New row:**
```html
<tr><td><code>/plugin</code></td><td>Manage Claude Code plugins — the marketplace browse and discover panes show projected per-turn and per-invocation token cost estimates, when each plugin was last updated, and a full component preview (commands, agents, skills, hooks, MCP/LSP servers) before you install. Use <code>claude plugin details &lt;name&gt;</code> to view the same inventory from the CLI.</td></tr>
```

Also update the Plugins collapsible deep-dive bullet at line 6875 to mention the component preview.

## Acceptance Criteria
- `/plugin` row mentions the pre-install component preview in Discover/Browse screens
- Lists component types: commands, agents, skills, hooks, MCP/LSP servers
- Existing token estimates and last-updated content is preserved
- `claude plugin details` is still mentioned for CLI access
