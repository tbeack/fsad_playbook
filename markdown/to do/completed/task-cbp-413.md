# CBP-413: Update `/goal` row with escalating 30m→1h→2h check-in cadence

## Source
Claude Code v2.1.236 changelog: "`/goal`: an idle session whose goal is parked behind long-running background work now checks in automatically after 30 minutes (then 1h, 2h) instead of waiting for you to return."

## Summary
The `/goal` feature's automatic check-in behavior for idle sessions blocked on background work now escalates: it checks in at 30 minutes, then again at 1 hour, then 2 hours — rather than a single flat 30-minute check-in.

## Assessment
Does content exist? Partial — the `/goal` row in the Cheat Sheet (currently line 11008) already documents the v2.1.234-era flat "30+ minutes" check-in and the `CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0` opt-out, but this text is now stale/incomplete: it doesn't reflect the new escalating cadence. There is also a related `CLAUDE_CODE_GOAL_CHECKIN_MINUTES` row in the Subprocess Sandboxing hardening table (~line 11880) that similarly only describes the flat 30-minute default.

## Plan
1. Open `fsad-playbook.html`, locate the `/goal` row in the Cheat Sheet's "Automation & workflow" (or equivalent) table — currently line 11008: `<tr><td><code>/goal</code> <code>&lt;condition&gt;</code></td>...`.
2. Update the trailing clause about check-ins. Current text ends: "...Claude checks in on background tasks that have kept a goal waiting 30+ minutes rather than waiting indefinitely — set `CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0` to opt out (v2.1.234)". Replace/extend with:
   "...Claude checks in on background tasks that have kept a goal waiting, on an escalating cadence — 30 minutes, then 1 hour, then 2 hours — rather than waiting indefinitely (v2.1.236; originally a flat 30-minute check-in in v2.1.234) — set `CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0` to opt out."
3. Optionally also update the `CLAUDE_CODE_GOAL_CHECKIN_MINUTES` hardening-table row (~line 11880) to note the escalating cadence, for consistency — this is a secondary nice-to-have, not required for acceptance.

## Acceptance Criteria
- [ ] The `/goal` Cheat Sheet row describes the escalating 30m→1h→2h check-in cadence, not just a flat 30-minute check-in.
- [ ] Version v2.1.236 is cited alongside the existing v2.1.234 reference (don't delete the v2.1.234 provenance).
- [ ] Table row structure remains valid.
