# CBP-529 — Add Public Diagram-Renderer Auto-Mode Rule

## Source
Claude Code v2.1.261

## Summary
v2.1.261 changes auto mode to treat a link that packs content into a public diagram renderer's URL as an upload to that site — no longer auto-approved unless the user asked for it.

## Assessment
`src/pages/practices.html` Notable settings.json Keys callout catalogs auto mode's built-in safety rules (destructive-command blocks, Containment Escape rule, working-directory read guard). This is another built-in safety rule in the same family. New item.

## Plan
1. Locate the "Containment Escape rule" bullet.
2. Add a new bullet immediately after it for the public diagram-renderer link rule, with v2.1.261 attribution.

## Acceptance Criteria
- New bullet documents the rule with v2.1.261 attribution, placed alongside the other auto-mode safety rules
- HTML is valid
