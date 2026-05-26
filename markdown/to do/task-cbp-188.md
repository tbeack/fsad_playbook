# CBP-188 — Update `/diff` Cheat Sheet row: add keyboard navigation in detail view

## Summary

Claude Code v2.1.149 added keyboard navigation to the `/diff` detail view. Users can now scroll through diff output using arrow keys, `j`/`k` (Vim-style), `PgUp`/`PgDn`, `Space`, `Home`/`End`. The current cheat sheet row only says "Open interactive diff viewer" with no mention of navigation keys.

## Assessment

**Current state in playbook (line ~6394):**
```html
<tr><td><code>/diff</code></td><td>Open interactive diff viewer</td></tr>
```

**Problem:** Missing the keyboard navigation capability in the detail view — useful to document so teams know they can scroll large diffs without leaving the TUI.

**Action:** Update existing — extend the description with keyboard navigation note.

## Plan

1. Read `fsad-playbook.html` around line 6394 to locate the `/diff` row
2. Edit the description td to add keyboard navigation info

**New text for the description td:**
```
Open interactive diff viewer. In the detail view, scroll with arrow keys, <kbd>j</kbd>/<kbd>k</kbd>, <kbd>PgUp</kbd>/<kbd>PgDn</kbd>, <kbd>Space</kbd>, <kbd>Home</kbd>/<kbd>End</kbd> (v2.1.149).
```

Note: since this is inside a `<td>`, use inline `<kbd>` tags for the key references.

## Acceptance Criteria

- [ ] The `/diff` cheat sheet row mentions keyboard navigation in the detail view
- [ ] Key names are listed (arrows, j/k, PgUp/PgDn, Space, Home/End)
- [ ] No other content is changed
