# CBP-422 — [Claude] Document the `keybindingFlavor` setting

## Source
Claude Code v2.1.238 release notes: "Added a `keybindingFlavor` setting: set it to `\"readline\"` to make Ctrl+W in the prompt delete back to the previous whitespace, as in Bash; the default (`\"classic\"`) is unchanged."

## Summary
A new `keybindingFlavor` setting lets users opt into readline-style Ctrl+W behavior (delete back to previous whitespace, like Bash) instead of the classic default. Two natural homes exist: the Cheat Sheet's Keyboard Shortcuts table (Ctrl+W row, `id="cheat-sheet"`, line 10959) and the "Notable settings.json Keys" callout (line 9738-9759 area, in the claude-setup/Project Anatomy section).

## Assessment
Content does not exist. The Ctrl+W row (line 10959) currently just says "Delete word backward" with no mention of `keybindingFlavor`. The settings.json callout list (lines 9742-9759+) has no `keybindingFlavor` entry.

## Plan
1. In `fsad-playbook.html`, update the Ctrl+W row in the Keyboard Shortcuts table (line 10959): append a note that setting `keybindingFlavor: "readline"` in `settings.json` changes this to delete back to the previous whitespace (Bash-style); default `"classic"` behavior is unchanged. Tag `(v2.1.238)`.
2. Add a new `<li>` to the "Notable settings.json Keys" callout (after the existing entries, before line 9759's closing area — find the actual `</ul>` for that list) documenting `keybindingFlavor`: values `"classic"` (default) / `"readline"`, and its effect on Ctrl+W. Tag `(v2.1.238)`.

## Acceptance Criteria
- [ ] Ctrl+W Cheat Sheet row documents `keybindingFlavor` and its readline behavior, tagged `(v2.1.238)`.
- [ ] Notable settings.json Keys callout includes a `keybindingFlavor` bullet, tagged `(v2.1.238)`.
- [ ] No existing rows/bullets removed; both additions match existing style (inline code, versioned parenthetical).
