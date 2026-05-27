---
description: Wrap up a finished round of work — verify README and CHANGELOG are current, cut a version if warranted, move completed task files into the completed/ folder, then create a feature branch if needed, commit, push, and open a PR. Run after `/fsd:do-task` has marked one or more tasks done. Takes no arguments.
---

# fsd:ship-it — wrap up and ship

You run four sequential phases to close out a batch of completed work: README check, CHANGELOG versioning, completed-task file cleanup, and commit + push + PR. Do not skip phases or reorder them.

## Step 0 — Detect the project

1. Determine the current working directory.
2. Read `~/.claude/commands/fsd/projects.yaml`.
3. Match cwd against each project's `match_paths` (expand `~`). Prefer the longest (most specific) match if multiple match.
4. If a project matches, refer to its entry as `cfg` and the resolved project root as `project_root`. Proceed.
5. If **no project matches**:
   - Tell the user the project is not registered.
   - Suggest running `/fsd:add-task` from the project to register it.
   - Stop.

## Step 0.5 — Merge pending worktrees

1. Run `git worktree list --porcelain` from `project_root`. Parse the output to get all worktrees (each block starts with `worktree <path>`).
2. Filter out the main worktree — the one whose path equals `project_root`.
3. If **no additional worktrees** exist: skip this step entirely and proceed to Step 1.
4. If additional worktrees exist:
   - List them for the user: path and branch name (the `branch` field from the porcelain output).
   - Ask: "Merge these worktree branches sequentially into the main worktree? (y/n)"
   - If **no**: leave them in place and proceed to Step 1.
   - If **yes**: for each worktree in order:
     a. Check for uncommitted changes: `git -C <path> status --porcelain`. If any are present, commit them: `git -C <path> add -A && git -C <path> commit -m "<branch-name>: parallel do-task changes"`.
     b. Merge the branch into the main worktree: `git merge --no-ff <branch>`.
     c. If the merge produces a conflict: **stop immediately**. Tell the user which file(s) conflict. Ask them to resolve the conflicts and run `git commit` before re-running `fsd:ship-it`. Do not proceed to Step 1.
     d. On clean merge: remove the worktree (`git worktree remove --force <path>`) and delete the branch (`git branch -d <branch>`).
5. After all worktrees are merged and removed: tell the user "Worktrees merged." and proceed to Step 1.

## Step 1 — Pre-flight: README check

1. List all subdirectories in `{project_root}/skills/`. Each directory name is a skill.
2. Read `{project_root}/README.md`.
3. For every skill directory, check that a corresponding row exists in the README skills table (match on the directory name).
4. If any skill is **missing** from the README:
   - Tell the user which skills are absent (e.g. `ship-it`, `next`).
   - Ask them to update the README before continuing.
   - Stop. Do not proceed to Step 2 until the user says it's done and re-invokes.
5. If the README is current: tell the user "README check passed." and proceed.

## Step 2 — Pre-flight: CHANGELOG + version

1. Read `{project_root}/CHANGELOG.md`.
2. Find the `## [Unreleased]` section. Collect everything between that heading and the next `## [` heading — that is the pending content.
3. If the `[Unreleased]` section is **empty** (no bullet points or subsections):
   - Tell the user: "The [Unreleased] section has no content — there may be nothing to release. Proceed anyway? (y/n)"
   - If the user says no: stop.
   - If the user says yes: skip the version-bump sub-steps and go to Step 3.
4. If the `[Unreleased]` section **has content**:
   - Show the user the pending content.
   - **2a — Read version config:** Read `cfg.version_scheme` and `cfg.version_files` from the project config (loaded in Step 0).
   - **2b — Derive current version:** If `cfg.version_files` is set, read the first file in the list and extract the current version string:
     - JSON file (e.g., `package.json`, `plugin.json`): read the `"version"` field.
     - `README.md`: find the version table row (e.g., `| **Current version** | v3.2.0 |`).
     - HTML file: find the version string in the `<title>` tag.
   - **2c — Propose next version** based on `cfg.version_scheme`:
     - `semver`: parse the current version and bump the **patch** component by default (e.g., `v3.2.0 → v3.2.1`). Tell the user they can type `minor` or `major` to request a different bump level instead.
     - `integer`: increment the integer suffix by 1 (e.g., `v36 → v37`).
     - `calver`: use today's date in `YYYY.MM.DD` format.
     - **No `version_scheme` configured:** ask the user: "Cut a new version? If yes, what tag? (e.g. v4)" and use whatever they provide.
   - **2d — Confirm:** Present: "Suggested version: **[tag]** — confirm, type a different tag, or type `no` to skip."
     - If the user says `no` or skips: proceed to Step 3 without modifying the CHANGELOG or version files.
     - If the user says `minor` or `major` (semver only): recompute the tag at that level and re-present 2d.
     - If the user confirms or provides a different tag: use that tag and continue.
   - **2e — Write version files:** Update every file in `cfg.version_files` with the new version string, preserving the format already in each file:
     - JSON: update the `"version"` field value in-place (string replacement, preserve surrounding formatting).
     - `README.md` version table: replace the old version string in the table row only.
     - HTML `<title>`: replace the old version string in the title tag only.
   - **2f — Update CHANGELOG:**
     - Replace the `## [Unreleased]` heading with `## [vN] — YYYY-MM-DD` using today's date.
     - Insert a fresh empty `## [Unreleased]` block above it so future entries have a home.
     - Write the updated file.
     - Tell the user: "CHANGELOG updated — [vN] cut."

