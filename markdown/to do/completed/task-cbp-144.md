# CBP-144 — Add `ANTHROPIC_WORKSPACE_ID` to Subprocess Sandboxing hardening env vars table

## Summary
Claude Code v2.1.141 added `ANTHROPIC_WORKSPACE_ID` — an environment variable for workload identity federation. When set, it scopes the minted authentication token to a specific workspace, which matters when a federation rule covers more than one workspace. This is an enterprise/managed deployment concern.

## Assessment
The Subprocess Sandboxing hardening env vars table is the natural home for this, alongside the other `ANTHROPIC_*` deployment env vars. Currently: **not documented anywhere in the playbook**.

## Plan
1. Locate the hardening env vars tbody.
2. Add `ANTHROPIC_WORKSPACE_ID` row after `CLAUDE_CODE_PLUGIN_PREFER_HTTPS`.
3. Mark CBP-144 complete in todo.md.

## Acceptance Criteria
- `ANTHROPIC_WORKSPACE_ID` appears in the Subprocess Sandboxing hardening env vars table.
- The description mentions workload identity federation and workspace scoping.
- No HTML is broken.
