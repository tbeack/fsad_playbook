# CBP-209 — Deep research: alternative playbook UI/navigation structures (v3)

## Source
User request: use ultrathink + deep research to find alternatives to how the playbook is
structured. Find real-world examples where users get easy navigation to find information.
Evaluate 5 different structural/navigation approaches and score each.

## Summary
The FSAD Playbook (v2.81.3) is a single 13,884-line HTML file with 7 pages, hash-based routing,
a ~157-item sidebar nav, scroll spy, and a search overlay. As content has grown (CBP-001→208),
navigation and findability are under strain. This task surveys how best-in-class
documentation/guide products structure information and navigation, distils 5 candidate
structural approaches for a v3 of the playbook, and scores each against four explicit criteria —
producing a decision-ready research artifact (no implementation in this task).

## Assessment
No `markdown/research/` directory or `v3_UI_research.md` exists yet. Current architecture
(per CLAUDE.md "App Architecture v8", confirmed against `fsad-playbook.html`):
- **7 pages** toggled via `display:none/block`: `page-fsad`, `page-pods`, `page-workflows`,
  `page-skills`, `page-practices`, `page-codex`, `page-kpis`.
- **Left sidebar** — ~157 nav elements; collapsible sub-topic children per section (CBP-050);
  scroll spy highlights the active leaf.
- **Search** — full-text keyword overlay in the sidebar with keyboard navigation.
- **Routing** — hash-based (`#page/section`) via `switchPage()`.
- **Single HTML file** — all content inline; no backend, no build-time splitting.

Pain points to research against:
- Search lands users on the right page but they must scroll to the exact sub-section.
- New topic clusters (Codex, Security, Skills) each required a new top-level page — no organic
  home for cross-cutting content.
- Sidebar depth is uneven (Claude Best Practices ~20 children vs. KPIs ~5).
- No "I'm looking for X" entry point beyond keyword search.

**Location:** write to `markdown/research/v3_UI_research.md` (research dir per CLAUDE.md; literal
filename `v3_UI_research.md` from the task). Baseline for comparison is `fsad-playbook.html`.
No changes to `fsad-playbook.html` in this task — research only.

## Plan

### Phase 1 — Web research (multi-modal sweep, with ultrathink)
Use the `deep-research` harness / fan-out web search to gather real-world examples of
documentation and knowledge-product navigation that users find easy. Target patterns and
exemplars including (not limited to):

1. **Developer-docs platforms** — Stripe Docs, Anthropic docs (docs.anthropic.com), Vercel Docs,
   Mintlify-powered sites, Docusaurus v3, GitBook, Nextra, ReadMe.io. How they cluster topics,
   sidebar vs. top-nav, "on this page" rails, and Algolia DocSearch integration.
2. **Command-palette / search-first** products — Linear, Raycast, VS Code command palette,
   Cmd-K patterns. Surgical jump-to-topic from a query.
3. **Knowledge-graph / wiki** structures — Notion, Obsidian, Confluence, Wikipedia hub-and-spoke.
   Extensibility with new topic clusters.
4. **Single-page guides / handbooks** — GitLab Handbook, Tailwind docs, MDN, and the Diátaxis
   framework (tutorials / how-to / reference / explanation) as an information-architecture model.
5. **Faceted / tag-based browse** — filter-by-tag, multi-axis taxonomy (by tool: Claude vs Codex;
   by role: pod; by artifact: skills / hooks / commands).

For each source record: product/author, the navigation pattern, why users find it easy, and the
source URL. Apply ultrathink to synthesise across sources rather than just listing them. Findings
must be web-fetched, not assumed from training data.

### Phase 2 — Distil 5 candidate approaches for the playbook v3
Define 5 genuinely distinct structural approaches the playbook could adopt, each grounded in the
researched exemplars. Each candidate must describe concretely: the IA model, the primary
navigation mechanism, how search integrates, how it maps onto the existing 7-page content, and
what changes vs. what stays the same in the single-file HTML model. Candidate seeds (adjust to
research findings):
- **A — Left-sidebar tree (current baseline)**: 7 pages, collapsible sub-nav, scroll spy.
- **B — Unified scroll + floating TOC**: single long-scroll page, right-rail section TOC, search
  jumps to anchor.
- **C — Topic-card hub**: landing card grid by topic cluster; each card → dedicated page; command
  palette for navigation.
- **D — Faceted / tag-based**: content tagged by tool, level, and category; sidebar shows active
  filters + matching sections.
- **E — Command-palette-first**: minimal sidebar; `Cmd+K` drives all navigation; sections
  discoverable via search rather than browsing hierarchy.

### Phase 3 — Score each approach
Score all 5 on a 1–5 scale against the four required criteria:
- **Usability** — how easily a user accomplishes a find-information task.
- **Intuitiveness** — how little the user must learn; matches mental models (incl. arriving from
  a search engine).
- **Extensibility** — ability to add new topic clusters without restructuring.
- **Surgical search** — ability to go straight to the right sub-section from a specific query
  (e.g. "how do I configure hook exit codes?").

Present a comparison table (5 approaches × 4 criteria = 20 scored cells), each cell with a 1–2
sentence rationale, plus totals. Note trade-offs and migration cost from the single-file
architecture.

### Phase 4 — Write the research file + recommendation
Write `markdown/research/v3_UI_research.md` containing:
- **Executive summary** (3–5 sentences).
- **Current-state baseline** (what v8/v2.81.3 does today and its pain points).
- **Research findings** — exemplars grouped by pattern, each with source URL.
- **5 candidate approaches** — one section each (IA model, nav mechanism, search, content mapping).
- **Scoring matrix** — table scoring all 5 on the four criteria + totals + per-cell rationale.
- **Recommendation** — top-scoring approach (or hybrid) with reasoning and a rough migration path
  fitting the single-file / no-backend constraints.
- **Gaps & caveats** — what couldn't be verified; assumptions made.

## Acceptance Criteria
All criteria verified 2026-05-29 before commit.
- [x] Research file written to `markdown/research/v3_UI_research.md` (18,172 bytes; note: dir is
      intentionally gitignored per project convention — research notes stay local)
- [x] Current-state baseline section documents the existing v8 architecture and its pain points
      (## Current-state baseline + 4 numbered pain points)
- [x] At least 8 real-world navigation exemplars cited, each with a source URL (web-fetched, not
      assumed from training data) — 10 exemplars across 11 domains in the Sources list
- [x] Exactly 5 distinct candidate structural approaches are defined, each with IA model, primary
      navigation mechanism, search integration, and mapping onto existing playbook content (A–E)
- [x] Scoring matrix scores all 5 approaches on all four criteria (usability, intuitiveness,
      extensibility, surgical search) — 20 cells, each with a rationale, plus totals (5-row table
      + Total column + Per-cell rationale block)
- [x] Recommendation section names the top approach (or hybrid) and sketches a migration path from
      the current single-file architecture (## Recommendation + 5-step migration table)
- [x] Gaps & caveats section present (honest about what could not be verified)
- [x] No changes to `fsad-playbook.html` — research only (git status: untouched)
