# CBP-807: Update `/login` row — shorter Console sign-in link (v2.1.331)

## Summary
Claude Code v2.1.331 improved the Console sign-in link shown by `/login` and `claude auth login --console`: it is now much shorter (mirroring the v2.1.330 shortening of the claude.ai sign-in link).

## Assessment
`src/pages/practices.html`'s `/login` cheat-sheet row (~line 1932) documents the v2.1.330 claude.ai link shortening but not this separate Console-flow shortening.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the `/login` row, after the existing v2.1.330 sentence:
   ```
   As of v2.1.331, the Console sign-in link shown by /login and claude auth login --console is also much shorter.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/login` row documents the v2.1.331 Console sign-in link shortening.
- HTML is valid (no unclosed tags).

## Status
Implemented.
