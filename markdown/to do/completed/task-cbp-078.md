# CBP-078: Add `CLAUDE_CODE_HIDE_CWD` env var to Subprocess Sandboxing table

## Summary
In v2.1.119, a new `CLAUDE_CODE_HIDE_CWD=1` environment variable was added to hide the working directory path from the startup logo. Useful in CI/CD environments and shared systems where paths should not be exposed.

## Assessment
The Subprocess Sandboxing collapsible (line ~5704–5735) has a table of env vars: `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`, `CLAUDE_CODE_SCRIPT_CAPS`, and `DISABLE_UPDATES`. `CLAUDE_CODE_HIDE_CWD` is not present. This is actionable — add a new row.

## Plan
1. Read fsad-playbook.html around line 5714–5718 (env var table in subprocess sandboxing)
2. Add new row after `CLAUDE_CODE_SCRIPT_CAPS`:
   ```html
   <tr><td><code>CLAUDE_CODE_HIDE_CWD=1</code></td><td>Hides the working directory path from the startup logo — useful in CI/CD and shared environments where paths should not be exposed</td></tr>
   ```

## Acceptance Criteria
- `CLAUDE_CODE_HIDE_CWD=1` appears in the Subprocess Sandboxing env vars table
- Description explains it hides the CWD from the startup logo
- Row is positioned logically among the other env vars
