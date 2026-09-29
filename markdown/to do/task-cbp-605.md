# CBP-605 [Codex] Update `/tui` row — fullscreen now default, add Shift-click keyboard shortcut (rust-v0.157.0)

## Summary

Codex rust-v0.157.0 enables fullscreen transcripts by default (no longer opt-in) and adds Shift-click to extend text selections in the transcript.

## Assessment

**`/tui` cheat sheet row** (`src/pages/codex.html`, line ~1006):
```
<tr><td><code>/tui</code></td><td>Switch to the optional fullscreen TUI for your next launch. The fullscreen mode adds transcript search, mouse-based text selection, and right-click copying. (rust-v0.156.0)</td></tr>
```
The word "optional" is now outdated — fullscreen is the default. The description should be updated. Also needs a note about Shift-click.

**Keyboard shortcuts table** (`src/pages/codex.html`, lines ~963–971):
No Shift-click entry exists. Need to add a row.

## Plan

1. Read `src/pages/codex.html` lines 1003–1010 to confirm the `/tui` row text.
2. Update the `/tui` row: remove "optional", note fullscreen is now the default, mention Shift-click extends selections. Version tag: rust-v0.157.0.
3. Read lines 963–975 for the keyboard shortcuts table.
4. Add a new keyboard shortcut row after the last existing shortcut (before the closing `</tbody>`):
   ```html
   <tr><td><kbd>Shift</kbd>+click</td><td>Extend the transcript selection from the current cursor position (rust-v0.157.0)</td></tr>
   ```

## Acceptance Criteria

- `/tui` row no longer describes fullscreen as "optional".
- `/tui` row includes a note that fullscreen is enabled by default as of rust-v0.157.0.
- Keyboard shortcuts table includes a Shift+click row with a clear description.
- No HTML is broken; the build succeeds.
