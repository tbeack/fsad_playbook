# CBP-705 — `CLAUDE_CODE_RETRY_WATCHDOG_USAGE_LIMIT_RECHECK_MS` new env var

## Summary
Claude Code v2.1.305 added `CLAUDE_CODE_RETRY_WATCHDOG_USAGE_LIMIT_RECHECK_MS`. It sets how often (in milliseconds) the retry watchdog (`CLAUDE_CODE_RETRY_WATCHDOG`) rechecks whether a usage limit has lifted before its scheduled reset time. Use this to make unattended sessions resume work sooner when a usage limit clears early.

## Assessment
The playbook has `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS` at line 2751 of `src/pages/practices.html`. The new var is a direct companion. It is not yet in the playbook. Add a new row after the `MAX_USAGE_LIMIT_WAIT_MS` row.

## Plan
1. Open `src/pages/practices.html`.
2. Find the row for `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS` (line 2751).
3. Insert a new `<tr>` row directly after it with the new var and description.

**Row to insert (after the MAX_USAGE_LIMIT_WAIT_MS row):**
```html
<tr><td><code>CLAUDE_CODE_RETRY_WATCHDOG_USAGE_LIMIT_RECHECK_MS</code></td><td>How often (in milliseconds) the retry watchdog (<code>CLAUDE_CODE_RETRY_WATCHDOG</code>) rechecks whether a usage limit has lifted before its scheduled reset. Use this to make unattended sessions resume sooner when a limit clears early. Pairs with <code>CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS</code> (v2.1.305).</td></tr>
```

## Acceptance Criteria
- The new row appears in the env vars table, after `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS`.
- The description is accurate and links to the companion var.
- The playbook builds without error.
