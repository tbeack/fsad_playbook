# UX Implementation Plan: FSAD Playbook v5 -> v6

**Source:** `docs/ux-review.md`
**Target:** `fsad-playbook - v5.html`
**Created:** 2026-03-12

---

## Phase 1: Critical Fixes (Accessibility & Broken Features)

### 1.1 Fix Page Transition Animations (display:none issue)

**UX Review Ref:** Finding 8.1
**Impact:** High | **Complexity:** Medium | **Dependencies:** None

**What's broken:** Lines 60-67 define `.page` with `opacity: 0; transform: translateY(10px); transition: ...; display: none;` and `.page.active` sets `display: block; opacity: 1; transform: translateY(0)`. CSS transitions cannot animate from `display: none` to `display: block` — the browser skips the transition entirely, so the fade-in/slide-up never plays.

Note: Lines 306-307 also re-declare `.page { display: none; }` and `.page.active { display: block; }`, which further overrides the transition properties from lines 60-67. This second declaration must also be addressed.

**Where in the file:**
- CSS: Lines 60-67 (`.page` and `.page.active` under "UX ENHANCEMENTS (v5)")
- CSS: Lines 306-307 (duplicate `.page` / `.page.active` under "MAIN CONTENT")
- JS: Lines 2809-2825 (`switchPage()` function)

**How to implement:**

1. **Remove the duplicate CSS** at lines 306-307 entirely.

2. **Replace the CSS** at lines 60-67 with a visibility-based approach:
   ```css
   .page {
     position: absolute;
     width: 100%;
     opacity: 0;
     transform: translateY(10px);
     visibility: hidden;
     pointer-events: none;
     transition: opacity 0.4s ease, transform 0.4s ease, visibility 0s 0.4s;
   }
   .page.active {
     position: relative;
     opacity: 1;
     transform: translateY(0);
     visibility: visible;
     pointer-events: auto;
     transition: opacity 0.4s ease, transform 0.4s ease, visibility 0s 0s;
   }
   ```

3. **Alternatively (two-frame JS approach)** — keep `display: none/block` but modify `switchPage()`:
   ```js
   function switchPage(pageId, btn) {
     // Remove active from all pages
     document.querySelectorAll('.page').forEach(p => {
       p.classList.remove('active');
       p.style.display = 'none';
     });

     const targetPage = document.getElementById('page-' + pageId);
     if (targetPage) {
       // Step 1: make visible but transparent
       targetPage.style.display = 'block';
       targetPage.style.opacity = '0';
       targetPage.style.transform = 'translateY(10px)';

       // Step 2: on next frame, trigger animation
       requestAnimationFrame(() => {
         requestAnimationFrame(() => {
           targetPage.classList.add('active');
         });
       });
     }
     // ... rest of sidebar logic unchanged
   }
   ```

**Recommendation:** Use the CSS-only approach (option 2 above). It is simpler, avoids FOUC, and does not require JS timing hacks. The `visibility` property keeps elements out of the accessibility tree when hidden.

**Before:** Page switches are instant — no animation plays.
**After:** Pages fade in with a 0.4s slide-up transition.

**Testing checklist:**
- [ ] Click each sidebar nav group (FSAD, Pod Compositions, Best Practices) — transition animates
- [ ] Use hash routing (type `#pods` in URL bar) — transition still works
- [ ] Verify no layout shift during transition (pages should not stack)
- [ ] Verify scroll position resets to top on page switch
- [ ] Screen reader announces new page content after transition completes

---

### 1.2 Fix WCAG AA Contrast Failure on `--text-muted`

**UX Review Ref:** Finding 4.2
**Impact:** High | **Complexity:** Small | **Dependencies:** None

**What's broken:** `--text-muted: #5a6478` on `--bg: #0a0e17` has a contrast ratio of ~3.4:1. WCAG AA requires 4.5:1 for normal text.

**Where in the file:**
- CSS: Line 18 (`--text-muted: #5a6478` in `:root`)

