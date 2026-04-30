# CBP-059 — Add DISABLE_UPDATES env var to Subprocess Sandboxing

## Summary
Claude Code v2.1.118 added `DISABLE_UPDATES` as an env var that completely blocks all update paths including manual `claude update`. It is stricter than `DISABLE_AUTOUPDATER` — the existing var only disabled auto-updates, while `DISABLE_UPDATES` also blocks manual updates. This is important for managed/enterprise deployments that want to pin versions.

## Assessment
The "Subprocess Sandboxing" collapsible (around lines 5664–5694 of fsad-playbook.html) already has an env vars table with `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` and `CLAUDE_CODE_SCRIPT_CAPS=N`. The `DISABLE_UPDATES` var is a deployment/management concern that fits best in this section since it's also an env var for controlled environments. Alternatively it could be a new row in the same table.

## Plan
1. Add `DISABLE_UPDATES=1` as a new row in the Subprocess Sandboxing env vars table
2. Note it is stricter than `DISABLE_AUTOUPDATER` (blocks manual updates too) — useful for enterprise/managed deployments

## Acceptance Criteria
- `DISABLE_UPDATES` row added with a clear description differentiating it from `DISABLE_AUTOUPDATER`
- Table still renders correctly
