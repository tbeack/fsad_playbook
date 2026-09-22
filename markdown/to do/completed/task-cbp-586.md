# CBP-586: Update Ctrl+L / Cmd+K keyboard shortcut row (v2.1.280 revert)

## Summary

v2.1.280 reverted the behavior added in v2.1.260. In v2.1.260, pressing Ctrl+L or Cmd+K in fullscreen mode cleared the transcript view. In v2.1.280 this was reverted — both keys now redraw the screen again (original readline behavior).

## Assessment

The playbook has a keyboard shortcut row at line 1838 of `src/pages/practices.html`:

```
<tr><td><kbd>Ctrl+L</kbd> / <kbd>Cmd+K</kbd></td><td><kbd>Ctrl+L</kbd> forces a screen redraw (does not clear input — readline behavior as of v2.1.126). In fullscreen mode, as of v2.1.260, both <kbd>Ctrl+L</kbd> and <kbd>Cmd+K</kbd> clear the transcript view like a terminal <code>clear</code> — scroll up to see earlier messages.</td></tr>
```

This is outdated. The "as of v2.1.260, both clear the transcript view" part must be removed.

## Plan

Edit `src/pages/practices.html` line 1838. Replace the entire `<td>` content with:

```
<kbd>Ctrl+L</kbd> forces a screen redraw (does not clear input — readline behavior as of v2.1.126). In fullscreen mode, <kbd>Ctrl+L</kbd> and <kbd>Cmd+K</kbd> also redraw the screen — the v2.1.260 behavior of clearing the transcript view was reverted in v2.1.280.
```

## Acceptance Criteria

- The keyboard shortcut table no longer says Ctrl+L / Cmd+K clear the transcript.
- The row accurately states both keys redraw the screen and that v2.1.260 behavior was reverted.
