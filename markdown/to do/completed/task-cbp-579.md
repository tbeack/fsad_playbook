# CBP-579: Update `codex remote-control` row — daemon update schedules + restart recovery (rust-v0.155.0)

## Source
Codex CLI rust-v0.155.0 release notes: "Added configurable daemon update schedules and `codex app-server daemon update`; saved threads and active goals can recover after daemon restarts." (#43542, #43562, #44314)

## Summary
The app-server daemon underlying `codex remote-control` gains a configurable auto-update schedule, an explicit `codex app-server daemon update` command to trigger an update on demand, and recovery of saved threads/active goals across a daemon restart.

## Assessment
`src/pages/codex.html` `#codex-cheat-sheet` → CLI Flags table has a `codex remote-control` row (~line 1042) already covering the headless app-server entrypoint and manual pairing (rust-v0.143.0). Daemon update scheduling and restart recovery are operational refinements of that same daemon — **update-existing**.

## Plan
1. Open `src/pages/codex.html`.
2. Extend the `codex remote-control` row (~line 1042) with a sentence: as of rust-v0.155.0, the daemon's auto-update schedule is configurable, `codex app-server daemon update` triggers an update on demand, and saved threads/active goals recover automatically after a daemon restart.
3. Mark CBP-579 complete in `markdown/to do/todo.md`.

## Acceptance Criteria
- The `codex remote-control` Cheat Sheet row mentions configurable daemon updates, the `codex app-server daemon update` command, and restart recovery, tagged `rust-v0.155.0`.
- `python3 scripts/build-source.py` completes without error after the edit.
