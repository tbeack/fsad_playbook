# CBP-087 — Enhance Security Review Team section: diagram, specialist definitions, distribution

## Summary

The §10.6 Security Review Team section currently has a flat specialist table, invocation examples, and a legacy-prompt collapsible. This task adds three things: (1) an inline SVG interaction diagram (theme-aware: dark + light variants) showing the orchestrator/specialist flow; (2) collapsible definition cards for all 13 specialists; and (3) an embedded distribution section with all skill files as copy-paste code blocks so readers can install the skill directly from the playbook.

## Assessment

The section spans `fsad-playbook.html` lines 4238–4331. Current structure:
- Invocation callout (line 4243–4246)
- Specialist table, 13 rows (lines 4251–4274)
- Example Invocation code block (lines 4276–4289)
- Output description paragraph (line 4291)
- Legacy monolithic prompt collapsible (lines 4293–4325)
- "How to Adapt" callout (lines 4327–4330)

**Skill files to embed** (all at `.claude/skills/sec-review-team/`):
- `SKILL.md` (~362 lines) — orchestrator
- `stack-signals.md` (64 lines) — stack detection rules
- `specialists/*.md` (13 files, 671 lines total, avg ~52 lines each)
- `docs/consolidation-template.md` (130 lines)
- `docs/tradeoffs.md` (81 lines)
- `docs/scanner-coverage.md` (92 lines)
- `schema/finding.schema.json` (100 lines)
- `schema/coverage.schema.json` (47 lines)

**No Mermaid or Highlight.js loaded** — the diagram is delivered as two pre-built inline SVGs (one per theme) rather than runtime-rendered.

**Diagram source files** (in `markdown/design/`):
- `sec_review_team_flow_dark_v2.svg` — `viewBox="0 0 680 880"`, used when dark theme is active
- `sec_review_team_flow_light_v2.svg` — `viewBox="0 0 690 890"`, used when light theme is active

**Theme switching** — the `<html>` element always carries `data-theme="dark"` or `data-theme="light"` (set on first paint by `applyTheme()`, fsad-playbook.html:7641–7648). No `auto` state at runtime — every visit lands on a concrete theme — so a simple `[data-theme="light"]` / `[data-theme="dark"]` pair of selectors is sufficient.

**Location:** `fsad-playbook.html` — `<section id="security-review">` (lines 4238–4331)

## Plan

### Phase 1 — Interaction diagram (theme-aware inline SVGs)

Embed the two pre-built SVG diagrams from `markdown/design/` directly into `fsad-playbook.html`, immediately after the section subtitle (before the Invocation callout, around line 4242). Both SVGs already encode the full run lifecycle (orchestrator setup → parallel specialists → consolidation → REPORT.md → /sec-review-fixes).

**Markup pattern:**

```html
<figure class="sec-review-flow-diagram" aria-label="Security Review Team orchestration flow">
  <!-- paste full <svg>…</svg> from sec_review_team_flow_dark_v2.svg -->
  <svg class="flow-diagram flow-diagram--dark" viewBox="0 0 680 880" role="img" …>
    <title>Security Review Team — orchestration flow, dark theme</title>
    …
  </svg>
  <!-- paste full <svg>…</svg> from sec_review_team_flow_light_v2.svg -->
  <svg class="flow-diagram flow-diagram--light" viewBox="0 0 690 890" role="img" …>
    <title>Security Review Team — orchestration flow, light theme</title>
    …
  </svg>
</figure>
```

**CSS** (add to the existing `<style>` block; keep selectors near the other `[data-theme="light"]` rules around line 1459+):

```css
.sec-review-flow-diagram { margin: 1.5rem 0; max-width: 760px; }
.sec-review-flow-diagram .flow-diagram { width: 100%; height: auto; display: block; }
.sec-review-flow-diagram .flow-diagram--light { display: none; }
[data-theme="light"] .sec-review-flow-diagram .flow-diagram--dark { display: none; }
[data-theme="light"] .sec-review-flow-diagram .flow-diagram--light { display: block; }
```

Default-state (no media-query fallback) is dark, matching how `applyTheme()` always sets a concrete `data-theme` before first paint — no FOUC.

**Procedure:**
1. Read the full content of `markdown/design/sec_review_team_flow_dark_v2.svg`.
2. Read the full content of `markdown/design/sec_review_team_flow_light_v2.svg`.
3. Paste both `<svg>` elements verbatim into the new `<figure>`. Add `class="flow-diagram flow-diagram--dark"` and `flow-diagram--light` to the respective root `<svg>` elements (preserve their existing `viewBox` and `role="img"` attributes; remove the `width="100%"` attribute since the wrapper CSS now controls width). Keep the `<title>` element inside each SVG for a11y.
4. Strip any `xmlns:xlink` / `xml:space` attributes only if they cause HTML-parser warnings; otherwise leave the SVG markup untouched. Do not edit any path data, gradients, or text content inside the SVGs.
5. Add the CSS rules above; verify both themes by toggling the theme switcher and confirming the correct SVG is visible.

