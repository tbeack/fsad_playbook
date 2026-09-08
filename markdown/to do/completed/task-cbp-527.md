# CBP-527 — Update `keybindingFlavor` entries to note the setting is now deprecated

## Summary
Claude Code v2.1.261 changed the prompt's word-editing keys to match Bash by default: `Ctrl+W` deletes back to whitespace, `Alt+F` and `Alt+D` stop at word end, punctuation separates words. As a result, `keybindingFlavor` no longer has any effect — the Bash keybinding behavior is now the permanent default.

## Assessment
The setting is mentioned in two places in `src/pages/practices.html`:
1. Line 649 — Notable settings.json Keys list: `keybindingFlavor` entry instructing users to set `"readline"` to get Bash behavior
2. Line 1850 — Keyboard Shortcuts table: `Ctrl+W` row referencing `keybindingFlavor: "readline"`

Both need to be updated to clarify that the Bash keybinding behavior is now the default and the setting is deprecated/ignored.

## Plan
1. Edit line 649 to add a deprecation note
2. Edit line 1850 to update the `Ctrl+W` description to reflect the new default

## Changes

### Line 649 — settings list entry
Replace:
```
<code>keybindingFlavor</code> — Set to <code>"readline"</code> to make <kbd>Ctrl+W</kbd> in the prompt delete back to the previous whitespace, as in Bash; the default (<code>"classic"</code>) leaves <kbd>Ctrl+W</kbd> unchanged (v2.1.238).
```
With:
```
<code>keybindingFlavor</code> — <strong>Deprecated as of v2.1.261.</strong> Previously set to <code>"readline"</code> to enable Bash-style word keys; as of v2.1.261 the Bash keybinding behavior is now the permanent default: <kbd>Ctrl+W</kbd> deletes back to whitespace, <kbd>Alt+F</kbd> / <kbd>Alt+D</kbd> stop at word end, punctuation separates words. The setting is ignored (v2.1.238 → deprecated v2.1.261).
```

### Line 1850 — keyboard shortcut row
Replace the `Ctrl+W` row content to reflect the behavior is now the default, not opt-in.

## Acceptance Criteria
- Both `keybindingFlavor` mentions updated
- New default Bash keybinding behavior clearly described
- Deprecation note with version tags present
