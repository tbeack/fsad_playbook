# CBP-543 — Follow-up changes

1. Create a concise infographic depicting the concept of harness engineering, similar in style to `markdown/research/assets/harness-architecture-framework.jpg`.
   - **Done — with a deviation from this plan.** Implemented as a new hand-coded dual-theme inline SVG figure (`.harness-jobs-flow-diagram` wrapper, reusing a CSS toggle rule that already existed in `src/styles.css` but was unused), not as a generated PNG/design-canvas artboard as originally planned — no raster image-generation tool was available in this session. It sits directly under `#harness-hero`'s closing `<hr class="divider">`, before section 01, and shows: a "Harness Engineering — At a Glance" header, the MODEL → HARNESS "proposes / decides" split, a compact 7-chip row (01 Contract/Define … 07 Traces/Explain), a three-segment strip for Harness/Graph/Loop Engineering, and a closing "weight scales with risk" bar. The existing section-01 "Model vs Harness" diagram is untouched. Flagging for user sign-off since this was the one open-ended/design item in the batch and could not be visually browser-verified this session.
2. Bug: two images are shown for graph engineering. Show only one, matching the theme (light/dark) selected by the user. use the updated images: `~fsad_playbook/markdown/images/graph_engineering_control_graph_dark.png` and `~/fsad_playbook/markdown/images/graph_engineering_control_graph_light.png`
   - **Done.** Copied to `src/assets/graph-engineering-{dark,light}.png`; the inline SVG pair replaced with an `@asset()`-backed `<img>` pair (`graph-engineering-diagram-dark`/`-light`) inside `<figure class="graph-engineering-figure">`; added the missing `-dark`/`-light` CSS toggle rule to `src/styles.css`.
3. Bug: two images are shown for loop engineering. Show only one, matching the theme (light/dark) selected by the user. use the updated images: `~/fsad_playbook/markdown/images/loop_engineering_dark.png` and `~/fsad_playbook/markdown/images/loop_engineering_light.png`
   - **Done.** Same treatment as item 2 — `src/assets/loop-engineering-{dark,light}.png`, `<figure class="loop-engineering-figure">`, matching CSS toggle rule added.
4. Bug: two images are shown for permission check. Show only one, matching the theme (light/dark) selected by the user. use the updated images: `~/fsad_playbook/markdown/images/permission_check_dark.png` and `~/fsad_playbook/markdown/images/permission_check_light.png`
   - **Done.** Same treatment as items 2–3 — `src/assets/permission-check-{dark,light}.png`, `<figure class="permission-check-figure">`, matching CSS toggle rule added. For all three (items 2–4), each `<img>`'s `alt` text carries the original inline SVG's `<desc>` content verbatim (adapted for dark/light) so no descriptive/accessibility copy was lost in the SVG→PNG switch.
5. Change the harness engineering checklist to a concise checklist table (without selectable checkboxes).
   - **Done.** The 15-item `card-grid`/checkbox block and its progress `<p>` were replaced with a `#`/`Question` `<table class="styled-table">` (same pattern as the Maturity Ladder table just above it), verbatim question copy preserved. `src/js/harness-checklist.js` deleted and its `@include` removed from `src/playbook.tmpl.html`; the now-dead `.harness-check-item`/`.harness-checklist-progress` CSS rules removed from `src/styles.css` (grep-confirmed unused anywhere else in `src/`).

## Implementation Plan

### Root cause (items 2–4)

`src/pages/harness.html` draws the Graph Engineering, Loop Engineering, and Permission Check diagrams as hand-coded inline SVG pairs (`<svg class="flow-diagram flow-diagram--dark">` + `<svg class="flow-diagram flow-diagram--light">`), wrapped in `<figure class="graph-flow-diagram">`, `class="loop-flow-diagram">`, `class="permission-flow-diagram">` respectively.

Every other themed diagram on this page (and site) only shows one variant because `src/styles.css` has a scoped rule pair for its wrapper class, e.g.:
```css
.harness-flow-diagram .flow-diagram--light { display: none; }
[data-theme="light"] .harness-flow-diagram .flow-diagram--dark { display: none; }
[data-theme="light"] .harness-flow-diagram .flow-diagram--light { display: block; }
```
No such rule exists for `.graph-flow-diagram`, `.loop-flow-diagram`, or `.permission-flow-diagram` — so both SVGs render at once. That's the bug.

### Fix (items 2–4)

Replace the inline SVGs with the supplied PNGs, following the established `@asset()` image pattern used for the pod diagrams (`src/pages/pods.html`, `src/pages/fsad.html`):

1. Copy the 6 images into `src/assets/`, renamed to match the kebab-case asset convention:
   - `graph_engineering_control_graph_dark.png` → `graph-engineering-dark.png`
   - `graph_engineering_control_graph_light.png` → `graph-engineering-light.png`
   - `loop_engineering_dark.png` → `loop-engineering-dark.png`
   - `loop_engineering_light.png` → `loop-engineering-light.png`
   - `permission_check_dark.png` → `permission-check-dark.png`
   - `permission_check_light.png` → `permission-check-light.png`
