# CBP-394 — `claude rc` applies the enterprise-gateway availability check

## Source
Claude Code v2.1.235

## Summary
Remote Control: `claude rc` now applies the same enterprise-gateway availability check as interactive startup.

## Assessment
Not covered. Grep for `claude rc` returns nothing in the file. The Power Usage → Remote Control collapsible has a `<ul>` of dated behavior notes (opens line 11587, closes line 11595) already carrying two v2.1.234 availability/entitlement entries — the same family of change.

## Plan
1. Insert a new `<li>` after line 11594, before the `</ul>` at 11595.
2. Match the list convention: plain sentence, no trailing period, version tag in parentheses at the end — e.g. `… (v2.1.235)`.

## Acceptance Criteria
- [ ] Remote Control collapsible gains a v2.1.235 `<li>` mentioning `claude rc` and the enterprise-gateway availability check
- [ ] Formatting matches the sibling `<li>` entries (no trailing period, trailing version tag)
