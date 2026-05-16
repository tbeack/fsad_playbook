# CBP-155 — Add `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY` env var to Subprocess Sandboxing hardening table (v2.1.143)

## Summary
Claude Code v2.1.143 changed the PowerShell tool to pass `-ExecutionPolicy Bypass` by default, making it work out-of-the-box on Windows machines with restrictive execution policies. Teams that need to enforce the system execution policy can opt out with `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1`.

## Assessment
The Subprocess Sandboxing collapsible hardening env vars table (ending at ~line 6999) does not mention this env var. It should be added after `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` (CBP-154).

## Plan
1. Locate the `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` row added in CBP-154.
2. Add a new row after it for `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY`.

**New row:**
```html
<tr><td><code>CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1</code></td><td>Opt out of the default <code>-ExecutionPolicy Bypass</code> flag passed to PowerShell. Set this to enforce your system's existing PowerShell execution policy instead of bypassing it.</td></tr>
```

## Acceptance Criteria
- The hardening env vars table includes a `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1` row.
- Description explains the default bypass behavior and how to opt out.
- No existing rows are modified or removed.
