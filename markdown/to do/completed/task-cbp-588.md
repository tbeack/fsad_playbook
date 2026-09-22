# CBP-588: Update default alias row — Pro/Team Std now default to Opus (v2.1.280)

## Summary

v2.1.280 changed the default model on Pro and Team Standard plans from Sonnet to Opus, matching Max, Team Premium, and Enterprise.

## Assessment

The `default` alias row at line 1707 of `src/pages/practices.html` says:
"Tier-dependent (Max / Team Premium → Opus 4.8; Pro / Team Std / Enterprise / API → Sonnet 5; Bedrock / Vertex / Foundry → Opus 4.8)"

This is incorrect after v2.1.280. Pro and Team Std now resolve to Opus (like Max / Team Premium).

## Plan

Edit line 1707 in `src/pages/practices.html`. Replace the `<td>` content for the `default` alias row.

Old:
"Tier-dependent (Max / Team Premium → Opus 4.8; Pro / Team Std / Enterprise / API → Sonnet 5; Bedrock / Vertex / Foundry → Opus 4.8)"

New:
"Tier-dependent — Opus on Max, Team Premium, Pro, Team Std, Enterprise, and direct API (changed in v2.1.280; was Sonnet 5 for Pro / Team Std); Bedrock / Vertex / Foundry → Opus 4.8"

## Acceptance Criteria

- The `default` alias row correctly shows that Pro and Team Std now default to Opus.
- The v2.1.280 version tag is present so readers know when this changed.
