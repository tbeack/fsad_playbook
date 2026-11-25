# CBP-817: Add "Always deliver" note for held cross-session messages (v2.1.332)

## Summary
Claude Code v2.1.332 added "Always deliver" to the prompt shown for held messages from other sessions.

## Assessment
`src/pages/practices.html`'s Agent Teams section has a long, version-dated cross-session `SendMessage`/`ListAgents` paragraph (~line 2233) that already covers related behavior up through v2.1.328. `crossSessionInbound`/`dialogExpiry` (~line 651-652) documents the held-message approval dialog these messages use. The new option extends that same dialog, so it belongs at the end of the running cross-session paragraph.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the cross-session `SendMessage` paragraph (~line 2233), after the v2.1.328 sentence:
   ```
   As of v2.1.332, the held-message approval dialog (see <code>crossSessionInbound</code>/<code>dialogExpiry</code> above) also offers "Always deliver" to stop asking for further messages from that sender.
   ```

## Acceptance Criteria
- The cross-session messaging paragraph documents the v2.1.332 "Always deliver" option.
- HTML is valid (no unclosed tags).

## Status
Implemented.
