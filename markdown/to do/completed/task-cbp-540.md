# CBP-540: Update the Vim Editing Mode collapsible to cover `R` replace mode

## Source
Codex CLI rust-v0.154.0 release notes: "Vim editing gains `R` replace mode with undo and dot-repeat, plus more reliable Escape handling in legacy terminals." (#42194, #42584)

## Summary
Codex's Vim modal editing already documents incremental motion additions release-by-release (`r<char>` at rust-v0.149.0, dot-repeat at rust-v0.150.0, search at rust-v0.152.0, undo/redo at rust-v0.153.0). rust-v0.154.0 adds `R` (multi-character replace mode, distinct from the single-character `r<char>` already documented), with undo and dot-repeat support, plus more reliable Escape handling in legacy terminals.

## Assessment
`src/pages/codex.html` `#codex-power-usage` "Vim Editing Mode" collapsible (~line 1168-1181) has a paragraph enumerating motions in the order they shipped, each tagged with its version. This is a direct **update-existing** — append the new `R` mode (and Escape-handling note) to that same paragraph, in the same style.

## Plan
1. Open `src/pages/codex.html`, locate the Vim Editing Mode collapsible body paragraph (~line 1180, the long sentence listing `hjkl`, `w/b/e`, `0/$`, `dd`, `yy`, `p`, `cw`/`c$`/`cc`, `r<char>` (rust-v0.149.0), `.` (rust-v0.150.0), `/`/`?`/`n`/`N` (rust-v0.152.0), `u`/`Ctrl+R` (rust-v0.153.0)).
2. Extend that sentence with the new rust-v0.154.0 addition, keeping the established "motion (version)" pattern:
   ```html
   ... undo (<code>u</code>) and redo (<code>Ctrl+R</code>) that preserve complete drafts, pasted content, and attachments (rust-v0.153.0), and multi-character replace mode (<code>R</code>) with its own undo and dot-repeat support (rust-v0.154.0).
   ```
3. Add a short trailing note about the Escape-handling fix, appended after the existing `/keymap debug` sentence in the same paragraph:
   ```html
   Escape handling in legacy/older terminals is also more reliable as of rust-v0.154.0, so Vim-mode mode switches register consistently even outside modern terminal emulators.
   ```
4. Do not alter the `/vim` or `/keymap` Cheat Sheet rows (lines 1005-1006) — they stay generic pointers and don't enumerate individual motions.

## Acceptance Criteria
- [ ] The Vim Editing Mode collapsible's motion list includes `R` replace mode tagged `(rust-v0.154.0)`.
- [ ] The collapsible also notes the more-reliable Escape handling in legacy terminals, tagged `(rust-v0.154.0)`.
- [ ] No other Vim-related content is altered beyond this paragraph.
- [ ] `python3 scripts/build-source.py` completes without error after the edit.
