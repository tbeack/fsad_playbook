# CBP-788: `/list-agents` now private to you; Claude lists sessions itself (v2.1.328)

## Summary
Claude Code v2.1.328 changed `/list-agents` to show its list to you alone; Claude now lists sessions itself (via `ListAgents`) when it needs to, instead of reading your `/list-agents` output.

## Assessment
`src/pages/practices.html`'s cross-session `SendMessage`/`ListAgents` paragraph (~line 2233) already chains "As of vX.X.X" sentences documenting `ListAgents`/`/list-agents` behavior changes, including a v2.1.239 note that `/list-agents` previously missed live teammates. This is a direct continuation.

## Plan
1. Open `src/pages/practices.html`.
2. In the cross-session `SendMessage` paragraph (~line 2233), append a new sentence at the end, before the closing `</li>`:
   ```
    As of v2.1.328, <code>/list-agents</code> shows its list to you alone — Claude lists reachable sessions itself via <code>ListAgents</code> when it needs to, rather than reading your <code>/list-agents</code> output.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The cross-session messaging paragraph documents the v2.1.328 `/list-agents` privacy change.
- HTML is valid (no unclosed tags).
