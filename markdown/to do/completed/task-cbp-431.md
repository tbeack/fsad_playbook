# CBP-431: Extend `keybindingFlavor: "readline"` Ctrl+W row for Bash-word-key matching

## Source
Claude Code v2.1.239 CHANGELOG.md entry: "`keybindingFlavor: \"readline\"` now also matches Bash for word keys: Alt+F and Ctrl/Option+→ stop at the end of the word, Alt+D deletes to it (Ctrl+Y pastes it back), and punctuation separates words"

## Summary
The `keybindingFlavor: "readline"` setting was introduced in v2.1.238 and is currently documented in the Cheat Sheet only for its effect on Ctrl+W (delete-word-backward, matching Bash). v2.1.239 extends the same setting to additional word-navigation keys: Alt+F / Ctrl+Option+→ (jump to end of word), Alt+D (delete to end of word, restorable with Ctrl+Y), and punctuation now acting as a word separator.

## Assessment
Existing row at ~line 10960 in `fsad-playbook.html`:
```html
<tr><td><kbd>Ctrl+W</kbd></td><td>Delete word backward. Set <code>keybindingFlavor: "readline"</code> in <code>settings.json</code> to delete back to the previous whitespace instead, as in Bash; the default (<code>"classic"</code>) leaves this unchanged (v2.1.238)</td></tr>
```
This only covers Ctrl+W. The new Alt+F/Alt+D/Ctrl+Option+→ behavior and punctuation-as-separator rule are not mentioned anywhere. Needs an extension, not a new section.

## Plan
1. In `fsad-playbook.html`, locate the Ctrl+W row (~line 10960, inside the keyboard shortcuts table that also has Ctrl+A/Ctrl+E, Ctrl+K, Ctrl+U rows).
2. Extend the existing `<td>` description to add the v2.1.239 behavior, keeping the v2.1.238 sentence intact:
   ```html
   <tr><td><kbd>Ctrl+W</kbd></td><td>Delete word backward. Set <code>keybindingFlavor: "readline"</code> in <code>settings.json</code> to delete back to the previous whitespace instead, as in Bash; the default (<code>"classic"</code>) leaves this unchanged (v2.1.238). As of v2.1.239, the same setting also matches Bash for other word keys: <kbd>Alt+F</kbd> / <kbd>Ctrl+&#8594;</kbd> / <kbd>Option+&#8594;</kbd> stop at the end of the word, <kbd>Alt+D</kbd> deletes to it (<kbd>Ctrl+Y</kbd> pastes it back), and punctuation now separates words.</td></tr>
   ```

## Acceptance Criteria
- [ ] The Ctrl+W row's description is extended (not replaced) with the v2.1.239 behavior.
- [ ] Both v2.1.238 and v2.1.239 references remain present.
- [ ] Table row HTML remains valid (single `<tr>`, two `<td>`s).
