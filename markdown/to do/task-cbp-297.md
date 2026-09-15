# CBP-297 — Update `/diff` Cheat Sheet row with fullscreen panel behavior (v2.1.260)

## Summary

Claude Code v2.1.260 enhanced `/diff` with a new fullscreen panel: when you run `/diff` in fullscreen (TUI) mode, a diff panel opens *beside* the conversation and shows uncommitted changes as Claude edits. The previous description only described the v2.1.149 interactive viewer.

## Assessment

Current row at line 9882 (Claude Best Practices page, Cheat Sheet, Session & context table):

```
<tr><td><code>/diff</code></td><td>Open interactive diff viewer. In the detail view, scroll with arrow keys, <kbd>j</kbd>/<kbd>k</kbd>, <kbd>PgUp</kbd>/<kbd>PgDn</kbd>, <kbd>Space</kbd>, <kbd>Home</kbd>/<kbd>End</kbd> (v2.1.149).</td></tr>
```

The description is incomplete — it does not mention that v2.1.260 added a live panel beside the conversation in fullscreen mode.

## Plan

1. Edit line 9882 in `fsad-playbook.html`.
2. Append fullscreen panel behavior: "In fullscreen mode, `/diff` opens a panel beside the conversation showing uncommitted changes as Claude edits (v2.1.260)."

## New row content

```html
<tr><td><code>/diff</code></td><td>Open interactive diff viewer. In the detail view, scroll with arrow keys, <kbd>j</kbd>/<kbd>k</kbd>, <kbd>PgUp</kbd>/<kbd>PgDn</kbd>, <kbd>Space</kbd>, <kbd>Home</kbd>/<kbd>End</kbd> (v2.1.149). In fullscreen mode, opens a live panel beside the conversation showing uncommitted changes as Claude edits (v2.1.260).</td></tr>
```

## Acceptance Criteria

- The `/diff` row at line 9882 mentions both the interactive viewer (v2.1.149) and the fullscreen panel (v2.1.260).
- No other rows are changed.
