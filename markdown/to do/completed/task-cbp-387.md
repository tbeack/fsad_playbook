# CBP-387 — Add `CLAUDE_CODE_GOAL_CHECKIN_MINUTES` to the Power Usage env vars table

## Source
Claude Code v2.1.234

## Summary
New tunable env var: sets how many minutes a `/goal` may sit blocked on background
tasks before Claude checks in on them. Set to `0` to opt out and restore indefinite waiting.

## Assessment
The Hardening env vars table lives inside `power-usage--subprocess-sandboxing`.
Table spans ~11840-11877; rows ~11843-11875; `</tbody>` at ~11876. Rows are
single-line, 14-space indent:
`<tr><td><code>VAR</code></td><td>Effect sentence… (vX.Y.Z).</td></tr>`

The table already carries comparable unattended/CI timeout knobs
(`CLAUDE_CODE_RETRY_WATCHDOG`, `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT`,
`CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS`), so this is a direct fit.

## Plan
1. Locate the last row of the env vars table (`CLAUDE_CODE_PROJECT_DIR_NAME`, added by CBP-380).
2. Insert a new `<tr>` after it, before `</tbody>`, matching indentation and style.
3. State the default (30), the `0` opt-out, and why it matters for unattended sessions.

## Acceptance Criteria
- [ ] New row present for `CLAUDE_CODE_GOAL_CHECKIN_MINUTES`
- [ ] Documents default and the `0` opt-out
- [ ] Tagged (v2.1.234); indentation and `<tr>` structure match siblings
- [ ] Table still has exactly one `</tbody>`
