# CBP-780: Update `/install-github-app` row — confirmation before repo change (v2.1.327)

## Summary
Claude Code v2.1.327 added a confirmation before `/install-github-app` changes a repository.

## Assessment
`src/pages/practices.html` has an `/install-github-app` row (~line 1900) covering automated PR review setup. This is a direct safety addition to that same command.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/install-github-app` row (~line 1900), append a new sentence before the closing `</td></tr>`:
   ```
    As of v2.1.327, it asks for confirmation before changing a repository.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/install-github-app` row documents the v2.1.327 confirmation step.
- HTML is valid (no unclosed tags).
