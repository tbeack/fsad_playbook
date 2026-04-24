# CBP-056 — Consolidate /cost and /stats into /usage in Cheat Sheet

## Summary
Claude Code v2.1.118 merged `/cost` and `/stats` into the `/usage` command. Both `/cost` and `/stats` remain as typing shortcuts that open the relevant tab within `/usage`. The Cheat Sheet currently shows three separate rows for `/cost`, `/usage`, and `/stats`.

## Assessment
The Cheat Sheet (around line 5010–5012 of fsad-playbook.html) has three rows:
- `/cost` — Show session cost & token usage
- `/usage` — Show plan usage & rate limits
- `/stats` — Visualize daily usage and streaks

These need to be consolidated: `/usage` becomes the primary command that unified all three tabs, with `/cost` and `/stats` noted as typing shortcuts.

## Plan
1. Replace the three existing rows with one consolidated `/usage` row that captures all three tabs and notes the aliases.

## Acceptance Criteria
- Cheat Sheet shows a single `/usage` row with description of all three tabs
- `/cost` and `/stats` noted as aliases/shortcuts within the description
- No other rows removed or broken
