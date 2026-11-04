# CBP-745: Update `/claude-api managed-agents-onboard` row — default `auto` permission policy (v2.1.318)

## Summary
Claude Code v2.1.318 changed `/claude-api managed-agents-onboard` to give a new agent's built-in tools, and a quickstart template's MCP tools, the `auto` permission policy ("Judge risky actions") by default, matching the Claude Console; say "run without asking" to opt out.

## Assessment
`src/pages/practices.html`'s cheat-sheet table already has a `/claude-api managed-agents-onboard` row (~line 1924, added v2.1.290). This v2.1.318 change is a default-behavior update to that same command, so it extends the existing row rather than needing a new one.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the existing `/claude-api managed-agents-onboard` row (~line 1924):
   ```
   As of v2.1.318, the new agent's built-in tools, and a quickstart template's MCP tools, default to the `auto` permission policy ("Judge risky actions"), matching the Claude Console — say "run without asking" to opt out.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/claude-api managed-agents-onboard` row documents the v2.1.318 default permission-policy change.
- HTML is valid (no unclosed tags).

## Status
Implemented.
