---
description: Pre-flight sync check for registered projects. Fetches from remote, reports uncommitted changes, and handles four states — up-to-date, ahead, behind (warns + pulls), or diverged (warns, no pull). Supports single-project (cwd detection), named-project (fsd:sync key1 key2), and full-sync (fsd:sync ALL) modes.
---

# fsd:sync — pre-flight sync check

Run this before starting any work session to confirm your local repo(s) are in sync with the remote.

**Invocation:**
- `fsd:sync` — sync the project for the current working directory
- `fsd:sync ALL` — sync every project in `projects.yaml`
- `fsd:sync <key1> <key2> …` — sync one or more named projects by YAML key

## Step 0 — Parse arguments

1. Inspect the arguments passed to the skill.
2. **No arguments** → single-project mode. Proceed to Step 1 to detect the project from cwd.
3. **Single argument `ALL`** (case-insensitive) → multi-project mode. Load `~/.claude/commands/fsd/projects.yaml`. For every project key, resolve `match_paths[0]` (expand `~`) as that project's `project_root`. Build the full project list. Proceed to Step 2.
4. **One or more project keys** → multi-project mode. Load `~/.claude/commands/fsd/projects.yaml`. For each key:
   - If found: add `(key, expand(match_paths[0]))` to the list.
   - If **not found**: print `Unknown project: '<key>' — skipping.` and continue.
   - If all keys are unknown (list is empty after skipping): print `No valid projects to sync.` and stop.
   Proceed to Step 2 with the resolved list.

## Step 1 — Detect the project (single-project mode only)

1. Determine the current working directory.
2. Read `~/.claude/commands/fsd/projects.yaml`.
3. Match cwd against each project's `match_paths` (expand `~`). Prefer the longest match.
4. If a project matches, note `project_root`. Build a one-item list: `[(matched_key, project_root)]`. Proceed to Step 2.
5. If **no project matches**: use cwd as `project_root` — sync is useful in any git repo. Build a one-item list: `[("(unregistered)", cwd)]`. Proceed to Step 2.

## Step 2 — Sync each project in the list

For each `(project_key, project_root)` in the list:
- If there is **more than one project**, print a separator header before each:
  ```
  ─── Syncing <project_key> (<project_root>) ───
  ```
- Run Steps 3–6 for this project.
- Collect the one-line status result from Step 6 for the final summary.

## Step 3 — Fetch

Run `git fetch` from `project_root`.

If `git fetch` fails (no remote, no network): record `✗ Fetch failed — <error>` for this project, skip Steps 4–6 for this project, and continue to the next project.

## Step 4 — Branch name check

1. Run `git rev-parse --abbrev-ref HEAD` to get the current branch name.
2. If the branch matches the pattern `release/vX.Y.Z` (starts with `release/v` followed by a version string):
   a. Read the project version from `cfg.version_files` (first file). If the project is unregistered or has no `version_files`, skip the rest of this step.
   b. Derive the expected branch name from `cfg.release_branch_pattern` (default: `release/{version}`).
   c. If the local branch name does not equal the expected name, warn:
      > "Branch `<local>` is stale — current version is `<version>`, expected `<expected>`. Run `/fsd:ship` to rename it."
   d. Run `git ls-remote --heads origin <expected>` to check remote presence.
      - Not found: note "Expected branch `<expected>` has not been pushed to the remote yet."
      - Found and name is already correct: no action.
3. If the branch does not match `release/vX.Y.Z`: skip this step entirely.

## Step 5 — Check uncommitted changes

Run `git status --porcelain` from `project_root`.

If output is non-empty: list the dirty files, prefixed with "Uncommitted changes detected:". Informational only — do not stop.

## Step 6 — Compare local vs remote

```bash
git rev-list --count HEAD..@{u}   # commits behind remote
git rev-list --count @{u}..HEAD   # commits ahead of remote
```

| State | behind | ahead | Action |
|-------|--------|-------|--------|
| **Up-to-date** | 0 | 0 | Report "Repo is up to date with remote." |
| **Behind** | > 0 | 0 | Warn: "Local is N commit(s) behind remote." → run `git pull`. Confirm "Pulled N commit(s). Repo is now up to date." |
| **Ahead** | 0 | > 0 | Report "Local is N commit(s) ahead of remote — ready to push." |
| **Diverged** | > 0 | > 0 | Warn: "Local and remote have diverged (N behind, M ahead). Manual resolution required — do not start work until resolved." Do NOT pull. Tell the user to run `git pull --rebase` or `git merge origin/<branch>`. |

## Step 7 — Print summary

**Single-project mode** — one banner line:

```
[fsd:sync] ✓ Up to date — safe to start work.
[fsd:sync] ✓ Pulled 3 commit(s) — repo now up to date.
[fsd:sync] ⚠ 2 commit(s) ahead — push when ready.
[fsd:sync] ✗ Diverged — resolve before starting work.
```

Append `(uncommitted changes present)` if Step 5 found dirty files.

**Multi-project mode** — summary table after all projects have been processed:

```
Project           Status
──────────────────────────────────────────────────────
tb_skills         ✓ Up to date
fsad_playbook     ✓ Pulled 2 commit(s) — now up to date
fsd               ⚠ 2 commit(s) ahead — push when ready
hangman           ✗ Diverged — resolve before starting work
```

Append `(uncommitted)` after the status text for any project that had dirty files in Step 5.
