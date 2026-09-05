# CBP-524 — Add `/skill-doctor` Cheat Sheet Row

## Source
Claude Code v2.1.261

## Summary
v2.1.261 adds `/skill-doctor`, which shows which loaded skills go unused and what they cost in context, so you can prune them.

## Assessment
`src/pages/practices.html` Cheat Sheet has `/skills` and `/reload-skills` rows but no `/skill-doctor` row. New row.

## Plan
1. Locate the `/reload-skills` row.
2. Add a new row immediately after it: `/skill-doctor` — Show which loaded skills go unused and what they cost in context, so you can prune them (v2.1.261).

## Acceptance Criteria
- New `/skill-doctor` Cheat Sheet row present with v2.1.261 attribution
- HTML is valid
