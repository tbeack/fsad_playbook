# CBP-154 — Add `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` env var to Subprocess Sandboxing hardening table (v2.1.143)

## Summary
Claude Code v2.1.143 fixed a bug where stop hooks that block could loop forever. The fix caps consecutive stop-hook blocks at 8 turns before ending with a warning. The cap is configurable via the `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` env var, allowing teams to raise or lower the limit.

## Assessment
The Subprocess Sandboxing collapsible (line 6946, id `power-usage--subprocess-sandboxing`) has a "Hardening env vars" table ending at line 6999 with `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE`. The new `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` is not present. It should be added to this table as a new row.

## Plan
1. Locate the last row in the hardening env vars table tbody — `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` at approximately line 6999.
2. Add a new row after it for `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`.

**New row to add after the `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` row:**
```html
<tr><td><code>CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=N</code></td><td>Maximum consecutive stop-hook blocks before the turn ends with a warning (default: <code>8</code>). Raise to allow more retries in complex stop conditions; lower to fail fast in CI pipelines.</td></tr>
```

## Acceptance Criteria
- The hardening env vars table includes a `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=N` row.
- Description accurately reflects the default of 8 and the use cases for raising/lowering.
- No existing rows are modified or removed.