## Step 3 — Move completed task files

1. Scan `{project_root}/{cfg.task_dir}/` for files matching the task filename pattern (e.g. `task-tbs-NNN.md`) that are **not** already inside the `completed/` subdirectory.
2. For each file found, look up the corresponding task identifier in `cfg.todo_file`.
   - If the entry is `- [x]` (done): mark the file as a candidate to move.
   - If the entry is `- [ ]` (still open) or not found: leave the file in place.
3. If **no candidates** exist: tell the user "No completed task files to move." and skip to Step 4.
4. If candidates exist:
   - List them for the user.
   - Ask: "Move these to `completed/`? (y/n)"
   - If yes: `git mv` each file into `{project_root}/{cfg.task_dir}/completed/`.
   - If no: leave them and proceed.

## Step 4 — Commit, push, PR

### 4.0 — Branch guard

1. Run `git rev-parse --abbrev-ref HEAD` to get the current branch name.
2. If the branch is `main` or `master`:
   - Propose a feature branch name:
     - If a version was cut in Step 2: suggest `release/{version}` (e.g. `release/v4`).
     - Otherwise: suggest `task/{task-ids}` using any task IDs marked done during this session (e.g. `task/tbs-007`), or `ship/{YYYY-MM-DD}` if no IDs are in scope.
   - Ask the user: "Create and switch to `{branch}`? (y/n or type a different name)"
   - On confirmation: run `git checkout -b {branch}`.
3. If already on a non-default branch:
   - Tell the user "Already on branch `{branch}`."
   - If a version was cut in Step 2 **and** the current branch matches the pattern `release/vX.Y.Z` **and** `vX.Y.Z` does not equal the newly cut version:
     - Propose renaming: "Branch name `{branch}` is stale — rename to `release/{version}`? (y/n)"
     - If yes:
       a. `git branch -m {branch} release/{version}` — rename locally.
       b. `git push origin release/{version}` — push the new name.
       c. `git push origin --delete {branch}` — delete the old remote branch (ignore error if it didn't exist remotely).
       d. `git branch -u origin/release/{version}` — update tracking ref.
       e. Tell the user "Branch renamed to `release/{version}`."
     - If no: continue on the current branch name.
   - Otherwise: continue without renaming.

1. Run `git status` to see what's staged and unstaged. Stage all relevant changed files by name (do **not** use `git add -A` or `git add .`):
   - Modified: `CHANGELOG.md`, `README.md`, todo file, any other files changed during this work session.
   - Moved task files (already staged by `git mv`).
2. Run `git log --oneline -5` to read recent commit message style.
3. Draft a commit message:
   - If a version was cut in Step 2: use `release [vN] — <one-line summary of what's in the release>`.
   - If no version was cut: summarize the batch of completed work in one line.
   - Append: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
   - Pass via heredoc to avoid shell quoting issues.
4. Show the user the draft commit message and ask for confirmation before committing.
5. On confirmation: create the commit.
6. Push: `git push -u origin HEAD`.
7. Create PR with `gh pr create`:
   - Detect the default branch: `git remote show origin | grep 'HEAD branch' | awk '{print $NF}'` (typically `main` or `master`).
   - Title: same one-liner used in the commit.
   - Include `--base {default_branch}` so the PR always targets the default branch.
   - Body (heredoc):
     ```
     ## Summary
     <CHANGELOG content for this version, or a bullet-list summary if no version was cut>

     ## Test plan
     - [ ] Skill files deployed and appear in `/fsd:*` command list
     - [ ] README skills table is accurate
     - [ ] CHANGELOG entry is present and correctly formatted

     🤖 Generated with [Claude Code](https://claude.com/claude-code)
     ```
8. Return the PR URL to the user.
