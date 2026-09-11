# CBP-555: Add `bashEditDiffEnabled` to Notable settings.json Keys

## Source
Claude Code v2.1.269 changelog: "Added a diff of files a Bash command changed to the Bash tool result — the Bash tool now handles file edits (setting `bashEditDiffEnabled`)."

## Summary
New `settings.json` boolean key controlling whether the Bash tool result shows a diff of files a Bash command edited. This is a settings-key addition, matching the pattern of the "Notable settings.json Keys" callout list which already tracks similar toggles (e.g. `bashOutputMaxChars`, `respondToBashCommands`).

## Assessment
Not documented. `src/pages/practices.html`'s "Notable `settings.json` Keys" callout (`<ul>` list starting ~line 613, inside the `claude-setup` section) ends with the `bashOutputMaxChars` / `taskOutputMaxChars` `<li>` (the one with `margin-bottom:0`).

## Plan
1. Open `src/pages/practices.html`, locate the "Notable settings.json Keys" `<ul>` list, and find its last `<li>` (the `bashOutputMaxChars` / `taskOutputMaxChars` entry, styled `margin-bottom:0` to sit last in the list).
2. Change that `<li>`'s style from `margin-bottom:0` to `margin-bottom:0.4rem` (since it will no longer be last).
3. Add a new final `<li>` after it:
   ```html
   <li style="margin-bottom:0;"><code>bashEditDiffEnabled</code> — Shows a diff of files a Bash command changed directly in the Bash tool result, so file edits made via shell commands (not just the Edit/Write tools) are visible inline (v2.1.269).</li>
   ```

## Acceptance Criteria
- [ ] `bashEditDiffEnabled` is documented as the new last entry in the Notable settings.json Keys list.
- [ ] Cites v2.1.269.
- [ ] `python3 scripts/build-source.py` runs clean after the edit.
