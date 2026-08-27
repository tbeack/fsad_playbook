# CBP-476 — Sub-agents use the session's fallback model chain on a first-call 404

## Summary
Claude Code v2.1.247 fixed sub-agents dying on a first-call model 404: they now use the session's fallback model chain, and the error returned to the parent includes the error type, status, request id, and model.

## Assessment
The `fallbackModel` bullet in "Notable settings.json Keys" (`src/pages/practices.html` ~line 622) is the existing anchor for fallback-model behavior ("Works in both interactive and print (-p) mode"). This v2.1.247 fix is a direct reliability extension of that same mechanism to sub-agents specifically, so append there rather than create a new bullet.

## Plan
1. In `src/pages/practices.html`, locate the `fallbackModel` bullet (~line 622).
2. Append a sentence at the end of the bullet, before the closing `</li>`:
   ```html
    As of v2.1.247, sub-agents that fail on their first model call with a 404 also fall back through this same chain instead of dying outright, and the error surfaced to the parent session includes the error type, status, request id, and model.
   ```

## Acceptance Criteria
- [x] v2.1.247 sub-agent fallback behavior documented at the end of the existing `fallbackModel` bullet.
