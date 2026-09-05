# CBP-525 — Add `bashOutputMaxChars` / `taskOutputMaxChars` to Notable settings.json Keys

## Source
Claude Code v2.1.261

## Summary
v2.1.261 adds `bashOutputMaxChars` and `taskOutputMaxChars` settings to raise how much command and background-task output Claude receives inline before it is saved to a file, up to 128K characters.

## Assessment
`src/pages/practices.html` Notable `settings.json` Keys callout does not mention output-size limits. New item.

## Plan
1. Locate the `managedMcpServers` bullet (last item in the list, `margin-bottom:0`).
2. Change its style to `margin-bottom:0.4rem` and append a new last bullet for `bashOutputMaxChars` / `taskOutputMaxChars` with `margin-bottom:0`.

## Acceptance Criteria
- New bullet documents both settings with v2.1.261 attribution
- List still ends with a `margin-bottom:0` item
- HTML is valid
