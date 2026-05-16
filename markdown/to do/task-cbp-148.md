# CBP-148 — Document fast mode Opus 4.7 default + CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE env var

## Summary

Claude Code v2.1.142 changed fast mode to use **Opus 4.7 by default** (previously Opus 4.6). A new env var `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1` is available to pin fast mode back to Opus 4.6.

## Assessment

The playbook does not currently state explicitly that fast mode uses Opus 4.6 in the `/fast` row or surrounding prose. However:

- **Line 6233**: `/fast` Cheat Sheet row only says "Toggle fast mode (same model, faster output)" — no model called out, no action needed there.
- **Line 6191**: Keyboard shortcut `Option+O / Alt+O` — "Toggle fast mode" — no model called out.
- **`CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE`** is a new env var that belongs in the Subprocess Sandboxing environment variables table.

The env var table is the primary surface. The `/fast` row description ("same model, faster output") is currently model-agnostic and doesn't need updating.

## Plan

1. Find the Subprocess Sandboxing env vars table and add a new row for `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE`.
2. The table already has rows like `DISABLE_UPDATES`, `CLAUDE_CODE_FORCE_SYNC_OUTPUT`, etc.

Search for the env var table:
```
grep -n "DISABLE_UPDATES\|CLAUDE_CODE_FORCE_SYNC_OUTPUT\|CLAUDE_CODE_HIDE_CWD" fsad-playbook.html
```

**New row to add** (after the existing env vars, near the fast-mode-relevant vars):
```html
<tr><td><code>CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE</code></td><td>Set to <code>1</code> to pin fast mode (<code>/fast</code> / <code>Option+O</code>) to Opus 4.6 instead of the v2.1.142+ default of Opus 4.7.</td></tr>
```

## Acceptance Criteria

- `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` appears in the Subprocess Sandboxing env vars table with a clear description
- No existing rows are modified
