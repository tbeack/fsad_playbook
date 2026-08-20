# CBP-386 — Document `/goal` self-clearing and background-task check-in

## Source
Claude Code v2.1.234

## Summary
Two `/goal` behavior changes shipped in v2.1.234:
- A goal now clears itself with a notice when a turn dies on an unrecoverable error
  (revoked auth, exhausted credit balance, context overflow) instead of staying armed.
- When background tasks keep a goal waiting 30+ minutes, Claude checks in on them
  instead of waiting indefinitely.

## Assessment
`/goal` is documented in exactly one place on the Claude Best Practices page:
the `#cheat-sheet` "Automation & agents" table, line ~11006. There is no `/goal`
collapsible in `#power-usage`. The existing row already describes cross-turn
behavior, so failure/stall semantics belong in the same row.

(The `/goal` block at ~14229 is on `page-codex` — Codex CLI's own `/goal`, out of scope.)

## Plan
1. Locate the `/goal` row in the Automation & agents table (~line 11006).
2. Append two sentences covering self-clear on unrecoverable error and the 30-minute
   background-task check-in, including the `CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0` opt-out.
3. Match existing row style: prose sentence, `(vX.Y.Z)` tagging, `<code>` for identifiers.

## Acceptance Criteria
- [ ] `/goal` cheat-sheet row mentions self-clearing on unrecoverable errors
- [ ] Row mentions the 30+ minute background-task check-in
- [ ] Row names `CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0` as the opt-out
- [ ] Version tagged v2.1.234; HTML valid, single `<tr>` preserved
