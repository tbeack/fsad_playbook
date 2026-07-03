# CBP-294 — Update `CLAUDE_CODE_RETRY_WATCHDOG` description (v2.1.199)

## Summary

In v2.1.199, Anthropic changed the retry behavior for non-capacity transient errors:
- `CLAUDE_CODE_RETRY_WATCHDOG` now raises the default retry count for non-capacity transient errors to **300** (up from a lower default).
- `CLAUDE_CODE_MAX_RETRIES` **cap of 15 is now lifted** — it can be set higher than 15.

The playbook currently says (line 10726):
> "For unattended / CI sessions that need more than 15 retry attempts. Set to an integer (e.g. `30`) to allow that many retries. Use this instead of `CLAUDE_CODE_MAX_RETRIES`, which is now capped at 15 and should not be set higher."

This is now factually wrong: `CLAUDE_CODE_MAX_RETRIES` is no longer capped at 15.

## Assessment

The live content is in the hardening env vars table in the Power Usage section (Claude Best Practices page), at **line 10726**.

The historical changelog entry at line 13509 documents what was true at v2.1.186 — leave that alone.

## Plan

1. Read line 10726 in `fsad-playbook.html` (the `CLAUDE_CODE_RETRY_WATCHDOG` table row).
2. Replace the description to reflect the v2.1.199 behavior:
   - RETRY_WATCHDOG raises the default retry count for non-capacity transient errors to 300.
   - CLAUDE_CODE_MAX_RETRIES cap of 15 is now lifted (can be set higher).
   - Keep the CI/automation use-case framing.
   - Add version note (v2.1.199).

**Replacement text:**
```
For unattended / CI sessions. Sets the default retry count for non-capacity transient errors to 300 when enabled. As of v2.1.199, the cap of 15 on <code>CLAUDE_CODE_MAX_RETRIES</code> has been lifted — you can now set <code>CLAUDE_CODE_MAX_RETRIES</code> higher than 15 directly. Designed for long-running automation where transient API errors should not abort a session (v2.1.186; cap lifted in v2.1.199).
```

## Acceptance Criteria

- Line 10726 no longer says `CLAUDE_CODE_MAX_RETRIES` is "capped at 15 and should not be set higher."
- The row accurately reflects that RETRY_WATCHDOG raises the default to 300 for non-capacity transient errors.
- The cap-lifted note references v2.1.199.
- Historical changelog bullet at line 13509 is unchanged.
