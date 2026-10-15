# CBP-686 — Update `/advisor` row: AWS availability and CLAUDE_CODE_DISABLE_ADVISOR_TOOL=1 (v2.1.300)

## Summary
Claude Code v2.1.300 added `/advisor` support on Claude Platform on AWS. The release note says: "no advisor runs until you pick one with `/advisor`, `advisorModel` or `--advisor`, and `CLAUDE_CODE_DISABLE_ADVISOR_TOOL=1` turns it off."

## Assessment
The `/advisor` row in the Cheat Sheet (src/pages/practices.html, line 1794) currently says:

> "As of v2.1.260, the text form `/advisor <model>` / `/advisor off` works in the desktop app, Remote Control and headless (`-p` / Agent SDK) sessions."

It does not mention AWS availability or the new env var `CLAUDE_CODE_DISABLE_ADVISOR_TOOL=1`. This is an "Update existing" task.

## Plan
1. Read src/pages/practices.html around line 1794 to confirm the exact text.
2. Append to the end of the `/advisor` row's `<td>`: " As of v2.1.300, available on Claude Platform on AWS — no advisor runs until you pick one with `/advisor`, `advisorModel`, or `--advisor`; set `CLAUDE_CODE_DISABLE_ADVISOR_TOOL=1` to disable the advisor tool entirely."

## Acceptance Criteria
- The `/advisor` row mentions AWS availability.
- The row mentions `CLAUDE_CODE_DISABLE_ADVISOR_TOOL=1`.
- No other rows are affected.
- Build scripts succeed.
