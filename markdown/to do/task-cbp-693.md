# CBP-693 — Add `/config` preferences panel to Codex slash commands (rust-v0.163.0)

## Summary
Codex rust-v0.163.0 adds `/config`, a searchable preferences panel in the TUI. It lets users search settings across categories, change supported settings immediately, and see which changes require a restart.

## Assessment
The `/config` command does not appear in the Codex slash commands table (`src/pages/codex.html`). The table contains `/keymap`, `/statusline`, `/daemon`, `/hooks`, `/personality`, `/copy`, etc. The new `/config` row should be inserted near `/keymap` since they are both TUI configuration commands. `/keymap` is at approximately line 1015.

File: `src/pages/codex.html`

## Plan
1. Read `src/pages/codex.html` around lines 1013–1020 to see the exact HTML for the `/keymap` row.
2. Insert a new `<tr>` row for `/config` just before the `/keymap` row (or just after — alphabetical proximity is fine; keep config/keymap/statusline/daemon together).
3. Row text: `/config` — Searchable TUI preferences panel. Search settings across categories, change supported settings immediately, and see which changes require a restart. (rust-v0.163.0)

## Acceptance Criteria
- `/config` row appears in the slash commands table near `/keymap`.
- Description accurately summarizes the panel's capabilities.
- Version tag `(rust-v0.163.0)` appears.
- Build passes without errors.
