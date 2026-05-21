# CBP-176 — Add `background_tasks` and `session_crons` to Stop/SubagentStop hook rows (v2.1.145)

## Summary
Claude Code v2.1.145 added two new fields to the JSON input delivered to Stop and SubagentStop hooks: `background_tasks` (list of active background tasks) and `session_crons` (scheduled session crons). Hooks can now inspect these fields when deciding whether to request continuation or take action.

## Assessment
The Stop and SubagentStop hook rows exist at lines 6455 and 6481. Neither mentions the new hook input fields. Adding this to the row descriptions is the most discoverable place for hook authors.

**Action:** Update both hook rows to document the new fields.

## Plan

1. Update Stop row (line 6455):
   - Current: `<tr><td><code>Stop</code></td><td>When Claude finishes its complete response</td></tr>`
   - New: append field info

2. Update SubagentStop row (line 6481):
   - Current: `<tr><td><code>SubagentStop</code></td><td>When a subagent finishes</td></tr>`
   - New: append field info

**New Stop row:**
```html
<tr><td><code>Stop</code></td><td>When Claude finishes its complete response. Hook input includes <code>background_tasks</code> and <code>session_crons</code> fields listing active background work and scheduled crons.</td></tr>
```

**New SubagentStop row:**
```html
<tr><td><code>SubagentStop</code></td><td>When a subagent finishes. Hook input includes <code>background_tasks</code> and <code>session_crons</code> fields.</td></tr>
```

## Acceptance Criteria
- Stop hook row mentions `background_tasks` and `session_crons`
- SubagentStop hook row mentions both fields
- No surrounding content is changed
