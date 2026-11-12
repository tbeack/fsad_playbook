# CBP-696 — Add `CLAUDE_CODE_AUTO_MODE_MODEL` env var to env vars table

## Summary

Claude Code v2.1.302 adds a new environment variable: `CLAUDE_CODE_AUTO_MODE_MODEL`. It lets you choose the model the client-side auto mode classifier uses. It does not affect the model used by the server-side classifier.

## Assessment

The env var is not in the playbook. The related row `CLAUDE_CODE_AUTO_MODE_SERVER=0` is at line 2743 of `src/pages/practices.html`. That row is the right anchor: `CLAUDE_CODE_AUTO_MODE_MODEL` applies only when the local classifier runs (i.e., when `CLAUDE_CODE_AUTO_MODE_SERVER=0` is set or when the server classifier is unavailable). Place the new row directly after the `CLAUDE_CODE_AUTO_MODE_SERVER=0` row.

## Plan

1. Open `src/pages/practices.html`.
2. Find the `CLAUDE_CODE_AUTO_MODE_SERVER=0` row (line ~2743).
3. Insert a new `<tr>` row immediately after it:

```html
<tr><td><code>CLAUDE_CODE_AUTO_MODE_MODEL</code></td><td>Sets the model for the client-side auto mode classifier. Applies only when the local classifier is active (e.g., with <code>CLAUDE_CODE_AUTO_MODE_SERVER=0</code>). Does not change the model used by the server-side classifier (v2.1.302).</td></tr>
```

4. Save the file.

## Acceptance Criteria

- The row appears immediately after `CLAUDE_CODE_AUTO_MODE_SERVER=0` in the env vars table.
- The row notes that it applies to the client-side classifier only.
- No other rows are affected.
