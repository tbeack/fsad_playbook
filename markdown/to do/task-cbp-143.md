# CBP-143 — Add `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` to Subprocess Sandboxing table

## Summary
Claude Code v2.1.141 added the `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` environment variable. When set to `1`, it forces plugin source cloning from GitHub over HTTPS instead of SSH. This is useful in environments without a GitHub SSH key configured — e.g., CI/CD systems, corporate proxies that block SSH on port 22, or fresh developer machines.

## Assessment
The playbook's "Subprocess Sandboxing" section (inside the Power Usage page) contains an env var table ending at line 6980 with the last row being `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1`. This new variable belongs in that same table as a new row.

No current mention of `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` exists in the playbook.

## Plan
1. Read lines 6978–6985 to confirm exact location of the table's closing `</tbody>`
2. Insert a new `<tr>` row before `</tbody>` at the end of the table
3. Row content: `CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1` | description about forcing HTTPS cloning

## Acceptance Criteria
- The env var table in Subprocess Sandboxing includes `CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1`
- The description explains it forces HTTPS (not SSH) for GitHub plugin cloning
- The table's existing rows are unchanged
