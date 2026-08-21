# CBP-432: Extend `/goal` cheat-sheet row — resuming a session restores its active goal

## Source
Claude Code v2.1.239 CHANGELOG.md entries: "`/goal`: repeat check-ins on long-running background work now back off (30 min, then 1 h, then every 2 h) instead of repeating every 30 minutes" (already documented — see Assessment) and "`/goal`: resuming a session from the `claude --resume` picker now restores its active goal" (not yet documented).

## Summary
v2.1.239 makes two `/goal` changes. The escalating check-in backoff cadence (30min → 1h → 2h) is already fully documented in the playbook. The second change — that resuming a session via `claude --resume` now restores its previously active goal — is new and not covered anywhere in the Claude Code `/goal` row.

## Assessment
Existing row at ~line 11019 in `fsad-playbook.html` already says:
> "...Claude checks in on background tasks that have kept a goal waiting, on an escalating cadence — 30 minutes, then 1 hour, then 2 hours — rather than waiting indefinitely (v2.1.236; originally a flat 30-minute check-in in v2.1.234)..."
This fully covers the backoff-cadence change (it was documented for v2.1.236, which matches the delta — no new action needed for that half). It does NOT mention resume-restores-goal. Note: a similar-sounding "resume restores its active goal" bullet exists only for the separate Codex `/goal` row (~line 13897) — that is a different product/page and does not cover Claude Code.

## Plan
1. In `fsad-playbook.html`, locate the Claude Code `/goal` row (~line 11019, inside the Automation & agents Slash Commands table).
2. Append one clause to the end of the existing description, before the closing `</td></tr>`:
   ```html
   As of v2.1.239, resuming a session from the <code>claude --resume</code> picker also restores its active goal.
   ```

## Acceptance Criteria
- [ ] The Claude Code `/goal` row gains a new sentence about resume restoring the active goal, citing v2.1.239.
- [ ] The existing backoff-cadence sentence is left unchanged.
- [ ] No duplicate/contradictory content introduced relative to the Codex `/goal` row.
