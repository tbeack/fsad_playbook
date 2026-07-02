# CBP-290 — Update `Notification` hook event row

## Summary
Claude Code v2.1.198 wired background agent sessions in `claude agents` to the `Notification` hook. Two new event types fire: `agent_needs_input` (session waiting for user input) and `agent_completed` (session finished).

## Assessment
**Line 10157** of `fsad-playbook.html` has:
```html
<tr><td><code>Notification</code></td><td>When a notification event fires</td></tr>
```
The description is generic and does not enumerate the event types. The two new agent event types (`agent_needs_input`, `agent_completed`) are high-value for teams running background agents because they can wire desktop notifications or Slack alerts.

## Plan
1. Read fsad-playbook.html around line 10157
2. Update the `Notification` row to add the event types as inline code in the description:
   - Existing: "When a notification event fires"
   - Updated: "When a notification event fires. Agent events (v2.1.198): `agent_needs_input` — session awaiting input; `agent_completed` — session finished."

## Acceptance Criteria
- `Notification` row description enumerates `agent_needs_input` and `agent_completed` event types
- Version reference `v2.1.198` included
