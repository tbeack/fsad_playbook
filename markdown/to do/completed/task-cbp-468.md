# CBP-468 — `/goal`: idle check-in cap (max 3 per goal, resets on next message)

## Summary
Claude Code v2.1.246 changed idle-session background check-ins on a `/goal`: instead of escalating indefinitely (30m → 1h → 2h, previously undocumented as capped), a goal now starts at most three check-ins on long-running background work; sending the goal-holder a new message allows three more check-ins.

## Assessment
The `/goal` Cheat Sheet row (line 11727) already documents the v2.1.234/v2.1.236 escalating check-in cadence (30 minutes, then 1 hour, then 2 hours) in detail. This v2.1.246 change adds a cap on top of that cadence — it's an extension of existing, actively-maintained content (this row has been updated three times already: CBP-386, CBP-413, CBP-432).

## Plan
1. In `fsad-playbook.html`, locate the `/goal` Cheat Sheet row (line 11727).
2. Append a clause documenting the v2.1.246 check-in cap after the existing check-in cadence sentence, before the v2.1.239 resume sentence:
   ```html
   ...on an escalating cadence — 30 minutes, then 1 hour, then 2 hours — rather than waiting indefinitely (v2.1.236; originally a flat 30-minute check-in in v2.1.234) — set <code>CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0</code> to opt out. As of v2.1.246, an idle goal makes at most three such check-ins before it stops escalating; sending the session a new message allows three more. As of v2.1.239, resuming a session from the <code>claude --resume</code> picker also restores its active goal.
   ```

## Acceptance Criteria
- [ ] `/goal` row documents the v2.1.246 three-check-in cap and that a new message resets the count.
- [ ] Row remains a single well-formed `<tr>`.
