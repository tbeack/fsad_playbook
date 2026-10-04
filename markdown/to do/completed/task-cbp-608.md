# CBP-608: Update `default` alias row — API now resolves to Sonnet 5.5, not Sonnet 5 (v2.1.284)

## Summary

Following CBP-607 (Sonnet 5.5 is now the default Sonnet model on the Anthropic API), the `default` alias row's "API → Sonnet 5" note is stale.

## Assessment

- `src/pages/practices.html`'s `default` alias row (~line 1712) reads: "Tier-dependent — Opus on Max, Team Premium, Pro, Team Std, and Enterprise (changed in v2.1.280: Pro and Team Std moved from Sonnet 5 to Opus, matching Max, Team Premium, and Enterprise); API → Sonnet 5; Bedrock / Vertex / Foundry → Opus 4.8". The "API → Sonnet 5" clause needs to become "API → Sonnet 5.5", version-tagged, mirroring how the v2.1.280 Pro/Team Std change was noted inline in this same cell (CBP-588).

## Plan

1. In `src/pages/practices.html`, update the `default` alias row (~line 1712) so the API clause reads:
   `API → Sonnet 5.5 (changed in v2.1.284, was Sonnet 5)`
   leaving the rest of the cell (Opus tiers, Bedrock/Vertex/Foundry clause) unchanged.

## Acceptance Criteria

- The `default` alias row's API clause names Sonnet 5.5 as the current target, version-tagged v2.1.284, and still notes the prior value (Sonnet 5) for context.
