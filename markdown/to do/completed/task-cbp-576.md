# CBP-576: Update Worktree Sessions coverage — ownership details + confirmed deletion (rust-v0.155.0)

## Source
Codex CLI rust-v0.155.0 release notes: "Added task hiding, archiving, and deletion in the agents overview, plus worktree ownership details and confirmed deletion of clean managed worktrees." (#43942, #44424, #44433)

## Summary
rust-v0.155.0 extends the experimental worktree feature (already documented as of rust-v0.154.0) with ownership details shown for each worktree and a confirmation step before deleting a clean, managed worktree — reducing the risk of accidentally losing an isolated checkout.

## Assessment
`src/pages/codex.html` already documents worktree sessions in two places:
- `#codex-cheat-sheet` — the `/worktree` row in the Slash Commands table (~line 1005)
- `#codex-power-usage` — the "Worktree Sessions" collapsible (~line 1168-1182)

This is an incremental refinement of already-documented behavior, not a new capability — **update-existing** in both spots.

## Plan
1. Open `src/pages/codex.html`.
2. In `#codex-cheat-sheet`, update the `/worktree` row (~line 1005) to append a sentence noting ownership details and confirmed deletion of clean managed worktrees, tagged `(rust-v0.155.0)`.
3. In `#codex-power-usage`, extend the "Worktree Sessions" collapsible body paragraph (~line 1173) with a sentence: as of rust-v0.155.0, the worktree browser shows ownership details for each worktree, and deleting a clean, managed worktree now asks for confirmation first.
4. Mark CBP-576 complete in `markdown/to do/todo.md`.

## Acceptance Criteria
- `/worktree` Cheat Sheet row and the "Worktree Sessions" collapsible both mention ownership details and confirmed deletion, tagged `rust-v0.155.0`.
- `python3 scripts/build-source.py` completes without error after the edit.
