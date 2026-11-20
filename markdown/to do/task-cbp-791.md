# CBP-791: Update `/code-review` row — default scope now whole branch vs. default branch (v2.1.329)

## Summary
Claude Code v2.1.329 changed `/code-review` with no target on most models to review the whole branch against the default branch instead of just the current diff, and fixed it losing the diff on multi-commit branches.

## Assessment
`src/pages/practices.html`'s cheat-sheet `/code-review` row (~line 1918) was last updated for v2.1.328's severity-label/suggested-fix changes but doesn't yet reflect this further scope change to what gets reviewed by default.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/code-review` row, append after the existing v2.1.328 sentence about severity labels:
   ```
    As of v2.1.329, on most models <code>/code-review</code> with no target reviews the whole branch against the default branch instead of just the current diff, and no longer loses the diff on multi-commit branches.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/code-review` row documents the v2.1.329 default-scope change (whole branch vs. default branch) and the multi-commit diff fix.
- HTML is valid (no unclosed tags).

## Status
Implemented.
