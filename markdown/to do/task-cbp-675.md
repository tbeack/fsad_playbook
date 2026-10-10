# CBP-675 — Add `CLAUDE_CODE_OVERLOADED_RETRY_MAX_DELAY_MS` env var (v2.1.296)

## Summary
Claude Code v2.1.296 added `CLAUDE_CODE_OVERLOADED_RETRY_MAX_DELAY_MS` — sets the maximum delay cap for the exponential backoff when retrying an overloaded (529) request. Complements the existing `CLAUDE_CODE_OVERLOADED_RETRY_BASE_DELAY_MS` (base delay) and `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` (total watchdog wait).

## Assessment
Not present in `src/pages/practices.html`. The related vars are at lines 2745–2746. Insert immediately after `CLAUDE_CODE_OVERLOADED_RETRY_BASE_DELAY_MS` (line 2746) to keep the overload retry group together.

## Plan
1. In `src/pages/practices.html`, add a new `<tr>` row after the `CLAUDE_CODE_OVERLOADED_RETRY_BASE_DELAY_MS` row (line 2746):
   ```html
   <tr><td><code>CLAUDE_CODE_OVERLOADED_RETRY_MAX_DELAY_MS</code></td><td>Sets the maximum delay cap for the exponential backoff when retrying an overloaded (529) request. Pairs with <code>CLAUDE_CODE_OVERLOADED_RETRY_BASE_DELAY_MS</code>. Set to an integer number of milliseconds. (v2.1.296)</td></tr>
   ```

## Acceptance Criteria
- The env vars table contains a row for `CLAUDE_CODE_OVERLOADED_RETRY_MAX_DELAY_MS`.
- The row appears near `CLAUDE_CODE_OVERLOADED_RETRY_BASE_DELAY_MS`.
- The description accurately reflects the changelog entry with the (v2.1.296) tag.
