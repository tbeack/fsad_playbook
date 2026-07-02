# CBP-289 — Update `/agents` Cheat Sheet row (wizard removed)

## Summary
Claude Code v2.1.198 removed the `/agents` wizard. The new guidance is: "ask Claude to create or manage subagents, or edit `.claude/agents/` directly."

## Assessment
**Line 9916** of `fsad-playbook.html` has:
```html
<tr><td><code>/agents</code></td><td>Browse agent library and manage live subagents (Running + Library tabs)</td></tr>
```
This description references the old wizard UI (Running + Library tabs browsing flow) and is now stale. The wizard is gone. The row needs to be updated to reflect that `/agents` no longer opens a wizard — instead users ask Claude or edit `.claude/agents/` directly.

## Plan
1. Read fsad-playbook.html around line 9916
2. Update the `/agents` row description to:
   - Remove reference to "Running + Library tabs" wizard
   - Add note that the wizard is removed — ask Claude to create/manage subagents, or edit `.claude/agents/` directly
   - Keep the row concise and practical

## Acceptance Criteria
- The `/agents` row no longer mentions "Browse agent library" or "Running + Library tabs"
- Row includes clear guidance: ask Claude or edit `.claude/agents/` directly
- Version note added (v2.1.198)
