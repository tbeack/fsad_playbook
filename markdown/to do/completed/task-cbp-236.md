# CBP-236 — Prefix Claude update tasks in todo.md with `[Claude]`

## Source

User request — parity with the existing `[Codex]` convention already applied to Codex CLI tasks.

## Summary

The auto-updater agent already prefixes Codex CLI tasks with `[Codex]` in `todo.md`. Claude Code tasks have no equivalent prefix, making it hard to tell at a glance which tasks originated from automated Claude Code updates vs. other sources. This task adds `[Claude]` to the todo entry format for Claude Code tasks, matching the Codex convention.

## Assessment

Two agent files need updating:

1. **`markdown/agents/auto_update_agent.md`** (project source of truth, covers Claude Code + Codex) — Phase 4, Step 2a. Current format:
   ```
   - [ ] `CBP-###` [Description] → [task-cbp-###.md](task-cbp-###.md)
   ```
   Codex tasks on Step 3a already have `[Codex]`:
   ```
   - [ ] `CBP-###` [Codex] [Description] → [task-cbp-###.md](task-cbp-###.md)
   ```
   Claude tasks need `[Claude]` added analogously.

2. **`~/.claude/agents/cbp-update/agent.md`** (installed running agent, Claude Code only) — Phase 4, Step 2b. Same format change needed.

No HTML changes required. No version bump needed (agent instruction file only, no playbook content changes).

**Location:**
- `markdown/agents/auto_update_agent.md` — Phase 4, line ~106
- `~/.claude/agents/cbp-update/agent.md` — Phase 4, line ~105

## Plan

1. Edit `markdown/agents/auto_update_agent.md` Phase 4 Step 2a: change the todo entry template from `` `CBP-###` [Description] `` to `` `CBP-###` [Claude] [Description] ``
2. Edit `~/.claude/agents/cbp-update/agent.md` Phase 4 Step 2b: same change

All criteria verified 2026-06-05 before commit.

## Acceptance Criteria

- [x] `markdown/agents/auto_update_agent.md` Phase 4 Step 2a todo entry template includes `[Claude]` before the description
- [x] `~/.claude/agents/cbp-update/agent.md` Phase 4 Step 2b todo entry template includes `[Claude]` before the description
- [x] The `[Codex]` prefix in `auto_update_agent.md` Phase 4 Step 3a is unchanged
- [x] No other formatting changes are introduced