**Elements affected (by class/selector):**
- `.sidebar-tagline` (line 167)
- `.phase-who` (line 474)
- `.timeline-duration` (line 615)
- `.legend-item` (line 613)
- `.sidebar-footer` (line 277)
- `.hero-stat .label` (line 417)
- `.pod-core-label` (line 721)
- `.pod-type-label` (line 749)
- `.pod-type-count` (line 754)
- `.principle-item .pi-label` (line 675)
- `.nav-coming-soon` (line 238)
- `.nav-group-toggle .nav-chevron` (line 219)
- `.collapsible-chevron` (line 911)
- `.kbd-hint` (line 118)

**How to implement:**

Change line 18 from:
```css
--text-muted: #5a6478;
```
to:
```css
--text-muted: #7a8498;
```

This achieves approximately 4.6:1 contrast ratio against `--bg` (#0a0e17), passing WCAG AA for normal text.

**Risk:** Some elements may feel slightly "louder" than intended. Visually audit each usage after the change and consider creating a secondary muted variable (`--text-muted-decorative: #5a6478`) for large text (18px+) or purely decorative elements where the lower contrast is acceptable.

**Testing checklist:**
- [ ] Verify contrast ratio using browser DevTools accessibility panel or WebAIM contrast checker
- [ ] Visual audit: sidebar tagline, footer text, phase labels, timeline duration, legend items
- [ ] Ensure the visual hierarchy still reads correctly (muted text should not compete with `--text-secondary`)
- [ ] Test on both retina and non-retina displays

---

### 1.3 Add Keyboard Navigation, Skip Links, and ARIA Labels

**UX Review Ref:** Findings 9.1, 9.3, 9.4
**Impact:** High | **Complexity:** Medium | **Dependencies:** None

#### 1.3a Add Skip-to-Content Link

**Where:** Immediately after `<body>` opening tag (line 961, before the sidebar toggle button)

**How:**
```html
<a href="#main-content" class="skip-link">Skip to content</a>
```

Add `id="main-content"` to the `.main` div (line 1039):
```html
<div class="main" id="main-content">
```

Add CSS (anywhere in the `<style>` block):
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 10000;
  padding: 0.8rem 1.2rem;
  background: var(--accent-blue);
  color: white;
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
}
.skip-link:focus {
  top: 1rem;
}
```

#### 1.3b Add `href` Attributes to Sidebar Nav Sub-Items

**Where:** Lines 985-993 (FSAD sub-items), 1004-1008 (Pods sub-items), 1019-1027 (Practices sub-items)

**How:** For each `<a class="nav-sub-item">`, add an `href` using the existing hash routing format. Example:
```html
<!-- Before -->
<a class="nav-sub-item active" onclick="scrollToSection('fsad-hero')">Overview</a>

<!-- After -->
<a class="nav-sub-item active" href="#fsad/fsad-hero" onclick="scrollToSection('fsad-hero')">Overview</a>
```

Repeat for all ~20 sub-items. The `href` value follows the pattern `#${pageId}/${sectionId}`.

#### 1.3c Add `aria-hidden="true"` to Decorative Emoji

**Where:** Throughout the file — every `<span>` containing emoji that is purely decorative.

**How:** Search for emoji characters in icon spans and add `aria-hidden="true"`. Examples:
```html
<!-- Card icons (line ~1067) -->
<div class="card-icon" style="..." aria-hidden="true">...</div>

<!-- Pod member icons (lines 1102-1105) -->
<span class="member-icon" aria-hidden="true">...</span>

<!-- Nav icons (lines 980, 998, 1013) -->
<span class="nav-icon" aria-hidden="true">...</span>
```

For meaningful emoji (role icons in pod circles where no adjacent text label exists), add `aria-label` instead:
```html
<div class="pod-member pm" aria-label="Product Manager">
  <span class="member-icon" aria-hidden="true">...</span>PM
</div>
```

