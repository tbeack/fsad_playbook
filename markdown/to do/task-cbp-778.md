# CBP-778: Update `/status` row — new diagnostics list (v2.1.327)

## Summary
Claude Code v2.1.327 added a list in `/status` of broken agent, skill, command, and output style files, keybinding errors, an unavailable sandbox, ignored permission settings, and hook matchers that never match.

## Assessment
`src/pages/practices.html`'s Info & account commands table has a `/status` row (~line 1912) that already chains a running list of "As of vX.X.X, also..." sentences documenting incremental `/status` additions (v2.1.221, v2.1.243, v2.1.278, v2.1.282, v2.1.326). This is a direct continuation of that running list.

## Plan
1. Open `src/pages/practices.html`.
2. In the `/status` row (~line 1912), append a new sentence before the closing `</td></tr>`:
   ```
    As of v2.1.327, also lists broken agent, skill, command, and output style files, keybinding errors, an unavailable sandbox, ignored permission settings, and hook matchers that never match.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `/status` row documents the v2.1.327 diagnostics list.
- HTML is valid (no unclosed tags).
