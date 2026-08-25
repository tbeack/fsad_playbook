# CBP-442 — `/tasks`: model + effort level shown per subagent

## Summary
Claude Code v2.1.243 added the model (and effort level) each subagent ran on to `/tasks` and the agent detail dialogs — useful for auditing which model/effort a background or subagent task actually used.

## Assessment
The Cheat Sheet `/tasks` row (line 11017) is currently a bare one-liner with no version notes at all: `List and manage background tasks (alias: /bashes)`. This is its first enrichment.

## Plan
1. In `fsad-playbook.html`, locate the `/tasks` Cheat Sheet row (line 11017):
   ```html
   <tr><td><code>/tasks</code></td><td>List and manage background tasks (alias: <code>/bashes</code>)</td></tr>
   ```
2. Replace with:
   ```html
   <tr><td><code>/tasks</code></td><td>List and manage background tasks (alias: <code>/bashes</code>). As of v2.1.243, each subagent's row and its detail dialog show the model (and effort level) it ran on.</td></tr>
   ```

## Acceptance Criteria
- [ ] `/tasks` row updated with the v2.1.243 model/effort visibility note.
- [ ] Row remains a single well-formed `<tr><td>...</td><td>...</td></tr>`.
