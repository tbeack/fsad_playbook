# CBP-541: Update the `/copy` Cheat Sheet row for rich-text formatting + status/field copy

## Source
Codex CLI rust-v0.154.0 release notes: "Copying responses preserves formatting in rich-text apps, and `/copy` can copy status output or individual session fields." (#42847, #43055)

## Summary
The `/copy` command already opens a picker (as of rust-v0.150.0) to copy the full response, an individual code block, or a blockquote. rust-v0.154.0 extends this in two ways: (1) copied content now preserves formatting when pasted into rich-text applications (not just plain text), and (2) the `/copy` picker can also copy `/status`-style output or individual session fields, not just response content.

## Assessment
`src/pages/codex.html` `#codex-cheat-sheet` slash-commands table has a `/copy` row (~line 1010) describing the `Ctrl+O` shortcut and the rust-v0.150.0 picker (full response / code block / blockquote). This is a direct **update-existing** — extend that row's description.

## Plan
1. Open `src/pages/codex.html`, locate the `/copy` row in the slash-commands table (~line 1010).
2. Update the cell text to add the two rust-v0.154.0 additions, keeping the existing `Ctrl+O` / rust-v0.150.0 picker language intact:
   ```html
   <tr><td><code>/copy</code></td><td>Copy the last response (<kbd>Ctrl+O</kbd>). As of rust-v0.150.0, opens a picker to copy the full response, an individual code block, or a blockquote. As of rust-v0.154.0, copied content preserves formatting when pasted into rich-text apps, and the picker can also copy status output or individual session fields.</td></tr>
   ```
3. Leave the rest of the table untouched.

## Acceptance Criteria
- [ ] The `/copy` row describes rich-text formatting preservation and status/field copying, tagged `(rust-v0.154.0)`.
- [ ] Existing `Ctrl+O` and rust-v0.150.0 picker language is preserved, not removed.
- [ ] `python3 scripts/build-source.py` completes without error after the edit.
