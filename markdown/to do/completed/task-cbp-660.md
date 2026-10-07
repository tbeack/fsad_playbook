# CBP-660 — Add `CLAUDE_CODE_OVERLOADED_RETRY_BASE_DELAY_MS` env var row

## Summary
Add `CLAUDE_CODE_OVERLOADED_RETRY_BASE_DELAY_MS` env var row (Claude Code v2.1.292).

## Source
Claude Code v2.1.292 (2026-10-06).

## Assessment
Not covered in `src/pages/practices.html`.

## Plan
Add a table row after `CLAUDE_CODE_RETRY_WATCHDOG` (~line 2742) in the env var table.
Then run `python3 scripts/build-source.py`.

## Acceptance Criteria
- The new content appears in `src/pages/practices.html` with `(v2.1.292)`.
- Build passes.
