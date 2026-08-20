# CBP-390 — Note that Esc no longer clears a mouse text selection in fullscreen

## Source
Claude Code v2.1.234

## Summary
Esc in fullscreen mode no longer clears a mouse text selection — it interrupts or
dismisses as usual and the selection stays highlighted.

## Assessment
This is the natural companion to CBP-381: CBP-381 documents how to *bind* a key to
`selection:clear`; this entry explains *why you now need to*, since Esc no longer does
it implicitly. Belongs on the `Esc` row (~10926) in the keyboard-shortcuts table
(~10925-10951) rather than duplicated on the `/keybindings` row (~11029), so the two
cross-reference cleanly.

Precedent: the neighbouring `Ctrl+L` row (~10929) uses exactly this pattern —
"does not clear input — readline behavior as of v2.1.126".

## Plan
1. Locate the `Esc` row (~10926) in the keyboard shortcuts table.
2. Append a clause: in fullscreen it no longer clears a mouse text selection; the
   highlight stays put while Esc interrupts/dismisses as usual.
3. Cross-reference the `selection:clear` binding for readers who want that behavior back.

## Acceptance Criteria
- [ ] `Esc` row notes the selection is preserved in fullscreen
- [ ] Row cross-references the `selection:clear` keybinding action
- [ ] Tagged (v2.1.234); `<kbd>Esc</kbd>` cell unchanged
