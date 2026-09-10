# CBP-544 — Incorporate the recommendations into a plan

## Source
Raised in a `tb:ship-it` session (2026-09-10, CBP-543 ship) after a context-window breakdown discussion — user asked how each context layer consumes tokens, then for recommendations to reduce conversation-token growth on this project.

## Summary
Turn the five token-reduction recommendations from that discussion into an actionable plan: archive `CHANGELOG.md`, prune `MEMORY.md`, and make the project's existing read-discipline practices explicit and durable rather than incidental habit.

## Assessment
Current state, measured 2026-09-10:
- `CHANGELOG.md` is 1,981 lines / 239 KB / 178 version entries at project root — a full read costs roughly 50,000+ tokens. No archive file exists; every entry since the project's start lives in one growing file.
- `MEMORY.md` (`~/.claude/projects/-Users-theobeack-Repo-fsad-playbook/memory/MEMORY.md`) is 66 lines. A large share are near-duplicate "routine session, zero corrections, established patterns validated" entries that add fixed per-session token cost with little new information.
- `dist/fsad-playbook.html` (43 MB) and `dist/embeddings.json` are generated artifacts already correctly never read directly in this session — only build-script log lines are consulted. This convention is followed but not written down anywhere.
- Targeted reads (grep/offset/limit instead of full-file `cat`/`Read`) were used throughout the CBP-543 ship session but aren't documented as a required convention for future sessions or other contributors.

**Location:** `CHANGELOG.md` (root), `~/.claude/projects/-Users-theobeack-Repo-fsad-playbook/memory/MEMORY.md`, `CLAUDE.md` (root).

## Plan
1. Split `CHANGELOG.md`: create `CHANGELOG-archive.md`, move all entries older than the most recent ~15–20 (or older than the current minor-version series) into it verbatim, keep only the recent slice plus a pointer note in `CHANGELOG.md`.
2. Grep this repo's skills (`version-bump`, `cbp-update` agent, `tb:ship-it`'s audit steps) for any assumption that `CHANGELOG.md` holds the complete history, and update those read patterns if the split would break them.
3. Consolidate the repeated "zero corrections / patterns validated" session entries in `MEMORY.md` into a single rolling summary entry instead of one file per occurrence; prune stale or fully-superseded entries.
4. Add an explicit note to root `CLAUDE.md` (or a project skill) codifying the read-discipline convention already practiced: never `Read`/`cat` `dist/fsad-playbook.html`, `dist/embeddings.json`, or full `CHANGELOG.md` — use targeted `grep -n` / offset reads instead.
5. Re-run `python3 scripts/build-source.py` and `python3 scripts/build-dist.py` after the `CHANGELOG.md` split to confirm neither script depends on the file's current unsplit size or path assumptions.

## Acceptance Criteria

All criteria verified 2026-09-10 before commit.

- [x] `CHANGELOG.md` contains only the most recent entries (recent N or current minor-version series); every older entry is preserved verbatim in `CHANGELOG-archive.md` with no content lost.
- [x] `CHANGELOG.md` carries a pointer note referencing `CHANGELOG-archive.md`'s location.
- [x] `version-bump` skill, `cbp-update` agent, and `tb:ship-it`'s CHANGELOG audit step all still work correctly against the split files (verified by re-running their read patterns).
- [x] `MEMORY.md`'s repeated "zero corrections" session entries are consolidated into one rolling entry; total line count is measurably reduced from the current 66.
- [x] Root `CLAUDE.md` documents the read-discipline convention (no full reads of `dist/`, `fsad-playbook.html`, or `CHANGELOG.md`).
- [x] `python3 scripts/build-source.py` and `python3 scripts/build-dist.py` both run clean after the `CHANGELOG.md` split.
