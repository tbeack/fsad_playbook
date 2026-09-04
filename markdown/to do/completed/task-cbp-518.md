# CBP-518 — Update `Ctrl+L` Keyboard Row with Fullscreen Clear-Transcript Behaviour

## Source
Claude Code v2.1.260

## Summary
v2.1.260 changes `ctrl+l` / `cmd+k` in fullscreen mode to clear the transcript view like a terminal `clear`; scroll up to see earlier messages.

## Assessment
`src/pages/practices.html` line 1830 has `Ctrl+L` — "Force screen redraw (does not clear input — readline behavior as of v2.1.126)". No `Cmd+K` shortcut is documented (the existing `Ctrl+K` at line 1851 is "delete to end of line", a different key). Update existing.

## Plan
1. Read line 1830.
2. Replace with:
   ```html
   <tr><td><kbd>Ctrl+L</kbd> / <kbd>Cmd+K</kbd></td><td>Force screen redraw (does not clear input — readline behavior as of v2.1.126). In fullscreen mode, as of v2.1.260, clears the transcript view like a terminal <code>clear</code> — scroll up to see earlier messages.</td></tr>
   ```

## Acceptance Criteria
- `Ctrl+L` row mentions fullscreen clear-transcript behaviour and `Cmd+K`
- Version attribution v2.1.260 included
- HTML is valid
