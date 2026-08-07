# CBP-367 — Redo CBP-341 in reverse: push the CBP-366-updated cbp-update skill back into tb_skills

## Source
CBP-366 fixed real bugs in the live, canonical `cbp-update` skill/agent pair (`~/.claude/skills/cbp-update/SKILL.md` and `~/.claude/agents/playbook-updater.md`), per CBP-340's own established provenance rule: these files are supposed to be byte-identical to `~/repo/tb_skills/skills/cbp-update/SKILL.md` and `~/repo/tb_skills/skills/cbp-update/agent.md` respectively. CBP-341 previously did a one-time sync in the opposite direction (tb_skills → this playbook, for the general skills library). This task reverses that direction specifically for `cbp-update`: the live copies are now ahead of tb_skills and need to be pushed back so tb_skills remains the true canonical source, not a stale one.

## Summary
Copy the current, CBP-366-fixed content of `~/.claude/skills/cbp-update/SKILL.md` and `~/.claude/agents/playbook-updater.md` into `~/repo/tb_skills/skills/cbp-update/SKILL.md` and `~/repo/tb_skills/skills/cbp-update/agent.md`, plus the new `~/.claude/agents/playbook-updater-proposer.md` (no tb_skills equivalent yet — needs to be added there too), so tb_skills's canonical source reflects all of CBP-366's fixes: `run_in_background: false` on Phase 3/5 dispatch and the skill's own top-level spawn, the read-only `playbook-updater-proposer` sub-agent (correct `tools:` field, not `allowed-tools:`), the extended Phase 4→5 Success Criteria check, and the SKILL.md Liveness/Stalled-Run Detection section.

## Assessment
Not yet investigated in detail — this task starts from CBP-366's known diff, not a fresh audit. Needs confirming at execution time:
- Exact current content of `~/repo/tb_skills/skills/cbp-update/SKILL.md` and `.../agent.md` (last known state per CBP-340: byte-identical to the pre-CBP-366 live copies).
- Whether tb_skills has its own version-bump/changelog convention that a new skill file addition (`playbook-updater-proposer.md`) needs to follow.
- Whether tb_skills' `cbp-update` skill is itself parameterized/generic (not FSAD-playbook-specific) in a way that requires translating any FSAD-playbook-specific wording (e.g. the hardcoded `/Users/theobeack/Repo/fsad_playbook` path, or the `markdown/updates/cbp-365-diagnostic.md` incident references) into more generic language before landing in the shared canonical source — check how CBP-341/CBP-339 handled this same tension previously.

## Plan

1. Read the current tb_skills versions of `SKILL.md` and `agent.md` at `~/repo/tb_skills/skills/cbp-update/` and diff them against the current (CBP-366-fixed) live copies at `~/.claude/skills/cbp-update/SKILL.md` and `~/.claude/agents/playbook-updater.md`.
2. Decide, consistent with prior CBP-339/341 precedent, whether FSAD-playbook-specific content (hardcoded paths, incident references specific to this repo) should be generalized before landing in tb_skills, or copied verbatim with a note.
3. Port the fixes into tb_skills' `SKILL.md` and `agent.md`.
4. Add `playbook-updater-proposer.md` (or tb_skills' equivalent naming convention for a sub-agent file) to tb_skills' `skills/cbp-update/` directory, using the corrected `tools:` frontmatter field (not `allowed-tools:` — CBP-366 found this field name doesn't actually restrict agent tool access in this environment).
5. Verify tb_skills' own test/lint/audit tooling (if any exists for skill definitions, per its `.github/workflows/`) still passes after the change.
6. Confirm the live `~/.claude/` copies and the tb_skills canonical source are back in sync (diff should be empty, or empty modulo any deliberate generalization from step 2).

## Acceptance Criteria

No generalization was needed (Plan step 2): this skill's tb_skills copy was already FSAD-playbook-specific verbatim (hardcoded `/Users/theobeack/Repo/fsad_playbook` path, incident references), matching precedent set by TBS-067's prior resync of this same skill/agent pair — so all three files were ported byte-for-byte.

- [x] `diff ~/repo/tb_skills/skills/cbp-update/SKILL.md ~/.claude/skills/cbp-update/SKILL.md` returns no differences (or only the deliberate FSAD-playbook-specific generalizations identified in Plan step 2, explicitly listed here).
- [x] `diff ~/repo/tb_skills/skills/cbp-update/agent.md ~/.claude/agents/playbook-updater.md` returns no differences (same caveat).
- [x] tb_skills' `skills/cbp-update/` directory contains an equivalent of `playbook-updater-proposer.md` with a `tools:` (not `allowed-tools:`) frontmatter field.
- [x] Any tb_skills-side automated checks (lint/audit workflows under `.github/workflows/` relevant to skill definitions) pass after the change. (Vacuously satisfied — no `.github/workflows/`, `package.json`, `Makefile`, or any other CI/lint tooling exists anywhere in tb_skills; nothing could break.)
- [x] No changes are made to `~/.claude/skills/cbp-update/SKILL.md`, `~/.claude/agents/playbook-updater.md`, or `~/.claude/agents/playbook-updater-proposer.md` as part of this task — this task only pushes their already-verified CBP-366 content into tb_skills, it does not further modify the live copies.

All criteria verified 2026-08-07 before commit.
