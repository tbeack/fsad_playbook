# CBP-200 — Update the model comparison to include `Opus 4.8`

## Summary
Add Opus 4.8 to the Model & Effort section of the playbook. The current model lineup table shows Opus 4.7 / Sonnet 4.6 / Haiku 4.5; Opus 4.8 (`claude-opus-4-8`) is now the latest Anthropic frontier model and needs to be included as the new leading column, with all downstream references (aliases, workload table, effort notes, key dates) updated to reflect it.

## Assessment
The model comparison lives at `fsad-playbook.html` in the `#model-effort` section (section `12.5 — Model & Effort`), starting around line 8866. It has four key subsections that need updating:

1. **Model lineup table** (lines 8874–8895) — 4-column table: Capability | Opus 4.7 | Sonnet 4.6 | Haiku 4.5. Opus 4.8 needs to be added as a new column (leftmost after Capability), with its own row data for all 8 capability rows.

2. **Model aliases table** (lines 8897–8910) — `best`/`opus` alias currently resolves to "Latest Opus (4.7 on API)". Needs updating to 4.8.

3. **Best-practice combinations by workload** (lines 8941–8955) — All "Opus 4.7" cells in Plan/Execute/Sub-agents columns need to reference 4.8 where appropriate.

4. **Effort + Key Dates callouts** (lines 8957–8976) — `xhigh` effort note currently says "Opus 4.7 only"; Key Dates callout mentions Opus 4.7 as the new default. Both need updating.

5. **Adaptive thinking paragraph** (line 8983) — references "Opus 4.6 and Sonnet 4.6" as the models where adaptive thinking is recommended. May need to be broadened to include Opus 4.8.

6. **Cost optimization bullet** (line 8965) — tokenizer note says "migrating from Opus 4.6 → 4.7". Should add a corresponding note for 4.6/4.7 → 4.8.

7. **Cheat Sheet + Power Usage cross-references** — `xhigh` notes in `/effort` table (line 9074), CLI flags table (line 9191), and practice table (line 9413) say "Opus 4.7 only" — update to "Opus 4.7+" or "Opus 4.7 / 4.8".

**Location:** `fsad-playbook.html` — `#model-effort` section, lines 8866–9000 (primary); lines 9074, 9191, 9413, 9848 (secondary cross-references).

## Plan

### Phase 1 — Research Opus 4.8 specs

1. Use `WebFetch` or `WebSearch` to pull current Opus 4.8 specs from the Anthropic docs / model page (pricing, context window, max output, adaptive thinking support, key differentiators vs 4.7).
2. Note: API ID confirmed as `claude-opus-4-8` (from system context). Verify pricing, context window, and capability claims before writing any table cells.

### Phase 2 — Update model lineup table

3. Add `<th>Opus 4.8</th>` as the second column header (after Capability, before Opus 4.7).
4. For each of the 8 capability rows (Positioning, API ID, Input/Output, Context window, Max output, Adaptive thinking, Relative latency, Best for), add a new `<td>` cell for Opus 4.8 in the correct position.

### Phase 3 — Update aliases and workload tables

5. Update the `best`/`opus` alias row: "Latest Opus (4.8 on API; 4.7 on Bedrock / Vertex / Foundry)".
6. Update workload combination rows: replace "Opus 4.7" with "Opus 4.8" where it's the frontier recommendation; keep 4.7 where needed for compatibility context.

### Phase 4 — Update callouts and effort notes

7. Update `xhigh` effort references: "Opus 4.7 only" → "Opus 4.7 / 4.8" (or "Opus 4.7+" if that's clearer).
8. Update Key Dates callout: add a bullet for Opus 4.8 GA/availability date (from research).
9. Update adaptive thinking paragraph if Opus 4.8 changes the guidance.
10. Update cost optimization tokenizer note to mention 4.7 → 4.8 token budget impact if data is available.

### Phase 5 — Update secondary cross-references

11. Grep the file for all remaining `Opus 4.7` references outside the model-effort section; update each one that refers to "latest Opus" to say 4.8. Leave historical changelog entries untouched.
12. Run the build script: `python3 scripts/build-dist.py`.

All criteria verified 2026-05-28 before commit.

## Acceptance Criteria
- [x] Model lineup table has a new Opus 4.8 column with accurate data (API ID `claude-opus-4-8`, pricing, context, max output, adaptive thinking, latency, best-for).
- [x] `best`/`opus` alias row in the aliases table resolves to Opus 4.8 on API.
- [x] Workload table rows reference Opus 4.8 for frontier planning/execution recommendations.
- [x] `xhigh` effort callout/notes updated to include Opus 4.8 (not "4.7 only").
- [x] Key Dates callout updated with Opus 4.8 availability information.
- [x] No stale "Opus 4.7 is the latest" statements remain in the model-effort section.
- [x] Changelog entry added under `## [Unreleased]` in `CHANGELOG.md`.
- [x] `dist/fsad-playbook.html` rebuilt and in sync with source.
