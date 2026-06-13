# CBP-253 — Add `footerLinksRegexes` setting to Notable settings.json Keys callout (v2.1.176)

## Summary

Claude Code v2.1.176 added a `footerLinksRegexes` setting. It accepts an array of regex patterns that, when matched against text in the session footer row, are rendered as clickable link badges. Configurable via user or managed (MDM/org) settings.

## Assessment

The Notable settings.json Keys callout (~line 8580) does not mention `footerLinksRegexes`. The pattern for this callout lists new settings keys with a brief description and version tag. This follows the same pattern as `wheelScrollAccelerationEnabled` (CBP-251) and `enforceAvailableModels` (CBP-250). Add after the `language` entry from CBP-252 as the new last item.

## Plan

1. After CBP-252 adds `language` as the last `<li>`, add `footerLinksRegexes` as a new final `<li>`:
   ```html
   <li style="margin-bottom:0;"><code>footerLinksRegexes</code> — Array of regex patterns for footer-row link badges. Strings in the session footer matching a pattern are rendered as clickable link badges. Configurable at user or managed (MDM/org) settings level (v2.1.176).</li>
   ```
   Update the `language` entry's style from `margin-bottom:0` to `margin-bottom:0.4rem` when adding this.

## Acceptance Criteria

- `footerLinksRegexes` appears in the Notable settings.json Keys callout.
- Description accurately reflects regex-matched footer link badge behavior.
- Version tag `(v2.1.176)` included.
- List formatting is consistent (only the final item has `margin-bottom:0`).
