# CBP-669 — Update `CLAUDE_CODE_RETRY_WATCHDOG` Row with `_MAX_WAIT_MS` Variant (v2.1.295)

## Summary

Claude Code v2.1.295 added `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS`. This env var caps how long the unattended retry watchdog (`CLAUDE_CODE_RETRY_WATCHDOG`) waits between 429 and 529 error retries. Without it, the watchdog has no upper bound on wait time.

## Assessment

`CLAUDE_CODE_RETRY_WATCHDOG` is documented at line 2744 of `src/pages/practices.html`. The new `_MAX_WAIT_MS` variant should be added as a companion note to that row, either inline or as a new adjacent row.

Adding a new adjacent row keeps the table readable and consistent with how other env var families are documented (e.g., `CLAUDE_CODE_AUTO_MODE_SERVER` has a multi-line note about the transition from v2.1.273 to v2.1.278).

## Plan

1. Read `src/pages/practices.html` lines 2740-2755 for context.
2. After the existing `CLAUDE_CODE_RETRY_WATCHDOG` row (line 2744), add a new `<tr>` for `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS`:
   - Description: limits maximum wait time between 429/529 retries in watchdog mode; value is milliseconds
   - Reference: v2.1.295

## Edit location

- `src/pages/practices.html` line 2744 — insert new row after the closing `</tr>`

## Acceptance Criteria

- `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` appears as its own row in the env vars table
- Description explains it caps the wait between retries in watchdog mode
