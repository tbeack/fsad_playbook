# CBP-294 — Add Ctrl+X keyboard shortcut for agents view permanent session removal (v2.1.206)

## Summary
Claude Code v2.1.206 changed the `claude agents` view: `Ctrl+X` now permanently removes a completed session (deleted background jobs stay deleted). This is a new keyboard shortcut for the agents view.

## Assessment
The keyboard shortcuts table in the Cheat Sheet is at lines 9836–9861. Currently, `Ctrl+T` is documented as toggling the task list and in agents view pinning/unpinning a session (line 9844). There is no `Ctrl+X` entry. **New entry** — add after `Ctrl+T` or near the end of session-management shortcuts.

Current last few rows:
```
<tr><td><kbd>Ctrl+T</kbd></td><td>Toggle task list. In <code>claude agents</code> view: pin/unpin the selected background session — pinned sessions stay alive when idle and are restarted in place on Claude Code updates.</td></tr>
<tr><td><kbd>Ctrl+O</kbd></td><td>Toggle normal / verbose transcript</td></tr>
<tr><td><kbd>Ctrl+B</kbd></td><td>Background running tasks</td></tr>
<tr><td><kbd>Ctrl+D</kbd></td><td>Exit Claude Code</td></tr>
<tr><td><kbd>Ctrl+G</kbd></td><td>Open prompt in external text editor</td></tr>
```

The best placement is after the `Ctrl+T` row since `Ctrl+X` is also an agents-view action.

## Plan
1. Read the keyboard shortcuts table area around line 9844
2. Insert a new `<tr>` row for `Ctrl+X` immediately after the `Ctrl+T` row (line 9844)

**Row to insert:**
```html
          <tr><td><kbd>Ctrl+X</kbd></td><td>In <code>claude agents</code> view: permanently remove a completed session from the list (v2.1.206)</td></tr>
```

## Acceptance Criteria
- [ ] `Ctrl+X` row appears in the keyboard shortcuts table immediately after the `Ctrl+T` row
- [ ] Description specifies it is scoped to the `claude agents` view and permanently removes completed sessions
- [ ] v2.1.206 version attribution is present
