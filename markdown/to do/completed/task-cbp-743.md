# CBP-743: Extend `deniedMcpServers` note — also blocks matching Anthropic servers and connectors (v2.1.318)

## Summary
Claude Code v2.1.318 changed `deniedMcpServers` URL entries to also block Anthropic-provided servers whose upstream URL matches, and connectors in cloud sessions and on self-hosted runners, where the session is given the connector's own URL; otherwise deny a connector by name.

## Assessment
`src/pages/practices.html`'s enterprise managed-settings list already documents `managedMcpServers` / `deniedMcpServers` together (~line 662), including the v2.1.259 and v2.1.305 refinements to the same denylist mechanism. This is a direct extension of that bullet's scope (what a `deniedMcpServers` URL entry matches against), so it belongs appended there rather than in a new section.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the existing `managedMcpServers` / `deniedMcpServers` bullet (~line 662):
   ```
   As of v2.1.318, a `deniedMcpServers` URL entry also blocks any Anthropic-provided server whose upstream URL matches it, plus connectors in cloud sessions and on self-hosted runners (where the session is given the connector's own URL) — deny a connector by name instead when you don't have its URL.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `deniedMcpServers` bullet documents the v2.1.318 extension to Anthropic-provided servers and connectors.
- HTML is valid (no unclosed tags).

## Status
Implemented.
