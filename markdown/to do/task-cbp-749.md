# CBP-749 — Add cross-backend session switching to Session Management (rust-v0.167.0)

## Summary
In Codex rust-v0.167.0, users can switch between connected backends from the terminal session picker while keeping their drafts. This is a meaningful workflow improvement not currently documented in the Session Management section.

## Assessment
The Session Management collapsible is in `src/pages/codex.html` around lines 1255–1294. The second paragraph (line 1263) ends with a note about v0.150.0 task management tools. The new cross-backend switching content should be appended to this paragraph.

## Plan
1. Open `src/pages/codex.html`.
2. Find the sentence ending with "via its new task-management tools." in the Session Management paragraph (line 1263).
3. Append a new "As of rust-v0.167.0" sentence before the closing `</p>` tag.

New sentence to append:
```
 As of rust-v0.167.0, you can <strong>switch between connected backends</strong> from the terminal session picker without losing your drafts — select a different backend directly in the picker and your in-progress prompt stays intact.
```

## Acceptance Criteria
- Session Management paragraph mentions cross-backend switching and draft preservation.
- Version tag rust-v0.167.0 is included.
- No other paragraphs or sections are affected.