**Testing checklist:**
- [ ] Tab through entire page — all interactive elements reachable in logical order
- [ ] Skip link appears on first Tab press and focuses main content
- [ ] Sidebar nav sub-items are focusable via Tab (have `href`)
- [ ] Screen reader (VoiceOver) does not announce decorative emoji
- [ ] Screen reader announces role labels on pod members

---

### 1.4 Add `prefers-reduced-motion` Support

**UX Review Ref:** Finding 9.6
**Impact:** Medium | **Complexity:** Small | **Dependencies:** None

**Where in the file:** Add at the end of the CSS block, before `</style>` (after line 958, before line 959)

**How to implement:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  html { scroll-behavior: auto; }
}
```

Also update the JS scroll-on-enter observer (lines 2967-2975) to check for motion preference:
```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

// In DOMContentLoaded:
if (!prefersReducedMotion) {
  document.querySelectorAll('.overview-card, .adv-card, ...').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    animObserver.observe(el);
  });
}
```

**Testing checklist:**
- [ ] Enable "Reduce motion" in OS accessibility settings
- [ ] Verify: no slide-up animations on cards
- [ ] Verify: page transitions are instant (no slide)
- [ ] Verify: scroll behavior is instant (no smooth scroll)
- [ ] Disable the setting — animations return

---

### Phase 1 Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Page transition CSS change breaks layout (pages stacking) | Medium | Test all three pages at desktop and mobile widths; ensure only `.active` page occupies flow |
| Changing `--text-muted` makes some elements too prominent | Low | Visual audit each usage; split into two variables if needed |
| Adding `href` to nav sub-items causes double-navigation (onclick + href) | Medium | Test that `onclick` and hash routing don't conflict; may need `e.preventDefault()` in handler |
| `prefers-reduced-motion` override breaks functional transitions (collapsible sections) | Low | Test collapsible open/close still functions (even without animation) |

---

## Phase 2: High-Impact UX Improvements

### 2.1 Improve Navigation Wayfinding

**UX Review Ref:** Findings 3.1, 3.2
**Impact:** High | **Complexity:** Medium | **Dependencies:** Phase 1.1 (page transitions)

#### 2.1a Add Breadcrumb / Page Title Bar

**What:** A fixed bar below the progress bar showing the current page name. On mobile (where sidebar is hidden), this is the only persistent page indicator.

**Where:** Add HTML after the progress bar container (line 1042). Add CSS in the shared components section.

**How:**
```html
<div class="page-indicator" id="pageIndicator">
  <span class="page-indicator-brand">FSAD</span>
  <span class="page-indicator-sep">/</span>
  <span class="page-indicator-title" id="pageTitle">Full Stack Agentic Development</span>
