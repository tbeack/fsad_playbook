# CBP-156 — Add `CLAUDE_CODE_USE_POWERSHELL_TOOL` env var to Subprocess Sandboxing hardening table (v2.1.143)

## Summary
Claude Code v2.1.143 enabled the PowerShell tool by default on Windows for Bedrock, Vertex, and Foundry users. Teams that want to disable it can set `CLAUDE_CODE_USE_POWERSHELL_TOOL=0`.

## Assessment
The Subprocess Sandboxing collapsible hardening env vars table does not mention this env var. It should be added after `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY` (CBP-155).

## Plan
1. Locate the `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY` row added in CBP-155.
2. Add a new row after it for `CLAUDE_CODE_USE_POWERSHELL_TOOL`.

**New row:**
```html
<tr><td><code>CLAUDE_CODE_USE_POWERSHELL_TOOL=0</code></td><td>Disable the PowerShell tool on Windows. The PowerShell tool is enabled by default for Bedrock, Vertex, and Foundry users on Windows as of v2.1.143. Set to <code>0</code> to opt out.</td></tr>
```

## Acceptance Criteria
- The hardening env vars table includes a `CLAUDE_CODE_USE_POWERSHELL_TOOL=0` row.
- Description explains the default-on behavior for Bedrock/Vertex/Foundry and how to opt out.
- No existing rows are modified or removed.
