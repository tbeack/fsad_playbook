# CBP-389 — Add a `/add-dir` cheat-sheet row covering mid-turn dialogs

## Source
Claude Code v2.1.234

## Summary
`/add-dir <path>` can now be used while Claude is working, and `/add-dir`,
`/autocompact`, `/theme`, `/help`, `/config` and `/advisor` dialogs open mid-turn
in the fullscreen TUI.

## Assessment
There is NO `/add-dir` slash-command row anywhere in the cheat sheet — only the CLI
flag `--add-dir` (~11100) and a passing mention in the DirectoryAdded hook row (~11249).
So this is a new row, not an edit. Best home is the "Session, context & history" table
(body ~10962-10975), inserted after the `/cd` row (~10968), its closest sibling
(working-directory management, also flagged mid-session-safe).

Deliberately NOT adding rows for `/autocompact` or `/advisor` — neither command exists
anywhere in the playbook, and introducing them here exceeds what this changelog line
warrants. They are named only as part of the mid-turn dialog clause.

## Plan
1. Locate the `/cd` row (~10968) in the Session, context & history table.
2. Insert a new `<tr>` after it for `/add-dir <path>`.
3. Describe adding a directory to the session, note it now works mid-turn, and add a
   short clause that the same mid-turn dialog behavior covers the other listed commands
   in the fullscreen TUI.

## Acceptance Criteria
- [ ] New `/add-dir` row exists in the Session, context & history table
- [ ] Row notes mid-turn usability
- [ ] Row names the other mid-turn fullscreen-TUI dialogs without adding rows for them
- [ ] Tagged (v2.1.234); `&lt;path&gt;` entity-escaped like sibling rows
