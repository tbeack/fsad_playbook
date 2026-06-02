# CBP-215: Remove deprecated `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` env var row (v2.1.160)

## Summary

Claude Code v2.1.160 removed `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE`. The env var is now a no-op. It was deprecated in v2.1.154 (with a planned removal on 2026-06-01) and is now fully removed.

## Assessment

The playbook's env vars table (Subprocess Sandboxing section, ~line 10171) contains a row for `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1`. Since the env var is now a no-op, documenting it will mislead users into thinking it still works. It should be removed.

**Existing content:** Yes — row exists at line ~10171.

```html
<tr><td><code>CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1</code></td><td>Pin fast mode ...</td></tr>
```

## Plan

1. Read the env vars table section in `fsad-playbook.html` (lines ~10165–10180).
2. Delete the entire `<tr>` row for `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1`.
3. Mark task complete in `todo.md`.

## Acceptance Criteria

- The `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` row is gone from the env vars table
- No other rows are disturbed
- The table still renders correctly
