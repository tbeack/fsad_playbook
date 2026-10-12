# CBP-679 — Replace the Harness page introduction with the Agentic Harness Blueprint

## Source
User correction after CBP-677 (v4.1.55). CBP-677 added a line, an example and a rule to the old introduction. The user wanted the Blueprint to replace the introduction and connect to the rest of the Harness page.
Source file: `markdown/research/Agentic Harness Blueprint.html` (copy of artifact TYgXGg4zTRcLdYCj8NynkB, 32 KB).
Decisions: D4 (replace the hero, the at-a-glance diagram and the Model vs Harness section) and D5 (native HTML, CSS and JS, restyled to the playbook theme, animation kept).

## Summary
Replace the opening of `src/pages/harness.html` with the Blueprint as a native, interactive diagram. Connect it to the sections that follow. Remove the CBP-677 additions that the Blueprint now covers.

## Assessment
**What the Blueprint is.** An interactive diagram, not prose. It has a tagline, a lede, a legend (Think, Act, Observe, Cross-cutting), a grid of 11 clickable component nodes, labelled connectors, an animated agent-loop dial ("Until done", turn 2 / 25), and a detail panel. The detail panel for each component shows a definition, responsibilities, design decisions, a "without it" line, and a worked example for "fix the failing checkout test".
The 11 components: Context Builder, Model, Tool Registry, Policy Gate, Sandbox, Observe & Trim, Verifier, Memory, Result, Tracing & Cost, Subagents.

**What the page has now.** Lines 3-7 hold the hero. Lines 9-122 hold the at-a-glance SVG figure (`harness-jobs-flow-diagram`). Lines 124-168 hold `#model-vs-harness`, which has the seven-jobs SVG (`harness-flow-diagram`), a callout, a three-layer code block and a closing paragraph.
CBP-677 also added text outside that range, in `#graph-loop-engineering`: a "Worked Example: Fix a Failing Checkout Test" block and a turn-budget paragraph.

**Dependencies found.**
- `src/pages/harness.html:496` says the maturity ladder "maps onto the seven components above". The Blueprint has 11 components.
- `src/styles.css:1871-1881` holds the CSS for the two diagrams being removed.
- `src/playbook.tmpl.html:104` links to `#seven-jobs`, which does not exist (see CBP-678).
- The three-layer block (Harness, Graph, Loop Engineering) and the sentence "The rest of this page follows these three layers" must stay true after the swap.

**Risks.**
- The Blueprint uses generic names (`.node`, `.chip`, `.row`, `.tag`, `#diagram`, `#detail`). They can collide with playbook CSS. Prefix every name with `hb-`.
- The Blueprint builds its detail panel from JavaScript strings. The search index would not see that text. Write the 11 panels as static HTML instead.
- The Blueprint uses a light paper palette and IBM Plex Sans Condensed. The playbook has dark and light themes and no condensed font. Map the colours to playbook variables and use the existing fonts.

**Location:** `src/pages/harness.html` lines 1-168, `src/styles.css`, `src/js/`, `src/playbook.tmpl.html`

## Plan

### Phase 1: Prepare
1. Read `scripts/build-source.py` and `src/js/init.js`. Find how JavaScript fragments register, so a new fragment loads once.
2. Read `scripts/build-embeddings.py`. Confirm it indexes static HTML text and ignores `hidden` panels, or find the rule it uses.
3. Map each Blueprint component to the page section that covers it in depth:
   - Context Builder and Memory: `#context-state`
   - Tool Registry and Sandbox: `#capability-plane`
   - Policy Gate: `#control-trust`
   - Observe & Trim, Verifier, Tracing & Cost: `#observe-improve`
   - Subagents and the agent loop: `#graph-loop-engineering`
   - Model and Result: no single section; link to `#task-contract` for the Result evidence block (confirm during step 1)

### Phase 2: Variants (visual change rule)
4. Build `preview.html` outside the repo (scratchpad). Render 2-3 theme variants of the node grid side by side, dark and light. Serve on localhost. Pick one with the user. Apply only that variant.

### Phase 3: Build the Blueprint
5. Write the Blueprint markup in `src/pages/harness.html` to replace lines 1-168. Keep the hero badge, title and one-line summary. Keep `id="harness-hero"`.
   - Tagline, lede and legend from the Blueprint, wording unchanged.
   - 11 `<button class="hb-node">` elements in the grid, with the connector labels.
   - The agent-loop dial with the stat "turn 2 / 25" and the exhaustion sentence.
   - 11 static detail panels (`hb-detail`), one per component. Show one at a time. Keep all 11 in the HTML.
   - Keep the worked example text for each panel from the Blueprint.
