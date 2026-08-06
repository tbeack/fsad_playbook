# CBP-342 — Implement the CBP-340 fix plan: eliminate duplicate `cbp-update` / `playbook-updater` definitions

## Source
Follow-up to CBP-340's diagnostic (`markdown/updates/cbp-340-diagnostic.md`), itself triggered by a live `/cbp-update` incident on 2026-08-05 where duplicate, conflicting agent/skill definitions caused contradictory agent behavior and a cancelled run with zero changes applied.

## Summary
CBP-340 found four conflicting copies of a two-file workflow — two `cbp-update` trigger definitions and three `playbook-updater` agent definitions — only one of each pair matching the current, hardened design (the one tb_skills already scored 4.9 post-fix). This task collapses each pair down to a single source of truth, verifies the surviving files preserve this project's `CLAUDE.md`-specific deltas, and adds a lightweight self-check so a reintroduced duplicate is visible rather than silently causing the same failure mode again.

## Assessment

Full findings and rubric scoring are in `markdown/updates/cbp-340-diagnostic.md`. Summary of what exists today:

**Triggers (keep the first, retire the second):**
- `~/.claude/skills/cbp-update/SKILL.md` — current, matches `~/repo/tb_skills/skills/cbp-update/SKILL.md` exactly. **Keep as-is.**
- `~/.claude/commands/tb/cbp-update.md` (registered as skill `tb:cbp-update`) — stale 7-phase spec, no Phase 0/5.5/7-auto-merge, wrong project-root casing (`~/repo/fsad_playbook` instead of `/Users/theobeack/Repo/fsad_playbook`). **Retire or resync.**

**Agents (keep the first, retire the other two):**
- `~/.claude/agents/playbook-updater.md` — current, matches `~/repo/tb_skills/skills/cbp-update/agent.md` exactly. **Keep as-is**, but note it — like the tb_skills canonical version — has no mention of this project's changelog-modal version location or the `build-dist.py` step (see below).
- `~/.claude/plugins/local/fsad-playbook/agents/playbook-updater.md` — stale: no `Agent` in `allowed-tools` (can't fan out or run Phase 5.5 at all), pinned `model: claude-sonnet-4-6`, hard 10-task cap, no Phase 5.5, no Phase 7 auto-merge. **Retire or resync — see open question below about provenance.**
- `/Users/theobeack/Repo/fsad_playbook/markdown/agents/playbook-updater.md` — oldest, malformed frontmatter (`Name:`/`Description:` prose, not YAML), gitignored, last modified May 11, references a "cloud environment" that doesn't match the actual local launchd schedule (`scripts/com.fsad.playbook-updater.plist`). **Delete — this file is not part of any current, deliberate design.**

**Gap present even in the surviving canonical agent file:** no mention of the changelog-modal `<section>` (the 3rd of this project's 3 required version-bump locations per `CLAUDE.md` — the generic spec only names 2) and no mention of `scripts/build-dist.py` / staging `dist/`. Today's run got these right because a human caught the gap mid-session (see the plan approved for the 2026-08-05 run) — the agent definition itself doesn't yet encode it, so an unattended future run would miss both.

## Plan

1. **Confirm provenance of the plugin-local copy before touching it.** Check whether `fsad-playbook`'s plugin packaging (its marketplace/install manifest, if any — none was found under `~/.claude/plugins/local/fsad-playbook/.claude-plugin/` during CBP-340's investigation) regenerates `agents/playbook-updater.md` on install/update. If it does, the fix must edit whatever source the plugin build reads from, not just the installed copy, or the drift will reappear on the next plugin update.
2. **Retire the two stale agent copies.** Either delete `~/.claude/plugins/local/fsad-playbook/agents/playbook-updater.md` and `/Users/theobeack/Repo/fsad_playbook/markdown/agents/playbook-updater.md` outright, or overwrite each with the exact content of `~/.claude/agents/playbook-updater.md` — pick delete unless something in step 1 shows the plugin copy is load-bearing (e.g. required for the agent to be discoverable when the plugin is active in a context where `~/.claude/agents/` isn't loaded).
3. **Retire or resync the stale trigger copy.** Same treatment for `~/.claude/commands/tb/cbp-update.md` against `~/.claude/skills/cbp-update/SKILL.md` — confirm nothing depends on the `tb:cbp-update` name specifically before deleting it (check `~/.claude/commands/tb/` conventions for whether this command is expected to exist alongside the skill).
4. **Close the version-location and build-step gap** in whichever agent file survives: add the changelog-modal `<section>` as this project's 3rd version location in Phase 6, and add the `python3 scripts/build-dist.py` + `dist/` staging step to Phase 7's file list, matching what `CLAUDE.md`'s "Build + Commit requirement" and "Version bump checklist" sections already mandate.
5. **Add a lightweight self-check.** Near the top of the surviving agent file (e.g. right after Phase 0), add an instruction to verify no second file matching `agents/playbook-updater.md` exists elsewhere in `~/.claude/` (a simple `find`/`grep` the agent runs on itself at the start of a run) — if one is found, stop and report rather than silently proceeding, so a future reintroduced duplicate is caught immediately instead of causing another contradictory-agent incident.
6. **Verify end to end.** After the cleanup, confirm exactly one file matches each role, and (if feasible without risking another unattended run) do a dry, no-op invocation to confirm `/cbp-update` and `Agent({subagent_type: "playbook-updater"})` both resolve to the single surviving definitions.

## Acceptance Criteria
- [x] Exactly one file registers the `cbp-update` (or equivalent) trigger skill — `find ~/.claude -iname "*cbp-update*"` (excluding the tb_skills source repo) returns a single skill definition.
- [x] Exactly one file registers the `playbook-updater` agent — `find ~/.claude -iname "*playbook-updater*"` (excluding the tb_skills source repo) returns a single agent definition, and the untracked repo-local copy at `markdown/agents/playbook-updater.md` no longer exists.
- [x] The surviving agent file's Phase 6 explicitly names all 3 of this project's version-bump locations (title tag, sidebar-brand, changelog-modal `<section>`), verified by grep against the file.
- [x] The surviving agent file's Phase 7 explicitly includes `python3 scripts/build-dist.py` and staging `dist/` in the same commit, verified by grep against the file.
- [x] The surviving agent file contains a self-check step that searches for duplicate `playbook-updater` definitions before proceeding past Phase 0.
- [x] If the plugin-local copy's provenance (step 1) shows it's regenerated by a packaging/install step, that source is documented in this task's notes and fixed at the source, not just the installed copy — or explicitly confirmed not to be the case.
- [x] `git diff` for this task touches only the four identified duplicate-related files (plus, if applicable, a plugin source file identified in step 1) — no unrelated changes to `fsad-playbook.html` or other playbook content.

**Repairs found and fixed during verification (not in the original plan):**
- AC6 initially failed adversarial verification: `~/.claude/plugins/installed_plugins.json` retained a dangling `"fsad-playbook@local"` registry entry pointing at the deleted plugin directory (missed by the original investigation, which only checked for a `.claude-plugin/plugin.json` manifest and a marketplace entry — not the installed-plugins registry itself). Fixed by removing the `"fsad-playbook@local"` key; JSON validity and absence re-confirmed independently.
- AC5's self-check initially passed but was refuter-downgraded: its `find` command excluded `*/.claude/worktrees/*`, which could hide a duplicate agent definition sitting inside a worktree — the exact class of location this session itself was operating in. Fixed by removing the worktree exclusion, keeping only the legitimate `tb_skills` source-repo exclusion.

All criteria verified 2026-08-05 before commit.
