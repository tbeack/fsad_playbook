# CBP-228 — Move Open Source to top-level nav entry after KPIs

## Summary
Promote the Open Source Frameworks section from a sub-item buried inside the Claude Best Practices "Reference" topic to a first-class page with its own sidebar nav entry, placed after KPIs. This makes it easier to discover and mirrors how other major sections are surfaced.

## Assessment
The `<section id="open-source">` currently lives at line 11484 inside `page-practices`, wrapped in a `<div class="topic-view" data-topic="reference" hidden>` (line 11483) — its own isolated topic-view div (separate from the main reference topic-view at line 9441). In the sidebar, it appears as a sub-item under the Claude Best Practices → Reference accordion (line 2264).

The target state: a new `page-open-source` div (after `page-kpis`, before `</div><!-- end main -->`), a dedicated nav-group toggle in the sidebar between KPIs and the FSAD Training external link, and all routing/mapping updated accordingly.

**Current location:** `fsad-playbook.html` lines 11483–11580 (topic-view wrapper + section content)

## Plan

1. **Remove the open-source topic-view block from page-practices** — Delete lines 11483–11580 (the `<div class="topic-view" data-topic="reference" hidden>` wrapper, the `<section id="open-source">` content, and the closing `</div>`). The page-practices footer (lines 11581–11584) and closing `</div><!-- end page-practices -->` (line 11585) must remain.

2. **Create `page-open-source`** — Insert a new page div after `</div><!-- end page-kpis -->` (line 13090) and before `</div><!-- end main -->` (line 13093). Structure:
   ```html
   <!-- PAGE N: OPEN SOURCE FRAMEWORKS -->
   <div class="page" id="page-open-source">

   <div class="hero" id="open-source-hero" style="padding-bottom: 1.2rem;">
     <div class="hero-badge">Community Ecosystem</div>
     <h1>Open Source <em>Frameworks</em></h1>
     <p>Community meta-frameworks that extend Claude Code with hooks, skills, agents, and workflow orchestration.</p>
   </div>

   <hr class="divider">

   <section id="open-source">
     ... [moved content, update section-label from "17" to "01"] ...
   </section>

   <footer>
     <span class="footer-brand">Full Stack Agentic Development</span>
     <p>Open Source Frameworks — for R&D teams adopting FSAD.</p>
   </footer>
   </div><!-- end page-open-source -->
   ```

3. **Remove old sidebar nav entry** — Delete the `<a>` for "Open Source" from the Claude Best Practices Reference topic nav (line 2264):
   ```html
   <a class="nav-sub-item" href="#practices/open-source" onclick="event.preventDefault(); showTopic('reference'); setTimeout(()=>scrollToId('open-source'),120)">Open Source</a>
   ```

4. **Add new sidebar nav-group** — After the KPIs nav-group closing `</div>` (line 2301), before the FSAD Training external link (line 2303):
   ```html
   <!-- GROUP 6: Open Source Frameworks -->
   <div class="nav-group">
     <button class="nav-group-toggle" onclick="navigateTo('open-source', this)" data-page="open-source">
       <span class="nav-icon" aria-hidden="true">◆</span>
       Open Source
       <span class="nav-chevron">›</span>
     </button>
     <div class="nav-sub-items" data-group="open-source">
       <a class="nav-sub-item" href="#open-source/open-source-hero" onclick="scrollToSection('open-source-hero')">Overview</a>
       <a class="nav-sub-item" href="#open-source/open-source" onclick="scrollToSection('open-source')">Frameworks</a>
     </div>
   </div>
   ```

5. **Update `sectionToPageMap`** (line 13507) — Change `'open-source': 'practices'` to `'open-source': 'open-source'` and add `'open-source-hero': 'open-source'` on a new line for the open-source page:
   ```js
   'open-source-hero': 'open-source', 'open-source': 'open-source',
   ```

6. **Update `pageTitles` in `switchPage`** (line 13620) — Add `'open-source': 'Open Source Frameworks'` to the pageTitles object so the breadcrumb shows correctly.

7. **Update the Reference hub card** (lines 6658–6659) — Remove the "Open Source" chip and update the description from "Cheat sheets, power-user patterns, and the open-source ecosystem." to "Cheat sheets, power-user patterns, and runtime configuration.":
   ```html
   <p>Cheat sheets, power-user patterns, and runtime configuration.</p>
   <div class="hub-card-chips"><span>Cheat Sheet</span><span>Power Usage</span></div>
   ```

8. **Version bump and CHANGELOG** — Bump to `v2.90.0` in title, sidebar brand badge, and add changelog entry.

9. **Build** — Run `python3 scripts/build-dist.py`.

All criteria verified 2026-06-04 before commit.

## Acceptance Criteria
- [x] Navigating to "Open Source" in the sidebar shows the `page-open-source` page with a hero and the frameworks grid — not the Claude Best Practices page.
- [x] The sidebar shows "Open Source" as a top-level nav entry positioned after "KPIs to Measure Impact" and before "FSAD Training ↗".
- [x] "Open Source" is no longer present as a sub-item in the Claude Best Practices → Reference topic nav accordion.
- [x] The Claude Best Practices page "Reference" hub card no longer shows the "Open Source" chip.
- [x] The `#open-source` hash navigates directly to the Open Source page (not practices).
- [x] The `#open-source/open-source` deep link works correctly.
- [x] Version is `v2.90.0` in title, sidebar badge, and CHANGELOG.
- [x] `dist/fsad-playbook.html` is in sync (build script ran successfully).
