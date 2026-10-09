# CBP-669 — [Claude] Add `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` env var (v2.1.295)

## Summary
Claude Code v2.1.295 added `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` to limit how long the unattended retry watchdog (`CLAUDE_CODE_RETRY_WATCHDOG`) waits out 429 and 529 errors before giving up.

## Assessment
`CLAUDE_CODE_RETRY_WATCHDOG` already has a row in the env vars table (practices.html line 2744). The new `_MAX_WAIT_MS` variant needs its own row immediately after.

## Plan
1. Read `src/pages/practices.html` line 2744 to confirm exact text.
2. Add a new `<tr>` row after the `CLAUDE_CODE_RETRY_WATCHDOG` row.

## Edit
After the `CLAUDE_CODE_RETRY_WATCHDOG` row (`</tr>` closing), insert:
```html
              <tr><td><code>CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS</code></td><td>Limits how long the retry watchdog (<code>CLAUDE_CODE_RETRY_WATCHDOG</code>) waits between 429 and 529 retries. Set to an integer number of milliseconds. Use this in unattended sessions to prevent indefinite stalls when the API stays overloaded for a long time (v2.1.295).</td></tr>
```

## Acceptance Criteria
- `CLAUDE_CODE_RETRY_WATCHDOG_MAX_WAIT_MS` appears in the env vars table.
- It is positioned after the `CLAUDE_CODE_RETRY_WATCHDOG` row.
