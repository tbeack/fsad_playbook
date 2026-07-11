# CBP-298 — Update CLAUDE_CODE_ENABLE_AUTO_MODE env var row — GA on Bedrock/Vertex/Foundry

## Summary
Claude Code v2.1.207 made auto mode available on Amazon Bedrock, Google Vertex AI, and Azure Foundry without requiring `CLAUDE_CODE_ENABLE_AUTO_MODE=1`. The opt-in flag is now deprecated. Users can disable auto mode via the `disableAutoMode` setting instead.

## Assessment
Line 10725 in `fsad-playbook.html` documents `CLAUDE_CODE_ENABLE_AUTO_MODE=1` as an opt-in flag for Bedrock/Vertex/Foundry. The description says "without this flag, auto mode is only available on the standard Anthropic API" — this is now incorrect.

The row should be updated to reflect that:
- Auto mode is now GA on Bedrock/Vertex/Foundry (no env var needed)
- The flag is deprecated / no longer needed
- Use `disableAutoMode: true` in settings to opt out if desired

## Plan
1. Find line 10725 in `fsad-playbook.html`
2. Update the description for `CLAUDE_CODE_ENABLE_AUTO_MODE=1` to say it is deprecated and no longer needed — auto mode is now available by default on Bedrock, Vertex, and Foundry as of v2.1.207. To disable auto mode on these platforms, use `disableAutoMode: true` in `~/.claude/settings.json`.

## Acceptance Criteria
- The `CLAUDE_CODE_ENABLE_AUTO_MODE=1` row clearly states it is deprecated / no longer needed
- The row mentions `disableAutoMode` as the way to opt out
- References v2.1.207
