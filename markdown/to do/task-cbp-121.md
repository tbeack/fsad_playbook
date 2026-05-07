# CBP-121 — [Codex] Add `/hooks` slash command to Cheat Sheet and update Hooks section with TUI browser + compaction events (v0.129.0)

## Summary
Codex v0.129.0 added:
1. A `/hooks` TUI browser where hooks can be viewed and toggled without editing config files.
2. Hooks can now fire **before/after compaction** (PreCompact and PostCompact events) — the playbook's hooks event table currently lists only 6 event types and is missing these.
3. `PreToolUse` hooks can now inject additional context (add context field to the event output).

## Assessment
- Codex Cheat Sheet slash commands table (line ~8916): `/hooks` is NOT listed — needs adding.
- Codex Hooks section event types table (line ~8740): currently has 6 rows (SessionStart, UserPromptSubmit, PreToolUse, PermissionRequest, PostToolUse, Stop) — missing `PreCompact` and `PostCompact`.
- The PreToolUse row description says "Before Bash, apply_patch, or MCP tool runs" — should note context injection capability.

## Plan

### Step 1 — Add `/hooks` to Codex Cheat Sheet
In the Codex slash commands table tbody (around line 8916), add after the `/statusline` row:
```html
<tr><td><code>/hooks</code></td><td>Browse and toggle configured hooks from the TUI without editing config files</td></tr>
```

### Step 2 — Add PreCompact and PostCompact to the Codex hooks event types table
In the Codex hooks event types table tbody (line ~8742), add two rows after the `Stop` row:
```html
<tr><td><code>PreCompact</code></td><td>Before context compaction runs</td><td>Yes (exit 2 blocks compaction)</td><td><code>PreCompact</code></td></tr>
<tr><td><code>PostCompact</code></td><td>After context compaction completes</td><td>No</td><td><code>PostCompact</code></td></tr>
```

### Step 3 — Update PreToolUse row to mention context injection
Update the PreToolUse row description from:
  "Before Bash, `apply_patch`, or MCP tool runs"
to:
  "Before Bash, `apply_patch`, or MCP tool runs; hooks can inject additional context into the turn by returning a `context` field in JSON output"

### Step 4 — Update the comparison table (line ~8042) that says "6 event types"
Find: "6 event types (SessionStart, PreToolUse, PermissionRequest, PostToolUse, UserPromptSubmit, Stop)"
Replace with: "8 event types (SessionStart, UserPromptSubmit, PreToolUse, PermissionRequest, PostToolUse, Stop, PreCompact, PostCompact)"

## Acceptance Criteria
- `/hooks` appears in Codex Cheat Sheet slash commands table.
- PreCompact and PostCompact rows appear in the Codex Hooks event types table.
- The comparison table reflects 8 hook event types.
- No HTML broken.
