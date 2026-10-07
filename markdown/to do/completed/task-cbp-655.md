# CBP-655 — Add `/claude-api managed-agents-onboard` to slash commands cheat sheet

## Summary
Claude Code v2.1.290 added two new `/claude-api` sub-commands:
- `/claude-api managed-agents-onboard <url>` — sets up the Managed Agents pattern described at the given URL as `ant apply` files
- `/claude-api managed-agents-onboard <quickstart-name>` — builds a Console quickstart template (e.g., `deep-researcher`) with the `ant` CLI

## Assessment
The playbook already documents `/claude-api upgrade` (line 1890) and `/claude-api cost-optimize` (line 1891) in `src/pages/practices.html`. The new `managed-agents-onboard` sub-command is not present. It should be added as a new `<tr>` row immediately after the `/claude-api cost-optimize` row.

## Plan
1. Read `src/pages/practices.html` around line 1891 to confirm surrounding HTML.
2. Insert a new `<tr>` row after line 1891:
   ```html
   <tr><td><code>/claude-api managed-agents-onboard</code></td><td>Set up the Managed Agents pattern from a docs URL (<code>/claude-api managed-agents-onboard &lt;url&gt;</code>) or build a Console quickstart template such as <code>deep-researcher</code> by name (<code>/claude-api managed-agents-onboard &lt;quickstart-name&gt;</code>) (v2.1.290)</td></tr>
   ```
3. Run `python3 scripts/build-source.py` to confirm the build passes.

## Acceptance Criteria
- The new row appears in the cheat sheet table after `/claude-api cost-optimize`.
- The build script completes without errors.
- HTML is valid (no unclosed tags).