</div>
```

```css
.page-indicator {
  position: fixed;
  top: 3px; /* below progress bar */
  left: var(--sidebar-w);
  right: 0;
  height: 42px;
  background: rgba(10, 14, 23, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.5rem;
  z-index: 100;
  font-size: 0.78rem;
}
.page-indicator-brand {
  font-family: var(--font-mono);
  color: var(--text-muted);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
}
.page-indicator-sep { color: var(--border-accent); }
.page-indicator-title {
  color: var(--text-primary);
  font-weight: 500;
}

@media (max-width: 900px) {
  .page-indicator { left: 0; padding-left: 3.5rem; /* room for hamburger */ }
}
```

Update `switchPage()` JS to set the title:
```js
const pageTitles = { fsad: 'Full Stack Agentic Development', pods: 'Pod Compositions', practices: 'Best Practices' };
document.getElementById('pageTitle').textContent = pageTitles[pageId] || '';
```

Adjust `section` and `.hero` top-padding to account for the fixed bar (add ~45px).

#### 2.1b Add Left-Border Indicator on Active Nav Sub-Item

**Where:** CSS for `.nav-sub-item.active` (lines 267-270)

**How:** Add a left border indicator:
```css
.nav-sub-item.active {
  color: var(--accent-blue);
  font-weight: 500;
  position: relative;
}
.nav-sub-item.active::before {
  content: '';
  position: absolute;
  left: 1.4rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 14px;
  background: var(--accent-blue);
  border-radius: 1px;
}
```

**Testing checklist:**
- [ ] Page indicator visible on all three pages, shows correct title
- [ ] Page indicator visible on mobile (sidebar hidden)
- [ ] Active sub-item has visible blue left-border
- [ ] Scroll spy updates both the sub-item highlight and sub-item border
- [ ] No overlap between page indicator bar and content

---

### 2.2 Rebalance Page 3 Content

**UX Review Ref:** Findings 6.2, 10.5
**Impact:** High | **Complexity:** Large | **Dependencies:** None

**What:** Page 3 currently contains 8 major sections (lines 1545-2748) spanning ~1200 lines of HTML — roughly double the content of Page 1 or Page 2. This creates scroll fatigue.

**Two options (choose one):**

#### Option A: Add Inline Table of Contents (Recommended — lower risk)

Add a compact TOC after the Page 3 hero (after line ~1543):

```html
<nav class="inline-toc" aria-label="Page contents">
  <div class="inline-toc-title">On this page</div>
  <div class="inline-toc-links">
    <a href="#practices/getting-started" onclick="scrollToSection('getting-started')">Getting Started</a>
    <a href="#practices/claude-setup" onclick="scrollToSection('claude-setup')">Project Anatomy</a>
    <a href="#practices/integrations" onclick="scrollToSection('integrations')">Integrations</a>
    <a href="#practices/building-skills" onclick="scrollToSection('building-skills')">Skills</a>
    <a href="#practices/best-practices" onclick="scrollToSection('best-practices')">Guidelines</a>
    <a href="#practices/cheat-sheet" onclick="scrollToSection('cheat-sheet')">Cheat Sheet</a>
    <a href="#practices/power-usage" onclick="scrollToSection('power-usage')">Power Usage</a>
    <a href="#practices/open-source" onclick="scrollToSection('open-source')">Open Source</a>
  </div>
</nav>
```

```css
.inline-toc {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 2.5rem;
}
.inline-toc-title {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.8rem;
}
.inline-toc-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.inline-toc-links a {
  padding: 0.4rem 0.9rem;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 100px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.78rem;
  transition: all 0.2s;
}
.inline-toc-links a:hover {
  border-color: var(--accent-blue);
  color: var(--text-primary);
}
```

#### Option B: Split Page 3 into Two Pages (higher impact, higher risk)

Split into Page 3 "Getting Started" (sections 08-11) and Page 4 "Reference" (sections 12-15). This requires:
- Adding a 4th nav group in the sidebar
- Updating `sectionToPageMap`
- Creating a new `#page-reference` div
- Moving sections 12-15 into the new page div

**Recommendation:** Start with Option A. It provides immediate relief with minimal risk. Option B can be done later if the TOC is not sufficient.

**Testing checklist:**
- [ ] TOC renders correctly below Page 3 hero
- [ ] All TOC links scroll to correct sections
- [ ] TOC is accessible via keyboard
- [ ] TOC collapses gracefully on mobile (single column)

---

### 2.3 Fix Collapsible Section Animation

**UX Review Ref:** Finding 8.2
**Impact:** Medium | **Complexity:** Medium | **Dependencies:** None

**What's broken:** `.collapsible.open .collapsible-body { max-height: 5000px; }` (line 914) with `transition: max-height 0.4s ease` (line 913). Because actual content is much shorter than 5000px, the close animation has a perceptible delay before visually starting to shrink.

**Where in the file:**
- CSS: Lines 907-916 (`.collapsible` styles)
- JS: Lines 2941-2946 (click handler)

**How to implement — grid-template-rows technique:**

Replace the collapsible CSS:
```css
.collapsible-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s ease;
}
.collapsible.open .collapsible-body {
  grid-template-rows: 1fr;
}
.collapsible-body > .collapsible-content {
  overflow: hidden;
}
```

Remove the `max-height` and `overflow: hidden` from `.collapsible-body`. Remove `max-height: 5000px` from `.collapsible.open .collapsible-body`.

The JS click handler (lines 2942-2946) stays exactly the same — it just toggles `.open`.

**Before:** Close animation has a ~200ms dead zone before visually shrinking.
**After:** Smooth, correctly-timed open/close animation that matches actual content height.

**Testing checklist:**
- [ ] Open a collapsible section — smooth expansion
- [ ] Close it — smooth collapse with no delay
- [ ] Open/close rapidly — no visual glitches
- [ ] Test with both short and long content (Page 3 has various lengths)
- [ ] Verify `.collapsible-content` padding and border-radius still render correctly

---

### 2.4 Add Mobile Backdrop Overlay for Sidebar

**UX Review Ref:** Finding 7.2
**Impact:** Medium | **Complexity:** Small | **Dependencies:** None

**Where in the file:**
- HTML: After the `<aside class="sidebar">` closing tag (line 1034)
- CSS: Mobile responsive section (lines 860-871)
- JS: `toggleSidebar()` function (lines 2842-2844)

**How to implement:**

Add HTML after line 1034:
```html
<div class="sidebar-backdrop" id="sidebarBackdrop" onclick="toggleSidebar()"></div>
```

Add CSS:
```css
.sidebar-backdrop {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(10, 14, 23, 0.7);
  backdrop-filter: blur(4px);
  z-index: 199; /* below sidebar (200), above content */
}
.sidebar-backdrop.visible {
  display: block;
}
```

Update `toggleSidebar()`:
```js
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  sidebar.classList.toggle('open');
  backdrop.classList.toggle('visible');
}
```

Also update `switchPage()` (line 2823) to close backdrop when navigating:
```js
document.getElementById('sidebarBackdrop').classList.remove('visible');
```

**Testing checklist:**
- [ ] On mobile (<900px): open sidebar, backdrop appears
- [ ] Click backdrop — sidebar and backdrop both close
- [ ] Navigate via sidebar link — backdrop closes
- [ ] Backdrop does not appear on desktop (sidebar is always visible)
- [ ] No scroll on body while backdrop is visible

---

### Phase 2 Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Page indicator bar adds height that pushes content down | Medium | Adjust section padding-top; test hero sections first |
| Grid-template-rows collapsible not supported in older browsers | Low | Safari 16.4+, Chrome 111+ support it; fallback to instant show/hide |
| Inline TOC on Page 3 feels redundant with sidebar | Low | Hide TOC when sidebar is visible (desktop); show only on mobile or on scroll past hero |
| Sidebar backdrop z-index conflicts | Low | Test layering: backdrop (199) < sidebar (200) < sidebar-toggle (300) |

---

## Phase 3: Polish & Best Practices

### 3.1 Add Syntax Highlighting to Page 3 Code Blocks

**UX Review Ref:** Finding 2.2
**Impact:** Medium | **Complexity:** Medium | **Dependencies:** None

**What:** Page 3 code blocks (`.code-block pre`) render in monospace with uniform `--text-secondary` color. Page 1's markdown showcase (lines 1123-1167) uses manual span-based coloring (`.kw`, `.val`, `.cm`, `.hd`), but Page 3 has ~15+ code blocks that are plain text.

**Where in the file:** All `.code-block` elements inside `#page-practices` (lines ~1545-2748)

**Two options:**

#### Option A: Extend manual span coloring (lower dependency, larger manual effort)

Apply the same `.kw`, `.val`, `.cm`, `.hd` span classes used in the markdown showcase to the most important code blocks on Page 3:
- CLAUDE.md example (in getting-started section)
- hooks JSON (in integrations section)
- Skill file examples (in building-skills section)
- Cheat sheet code snippets

This requires manually wrapping keywords in spans within the HTML.

#### Option B: Add Prism.js lightweight syntax highlighter (automated, adds ~5KB)

Add to `<head>`:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
```

Add before `</body>`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markdown.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
```

Update code blocks to use `<code class="language-json">` etc. Override Prism theme colors with CSS custom properties to match the dark palette.

**Recommendation:** Option A for the 4-5 most important code blocks. Keeps the file self-contained (no CDN dependency). Option B if there are future plans to add more code examples.

**Testing checklist:**
- [ ] Key code blocks have colored syntax (keywords, values, comments distinguished)
- [ ] Colors meet contrast requirements against `--bg-surface`
- [ ] Copy button still copies plain text (not span markup)
- [ ] Code blocks render correctly on mobile (horizontal scroll intact)

---

### 3.2 Micro-Interactions and Hover States

**UX Review Ref:** Findings 5.3, 5.5
**Impact:** Low-Medium | **Complexity:** Small | **Dependencies:** None

#### 3.2a Improve Collapsible Header Hover Affordance

**Where:** CSS line 909 (`.collapsible-header:hover`)

**How:**
```css
.collapsible-header:hover {
  border-color: var(--border-accent);
  background: rgba(59, 130, 246, 0.03);
}
.collapsible-chevron {
  transition: transform 0.3s;
  color: var(--text-secondary); /* was --text-muted */
  font-size: 0.85rem; /* was 0.75rem */
}
```

#### 3.2b Differentiate Clickable vs. Informational Card Hovers

**Where:** CSS for `.overview-card:hover` (line 436), `.adv-card:hover` (line 627), `.card:hover` (line 881)

**How:** Keep `translateY(-2px)` only for interactive elements (workflow phases, pod tabs). For informational cards, use border glow only:
```css
.overview-card:hover, .adv-card:hover {
  border-color: var(--border-accent);
  /* Remove: transform: translateY(-2px); */
}
```

#### 3.2c Add Stagger Delay to Grid Card Animations

**Where:** JS lines 2994-2999 (DOMContentLoaded animation setup)

**How:**
```js
document.querySelectorAll('.overview-grid, .adv-grid, .card-grid, .card-grid-3').forEach(grid => {
  grid.querySelectorAll('.overview-card, .adv-card, .card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
    animObserver.observe(el);
  });
});
```

**Testing checklist:**
- [ ] Collapsible headers have visible hover background change
- [ ] Informational cards don't "lift" on hover; interactive cards do
- [ ] Card grids cascade in with stagger (not all at once)

---

### 3.3 Workflow Phase Detail Entry Animation

**UX Review Ref:** Finding 5.1
**Impact:** Medium | **Complexity:** Small | **Dependencies:** Phase 1.1

**Where in the file:**
- CSS: Lines 489-493 (`.workflow-detail`)
- JS: `showPhase()` function (lines 2911-2916)

**How to implement:**

Replace `.workflow-detail` CSS:
```css
.workflow-detail {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: none;
}
.workflow-detail.visible {
  display: block;
  animation: fadeIn 0.3s ease forwards;
}
```

The `fadeIn` keyframe already exists at line 955-958, so this simply reuses it.

**Testing checklist:**
- [ ] Click through all 5 workflow phases — detail panel fades in each time
- [ ] No flicker or layout jump on phase switch

---

### 3.4 Scroll-to-Top and Smooth Scrolling Improvements

**UX Review Ref:** Finding 8.4 (positive), general polish
**Impact:** Low | **Complexity:** Small | **Dependencies:** None

**Where:** JS `updateScrollProgress()` (lines 2898-2908), back-to-top button (line 3015)

**How:**
- Add a fade transition to back-to-top button instead of instant show/hide:
```css
.back-to-top {
  /* existing styles, but change display to: */
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s, transform 0.3s, border-color 0.3s;
  display: flex; /* always flex, control visibility via opacity */
}
.back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
}
```

Update JS:
```js
if (winScroll > 500) { btt.classList.add('visible'); }
else { btt.classList.remove('visible'); }
```

**Testing checklist:**
- [ ] Back-to-top button fades in/out smoothly
- [ ] Button works correctly (scrolls to top)

---

### Phase 3 Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Prism.js CDN adds external dependency and potential load delay | Medium | Use Option A (manual spans) for self-contained file; or inline Prism.js |
| Removing translateY from informational card hover feels "less interactive" | Low | User testing; the border glow is still a clear hover signal |
| Stagger animation feels slow with many cards | Low | Cap at 6 items (0.3s max total delay) |

---

## Phase 4: Stretch Goals

### 4.1 Responsive Design Improvements

**UX Review Ref:** Findings 7.1, 7.4
**Impact:** Medium | **Complexity:** Medium | **Dependencies:** Phase 2.4

#### 4.1a Add 600px Breakpoint

**Where:** After the existing `@media (max-width: 900px)` block (lines 860-871, 951-953)

```css
@media (max-width: 600px) {
  section { padding: 2rem 1rem; }
  .hero { padding: 3rem 1rem 2rem; }
  .hero h1 { font-size: 1.8rem; }
  .hero-stats { gap: 1.5rem; }
  .hero-stat .number { font-size: 1.6rem; }
  .workflow-container { padding: 1rem; }
  .page-indicator { font-size: 0.7rem; padding-left: 3rem; }
}
```

#### 4.1b Scale Pod Ring on Mobile

**Where:** Mobile responsive section

```css
@media (max-width: 900px) {
  .pod-ring { width: min(250px, 70vw); height: min(250px, 70vw); }
  .member { width: min(66px, 18vw); height: min(66px, 18vw); font-size: min(0.58rem, 1.6vw); }
}
```

---

### 4.2 Search Overlay Focus Trapping

**UX Review Ref:** Finding 9.2
**Impact:** Medium | **Complexity:** Medium | **Dependencies:** None

**Where:** JS `toggleSearch()` function (lines 2863-2872)

**How:** Add focus trapping when search overlay is visible:
```js
function toggleSearch(show) {
  const overlay = document.getElementById('searchOverlay');
  overlay.style.display = show ? 'flex' : 'none';
  if (show) {
    document.getElementById('searchInput').focus();
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', trapSearchFocus);
  } else {
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', trapSearchFocus);
  }
}

function trapSearchFocus(e) {
  if (e.key !== 'Tab') return;
  const modal = document.querySelector('.search-modal');
  const focusable = modal.querySelectorAll('input, a, button, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
```

Also add arrow-key navigation for search results:
```js
// Add to the existing keydown listener or search handler
let selectedResultIndex = -1;

function handleSearchKeydown(e) {
  const results = document.querySelectorAll('.search-result-item');
  if (!results.length) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedResultIndex = Math.min(selectedResultIndex + 1, results.length - 1);
    updateSelectedResult(results);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedResultIndex = Math.max(selectedResultIndex - 1, 0);
    updateSelectedResult(results);
  } else if (e.key === 'Enter' && selectedResultIndex >= 0) {
    results[selectedResultIndex].click();
  }
}

function updateSelectedResult(results) {
  results.forEach((r, i) => r.classList.toggle('selected', i === selectedResultIndex));
  if (results[selectedResultIndex]) results[selectedResultIndex].scrollIntoView({ block: 'nearest' });
}
```

Add a "No results" empty state in `handleSearch()`:
```js
if (filtered.length === 0) {
  resultsContainer.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No results for "' + query + '"</div>';
}
```

---

### 4.3 Minimum Font Size Enforcement

**UX Review Ref:** Finding 2.3
**Impact:** Medium | **Complexity:** Small | **Dependencies:** None

**Where:** Multiple CSS locations

**What to change:**
| Selector | Current | Target |
|----------|---------|--------|
| `.pod-center-label` (line 521) | `0.5rem` (8px) | `0.625rem` (10px) |
| `.pod-core-label` (line 721) | `0.48rem` (7.7px) | `0.625rem` (10px) |
| `.nav-coming-soon` (line 234) | `0.55rem` (8.8px) | `0.625rem` (10px) |
| `.phase-number` (line 469) | `0.62rem` (9.9px) | `0.65rem` (10.4px) |

---

### 4.4 Dark Mode Refinement / Light Mode Toggle

**UX Review Ref:** Finding 10.3
**Impact:** Medium | **Complexity:** Large | **Dependencies:** All other phases

This is a significant effort. It requires:
1. Defining a full `:root.light` CSS custom property set
2. Adding a toggle button in the sidebar header
3. Persisting preference in `localStorage`
4. Testing all components in both modes

**Recommendation:** Defer to a future version. The dark theme is cohesive and well-designed for the target audience (developers). A light mode adds substantial maintenance burden for a single-file app.

---

### Phase 4 Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| 600px breakpoint causes unexpected layout breaks | Medium | Test on iPhone SE (375px) and iPhone 14 (390px) |
| Focus trapping interferes with Escape key handler | Low | Remove trap listener before running toggleSearch(false) |
| Minimum font size changes break pod ring layout | Medium | Test pod ring at all sizes; may need to adjust member circle dimensions |
| Light mode is a large undertaking with many edge cases | High | Defer entirely; mark as v7 goal |

---

## Implementation Order Summary

| Order | Task | Phase | Complexity | Est. Time |
|-------|------|-------|-----------|-----------|
| 1 | Fix `--text-muted` contrast | 1.2 | Small | 15 min |
| 2 | Add `prefers-reduced-motion` | 1.4 | Small | 20 min |
| 3 | Fix page transitions | 1.1 | Medium | 45 min |
| 4 | Add skip link + `href` on nav + ARIA | 1.3 | Medium | 45 min |
| 5 | Fix collapsible animation | 2.3 | Medium | 30 min |
| 6 | Add mobile sidebar backdrop | 2.4 | Small | 20 min |
| 7 | Add Page 3 inline TOC | 2.2 | Medium | 30 min |
| 8 | Workflow detail entry animation | 3.3 | Small | 10 min |
| 9 | Add page indicator bar | 2.1 | Medium | 45 min |
| 10 | Improve hover states + stagger | 3.2 | Small | 25 min |
| 11 | Smooth back-to-top | 3.4 | Small | 10 min |
| 12 | Syntax highlighting (manual) | 3.1 | Medium | 60 min |
| 13 | Search focus trap + arrow keys | 4.2 | Medium | 40 min |
| 14 | Minimum font sizes | 4.3 | Small | 15 min |
| 15 | 600px breakpoint + pod ring scale | 4.1 | Medium | 30 min |

**Total estimated time:** ~7 hours across all phases

---

## Global Testing Checklist

After all changes:

- [ ] All three pages load and transition correctly
- [ ] Sidebar navigation works (desktop and mobile)
- [ ] Hash routing works (direct URL, back/forward buttons)
- [ ] Scroll spy highlights correct sub-item
- [ ] Search opens with `/`, closes with `Escape`, results navigable with arrows
- [ ] All collapsible sections open/close smoothly
- [ ] Workflow phase switcher animates detail panel
- [ ] Pod tab switcher works on Page 2
- [ ] Copy buttons work on all code blocks
- [ ] Progress bar tracks scroll position
- [ ] Back-to-top button appears and works
- [ ] Mobile (<900px): sidebar toggle, backdrop, single-column grids
- [ ] Small mobile (<600px): readable content, no horizontal overflow
- [ ] Keyboard-only navigation: all interactive elements reachable via Tab
- [ ] Screen reader: skip link works, emoji hidden, page content announced
- [ ] `prefers-reduced-motion`: all animations disabled
- [ ] WCAG AA contrast: all text meets 4.5:1 ratio
- [ ] No console errors
- [ ] File remains self-contained (single HTML file, no broken CDN links)
