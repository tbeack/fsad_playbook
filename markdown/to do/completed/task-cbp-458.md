# CBP-458 — Code Review Team overview section + diagram parity with Security Review

## Source
`markdown/to do/todo.md` backlog item.

## Summary
The Security Review Team has a full standalone showcase section on the Skills Library page (`03 — Security Review`): intro, orchestration diagram, invocation callout, specialist table, and 13 specialist-definition cards. Code Review Team has an equivalent orchestration diagram and specialist cards too, but they're buried inside its `SKILL.md` collapsible in `02 — Skill Definitions` — there's no standalone overview section for it. Separately, the native "Code Review" section on the Claude Best Practices page (`id="code-review"`) covers only GitHub's built-in Claude Code Review feature and never mentions the `fsd:code-review-team` skill at all.

This task gives Code Review Team the same standalone-section treatment as Security Review, and adds a short cross-referencing callout from the native Code Review section.

## Assessment

**Security Review section (pattern to mirror):** `fsad-playbook.html:7907-9126`, `id="security-review"`, `section-label` `"03 — Security Review"`. Structure: H2 + subtitle → `<figure class="sec-review-flow-diagram">` (dark+light SVGs, `fsad-playbook.html:7912-8157`) → "Invocation" callout (`8159-8162`) → "The Specialist Library" H3 + table (`8164-8190`) → "Specialist Definitions" H3 + 13 `<div class="collapsible" id="sec-spec--*">` cards (`8192` onward).

**Code Review Team's existing content (currently buried):** `<div class="collapsible" id="skill-def--code-review-team">` at `fsad-playbook.html:5850`, inside section `02 — Skill Definitions`. Contains: skill description + `SKILL.md` source (`5850-6334`), then `<figure class="crt-flow-diagram">` (dark+light SVGs, `6336-6577`), then (need to re-verify exact range at implementation time, content may have shifted) a specialist table + 7 specialist-definition cards (`correctness-reviewer`, `design-reviewer`, `performance-reviewer`, `maintainability-reviewer`, `testing-reviewer`, `api-contract-reviewer`, `security-reviewer`) added per CBP-198/CBP-325, before the collapsible closes.

**Native Code Review section:** `fsad-playbook.html:10057-10260`, `id="code-review"`, page `page-practices`, section-label `"10.5 — Code Review Agent"`. Entirely about GitHub's built-in Claude Code Review — no mention of `fsd:code-review-team`.

**Cross-reference pattern to reuse** (from Codex page, `fsad-playbook.html:13814`):
```html
<a href="#skills/security-review" onclick="switchPage('skills'); setTimeout(()=>scrollToSection('security-review'),150);" style="color:var(--accent);">sec-review-team skill</a>
```

**Nav + routing to update:**
- Sidebar sub-nav for Skills page: `fsad-playbook.html:2276-2278` (`Overview`, `Definitions`, `Security Review` — need a new `Code Review` item inserted before `Security Review`).
- `sectionToPageMap`: `fsad-playbook.html:~15843` — add `'code-review-team': 'skills'`.

## Plan

1. **Extract, don't duplicate, the diagram.** Move the `<figure class="crt-flow-diagram">...</figure>` block (dark+light SVGs) out of the `skill-def--code-review-team` collapsible (`~6336-6577`) — it will be relocated into the new standalone section in step 2. Leave the rest of the collapsible (SKILL.md text, specialist table, specialist cards) in place.

