# CBP-709 — `CLAUDE_CODE_AUTO_COMPACT_WINDOW` env var

## Summary
Claude Code v2.1.305 fixed and documented `CLAUDE_CODE_AUTO_COMPACT_WINDOW`. It sets a custom auto-compact token threshold. The fix makes it accept `k` and `M` suffixes (e.g. `200k`, `1M`) like the `--autocompact` flag. The env var also warns when the value is out of range or ignored. This var was not previously documented in the playbook.

## Assessment
The env vars table in `src/pages/practices.html` has two context-window vars near line 2768: `CLAUDE_CODE_DISABLE_1M_CONTEXT` and `CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT`. `CLAUDE_CODE_AUTO_COMPACT_WINDOW` belongs after these, since it also controls the auto-compact window size.

## Plan
1. Open `src/pages/practices.html`.
2. Find the `CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT` row (line 2769).
3. Insert a new `<tr>` row directly after it.

**Row to insert (after DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT row):**
```html
<tr><td><code>CLAUDE_CODE_AUTO_COMPACT_WINDOW</code></td><td>Sets a custom token threshold at which auto-compaction triggers. Accepts a plain integer or a value with <code>k</code> / <code>M</code> suffixes (e.g. <code>200k</code>, <code>1M</code>), matching the <code>--autocompact</code> flag syntax. Claude Code warns when the value is out of range or ignored. Use this to raise or lower the compaction point independently of the model's context window size (v2.1.305).</td></tr>
```

## Acceptance Criteria
- The new row appears after `CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT` in the env vars table.
- The `k`/`M` suffix behavior is documented.
- The playbook builds without error.
