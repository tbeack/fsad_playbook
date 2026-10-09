# CBP-672 — Update Codex Command Center and `/copy` Row (rust-v0.162.0)

## Summary

Codex rust-v0.162.0 added two notable UX features:
1. Pin tasks in the agent Command Center with `p` — pinned tasks are kept in a shared Pinned group.
2. The `/copy` picker now includes quoted text (removes `>` markers on copy); `Ctrl+Insert` copies the current selection.

## Assessment

### Command Center (codex agents)
- Cheat sheet row for `codex agents` at line 1056 only says "rust-v0.149.0"
- Prose paragraph at line 1158 mentions tasks can be hidden, archived, deleted (rust-v0.155.0) but not the pin feature

### /copy row
- Line 1020 mentions the picker through rust-v0.154.0 but not the quoted text or `Ctrl+Insert` changes from rust-v0.162.0

## Plan

1. Read `src/pages/codex.html` lines 1054-1060 for `codex agents` cheat sheet row.
2. Append to `codex agents` row (line 1056): "As of rust-v0.162.0, press `p` to pin a task — pinned tasks are kept in a shared Pinned group when the server supports it."
3. Read `src/pages/codex.html` lines 1156-1162 for Command Center prose.
4. Append to Command Center paragraph (line 1158): "As of rust-v0.162.0, press <kbd>p</kbd> to pin a task in the dashboard — pinned tasks are grouped in a shared Pinned section."
5. Read `src/pages/codex.html` lines 1018-1024 for `/copy` cheat sheet row.
6. Append to `/copy` row (line 1020): "As of rust-v0.162.0, the picker also includes quoted text (copied without `>` markers), and `Ctrl+Insert` copies the current transcript selection."

## Edit locations

- `src/pages/codex.html` line 1056 — `codex agents` cheat sheet row
- `src/pages/codex.html` line 1158 — Command Center prose paragraph
- `src/pages/codex.html` line 1020 — `/copy` cheat sheet row

## Acceptance Criteria

- `codex agents` cheat sheet row mentions pinning tasks with `p` (rust-v0.162.0)
- Command Center prose paragraph mentions `p` to pin tasks
- `/copy` row mentions quoted text (no `>` markers) and `Ctrl+Insert` (rust-v0.162.0)
