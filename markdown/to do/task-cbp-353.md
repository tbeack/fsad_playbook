# CBP-353 — [Claude] Add `CLAUDE_CODE_DISABLE_1M_CONTEXT` scope change + new `CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT` var

## Source
Claude Code v2.1.223

## Summary
v2.1.223 broadened `CLAUDE_CODE_DISABLE_1M_CONTEXT` to hold every Claude model with a native 1M context window to 200K via auto-compaction (not just a fixed list), and added a new `CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT` var (set to `1` to restore the previous behavior of not enforcing an assumed context window on unrecognized model IDs). Auto-compact now also keeps sessions on unrecognized model IDs within the assumed context window by default.

## Assessment
Neither env var currently appears anywhere in `fsad-playbook.html` (confirmed via grep) — this is a net-new addition to the hardening env vars table, not a correction of stale content.

## Plan

### Step 1 — Insert two new rows in the hardening env vars table (after the `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` row, ~line 11828)
```html
<tr><td><code>CLAUDE_CODE_DISABLE_1M_CONTEXT</code></td><td>Holds every Claude model with a native 1M-token context window to 200K via auto-compaction, not just a fixed list of models (broadened in v2.1.223). Use when you want consistent 200K-equivalent compaction behavior regardless of which 1M-capable model is active.</td></tr>
<tr><td><code>CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT=1</code></td><td>As of v2.1.223, auto-compact keeps sessions on unrecognized model IDs within the assumed context window by default (a startup warning appears if this isn't holding the session to the expected size). Set this var to restore the previous behavior, letting unrecognized-model sessions grow past the assumed window unmanaged.</td></tr>
```

## Acceptance Criteria
- `CLAUDE_CODE_DISABLE_1M_CONTEXT` row present with updated v2.1.223 behavior description
- `CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT` row present
- HTML is valid
