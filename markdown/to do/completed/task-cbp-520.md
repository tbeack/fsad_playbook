# CBP-520 — Add Org Admin Setting Note to Chrome Integration

## Source
Claude Code v2.1.260

## Summary
v2.1.260 changes Claude in Chrome to follow the organization's Claude in Chrome admin setting; when an admin turns it off, `--chrome`, `/chrome` and the browser tools are unavailable.

## Assessment
`src/pages/practices.html` Chrome Integration collapsible (`#power-usage--chrome`, lines 2545–2570) describes enabling via `claude --chrome` / `/chrome` but does not mention the org admin control. Update existing.

## Plan
1. Read lines 2548–2560.
2. After the intro `<p>` (line 2552), add a sentence: "As of v2.1.260, Claude in Chrome follows your organization's Claude in Chrome admin setting — when an admin turns it off, <code>--chrome</code>, <code>/chrome</code> and the browser tools are unavailable."

## Acceptance Criteria
- Chrome Integration collapsible mentions the org admin setting with v2.1.260 attribution
- HTML is valid
