---
description: Pre-flight sync check for registered projects. Fetches from remote, reports uncommitted changes, and handles four states — up-to-date, ahead, behind (warns + pulls), or diverged (warns, no pull). Supports single-project (cwd detection), named-project (fsad-harness:sync key1 key2), and full-sync (fsad-harness:sync ALL) modes.
---

# fsad-harness:sync — pre-flight sync check

Run this before starting any work session to confirm your local repo(s) are in sync with the remote.

**Invocation:**
- `fsad-harness:sync` — sync the project for the current working directory
- `fsad-harness:sync ALL` — sync every project in `projects.yaml`
- `fsad-harness:sync <key1> <key2> …` — sync one or more named projects by YAML key

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

**Multi-project mode (2+ projects):** dispatch the **entire Steps 3–6 pipeline** for every project **concurrently**, not just the fetch — issue one `Bash` tool call per project that runs fetch, branch check, worktree check, dirty check, and the ahead/behind (plus pull + re-verify, when applicable) comparison in sequence for that project, all in the same message across projects. Each dispatched call is self-contained and produces one structured result record (see the schema at the end of this step) — there's no cross-project dependency, so nothing after the initial fan-out needs to happen serially.

Then loop through the projects in original list order purely to print output:
- Print a separator header before each:
  ```
  ─── Syncing <project_key> (<project_root>) ───
  ```
- Print that project's result using its already-computed structured record — do not re-run any git command here, this loop is presentation only.

**Single-project mode:** run Steps 3–6 in order as usual — there's only one project, so there's nothing to parallelize.

**Structured per-project result.** Whether single- or multi-project mode, every project's pipeline run (Steps 3–6) must produce one result record with this shape, used to build the Step 7 summary instead of reconstructing status text from prose:

```
{
  project_key,
  state,              // "fetch_failed" | "no_upstream" | "up_to_date" | "behind" | "ahead" | "diverged"
  ahead,              // integer, or null if not computed (e.g. fetch_failed, no_upstream)
  behind,             // integer, or null
  dirty,              // boolean — Step 5 result
  pull_attempted,     // boolean — true only if state was "behind" AND dirty was false
  pull_succeeded,     // boolean | null — null if pull_attempted is false
  error,              // string | null — fetch/remote-check error text, else null
  is_worktree,        // boolean — Step 4.5 result
  worktree_branch,    // string | null
  stale_branch_warning // string | null — Step 4's stale-release-branch message, if any
}
```

Populate this record as each step below executes for the project (Steps 3–6 write into it); Step 7 only reads from it.

## Step 3 — Fetch

Run `git fetch` from `project_root`. (In multi-project mode this is the call dispatched concurrently in Step 2 — this section describes what each dispatched fetch does.)

If `git fetch` fails (no remote, no network): set `state = "fetch_failed"`, `error = "<error>"` in the result record, skip Steps 4–6 for this project, and continue to the next project.

## Step 4 — Branch name check

1. Run `git rev-parse --abbrev-ref HEAD` to get the current branch name.
2. If the branch matches the pattern `release/vX.Y.Z` (starts with `release/v` followed by a version string):
   a. Read the project version from `cfg.version_files` (first file). If the project is unregistered or has no `version_files`, skip the rest of this step.
   b. Derive the expected branch name from `cfg.release_branch_pattern` (default: `release/{version}`).
   c. If the local branch name does not equal the expected name, warn:
      > "Branch `<local>` is stale — current version is `<version>`, expected `<expected>`. Run `/fsad-harness:ship` to rename it."
   d. Run `git ls-remote --heads origin <expected>` to check remote presence.
      - Not found: note "Expected branch `<expected>` has not been pushed to the remote yet."
      - Found and name is already correct: no action.
      - Command itself fails (network/auth error, timeout — distinct from a clean "not found"): note "Could not check remote for `<expected>` — <error>." and continue, the same way Step 3 handles a failed `git fetch`. Do not treat this as a stale-branch warning.
3. If the branch does not match `release/vX.Y.Z`: skip this step entirely.

## Step 4.5 — Worktree check

Reuse the branch name from Step 4.

1. If the branch name matches `worktree-task-*`, OR `project_root` is itself a path under `.claude/worktrees/`, set `is_worktree = true` and record the branch name as `worktree_branch`.
2. Otherwise `is_worktree = false`.

This flag only affects the summary annotation in Step 7 — it does not change fetch, branch-staleness, or ahead/behind logic.

## Step 5 — Check uncommitted changes

Run `git status --porcelain` from `project_root`.

If output is non-empty: list the dirty files, prefixed with "Uncommitted changes detected:", and set the result record's `dirty = true`. Otherwise `dirty = false`.

This step alone is informational only — do not stop here. But its `dirty` result is a **precondition input to Step 6's Behind-state pull action** below; do not discard it.

## Step 6 — Compare local vs remote

First confirm the branch has an upstream tracking ref:

```bash
git rev-parse --abbrev-ref --symbolic-full-name @{u}
```

- **Fails** (`fatal: no upstream configured for branch ...`): record state **No upstream** (`state = "no_upstream"`, `ahead = null`, `behind = null`) for this project and skip the rest of this step — do not run the `git rev-list` commands below, they will crash without an upstream ref. This is expected for local-only branches, e.g. a `worktree-task-*` branch created by `fsad-harness:do-task` that hasn't been merged/pushed yet.
- **Succeeds**: continue with the ahead/behind comparison:

