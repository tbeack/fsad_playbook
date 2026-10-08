# CBP-663 — [Claude] Haiku 5.5 is the default Haiku model (v2.1.293)

## Summary
[Claude] Haiku 5.5 is the default Haiku model (v2.1.293)

## Source
Claude Code v2.1.293 (2026-10-07)

## Assessment
Not covered or outdated in src/pages/practices.html.

## Plan
Update the `haiku` alias row in the model alias table (~line 1605) to name Claude Haiku 5.5 (`claude-haiku-5-5`), 1M context, $0.10/$0.50 per MTok.
Then run `python3 scripts/build-source.py`.

## Acceptance Criteria
- The change appears in src/pages/practices.html with the version tag.
- Build passes.
