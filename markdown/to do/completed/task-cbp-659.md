# CBP-659 — Add `claude plugin install --marketplace <source>` bullet

## Summary
Add `claude plugin install --marketplace <source>` bullet (Claude Code v2.1.292).

## Source
Claude Code v2.1.292 (2026-10-06).

## Assessment
Not covered in `src/pages/practices.html`.

## Plan
Add a list item after the `--config` bullet (~line 2563) in the plugins section.
Then run `python3 scripts/build-source.py`.

## Acceptance Criteria
- The new content appears in `src/pages/practices.html` with `(v2.1.292)`.
- Build passes.