6. Add a bridge block after the Blueprint. Keep the three-layer code block. Add one link per component to the section that covers it (phase 1, step 3). Use `href="#harness/<id>"`.
7. Add the CSS to `src/styles.css`. Prefix all names `hb-`. Use playbook variables for colour so dark and light both work. Remove the CSS for `harness-flow-diagram` and `harness-jobs-flow-diagram`.
8. Add `src/js/harness-blueprint.js`. It handles node selection, `aria-pressed`, the detail panel switch and the remembered selection. Rename the storage key to `fsad-harness-blueprint-sel`. Respect `prefers-reduced-motion`.

### Phase 4: Reconcile the rest of the page
9. Fix line 496: replace "seven components" with wording that matches the 11 components.
10. Remove the CBP-677 additions from `#graph-loop-engineering` (the worked example and the turn-budget paragraph). The Blueprint now holds both. The user approved this on 2026-10-11.
11. Update the sidebar in `src/playbook.tmpl.html` so the first entries match the new sections. Coordinate with CBP-678, which fixes the other dead links.
12. Remove unused SVG assets if the two old diagrams used any.

### Phase 5: Build and verify
13. Run `python3 scripts/build-source.py`, then `python3 scripts/build-dist.py`. Confirm `Injected PLAYBOOK_EMBEDDINGS`.
14. Verify in a browser on `http://localhost:8000`: dark and light, desktop and a 390 px width, reduced motion.
15. Add a CHANGELOG entry and a changelog modal entry. Let `tb:ship-it` cut the version.

## Acceptance Criteria
- [x] `src/pages/harness.html` and `src/styles.css` no longer contain the class name `harness-jobs-flow-diagram`, and the removed Model vs Harness figure is gone. The maturity ladder figure keeps `harness-flow-diagram` on purpose.
- [x] The built page has exactly 11 `.hb-node` buttons. Their names are Context Builder, Model, Tool Registry, Policy Gate, Sandbox, Observe & Trim, Verifier, Memory, Result, Tracing & Cost and Subagents.
- [x] Clicking each of the 11 nodes shows its own detail panel. The panel heading equals the node name, and exactly one panel is visible.
- [x] The static HTML of `src/pages/harness.html` holds the definition sentence of all 11 components, and `dist/embeddings.json` holds the text "Policy Gate" from the new section.
- [x] The tagline "Agent = Model + Harness", the exhaustion sentence ("On exhaustion, stop and report what is left instead of spinning") and "fix the failing checkout test" each appear once in `#page-harness`, and the CBP-677 duplicate block is gone.
- [x] Every `href="#harness/..."` link in the new introduction points to an `id` that exists in `src/pages/harness.html`.
- [x] `src/pages/harness.html` no longer says "seven components", and the text that introduces the three layers is still accurate for the page that follows.
- [x] In dark and light themes, node text has a contrast ratio of at least 4.5 against the node background.
- [x] At a 390 px viewport width, `document.documentElement.scrollWidth` is at most `window.innerWidth` on the Harness page.
- [x] With `prefers-reduced-motion: reduce`, the dial's computed `animation-name` is `none`.
- [x] Every new class and id in the Blueprint markup and CSS starts with `hb-`.
- [x] `build-source.py` and `build-dist.py` pass, the dist log shows `Injected PLAYBOOK_EMBEDDINGS`, and the page logs no console error except the 404 for `/_vercel/insights/script.js`.

All criteria verified 2026-10-11 before commit.

## Agent Decisions Made
- 2026-10-11 — **Question:** Does the Blueprint text stay word for word where it breaks the ASD-STE100 rules (for example "The harness executes")? **Decision:** Keep the Blueprint wording as written (decision D6). Apply the rules only to text written for this task. **Why:** The Blueprint is the user's source content, and the rule file does not simplify quoted text.
- 2026-10-11 — **Question:** Which id does the new Blueprint section get? **Decision:** Keep `model-vs-harness`. **Why:** The router map and the sidebar link use that id.
- 2026-10-11 — **Question:** Which node style does the Blueprint use? **Decision:** Style B, a numbered colour chip per phase (decision D7). **Why:** The user chose it from a three-variant preview.
- 2026-10-11 — **Question:** AC1 said `harness-flow-diagram` must be gone, but the maturity ladder figure still uses it. **Decision:** The user chose to reword AC1 to cover only `harness-jobs-flow-diagram` and the removed figure (decision D8). **Why:** This task did not touch the ladder figure, so its class and CSS stay.
- 2026-10-11 — **Question:** Two light-theme example colours failed AC8 contrast (4.14 and 4.42). **Decision:** Darkened `--hb-accent` and `--hb-act` for the light theme, rebuilt, and checked again. **Why:** The AC requires at least 4.5.
- 2026-10-11 — **Question:** The panel links called `scrollToSection` for ids missing from the router map. **Decision:** Added the six ids to `sectionToPageMap`. **Why:** A refuter found the links would land on the wrong page, and I confirmed it in the code.
