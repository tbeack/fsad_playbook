# CBP-243 — Update `claude agents --json` row: `--all` flag + new `id`/`state` fields

## Summary
Claude Code v2.1.169 fixed `claude agents --json` to no longer omit blocked and just-dispatched background sessions. It also added an `--all` flag to include completed sessions in the JSON output, plus two new fields in each session object: `id` and `state`.

## Assessment
- **`claude agents` row** already exists in the playbook at line 9870 (Cheat Sheet, Info & account table).
- Current description includes `--json` flag with `waitingFor` field, but does not mention `--all` or the new `id`/`state` fields.
- This is an **Update existing** task.

## Plan

### Step 1 — Read the current `claude agents` row
Current text at line 9870:
```
Add <code>--json</code> to output the session list as JSON for scripting (tmux-resurrect, status bars, session pickers); the JSON output includes <code>waitingFor</code> showing what a blocked session is waiting on (e.g. a permission prompt) (v2.1.162).
```

### Step 2 — Update the row
Extend the `--json` description to include:
- Blocked and just-dispatched sessions are now always included
- Add `--all` flag to include completed sessions
- JSON output now also includes `id` and `state` fields

New text for the `--json` portion:
```
Add <code>--json</code> to output the session list as JSON for scripting (tmux-resurrect, status bars, session pickers); the JSON output includes <code>waitingFor</code> (what a blocked session is waiting on), <code>id</code>, and <code>state</code> fields (v2.1.162/v2.1.169). Add <code>--all</code> to include completed sessions in the output (v2.1.169).
```

## Acceptance Criteria
- `claude agents` Cheat Sheet row mentions `--all` flag for completed sessions
- `id` and `state` fields documented in the JSON output description
- Version references updated to include v2.1.169
- No other content in the row is altered
