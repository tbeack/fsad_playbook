# CBP-011 — Expand Claude Directory / CLAUDE.md Setup for Teams

Add detailed coverage of the `.claude/` directory structure and CLAUDE.md setup patterns for teams to the **Claude Best Practices** page in `fsad-playbook.html`. Source material: [`../research/claude-config-cascade-infographic.html`](../research/claude-config-cascade-infographic.html).

## Goal

Give team leads a clear, actionable reference for:
- What lives in `.claude/` (project) vs `~/.claude/` (user) vs system policy
- How CLAUDE.md files cascade up the directory tree and combine
- Precedence order (system → user → project)
- How to structure config across **org → product → developer** layers in a monorepo or multi-repo setup
- When to use `rules/`, `commands/`, `skills/`, `agents/` — and how they differ
- Path-scoped rules via `paths` field
- Anti-patterns to avoid

## Source Content (from the infographic)

The research file already covers everything needed. Key blocks to translate into the playbook:

1. **Project configuration** (`.claude/` at project root, git-committed)
   - `CLAUDE.md`, `settings.json`, `rules/`, `commands/`, `skills/`, `agents/` — one-line purpose for each
2. **Global configuration** (`~/.claude/`, personal, not committed)
   - `~/.claude/CLAUDE.md`, `~/.claude/projects/*/MEMORY.md`, personal `commands/` & `skills/`
3. **Cascading rules** — directory tree walk loads parent CLAUDE.md files, combining without duplication
4. **Path-scoped rules** — `rules/*.md` with a `paths:` field to limit scope
5. **Priority order** — System policy → User (`~/.claude/`) → Project (`.claude/`) wins
6. **Single-project tree example**
7. **Multi-project org cascade example** — `my-org/.claude/` (org layer), `product-a/.claude/` (product layer), `~/.claude/` (developer layer)
8. **8 team recommendations** (CLAUDE.md as contract, rules/ for path scoping, skills as portable packages, agents for isolation, commands as team API, MEMORY.md accumulation, version control shared layers, MCP server scoping per layer)
9. **Patterns vs anti-patterns table** (6 rows each)

## Where it lives in the app

Under **Claude Best Practices** page. Likely homes:

- **Option A (preferred):** Expand the existing **Project Anatomy** section (`id="claude-setup"`, sidebar: "Project Anatomy"). That section already covers CLAUDE.md basics — this task deepens it with the full cascade + team architecture.
- **Option B:** Add a new sibling sub-section `id="config-cascade"` ("Config Cascade") between Project Anatomy and Integrations if the content is large enough to warrant its own entry.

**Decide during research.** If the new content adds >200 lines, go Option B. Otherwise expand in place.

## Research

Read `fsad-playbook.html` to confirm:

1. Current structure of the Project Anatomy section (`<section id="claude-setup">` around line 2215) — what's already covered about CLAUDE.md, what's not
2. Existing styling patterns to reuse:
   - Card grids, step cards, callouts (`callout-tip`, `callout-best-practice`), tables
   - Code block component for file-tree examples (likely `code-block` + `<pre><code>`)
   - Pattern for "do / don't" split cards (check if CBP-004 Codex anti-patterns use one we can copy)
3. Section label numbering — what number does this take (10.x)?
4. Sidebar nav wiring — pattern for adding a new sub-section (match CBP-008 approach)
5. `sectionToPageMap` — must add the new section id there (CBP-009 lesson)

## Plan

### 1. Decide placement (Option A vs B)
Based on research, pick in-place expansion or new sub-section. Document the choice in the final commit.

### 2. Write the content

Structure the new content as sub-blocks within the chosen section:

**a. Intro (2–3 sentences)**
Frame why `.claude/` matters for teams: shared instructions live in git, personal preferences stay local, cascading lets org/product/dev layers compose without duplication.

**b. The `.claude/` directory (project layer)**
- Bullet list of the 6 core files/folders (`CLAUDE.md`, `settings.json`, `rules/`, `commands/`, `skills/`, `agents/`) with one-line purpose
- Use existing card grid or icon-bullet pattern

**c. The `~/.claude/` directory (user layer)**
- Same treatment: `~/.claude/CLAUDE.md`, `projects/*/MEMORY.md`, personal `commands/` & `skills/`
- Callout: "never committed to git, never mandated across a team"

**d. Cascading + precedence**
- Explain directory tree walk (parent CLAUDE.md files combine)
- Precedence strip: System policy → User → Project (project wins)
- Callout on path-scoped rules via `paths:` field

**e. Single-project example**
Code block with the file tree from the infographic (section 3, first example)

**f. Multi-project org cascade example**
Code block with the monorepo tree (org layer → product layer → developer layer)

**g. 8 team recommendations**
Card grid (same pattern as existing card grids). Each card: title + 1–2 sentence body.

**h. Patterns vs anti-patterns**
Two-column do/don't block matching the existing pattern used in Pod Compositions or Codex Guidelines.

### 3. Wire up navigation (if Option B)
- Add sidebar nav entry
- Add `sectionToPageMap` entry: `'config-cascade': 'practices'` (or whatever id is chosen)
- Verify hash routing works

### 4. Verification
- Open in browser across light/dark/auto themes
- Sidebar nav highlights correctly as you scroll (CBP-006 regression check)
- Search finds the new content and routes correctly (CBP-009 regression check)
- All code blocks render with correct highlighting
- Cards and tables are responsive

### 5. Update docs
- README.md changelog: add CBP-011 entry under v8
- Mark CBP-011 complete in `todo.md`

## Guardrails

- Do **not** embed or iframe the infographic HTML. Translate its content into the playbook's native styling.
- Match existing section patterns (card grids, callouts, code blocks) — no new components.
- Vanilla JS only; single-file app.
- Do not regress CBP-006 (scroll spy) or CBP-009 (`sectionToPageMap`).
- Keep the playbook's tone: direct, actionable, team-focused. Trim the infographic's marketing-y phrases.

## Deliverables

- [ ] New or expanded section in `page-practices` covering the config cascade
- [ ] File tree examples (single-project + multi-project)
- [ ] 8 team recommendation cards
- [ ] Patterns vs anti-patterns block
- [ ] Sidebar nav + `sectionToPageMap` updated (if new sub-section)
- [ ] Browser verified: themes, scroll spy, search, routing
- [ ] README changelog entry
- [ ] `todo.md` CBP-011 marked complete

## Open Questions

- Option A (expand Project Anatomy in place) or Option B (new sibling sub-section)? **Decide after research.**
- Should the multi-project tree example call out FSAD explicitly, or keep it generic? **Suggested: keep it generic so it's reusable.**
- Include a short note about Codex's equivalent (`AGENTS.md`, `.agents/`) to cross-link to the Codex page, or keep this Claude-only? **Suggested: add a one-line cross-reference callout.**
