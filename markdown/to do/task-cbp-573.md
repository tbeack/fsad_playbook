# CBP-573 — Add `/plugin install --marketplace` flag note to Plugins collapsible (v2.1.275)

**Source:** Claude Code v2.1.275
**Tag:** [Claude]

## Summary
v2.1.275 adds `/plugin install <plugin> --marketplace <source>`, which offers to add the marketplace before installing the plugin — no longer requires the marketplace to already be registered.

## Assessment
The Plugins collapsible in `src/pages/practices.html` lists CLI/command flags for `claude plugin install`/`update` (`--accept-command`, etc.) as individual bullets. Add this one in the same style, next to the other `plugin install` flag bullet.

## Plan
1. Open `src/pages/practices.html`
2. Insert a new bullet after the `--accept-command <sha256>` bullet in the Plugins collapsible
3. Mark CBP-573 complete in `markdown/to do/todo.md`

## Acceptance Criteria
- Plugins collapsible documents `/plugin install --marketplace`
- Build passes without errors
