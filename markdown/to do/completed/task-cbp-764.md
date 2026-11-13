# CBP-764: [Claude] Document `plugin.json` `engines["claude-code"]` version range (v2.1.323)

## Summary
Claude Code v2.1.323 added `engines["claude-code"]` support to `plugin.json`: a plugin outside its stated Claude Code version range is not installed, updated, or loaded, and install/update now pick the newest version of the plugin that fits.

## Assessment
`src/pages/practices.html`'s Power Usage → Plugins collapsible (`power-usage--plugins`, ~line 2564-2647) already documents several `plugin.json` keys and behaviors as bullets in the list at ~line 2606-2631 (e.g. the "Default folder override warning" bullet at ~line 2627 about another `plugin.json` key). The new `engines` field belongs in this same list.

## Plan
1. Open `src/pages/practices.html`.
2. In the Plugins collapsible's bullet list, immediately after the "Default folder override warning" `<li>` (~line 2627), insert:
   ```html
   <li><strong><code>engines["claude-code"]</code> version range (v2.1.323):</strong> declare a semver range in a plugin's <code>plugin.json</code> (e.g. <code>{"engines": {"claude-code": ">=2.1.300"}}</code>) to keep the plugin from installing, updating, or loading on a Claude Code version outside that range. Install and update now pick the newest published version of the plugin that fits the running Claude Code version.</li>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Plugins collapsible documents the `engines["claude-code"]` version-range field, what happens outside the range, and that install/update now version-select accordingly.
- HTML is valid (no unclosed tags).
