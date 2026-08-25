# CBP-444 — `/status`: `Skipped sources` line + GitHub-connected line

## Summary
Claude Code v2.1.243 added two new lines to `/status` output: (1) a `Skipped sources` line listing managed settings sources (e.g. `managed-settings.json`) present but not applied because a higher-precedence managed source is active, and (2) a line showing whether GitHub is connected for Claude Code on the web (Pro/Max), pointing to `/web-setup` when it isn't.

## Assessment
The Cheat Sheet `/status` row (line 11080) already has one versioned note (v2.1.221, session kind). This adds a second and third note to the same row, continuing the established chained-notes pattern.

## Plan
1. In `fsad-playbook.html`, locate the `/status` Cheat Sheet row (line 11080):
   ```html
   <tr><td><code>/status</code></td><td>Show session config and token usage metrics. As of v2.1.221, also displays the session kind: <code>interactive</code>, or a background job that is <code>attached</code> or <code>unattended</code>.</td></tr>
   ```
2. Append to the end of its `<td>` (before `</td></tr>`):
   ```html
    As of v2.1.243, also shows a <code>Skipped sources</code> line listing managed settings sources (e.g. <code>managed-settings.json</code>) present but not applied because a higher-precedence managed source is active, and a line showing whether GitHub is connected for Claude Code on the web (Pro/Max) — pointing to <code>/web-setup</code> when it isn't.
   ```

## Acceptance Criteria
- [ ] `/status` row documents both new v2.1.243 lines.
- [ ] Row remains a single well-formed `<tr>`.
