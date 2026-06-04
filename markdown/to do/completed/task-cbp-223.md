# CBP-223 — Update `claude agents --json` row: add `waitingFor` field (v2.1.162)

## Summary

Claude Code v2.1.162 added a `waitingFor` field to the JSON output of `claude agents --json`. This field shows what a waiting session is blocked on — for example, a pending permission prompt. This makes the JSON output more useful for automation scripts that need to distinguish between sessions that are blocked vs. sessions that are actively running.

## Assessment

**Does this content exist in the playbook?**
Yes — the `claude agents` Cheat Sheet row exists at line 9735. It already documents the `--json` flag with use cases (tmux-resurrect, status bars, session pickers). It does not mention the `waitingFor` field.

**What needs to change:**
Append a brief note to the `--json` description in the `claude agents` row explaining that the JSON output now includes `waitingFor` to show what a blocked session is waiting on (e.g. a permission prompt).

## Plan

1. Read line 9735 of `fsad-playbook.html` to confirm the current text.
2. Edit the `claude agents` row to append: `The JSON output includes <code>waitingFor</code> to show what a blocked session is waiting on (e.g. a permission prompt) (v2.1.162).`
3. Mark task complete in `todo.md`.

## Acceptance Criteria

- The `claude agents` row in the Cheat Sheet mentions `waitingFor` in the `--json` description.
- No other content is modified.
- HTML is valid and renders correctly.
