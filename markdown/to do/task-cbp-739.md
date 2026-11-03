# CBP-739: Add `CLAUDE_CODE_DISABLE_NESTED_SESSION_ID` env var (v2.1.317)

## Summary
Claude Code v2.1.317 added `CLAUDE_CODE_DISABLE_NESTED_SESSION_ID`. Set it to `1` on a self-hosted runner to have `claude -p` run inside a session use that session's ID and transcript, as in earlier versions — the new default (as of this version) gives such a nested run its own session ID and transcript instead. This closes two bugs fixed in the same release: a nested `claude -p` writing into the parent session's transcript, and generating its own title and sending it to that session.

## Assessment
`src/pages/practices.html` has an env var reference table (~line 2760-2820) that is the playbook's catalog of every documented `CLAUDE_CODE_*` / `ANTHROPIC_*` variable, including several other self-hosted-runner-oriented vars (`CLAUDE_CODE_RETRY_WATCHDOG*`). This is a direct, table-shaped fit.

## Plan
1. Open `src/pages/practices.html`.
2. In the env var table, after the `CLAUDE_CODE_DISABLE_FILE_MENTIONS` row and before the closing `</tbody>`, insert:
   ```html
   <tr><td><code>CLAUDE_CODE_DISABLE_NESTED_SESSION_ID=1</code></td><td>On a self-hosted runner, makes a <code>claude -p</code> run started from inside a session reuse that session's ID and transcript, matching behavior from before v2.1.317. By default as of v2.1.317, such a nested run gets its own session ID and transcript instead, so a restart can no longer resume into the wrong conversation.</td></tr>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- A new env var table row documents `CLAUDE_CODE_DISABLE_NESTED_SESSION_ID`, its default behavior as of v2.1.317, and what setting it to `1` restores.
- HTML is valid (no unclosed tags).
