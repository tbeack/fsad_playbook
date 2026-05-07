# CBP-118 — Add `CLAUDE_CODE_SESSION_ID` to Hooks env vars table

## Summary
Claude Code v2.1.132 added `CLAUDE_CODE_SESSION_ID` to the Bash tool subprocess environment. This means Bash commands run by Claude can now read the session ID directly from the environment — matching the `session_id` field already passed to hooks via JSON input. This enables scripts and hooks to correlate Bash tool runs with the active session without having to parse hook JSON.

## Assessment
The playbook has a "Environment variables available in hooks" table inside the Hooks deep-dive collapsible (around line 7182–7190). It currently lists four vars:
- `CLAUDE_PROJECT_DIR`
- `CLAUDE_ENV_FILE`
- `CLAUDE_PLUGIN_ROOT`
- `CLAUDE_PLUGIN_DATA`

`CLAUDE_CODE_SESSION_ID` is not present. It belongs here because hooks and Bash subprocesses both receive it. Adding it will complete the picture for readers building hook scripts that need to track sessions.

## Plan
1. Read lines 7180–7192 of `fsad-playbook.html` to confirm exact current text.
2. Insert a new `<tr>` row after `CLAUDE_PLUGIN_DATA`:
   ```html
   <tr><td><code>CLAUDE_CODE_SESSION_ID</code></td><td>Current session ID — also injected into Bash tool subprocess environment, enabling scripts to correlate tool runs with the active session</td></tr>
   ```
3. No other changes needed.

## Acceptance Criteria
- `CLAUDE_CODE_SESSION_ID` appears in the hooks env vars table
- The description mentions it is available both in hooks and Bash subprocess environment
- No surrounding HTML is broken
