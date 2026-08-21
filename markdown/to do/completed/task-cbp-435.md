# CBP-435: Extend `CLAUDE_CODE_RETRY_WATCHDOG` row — fails immediately on org spend-limit/out-of-credits errors

## Source
Claude Code v2.1.239 CHANGELOG.md entry: "Persistent retry mode (`CLAUDE_CODE_RETRY_WATCHDOG`) now fails immediately on organization spend-limit and out-of-credits errors instead of waiting indefinitely for a reset"

## Summary
The `CLAUDE_CODE_RETRY_WATCHDOG` env var (for unattended/CI sessions needing more retries than the default 15-attempt cap) previously would keep retrying indefinitely even on unrecoverable organization billing errors (spend limit hit, out of credits). It now fails fast on those specific error classes instead of hanging.

## Assessment
Existing row in the hardening env-vars table (~line 11884 in `fsad-playbook.html`):
```html
<tr><td><code>CLAUDE_CODE_RETRY_WATCHDOG</code></td><td>For unattended / CI sessions that need more than 15 retry attempts. Set to an integer (e.g. <code>30</code>) to allow that many retries. Use this instead of <code>CLAUDE_CODE_MAX_RETRIES</code>, which is now capped at 15 and should not be set higher. Designed for long-running automation where transient API errors should not abort a session (v2.1.186).</td></tr>
```
This describes only the original v2.1.186 behavior. It doesn't mention the new fail-fast behavior on unrecoverable billing errors — important for CI operators who need to distinguish "still retrying" from "will never recover."

## Plan
1. In `fsad-playbook.html`, locate the `CLAUDE_CODE_RETRY_WATCHDOG` row (~line 11884).
2. Append a new sentence to the existing `<td>` description, before the closing `</td></tr>`:
   ```html
   As of v2.1.239, retries stop immediately on organization spend-limit and out-of-credits errors instead of waiting indefinitely for a reset — these are treated as unrecoverable rather than transient.
   ```

## Acceptance Criteria
- [ ] The `CLAUDE_CODE_RETRY_WATCHDOG` row's description is extended (not replaced) with the v2.1.239 fail-fast behavior.
- [ ] The original v2.1.186 description remains intact.
- [ ] Table row HTML remains valid.
