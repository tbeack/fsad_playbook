# CBP-175 — Add `claude agents --json` to Cheat Sheet (v2.1.145)

## Summary
Claude Code v2.1.145 added `claude agents --json`, a new flag that outputs all live Claude Code sessions as JSON. Designed for scripting use cases: tmux-resurrect session restore, status bars, session pickers, and any shell automation that needs to enumerate active sessions programmatically.

## Assessment
The `claude agents` row exists at line 6327. It currently documents `--cwd <path>` and eight dispatch flags. The `--json` flag is not mentioned. This is a useful addition for power users who script around Claude Code.

**Action:** Update the `claude agents` row to append the `--json` flag description.

## Plan

Update line 6327. Append: ` Add <code>--json</code> to output the session list as JSON for scripting (tmux-resurrect, status bars, session pickers).` after the `--cwd` sentence.

**Current row:**
```
Agent View — a unified list of every Claude Code session: running, blocked on you, or done. Use <code>--cwd &lt;path&gt;</code> to scope the list to a directory. When dispatching a background session, configure it with: ...
```

**New row:** insert ` Add <code>--json</code> to output the session list as JSON for scripting (tmux-resurrect, status bars, session pickers).` between the `--cwd` sentence and the "When dispatching" sentence.

## Acceptance Criteria
- `claude agents` row mentions `--json`
- Explains JSON output for scripting use cases
- Existing content (--cwd, dispatch flags) is preserved
