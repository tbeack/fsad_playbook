# CBP-583 — Add auto mode server-side classifier billing default to Notable settings.json Keys (v2.1.278)

**Source:** Claude Code v2.1.278
**Tag:** [Claude]

## Summary
v2.1.278 changes auto mode for Claude API and Enterprise users, and on Bedrock, Vertex, Foundry, and gateways, to default to the server-side classifier, which does not charge for classifier overhead. `CLAUDE_CODE_AUTO_MODE_SERVER=0` opts out on Bedrock, Vertex, Foundry, and gateways, and Claude Code warns on billed fallback. `/status` gains an "Auto mode server" row.

## Assessment
`src/pages/practices.html` already has a `CLAUDE_CODE_AUTO_MODE_SERVER=1` row in the Notable Environment Variables table (added for v2.1.273), documenting it as an opt-in to the platform's server-side classifier on Bedrock/Vertex/Foundry, with the local classifier as default. v2.1.278 reverses that default (server-side is now default, extended to Claude API/Enterprise and gateways too) and flips the var's polarity to `=0` as an opt-out. This makes the existing row factually wrong going forward, not just incomplete — fix it in place rather than adding a duplicate bullet elsewhere.

## Plan
1. Open `src/pages/practices.html`
2. Update the `CLAUDE_CODE_AUTO_MODE_SERVER` row in the Notable Environment Variables table: new default (server-side, broader platform coverage), new opt-out polarity (`=0`), the billed-fallback warning, the `/status` row, and a note on the v2.1.273→v2.1.278 default flip for anyone who set the var under the old meaning
3. Mark CBP-583 complete in `markdown/to do/todo.md`

## Acceptance Criteria
- The `CLAUDE_CODE_AUTO_MODE_SERVER` env var row reflects the v2.1.278 default and polarity, not the stale v2.1.273 behavior
- Build passes without errors
