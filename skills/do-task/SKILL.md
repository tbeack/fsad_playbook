---
description: Execute or plan a task in any of your local projects. Auto-detects the current project from the working directory, reads conventions from `~/.claude/commands/fsd/projects.yaml`, and either drafts a missing task plan (plan mode) or implements the existing one (execute mode). Always creates a task-detail file before executing — even for lightweight projects. Use when the user says "do CBP-087", "work on FSD-031", "execute task 12", or similar.
argument-hint: `<PREFIX-NNN | NNN> [PREFIX-NNN | NNN...]`
---

# fsd:do-task — multi-project task executor

You help the user make progress on a single task in any registered project. The skill is **mode-switching**:

- **Plan mode** — task entry exists in the todo file but no task-detail file exists yet. Draft the plan; stop.
- **Execute mode** — both the entry and the task file exist. Implement the plan, verify ACs, update CHANGELOG, mark complete.

A task-detail file is **always required** before executing — even for projects with `use_full_template: false`. Plan mode runs first, execute mode second.

## Step 0 — Detect the project

1. Determine the current working directory.
2. Read `~/.claude/commands/fsd/projects.yaml`.
3. Match cwd against each project's `match_paths` (expand `~`). Prefer the longest (most specific) match if multiple match.
4. If a project matches, refer to its entry as `cfg` and the resolved project root as `project_root`. Proceed.
5. If **no project matches**:
   - Tell the user the project is not registered.
   - Suggest running `/fsd:add-task` from the project to register it, or offer to register it now.
   - Stop.

## Step 0.5 — Multi-task dispatch

Split `$ARGUMENTS` on whitespace to get a list of tokens.

- If there is **only one token**: skip this step entirely. Continue to Step 1 with that single token as `$ARGUMENTS`.
- If there are **two or more tokens**:
  1. Tell the user: "Dispatching N tasks concurrently: TOKEN1, TOKEN2, …"
  2. Write an aggregate badge to the main project root so the statusline shows all dispatched IDs immediately. Use the absolute `project_root` path resolved in Step 0 (not the literal string, not a relative path) and quote it to handle spaces:
     ```
     echo "orange:TOKEN1+TOKEN2+…" > "{project_root}/.pmon-session-task"
     ```
  3. For each token, spawn one Agent using the `Agent` tool with `isolation: "worktree"` so each agent works on its own branch. Each agent's prompt must include:
     - The current working directory (project root).
     - The single task ID assigned to that agent.
     - The full instruction to run the complete `fsd:do-task` flow for that ID — entering plan mode if no task-detail file exists yet, or execute mode if it does. The agent must follow all steps (Step 0 through the relevant terminal step) exactly as this skill describes, operating on its one assigned ID only.
     - An explicit note: **do NOT write or delete `.pmon-session-task`** — badge ownership belongs to the orchestrator.
  4. Send **all Agent calls in a single message** so they run concurrently.
  5. After all agents return, print a summary table:
     ```
     TBS-012   plan mode    task file written — changes isolated in worktree branch
     TBS-013   execute mode  ACs verified, CHANGELOG updated, marked complete — changes isolated in worktree branch
     ```
     Then remove the badge file and tell the user: "Each agent's changes are in an isolated worktree branch. Run `fsd:ship-it` to merge them sequentially into your working tree before committing."
     ```
     rm -f "{project_root}/.pmon-session-task"
     ```
  6. **Stop here.** Do not continue to Step 1.

## Step 1 — Resolve the task identifier

Read `$ARGUMENTS` and normalize to canonical form `PREFIX-NNN`:

| Input | Canonical (CBP project) |
|-------|-------------------------|
| `CBP-087` | `CBP-087` |
| `cbp-87`  | `CBP-087` |
| `087`     | `CBP-087` |
| `87`      | `CBP-087` |

Rules:
- Prefix: `cfg.prefix` (preserve exact casing — e.g., `FSD_Train`, `KHB-Todo`).
- Number: zero-pad to `cfg.number_digits` digits.
- If `$ARGUMENTS` is empty, ask: `"Which [cfg.prefix] task? (e.g., [cfg.prefix]-001)"`

Do not guess. Do not pick "the next open one" without being asked.

## Step 2 — Verify the task exists in the tracker

Read `cfg.todo_file` (resolved relative to `project_root`). Find the line containing the canonical identifier.

- **Not found** — Tell the user the task isn't in the tracker. Suggest `/fsd:add-task [title]` to create it first. Stop.
- **Already checked (`- [x]`)** — Tell the user it's already marked complete. Ask whether to re-execute (rare). Default: stop.
- **Open (`- [ ]`)** — Continue.

## Step 3 — Branch on whether the task file exists

Resolve the task file path using the same token substitution as `add-task`:
- `{nnn}` = zero-padded number
- `{prefix_lower}` = `cfg.prefix_in_filename` if set, else `cfg.prefix` lowercased
- `{ID}` = canonical identifier
- `{slug}` = title lowercased, non-alphanumerics → `_`, collapsed, trimmed (only needed if template uses it)

