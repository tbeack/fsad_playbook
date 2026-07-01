# CBP-288 — Add Claude Sonnet 5 to Model & Effort section (v2.1.197)

## Summary

Claude Code v2.1.197 (released 2026-06-30) makes **Claude Sonnet 5** the new default model. Key verified facts from the Anthropic docs:

- **API ID:** `claude-sonnet-5`
- **Context window:** 1M tokens (native — uses new tokenizer, same as Opus 4.8 / Fable 5)
- **Max output:** 128k tokens (doubled from Sonnet 4.6's 64k)
- **Pricing (standard):** $3 / $15 per MTok (input / output)
- **Pricing (promotional):** $2 / $10 per MTok through August 31, 2026
- **Adaptive thinking:** Yes — defaults to `high` on API and Claude Code
- **Extended thinking:** No
- **Comparative latency:** Fast
- **Positioning:** "The best combination of speed and intelligence"; narrows gap to Opus 4.8; substantial improvement over Sonnet 4.6
- **Tokenizer note:** Uses newer tokenizer (same as Opus 4.7+); same input maps to ~1.0–1.35× more tokens than pre-4.7 models
- **Sonnet 4.6 status:** Now a legacy model

The `sonnet` alias in Claude Code resolves to Sonnet 5 as of v2.1.197.

## Assessment

The playbook's Model & Effort section (§12.5, lines ~9680–9820) currently shows:
- Model lineup table with columns: Fable 5, Opus 4.8, Opus 4.7, Sonnet 4.6, Haiku 4.5
- Model aliases table where `sonnet` → "Latest Sonnet (4.6 on API; 4.5 on Bedrock / Vertex / Foundry)"
- `default` alias → "Pro / Team Std / Enterprise / API → Sonnet 4.6"
- Key Dates callout (lines ~9786–9794) — no Sonnet 5 entry
- Best-practice combinations table — uses Sonnet 4.6 throughout
- Default Effort callout — references "Sonnet 4.6 or Opus 4.7 / 4.6" for Pro/Max high effort default
- Adaptive thinking paragraph — lists "Sonnet 4.6" alongside Opus models

Sonnet 4.6 is not deprecated (still available as legacy) so it should remain in the lineup table but can be de-emphasized. Sonnet 5 needs to be added as the current "balanced daily driver" column (replacing Sonnet 4.6's role), and Sonnet 4.6 should be noted as legacy.

## Plan

### 1. Model lineup table (lines ~9688–9710)

Add a **Sonnet 5** column after Opus 4.7, before the now-legacy Sonnet 4.6. Rename the Sonnet 4.6 header to add "(legacy)". Update Sonnet 5 column with all verified values:
- Positioning: "The best combination of speed and intelligence — most agentic Sonnet yet"
- API ID: `claude-sonnet-5`
- Input/Output pricing: $3 / $15 (promo: $2 / $10 through Aug 31, 2026)
- Context window: 1M tokens
- Max output: 128k
- Adaptive thinking: Yes (default `high`)
- Latency: Fast
- Best for: "80%+ of day-to-day coding, tests, tool use — replaces Sonnet 4.6 as daily driver"

Keep Sonnet 4.6 column but add "(legacy)" to header.

### 2. Model aliases table (lines ~9712–9726)

Update:
- `sonnet` row: "Latest Sonnet (5 on API; 4.6 on Bedrock / Vertex / Foundry)" (or just "claude-sonnet-5")
- `default` row: update "Sonnet 4.6" references → "Sonnet 5"
- `opusplan` stays as-is (Opus plan → Sonnet execute, now Sonnet 5 for execution)

### 3. Best-practice combinations table (lines ~9760–9770)

Update "Sonnet 4.6" → "Sonnet 5" in Execute and Sub-agents columns throughout.

### 4. Key Dates callout (lines ~9786–9794)

Add new bullet at top:
- **June 30, 2026** — **Claude Sonnet 5 released** (`claude-sonnet-5`). New default model in Claude Code. Native 1M context, 128k max output, adaptive thinking. Promo pricing $2/$10 per MTok through Aug 31 (standard $3/$15). Update to v2.1.197 for access. [Announcement →](https://www.anthropic.com/news/claude-sonnet-5)

### 5. Default Effort callout (line ~9798)

Add Sonnet 5 to the list of models that default to `high` effort. Per docs: "On Claude Sonnet 5, it defaults to `high` on the Claude API and Claude Code." Update the callout text.

### 6. Adaptive thinking paragraph (line ~9802)

Add "Sonnet 5" alongside the Opus models in the "adaptive thinking recommended mode" sentence.

### 7. budget_tokens deprecated callout (line ~9818)

Add Sonnet 5 to the list of models where `budget_tokens` is deprecated.

### 8. Cheat Sheet `/effort` row (line ~9894) and `--effort` flag row (line ~10012)

Update the "Default: `high` for Opus 4.8 (all surfaces) and Pro/Max on Sonnet 4.6 / Opus 4.7 / 4.6" to include Sonnet 5.

## Acceptance Criteria

- [ ] Model lineup table has a Sonnet 5 column with all 7 rows filled with verified values
- [ ] Sonnet 4.6 column header shows "(legacy)"
- [ ] `sonnet` alias resolves to Sonnet 5
- [ ] `default` alias no longer says "Sonnet 4.6" for Pro/API tier
- [ ] Key Dates has a June 30, 2026 entry for Sonnet 5
- [ ] Best-practice combinations uses Sonnet 5, not Sonnet 4.6
- [ ] Effort callout and adaptive thinking text include Sonnet 5
- [ ] Promo pricing is noted as promotional through Aug 31 (not permanent)
- [ ] Sonnet 4.6 max output corrected if needed (docs show 128k, playbook shows 64k — verify)
- [ ] No invented/unverified values
