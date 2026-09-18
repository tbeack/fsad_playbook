# CBP-575 — Add scheduled/Run-now routine artifact auto-approval note (v2.1.275)

**Source:** Claude Code v2.1.275
**Tag:** [Claude]

## Summary
v2.1.275 changes scheduled and Run-now routine runs to save data to, and republish the page of, an artifact the account can already edit without asking each time; public artifacts, first publishes, and deletes still ask.

## Assessment
The Notable settings.json Keys callout in `src/pages/practices.html` already carries a related Artifact-permission bullet ("WebFetch rules do not gate Artifact reads", v2.1.268). Add this as a new bullet in the same section, right after it, since it's the same permission surface (unattended-run Artifact behavior).

## Plan
1. Open `src/pages/practices.html`
2. Insert a new bullet after the "WebFetch rules do not gate Artifact reads" bullet in Notable settings.json Keys
3. Mark CBP-575 complete in `markdown/to do/todo.md`

## Acceptance Criteria
- Notable settings.json Keys documents the v2.1.275 scheduled/Run-now artifact auto-approval behavior, including the public/first-publish/delete exceptions
- Build passes without errors
