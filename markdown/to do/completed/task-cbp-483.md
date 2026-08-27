# CBP-483 — [Codex] Untrusted projects no longer load project-level AGENTS.md

## Source
Codex CLI rust-v0.150.0 (2026-08-26), PR #39837: "Untrusted projects no longer supply project-level `AGENTS.md` instructions" (paired #40004: managed deny-read rules remain enforced after permission changes — internal, no doc claim affected).

## Summary
As of rust-v0.150.0, a project that has not been explicitly trusted no longer contributes its project-level `AGENTS.md` instructions to the session — closing a prompt-injection path from unfamiliar repos. Reflect this in the trust paragraph in Guidelines and the AGENTS.md hierarchy note in Project Anatomy.

## Assessment
- `src/pages/codex.html` line ~765 (`#codex-guidelines`): trust paragraph covers the rust-v0.147.0 explicit-trust prompt and credential enforcement — extend with the 0.150.0 AGENTS.md behavior.
- Line ~200 (`#codex-project-anatomy`, Pillar 1): describes the 4-level AGENTS.md merge — add a sentence that repo-root/cwd levels only load in trusted projects as of rust-v0.150.0.

## Plan
1. Append to the line ~765 trust paragraph: as of rust-v0.150.0, untrusted projects no longer supply project-level `AGENTS.md` instructions at all — until you trust the directory, only your global `~/.codex/AGENTS.md` layers apply.
2. Append a sentence to the line ~200 hierarchy paragraph noting the trusted-project requirement for the repo-root and sub-directory levels (rust-v0.150.0).

## Acceptance Criteria
- [ ] Guidelines trust paragraph documents the untrusted-project AGENTS.md exclusion with version tag.
- [ ] Project Anatomy hierarchy note carries the trusted-project caveat.
- [ ] `build-source.py` assembles cleanly.
