# CBP-381 — Note the `selection:clear` bindable action on the `/keybindings` Cheat Sheet row

## Source
Claude Code v2.1.234 — "Added the `selection:clear` keybinding action, so a key can be bound to clear an in-app text selection; also works in the agents view."

## Summary
Surface the new bindable keybinding action on the existing `/keybindings` Cheat Sheet row.

## Assessment
- The playbook has **no** dedicated keybinding-action reference table. Phase 3 confirmed this
  across `#cheat-sheet`, `#power-usage`, and `#config-cascade`.
- Existing touchpoints for keybinding actions:
  - `#cheat-sheet` line ~11029: `<tr><td><code>/keybindings</code></td><td>Open / create keybindings configuration</td></tr>` — a bare one-liner.
  - `#power-usage` line ~11737: an incidental `voice:pushToTalk` rebind snippet inside the Voice Mode collapsible.
  - Line ~11318: `keybindings.json` in the file-structure map.
  - Line ~15037: a changelog-modal mention of `modelPicker:thisSessionOnly`.
- Content does not exist. The `/keybindings` row is the correct minimal home — creating a whole
  new action table for one action would be disproportionate.

## Plan
1. Read line 11029 and its immediate neighbours to confirm the row's exact current text and
   the surrounding rows' style (some rows in this table carry version tags, some do not).
2. Replace the `/keybindings` row's description cell, keeping the `<code>/keybindings</code>`
   command cell untouched.
3. New description should: keep "Open / create keybindings configuration", then add that
   actions are bound by name in `~/.claude/keybindings.json`, and cite `selection:clear`
   as an example — a key that clears an in-app text selection, working in the agents view
   too. Tag `(v2.1.234)`.
4. Keep it to one or two sentences — this is a cheat-sheet row, not a deep-dive.

## Acceptance Criteria
- [ ] The `/keybindings` row still exists as a single `<tr>` with two `<td>` cells.
- [ ] The description names `selection:clear` in a `<code>` tag and describes it as clearing an in-app text selection.
- [ ] The agents-view applicability is mentioned, matching the changelog.
- [ ] The original "Open / create keybindings configuration" meaning is preserved, not replaced.
- [ ] The addition carries a `(v2.1.234)` tag consistent with other versioned rows in this table.
- [ ] No new table or section is introduced.
