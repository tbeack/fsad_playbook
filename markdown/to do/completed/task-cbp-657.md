# CBP-657 — Update `claude attach / logs` row to mention partial session name support

## Summary
Claude Code v2.1.290 added support for using a partial session name in place of the full session id for `claude attach <name>` and `claude logs <name>`. Previously only the full id worked.

## Assessment
The playbook has the `claude attach` row at line 1888 in `src/pages/practices.html`. The current description says `<id>` in the row header, implying only a full id works. The description text does not mention partial names. A small update is needed to note that a partial name now works as an alias.

## Plan
1. Read `src/pages/practices.html` around line 1888 to confirm surrounding HTML.
2. Update the row heading and description:
   - Old heading: `<code>claude attach</code> / <code>logs</code> / <code>stop</code> / <code>respawn</code> / <code>rm</code> <code>&lt;id&gt;</code>`
   - New heading: `<code>claude attach</code> / <code>logs</code> / <code>stop</code> / <code>respawn</code> / <code>rm</code> <code>&lt;id|name&gt;</code>`
   - Add to end of description: ` As of v2.1.290, a partial session name works in place of the full id for <code>attach</code> and <code>logs</code>.`
3. Run `python3 scripts/build-source.py` to confirm the build passes.

## Acceptance Criteria
- The row header shows `<id|name>` instead of `<id>`.
- The description notes partial name support.
- Build passes.
