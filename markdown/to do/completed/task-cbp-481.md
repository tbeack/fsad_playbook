# CBP-481 — [Codex] Permission-mode-cycling keybindings and Vim dot-repeat

## Source
Codex CLI rust-v0.150.0 (2026-08-26), PRs #39873 (keybindings for cycling TUI permission modes), #40521 (dot-repeat in Vim mode).

## Summary
You can now bind shortcuts (via `/keymap`) to cycle through TUI permission modes, and Vim mode gains `.` (dot-repeat) to repeat the last edit. Update the `/keymap` slash-command row and the Vim Editing Mode collapsible.

## Assessment
- `src/pages/codex.html` line ~999 (`#codex-cheat-sheet`): `/keymap` row describes remapping TUI shortcuts — extend with the bindable permission-mode-cycling action.
- Vim Editing Mode collapsible (`#codex-power-usage`, line ~1170) lists motions through rust-v0.149.0 (`cw`, `c$`, `cc`, `r<char>`) — no dot-repeat.

## Plan
1. Extend the `/keymap` row: as of rust-v0.150.0 you can bind shortcuts to cycle permission modes.
2. Extend the Vim motions sentence at line ~1170: add `.` (dot-repeat) to repeat the last edit (rust-v0.150.0).

## Acceptance Criteria
- [ ] `/keymap` row mentions bindable permission-mode cycling with version tag.
- [ ] Vim collapsible lists dot-repeat with version tag.
- [ ] `build-source.py` assembles cleanly.
