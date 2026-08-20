# CBP-392 — Context-limit error now names auto-compact and points to `/config`

## Source
Claude Code v2.1.235

## Summary
The context-limit error was improved to say when auto-compact is off and to point at `/config` to re-enable it.

## Assessment
Partially covered. The `/context` cheat-sheet row (line 10964) already documents the v2.1.216 context-window warning and failed-`/compact` error, so this is a direct continuation of that sentence. Separately, the Power Usage → Context Management collapsible (`<ul>` opening line 11766, closing `</ul>` line 11770) covers `/context` and `/compact` but never mentions auto-compact as a toggleable setting or `/config`.

## Plan
1. Append a clause to the `/context` row `<td>` at line 10964 noting that as of v2.1.235 the context-limit error states when auto-compact is disabled and points to `/config`.
2. Insert a new `<li>` after line 11769 (before the `</ul>` at 11770) in the context-management collapsible. Match the existing short-fragment, no-trailing-period convention of that list.

## Acceptance Criteria
- [ ] `/context` cheat-sheet row mentions the v2.1.235 auto-compact-off message
- [ ] Context Management collapsible gains a bullet naming auto-compact and `/config`
- [ ] Both edits match surrounding formatting conventions
