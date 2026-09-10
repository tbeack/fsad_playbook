# CBP-536: Add `--system-prompt-snapshot off` CLI flag to the System prompt & config table

## Source
Claude Code CHANGELOG.md v2.1.267: "Added `--system-prompt-snapshot off` to render the system prompt fresh on every request instead of reusing the conversation's recorded prompt (for iterating on prompt text)"

## Summary
A new CLI flag, `--system-prompt-snapshot off`, disables the default behavior of recording and reusing the system prompt across a conversation's requests. With it set, the system prompt is rendered fresh on every request — useful when actively iterating on prompt text (e.g. via `--system-prompt` / `--append-system-prompt`) and needing each request to reflect the latest edits rather than a cached snapshot.

## Assessment
`src/pages/practices.html` has a "System prompt & config" CLI Launch Flags table (~line 2059-2080) that already documents `--system-prompt` and `--append-system-prompt`. This is a new, closely related flag — **add new row** directly after `--append-system-prompt` (line 2065).

## Plan
1. Open `src/pages/practices.html`, locate the "System prompt & config" table (~line 2059-2080).
2. Add a new row after `--append-system-prompt` (line 2065):
   - `<tr><td><code>--system-prompt-snapshot off</code></td><td>Render the system prompt fresh on every request instead of reusing the conversation's recorded prompt — useful when iterating on prompt text (v2.1.267)</td></tr>`

## Acceptance Criteria
- [ ] `src/pages/practices.html` System prompt & config table has a new row for `--system-prompt-snapshot off`, version-tagged `(v2.1.267)`
- [ ] Row placed directly after `--append-system-prompt`
- [ ] `python3 scripts/build-source.py` runs clean after the edit
