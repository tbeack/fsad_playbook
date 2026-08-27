# CBP-479 — [Codex] Document `@` task mentions and terminal task tools

## Source
Codex CLI rust-v0.150.0 (2026-08-26), PRs #40308, #40315: "Reference other Codex tasks with `@` mentions, and ask agents to read, create, or message tasks from the terminal."

## Summary
Codex 0.150.0 extends the `@` unified context picker to tasks: you can `@`-mention other Codex tasks in the composer, and the agent gains TUI tools to read, create, or message tasks directly from the terminal. Document this in the cheat sheet's `@` picker row and in the Session Management collapsible in Power Usage.

## Assessment
- `src/pages/codex.html` line ~961 (`#codex-cheat-sheet` Keyboard Shortcuts table) documents the `Tab` / `@` unified context picker as covering "files, directories, plugins, and skills" — now stale: tasks are mentionable too.
- The Session Management collapsible (`#codex-power-usage`, line ~1183) narrates cross-session workflows through rust-v0.149.0 (`codex queue`) — extend with the 0.150.0 task-tools sentence.

## Plan
1. Edit the `Tab` / `@` row (line ~961): add tasks to the picker scope and note task mentions (rust-v0.150.0).
2. Append a sentence to the Session Management paragraph (line ~1183, after the rust-v0.149.0 `codex queue` sentence): as of rust-v0.150.0, `@`-mention other tasks in the composer, and agents can read, create, or message tasks from the terminal via TUI task tools.

## Acceptance Criteria
- [ ] `@` picker row mentions tasks and cites rust-v0.150.0.
- [ ] Session Management collapsible has a rust-v0.150.0 sentence covering task mentions and task read/create/message tools.
- [ ] Existing HTML patterns preserved; `build-source.py` assembles cleanly.
