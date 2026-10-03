# CBP-639 — Add Ctrl+F and Alt+↑/↓ shortcuts to `claude agents` row

## Summary
Claude Code v2.1.288 added two new keyboard shortcuts in the agents view:
- Ctrl+F — find a session by name
- Alt+↑/↓ — jump between groups

Both shortcuts, along with session rename, can be rebound in `keybindings.json`. v2.1.288 also changed Enter in the `n:` filter (and Ctrl+F search) to open the session whose name matches best instead of the top row.

## Assessment
The `claude agents` row in `src/pages/practices.html` at line 1998 already documents `n:<text>` filtering (added in v2.1.287) but does not mention the new Ctrl+F or Alt+↑/↓ shortcuts. These are directly useful navigation tools for practitioners managing many sessions.

## Plan
1. Open `src/pages/practices.html`.
2. Locate line 1998 — the `claude agents` row ending with the `n:<text>` sentence.
3. Append the following sentence to the end of the `<td>` content, just before `</td>`:
   ` As of v2.1.288, press <kbd>Ctrl+F</kbd> to find a session by name, and <kbd>Alt+↑</kbd>/<kbd>↓</kbd> to jump between groups; both shortcuts and the rename action can be rebound in <code>keybindings.json</code>.`

## Acceptance Criteria
- The `claude agents` row now mentions Ctrl+F and Alt+↑/↓.
- `<kbd>` tags are used for key names, consistent with other keyboard shortcut documentation.
- `python3 scripts/build-source.py` runs without error.
