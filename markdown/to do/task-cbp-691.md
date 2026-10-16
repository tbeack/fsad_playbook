# CBP-691 — Add `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS` to env vars table (v2.1.301)

## Summary
Claude Code v2.1.301 added `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS`. When unattended retry mode (`CLAUDE_CODE_RETRY_WATCHDOG`) is active and a usage-limit reset is scheduled too far in the future, this variable caps how long Claude Code will wait before ending the request. It complements `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` (which caps the wait between 429/529 retries) by handling usage-limit resets specifically.

## Assessment
The env vars table in `src/pages/practices.html` already has `CLAUDE_CODE_RETRY_WATCHDOG` (line 2746) and `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` (line 2747). The new variable is not present. It should be inserted directly after `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` at line 2747.

## Plan
1. Read `src/pages/practices.html` around line 2747.
2. After the `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` row, insert a new `<tr>` for `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS`.
3. Description: "Caps how long the retry watchdog (`CLAUDE_CODE_RETRY_WATCHDOG`) waits when a usage-limit reset is scheduled further away than this value. Set to an integer number of milliseconds. When unset, the watchdog waits regardless of how far away the reset is. Pairs with `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` (which caps waits between 429/529 retries). Use in unattended sessions to prevent indefinite stalls at usage limits (v2.1.301)."

## Acceptance Criteria
- The row for `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS` appears after `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS`.
- The description distinguishes it from `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS`.
- No other rows are altered.
