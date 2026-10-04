# CBP-599: Update Send-now keyboard shortcut row — moves running tools to background instead of cancelling (v2.1.281)

## Summary

v2.1.281 changed send-now (Ctrl+Enter / Ctrl+X Ctrl+S) to move running tools to the background instead of cancelling the turn. Previously (as documented at v2.1.275) send-now interrupted the current turn outright.

## Assessment

The Keyboard Shortcuts table in `src/pages/practices.html` (~line 1836) documents the v2.1.275 send-now behavior as "interrupts the current turn and sends all queued messages at once." This is now inaccurate for the interrupt semantics and needs updating.

## Plan

Replace the existing send-now row in `src/pages/practices.html` (~line 1836):

Old:
```html
<tr><td><kbd>Ctrl+Enter</kbd> / <kbd>Ctrl+X</kbd> <kbd>Ctrl+S</kbd></td><td>Send-now: interrupts the current turn and sends all queued messages at once, instead of waiting for the turn to finish. Sent and queued messages show in gray until Claude actually receives them (v2.1.275).</td></tr>
```

New:
```html
<tr><td><kbd>Ctrl+Enter</kbd> / <kbd>Ctrl+X</kbd> <kbd>Ctrl+S</kbd></td><td>Send-now: sends all queued messages at once instead of waiting for the turn to finish. Sent and queued messages show in gray until Claude actually receives them (v2.1.275). As of v2.1.281, it moves the turn's running tools to the background rather than cancelling them.</td></tr>
```

## Acceptance Criteria

- The send-now row no longer claims it "interrupts the current turn" as its primary behavior.
- It documents the v2.1.281 background-instead-of-cancel change.
