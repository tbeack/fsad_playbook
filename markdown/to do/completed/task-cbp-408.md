# CBP-408: Document the built-in "Concise" output style

## Source
Claude Code v2.1.237 changelog: "Added a built-in 'Concise' output style: Claude leads with results and skips preamble and narration, while doing the work just as thoroughly. Select it under Output style in /config."

## Summary
Claude Code v2.1.237 added a new built-in output style called "Concise" that changes how responses are framed (leads with results, skips preamble/narration). It's selected via `/config` → Output style. Nothing about "output style" is currently documented anywhere in the playbook.

## Assessment
Does content exist? No — grep for "output style" in `fsad-playbook.html` returns no matches. The `/config` row in the Cheat Sheet (Claude Best Practices → Cheat Sheet → Configuration & setup table) already accumulates "As of vX.X.X, ..." follow-up sentences documenting incremental `/config`-surfaced features (see the existing "Continue automatically at usage limit" sentence added for v2.1.234). This is the established pattern for this kind of change.

## Plan
1. Open `fsad-playbook.html`, locate the `/config` row in the Cheat Sheet's "Configuration & setup" table (search for `/config` `[key=value]`; as of this writing it's at line 11023, within the table that starts at line 11020 following the `<p>...Configuration &amp; setup</p>` label at line 11018).
2. Append a new sentence to the end of that row's description cell, following the existing "As of vX.X.X, ..." pattern, e.g.:
   `As of v2.1.237, a built-in "Concise" output style is available: Claude leads with results and skips preamble/narration while doing the work just as thoroughly. Select it under Output style in /config (v2.1.237).`
3. Do not create a new row/table — this is a `/config`-surfaced option, matching the existing pattern of appending to the `/config` row rather than duplicating rows for every settable option.

## Acceptance Criteria
- [ ] The `/config` row in the Cheat Sheet's Configuration & setup table mentions the "Concise" output style and how to select it.
- [ ] The addition follows the existing "As of vX.X.X, ..." sentence-append pattern used elsewhere in that row.
- [ ] No HTML structure (table rows/tags) broken; `<tr>`/`<td>` balance preserved.
