# CBP-522 — Update `/ultrareview` Row with 45-Minute Wait

## Source
Claude Code v2.1.260

## Summary
v2.1.260 improves `/ultrareview` and `claude ultrareview` to wait up to 45 minutes (previously 30) for long-running cloud reviews.

## Assessment
`src/pages/practices.html` line 1974 `/ultrareview` row does not mention any wait limit. Update existing.

## Plan
1. Read line 1974.
2. Append: "Both forms wait up to 45 minutes for long-running cloud reviews (v2.1.260; previously 30)."

## Acceptance Criteria
- `/ultrareview` row mentions the 45-minute wait with v2.1.260 attribution
- HTML is valid
