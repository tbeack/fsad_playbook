# CBP-415: Note slash-command typo/fuzzy-match reporting behavior

## Source
Claude Code v2.1.236 changelog: "Pressing Enter on a slash-command typo or a command unavailable in this session now reports it instead of running the closest fuzzy match; prefixes and aliases still run."

## Summary
Previously, pressing Enter on a mistyped or unavailable slash command would silently run the closest fuzzy-matched command. As of v2.1.236, Claude Code instead reports the typo/unavailability rather than guessing — while valid prefixes and aliases continue to work as before.

## Assessment
Does content exist? No — none of the Slash Commands tables in the Cheat Sheet mention typo handling or fuzzy-matching behavior. This is a user-visible safety-relevant change (the old behavior could silently run the wrong command), worth a short callout rather than a full new row since it's a cross-cutting behavior change, not a new command.

## Plan
1. Open `fsad-playbook.html`, locate the Cheat Sheet's "Slash Commands" `<h3>` heading and intro `<p>` (currently lines 10957-10959: `<h3>...Slash Commands</h3>` followed by `<p>...Session, context &amp; history</p>`).
2. Add a short note directly after the `<h3>` and before the "Session, context & history" sub-label `<p>`, e.g. as a small `<p>` with muted styling matching the existing sub-labels:
   `<p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.75rem;">As of v2.1.236, pressing Enter on a mistyped or unavailable slash command reports the issue instead of silently running the closest fuzzy match; valid prefixes and aliases still run normally.</p>`
3. Keep this as a single note at the top of the Slash Commands section rather than repeating it per-table, since it applies to all the slash-command tables below it.

## Acceptance Criteria
- [ ] A note near the top of the Cheat Sheet's Slash Commands section documents the new typo/unavailable-command reporting behavior and that prefixes/aliases still work.
- [ ] Version v2.1.236 is cited.
- [ ] The note doesn't break the existing heading/table structure that follows it.
