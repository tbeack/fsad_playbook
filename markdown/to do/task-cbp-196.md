# CBP-196 — Remove personal references from skills section

## Summary

The Skills section in the playbook contains personal references to "Theo" in skill descriptions and `~/.claude/commands/tb/projects.yaml` config paths that should be generic. This task removes the personal name and renames the `tb` namespace to `fsd` throughout all skill files and the playbook HTML — making the skills section fully shareable without Theo-specific references.

## Assessment

Two categories of personal references exist, spanning both the source skill files and the HTML:

**"Theo's" personal name references (6 total):**
- `skills/do-task/SKILL.md` line 2 — frontmatter description
- `skills/add-task/SKILL.md` line 2 — frontmatter description
- `fsad-playbook.html` lines 3370, 3373, 3650, 3653 — visible card descriptions and embedded code blocks

**`~/.claude/commands/tb/projects.yaml` path (22 total):**
- `skills/do-task/SKILL.md` — 2 occurrences
- `skills/add-task/SKILL.md` — 3 occurrences
- `skills/sync/SKILL.md` — 3 occurrences
- `skills/init/SKILL.md` — 1 occurrence
- `skills/next/SKILL.md` — 1 occurrence
- `skills/ac/SKILL.md` — 1 occurrence
- `skills/ship-it/SKILL.md` — 1 occurrence
- `fsad-playbook.html` — 14 occurrences (embedded skill code blocks)

**`/Users/theobeack/` example path (1 total):**
- `fsad-playbook.html` line 4489 — generic path example inside fsd:init skill body

**Location:** `skills/` directory + `fsad-playbook.html`

## Plan

1. **Update `skills/do-task/SKILL.md`**
   - Replace `"Theo's local projects"` → `"your local projects"` in the frontmatter description
   - Replace all `~/.claude/commands/tb/projects.yaml` → `~/.claude/commands/fsd/projects.yaml` (sed replace_all)

2. **Update `skills/add-task/SKILL.md`**
   - Replace `"Theo's local projects"` → `"your local projects"` in the frontmatter description
   - Replace all `~/.claude/commands/tb/projects.yaml` → `~/.claude/commands/fsd/projects.yaml` (sed replace_all)

3. **Update `skills/sync/SKILL.md`**
   - Replace all `~/.claude/commands/tb/projects.yaml` → `~/.claude/commands/fsd/projects.yaml` (sed replace_all)

4. **Update remaining skill files** (`init`, `next`, `ac`, `ship-it`)
   - Replace `~/.claude/commands/tb/projects.yaml` → `~/.claude/commands/fsd/projects.yaml` in each

5. **Update `fsad-playbook.html`**
   - Replace all `Theo&#x27;s local projects` → `your local projects` (4 occurrences)
   - Replace all `~/.claude/commands/tb/projects.yaml` → `~/.claude/commands/fsd/projects.yaml` (14 occurrences)
   - Replace `/Users/theobeack/repo/my_project` → `/Users/username/repo/my_project` (1 occurrence — generic example)

6. **Run build script** to regenerate `dist/fsad-playbook.html`
   ```bash
   python3 scripts/build-dist.py
   ```

All criteria verified 2026-05-27 before commit.

## Acceptance Criteria

- [x] `skills/do-task/SKILL.md` contains no "Theo" and no `commands/tb`
- [x] `skills/add-task/SKILL.md` contains no "Theo" and no `commands/tb`
- [x] `skills/sync/SKILL.md` contains no `commands/tb`
- [x] `skills/init/SKILL.md`, `skills/next/SKILL.md`, `skills/ac/SKILL.md`, `skills/ship-it/SKILL.md` contain no `commands/tb`
- [x] `fsad-playbook.html` contains no "Theo" (in skills section) and no `commands/tb`
- [x] `dist/fsad-playbook.html` is regenerated and in sync with the source
- [x] `grep -r "Theo" skills/ | wc -l` returns 0
- [x] `grep -r "commands/tb" skills/ | wc -l` returns 0
- [x] `grep "Theo" fsad-playbook.html | wc -l` returns 0
- [x] `grep "commands/tb" fsad-playbook.html | wc -l` returns 0