2. **Add new standalone section `id="code-review-team"` to the Skills Library page**, inserted immediately before `<section id="security-review">` (`fsad-playbook.html:7907`), mirroring the Security Review section's structure exactly:
   - `<span class="section-label">03 — Code Review Team</span>` + `<h2 class="section-title">Multi-Agent Code Review Team</h2>` + subtitle `<p>` describing the 7-specialist parallel review, consensus fan-out, severity-gated validation, and `REVIEW-REPORT.md` output (adapt from the `skill-def--code-review-team` description at `5856`).
   - The relocated `crt-flow-diagram` figure from step 1.
   - An "Invocation" callout mirroring the Security Review one (`8159-8162`), adapted: install path, `/fsd:code-review-team <target path> <scope> [--lite]`, no companion-fixes skill (review-only, unlike sec-review-team's `sec-review-fixes` pairing) — so the callout should note "review-only, no fixes" instead.
   - "The Specialist Library (7)" H3 + table, duplicating the structure/style of the Security Review specialist table (`8167-8190`) but with the 7 code-review-team specialists and their default-mode/scope, pulled from the existing specialist table inside the `skill-def--code-review-team` collapsible.
   - "Specialist Definitions" H3 + intro `<p>`, then duplicate (not move) the 7 `<div class="collapsible" id="crt-spec--*">` specialist-definition cards from inside the `skill-def--code-review-team` collapsible — same content, new `id` prefix (`crt-spec--` instead of whatever prefix they currently use) to avoid duplicate-ID collisions, since the originals stay in place inside `02 — Skill Definitions` per the confirmed scope (full duplication, matching sec-review-team's own dual-representation pattern).

   Renumber the existing `<section id="security-review">`'s `section-label` from `"03 — Security Review"` to `"04 — Security Review"` (id and all internal content unchanged).

3. **Update sidebar nav** (`fsad-playbook.html:2276-2278`): insert a new `<a class="nav-sub-item" href="#skills/code-review-team" onclick="scrollToSection('code-review-team')">Code Review</a>` between the `Definitions` and `Security Review` items.

4. **Update `sectionToPageMap`** (`fsad-playbook.html:~15843`): add `'code-review-team': 'skills'` alongside the existing `security-review` entry.

5. **Add a short cross-reference subsection to the native Code Review section** (`fsad-playbook.html:10057-10260`, page-practices). Insert near the top (after the intro subtitle, before "How the Multi-Agent Architecture Works") a callout introducing the `fsd:code-review-team` skill as the multi-agent alternative for local/pre-PR review, with a cross-link using the established pattern:
   ```html
   <div class="callout callout-tip" style="margin-bottom:1.5rem;">
     <div class="callout-title">Prefer the Packaged Skill</div>
     <p>For local, pre-PR multi-agent review (7 specialists, consensus fan-out, severity-gated validation), use the <a href="#skills/code-review-team" onclick="switchPage('skills'); setTimeout(()=>scrollToSection('code-review-team'),150);" style="color:var(--accent);">code-review-team skill</a> instead of or alongside GitHub's built-in Code Review Agent below.</p>
   </div>
   ```

6. **Version bump + changelog.** Bump `v3.2.46` → `v3.3.0` (minor — new section/feature) in `<title>` (`fsad-playbook.html:6`), sidebar brand badge (`fsad-playbook.html:2184`), and add a changelog `<section>` block. Update `README.md` version table row to match.

7. Run `python3 scripts/build-dist.py` and stage `fsad-playbook.html` + `dist/fsad-playbook.html` together.

## Acceptance Criteria
All criteria verified 2026-08-26 before commit.
- [x] A new `<section id="code-review-team">` exists on the Skills Library page, positioned immediately before `<section id="security-review">`, containing: H2/subtitle intro, the relocated `crt-flow-diagram` figure (dark+light SVGs), an "Invocation" callout, a 7-row specialist table, and 7 specialist-definition collapsible cards.
- [x] The `crt-flow-diagram` figure no longer appears inside the `skill-def--code-review-team` collapsible in `02 — Skill Definitions` (moved, not duplicated) — the SKILL.md text, specialist table, and specialist cards remain there unchanged.
- [x] `<section id="security-review">`'s `section-label` reads `"04 — Security Review"` (was `"03"`); its `id` and internal content are otherwise unchanged.
- [x] Sidebar nav under the Skills page includes a `Code Review` sub-item between `Definitions` and `Security Review`, linking to `#skills/code-review-team` and calling `scrollToSection('code-review-team')`.
- [x] `sectionToPageMap` includes `'code-review-team': 'skills'`.
- [x] The native `id="code-review"` section on the Claude Best Practices page contains a callout introducing `fsd:code-review-team` with a working cross-link (`switchPage('skills')` + `scrollToSection('code-review-team')`) to the new section.
- [x] Clicking the new cross-link from the Code Review section navigates to the Skills page and scrolls to the Code Review Team section (manually verified in browser).
- [x] `<title>`, sidebar brand badge, and `README.md` version table all read `v3.3.0`; a changelog `<section>` block for v3.3.0 describing this change exists in the changelog modal.
- [x] `python3 scripts/build-dist.py` has been run and `dist/fsad-playbook.html` reflects all changes above.
