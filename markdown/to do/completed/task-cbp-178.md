# CBP-178 — Add `fsd:prd` skill to the skill library and deploy to skills/

## Source
User request: add the tb:prd skill concept (from TBS-020 research) to the playbook, renaming the "tb" prefix to "fsd" throughout, and deploy the skill file to the playbook's `skills/` directory.

## Summary
Create a `fsd:prd` PRD-writing skill based on the GitHub Spec Kit four-phase gate structure (top recommendation from TBS-026 research), wire it into the "Building Skills" → "Example Skills" section of the playbook HTML, and add the actual SKILL.md file under `skills/fsd-prd/` for distribution. The skill renames every "tb:" reference to "fsd:" so it works as a self-contained, playbook-distributed resource.

## Assessment
- The `tb:prd` skill does not yet exist anywhere (TBS-020 is still open). The research in `planning/research/prd-agents-research.md` (TBS-026) recommends GitHub Spec Kit as the primary model and BMAD Analyst/PM as the discovery layer.
- The playbook already distributes skills under `skills/` (sec-review-team, sec-review-fixes). Same pattern applies: `skills/fsd-prd/SKILL.md`.
- The "Building Skills" → "Example Skills" section at HTML line 5637 has four collapsibles (documentation, story-point, epic-to-stories, code-review). The new `fsd:prd` skill should be added after `code-review-skill` and before `advanced-patterns`.
- The left-nav leaf items at HTML lines 2009–2014 need a matching entry.
- Version bump: v2.67.0 → v2.68.0 (one feature added).

**Relevant files:**
- `fsad-playbook.html` — HTML edits (nav leaf + example skill collapsible)
- `skills/fsd-prd/SKILL.md` — new file (the skill itself)
- `dist/fsad-playbook.html` — rebuilt by `python3 scripts/build-dist.py`
- `CHANGELOG.md` — entry for v2.68.0
- `README.md` — version table row

## Plan

### Phase 1 — Write the `fsd:prd` SKILL.md

Create `skills/fsd-prd/SKILL.md`. The skill uses:
- GitHub Spec Kit four-phase structure: Discover → Specify → Plan → Tasks
- BMAD-inspired guided discovery interview (stakeholder questions before writing)
- All "tb:" command references renamed to "fsd:" (e.g. `fsd:do-task`)
- Writes three artifacts: `prd/spec.md`, `prd/plan.md`, `prd/tasks.md`
- Invoked as `/fsd:prd [description-or-jira-link]`

Frontmatter:
```yaml
name: prd
description: Four-phase PRD writer — guided discovery interview, then Specify (spec.md), Plan (plan.md), and Tasks (tasks.md with AC checkboxes). Based on GitHub Spec Kit. Use when the user says "write a PRD", "create a spec", "spec this out", "turn this idea into tasks", or similar.
argument-hint: "[feature description or Jira/Linear link]"
allowed-tools: Read Grep Glob WebFetch
```

Skill body — four gated phases:
1. **Discover** — run a 5-question interview (problem, users, success metrics, constraints, out-of-scope). Accept "skip" at any step to proceed with inferred values.
2. **Specify** — write `prd/spec.md` (problem statement, user journeys, success metrics, scope, risks). User reviews and approves before continuing.
3. **Plan** — ask for technical constraints (stack, performance targets, infra limits), then write `prd/plan.md` (architecture approach, key components, implementation sequence, dependencies). User reviews.
4. **Tasks** — decompose spec+plan into `prd/tasks.md` (dependency-ordered tasks, each with acceptance criteria checkboxes). Optionally hand off to `/fsd:do-task`.

### Phase 2 — Update `fsad-playbook.html`

**Step 2a — Add nav leaf item** after the `code-review-skill` leaf (line ~2013):
```html
<a class="nav-leaf-item" href="#practices/building-skills/prd-skill" data-leaf="building-skills--prd-skill" onclick="event.preventDefault(); openAndScrollToLeaf('building-skills--prd-skill', 'skills-hooks')">PRD Writer</a>
```

**Step 2b — Add collapsible** after `building-skills--code-review-skill` div and before `building-skills--advanced-patterns` (line ~5791):
```html
<div class="collapsible" id="building-skills--prd-skill">
  <div class="collapsible-header">
    <h3>PRD Writer Skill</h3>
    <span class="collapsible-chevron">&#9660;</span>
  </div>
  <div class="collapsible-body"><div class="collapsible-content">
    <p>Four-phase PRD writer: guided discovery interview → <code>spec.md</code> → <code>plan.md</code> → <code>tasks.md</code>. Based on the GitHub Spec Kit gate model. Install from <code>skills/fsd-prd/</code> in the <a href="https://github.com/tbeack/fsad_playbook" style="color:var(--accent);">fsad_playbook repo</a>.</p>
    <div class="code-block" style="margin-top:0.75rem;">
      <pre><code class="language-markdown">[... SKILL.md content as code example ...]</code></pre>
    </div>
  </div></div>
</div>
```

### Phase 3 — Version bump + CHANGELOG + README

- Bump version: `v2.67.0` → `v2.68.0` in `<title>` tag and README version table
- Add CHANGELOG entry under `### [Unreleased]` (or new `### v2.68.0` block)
- Run build: `python3 scripts/build-dist.py`

## Acceptance Criteria
- [ ] `skills/fsd-prd/SKILL.md` exists with valid YAML frontmatter (name: prd, description, argument-hint, allowed-tools)
- [ ] SKILL.md describes all four phases (Discover, Specify, Plan, Tasks) and writes prd/spec.md, prd/plan.md, prd/tasks.md
- [ ] All references in SKILL.md use "fsd:" prefix, not "tb:"
- [ ] Nav leaf "PRD Writer" appears in the sidebar under Building Skills → Example Skills
- [ ] Collapsible `building-skills--prd-skill` exists in HTML with an introductory paragraph and the SKILL.md content as a code block
- [ ] HTML is valid — no broken collapsibles or unclosed tags in the affected section
- [ ] Playbook version bumped to v2.68.0 in `<title>` tag, README, and CHANGELOG
- [ ] `dist/fsad-playbook.html` rebuilt and in sync with source
