# CBP-691 — Add `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS` env var (v2.1.301)

## Summary
Claude Code v2.1.301 adds a new environment variable `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS`. When set, unattended retry sessions (using `CLAUDE_CODE_RETRY_WATCHDOG`) end a request when the usage-limit reset is too far in the future, rather than waiting indefinitely. This complements the existing `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` (which caps waits on 429/529 retries) but targets specifically the scenario where the usage limit reset time is unreasonably distant.

## Assessment
The practices page already has `CLAUDE_CODE_RETRY_WATCHDOG` (line 2746) and `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` (line 2747). The new variable belongs immediately after `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` in the same table group.

File: `src/pages/practices.html`

## Plan
1. Read `src/pages/practices.html` lines 2745–2750 to confirm exact surrounding HTML.
2. Insert a new `<tr>` row after the `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` row (line 2747).
3. Row text: `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS` — limits how long the retry watchdog waits when a usage-limit reset is too far away. Set to an integer number of milliseconds. When the reset time exceeds this threshold, the session ends the request instead of waiting. Use alongside `CLAUDE_CODE_RETRY_WATCHDOG` in unattended pipelines where a distant quota reset should not stall the job indefinitely (v2.1.301).

## Acceptance Criteria
- New `<tr>` row appears immediately after the `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` row in the env vars table.
- Row text accurately describes the variable's purpose and version.
- Build passes without errors.
