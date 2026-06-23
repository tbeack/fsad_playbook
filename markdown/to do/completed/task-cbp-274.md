# CBP-274 — Update tb:add-task and tb:do-task skill definitions in the playbook's Skills Definitions section

**Todoist ID:** 6gwXp4cm5cMv53Jp

## Source
User request: the `fsd:add-task` and `fsd:do-task` collapsibles in the Skills Definitions section of the playbook are out of sync with the canonical skill files that now live in `/skills/add-task/SKILL.md` and `/skills/do-task/SKILL.md`.

## Summary
The "Skill Definitions" section (02 — Skill Definitions on the Claude Best Practices page) shows collapsible cards for `/fsd:add-task` and `/fsd:do-task`. The description text and/or the full skill body embedded in each card needs to be replaced with the current content of the respective SKILL.md files so the playbook stays authoritative.

## Assessment
The section heading lives at line 3818–3819 in `fsad-playbook.html`. Two collapsible cards are relevant:

- **`/fsd:do-task`** — collapsible `id="skill-def--do-task"`, header at line 3823, description `<p>` at line 3829. The embedded skill body (inside a `<pre data-copy>` block) follows.
- **`/fsd:add-task`** — collapsible `id="skill-def--add-task"`, header at line 4103, description `<p>` at line 4109. The embedded skill body follows.

Canonical skill sources:
- `skills/add-task/SKILL.md` — frontmatter `description:` drives the `<p>` blurb; everything after the `---` fence is the body for the `<pre>` block.
- `skills/do-task/SKILL.md` — same pattern.

**Location:** `fsad-playbook.html` — lines 3823–~3900 (do-task card) and 4103–~4200 (add-task card)

## Plan

1. Read `skills/add-task/SKILL.md` and `skills/do-task/SKILL.md` in full.
2. For each skill:
   a. Extract the `description:` value from the frontmatter — this replaces the `<p>` blurb text inside the collapsible.
   b. Extract the full body (everything after the closing `---` fence) — this replaces the content of the `<pre data-copy>` block.
3. In `fsad-playbook.html`:
   - Find the `<p>` description tag for each collapsible and replace its text content with the extracted description.
   - Find the `<pre data-copy>` block for each collapsible and replace its content with the extracted body (HTML-escaping `<`, `>`, `&` as needed).
4. Run the build script (`python3 scripts/build-dist.py`) to regenerate `dist/fsad-playbook.html`.
5. Open the app in a browser and verify both collapsible cards render correctly with updated content.
6. Bump the version (integer increment) and update the in-app changelog with a brief entry.

All criteria verified 2026-06-22 before commit.

## Acceptance Criteria
- [x] `fsd:add-task` collapsible description matches the `description:` frontmatter in `skills/add-task/SKILL.md`
- [x] `fsd:add-task` collapsible body matches the markdown body of `skills/add-task/SKILL.md`
- [x] `fsd:do-task` collapsible description matches the `description:` frontmatter in `skills/do-task/SKILL.md`
- [x] `fsd:do-task` collapsible body matches the markdown body of `skills/do-task/SKILL.md`
- [x] Build script runs without errors; `dist/fsad-playbook.html` updated
- [x] Both cards render correctly in the browser (no broken HTML, no escaped characters visible)
- [x] Version bumped and in-app changelog updated