2. In `src/pages/harness.html`, replace each `<figure class="…-flow-diagram">…two inline <svg>…</figure>` block (lines ~203–281 graph, ~376–439 loop, ~485–545 permission) with:
   ```html
   <figure class="graph-engineering-figure" aria-label="Graph Engineering — the top-level control graph">
     <img class="graph-engineering-diagram graph-engineering-diagram-dark" src="@asset(graph-engineering-dark.png)" alt="Graph Engineering — the top-level control graph (dark)">
     <img class="graph-engineering-diagram graph-engineering-diagram-light" src="@asset(graph-engineering-light.png)" alt="Graph Engineering — the top-level control graph (light)">
   </figure>
   ```
   (same shape for loop and permission-check, with matching class prefixes).
3. Add matching toggle CSS in `src/styles.css`, next to the other `-dark`/`-light` image pairs (near line 1033):
   ```css
   .graph-engineering-diagram { width: 100%; border-radius: var(--radius); display: block; }
   html[data-theme="dark"]  .graph-engineering-diagram-light { display: none; }
   html[data-theme="light"] .graph-engineering-diagram-dark  { display: none; }
   ```
   repeated for `.loop-engineering-diagram` and `.permission-check-diagram`.
4. Also verify: does anything else on the page reference the diagram's `<title>`/`<desc>` text (e.g. search index, screen-reader-only summaries)? Carry the existing descriptive copy into each `<img>`'s `alt` text since raster images lose the inline SVG `<desc>`.

### Item 5: checklist → table

1. In `src/pages/harness.html`, replace the `<div class="card-grid harness-checklist" id="harnessChecklist" …>` block (lines 734–750) with a `<div class="table-wrap"><table class="styled-table">…</table></div>`, matching the existing table pattern used for the Maturity Ladder just above it (lines 708–724) — two columns, `#` and the question text, 15 rows, same copy as today, no checkboxes.
2. Remove the now-unused `<p class="harness-checklist-progress" id="harnessChecklistProgress" …>` line (751).
3. Delete `src/js/harness-checklist.js` and its include (`src/playbook.tmpl.html:456`) — confirmed unused anywhere else in the codebase.
4. Remove the now-dead CSS rules `.harness-check-item`, `.harness-check-item .harness-check-input`, `.harness-check-item label`, `.harness-check-item:has(...)`, `.harness-checklist-progress` (`src/styles.css:1646–1658`) — confirmed scoped only to this page.

### Item 1: harness engineering infographic

- New, concise infographic condensed from the reference (`markdown/research/assets/harness-architecture-framework.jpg`), scoped to just "what is harness engineering" — not the full graph/loop internals (those already get dedicated diagrams elsewhere on the page). Content: title, the MODEL → HARNESS "proposes / decides" relationship, the seven harness jobs at a glance (Contract, Context, Tools, State, Sensors, Policy, Traces), and the three-engineering-layers footer strip (Harness / Graph / Loop) — same visual language (rounded card panels, numbered badges, purple/green accent, pill labels).
- Placement: directly under the page hero (`#harness-hero`, before section 01), as a top-of-page visual anchor. The existing inline SVG "Model vs Harness" diagram already inside section 01 stays as-is — this new graphic sits above it rather than replacing it, so it reads as a quick-skim summary before the detailed walkthrough.
- Production: build as a design-canvas artboard in the same visual style, render 2–3 concise layout variants in a throwaway scratch preview first (per house style for visual changes), pick one, export a dark/light PNG pair, save to `src/assets/harness-overview-dark.png` / `-light.png`, and wire up with the same `@asset()` + CSS toggle pattern as items 2–4.
- Flag for user sign-off before finalizing — this is the one genuinely open-ended/design item in the batch.

### Build & verification

1. `python3 scripts/build-source.py`
2. `python3 scripts/build-dist.py` — confirm it logs "Injected PLAYBOOK_EMBEDDINGS"
3. Open the rebuilt `dist/fsad-playbook.html`, check the harness page in both light and dark theme (toggle via the theme switcher) — confirm exactly one image shows per section, the checklist renders as a table, and the new infographic appears under the hero.
4. `git add src/ dist/` plus any touched `skills/playbook-assistant/index/` files if the index content changed (not just timestamp).

### Build & verification — actually done

- `python3 scripts/build-source.py` ran clean.
- `python3 scripts/build-dist.py` ran clean and logged `Injected PLAYBOOK_EMBEDDINGS`.
- Structural checks against `dist/fsad-playbook.html` (grep/Python, no browser available this session): both `-dark` and `-light` classes present for all three new diagrams; the `-dark`/`-light` CSS toggle rules made it through the build unchanged, including the reused `.harness-jobs-flow-diagram` rule (only one `display: block` wins per theme); no unresolved `@asset(` tokens; zero `harness-check-item`/`harnessChecklistProgress`/`harness-checklist.js` remnants; figure/svg/section/div/table tag counts balanced in `src/pages/harness.html`.
- **Not done this session:** actual browser/visual confirmation in light and dark theme. No browser tooling was available — this needs to happen separately before shipping, per house rules on visual changes.
- `skills/playbook-assistant/index/meta.json`: only `generated_at` changed (chunk_count unchanged at 359) — reverted via `git checkout --`, per repo convention. `playbook-index.jsonl` had a real one-line content diff (the harness page's Observe+Improve chunk text shifted) — staged.
- Staged: `src/` (including new `src/assets/*.png`, deleted `src/js/harness-checklist.js`, edited `harness.html`/`styles.css`/`playbook.tmpl.html`), `dist/` (`fsad-playbook.html`, `embeddings.json`), and `skills/playbook-assistant/index/playbook-index.jsonl`. Not committed, per repo's no-auto-commit convention.
