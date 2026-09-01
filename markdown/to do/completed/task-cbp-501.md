# CBP-501 — [Codex] Document Vim mode `/` and `?` search within drafts

## Source
Codex CLI rust-v0.152.0 release notes: "Vim mode supports `/` and `?` searches within drafts, highlighted matches, and repeat navigation with `n` and `N`." (New Features, #41586)

## Summary
Codex's Vim modal editing mode gained forward (`/`) and backward (`?`) search within the current draft, with match highlighting and repeat navigation via `n`/`N`. The existing Vim Editing Mode collapsible in Power Usage already documents motions, change operators, character replacement, and dot-repeat as they were added release-by-release — this is the same kind of incremental addition and belongs in the same paragraph pattern.

## Assessment
`src/pages/codex.html`:
- `#codex-power-usage` → "Vim Editing Mode" collapsible, lines 1161–1177. Line 1176 currently reads: "...plus expanded change motions (`cw`, `c$`, `cc`) and character replacement (`r<char>`) (rust-v0.149.0), and dot-repeat (`.`) to repeat your last edit (rust-v0.150.0)." No mention of `/`/`?` search. Gap confirmed — `update-existing`.
- `#codex-cheat-sheet` → Slash Commands table, line 1003, `/vim` row: "Toggle Vim modal editing in the composer. Set `vim_mode = true`..." — no search behavior mentioned. Optional secondary touch point; the Power Usage collapsible is the authoritative detail location per existing pattern (cheat sheet rows stay terse and point to Power Usage for depth), so only the Power Usage paragraph needs the addition.

## Plan
1. Open `src/pages/codex.html`.
2. In the Vim Editing Mode collapsible (around line 1176), extend the sentence to add the new capability, e.g.:
   ```html
   <p style="margin-top:0.75rem;">In Vim mode the composer supports standard motions (<code>hjkl</code>, <code>w/b/e</code>, <code>0/$</code>, <code>dd</code>, <code>yy</code>, <code>p</code>, visual selection), plus expanded change motions (<code>cw</code>, <code>c$</code>, <code>cc</code>) and character replacement (<code>r&lt;char&gt;</code>) (rust-v0.149.0), dot-repeat (<code>.</code>) to repeat your last edit (rust-v0.150.0), and <code>/</code> / <code>?</code> search within the current draft with highlighted matches and <code>n</code>/<code>N</code> repeat navigation (rust-v0.152.0).</p>
   ```
3. Leave the `/vim` Cheat Sheet row (line 1003) unchanged — it stays a terse pointer.
4. Run `python3 scripts/build-source.py` after all this run's edits land.

## Acceptance Criteria
- [ ] Vim Editing Mode collapsible paragraph mentions `/`/`?` search, highlighted matches, and `n`/`N` repeat navigation, tagged `rust-v0.152.0`.
- [ ] Existing content (motions, change operators, dot-repeat) preserved verbatim aside from the appended clause.
- [ ] `build-source.py` runs cleanly after all edits for this run land.
