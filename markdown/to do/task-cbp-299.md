# CBP-299 — Add disableAutoMode to Notable settings.json Keys callout

## Summary
Claude Code v2.1.207 introduced `disableAutoMode` as a settings key to opt out of auto mode on Bedrock, Vertex AI, and Foundry (where auto mode is now the default).

## Assessment
The Notable settings.json Keys callout in the Config Cascade section (lines 8670–8686) documents important settings keys. The `autoMode`-related settings (`settings.autoMode.hard_deny`, `autoMode.classifyAllShell`) are already documented. The new `disableAutoMode` key needs to be added as a new bullet.

Currently the last item is `respondToBashCommands` at line 8686 (no margin-bottom:0 on the `</li>` — actually it has `margin-bottom:0`). Need to:
1. Change the `margin-bottom:0` on `respondToBashCommands` to `margin-bottom:0.4rem` 
2. Add a new bullet for `disableAutoMode` as the last item with `margin-bottom:0`

## Plan
1. Read lines 8686–8688 to confirm exact text
2. Change `respondToBashCommands` li margin from `margin-bottom:0` to `margin-bottom:0.4rem;`
3. Insert a new `<li>` for `disableAutoMode` before the closing `</ul>` at line 8687

## Acceptance Criteria
- `disableAutoMode` appears in the Notable settings.json Keys callout
- Explains it opts out of auto mode on Bedrock/Vertex/Foundry; configure in user settings (`~/.claude/settings.json`)
- References v2.1.207
- Previous item has correct margin
