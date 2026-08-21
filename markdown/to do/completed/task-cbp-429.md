# CBP-429 — [Codex] Expanded Vim editing motions

## Source
Codex CLI rust-v0.149.0 release notes: "Expanded Vim editing with character replacement and more change motions such as `cw`, `c$`, and `cc`."

## Summary
Codex's Vim modal editing mode gains character replacement and additional change motions (`cw`, `c$`, `cc`). The Vim Editing Mode collapsible (`id="codex-power-usage"`, ~line 14059-14077) explicitly lists supported motions and needs this update.

## Assessment
Content exists but is now incomplete/stale. Line 14074 currently lists: "standard motions (`hjkl`, `w/b/e`, `0/$`, `dd`, `yy`, `p`, visual selection)" — missing the new change motions and character replacement.

## Plan
1. In `fsad-playbook.html`, locate the sentence at line 14074 inside `id="codex-power-usage"` Vim Editing Mode collapsible.
2. Extend the motion list to include `cw`, `c$`, `cc` (change motions), and note character replacement support (e.g. `r<char>`). Append `(rust-v0.149.0)` to the added portion, keeping the original v0.129.0 baseline attribution for the pre-existing motions intact.

## Acceptance Criteria
- [ ] Vim Editing Mode collapsible's motion list includes `cw`, `c$`, `cc`, and character replacement, tagged `(rust-v0.149.0)`.
- [ ] Original motion list (`hjkl`, `w/b/e`, `0/$`, `dd`, `yy`, `p`, visual selection) and v0.129.0 attribution preserved.
