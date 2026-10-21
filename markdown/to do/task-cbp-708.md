# CBP-708 — `allowedMcpServers` behavior for `managed-mcp.json` `${VAR}` servers

## Summary
Claude Code v2.1.305 changed how `allowedMcpServers` applies to `managed-mcp.json`. Stdio servers in that file that use `${VAR}` expansion only in their `env` field are no longer filtered by `allowedMcpServers`. One that your allowlist omits now loads on upgrade. Use `deniedMcpServers` to keep such a server off.

## Assessment
The `managedMcpServers` bullet at line 660 of `src/pages/practices.html` already says that `allowedMcpServers` governs only servers individual users add (v2.1.259). The v2.1.305 change narrows that: it specifically restores loading of `${VAR}`-in-env stdio servers in `managed-mcp.json`. The existing note needs a follow-on sentence.

## Plan
1. Open `src/pages/practices.html`.
2. Find the `managedMcpServers` bullet at line 660.
3. The sentence currently ends: `...not managed ones (v2.1.259).`
4. Append the following sentence after the closing parenthesis and before `</li>`.

**Text to append:**
` As of v2.1.305, <code>managed-mcp.json</code> stdio servers that use <code>${VAR}</code> only in their <code>env</code> field are no longer filtered out — one omitted from <code>allowedMcpServers</code> now loads on upgrade. Use <code>deniedMcpServers</code> to block it.`

## Acceptance Criteria
- The bullet ends with the v2.1.305 note about `${VAR}` env servers and `deniedMcpServers`.
- The playbook builds without error.
