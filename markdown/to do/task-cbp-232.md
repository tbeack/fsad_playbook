# CBP-232 — Update Stop and SubagentStop hook rows: `hookSpecificOutput.additionalContext`

## Summary
Claude Code v2.1.163 added the ability for `Stop` and `SubagentStop` hooks to return `hookSpecificOutput.additionalContext` in their JSON output. This gives Claude feedback and keeps the turn going — without being labeled a hook error. This is distinct from `continueOnBlock` (which requires exit code 2).

## Assessment
- **Stop hook row** (line 9876): Does not mention `hookSpecificOutput.additionalContext`.
- **SubagentStop hook row** (line 9903): Does not mention `hookSpecificOutput.additionalContext`.
- **Action needed:** Append a note to both rows.

## Plan

### Step 1 — Update Stop hook row
Append: `Return <code>hookSpecificOutput.additionalContext</code> in JSON output to give Claude feedback and keep the turn going — without triggering a hook error.`

### Step 2 — Update SubagentStop hook row
Append: `Return <code>hookSpecificOutput.additionalContext</code> to give Claude feedback and continue the turn without a hook error.`

## Acceptance Criteria
- Both Stop and SubagentStop hook rows mention `hookSpecificOutput.additionalContext`
- No HTML broken
