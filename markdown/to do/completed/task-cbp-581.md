# CBP-581: Add /voice experimental voice conversations — Cheat Sheet row + Power Usage collapsible (rust-v0.155.0)

## Source
Codex CLI rust-v0.155.0 release notes: "Added experimental `/voice` conversations with live transcripts and microphone controls on supported builds, enabled through `/experimental`." (#43581, #43651, #44331)

## Summary
Codex gains an experimental voice-conversation mode: `/voice` starts a live, transcribed voice session with microphone controls (mute shortcut, recording activity indicator). It ships behind the `/experimental` opt-in flag rather than being on by default.

## Assessment
No existing content in `src/pages/codex.html` covers voice input or an `/experimental` opt-in mechanism (confirmed via search — no prior "voice" or "/experimental" references besides an unrelated MCP-auth mention). This is a genuinely new, substantial feature — **new-section** — needs both a Cheat Sheet row (`#codex-cheat-sheet`) and an explanatory Power Usage collapsible (`#codex-power-usage`), matching how "Worktree Sessions" (CBP-538) was introduced for the last new experimental feature.

## Plan
1. Open `src/pages/codex.html`.
2. In `#codex-cheat-sheet`, Slash Commands table, add a new row immediately after the `/worktree` row (~line 1005):
   `<tr><td><code>/voice</code></td><td>Start an experimental voice conversation with live transcripts and microphone controls; enable first via <code>/experimental</code> (rust-v0.155.0)</td></tr>`
3. In `#codex-power-usage`, insert a new "Voice Conversations" collapsible immediately after the "Worktree Sessions" collapsible and before "Inline Async Questions" (~line 1182), following the exact collapsible markup pattern (`collapsible` / `collapsible-header` with `<h3>` + chevron span / `collapsible-body` > `collapsible-content`) used by neighboring collapsibles. Body content: explain `/voice` is experimental (enable via `/experimental`), gives a live transcribed voice session with mute shortcut and recording-activity indicator, available on supported builds, tagged `rust-v0.155.0`.
4. Mark CBP-581 complete in `markdown/to do/todo.md`.

## Acceptance Criteria
- `/voice` appears as a Cheat Sheet Slash Commands row, tagged `rust-v0.155.0`.
- A new "Voice Conversations" collapsible exists in `#codex-power-usage`, positioned between "Worktree Sessions" and "Inline Async Questions".
- Collapsible markup/classes match existing collapsibles exactly.
- `python3 scripts/build-source.py` completes without error after the edit.