**Why inline (not `<img src=…>`):** the playbook is a single self-contained HTML file (per `CLAUDE.md`), distributed by copying one file. External `.svg` references would break that contract.

### Phase 2 — Specialist collapsible cards

After the existing specialist table (after line 4274), add a new H3 "Specialist Definitions" followed by 13 collapsibles — one per specialist in the same order as the table. Each collapsible:

- **Header:** specialist name (strong, exact match to table) + badge: `baseline` (amber) for the 4 baseline agents, `stack-specific` (blue) for the rest
- **Body:** three sub-sections pulled directly from the specialist's `.md` file:
  - **Primary scope** — bullet list from the `## Primary scope` section
  - **Threat model** — the framing paragraph from `## Threat-model framing`
  - **Coverage categories** — comma-separated list from `## Coverage categories this specialist owns`

Use the existing `.collapsible` / `.collapsible-header` / `.collapsible-body` / `.collapsible-content` pattern. Read each of the 13 specialist files before writing their card.

Order (matching the existing table):
1. secrets-crypto-auditor (baseline)
2. dependency-supplychain-auditor (baseline)
3. silent-failure-hunter (baseline)
4. data-exposure-auditor (baseline)
5. auth-authz-auditor (stack-specific)
6. input-validation-auditor (stack-specific)
7. frontend-security-auditor (stack-specific)
8. prompt-injection-auditor (stack-specific)
9. iac-auditor (stack-specific)
10. container-runtime-auditor (stack-specific)
11. ci-cd-security-auditor (stack-specific)
12. concurrency-race-auditor (stack-specific)
13. privacy-telemetry-auditor (stack-specific)

### Phase 3 — Distribution: embedded skill files

After the "How to Adapt" callout (after line 4330, before `</section>`), add a new H3 "Install the Skill" section. Structure:

1. **Directory structure** — a `language-text` code block showing the full tree of files needed under `.claude/skills/sec-review-team/`

2. **Install instructions** — one-paragraph prose: drop the directory into `.claude/skills/` at project level (shared with team) or `~/.claude/skills/` (global personal). Invoke with `/sec-review-team`.

3. **File collapsibles** — one outer collapsible group per logical category, each containing the raw file content in a `language-markdown` or `language-json` code block:
   - "Orchestrator — `SKILL.md`" (single collapsible)
   - "Stack Detection — `stack-signals.md`" (single collapsible)
   - "Specialists (13 files)" — one nested collapsible per specialist, inside a parent collapsible
   - "Support Files" — three collapsibles: `docs/consolidation-template.md`, `docs/tradeoffs.md`, `docs/scanner-coverage.md`
   - "Schemas" — two collapsibles: `schema/finding.schema.json`, `schema/coverage.schema.json`

HTML-escape all `<`, `>`, `&` characters inside code blocks. For nested collapsibles (specialists group), the parent collapsible contains a second tier of `.collapsible` elements inside its body — use `margin-top: 0.5rem` between nested items.

### Phase 4 — CHANGELOG update

Add a new version entry to `CHANGELOG.md` for v37 (next integer version). Version bump: `fsad-playbook.html` `<title>` tag and `README.md` version table row.

## Acceptance Criteria

- [x] Interaction diagram renders in browser — both `sec_review_team_flow_dark_v2.svg` and `sec_review_team_flow_light_v2.svg` are inlined inside a single `<figure class="sec-review-flow-diagram">` and show all 5 stages (orchestrator setup, parallel specialists, consolidation, REPORT.md, /sec-review-fixes)
- [x] Only one SVG is visible at a time: dark variant when `<html data-theme="dark">`, light variant when `<html data-theme="light">`; toggling the theme switcher swaps them with no flash and no layout shift
- [x] SVG paths/text are pasted verbatim from the source files in `markdown/design/` (no edits to gradients, fills, text, or path data); each root `<svg>` keeps its existing `viewBox` and `<title>` for a11y. **Note:** `linearGradient`/`marker` IDs were namespaced (`cg`/`arrow` → `cg-dark`/`arrow-dark` and `cg-light`/`arrow-light`) to avoid cross-SVG ID collisions when both SVGs share the document scope; gradient/marker definitions and all `url(#…)` references were updated in lockstep. No edits to fills, paths, or text content.
- [ ] 13 specialist collapsibles appear below the table, each with name, baseline/stack-specific badge, scope bullets, threat-model text, and coverage categories
- [ ] Specialist collapsibles open/close correctly (JS wired up)
- [ ] "Install the Skill" section shows the directory tree
- [ ] All 8 file groups are embedded as collapsible code blocks (SKILL.md, stack-signals.md, 13 specialists, 3 docs, 2 schemas)
- [ ] HTML-escaping is correct in all code blocks — `<`, `>`, `&` not interpreted as tags
- [ ] Nested specialist collapsibles open/close independently within the parent collapsible
- [ ] Existing section content unchanged (table, invocation callout, example code block, legacy prompt, how-to-adapt callout all still present)
- [x] `CHANGELOG.md` updated with v37 entry
- [x] `fsad-playbook.html` title tag updated to v37
- [x] `README.md` version table updated to v37
