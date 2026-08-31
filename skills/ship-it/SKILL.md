---
allowed-tools: Bash(git worktree:*), Bash(git -C:*), Bash(git merge:*), Bash(git merge-base:*), Bash(git add:*), Bash(git commit:*), Bash(git branch:*), Bash(git mv:*), Bash(git rev-parse:*), Bash(git checkout:*), Bash(git push:*), Bash(git pull:*), Bash(git status:*), Bash(git log:*), Bash(git remote:*), Bash(git ls-remote:*), Bash(gh pr create:*), Bash(gh pr view:*), Bash(gh pr list:*)
description: Wrap up a finished round of work — verify README and CHANGELOG are current, cut a version if warranted, move completed task files into the completed/ folder, then create a feature branch if needed, commit, push, and open a PR. Run after `/fsad-harness:do-task` has marked one or more tasks done. Takes no arguments.
---

# fsad-harness:ship-it — wrap up and ship

You run four sequential phases to close out a batch of completed work: worktree merge (Step 0.5), pre-flight audits — README/CHANGELOG/version/completed-task cleanup (Step 1), commit + push + PR (Step 2), and verify-shipped (Step 3). Do not skip phases or reorder them.

"Shipped" means all three of the following verifiable predicates hold — not that a phase list was walked:

1. **Remote-HEAD parity** — the pushed branch's remote SHA (`git ls-remote`) equals local `HEAD`.
2. **PR existence** — `gh pr view` confirms a PR exists for this branch and targets the default branch.
3. **Version-string consistency** — every file in `cfg.version_files` carries the identical new version string (when a version was cut).

Step 3 (Verify shipped) checks all three explicitly before the skill reports success — see that step for details.

## Step 0 — Detect the project

1. Determine the current working directory.
2. Read `~/.claude/commands/fsd/projects.yaml`.
3. Match cwd against each project's `match_paths` (expand `~`). Prefer the longest (most specific) match if multiple match.
4. If a project matches, refer to its entry as `cfg` and the resolved project root as `project_root`. Proceed.
5. If **no project matches**:
   - Tell the user the project is not registered.
   - Suggest running `/fsad-harness:add-task` from the project to register it.
   - Stop.

## Step 0.5 — Merge pending worktrees

1. Run `git worktree list --porcelain` from `project_root`. Parse the output to get all worktrees (each block starts with `worktree <path>`).
2. Filter out the main worktree — the one whose path equals `project_root`.
3. If **no additional worktrees** exist: skip this step entirely and proceed to Step 1.
4. If additional worktrees exist:
   - List them for the user: path and branch name (the `branch` field from the porcelain output), plus each branch's uncommitted-changes status (`git -C <path> status --porcelain`, summarized as "clean" or "N uncommitted files").
   - **Stop and ask for explicit confirmation** before touching anything:
     > "About to merge {N} worktree branch(es) into `{project_root}`: {list}. For each: commit any uncommitted changes, `git merge --no-ff <branch>`, verify the merge landed, then force-remove the worktree and delete the branch. Proceed? (y/n)"
   - If the user declines: stop here. Do not modify or remove any worktree. Report which worktrees remain pending.
   - On confirmation, for each worktree in order:
     a. Check for uncommitted changes: `git -C <path> status --porcelain`. If any are present, commit them: `git -C <path> add -A && git -C <path> commit -m "<branch-name>: parallel do-task changes"`.
     b. Merge the branch into the main worktree: `git merge --no-ff <branch>`.
     c. If the merge produces a conflict: **stop immediately**. Tell the user which file(s) conflict and provide these resolution steps:
        1. Open each conflicting file and locate the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
        2. Edit the file to keep the correct content and remove all conflict markers.
        3. Stage each resolved file: `git add <file>`.
        4. Complete the merge commit: `git commit`.
        5. Re-run `fsad-harness:ship-it` to continue from where it left off.
        Do not proceed to Step 1. Do not remove the worktree — it may still hold the only copy of unmerged work.
     d. **Verify the merge landed before removing anything**: run `git merge-base --is-ancestor <branch> HEAD`. Exit code `0` means the branch tip is now reachable from `HEAD` — the merge is confirmed in the main tree.
        - If this check **fails** (non-zero exit): **stop immediately**. Do not remove the worktree or delete the branch — the merge did not land as expected and the worktree is the only safe copy of that work. Report the branch name and ask the user how to proceed.
        - If this check **passes**: only now remove the worktree (`git worktree remove --force <path>`) and delete the branch (`git branch -d <branch>`).
5. After all worktrees are merged, verified, and removed: tell the user "Worktrees merged." and proceed to Step 1.

## Step 1 — Pre-flight audits (run concurrently)

These three checks are read-only and independent of each other — none needs another's output. Dispatch them as concurrent subagents (or, if subagents aren't available in the current context, run the three read passes back-to-back with no dependency ordering between them) rather than sequentially:

