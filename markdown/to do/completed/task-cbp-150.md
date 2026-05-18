# CBP-150 — Update /plugin Cheat Sheet row and Plugins collapsible to mention LSP server display

## Summary

Claude Code v2.1.142: the `/plugin` details pane and `claude plugin details <name>` CLI command now show the **LSP servers** a plugin provides, alongside skills and MCP servers.

## Assessment

- **Line 6278**: `/plugin` Cheat Sheet row reads: `<tr><td><code>/plugin</code></td><td>Manage Claude Code plugins</td></tr>` — very terse. A note about `claude plugin details` showing LSP servers fits here.
- The Plugins collapsible (line 6812) mentions `claude plugin details` was added in CBP-085 to show "component inventory and projected per-session token cost". That collapsible could also note LSP servers are now shown in the details pane.

Actually, checking CBP-085 description in todo.md: "Update `/plugin` Cheat Sheet row to mention `claude plugin prune` for removing orphaned auto-installed plugin dependencies." CBP-085 was about `prune`, not `details`.

Looking at the current `/plugin` row at line 6278: it just says "Manage Claude Code plugins." There's no mention of `claude plugin details`.

## Plan

### Step 1: Update `/plugin` Cheat Sheet row (line 6278)

Extend to mention `claude plugin details` and that it shows skills, MCP servers, and LSP servers:

```html
<tr><td><code>/plugin</code></td><td>Manage Claude Code plugins. Use <code>claude plugin details &lt;name&gt;</code> to view a plugin's component inventory (skills, MCP servers, LSP servers, projected token cost).</td></tr>
```

### Step 2: Add a note to the Plugins collapsible bullet list

Add a bullet after the "Root-level skill shortcut" bullet (from CBP-149) or near the end of the general bullets:

```html
<li><strong><code>claude plugin details &lt;name&gt;</code></strong> shows the plugin's component inventory: skills, MCP servers, LSP servers, and projected per-session token cost.</li>
```

## Acceptance Criteria

- `/plugin` Cheat Sheet row mentions `claude plugin details` with the LSP servers note
- The Plugins collapsible bullet list includes the `claude plugin details` capability
- No existing content is broken