```bash
git rev-list --count HEAD..@{u}   # commits behind remote
git rev-list --count @{u}..HEAD   # commits ahead of remote
```

| State | `state` value | behind | ahead | Action |
|-------|----------------|--------|-------|--------|
| **No upstream** | `no_upstream` | — | — | Report "No upstream branch — run `git push -u origin <branch>` to enable sync checks." |
| **Up-to-date** | `up_to_date` | 0 | 0 | Report "Repo is up to date with remote." |
| **Behind** | `behind` | > 0 | 0 | See **Behind-state action** below — do not pull unconditionally. |
| **Ahead** | `ahead` | 0 | > 0 | Report "Local is N commit(s) ahead of remote — ready to push." |
| **Diverged** | `diverged` | > 0 | > 0 | Warn: "Local and remote have diverged (N behind, M ahead). Manual resolution required — do not start work until resolved." Do NOT pull. Tell the user to run `git pull --rebase` or `git merge origin/<branch>`. |

Set `ahead`/`behind` in the result record from the `git rev-list` counts in all cases above.

### Behind-state action (dirty-tree precondition + post-pull re-verification)

When Step 6 finds `behind > 0` and `ahead == 0`, do not run `git pull` unconditionally. Instead:

1. **Precondition — check the dirty-tree result already computed in Step 5.**
   - If `dirty == true`: **skip the pull.** Set `pull_attempted = false`, `pull_succeeded = null`. Report:
     > "⚠ N commit(s) behind, but the working tree has uncommitted changes — skipping pull. Commit, stash, or discard your changes, then re-run fsad-harness:sync."
     Stop here for this project's Behind-state handling — do not run `git pull`.
   - If `dirty == false`: proceed to step 2.

2. **Attempt the pull.** Run `git pull`. Set `pull_attempted = true`.

3. **Post-pull re-verification.** Re-run the same comparison used in Step 6's initial detection:
   ```bash
   git rev-list --count HEAD..@{u}   # commits behind remote, re-checked
   ```
   - If the re-check returns `0`: the pull fully succeeded. Set `pull_succeeded = true`, `behind = 0`. Report:
     > "Pulled N commit(s). Repo is now up to date."
   - If the re-check returns `> 0` (partial pull, fast-forward failure, or any other git-level issue): the pull did **not** fully succeed. Set `pull_succeeded = false`, `behind = <re-checked count>`. Report:
     > "✗ Pull did not fully succeed — still N commit(s) behind after pull. Manual resolution required."
   - Never print the unconditional "now up to date" success message without this re-check confirming zero-behind.

## Step 7 — Print summary

Build every summary line **from the structured per-project result record** (defined in Step 2) — never reconstruct status text from memory of what happened during the run. Each record's `state` (plus `pull_attempted`/`pull_succeeded` for the Behind case) maps directly to one banner line:

| `state` | `pull_attempted` | `pull_succeeded` | Banner line |
|---------|------------------|-------------------|-------------|
| `fetch_failed` | — | — | `✗ Fetch failed — <error>` |
| `no_upstream` | — | — | `⚠ No upstream branch — run 'git push -u origin <branch>' to enable sync checks.` |
| `up_to_date` | — | — | `✓ Up to date — safe to start work.` |
| `behind` | `false` | `null` | `⚠ N commit(s) behind, but the working tree has uncommitted changes — skipping pull. Commit, stash, or discard your changes, then re-run fsad-harness:sync.` |
| `behind` | `true` | `true` | `✓ Pulled N commit(s) — repo now up to date.` |
| `behind` | `true` | `false` | `✗ Pull did not fully succeed — still N commit(s) behind after pull. Manual resolution required.` |
| `ahead` | — | — | `⚠ N commit(s) ahead — push when ready.` |
| `diverged` | — | — | `✗ Diverged — resolve before starting work.` |

**Single-project mode** — one banner line, e.g.:

```
[fsad-harness:sync] ✓ Up to date — safe to start work.
[fsad-harness:sync] ✓ Pulled 3 commit(s) — repo now up to date.
[fsad-harness:sync] ⚠ 2 commit(s) behind, but the working tree has uncommitted changes — skipping pull.
[fsad-harness:sync] ✗ Pull did not fully succeed — still 1 commit(s) behind after pull. Manual resolution required.
[fsad-harness:sync] ⚠ 2 commit(s) ahead — push when ready.
[fsad-harness:sync] ✗ Diverged — resolve before starting work.
[fsad-harness:sync] ⚠ No upstream branch — run 'git push -u origin <branch>' to enable sync checks.
```

Append `(uncommitted changes present)` if the record's `dirty` field is true.

If the record's `is_worktree` is true, append `(worktree: <worktree_branch> — main checkout unaffected)` so the user isn't confused about which checkout the status line describes.

**Multi-project mode** — summary table after all projects have been processed, one row per structured result record:

```
Project           Status
──────────────────────────────────────────────────────
api_service       ✓ Up to date
web_app           ✓ Pulled 2 commit(s) — now up to date
docs_site         ⚠ 2 commit(s) ahead — push when ready
cli_tool          ✗ Diverged — resolve before starting work
data_pipeline     ⚠ No upstream branch — push to enable sync checks
mobile_app        ⚠ Behind, uncommitted changes — skipping pull (uncommitted)
```

Append `(uncommitted)` after the status text for any record with `dirty == true`, and `(worktree: <worktree_branch>)` for any record with `is_worktree == true`.