- **Audit A — README ↔ skills-table consistency:** List all subdirectories in `{project_root}/skills/` (each is a skill). Read `{project_root}/README.md`. For every skill directory, check a corresponding row exists in the README skills table (match on directory name). Report any skills missing from the README.
- **Audit B — CHANGELOG/version derivation:** Read `{project_root}/CHANGELOG.md`. Find the `## [Unreleased]` section and collect everything between that heading and the next `## [` heading (the pending content). Read `cfg.version_scheme` and `cfg.version_files`; if set, read the first file in the list and extract the current version string (JSON `"version"` field, README version-table row, or HTML `<title>`). Report: pending CHANGELOG content (or "empty"), current version scheme, and current version string.
- **Audit C — completed-task cross-reference:** Scan `{project_root}/{cfg.task_dir}/` for files matching the task filename pattern (e.g. `task-proj-NNN.md`) not already inside `completed/`. For each, look up the corresponding identifier in `cfg.todo_file`: `- [x]` → candidate to move; `- [ ]` or not found → leave in place. Report the candidate list.

Once all three audits report back, apply their results serially (writes must stay serial even though the reads were concurrent):

### 1a — README check

- If Audit A found missing skills: tell the user which ones (e.g. `ship-it`, `next`). Ask them to update the README before continuing. Stop — do not proceed until the user confirms it's done and re-invokes.
- If clean: tell the user "README check passed." and proceed.

### 1b — CHANGELOG + version

1. If Audit B's pending content is **empty** (no bullets/subsections):
   - Tell the user: "The [Unreleased] section has no content — there may be nothing to release. Proceed anyway? (y/n)"
   - No → stop. Yes → skip the version-bump sub-steps and go to 1c.
