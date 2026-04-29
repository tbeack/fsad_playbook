# CBP-042: Update `/recap` in Cheat Sheet with opt-out env var

## Summary
Claude Code v2.1.110 expanded session recap to users with telemetry disabled (Bedrock, Vertex, Foundry, `DISABLE_TELEMETRY`). Users can opt out via `/config` or the new `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=0` env var.

## Assessment
The `/recap` row in the Cheat Sheet (~line 4742) currently reads:
```
Replay session context — useful when returning to a long-running session. Configurable in /config; force with CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1.
```

This is partially correct — the `=1` force-on env var is mentioned — but the new `=0` opt-out is not documented, nor is the context that recap now fires automatically for telemetry-disabled deployments.

## Plan
1. Read the `/recap` row (~line 4742)
2. Update the description to mention the opt-out:
   - Old: `Replay session context — useful when returning to a long-running session. Configurable in <code>/config</code>; force with <code>CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1</code>.`
   - New: `Replay session context — useful when returning to a long-running session. Configurable in <code>/config</code>. Force on: <code>CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1</code>; opt out: <code>=0</code> (also applies to Bedrock/Vertex/Foundry where recap is on by default).`

## Acceptance Criteria
- `/recap` row reflects both the opt-in (`=1`) and opt-out (`=0`) env vars
- Mention of Bedrock/Vertex/Foundry default-on behavior so enterprise users know they can opt out
- Description remains concise and fits the table cell format
