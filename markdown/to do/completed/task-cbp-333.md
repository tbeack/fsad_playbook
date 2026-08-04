# CBP-333 — Add `DirectoryAdded` hook to Environment & context hooks table

**Source:** Claude Code v2.1.219
**Date:** 2026-07-25

## Summary

Claude Code v2.1.219 added a `DirectoryAdded` hook that fires after `/add-dir` or the SDK `register_repo_root` control request registers a new working directory mid-session. This allows hooks to run setup logic when a new repo root is registered.

## Assessment

**Does this content exist in the playbook? Where?**

The hooks section has four tables at around line 10286:
1. Core hooks (line 10288): SessionStart, SessionEnd, InstructionsLoaded, UserPromptSubmit, Stop, StopFailure, MessageDisplay
2. Tool & permission hooks (line 10304): PreToolUse, PostToolUse, PostToolUseFailure, PermissionRequest, PermissionDenied
3. Agent & task hooks (line 10318): SubagentStart, SubagentStop, TaskCreated, TaskCompleted, TeammateIdle
4. Environment & context hooks (line 10332): ConfigChange, CwdChanged, FileChanged, WorktreeCreate, WorktreeRemove, PreCompact, PostCompact, Elicitation, ElicitationResult, Notification

`DirectoryAdded` is not present. Total current count = 7 + 5 + 5 + 10 = 27 events.

The section heading (line 10287) reads "Hooks — Event Automation (27 Events)" and needs to be updated to 28.

**What needs to change:**
1. Add `DirectoryAdded` to the Environment & context hooks table (after `CwdChanged` is a logical fit, but appending at the end of the table also works)
2. Update heading from "27 Events" to "28 Events"

## Plan

### Step 1: Add `DirectoryAdded` to Environment & context hooks table
Insert after `CwdChanged` row (since it's about directory scope changes):
```html
<tr><td><code>DirectoryAdded</code></td><td>When a new working directory is registered mid-session — fires after <code>/add-dir</code> or the SDK <code>register_repo_root</code> control request adds a new repo root (v2.1.219).</td></tr>
```

### Step 2: Update event count in heading
Change `(27 Events)` → `(28 Events)` in the h3 heading at line 10287.

## Acceptance Criteria
- `DirectoryAdded` row appears in Environment & context hooks table
- Heading updates from 27 to 28 events
- HTML follows existing `<tr><td><code>HookName</code></td><td>description</td></tr>` pattern
