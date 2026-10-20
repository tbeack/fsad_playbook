# CBP-702 — Add `/claude-api managed-agents-secure` row to the cheat sheet

## Summary
Claude Code v2.1.304 added `/claude-api managed-agents-secure`, which compares a Managed Agents agent's settings with Anthropic's published security guide without changing anything.

## Assessment
The cheat sheet in `src/pages/practices.html` already has rows for `/claude-api upgrade`, `/claude-api cost-optimize`, and `/claude-api managed-agents-onboard` (line 1894). The new `managed-agents-secure` variant is missing. It belongs directly after the `managed-agents-onboard` row.

## Plan
1. Open `src/pages/practices.html`.
2. Find the row: `<tr><td><code>/claude-api managed-agents-onboard</code></td>...`.
3. Insert a new row immediately after it:
   ```html
   <tr><td><code>/claude-api managed-agents-secure</code></td><td>Compare a Managed Agents agent's settings with Anthropic's published security guide. Reports findings without changing anything (v2.1.304).</td></tr>
   ```

## Acceptance Criteria
- The new row appears in the cheat sheet directly after the `managed-agents-onboard` row.
- The description is accurate: read-only audit, no changes made.
- No broken HTML.
