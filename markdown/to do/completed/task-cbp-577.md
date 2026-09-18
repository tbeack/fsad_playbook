# CBP-577: Update the agents dashboard note — task hide, archive, and delete (rust-v0.155.0)

## Source
Codex CLI rust-v0.155.0 release notes: "Added task hiding, archiving, and deletion in the agents overview, plus worktree ownership details and confirmed deletion of clean managed worktrees." (#43942, #44424, #44433)

## Summary
The `codex agents` interactive dashboard (documented as of rust-v0.149.0) gains hide, archive, and delete actions for individual tasks, beyond the existing search/start/open/rename/stop set.

## Assessment
`src/pages/codex.html` `#codex-power-usage` → "Multi-Agent Workflows" collapsible has an "Interactive dashboard (rust-v0.149.0)" paragraph (~line 1151) describing `codex agents` and its existing actions (search, start, open, rename, stop). This is a direct extension of that same dashboard — **update-existing**.

## Plan
1. Open `src/pages/codex.html`.
2. In the "Multi-Agent Workflows" collapsible, extend the "Interactive dashboard (rust-v0.149.0)" paragraph (~line 1151) with a sentence: as of rust-v0.155.0, tasks in the dashboard can also be hidden, archived, and deleted.
3. Mark CBP-577 complete in `markdown/to do/todo.md`.

## Acceptance Criteria
- The "Interactive dashboard" paragraph in the Multi-Agent Workflows collapsible mentions hide, archive, and delete actions, tagged `rust-v0.155.0`.
- `python3 scripts/build-source.py` completes without error after the edit.
