# CBP-123 — [Codex] Add `/keymap debug` to Cheat Sheet and update Plugins collapsible with workspace sharing (v0.129.0)

## Summary
Codex v0.129.0 added:
1. `/keymap debug` — inspect terminal key events to troubleshoot keybinding issues.
2. Plugin management now supports workspace sharing, share access controls, source filtering, local share path tracking, marketplace removal/upgrades, remote bundle sync, and admin-disabled status handling.

## Assessment
- Codex Cheat Sheet: `/keymap` row says "Remap TUI keyboard shortcuts interactively" — needs mention of `debug` subcommand.
- Codex Power Usage Plugins collapsible (line ~9224): mentions basic install/remove/scoping but not workspace sharing or the expanded plugin management features.

## Plan

### Step 1 — Update `/keymap` row in Codex Cheat Sheet
Find:
```html
<tr><td><code>/keymap</code></td><td>Remap TUI keyboard shortcuts interactively</td></tr>
```
Replace with:
```html
<tr><td><code>/keymap</code> <code>[debug]</code></td><td>Remap TUI keyboard shortcuts interactively. Use <code>/keymap debug</code> to inspect raw terminal key events — helpful when Vim mode or chord bindings don't register correctly.</td></tr>
```

### Step 2 — Update Codex Power Usage Plugins collapsible
Find the Plugins collapsible code block (around line 9233). Add after the remove command, a note about workspace sharing:
```html
<span class="cm"># Share a plugin with your workspace (workspace-scoped sharing)</span>
codex plugin share &lt;plugin-name&gt;

<span class="cm"># Sync remote plugin bundles</span>
codex plugin sync</code></pre>
```
And add to the scoping bullet list:
```html
<li><strong>Workspace-shared</strong> — install once, available to teammates via workspace share link; admin-disabled plugins are flagged in <code>/plugins</code></li>
```

## Acceptance Criteria
- `/keymap` row in Codex Cheat Sheet mentions `debug` subcommand.
- Codex Plugins collapsible mentions workspace sharing and sync.
- No HTML broken.
