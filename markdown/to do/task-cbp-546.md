# CBP-546 — Update Plugins collapsible (v2.1.268)

## Summary

Claude Code v2.1.268: installing, enabling, or disabling a plugin through the `/plugin` menu now takes effect when you close the menu; `/reload-plugins` is no longer needed after those menu actions.

## Assessment

The Plugins collapsible in src/pages/practices.html (around line 2610-2611) has:
```bash
# Reload plugins without restarting Claude
/reload-plugins
```

The bullet list at line 2637 has:
```
<strong>/reload-plugins LSP handling (v2.1.243):</strong> ...
```

Need to add a new bullet noting the v2.1.268 behavior: plugin menu changes take effect on menu close. The code block comment is misleading now — add a note clarifying when `/reload-plugins` is still needed (skill-directory changes outside the menu).

## Plan

1. In the Plugins collapsible bullet list (after line 2637), add a new `<li>` for v2.1.268 plugin-menu auto-apply.
2. Update the code block comment for `/reload-plugins` to note it's primarily for non-menu changes.

### Edit 1 — code block comment (line 2610-2611)
Old:
```
<span class="cm"># Reload plugins without restarting Claude</span>
/reload-plugins
```
New:
```
<span class="cm"># Reload plugins without restarting Claude (for skill-dir changes; not needed after /plugin menu actions as of v2.1.268)</span>
/reload-plugins
```

### Edit 2 — add bullet after line 2637 entry
After the `/reload-plugins` LSP handling bullet, add:
```html
<li><strong>Plugin menu changes apply on close (v2.1.268):</strong> Installing, enabling, or disabling a plugin through the <code>/plugin</code> menu now takes effect automatically when you close the menu — <code>/reload-plugins</code> is no longer required after these menu actions. Use <code>/reload-plugins</code> for refreshing skill-directory changes that happen outside the menu.</li>
```

## Acceptance Criteria

- Plugins collapsible bullet list includes v2.1.268 menu auto-apply note
- Code block comment updated to clarify when `/reload-plugins` is still needed
