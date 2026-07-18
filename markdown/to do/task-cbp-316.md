# CBP-316 — Update SessionStart hook row to document `source: "fork"` field

## Summary

Claude Code v2.1.214 changed the SessionStart hook payload: when a session begins as a fork (via the `/fork` command), the hook now reports `source: "fork"` instead of `source: "resume"`. Previously, forked sessions were indistinguishable from resumed sessions from the hook's perspective. Hook authors who branch on the `source` field need to know this.

## Assessment

The SessionStart row in the Core hooks table (line 10116 of fsad-playbook.html) reads:

> "When a session begins or resumes. Return `reloadSkills: true` in JSON output to re-scan skill directories (skills installed by the hook become available immediately). Set session title via `hookSpecificOutput.sessionTitle`."

The row does not document the `source` payload field at all. The v2.1.214 change introduces a third source value — `"fork"` — alongside the existing `"new"` (first launch) and `"resume"` (resume of prior session) values.

**Action: Update the SessionStart row to mention the `source` field and its three values — "Update existing".**

## Plan

1. Read fsad-playbook.html line 10116 to confirm exact current text
2. Edit the SessionStart row to append a sentence documenting the `source` field:
   - Append to the existing cell text: ` Hook input includes a <code>source</code> field: <code>"new"</code> (first launch), <code>"resume"</code> (resumed session), or <code>"fork"</code> (started via <code>/fork</code> — v2.1.214).`
3. Mark task complete in todo.md

## Acceptance Criteria

- The SessionStart row mentions the `source` field with all three values
- The `"fork"` value is noted as new in v2.1.214
- The existing content (reloadSkills, sessionTitle) is preserved
- No other rows are disturbed
