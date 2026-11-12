# CBP-710: Add `/claude-api api-version` to slash commands table

## Summary
Claude Code v2.1.307 added a new `/claude-api api-version` subcommand. It moves a project's Claude API code to the current API version (`2026-10-21`). The playbook's `/claude-api` sub-group currently lists four commands: `/claude-api upgrade`, `/claude-api cost-optimize`, `/claude-api managed-agents-onboard`, and `/claude-api managed-agents-secure`. This new command is missing.

## Assessment
The content does not exist in the playbook. The `/claude-api` group lives in `src/pages/practices.html` around line 1893. The last row in the group is:
```html
<tr><td><code>/claude-api managed-agents-secure</code></td><td>Compare a Managed Agents agent's settings against Anthropic's published security guide, without changing anything (v2.1.304).</td></tr>
```
A new row must be inserted after this one.

## Plan
1. Open `src/pages/practices.html`.
2. Find the line with `/claude-api managed-agents-secure`.
3. Insert a new `<tr>` row after it:
   ```html
   <tr><td><code>/claude-api api-version</code></td><td>Move a project's Claude API code to the current API version (<code>2026-10-21</code>) (v2.1.307).</td></tr>
   ```

## Acceptance Criteria
- The row appears in the `/claude-api` sub-group of the slash commands table.
- The description matches the release note accurately.
- No other rows are disturbed.
