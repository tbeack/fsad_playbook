# CBP-760: [Claude] Fast mode now available on Google Vertex AI (v2.1.322)

## Summary
Claude Code v2.1.322 added fast mode on Vertex AI in the global, us, and eu regions, falling back to standard speed if Vertex refuses the fast-mode request.

## Assessment
`src/pages/practices.html` has a `/fast [on|off]` cheat-sheet row (~line 1826) that already documents the Opus 4.8 fast-mode deprecation and the Bedrock/Vertex/Foundry immediate-apply behavior — the right place to append this regional availability note.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/fast` cheat-sheet row, append after the Opus 4.8 deprecation sentence:
   ```
   As of v2.1.322, fast mode is also available on Google Vertex AI in the global, us, and eu regions, falling back to standard speed if Vertex refuses the fast-mode request.
   ```

## Acceptance Criteria
- The `/fast` cheat-sheet row documents fast mode's v2.1.322 Vertex AI availability and its region scope.
- HTML is valid (no unclosed tags).
