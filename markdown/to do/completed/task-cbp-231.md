# CBP-231 — Update Stop and SubagentStop hook rows: additionalContext return (v2.1.163)

## Summary

Claude Code v2.1.163 extended the `Stop` and `SubagentStop` hook events: hooks can now return `hookSpecificOutput.additionalContext` in their JSON output to provide Claude with additional feedback and continue the current turn — without the response being labeled a hook error. This is distinct from requesting continuation (which uses a separate mechanism); `additionalContext` lets hooks inject context silently.

## Assessment

**Does this content exist in the playbook?** Partially.

- Line 9876: `Stop` row currently says: "When Claude finishes its complete response. Hook input includes `background_tasks` and `session_crons` fields listing active background work and scheduled crons."
- Line 9903: `SubagentStop` row currently says: "When a subagent finishes. Hook input includes `background_tasks` and `session_crons` fields."
- Line 12275: Summary hooks table `Stop` row: "When a turn completes | Yes — can request continuation | `Stop`"

Neither the cheat-sheet Core hooks table nor the Agent & task hooks table mention the `hookSpecificOutput.additionalContext` return capability.

**What needs to change:** Update both the `Stop` row (line 9876) and the `SubagentStop` row (line 9903) to mention that returning `hookSpecificOutput.additionalContext` injects context for Claude and keeps the turn going without triggering a hook error.

## Plan

### Step 1: Update `Stop` hook row (line 9876)

Current:
```html
<tr><td><code>Stop</code></td><td>When Claude finishes its complete response. Hook input includes <code>background_tasks</code> and <code>session_crons</code> fields listing active background work and scheduled crons.</td></tr>
```

New:
```html
<tr><td><code>Stop</code></td><td>When Claude finishes its complete response. Hook input includes <code>background_tasks</code> and <code>session_crons</code> fields listing active background work and scheduled crons. Return <code>hookSpecificOutput.additionalContext</code> in hook JSON output to inject context for Claude and continue the turn without a hook error.</td></tr>
```

### Step 2: Update `SubagentStop` hook row (line 9903)

Current:
```html
<tr><td><code>SubagentStop</code></td><td>When a subagent finishes. Hook input includes <code>background_tasks</code> and <code>session_crons</code> fields.</td></tr>
```

New:
```html
<tr><td><code>SubagentStop</code></td><td>When a subagent finishes. Hook input includes <code>background_tasks</code> and <code>session_crons</code> fields. Return <code>hookSpecificOutput.additionalContext</code> to give Claude feedback and keep the turn going without a hook error.</td></tr>
```

## Acceptance Criteria

- The `Stop` hook row in the Core lifecycle hooks table mentions `hookSpecificOutput.additionalContext`
- The `SubagentStop` hook row in the Agent & task hooks table mentions `hookSpecificOutput.additionalContext`
- No other table rows are affected
- HTML structure is unchanged
