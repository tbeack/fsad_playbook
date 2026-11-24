# CBP-808: Add managed marketplace auto-update default note (v2.1.331, effective 2026-11-30)

## Summary
Claude Code v2.1.331 announced that, in a future release on or after November 30, 2026, plugin marketplaces registered via managed `extraKnownMarketplaces` will auto-update by default. Organizations can opt a marketplace out by setting `"autoUpdate": false` on its entry.

## Assessment
`src/pages/practices.html`'s Plugins section has no existing mention of `extraKnownMarketplaces` or marketplace auto-update defaults. This is a forthcoming default-behavior change (effective in 6 days from this update) relevant to any team using managed marketplaces, so it's worth flagging ahead of the switch even though it isn't live yet.

## Plan
1. Open `src/pages/practices.html`.
2. Add a new bullet to the Plugins section's advanced-options list, immediately before the "Marketplace `headersHelper`" bullet:
   ```html
   <li><strong>Managed marketplace auto-update default (v2.1.331, effective November 30, 2026):</strong> plugin marketplaces registered via managed <code>extraKnownMarketplaces</code> will auto-update by default from that date forward. Set <code>"autoUpdate": false</code> on a marketplace's entry to opt it out.</li>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Plugins section documents the upcoming managed-marketplace auto-update default and its opt-out.
- HTML is valid (no unclosed tags).

## Status
Implemented.
