# FSAD Playbook v2 — Merge Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a comprehensive FSAD Playbook by starting from `fsad-guide.html` as the base (keeping its existing design, hero, and content intact), adding sidebar navigation + search + theme toggle from `fsad-playbook.html`, replacing the pod section with the full `fsad-pod-compositions.html` content, and appending sections 3-10 from `fsad-playbook.html`.

**Architecture:** Single file `fsad-playbook-v2.html`. Uses fsad-guide.html as the foundation (its CSS, hero, overview, workflow, markdown layer, comparison, advantages, tradeoffs, closing). Adds a fixed left sidebar with search/nav/theme-toggle. Replaces the simple pod section (#pod) with the full 6-pod-config content from fsad-pod-compositions.html. Appends playbook sections 3-10 (Getting Started through Open Source) after the existing fsad-guide content.

**Tech Stack:** HTML5, CSS (inline), Google Fonts (DM Serif Display, IBM Plex Sans/Mono), Mermaid.js (CDN), Highlight.js (CDN), Vanilla JS

**Source Files:**
- `fsad-guide.html` — Base file (hero, overview, workflow, pod, markdown, comparison, advantages, tradeoffs, closing)
- `fsad-pod-compositions.html` — Full pod compositions (6 configs, selection matrix, anti-patterns)
- `fsad-playbook.html` — Sidebar, theme, search, sections 3-10

---

## Task 1: Create Base File from fsad-guide.html + Add Sidebar CSS

**Files:**
- Create: `fsad-playbook-v2.html` (copy of `fsad-guide.html`)

**Step 1: Copy fsad-guide.html to fsad-playbook-v2.html**

```bash
cp fsad-guide.html fsad-playbook-v2.html
```

**Step 2: Add sidebar CSS, theme variables, and responsive overrides**

Inside the `<style>` block in fsad-playbook-v2.html, add:

1. **Light theme variables** — Add `[data-theme="light"]` block after `:root` (copy from fsad-playbook.html lines 38-49)

2. **Sidebar styles** — Add the full sidebar CSS block from fsad-playbook.html (lines 63-160): `.sidebar`, `.sidebar-header`, `.sidebar-brand`, `.sidebar-subtitle`, `.sidebar-search`, `.sidebar-nav`, `.sidebar-footer`, `.theme-toggle`

3. **Main content offset** — Add `.main-content { margin-left: 260px; min-height: 100vh; }` and `.hamburger` styles

4. **Additional component styles** from playbook needed for sections 3-10: `.callout`, `.callout-tip`, `.callout-warning`, `.callout-best-practice`, `.step-card`, `.step-number`, `.code-block`, `.copy-btn`, `.resource-link`, `.collapsible`, `.stat-row`, `.stat-card`, `.styled-table`, `.badge`, `kbd`, `.anti-card`, `.framework-card`, `.card` (the playbook version), `.card-grid`, `.card-grid-3`, `mark`, `.no-results`, inline `code` styling, `.mermaid` styling, `.animate-on-scroll`

5. **Update responsive breakpoint** — At `@media (max-width: 900px)` add: sidebar hidden, hamburger visible, `.main-content { margin-left: 0; }`, adjust existing responsive rules

6. **Update `<title>`** to "FSAD Playbook — Full Stack Agentic Development"

7. **Add CDN imports** to `<head>`: Tailwind CSS, Highlight.js CSS + JS (these are in playbook but not in guide)

**Step 3: Verify file opens**

```bash
open fsad-playbook-v2.html
```

Expected: Same as fsad-guide.html but now with light theme support and new CSS classes available.

**Step 4: Commit**

```bash
git add fsad-playbook-v2.html
git commit -m "feat: create v2 base from fsad-guide.html with extended CSS"
```

---

## Task 2: Add Sidebar HTML + Wrap Existing Content

**Files:**
- Modify: `fsad-playbook-v2.html`

**Step 1: Add hamburger button and sidebar HTML before existing `<nav>`**

Insert right after `<body>`:

```html
<!-- HAMBURGER -->
<button class="hamburger" id="hamburger" aria-label="Toggle sidebar">&#9776;</button>

<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <div class="sidebar-brand">FSAD Playbook</div>
    <div class="sidebar-subtitle">Full Stack Agentic Development</div>
  </div>
  <div class="sidebar-search">
    <input type="text" id="searchInput" placeholder="Search playbook...">
  </div>
  <ul class="sidebar-nav" id="sidebarNav">
    <li><a href="#overview" data-section="overview"><span class="nav-number">01</span>What is FSAD</a></li>
    <li><a href="#workflow" data-section="workflow"><span class="nav-number">02</span>The Workflow</a></li>
    <li><a href="#pod" data-section="pod"><span class="nav-number">03</span>The Pod</a></li>
    <li><a href="#markdown" data-section="markdown"><span class="nav-number">04</span>Markdown Layer</a></li>
    <li><a href="#comparison" data-section="comparison"><span class="nav-number">05</span>FSAD vs. Agile</a></li>
    <li><a href="#advantages" data-section="advantages"><span class="nav-number">06</span>Advantages</a></li>
    <li><a href="#tradeoffs" data-section="tradeoffs"><span class="nav-number">07</span>Tradeoffs</a></li>
    <li><a href="#getting-started" data-section="getting-started"><span class="nav-number">08</span>Getting Started</a></li>
    <li><a href="#claude-setup" data-section="claude-setup"><span class="nav-number">09</span>Claude Setup</a></li>
    <li><a href="#integrations" data-section="integrations"><span class="nav-number">10</span>Integrations</a></li>
    <li><a href="#building-skills" data-section="building-skills"><span class="nav-number">11</span>Building Skills</a></li>
    <li><a href="#best-practices" data-section="best-practices"><span class="nav-number">12</span>Best Practices</a></li>
    <li><a href="#cheat-sheet" data-section="cheat-sheet"><span class="nav-number">13</span>Cheat Sheet</a></li>
    <li><a href="#power-usage" data-section="power-usage"><span class="nav-number">14</span>Power Usage</a></li>
    <li><a href="#open-source" data-section="open-source"><span class="nav-number">15</span>Open Source</a></li>
  </ul>
  <div class="sidebar-footer">
    <span style="font-size:0.72rem; color:var(--text-muted);">Theme</span>
    <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">&#9790;</button>
  </div>
</aside>
```

**Step 2: Wrap all existing body content in `<div class="main-content">`**

After the sidebar, add `<div class="main-content">` before `<nav>`.
After the `</footer>` (the existing fsad-guide footer), close with `</div>`.

**Step 3: Add `<div class="no-results" id="noResults">No matching content found.</div>` inside `.main-content` before the `<nav>`**

**Step 4: Update the existing `<nav>` to work with sidebar**

The existing top nav can be kept as-is (it provides in-page jump links for the original 6 sections). It will sit inside `.main-content` and scroll with content. Alternatively, hide it on desktop since the sidebar duplicates its function — add CSS: `nav { display: none; }` on screens > 900px, or just leave it for visual consistency.

Decision: Keep the existing top `<nav>` as-is. It provides a nice secondary navigation inside the content area.

**Step 5: Verify in browser**

Open file. Expected: Sidebar visible on left. Existing content shifted right by 260px. Hero, sections all render as before.

**Step 6: Commit**

```bash
git add fsad-playbook-v2.html
git commit -m "feat: add sidebar navigation with search and theme toggle"
```

---

## Task 3: Replace Pod Section with Full Pod Compositions

**Files:**
- Modify: `fsad-playbook-v2.html`

**Step 1: Add pod-compositions CSS**

Add the CSS from `fsad-pod-compositions.html` that doesn't exist in fsad-guide.html. Key classes needed:
- `.pod-panel`, `.pod-layout`, `.pod-visual-wrap`, `.pod-ring`, `.pod-core`, `.member` positioning classes
- `.pod-tab`, `.pod-tabs` (tab switching UI)
- `.pod-detail`, `.pod-detail-intro`, `.detail-section-title`
- `.role-cards`, `.role-card`, `.role-badge`
- `.meta-grid`, `.meta-box`
- `.sizing-table-wrap`, `.sizing-table`
- `.anti-grid`, `.anti-card` (the pod-compositions version)
- `.config-tag`

Copy all CSS from fsad-pod-compositions.html lines ~62-570 that isn't already present.

**Step 2: Replace the `<section id="pod">` content**

Remove the existing simple pod section (the pod circle visual + "The Markdown is the Meeting" description, approximately lines 955-1006 in fsad-guide.html).

Replace with the full pod-compositions content:
1. Section header: "03 — Team Composition & Roles" / "Pod Configurations That Work"
2. Pod tabs UI (6 tabs: Triad, Builder Duo, Experience, Full Stack, Platform, Discovery)
3. All 6 pod panels with:
   - Visual pod ring diagram
   - Pod name + size badge
   - Definition paragraph
   - Role responsibility cards
   - "When to Use" + "Key Artifacts" / "Superpower" / "Watch Out For" meta boxes
4. Pod Selection Matrix table (10 rows)
5. Anti-patterns section (6 cards)
6. Closing principle quote

Source: Copy the HTML from `fsad-pod-compositions.html` sections (pod panels, sizing guide, anti-patterns, closing), from approximately line 370 to line 1103.

**Step 3: Add pod tab-switching JavaScript**

Add the `switchPod()` function from fsad-pod-compositions.html (lines 1111-1124).

**Step 4: Verify in browser**

Open file. Click through all 6 pod tabs. Verify selection matrix table renders. Verify anti-pattern cards display.

**Step 5: Commit**

```bash
git add fsad-playbook-v2.html
git commit -m "feat: replace pod section with full 6-config pod compositions"
```

---

## Task 4: Add Sections 3-10 from Playbook (Getting Started through Open Source)

**Files:**
- Modify: `fsad-playbook-v2.html`

**Step 1: Insert sections after the closing section**

After the existing fsad-guide "closing" section (the "FSAD is not post-Agile" quote) and before `<footer>`, insert the following sections from `fsad-playbook.html`. Update section numbers in the `section-label` spans to continue from the guide's numbering:

1. **Section: Getting Started** (`#getting-started`) — Copy from fsad-playbook.html section id="getting-started" (6 step cards with code examples, Mermaid architecture diagram). Update label to "08 — How to Get Started"

2. **Section: Claude Setup** (`#claude-setup`) — Copy from fsad-playbook.html section id="claude-setup" (5 pillars as collapsibles with code examples). Update label to "09 — Anatomy of a Claude Code Project"

3. **Section: Integrations** (`#integrations`) — Copy from fsad-playbook.html section id="integrations" (MCP diagram, 5 integration collapsibles). Update label to "10 — Integrations"

4. **Section: Building Skills** (`#building-skills`) — Copy from fsad-playbook.html section id="building-skills" (skill anatomy, 4 example skills as collapsibles). Update label to "11 — Building Your Own Skills"

5. **Section: Best Practices** (`#best-practices`) — Copy from fsad-playbook.html section id="best-practices" (prompting cards, structure cards, workflow cards, pitfall cards). Update label to "12 — Best Practices & Guidelines". **Remove the FSAD vs Agile comparison table** from this section since it already exists in the guide's #comparison section.

6. **Section: Cheat Sheet** (`#cheat-sheet`) — Copy from fsad-playbook.html section id="cheat-sheet" (keyboard shortcuts, slash commands, CLI flags, permission modes, hooks, input superpowers, file structure map, quick reference). Update label to "13 — Claude Cheat Sheet"

7. **Section: Power Usage** (`#power-usage`) — Copy from fsad-playbook.html section id="power-usage" (7 collapsible feature cards). Update label to "14 — Claude Power Usage"

8. **Section: Open Source** (`#open-source`) — Copy from fsad-playbook.html section id="open-source" (7 framework cards). Update label to "15 — Open Source Frameworks"

**Step 2: Update section styling**

Ensure all new sections use `max-width: 1200px` (matching fsad-guide's sections) rather than 960px. The fsad-guide sections use `max-width: 1200px; margin: 0 auto;` — verify the new sections match.

**Step 3: Verify in browser**

Scroll through all 15 sections. Verify code blocks render, Mermaid diagrams render, collapsibles work.

**Step 4: Commit**

```bash
git add fsad-playbook-v2.html
git commit -m "feat: add sections 8-15 (Getting Started through Open Source)"
```

---

## Task 5: Add All JavaScript (Theme, Nav, Search, Copy, Mermaid)

**Files:**
- Modify: `fsad-playbook-v2.html`

**Step 1: Merge JavaScript from all three sources**

The existing fsad-guide.html has a small `<script>` at the end with:
- `showPhase()` for workflow interaction
- IntersectionObserver for scroll animations

Replace/extend this with a comprehensive script that includes:

1. **Theme toggle** (from playbook) — Toggle `data-theme`, persist to localStorage, update button icon, reinit Mermaid on theme change

2. **Sidebar scroll tracking** (from playbook) — IntersectionObserver on all `<section>` elements, highlight active nav link

3. **Smooth scroll on nav click** (from playbook) — Prevent default, scrollIntoView, close sidebar on mobile

4. **Mobile hamburger toggle** (from playbook) — Toggle `.sidebar-open`, close on outside click

5. **Collapsible sections** (from playbook) — Click handler on `.collapsible-header`

6. **Copy buttons on code blocks** (from playbook) — Inject copy buttons, clipboard API

7. **Search** (from playbook) — Debounced text search, hide/show sections, highlight matches

8. **Mermaid + Highlight.js init** (from playbook) — `mermaid.initialize()`, `hljs.highlightAll()`, reinit on theme change

9. **Workflow phase interaction** (from fsad-guide) — Keep existing `showPhase()` function

10. **Pod tab switching** (from pod-compositions) — Keep `switchPod()` function

11. **Scroll animations** (from both) — Unified IntersectionObserver for `.animate-in` and `.animate-on-scroll` classes

**Step 2: Verify all interactions in browser**

- Theme toggle switches dark/light
- Sidebar links smooth-scroll and highlight active
- Search filters sections
- Collapsibles open/close
- Code blocks have copy buttons
- Workflow phases are clickable
- Pod tabs switch
- Mermaid diagrams render
- Responsive: sidebar becomes hamburger

**Step 3: Commit**

```bash
git add fsad-playbook-v2.html
git commit -m "feat: add complete JavaScript (theme, nav, search, copy, interactions)"
```

---

## Task 6: Final Polish and Verification

**Files:**
- Modify: `fsad-playbook-v2.html`

**Step 1: Update footer**

Replace the existing fsad-guide footer with a more comprehensive one:
```html
<footer>
  <span class="footer-brand">FSAD Playbook</span>
  <p>Full Stack Agentic Development Guide for R&D Teams</p>
</footer>
```

**Step 2: Verify the 10 success criteria**

1. [ ] Opens in browser with no server (file:// protocol)
2. [ ] All 15 sections have substantive content
3. [ ] Dark/light theme toggle works
4. [ ] Search finds content across sections
5. [ ] Sidebar highlights active section on scroll
6. [ ] Mermaid diagrams render
7. [ ] Code blocks have syntax highlighting + copy buttons
8. [ ] Responsive: sidebar collapses on narrow viewport
9. [ ] File size check: `ls -lh fsad-playbook-v2.html` (target: < 300KB)
10. [ ] No console errors

**Step 3: Commit**

```bash
git add fsad-playbook-v2.html
git commit -m "feat: final polish and verification for FSAD Playbook v2"
```

---

## Execution Notes

- **Tasks 1-2** must run sequentially (CSS foundation then HTML structure)
- **Task 3** (pod compositions) is independent of Task 4 (playbook sections)
- **Task 5** (JavaScript) depends on Tasks 1-4 being complete
- **Task 6** is final polish

**Estimated file size:** ~200-250KB (combining ~60KB guide + ~53KB pod-compositions + ~110KB playbook content, minus duplicated CSS/structure)

**Key deduplication notes:**
- The 4 "What is FSAD" overview cards exist in both fsad-guide and playbook — keep fsad-guide's version (richer descriptions with emojis)
- The 5-phase workflow exists in both — keep fsad-guide's interactive version (clickable phases with detail panels)
- The comparison table exists in both guide and playbook Section 7 — keep guide's version, remove from playbook Section 7
- Pod content exists in guide (simple) and pod-compositions (full) — use pod-compositions version
