# CBP-186 — Update `/diff` Cheat Sheet row: keyboard scrolling in detail view

## Summary
Claude Code v2.1.149 added keyboard scrolling to the `/diff` detail view. Users can now scroll with arrow keys, `j`/`k`, `PgUp`/`PgDn`, `Space`, `Home`/`End`.

## Assessment
The `/diff` row at line 6394 currently reads:

```
Open interactive diff viewer
```

This is minimal. It needs to document the keyboard scrolling capability added in v2.1.149.

## Plan
1. Read line 6394 of `fsad-playbook.html`
2. Edit the `/diff` row td to expand the description to include keyboard scrolling:
   - New content: `Open interactive diff viewer. The detail view supports keyboard scrolling: arrow keys, <code>j</code>/<code>k</code>, <code>PgUp</code>/<code>PgDn</code>, <code>Space</code>, <code>Home</code>/<code>End</code> (v2.1.149).`

## Acceptance Criteria
- The `/diff` Cheat Sheet row mentions keyboard scrolling with the specific key bindings.
- HTML uses `<code>` tags for key names consistently.
