# CBP-706 — Add `CLAUDE_CODE_RETRY_WATCHDOG_USAGE_LIMIT_RECHECK_MS` env var

## Summary

Claude Code v2.1.305 adds `CLAUDE_CODE_RETRY_WATCHDOG_USAGE_LIMIT_RECHECK_MS` so unattended retry mode (`CLAUDE_CODE_RETRY_WATCHDOG`) notices a usage limit that was lifted before its reset.

## Assessment

Not yet documented. `src/pages/practices.html` has a "Hardening env vars (shared environments & CI/CD)" table that already documents the retry-watchdog family: `CLAUDE_CODE_RETRY_WATCHDOG` (line ~2749), `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` (line ~2750), and `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS` (line ~2751). This new var belongs right after those, grouped with the rest of the retry-watchdog family.

## Plan

1. Open `src/pages/practices.html`.
2. After the `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS` row (~line 2751), add:

```html
<tr><td><code>CLAUDE_CODE_RETRY_WATCHDOG_USAGE_LIMIT_RECHECK_MS</code></td><td>For unattended retry mode (<code>CLAUDE_CODE_RETRY_WATCHDOG</code>) waiting on a usage-limit reset. Set to an integer number of milliseconds to control how often it rechecks whether the limit was lifted early, so a session waiting on a reset resumes as soon as the limit actually clears rather than at the original reset time (v2.1.305).</td></tr>
```

3. Save the file.

## Acceptance Criteria

- The hardening env vars table documents `CLAUDE_CODE_RETRY_WATCHDOG_USAGE_LIMIT_RECHECK_MS` immediately after the other retry-watchdog rows.
- No other rows are affected.
