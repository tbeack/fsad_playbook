# CBP-534: Update Cheat Sheet `/commands` card — mid-prompt autocomplete matches list + bare-name plugin skills

## Source
Claude Code CHANGELOG.md v2.1.265: "Improved slash commands typed mid-prompt: matches now show in list (Tab opens it outside fullscreen) instead single suggestion, plugin skill is now found by its bare name"

## Summary
When a slash command is typed in the middle of a prompt (not at the start), Claude Code now shows a full list of matches instead of a single suggestion; pressing `Tab` opens that list outside fullscreen mode. Separately, plugin-provided skills can now be found by their bare name (e.g. `/skill-name`) rather than requiring the `/plugin:skill-name` qualified form.

## Assessment
`src/pages/practices.html` has a `/commands` card in the Cheat Sheet (~line 2185-2188): "Type `/` for slash command and skill autocomplete." This is generic and doesn't mention mid-prompt behavior or the bare-name plugin-skill lookup — **update existing**.

## Plan
1. Open `src/pages/practices.html`, locate the `/commands` card (~line 2185-2188, inside the same card group as `@mention`, `!bash`, `Paste Images`, `Pipe Input`).
2. Expand the card body text to note:
   - Slash commands typed mid-prompt now show a full match list rather than a single suggestion; `Tab` opens the list outside fullscreen mode (v2.1.265)
   - Plugin skills can now be invoked by their bare name (no `/plugin:` prefix required) (v2.1.265)
3. Cross-check the `<kbd>Tab</kbd>` row in the Keyboard Shortcuts table (~line 1841, "Accept autocomplete suggestion") — leave as-is unless it directly contradicts the new list-based Tab behavior; if needed, append a short parenthetical pointing to the expanded `/commands` card rather than duplicating detail.

## Acceptance Criteria
- [ ] `src/pages/practices.html` `/commands` cheat-sheet card documents mid-prompt match-list behavior and `Tab` opening it outside fullscreen, version-tagged `(v2.1.265)`
- [ ] Same card (or an adjacent note) documents bare-name plugin skill invocation, version-tagged `(v2.1.265)`
- [ ] No duplicate/contradictory claims introduced in the Keyboard Shortcuts table's `Tab` row
- [ ] `python3 scripts/build-source.py` runs clean after the edit
