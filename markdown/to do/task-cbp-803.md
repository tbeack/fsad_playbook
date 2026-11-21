# CBP-803: Update `/login` row — shorter sign-in link + `CLAUDE_CODE_FULL_SIGN_IN_LINK` (v2.1.330)

## Summary
Claude Code v2.1.330 shortened the claude.ai sign-in link shown by `/login`, `claude auth login`, and `claude setup-token`, and added `CLAUDE_CODE_FULL_SIGN_IN_LINK=1` to print the full link instead, for when the short one shows an error or a script reads values from it.

## Assessment
`src/pages/practices.html`'s `/login` cheat-sheet row (~line 1932) documents the v2.1.243 keyless Console sign-in option but not this v2.1.330 link change.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the `/login` row, after the existing v2.1.243 sentence:
   ```
    As of v2.1.330, the sign-in link shown by /login, claude auth login, and claude setup-token is much shorter; set CLAUDE_CODE_FULL_SIGN_IN_LINK=1 to print the full link instead, if the short one shows an error or a script reads values from it.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/login` row documents the v2.1.330 shortened sign-in link and its escape-hatch env var.
- HTML is valid (no unclosed tags).

## Status
Implemented.
