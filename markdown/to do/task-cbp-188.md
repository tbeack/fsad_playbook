# CBP-188 — Update `claude agents` Cheat Sheet row: `Ctrl+T` pinned sessions

## Summary
Claude Code v2.1.147 added pinned background sessions to the `claude agents` view. Pressing `Ctrl+T` in the agents view pins a session so it stays alive when idle, gets restarted in place when Claude Code updates, and is only shed under memory pressure after non-pinned sessions.

## Assessment
The `claude agents` row at line 6486 currently documents `--cwd`, `--json`, and the dispatch flags but makes no mention of pinning behavior.

The existing row is long. Add a concise note about `Ctrl+T` pinning at the end of the existing description.

## Plan
1. Read line 6486 of `fsad-playbook.html`
2. Edit the `claude agents` row td to append a pinning note:
   - After the dispatch flags sentence, add: `In the agents view, press <kbd>Ctrl+T</kbd> to pin a session — pinned sessions stay alive when idle, restart in place on updates, and are shed last under memory pressure (v2.1.147).`

## Acceptance Criteria
- The `claude agents` row mentions `Ctrl+T` pinning with the three key behaviors: stays alive, restarts on update, shed last.
- Existing content about `--cwd`, `--json`, and dispatch flags is preserved.
- Uses `<kbd>` tag for the key binding consistent with the keyboard shortcuts table.
