# CBP-189 — Add `MessageDisplay` hook event to Hooks Deep Dive events table

## Summary
Claude Code v2.1.152 added a `MessageDisplay` hook event that lets hooks transform or hide assistant message text as it is displayed. This is a new hook lifecycle event not yet in the playbook.

## Assessment
The hooks events table is at lines 6606–6664 in `fsad-playbook.html`. It is divided into sub-tables:
- Session hooks (SessionStart, SessionEnd, InstructionsLoaded, UserPromptSubmit, Stop, StopFailure)
- Tool hooks (PreToolUse, PostToolUse, PostToolUseFailure, PermissionRequest, PermissionDenied)
- Agent hooks (SubagentStart, SubagentStop, TaskCreated, TaskCompleted, TeammateIdle)
- Environment hooks (ConfigChange, CwdChanged, FileChanged, WorktreeCreate, WorktreeRemove, PreCompact, PostCompact, Elicitation, ElicitationResult, Notification)

`MessageDisplay` fires when an assistant message is about to be shown to the user. It best fits in the session-level hooks sub-table (alongside Stop/StopFailure) since it fires on output display. Add it after `StopFailure`.

`MessageDisplay` is NOT currently in any hook table. Confirmed by search.

## Plan
1. Edit the session hooks sub-table at line 6615 — add a new row after `StopFailure`:
   `<tr><td><code>MessageDisplay</code></td><td>When an assistant message is displayed — hooks can transform or hide the displayed text</td></tr>`

## Acceptance Criteria
- `MessageDisplay` row appears in the session hooks sub-table, after `StopFailure`
- Description explains transform/hide capability
- No other table rows are disturbed
