# CBP-615 [Codex] Update `/tui` row — fullscreen now default, add Shift-click keyboard shortcut (rust-v0.157.0)

## Summary

Codex rust-v0.157.0 enables fullscreen transcripts by default (no longer opt-in) and adds Shift-click to extend text selections in the transcript.

## Assessment

**`/tui` cheat sheet row** — the word "optional" was outdated. Updated to note fullscreen is the default and mentions Shift-click.

**Keyboard shortcuts table** — no Shift-click entry existed. Added a new row.

## Plan

1. Update the `/tui` row: remove "optional", note fullscreen is enabled by default as of rust-v0.157.0, mention Shift-click extends selections.
2. Add a new keyboard shortcut row after Alt+.: `<tr><td><kbd>Shift</kbd>+click</td><td>Extend the transcript text selection from the current cursor position (rust-v0.157.0)</td></tr>`

## Acceptance Criteria

- `/tui` row no longer describes fullscreen as "optional".
- `/tui` row notes fullscreen is enabled by default as of rust-v0.157.0.
- Keyboard shortcuts table includes a Shift+click row.
- No HTML is broken; the build succeeds.
