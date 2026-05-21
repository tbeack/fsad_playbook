# CBP-184 — Move Skills Library to its own main nav section

## Summary
Promote the Skills Library from a sub-section of the Workflows page into a standalone top-level page with its own nav group, positioned after "Workflows" in the left sidebar. This gives the fsd: skill library the same visual weight as Claude Best Practices and Codex Best Practices.

## Assessment
The skills-library content was added in CBP-183 as section 05 on the Workflows page (`page-workflows`). It is a substantial standalone unit (11 skill cards, installation callout, sub-group labels) that deserves its own top-level slot.

**Current structure:**
- `page-workflows` hosts sections 01–05; skills-library is section 05
- Workflows nav group has 6 sub-items including "Skills Library" at the bottom

**What needs to change:**
1. Extract `<section id="skills-library">` (line ~3192–3314) + the `<hr>` before it from `page-workflows`
2. Create a new `<div class="page" id="page-skills">` housing a hero + the skills-library section
3. Insert the new page div between `page-workflows` and `page-practices` in the HTML
4. Add a new nav group (between GROUP 3 and GROUP 4) for the new page
5. Remove the "Skills Library" sub-nav link from the Workflows nav group
6. Update `pageTitles` map in `switchPage` to include `skills: 'Skills Library'`
7. Update `sectionToPageMap` to add `'skills-hero': 'skills', 'skills-library': 'skills'`
8. Rename section label from "05 — Skills in this Playbook" → "01 — Skills in this Playbook"

**Location:**
- `fsad-playbook.html` — multiple edit points across nav HTML (~line 1961), page HTML (~line 3190–3315), and JS (~line 10063)

## Plan

### Phase 1 — Create the new page HTML

1. In `fsad-playbook.html`, locate the block immediately after `</div><!-- end page-workflows -->` (around line 3329).
2. Insert a new page div immediately after that closing tag and before the `<!-- PAGE 4: CLAUDE BEST PRACTICES -->` comment:

```html
<!-- ═══════════════════════════════════════════════════════
     PAGE 3.5: SKILLS LIBRARY
     ═══════════════════════════════════════════════════════ -->
<div class="page" id="page-skills">

<div class="hero" id="skills-hero" style="padding-bottom: 1.2rem;">
  <div class="hero-badge">Installable Skills for FSAD Pods</div>
  <h1>The <code style="font-family: var(--font-mono); font-size: 0.82em; color: inherit;">fsd:</code> Skill <em>Library</em></h1>
  <p>Eleven installable skills for task management, code review, and security. Install once via the Claude Code plugin system; invoke anywhere with <code>/fsd:&lt;name&gt;</code>.</p>
</div>

<hr class="divider">

[PASTE skills-library section here with section label changed to "01 — Skills in this Playbook"]

<footer>
  <span class="footer-brand">Full Stack Agentic Development</span>
  <p>Skills Library — installable fsd: skills for FSAD pods.</p>
</footer>
</div><!-- end page-skills -->
```

### Phase 2 — Strip skills-library from the Workflows page

Remove from `page-workflows`:
- The `<hr class="divider">` that precedes `<section id="skills-library">`
- The entire `<section id="skills-library">...</section>` block

The Workflows page will now end after the commit-changes-skill section, followed by an `<hr>` and the existing "Why these examples" closing section + footer.

### Phase 3 — Update the sidebar nav

**Remove** the Skills Library sub-nav item from the Workflows group:
```html
<a class="nav-sub-item" href="#workflows/skills-library" onclick="scrollToSection('skills-library')">Skills Library</a>
```

**Add** a new nav group after the Workflows group and before the Claude Best Practices group:
```html
<!-- GROUP 3.5: Skills Library -->
<div class="nav-group">
  <button class="nav-group-toggle" onclick="navigateTo('skills', this)" data-page="skills">
    <span class="nav-icon" aria-hidden="true">◆</span>
    Skills Library
    <span class="nav-chevron">›</span>
  </button>
  <div class="nav-sub-items" data-group="skills">
    <a class="nav-sub-item" href="#skills/skills-library" onclick="scrollToSection('skills-library')">Overview</a>
  </div>
</div>
```

### Phase 4 — Update JavaScript routing

1. **`pageTitles`** (inside `switchPage`): add `skills: 'Skills Library'` to the object.

2. **`sectionToPageMap`**: add a new entry line after the workflows row:
   ```
   'skills-hero': 'skills', 'skills-library': 'skills',
   ```

### Phase 5 — Build, verify, changelog

- Run `python3 scripts/build-dist.py`
- Open in browser, verify: Skills Library appears as its own nav item after Workflows; clicking it shows the new page; all skill cards render; clicking "Workflows" no longer shows Skills Library in the sub-nav
- Update CHANGELOG.md and version

All criteria verified 2026-05-21 before commit.

## Acceptance Criteria
- [x] "Skills Library" appears as a top-level nav item in the left sidebar, positioned after "Workflows"
- [x] Clicking "Skills Library" in the nav loads a standalone page with the hero and all 11 skill cards
- [x] The Workflows nav group no longer includes a "Skills Library" sub-item
- [x] The Workflows page still renders correctly (commit-changes-skill → "Why these examples" → footer)
- [x] Section label on the skills page reads "01 — Skills in this Playbook"
- [x] `sectionToPageMap` includes `skills-library: 'skills'` so hash `#skills/skills-library` navigates correctly
- [x] `pageTitles` includes `skills: 'Skills Library'` so the page title bar shows the correct label
- [x] Build script (`python3 scripts/build-dist.py`) runs without error; `dist/fsad-playbook.html` is up-to-date
- [x] CHANGELOG updated and version bumped
