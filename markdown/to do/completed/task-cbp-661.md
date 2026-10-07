# CBP-661 — Document `effort` parameter on the Agent tool

## Summary
Document `effort` parameter on the Agent tool (Claude Code v2.1.292).

## Source
Claude Code v2.1.292 (2026-10-06).

## Assessment
Not covered in `src/pages/practices.html`.

## Plan
Update the subagent model-override notes: add a note to the `/tasks` area or the `CLAUDE_CODE_SUBAGENT_MODEL` bullet (~line 1667) that Agent tool accepts per-spawn effort.
Then run `python3 scripts/build-source.py`.

## Acceptance Criteria
- The new content appears in `src/pages/practices.html` with `(v2.1.292)`.
- Build passes.