```
{project_root}/{cfg.task_dir}/{rendered cfg.task_filename_template}
```

- **File missing** → go to Step 4 (Plan mode).
- **File exists** → read it end-to-end. If it has no `## Plan` section or no `## Acceptance Criteria`, treat it as incomplete and ask the user to confirm before overwriting. Otherwise, go to Step 5 (Execute mode).

State the mode before continuing: "Task file missing — entering plan mode." or "Task file found — entering execute mode."

## Step 4 — Plan mode: draft the workup

Ask questions **one at a time** (never dump a form):

1. **Source** — Where did this task come from? (skip if not applicable)
2. **Summary** — What needs to change and why? 1–3 sentences.
3. **Assessment** — Current state? Where does the relevant code/content live? Inspect the repo before asking — don't ask things you could verify yourself.
4. **Plan** — Step-by-step implementation. File paths and line numbers where possible. Group into phases if non-trivial.
5. **Acceptance Criteria** — `- [ ]` checkboxes. Falsifiable ("button renders at 44px touch target on mobile"), not vague ("looks right").

If the user says "use your best judgment" or "fill it in", proceed without blocking — infer from the title and project context.

Write the task file at the resolved path:

```markdown
# {ID} — {title}

## Source
[Where this came from — or omit this section if not applicable]

## Summary
[1–3 sentences: what's changing and why]

## Assessment
[Current state. Does it exist? Where? What needs to change?]

**Location:** `[file path]` — [section/line reference]

## Plan

1. [Step one]
2. [Step two]

## Acceptance Criteria
- [ ] [Verification step 1]
- [ ] [Verification step 2]
```

Then update the todo entry to link the new task file. Match the existing linked-entry style in `cfg.todo_file` (em-dash, backtick-wrapped identifier, parenthesized link). Use `Edit` with unique surrounding context. Do not rewrite the whole file.

If `cfg.notes` mentions style cues (e.g. "reference task-cbp-030.md"), peek at that file first and match its tone.

**Stop here.** Tell the user the plan is ready and that they can re-invoke `/fsd:do-task {ID}` to execute it. Do **not** start implementing.

## Step 5 — Execute mode: implement the plan

### 5a. Review critically before touching anything

Read the task file end-to-end. Identify concerns — ambiguous steps, missing context, factual claims about the codebase that no longer hold (file paths moved, exports renamed, etc.). Raise anything unclear before starting. Do not guess.

### 5b. Build a working task list

Before creating any tasks, write the session badge so the task-id appears as an orange badge in the Claude Code statusline. Use the absolute `project_root` path resolved in Step 0 — not the literal string `{project_root}` and not a relative path. Quote the path to handle directory names with spaces:

```bash
echo "orange:{taskId}" > "{project_root}/.pmon-session-task"
```

Then use `TaskCreate` to add one task per phase or major step in the plan. Mark each `in_progress` before starting and `completed` when done — don't batch.

At step 5i (hand off), clean up the tag file using the same absolute path:

```bash
rm -f "{project_root}/.pmon-session-task"
```

### 5c. Sync and create worktree

Before touching any files, ensure the branch is up to date and create an isolated worktree:

1. **Sync check** — run `git fetch origin` then `git status -uno` to determine the local branch's state relative to the remote:
   - **Up to date or ahead** — proceed.
   - **Behind** — run `git pull --ff-only`. If the pull fails (uncommitted changes, non-fast-forward), stop and ask the user to resolve before continuing.
   - **Diverged** — stop. Warn the user and do not create the worktree.

2. **Create worktree** — call `EnterWorktree` with `name` set to the task ID slugified (e.g., `task-tbs-024`). This creates a new branch (`worktree-task-tbs-024`) inside `.claude/worktrees/` and switches the session into it. All file writes from this point forward happen inside the worktree — not in the main working tree.

Note the worktree branch name; report it in the handoff (Step 5i).

### 5d. Implement the plan steps

Follow the plan's steps in order. If the plan turns out to be wrong, **stop and re-plan with the user** rather than silently deviating. Authorization stands for the scope specified, not beyond.

### 5e. Verify acceptance criteria one-by-one

Walk through every AC in the task file and prove it with evidence (file location, output, browser inspection, etc.). Print a verdict per AC: PASS with evidence, or FAIL with what broke.

As each AC passes, edit the task file to flip `- [ ]` to `- [x]`. **Mark progressively** — a partial failure leaves an honest record.

Use enough surrounding AC text in `old_string` to make `Edit` matches unambiguous. For ≥3 ACs verified together at the end of a phase, replacing the entire AC block in one `Edit` is acceptable — provided you proved each individually.

When all ACs are `[x]`, add a note immediately above the AC list:
```
All criteria verified YYYY-MM-DD before commit.
```

If any AC fails, stop and report. Never edit AC text to make it pass.

### 5f. Optional code review

All ACs have passed. Ask the user exactly once:

> "All acceptance criteria passed. Would you like to run `/fsd:code-review-team` on this diff before wrapping up?"

