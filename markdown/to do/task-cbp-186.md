# CBP-186 — Update `Ctrl+T` keyboard shortcut to document pinning behavior in `claude agents` view

## Summary

Claude Code v2.1.147 added context-sensitive `Ctrl+T` behavior: in the `claude agents` view, pressing `Ctrl+T` pins or unpins a background session, keeping it alive when idle and restarting it in place on updates. The current playbook entry only documents `Ctrl+T` as "Toggle task list" without any mention of the agents view behavior.

## Assessment

**Current state in playbook (line 6356):**
```html
<tr><td><kbd>Ctrl+T</kbd></td><td>Toggle task list</td></tr>
```

The description is accurate for the main session context but omits the pinning behavior in the agents view. This is a meaningful workflow feature — pinned sessions stay alive, non-pinned sessions are shed under memory pressure.

**Action:** Update existing — extend the `Ctrl+T` description to cover both contexts.

## Plan

1. Read `fsad-playbook.html` around line 6356
2. Edit the `Ctrl+T` keyboard shortcut row to add the agents-view pinning behavior

**New text for the description td:**
```
Toggle task list. In <code>claude agents</code> view: pin/unpin the selected background session — pinned sessions stay alive when idle and are restarted in place on Claude Code updates.
```

## Acceptance Criteria

- [ ] The `Ctrl+T` row mentions pin/unpin behavior in the `claude agents` view
- [ ] The original "Toggle task list" description is preserved
- [ ] No other content is changed
