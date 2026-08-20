# CBP-414: Update `/usage` row with Team/Enterprise usage-credits spend row

## Source
Claude Code v2.1.236 changelog: "`/usage` now shows the usage-credits spend row for Team and Enterprise members, and shows a capped row at 0% before anything is spent."

## Summary
The `/usage` dashboard now displays a usage-credits spend row for Team and Enterprise members (previously presumably limited to other tiers), and shows that row capped at 0% before any credits have been spent.

## Assessment
Does content exist? Partial — the `/usage` row in the Cheat Sheet (currently line 10992) documents the unified dashboard's three tabs and per-category breakdown (v2.1.149) but doesn't mention the usage-credits spend row or its Team/Enterprise-specific behavior.

## Plan
1. Open `fsad-playbook.html`, locate the `/usage` row in the Cheat Sheet's "Model, mode & usage" table (currently line 10992): `<tr><td><code>/usage</code></td><td>Unified usage dashboard with three tabs: ...`.
2. Append a sentence to the end of that row's description:
   `As of v2.1.236, /usage also shows a usage-credits spend row for Team and Enterprise members, capped at 0% before any credits have been spent.`
3. Keep this distinct from the separate `/usage-credits` row immediately below (line 10993) — that command is for viewing credits balance directly; this edit documents a new row surfaced inside the `/usage` dashboard itself.

## Acceptance Criteria
- [ ] The `/usage` Cheat Sheet row documents the Team/Enterprise usage-credits spend row and its 0%-capped display.
- [ ] Version v2.1.236 is cited.
- [ ] The `/usage-credits` row (line 10993) is left unchanged.