2. If Audit B's pending content is **non-empty**:
   - Show the user the pending content.
   - **Propose next version** based on `cfg.version_scheme` (from Audit B):
     - `semver`: bump the **patch** component by default (e.g., `v3.2.0 → v3.2.1`). Tell the user they can type `minor` or `major` for a different bump level.
     - `integer`: increment the integer suffix by 1 (e.g., `v36 → v37`).
     - `calver`: use today's date in `YYYY.MM.DD` format.
     - **No `version_scheme` configured:** ask "Cut a new version? If yes, what tag? (e.g. v4)" and use whatever they provide.
   - **Confirm:** Present "Suggested version: **[tag]** — confirm, type a different tag, or type `no` to skip."
     - `no`/skip → proceed to 1c without modifying CHANGELOG or version files.
     - `minor`/`major` (semver only) → recompute at that level and re-present.
     - Confirmed/different tag → use that tag and continue.
   - **Write version files:** update every file in `cfg.version_files` with the new version string, preserving each file's existing format (JSON `"version"` field, README table row, HTML `<title>`).
   - **Update CHANGELOG:** replace `## [Unreleased]` with `## [vN] — YYYY-MM-DD` (today's date), insert a fresh empty `## [Unreleased]` block above it, write the file. Tell the user "CHANGELOG updated — [vN] cut."

### 1c — Move completed task files

- If Audit C found no candidates: tell the user "No completed task files to move." and proceed to Step 2.
- If candidates exist: tell the user "Moving these to `completed/`:" followed by the list, then `git mv` each file into `{project_root}/{cfg.task_dir}/completed/`.

## Step 2 — Commit, push, PR

### 2.0 — Branch guard

1. Run `git rev-parse --abbrev-ref HEAD` to get the current branch name.
2. If the branch is `main` or `master`:
   - Propose a feature branch name:
     - If a version was cut in Step 1: suggest `release/{version}` (e.g. `release/v4`).
     - Otherwise: suggest `task/{task-ids}` using any task IDs marked done during this session (e.g. `task/proj-007`), or `ship/{YYYY-MM-DD}` if no IDs are in scope.
   - Ask the user: "Create and switch to `{branch}`? (y/n or type a different name)"
   - On confirmation: run `git checkout -b {branch}`.
3. If already on a non-default branch:
   - Tell the user "Already on branch `{branch}`."
   - If a version was cut in Step 1 **and** the current branch matches the pattern `release/vX.Y.Z` **and** `vX.Y.Z` does not equal the newly cut version:
     - Propose renaming: "Branch name `{branch}` is stale — rename to `release/{version}`? (y/n)"
     - If yes:
       a. `git branch -m {branch} release/{version}` — rename locally.
       b. `git push origin release/{version}` — push the new name.
       c. `git push origin --delete {branch}` — delete the old remote branch (ignore error if it didn't exist remotely).
       d. `git branch -u origin/release/{version}` — update tracking ref.
       e. Tell the user "Branch renamed to `release/{version}`."
     - If no: continue on the current branch name.
   - Otherwise: continue without renaming.

### 2.1 — Independent pre-PR checklist verifier

Before committing, run one more fresh, independent read pass over the three Pre-PR Checklist items (README, CHANGELOG, version files — see `CLAUDE.md`'s Pre-PR Checklist section if present). This pass must **re-read the files from disk**, not reuse conclusions from Step 1 — the point is to catch a mistake the same pass that wrote them could have missed:

1. Re-read `{project_root}/CHANGELOG.md`: confirm the change has an entry either under `## [Unreleased]` or in a freshly cut version block.
2. Re-read `{project_root}/README.md`: confirm the version table's **Current version** and **Date** match what's being shipped (if a version was cut).
3. Re-read every file in `cfg.version_files`: confirm all carry the identical new version string (if a version was cut).
4. If any mismatch is found: report it to the user and stop — do not commit with a known Pre-PR Checklist violation. Ask whether to fix it now or abort.
5. If all three check out: tell the user "Pre-PR checklist verified independently." and proceed.

### 2.2 — Commit

1. Run `git status` to see what's staged and unstaged. Stage all relevant changed files by name (do **not** use `git add -A` or `git add .`):
   - Modified: `CHANGELOG.md`, `README.md`, todo file, any other files changed during this work session.
   - Moved task files (already staged by `git mv`).
2. Run `git log --oneline -5` to read recent commit message style.
3. Draft a commit message:
   - If a version was cut in Step 1: use `release [vN] — <one-line summary of what's in the release>`.
   - If no version was cut: summarize the batch of completed work in one line.
   - Append `Co-Authored-By:` with the **current model's** name and provider, derived at runtime from the executing session (e.g. the model identifying itself in this conversation) — never hardcode a specific model name/version in the skill file itself, since that goes stale every time the underlying model changes.
   - Pass via heredoc to avoid shell quoting issues.
4. Show the user the draft commit message and ask for confirmation before committing.
5. On confirmation: create the commit.

### 2.3 — Push, with verify-and-retry

1. Record the local HEAD SHA: `git rev-parse HEAD`.
2. Push: `git push -u origin HEAD`.
3. **Verify the push landed**: `git ls-remote origin {branch}` and compare the remote SHA to the local HEAD SHA from step 1.
   - **Match**: push confirmed, continue to 2.4.
   - **Mismatch or push failed**: retry, capped at 2–3 attempts:
     a. If the remote moved ahead (someone else pushed): `git pull --rebase` then re-push.
     b. If the push was simply rejected/failed transiently: re-push directly.
     c. After each retry, re-check `git ls-remote` against the (possibly updated) local HEAD.
   - If still mismatched after the retry cap: **stop and ask the user** how to proceed. Do not silently continue as if the push succeeded.

### 2.4 — Create PR, with verify-and-fallback

1. Detect the default branch: `git remote show origin | grep 'HEAD branch' | awk '{print $NF}'` (typically `main` or `master`).
2. Create PR with `gh pr create`:
   - Title: same one-liner used in the commit.
   - Include `--base {default_branch}` so the PR always targets the default branch.
   - Body (heredoc):
     ```
     ## Summary
     <CHANGELOG content for this version, or a bullet-list summary if no version was cut>

     ## Test plan
     - [ ] Skill files deployed and appear in `/fsad-harness:*` command list
     - [ ] README skills table is accurate
     - [ ] CHANGELOG entry is present and correctly formatted

     🤖 Generated with [Claude Code](https://claude.com/claude-code)
     ```
3. **Verify the PR actually exists** — do not trust `gh pr create`'s exit code alone: run `gh pr view --json url,state,baseRefName` for the current branch.
   - If it returns a PR with the expected base branch: confirmed. Record the URL.
   - If `gh pr create` reported failure because a PR already exists for this branch: run `gh pr list --head {branch} --json url,state,baseRefName` to find the existing PR and report it instead of treating this as an error.
   - If neither check turns up a PR: stop and tell the user PR creation could not be confirmed — do not report a PR URL that wasn't actually verified.
4. Proceed to Step 3 (Verify shipped) once the PR is confirmed.

## Step 3 — Verify shipped

Confirm the three "shipped" predicates from the top of this document, using fresh checks (not assumptions carried over from Step 2):

1. **Remote-HEAD parity**: `git ls-remote origin {branch}` — the returned SHA must equal `git rev-parse HEAD`. PASS/FAIL.
2. **PR existence**: `gh pr view --json url,state,baseRefName` — must return a PR targeting the default branch. PASS/FAIL.
3. **Version-string consistency** (only if a version was cut in Step 1): re-read every file in `cfg.version_files` and confirm they all carry the identical new version string. PASS/FAIL.

Report all three verdicts to the user. If any predicate fails, say so explicitly — do not report the work as "shipped" on a partial result. Only report success when all applicable predicates pass.
