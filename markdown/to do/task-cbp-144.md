# CBP-144 — Add `ANTHROPIC_WORKSPACE_ID` to Subprocess Sandboxing table

## Summary
Claude Code v2.1.141 added `ANTHROPIC_WORKSPACE_ID` for workload identity federation. When a federation rule covers more than one workspace, setting this env var scopes the minted token to the specified workspace. This is relevant for enterprise multi-workspace Anthropic API deployments.

## Assessment
Same table as CBP-143 — the Subprocess Sandboxing env vars table. `ANTHROPIC_WORKSPACE_ID` is an authentication/identity var; it should be added to the same table.

No current mention of `ANTHROPIC_WORKSPACE_ID` exists in the playbook.

## Plan
1. Confirm lines 6978–6985 (same read as CBP-143 — can be done together)
2. Insert a new `<tr>` row before `</tbody>`, after the CBP-143 row (or alongside it)
3. Row content: `ANTHROPIC_WORKSPACE_ID` | description about workload identity federation workspace scoping

## Acceptance Criteria
- The env var table in Subprocess Sandboxing includes `ANTHROPIC_WORKSPACE_ID`
- The description explains workload identity federation workspace scoping
- The table's existing rows are unchanged
