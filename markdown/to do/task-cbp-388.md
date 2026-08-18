# CBP-388 — Note that `/permissions` can be opened mid-turn

## Source
Claude Code v2.1.234

## Summary
`/permissions` can now be opened while Claude is working; rule changes apply to the
rest of the current turn rather than only the next one.

## Assessment
Existing row at ~line 10989 in the "Model, mode & usage" slash-command table is one of
the tersest in the cheat sheet and predates this behavior. The playbook already has
precedent for documenting mid-turn actions — the `/btw` row (~10974) covers the same
"act mid-turn without interrupting" pattern.

(`/permissions` at ~13867 is the Codex page — out of scope.)

## Plan
1. Locate the `/permissions` row (~10989).
2. Append a clause noting it opens mid-turn and that rule changes take effect for the
   remainder of the current turn.
3. Preserve the existing `/allowed-tools` alias text and `&amp;` entity.

## Acceptance Criteria
- [ ] `/permissions` row notes mid-turn opening
- [ ] Row states changes apply to the rest of the current turn
- [ ] `/allowed-tools` alias retained; tagged (v2.1.234)
