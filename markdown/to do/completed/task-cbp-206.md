# CBP-206 — Add fsd:prd skill to the Skills Library

## Source
User request: add the `tb:prd` skill from `tb_skills` to the playbook as `fsd:prd`.

## Summary
Copy the PRD-writing skill from `/Users/theobeack/Repo/tb_skills/skills/prd` into the playbook's `skills/prd` directory, rename it under the `fsd:` namespace, and add it to the Skills Library page — both the overview card grid and the Skill Definitions collapsibles. The roles (`analyst.md`, `pm.md`) are inlined into SKILL.md to keep the skill self-contained. Bump count from "Eleven" to "Twelve" in the hero text.

## Assessment
The source skill lives at `/Users/theobeack/Repo/tb_skills/skills/prd/` and contains:
- `SKILL.md` — four-phase gated flow (Discovery → Specify → Plan → Tasks)
- `roles/analyst.md` — BMAD Analyst persona (discovery interviewer)
- `roles/pm.md` — GitHub Spec Kit PM persona (spec writer)

The playbook's Skills Library page (`page-skills`, `fsad-playbook.html`) has:
- `section#skills-library` — wf-card overview grid split into "Workflow Management" (8 cards) and "Review & Security" (3 cards); hero says "Eleven installable skills" in two places.
- `section#skills-definitions` — collapsible definition blocks for each of the 11 skills.

The skill currently references roles via absolute paths (`~/.claude/skills/prd/roles/analyst.md`). Since the plugin installs from the repo (not `~/.claude/skills/`), these paths break. The fix is to inline the role content directly in SKILL.md.

**Location:**
- Source skill: `/Users/theobeack/Repo/tb_skills/skills/prd/` (SKILL.md + roles/)
- Destination: `/Users/theobeack/Repo/fsad_playbook/skills/prd/` (new directory)
- Playbook HTML: `fsad-playbook.html` — skills section (~lines 3222–6028)

## Plan

### Phase 1 — Copy and adapt the skill files

1. Create `/Users/theobeack/Repo/fsad_playbook/skills/prd/` directory.
2. Write a new `SKILL.md` there that:
   - Changes the frontmatter title reference from `tb:prd` to `fsd:prd`.
   - Inlines the `analyst.md` content (under an `## Analyst Role` heading) and the `pm.md` content (under a `## PM Role` heading) instead of reading them from external files.
   - Replaces the "Read both files now before proceeding" + external path instructions with "Read the Analyst Role and PM Role sections below before proceeding."
   - Replaces `tb:do-task`/`tb:add-task` mentions in the Phase 4 closing prompt with `fsd:do-task`/`fsd:add-task`.
   - Keeps everything else exactly as-is.
3. No separate `roles/` files needed in the playbook copy — roles are inlined.

### Phase 2 — Update the playbook HTML

4. **Hero text** (`fsad-playbook.html`, ~line 3227): change "Eleven installable skills" → "Twelve installable skills".
5. **Section subtitle** (~line 3235): change "Eleven installable skills" → "Twelve installable skills".
6. **skills-library card grid** — add a new `wf-card` for `/fsd:prd` at the end of the "Workflow Management" group (after the `/fsd:init` card, before the closing `</div>` of that wf-grid):
   - Label: `/fsd:prd [feature title]`
   - Heading: Write a PRD or feature spec
   - Description: Four-phase gated flow: Discovery (Analyst role) → Specify (PM role) → Technical Plan → Task decomposition. Produces `spec.md`, `plan.md`, and `tasks.md` in the project's `planning/prd/` directory.
   - Chips: discovery interview, spec.md, tasks.md
7. **skills-definitions collapsibles** — add a collapsible for `fsd:prd` at the end of the "Workflow Management" group (after the `skill-def--init` collapsible, before the "Review & Security" label). Embed the full inlined SKILL.md content.
8. **No sidebar nav change needed** — the skills page sidebar only has "Overview" and "Definitions" links.

### Phase 3 — CHANGELOG

9. Add an entry to `CHANGELOG.md` under `## [Unreleased]`.

All criteria verified 2026-05-29 before commit.

## Acceptance Criteria
- [x] `skills/prd/SKILL.md` exists in the playbook repo with `fsd:` references (not `tb:`), role content inlined, no external file paths to `~/.claude/skills/`.
- [x] The playbook HTML hero text and section subtitle both say "Twelve" (not "Eleven").
- [x] A `/fsd:prd` wf-card appears in the Workflow Management group of the skills-library section, with correct label, heading, description, and chips.
- [x] A collapsible definition for `/fsd:prd` appears in the Workflow Management group of the skills-definitions section, with the full inlined SKILL.md source embedded.
- [x] `CHANGELOG.md` has an entry for CBP-206.
- [x] No `tb:` references remain in the copied `skills/prd/SKILL.md`.
