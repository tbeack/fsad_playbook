# CBP-722: Hooks concurrency limit raised to 24, plus 12 past-timeout grace slots (v2.1.312)

## Summary
Claude Code v2.1.312 changes prompt and agent hooks to run at most 24 of the same event at a time per session (sub-agents included), plus at most 12 more that have waited longer than their event's timeout; a `timeout` under 1 second now counts as 1 second. This supersedes the flat "at most 12 concurrent" limit documented for CBP-699 (v2.1.302).

## Assessment
`src/pages/practices.html` line ~2898, in the Hooks section intro paragraph, currently reads: "As of v2.1.302, prompt and agent hooks run at most 12 of the same event at a time; additional concurrent firings of that event wait their turn. This limit does not apply to command or HTTP hooks." The v2.1.302 figure (12) is now the wrong number and the per-session/sub-agent scope and timeout-grace detail are missing.

## Plan
1. Open `src/pages/practices.html`.
2. Rewrite the sentence at line ~2898 to say that as of v2.1.312, prompt and agent hooks run at most 24 of the same event at a time per session (sub-agents included), plus up to 12 more that have waited past their event's timeout (a `timeout` under 1 second counts as 1 second); keep the existing note that this limit does not apply to command or HTTP hooks.

## Acceptance Criteria
- The Hooks intro paragraph reflects the new 24 + 12 limit, per-session/sub-agent scope, and the 1-second timeout floor.
- Version-tagged `(v2.1.312)`.
- The "does not apply to command or HTTP hooks" clause is preserved.
