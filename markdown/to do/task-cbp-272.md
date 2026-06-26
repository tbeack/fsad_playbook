# CBP-272 — Plugins: marketplace `renames` auto-follow

## Summary
Claude Code v2.1.193 improved plugin auto-rename: the marketplace `renames` maps are now followed automatically. When a plugin is renamed in the marketplace, Claude Code updates your local settings.json to point to the new plugin name automatically — no manual settings update required.

## Assessment
The Plugins collapsible (lines 10440–10500) has a bullet list of plugin behaviors. The auto-rename behavior is new and not documented anywhere. It belongs as a new bullet in the Plugins collapsible bullet list, near the bottom after "Marketplace search bar" (line 10485).

## Plan
1. Read lines 10474–10487 of `fsad-playbook.html` to confirm bullet list structure.
2. Add a new `<li>` after the "Marketplace search bar" bullet (line 10485), before the closing `</ul>`:
   - `<strong>Marketplace auto-rename:</strong> when a plugin is renamed in the marketplace, Claude Code now follows the <code>renames</code> map in the plugin registry and automatically updates your local settings to use the new plugin name — no manual intervention needed when the marketplace renames a plugin you have installed (v2.1.193).`

## Acceptance Criteria
- Auto-rename bullet appears in the Plugins collapsible
- grep for `auto-rename\|renames` finds the new content
