# CBP-268 — Add `CLAUDE_CODE_RETRY_WATCHDOG` + updated `CLAUDE_CODE_MAX_RETRIES` cap to hardening env vars table

## Summary

Claude Code v2.1.186 changed `CLAUDE_CODE_MAX_RETRIES` to cap at 15 (previously uncapped) and introduced `CLAUDE_CODE_RETRY_WATCHDOG` as the recommended env var for unattended/CI sessions that need higher retry thresholds. This is an important note for teams running Claude Code in automation pipelines who were relying on `CLAUDE_CODE_MAX_RETRIES` without bound.

## Assessment

The hardening env vars table (Subprocess Sandboxing collapsible, around lines 10620–10631) does not contain either `CLAUDE_CODE_MAX_RETRIES` or `CLAUDE_CODE_RETRY_WATCHDOG`. The last row is `CLAUDE_CLIENT_PRESENCE_FILE` at line 10630. A new row (or two) should be added after it, before the closing `</tbody>` at line 10631.

## Plan

1. Read `fsad-playbook.html` lines 10628–10635 to confirm exact table close tags.
2. Add a new `<tr>` after the `CLAUDE_CLIENT_PRESENCE_FILE` row (line 10630) for `CLAUDE_CODE_RETRY_WATCHDOG`:
   - Content: `<code>CLAUDE_CODE_RETRY_WATCHDOG</code>` — For unattended / CI sessions that need more than 15 retries. Replaces the old unbounded <code>CLAUDE_CODE_MAX_RETRIES</code> for long-running automation. Set to an integer (e.g. <code>30</code>) to allow more retry attempts. <code>CLAUDE_CODE_MAX_RETRIES</code> is now capped at 15 and should not be set higher (v2.1.186).
3. Mark task complete in `todo.md`.

## Acceptance Criteria

- `CLAUDE_CODE_RETRY_WATCHDOG` appears in the hardening env vars table with a description that explains its role for unattended sessions.
- The cap on `CLAUDE_CODE_MAX_RETRIES` (15) is mentioned inline.
- No other content changed.
