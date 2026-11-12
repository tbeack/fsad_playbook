# CBP-688 — Add `$.ui.view({ agentId })` to mods API note (v2.1.300)

## Summary
Claude Code v2.1.300 added `$.ui.view({ agentId })` for mods: shows an agent's transcript in the main view when you ask, and `$.ui.view({})` goes back.

## Assessment
The mods "What a Mod Is" section (src/pages/practices.html, line 3702) documents `$.agent.spawn` and `$.agent.list()`. There is no mention of `$.ui.view()`. This is a "New content needed" task.

## Plan
1. Read src/pages/practices.html around line 3702.
2. Append a new sentence to the paragraph at line 3702 (after the `$.agent.list()` note): "Since v2.1.300, `$.ui.view({ agentId })` opens an agent's transcript in the main view; `$.ui.view({})` returns to the previous view."

## Acceptance Criteria
- The mods section mentions `$.ui.view({ agentId })`.
- `$.ui.view({})` (the "go back" form) is also mentioned.
- No existing text is removed or broken.
