# CBP-528 — `keybindingFlavor` Is Now a No-Op

## Source
Claude Code v2.1.261

## Summary
v2.1.261 changes the prompt's word-editing keys to match Bash by default: `Ctrl+W` deletes back to whitespace, `Alt+F`/`Alt+D` stop/delete to word end, punctuation separates words. `keybindingFlavor` no longer has any effect.

## Assessment
`src/pages/practices.html` documents `keybindingFlavor` in two places: the Cheat Sheet `Ctrl+W` row (line ~1850) and the Notable settings.json Keys callout (line ~649). Both describe it as an opt-in setting (`"readline"` vs default `"classic"`). This is a breaking change to previously-documented behavior — the setting is now inert and the Bash-style behavior is always on. Update both.

## Plan
1. Rewrite the `Ctrl+W` Cheat Sheet row to describe the always-on Bash-style behavior directly, then note that `keybindingFlavor` was the opt-in mechanism from v2.1.238–v2.1.260 and no longer has any effect as of v2.1.261.
2. Rewrite the `keybindingFlavor` bullet in Notable settings.json Keys to lead with "No longer has any effect as of v2.1.261" and explain the prior behavior for historical context.

## Acceptance Criteria
- Both locations state clearly that `keybindingFlavor` is now a no-op and the Bash-style keys are default behavior
- Historical context (v2.1.238/v2.1.239 opt-in) is preserved for readers following old links
- HTML is valid
