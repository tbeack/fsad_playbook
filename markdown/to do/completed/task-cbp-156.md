# CBP-156 — PowerShell Env Vars (CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY, CLAUDE_CODE_USE_POWERSHELL_TOOL)

## Summary
Claude Code v2.1.143 made two PowerShell-related changes:
1. The PowerShell tool now passes `-ExecutionPolicy Bypass` by default. Opt out with `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1`.
2. The PowerShell tool is now enabled by default on Windows for Bedrock, Vertex, and Foundry users. Opt out with `CLAUDE_CODE_USE_POWERSHELL_TOOL=0`.

## Assessment
The Subprocess Sandboxing hardening env vars table (lines 6984–7001) lists many env vars but has no mention of `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY` or `CLAUDE_CODE_USE_POWERSHELL_TOOL`. These are new env vars relevant to enterprise Windows deployments.

This is **new content** — two new rows to add to the hardening env vars table.

## Plan
Add two new rows to the hardening env vars table immediately after the `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` row (line 6999), before the closing `</tbody>`:

```html
<tr><td><code>CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1</code></td><td>Opts out of the default <code>-ExecutionPolicy Bypass</code> flag that Claude Code passes to PowerShell — use in environments with enforced PowerShell execution policy (e.g. AllSigned or RemoteSigned) where bypass is not permitted.</td></tr>
<tr><td><code>CLAUDE_CODE_USE_POWERSHELL_TOOL=0</code></td><td>Disables the PowerShell tool entirely. The tool is now enabled by default on Windows for Bedrock, Vertex, and Foundry users — use this opt-out in environments where PowerShell access is prohibited.</td></tr>
```

## Acceptance Criteria
- Hardening env vars table has both `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1` and `CLAUDE_CODE_USE_POWERSHELL_TOOL=0` rows
- Descriptions are accurate and match the v2.1.143 changelog
- No broken HTML
