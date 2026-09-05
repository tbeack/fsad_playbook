# CBP-527 — Update `/status` Row: Organization Policy Diagnostic Line

## Source
Claude Code v2.1.261

## Summary
v2.1.261 adds an "Organization policy" line to `/status` and `claude doctor` that says why an organization's policy could not be loaded, such as a proxy not passing the endpoint through.

## Assessment
`src/pages/practices.html` Cheat Sheet `/status` row already documents incremental additions (session kind, Skipped sources, GitHub-connected line). Update existing.

## Plan
1. Locate the `/status` row.
2. Append a sentence noting the new "Organization policy" line, mentioning it's also surfaced by `claude doctor`, with v2.1.261 attribution.

## Acceptance Criteria
- `/status` row mentions the Organization policy line with v2.1.261 attribution
- HTML is valid
