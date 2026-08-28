# CBP-486 — Extend Agent Teams cross-session `SendMessage`/`ListAgents` bullet

## Summary
Claude Code v2.1.248 extended cross-session messaging (`SendMessage`/`ListAgents`) between sessions on the same machine to Bedrock, Vertex, and Foundry, and to sessions with telemetry disabled. It also changed `SendMessage` from a subagent to another session so the result now notes that any reply is delivered to the parent session's conversation, not to the subagent.

## Assessment
The Agent Teams collapsible in `src/pages/practices.html` (~line 2266) carries one long-running bullet tracking the cross-session `SendMessage`/`ListAgents` capability version-by-version since v2.1.224. Both new facts are direct extensions of that same capability, so both are appended as new sentences to the existing bullet rather than creating new list items — matching the established pattern.

## Plan
1. In `src/pages/practices.html`, locate the cross-session `SendMessage` bullet (~line 2266), ending in "...instead of to the subagent." Actually ending currently at "...press Ctrl+O to expand the full body."
2. Append two sentences after the existing v2.1.247 sentence, before the closing `</li>`:
   ```html
   As of v2.1.248, cross-session messaging (<code>SendMessage</code>/<code>ListAgents</code>) between sessions on the same machine is available on Bedrock, Vertex, and Foundry, and when telemetry is disabled — previously limited to direct Anthropic API sessions. Also as of v2.1.248, when a subagent calls <code>SendMessage</code> to another session, any reply is delivered to the parent session's conversation, not to the subagent — worth knowing when a subagent-initiated cross-session conversation needs a response the subagent itself won't see.
   ```

## Acceptance Criteria
- [x] Cross-session messaging Bedrock/Vertex/Foundry/telemetry-disabled availability documented.
- [x] Subagent-to-session `SendMessage` reply-routing behavior documented.
