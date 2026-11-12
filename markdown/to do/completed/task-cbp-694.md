# CBP-694 — Update `/keymap` row for leader key support (rust-v0.163.0)

## Summary
Codex rust-v0.163.0 adds a configurable leader key to the TUI via `/keymap`. The default leader key is `Ctrl+X`. Shortcut hints stay open until you choose or cancel (similar to Emacs prefix keys). Voice mute moves from its old binding to `F9`.

## Assessment
The `/keymap` row (line 1015) currently reads:
"Remap TUI keyboard shortcuts interactively. As of rust-v0.150.0 you can bind shortcuts to cycle through permission modes. Use `/keymap debug` to inspect raw terminal key events — helpful when Vim mode or chord bindings don't register."

It needs a sentence about the configurable leader key with `Ctrl+X` as the default.

File: `src/pages/codex.html`

## Plan
1. Read `src/pages/codex.html` around line 1015 to confirm exact cell text.
2. Append to the `/keymap` cell: "As of rust-v0.163.0, configure a leader key from within `/keymap` — the default is `Ctrl+X`. Shortcut hints stay open until you choose or cancel, and voice mute moves to `F9`."

## Acceptance Criteria
- `/keymap` row mentions the configurable leader key and `Ctrl+X` default.
- Voice mute move to `F9` is noted.
- Version tag `(rust-v0.163.0)` appears.
- Build passes without errors.
