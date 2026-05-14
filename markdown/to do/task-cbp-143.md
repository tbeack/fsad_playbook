# CBP-143 — Add `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` to Subprocess Sandboxing env vars table

## Summary
Claude Code v2.1.141 added `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` — when set, Claude Code clones GitHub plugin sources over HTTPS instead of SSH. This is useful for environments where a GitHub SSH key is not configured (CI/CD, containers, managed desktops).

## Assessment
The Subprocess Sandboxing collapsible (`id="power-usage--subprocess-sandboxing"`) has a hardening env vars table. `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` fits here alongside other env vars for managed environments. Currently: **not documented anywhere in the playbook**.

## Plan
1. Locate the hardening env vars tbody (after `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN`).
2. Add `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` row to the table.
3. Mark CBP-143 complete in todo.md.

## Acceptance Criteria
- `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` appears in the Subprocess Sandboxing hardening env vars table.
- The description explains the HTTPS vs SSH context clearly.
- No HTML is broken.
