# CBP-651 — Fix stale playbook_version in the playbook-assistant index meta

## Source

Found during the CBP-647 do-task run (2026-10-05). The CBP-647 agent reverted `meta.json` and noted that `playbook_version` was already one release behind.

## Summary

`skills/playbook-assistant/index/meta.json` reads `"playbook_version": "4.1.43"`, but the playbook is v4.1.44. The CLAUDE.md rule tells you to revert `meta.json` after `build-dist.py` unless the index changed. That revert also discards the version bump, so the field falls behind on every release that does not change the index. The playbook-assistant skill compares this field with the local `<title>` version and warns that the index may be out of date, so the stale field gives a false warning.

## Assessment

- `scripts/build-assistant-index.py` (lines 90–98) writes `playbook_version`, `generated_at` and `chunk_count` on every run.
- `CLAUDE.md` (Development Workflow) says: revert `meta.json` "unless the index actually changed".
- `skills/playbook-assistant/SKILL.md` (line 38) compares `playbook_version` with the `<title>` version of `fsad-playbook.html` and warns on a mismatch.
- The last 3 commits that touched `meta.json` are CBP-643, CBP-644 and the v2.1.288 auto-update. The v4.1.44 release commit did not touch it.

**Location:** `scripts/build-assistant-index.py` — lines 90–98; `CLAUDE.md` — Development Workflow; `skills/playbook-assistant/SKILL.md` — line 38

## Plan

1. Pick one fix and record the choice here. **Chosen (2026-10-05): (a).** It fixes the cause in the build, so manual and `cbp-update` releases both keep the field current with no step to remember.
   - (a) Only rewrite `meta.json` when its content changes, apart from `generated_at`. Keep `generated_at` unchanged when the chunks and version are the same. Then a release bump changes only `playbook_version`, and you commit it.
   - (b) Change the CLAUDE.md rule: keep the `meta.json` change in release commits, and revert it only in non-release commits.
2. Update the `meta.json` note in `CLAUDE.md` to match the choice.
3. Set `playbook_version` to the current playbook version.

## Acceptance Criteria

- [x] After a fresh `python3 scripts/build-source.py` and `python3 scripts/build-dist.py`, `playbook_version` in `skills/playbook-assistant/index/meta.json` equals the version in the `<title>` of `fsad-playbook.html`.
- [x] A second `build-dist.py` run with no `src/` change leaves `git diff --stat -- skills/playbook-assistant/index/meta.json` empty (option a), or `CLAUDE.md` tells you to commit the `meta.json` change in release commits (option b).
- [x] The `meta.json` note in `CLAUDE.md` matches the chosen fix.
- [x] The committed `meta.json` has `playbook_version` equal to the current release version.

All criteria verified 2026-10-05 before commit.
