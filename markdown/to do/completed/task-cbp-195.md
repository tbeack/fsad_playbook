# CBP-195 — Add skill definitions to the Skills Library section

## Summary

The Skills Library page (`page-skills`) currently shows an overview card grid for each `fsd:` skill but doesn't expose the actual SKILL.md content. This task adds a "Skill Definitions" section below the overview cards — mirroring the "Specialist Definitions" pattern used in the Multi-Agent Security Review Team section — where each skill file is presented as a collapsible card with its full SKILL.md content embedded.

## Assessment

**Current state of the Skills Library page (`page-skills`, lines 3220–3359):**
- Section `#skills-library` has an installation card + two `wf-grid` groups:
  - *Workflow Management*: do-task, add-task, ship-it, next, sync, ac, estimate, init (8 cards)
  - *Review & Security*: code-review-team, sec-review-team, sec-review-fixes (3 cards)
- No skill file content is shown — only names, descriptions, and feature chips.

**Pattern to replicate — Specialist Definitions (`lines ~4752–5500+` of `fsad-playbook.html`):**
- Heading `<h3>Specialist Definitions</h3>` with an intro `<p>`.
- One `.collapsible` card per specialist:
  - Header: specialist name + baseline/stack-specific badge
  - Body: Primary scope, Threat model, Coverage categories, Definition file
  - "Definition file" section uses `<pre data-copy>` with HTML-escaped markdown content

**For the Skills Library**, the card body is simpler:
- Description (from frontmatter)
- Argument hint (if present)
- Definition file (`<pre data-copy>` with HTML-escaped SKILL.md content, frontmatter included)

**Skills to include** (from `skills/` directory — 12 total, `ship` is an alias handled as a note under `ship-it`):

| Skill | Invocation | SKILL.md size |
|-------|-----------|--------------|
| ac | `/fsd:ac <ID>` | ~4.9 KB |
| add-task | `/fsd:add-task [title]` | ~7.3 KB |
| code-review-team | `/fsd:code-review-team` | ~15.2 KB |
| do-task | `/fsd:do-task <ID>` | ~16 KB |
| estimate | `/fsd:estimate` | ~2.5 KB |
| init | `/fsd:init` | ~7.8 KB |
| next | `/fsd:next` | ~1.8 KB |
| sec-review-fixes | `/fsd:sec-review-fixes` | ~9.2 KB |
| sec-review-team | `/fsd:sec-review-team` | ~19.3 KB |
| ship | alias for ship-it | ~0.2 KB |
| ship-it | `/fsd:ship-it` | ~9.8 KB |
| sync | `/fsd:sync` | ~5.6 KB |

**Location:**
- Source file: `fsad-playbook.html`
- New section inserted after the closing `</section>` of `#skills-library` (line ~3353)
- Navigation: `skills` nav group in the left sidebar (lines ~1964–1974)
- `sectionToPageMap` JS object (line ~10104)

## Plan

### Phase 1 — HTML: Add "Skill Definitions" section

1. **Read** `fsad-playbook.html` around lines 3220–3360 to confirm exact insertion point (after `</section>` that closes `#skills-library`).

2. **Insert** a new `<section id="skills-definitions">` block immediately after the closing `</section>` of `#skills-library` (before the `<footer>` tag at line ~3355). The structure:

   ```html
   <hr class="divider">

   <section id="skills-definitions">
     <span class="section-label">02 — Skill Definitions</span>
     <h2 class="section-title">Skill Definitions</h2>
     <p class="section-subtitle">Each card mirrors the live skill file under
       <a href="https://github.com/tbeack/fsad_playbook/tree/main/skills"><code>skills/</code></a>
       in the repo. Open a card to read the full skill source and copy it directly.</p>

     <span class="section-label" style="display:block; margin-bottom:0.75rem;">Workflow Management</span>
     <!-- collapsibles: do-task, add-task, ship-it (+ ship alias note), next, sync, ac, estimate, init -->

     <span class="section-label" style="display:block; margin-top:2rem; margin-bottom:0.75rem;">Review &amp; Security</span>
     <!-- collapsibles: code-review-team, sec-review-team, sec-review-fixes -->
   </section>
   ```

3. **Each collapsible** follows this pattern (one per skill):

   ```html
   <div class="collapsible" id="skill-def--{slug}" style="margin-top:0.6rem;">
     <div class="collapsible-header">
       <h3>/fsd:{name}
         <span style="font-size:0.8rem; font-weight:400; color:var(--text-muted); margin-left:0.5rem;">{argument-hint}</span>
       </h3>
       <span class="collapsible-chevron">&#9660;</span>
     </div>
     <div class="collapsible-body"><div class="collapsible-content">
       <p style="color:var(--text-secondary); margin-bottom:1rem;">{description from frontmatter}</p>
       <h4 style="font-size:0.74rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin:1.2rem 0 0.5rem;">Definition file</h4>
       <pre data-copy style="background:var(--surface-2); border:1px solid var(--border); border-radius:6px; padding:1rem; font-size:0.8rem; overflow-x:auto; white-space:pre-wrap; color:var(--text-secondary);"><code>{HTML-escaped SKILL.md content}</code></pre>
     </div></div>
   </div>
   ```

   - HTML-escape all `&` → `&amp;`, `<` → `&lt;`, `>` → `&gt;` in the SKILL.md content before embedding.
   - Include the full SKILL.md (frontmatter + body).
   - The `ship` skill: add a note in the `ship-it` collapsible header area or as a small paragraph below: "Also available as `/fsd:ship` (alias)."

### Phase 2 — Navigation

4. **Add** "Definitions" as a second nav sub-item in the Skills Library nav group (after "Overview"):

   ```html
   <a class="nav-sub-item" href="#skills/skills-definitions" onclick="scrollToSection('skills-definitions')">Definitions</a>
   ```

   Location: lines ~1972–1974 in the `nav-sub-items[data-group="skills"]` div.

### Phase 3 — JS sectionToPageMap

5. **Add** `'skills-definitions': 'skills'` to the `sectionToPageMap` object (line ~10104):

   ```js
   'skills-hero': 'skills', 'skills-library': 'skills', 'skills-definitions': 'skills',
   ```

### Phase 4 — Version bump and build

6. **Bump version** from current to next integer minor (e.g., v2.74.x → v2.75.0 or next appropriate bump). Check current version in `<title>` tag and README.

7. **Run build script**:
   ```bash
   python3 scripts/build-dist.py
   ```

8. **Update CHANGELOG.md** with an entry for this change.

All criteria verified 2026-05-27 before commit.

## Acceptance Criteria

- [x] A "Skill Definitions" section (`id="skills-definitions"`) appears on the Skills Library page below the overview cards, with the heading "02 — Skill Definitions".
- [x] The section contains collapsibles for all 11 unique skills (ship alias referenced in ship-it card, not as a separate card).
- [x] Each collapsible shows: (a) the skill invocation as the header, (b) the description paragraph, (c) a "Definition file" block with the full HTML-escaped SKILL.md content in a `<pre data-copy>` element.
- [x] Skills are grouped into "Workflow Management" and "Review & Security" groups matching the existing overview cards.
- [x] Opening a collapsible and clicking the `<pre>` block triggers the copy behavior (data-copy attribute present).
- [x] The Skills Library left-sidebar nav shows a "Definitions" sub-item that scrolls to `#skills-definitions`.
- [x] `sectionToPageMap` includes `'skills-definitions': 'skills'` so deep-linking works.
- [x] CHANGELOG updated with the version bump.
- [x] `python3 scripts/build-dist.py` runs without errors and the dist file is up to date.
