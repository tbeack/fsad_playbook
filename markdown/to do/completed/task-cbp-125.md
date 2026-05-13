# CBP-125 — Add `effort.level` JSON field and `$CLAUDE_EFFORT` env var to hooks env vars table (v2.1.133)

## Summary

Claude Code v2.1.133 added two new ways for hooks to read the active effort level:
- `effort.level` — a field in the JSON input delivered to every hook via stdin (same JSON object that already contains `session_id`, `tool_name`, etc.)
- `$CLAUDE_EFFORT` — an environment variable available to Bash tool subprocess commands (not just hooks, but also any Bash command Claude runs)

This lets hooks branch behavior based on effort level — for example, a PostToolUse hook that runs more thorough linting at `max` effort, or a Bash command that skips slow checks at `low`.

## Assessment

The hooks env vars table lives at approximately line 7181–7193 of `fsad-playbook.html`. It currently has 5 rows:
- `CLAUDE_PROJECT_DIR`
- `CLAUDE_ENV_FILE`
- `CLAUDE_PLUGIN_ROOT`
- `CLAUDE_PLUGIN_DATA`
- `CLAUDE_CODE_SESSION_ID`

`$CLAUDE_EFFORT` is **not** in this table. The `effort.level` JSON input field is also not mentioned anywhere in the hooks section.

Note: `${CLAUDE_EFFORT}` is already documented as a skill string substitution variable at line 5579, but that is the skills context, not the hooks context. They are separate use cases.

## Plan

1. Read lines 7181–7193 of `fsad-playbook.html` to confirm exact table structure.
2. Add a new row for `$CLAUDE_EFFORT` to the hooks env vars table, after `CLAUDE_CODE_SESSION_ID`.
3. Add a note below the table about the `effort.level` JSON input field being available in hook stdin.

## Acceptance Criteria

- [ ] `$CLAUDE_EFFORT` row appears in the hooks environment variables table
- [ ] Row description explains it holds the current effort level (`low` | `medium` | `high` | `xhigh` | `max`) and is available in Bash tool subprocess commands
- [ ] A note about `effort.level` in the hook JSON input is added below the table
- [ ] No existing rows are changed or removed
- [ ] Styling matches existing table rows
