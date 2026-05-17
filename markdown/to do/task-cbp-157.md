# CBP-157 — CLAUDE_CODE_STOP_HOOK_BLOCK_CAP Env Var

## Summary
Claude Code v2.1.143 fixed stop hooks that block repeatedly looping forever. The turn now ends with a warning after 8 consecutive blocks. The cap is configurable via `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`.

## Assessment
The Subprocess Sandboxing hardening env vars table (lines 6984–7001) is the right place for `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`. The Hooks Deep Dive section may also benefit from a note about the block cap, but the primary documentation location is the env vars table.

No existing mention of `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` or the 8-block cap anywhere in the playbook.

This is **new content** — one new row in the hardening env vars table (after the PowerShell rows from CBP-156).

## Plan
Add one new row to the hardening env vars table after the `CLAUDE_CODE_USE_POWERSHELL_TOOL=0` row (end of tbody, before `</tbody>`):

```html
<tr><td><code>CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=N</code></td><td>Maximum number of consecutive stop-hook blocks before the turn ends with a warning. Default: <code>8</code>. Raise the cap if your stop hook legitimately needs more retry cycles; set to <code>1</code> to fail fast.</td></tr>
```

## Acceptance Criteria
- Hardening env vars table includes `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=N` row
- Default value of 8 is documented
- No broken HTML
