# CBP-535: Document `maxEffortLevel` setting in Notable settings.json Keys

## Source
Claude Code CHANGELOG.md v2.1.267: "Added `maxEffortLevel` setting (top-level or per model under `modelSettings`): caps the effort level on every provider, including Bedrock, Vertex and Foundry; users can still pick a lower level"

## Summary
A new `settings.json` key, `maxEffortLevel`, caps the maximum `/effort` level a session can run at. It can be set globally (top-level) or scoped to a specific model via `modelSettings`, and applies across every provider (API, Bedrock, Vertex, Foundry). Users can still select a lower effort level than the cap; they just can't exceed it.

## Assessment
`src/pages/practices.html` has a "Notable `settings.json` Keys" callout (~line 611-657) that already documents related effort/model settings (`modelPicker`, `modelPricing`) and follows a consistent one-`<li>`-per-setting format with a trailing `(vX.Y.Z)` version tag. This is a new setting — **add new entry**, placed near the other model/effort-related settings (after `modelPricing`, ~line 651).

## Plan
1. Open `src/pages/practices.html`, locate the Notable `settings.json` Keys list (~line 611-657).
2. Add a new `<li>` after the `modelPricing` entry (line 651) documenting `maxEffortLevel`:
   - Top-level or per-model (`modelSettings`) scoping
   - Caps the max effort level; users can still pick lower
   - Applies across all providers including Bedrock/Vertex/Foundry
   - Tag `(v2.1.267)`
3. Match existing formatting: `<li style="margin-bottom:0.4rem;"><code>maxEffortLevel</code> — ...</li>`

## Acceptance Criteria
- [ ] `src/pages/practices.html` Notable settings.json Keys callout documents `maxEffortLevel`, version-tagged `(v2.1.267)`
- [ ] Entry notes top-level vs. per-model `modelSettings` scoping and cross-provider (Bedrock/Vertex/Foundry) applicability
- [ ] `python3 scripts/build-source.py` runs clean after the edit
