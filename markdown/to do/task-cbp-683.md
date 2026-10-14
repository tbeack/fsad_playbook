# CBP-683 — Add CLAUDE_CODE_DISABLE_FILE_MENTIONS to env vars table

**Source:** Claude Code v2.1.299  
**Date:** 2026-10-14

## Summary

Claude Code v2.1.299 added `CLAUDE_CODE_DISABLE_FILE_MENTIONS`: when set, Claude receives only the file paths of @-mentioned files rather than their contents. Claude then decides which files to open with its file tools, rather than having the content injected automatically. Useful when @-mentioning large or sensitive files where you want read-access control to stay with the model.

## Assessment

The hardening env vars table in `src/pages/practices.html` (~lines 2720–2775) lists session-level environment variables. `CLAUDE_CODE_DISABLE_FILE_MENTIONS` is not in it. The last row in the table is `CLAUDE_CODE_DISABLE_STRUCTURED_OUTPUTS=1` (~line 2774).

## Plan

File: `src/pages/practices.html`

After the line:
```html
              <tr><td><code>CLAUDE_CODE_DISABLE_STRUCTURED_OUTPUTS=1</code></td><td>Turns off structured output formatting for session-title generation, memory recall, and prompt-hook requests. Use when running behind Mantle or a gateway that rejects structured outputs and those features are failing (v2.1.288).</td></tr>
```
Add:
```html
              <tr><td><code>CLAUDE_CODE_DISABLE_FILE_MENTIONS=1</code></td><td>When set, Claude receives only the file paths of @-mentioned files rather than their contents — Claude then reads each file with its file tools on its own terms. Use when @-mentioning large or sensitive files where automatic content injection is undesirable (v2.1.299).</td></tr>
```

## Acceptance Criteria

- `CLAUDE_CODE_DISABLE_FILE_MENTIONS` appears in the hardening env vars table.
- The row follows the same `<tr><td>...</td><td>...</td></tr>` pattern as neighbors.
- No HTML syntax errors around the insertion.
- Build scripts run without error.
