# CBP-182 — Add `fsd:` skill library to `skills/` directory

## Source
Manual request: populate the playbook's `skills/` directory with a curated subset of the `tb_skills` project, re-namespaced from `tb:` to `fsd:`.

## Summary
The playbook already has a `skills/` directory (with `sec-review-team` and `sec-review-fixes`). This task copies 10 task-management and review skills from `~/repo/tb_skills/skills/` into that directory, renaming all `tb:` references to `fsd:` so the skills work as a self-contained `fsd` plugin without depending on the `tb` namespace.

## Assessment
`fsad_playbook/skills/` exists and contains 2 skill directories. `tb_skills/skills/` contains ~20 skills. The selected 10 reference each other via `tb:` prefix and also call `tb:log` (which is NOT being copied) — those calls must be removed.

**Location:** `fsad_playbook/skills/` — add new skill directories here. `CLAUDE.md` project structure omits this directory — add it. No HTML changes; no version bump.

## Plan

### Phase 1 — Copy skill directories (verbatim)

Copy these 10 directories from `~/repo/tb_skills/skills/` to `fsad_playbook/skills/`:

1. `do-task/`
2. `ship-it/`  ← needed by `ship` alias and referenced in `do-task`
3. `ship/`
4. `add-task/`
5. `next/`
6. `sync/`
7. `ac/`
8. `code-review-team/`
9. `estimate/`
10. `init/`

Use `cp -r` for each — preserve sub-directory structure (some skills like `code-review-team` may have sub-directories).

### Phase 2 — Prefix replacement in every copied SKILL.md

For each of the 10 SKILL.md files, apply these substitutions:

1. **Global `tb:` → `fsd:`** — replace every occurrence of `tb:` with `fsd:` (headings, description frontmatter, body text, Skill() calls, slash command examples).

2. **Remove `tb:log` calls** — `log` is not being copied; these calls would fail for users without `tb_skills`. Remove the three `Skill({ skill: "fsd:log", ... })` blocks from `do-task/SKILL.md` and the one from `add-task/SKILL.md`. Also remove any surrounding prose that says "invoke the tb:log skill silently".

   Specifically in `do-task/SKILL.md`:
   - Remove the "invoke tb:log silently" block before step 5d (execute start)
   - Remove the "invoke tb:log silently" block at step 5h (complete)
   - Remove the "invoke tb:log summary" block + the REQUIRED note at step 5h

   In `add-task/SKILL.md`:
   - Remove the "invoke tb:log skill" block at the end of the confirm-completion step.

3. **`projects.yaml` path** — the skills reference `~/.claude/commands/tb/projects.yaml`. Leave this path unchanged — teams adopting the skills will need to provide their own `projects.yaml` at that path (or fork the skill to change the path). Add a comment in the plan but don't change the file.

### Phase 3 — Update CLAUDE.md project structure

Add `skills/` to the Project Structure tree in `CLAUDE.md` with a brief description:

```
├── skills/                   # Installable Claude Code skills (fsd: plugin namespace)
```

Position it after `scripts/` in the file tree.

### Phase 4 — Verify

1. Open `fsad_playbook/skills/` and confirm all 10 skill directories are present.
2. Spot-check 3 skills (`do-task`, `ship`, `next`) — confirm `fsd:` prefix is used throughout and no `tb:log` Skill() calls remain.
3. Confirm `CLAUDE.md` lists `skills/` in the project structure.
4. Check `do-task/SKILL.md` line count is reasonable (no accidental truncation).

All criteria verified 2026-05-21 before commit.

## Acceptance Criteria

- [x] All 10 skill directories exist under `fsad_playbook/skills/`
- [x] No SKILL.md file contains `tb:` anywhere (all replaced with `fsd:`)
- [x] No SKILL.md file contains `Skill({ skill: "fsd:log"` or any `fsd:log` skill call (removed)
- [x] `do-task/SKILL.md` does not contain "invoke the fsd:log skill silently" prose
- [x] `ship/SKILL.md` correctly delegates to `fsd:ship-it`
- [x] `next/SKILL.md` correctly invokes `fsd:do-task`
- [x] `CLAUDE.md` project structure includes `skills/` with description
