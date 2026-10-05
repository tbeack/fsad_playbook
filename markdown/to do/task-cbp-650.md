# CBP-650 — Fix false build-source divergence error after a worktree merge

## Source

Found during the `tb:ship-it` run for CBP-645 (2026-10-05).

## Summary

`src/.build-stamp` is committed, but the `fsad-playbook.html` file it describes is gitignored. When a worktree branch carries a new stamp, merging it into the main tree updates the stamp but leaves the old local intermediate. `build-source.py` then reports a hand edit that did not happen, and refuses to build. `build-dist.py` still runs, and it silently builds `dist/` from the stale intermediate.

## Assessment

Seen on 2026-10-05:
- The local `fsad-playbook.html` hash matched the `origin/main` stamp (`e16d33de…`), so it was not edited.
- The merged stamp held the worktree's build hash (`14557924…`).
- `build-source.py` stopped with "The generated file was edited directly".
- `build-dist.py` then logged `Injected PLAYBOOK_EMBEDDINGS`, but the dist did not have the CBP-645 code (`grep -c leavesInBand` gave 0).

So the documented gate (look for `Injected PLAYBOOK_EMBEDDINGS`) can pass on a stale dist.

**Location:** `scripts/build-source.py` — `check_divergence()` (lines 62–76) and the `STAMP` design (line 39); `scripts/build-dist.py` (no freshness check of its input).

## Plan

1. Pick one fix and record the choice here:
   - (a) Make the stamp local: gitignore `src/.build-stamp` and untrack it, so a merge never changes it.
   - (b) Keep the stamp tracked, but also accept an intermediate whose hash matches the stamp at `HEAD^1` or `origin/main`.
2. Make `build-dist.py` fail when `fsad-playbook.html` is older than any file under `src/`, or when the hash of `fsad-playbook.html` does not match the stamp.
3. Update the `CLAUDE.md` Development Workflow note if the stamp behavior changes.

## Acceptance Criteria

- [ ] Reproduce: build in a worktree, merge the worktree branch into a branch whose `fsad-playbook.html` is an unedited older build, then run `python3 scripts/build-source.py`. It exits 0 and writes `fsad-playbook.html`, with no `--force`.
- [ ] A real hand edit is still caught: append one character to `fsad-playbook.html`, then run `python3 scripts/build-source.py`. It exits non-zero with the divergence error.
- [ ] Make a `src/` file newer than `fsad-playbook.html`, then run `python3 scripts/build-dist.py`. It exits non-zero and does not write `dist/fsad-playbook.html`.
- [ ] A normal `build-source.py` → `build-dist.py` run still logs `Injected PLAYBOOK_EMBEDDINGS`.
