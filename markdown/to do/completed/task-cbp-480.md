# CBP-480 — [Codex] `/copy` response target picker; `/rename` + automatic descriptive thread titles

## Source
Codex CLI rust-v0.150.0 (2026-08-26), PRs #39997 (`/copy` picker), #40492 (auto titles), #40495 (`/rename` suggestions).

## Summary
`/copy` now offers a picker to copy the full response, an individual code block, or a blockquote. Unnamed terminal tasks automatically receive descriptive titles, and a new `/rename` command suggests an editable, conversation-based title. Update the `/copy` slash-command row and add a `/rename` row.

## Assessment
- `src/pages/codex.html` line ~1003 (`#codex-cheat-sheet` Slash Commands table): `/copy` row says "Copy the latest completed response to clipboard (also Ctrl+O)" — stale, no picker.
- No `/rename` row exists in the Slash Commands table; auto-titling is undocumented.

## Plan
1. Update the `/copy` row: picker for full responses, individual code blocks, and blockquotes (rust-v0.150.0), keeping the Ctrl+O note.
2. Insert a `/rename` row (alphabetically-adjacent placement near `/personality`/`/copy` cluster is fine; table is not strictly sorted): rename the current thread; suggests an editable title based on the conversation; unnamed tasks are auto-titled (rust-v0.150.0).

## Acceptance Criteria
- [ ] `/copy` row documents the response target picker with version tag.
- [ ] New `/rename` row present, covering suggested titles and automatic titling of unnamed tasks.
- [ ] Table row pattern (`<tr><td><code>/cmd</code></td><td>…</td></tr>`) preserved; `build-source.py` assembles cleanly.
