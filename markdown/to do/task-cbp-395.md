# CBP-395 — [Codex] Document the `/export` slash command

## Source
Codex CLI rust-v0.148.0

## Summary
`/export` exports a complete TUI conversation to Markdown, either to the clipboard or to a new file.

## Assessment
Not covered — grep for `/export` returns nothing. The Codex cheat sheet's slash-command table already has the adjacent clipboard command `/copy` at line 13877, followed by `/status` at 13878.

## Plan
1. Insert a new `<tr>` after line 13877, before the `/status` row.
2. Match the exact row format (10-space indent):
   `<tr><td><code>/export</code></td><td>…</td></tr>`
3. Mention both destinations (clipboard, new file) and tag the version as in sibling rows.

## Acceptance Criteria
- [ ] `/export` row present in the Codex slash-command table between `/copy` and `/status`
- [ ] Both clipboard and file destinations described
- [ ] Row markup matches sibling rows exactly