- **Yes** — Invoke the `fsd:code-review-team` skill (via `Skill` tool). Wait for it to complete. The skill writes `REVIEW-REPORT.md`; note any critical findings in the handoff message. Then continue to 5g.
- **No / no response** — Skip directly to 5g. Do not run the review.

Do not run the review without explicit user confirmation.

### 5g. Update CHANGELOG and version

**Locate the CHANGELOG:**
1. Check `cfg.changelog_file` in the YAML (if set, resolve relative to `project_root`). Otherwise look for `CHANGELOG.md` at `project_root`.
2. If no CHANGELOG exists, **create `{project_root}/CHANGELOG.md`** using Keep-a-Changelog format with an `## [Unreleased]` header and `### Added` / `### Changed` / `### Fixed` subsections.

**Detect the versioning scheme:**
1. Check `cfg.version_files` in the YAML (if set) — these are the authoritative version locations, relative to `project_root`.
2. If not set, scan `project_root` for common version carriers: `package.json` (`.version`), `plugin.json` / `plugin/.claude-plugin/plugin.json` (`.version`), `*.html` (version string in `<title>`), `README.md` (version badge or header line).
3. If a scheme is found but not configured in the YAML, show the user what you found and ask for confirmation before bumping.
4. If **no versioning is in use**, propose a scheme before writing anything. Default recommendation: **semver (`v1.0.0`)** for software; **CalVer (`YYYY.MM.DD`)** for documentation-only projects. Explain the tradeoff (semver = intent-driven, CalVer = timeline-driven) and ask the user to choose.

**Write the CHANGELOG entry:**
- If the task plan specifies CHANGELOG content, write it exactly as specified.
- If not, propose a one-paragraph entry (placed above the most recent version block) and wait for user approval before writing.
- Match the existing format in the file. For projects using integer versioning (e.g. `v36`), continue that pattern.

**Bump the version:**
- Only bump when the task plan explicitly calls for it.
- When bumping, update every file identified by `cfg.version_files` (or the scan). Keep all sources aligned — never leave one file on the old version.
- Apply the project's bump type (patch/minor/major for semver; integer increment for vNN; new date for CalVer) as specified in the plan or by the user.
- If the plan does not call for a version bump, skip it and note that in the handoff message.

### 5h. Mark the task complete in the todo file

> **Write directly to the main working tree.** Use the absolute path `{project_root}/{cfg.todo_file}` — not a relative path. The CWD is the worktree; a relative path would write to the worktree copy and create a merge conflict at ship time. The `[x]` mark is intentionally committed from main, not included in the worktree branch.

Change the entry's `- [ ]` to `- [x]` at `{project_root}/{cfg.todo_file}`. Use `Edit` with unique surrounding context. Do not reorder lines or touch other entries.

### 5i. Hand off — do not auto-commit

Call `ExitWorktree` with `action: "keep"` to return the session to the original working directory while leaving the worktree branch intact on disk.

Open the handoff message with a bold header on its own line:

```
**{ID} — {title}**
```

Then provide a concise summary covering: what was implemented, which ACs were verified, which files changed, whether the CHANGELOG was updated, whether the todo entry was marked done, whether a version was bumped (or why it was skipped), whether the code review was run (e.g., "Code review report written to `REVIEW-REPORT.md`") or skipped. Include the worktree branch name (e.g., `worktree-task-tbs-024`) and tell the user their changes are isolated on that branch. Suggest running `fsd:ship-it` (or `git merge <branch>`) to bring the changes into the main branch before pushing. **Wait for the user to say "commit"** before doing so.

## Conventions to honour

- **Identifier format:** always canonical `PREFIX-NNN` (zero-padded, exact prefix casing) in messages, file names, and edits.
- **Task file location:** `{project_root}/{cfg.task_dir}/{cfg.task_filename_template}` — even for lightweight projects.
- **Heading separator:** em-dash (`—`), not hyphen.
- **AC checkbox style:** `- [ ]` / `- [x]`.
- **One question at a time** in plan mode.
- **Trust `cfg.notes`** — if it calls out style cues, honour them.

## Guardrails

- **Always read the todo file first** — never infer task state from memory.
- **Always create a task file before executing** — plan mode first, execute mode second; no exceptions for lightweight projects.
- **Don't switch tasks mid-flow** — re-invoke with the new identifier if the user changes their mind.
- **Plan mode never writes code** — only the task file and the todo link update.
- **Execute mode never edits the plan to match the implementation** — if reality drifts, stop and re-plan.
- **Never mark an AC complete without evidence.**
- **Mark ACs progressively, not in a batch.**
- **Don't propose CHANGELOG content not anticipated by the plan without asking.** Surprise changelog churn is hard to undo.
- **Don't bump versions opportunistically** — only when the plan explicitly calls for it. When bumping, keep all version sources aligned.
- **Don't auto-commit or push.** The user owns the release decision.
- **Don't run destructive git operations** at any point.
- **Always enter a worktree in single-task execute mode** — call `EnterWorktree` in Step 5c before any file modifications. Never modify the main working tree directly during execution.
