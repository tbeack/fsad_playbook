---
description: Execute or plan a task in any of your local projects. Auto-detects the current project from the working directory, reads conventions from `${CLAUDE_PLUGIN_ROOT}/skills/add-task/add-task-projects.yaml`, and either drafts a missing task plan (plan mode) or implements the existing one (execute mode). Always creates a task-detail file before executing — even for lightweight projects. Use when the user says "do CBP-087", "work on FSD-031", "execute task 12", or similar.
argument-hint: '`<PREFIX-NNN | NNN> [PREFIX-NNN | NNN...]`'
---

# fsad-harness:do-task — multi-project task executor

You help the user make progress on a single task in any registered project. The skill is **mode-switching**:

- **Plan mode** — task entry exists in the todo file but no task-detail file exists yet. Draft the plan; stop.
- **Execute mode** — both the entry and the task file exist. Implement the plan, verify ACs, update CHANGELOG, mark complete.

A task-detail file is **always required** before executing — even for projects with `use_full_template: false`. Plan mode runs first, execute mode second.

## Asking the user

This rule covers every question this skill asks the user: a confirmation, a choice, a missing value, a numbered decision list, or a stop-and-ask. It applies even where a later step says "ask the user" or "ask exactly once". The user may watch the decisions pane rather than the chat, so a question that only goes to chat can go unanswered.

- **When `mcp__decision-tracker__decision` is in your tool list** (loaded, or named as a deferred tool; load a deferred one with `ToolSearch` first), log each question before you ask it:
  1. Call it with `action: "open"`, the question (ending in `?`), and `options` when the answers are a closed set. Set `required: false` when the work can go on without an answer. A numbered list of questions opens one decision per item. Keep each returned `id`.
  2. Ask the question in chat as this skill says. The open call does not replace the chat question.
  3. When the user answers, in chat or as a `Decision Dn: <answer>` message from the plugin, call the tool with `action: "close"`, the `id` and the answer.
  4. When the change the answer asked for is in place, call it with `action: "implement"`, the `id` and a `path:line`.
- **When the tool is absent**, ask in chat only.
- An `AskUserQuestion` call is logged on its own. Do not open it again.
- This rule changes where a question is logged. It does not change when this skill asks, or how many times.

## Step 0 — Detect the project

1. Determine the current working directory.
2. Read `${CLAUDE_PLUGIN_ROOT}/skills/add-task/add-task-projects.yaml`.
3. Match cwd against each project's `match_paths` (expand `~`). Prefer the longest (most specific) match if multiple match.
4. If a project matches, refer to its entry as `cfg` and the resolved project root as `project_root`. Proceed.
5. If **no project matches** in `add-task-projects.yaml`:
   - Tell the user the project is not registered.
   - Suggest running `/fsad-harness:add-task` from the project to register it, or offer to register it now.
   - Stop.

## Step 0.4 — Skill routing

Resolve which skill should actually execute this task for `cfg`'s project:

1. `desired_skill` = `cfg.skills.do_task` (if set) → else the YAML's top-level `defaults.skills.do_task` (if set) → else `"fsad-harness:do-task"`.
2. If `desired_skill` differs from `"fsad-harness:do-task"`: invoke the `Skill` tool with that skill name, passing `$ARGUMENTS` unchanged, and **stop** — none of this skill's remaining steps run in this invocation.
3. Otherwise continue to Step 0.5.

## Step 0.5 — Multi-task dispatch

Split `$ARGUMENTS` on whitespace to get a list of tokens.

- If there is **only one token**: skip this step entirely. Continue to Step 1 with that single token as `$ARGUMENTS`.
- If there are **two or more tokens**:
  1. Tell the user: "Dispatching N tasks concurrently: TOKEN1, TOKEN2, …"
  2. For each token, spawn one Agent using the `Agent` tool with `isolation: "worktree"` so each agent works on its own branch. Each agent's prompt must include:
     - The current working directory (project root).
     - The single task ID assigned to that agent.
     - The full instruction to run the complete `fsad-harness:do-task` flow for that ID — entering plan mode if no task-detail file exists yet, or execute mode if it does. The agent must follow all steps (Step 0 through the relevant terminal step) exactly as this skill describes, operating on its one assigned ID only.
     - An explicit note: **do NOT edit `{project_root}/{cfg.todo_file}` yourself** — completing agents must not write the shared main-tree todo file concurrently with siblings. Instead, return `todo_marked: false` in the structured result below and let the orchestrator batch the edit after every agent has returned.
     - The exact structured-return contract (below) — the agent's final message must be only this structure, not free text.
  3. Send **all Agent calls in a single message** so they run concurrently.
  4. **Structured per-agent return.** Each agent must return exactly:
     ```
     {id, mode, acs_passed, acs_total, files_changed[], blocked_reason?, todo_marked: false}
     ```
     - `id`: the task ID it was assigned.
     - `mode`: `"plan"` or `"execute"`.
     - `acs_passed` / `acs_total`: AC counts (0/0 in plan mode).
     - `files_changed[]`: list of file paths touched.
     - `blocked_reason`: present only if the agent stopped short (ambiguous plan, sync conflict, refuted AC after repair attempts, etc.) — its absence is not proof of success; check `acs_passed == acs_total` for execute mode too.
     - `todo_marked`: always `false` — agents never mark the todo file; this field exists so the orchestrator has one consistent shape to batch off of.

     A free-text summary in place of this structure counts as a failed/ambiguous return — treat it as `blocked_reason: "non-structured return"` and surface it to the user rather than assuming success.
  5. **Batch the todo.md edit orchestrator-side.** After all agents return, for every result with `mode: "execute"` and `blocked_reason` absent and `acs_passed == acs_total`, mark that task's entry `- [x]` in `{project_root}/{cfg.todo_file}`. Apply all such edits sequentially, one `Edit` call per entry, in the main tree (not any worktree) — never let a sub-agent perform this write, and never batch-write a single edit that touches multiple entries' surrounding context at once (keep each `Edit` scoped to its own entry so a bad match on one task can't corrupt another). Tasks that returned a `blocked_reason` or partial ACs stay unmarked.
  6. After the todo.md batch, print a summary table:
     ```
     TBS-012   plan mode    task file written — changes isolated in worktree branch
     TBS-013   execute mode  4/4 ACs verified, CHANGELOG updated, todo.md marked — changes isolated in worktree branch
     TBS-014   execute mode  2/3 ACs verified, blocked: refuted AC after 2 repair attempts — todo.md NOT marked
     ```
     Then tell the user: "Each agent's changes are in an isolated worktree branch. Run `fsad-harness:ship-it` to merge them sequentially into your working tree before committing."
  7. **Stop here.** Do not continue to Step 1.

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

Do **not** read the full todo file. Run a targeted grep to find the single line containing the canonical identifier:
```bash
grep "{ID}" "{todo_file_path}"
```
Use the resolved absolute path for `{todo_file_path}` and quote it to handle spaces.

- **Not found** — Tell the user the task isn't in the tracker. Suggest `/fsad-harness:add-task [title]` to create it first. Stop.
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

**Stop here.** Tell the user the plan is ready and that they can re-invoke `/fsad-harness:do-task {ID}` to execute it. Do **not** start implementing.

## Step 5 — Execute mode: implement the plan

### 5a. Review critically before touching anything

Read the task file end-to-end. Identify concerns — ambiguous steps, missing context, factual claims about the codebase that no longer hold (file paths moved, exports renamed, etc.).

**Delegate the codebase survey to one read-only subagent.** Spawn a single `Agent` with `tools: VERIFIER_TOOLS` (the allowlist defined at the top of Step 5e) and give it the task file's Summary/Assessment/Plan sections. Its return is limited to exactly three things, nothing else:
1. **Files to modify** — the paths the plan names, with the current line ranges the plan's references resolve to (or "moved/missing" where a reference no longer holds).
2. **Conventions in those files** — naming, formatting, section ordering, test and deploy patterns the change must match.
3. **Overlapping sibling tasks** — open entries in `{cfg.todo_file}` whose scope touches the same files or steps.

No implementation, no proposals, no opinions on the plan — the survey supplies facts for the decision list below.

**Present every blocking decision as one numbered list, once.** Combine your own concerns with the survey's findings and put every blocking ambiguity into a single numbered list in one message. Log each item through `## Asking the user`, then wait for the user's answers **once**. After that, do not stop to ask clarifying questions during Steps 5d–5e — the only permitted mid-run pause is an `UNCLEAR` AC stop-and-ask (Step 5e.4). A genuinely blocking item you are tempted to guess on belongs on the list; a non-blocking preference does not. If the list is empty, say "No blocking ambiguities" and continue.

### 5a.5. Estimate token cost

After reviewing the task file, compute a rough token estimate to decide whether the plan fits in a single-agent execution pass.

**Count from the task file:**
- `N_steps` = numbered items in `## Plan`
- `N_files` = distinct file paths mentioned anywhere (quoted paths like `` `foo/bar.ts` ``)
- `N_acs` = `- [ ]` checkbox items in `## Acceptance Criteria`
- `has_exploration` = `true` if any plan step contains the words "research", "explore", "investigate", "audit", or "survey"

**Formula:**

```
estimated_tokens = 8000 + (N_steps × 3000) + (N_files × 2000) + (N_acs × 500) + (has_exploration ? 15000 : 0)
```

**Threshold:** `LIMIT = 130000` (65% of the 200 000-token context window)

Announce the estimate: `"Token estimate: ~{estimated_tokens} ({pct}% of context limit)."`

- **Below threshold** (`estimated_tokens < LIMIT`) — continue to Step 5b as normal.
- **At or above threshold** (`estimated_tokens >= LIMIT`) — announce that chunking will be used, then go to Step 5a.6 instead of Step 5b.

### 5a.6. Split plan into chunks (threshold exceeded only)

This step runs only when Step 5a.5 finds `estimated_tokens >= LIMIT`. The worktree is created by Step 5c — run Step 5c first (sync + `EnterWorktree`), then return here to spawn chunk agents that write their files into that worktree.

**Chunk count:**

```
N_chunks = min(5, max(2, ceil(estimated_tokens / LIMIT)))
```

**Divide plan steps** into `N_chunks` roughly equal slices. Prefer natural phase or heading boundaries if the plan uses them. Each slice gets a step range, e.g. "steps 1–8" and "steps 9–15".

**Spawn chunk agents sequentially** (wait for chunk N to return before starting N+1, since each chunk's output may be input to the next):

For each chunk, build the agent prompt as follows:

> You are implementing part of task `{ID}` in the worktree at `{worktree_path}`. All file writes must go to that path.
>
> **Full task file:**
> ```
> {full task file contents}
> ```
>
> **Your scope:** Implement **ONLY steps {start}–{end}** from the `## Plan` section above. Steps before {start} are already complete; steps after {end} belong to a later chunk — do not implement them.
>
> **Do NOT:** verify acceptance criteria, update CHANGELOG.md, or mark the task complete in the todo file. The orchestrator handles all of that after every chunk finishes.
>
> Return a brief summary of the files you changed.

**After all chunk agents return**, resume the main flow at **Step 5e** (verify ACs). Continue normally through 5f → 5g → 5h → 5i.

### 5b. Build a working task list

Use `TaskCreate` to add one task per phase or major step in the plan. Mark each `in_progress` before starting and `completed` when done — don't batch.

### 5c. Sync and create worktree

Before touching any files, ensure the branch is up to date and create an isolated worktree:

1. **Sync check** — run `git fetch origin` then `git status -uno` to determine the local branch's state relative to the remote:
   - **Up to date or ahead** — proceed.
   - **Behind** — run `git pull --ff-only`. If the pull fails (uncommitted changes, non-fast-forward), stop and ask the user to resolve before continuing.
   - **Diverged** — stop. Warn the user and do not create the worktree.

2. **Carry-over check (before `EnterWorktree`)** — run `git status --porcelain` in the main tree and look for two things: `{cfg.todo_file}` listed as modified (the todo bullet that links this task), and the task-detail file `{project_root}/{cfg.task_dir}/{rendered template}` listed as untracked (`??`) or modified. Record the absolute main-tree path of each hit — the worktree branch is cut from the last commit, so **uncommitted edits and untracked files do not exist inside the worktree**. State which rule applies to each kind of edit for the rest of this run:
   - **New files (the task-detail file, anything else the plan creates):** written inside the worktree and merged at ship time. If the task-detail file is untracked in the main tree, copy it into the worktree with Bash immediately after `EnterWorktree` (`cp "{main-tree path}" "{worktree path}"`) so the worktree has a copy to receive AC flips and the 5e.5 timestamp.
   - **The shared `todo.md` (`{cfg.todo_file}`):** never edited inside the worktree — the worktree copy would diverge from main and conflict at ship time. Every write to it goes to the main tree via Bash (`sed -i` or redirection on the absolute path), never `Edit`/`Write`: the worktree sandbox rejects main-tree paths from a worktree session ("This session is isolated in the worktree … Edit the worktree copy"). See Steps 5e.4 and 5h.
   - **Fixture config guard:** never copy real production config into a worktree — no `.env` with live credentials, no production database URLs, no real API keys. If the plan needs config to run or test, use fixture/example config only (`.env.example`, test fixtures) and say so in the handoff.

3. **Create worktree** — call `EnterWorktree` with `name` set to the task ID slugified (e.g., `task-tbs-024`). This creates a new branch (`worktree-task-tbs-024`) inside `.claude/worktrees/` and switches the session into it. All file writes from this point forward happen inside the worktree — not in the main working tree — except the `todo.md` main-tree writes named in step 2.

Note the worktree branch name; report it in the handoff (Step 5i).

### 5d. Implement the plan steps

Follow the plan's steps in order. If the plan turns out to be wrong, **stop and re-plan with the user** rather than silently deviating. Authorization stands for the scope specified, not beyond.

### 5e. Verify acceptance criteria — independent fan-out with adversarial refuter

The agent that wrote the code in 5d must **not** be the one judging whether it passes. Fan every unchecked AC out to independent subagents, adversarially refute every claimed PASS, and let only this orchestrating agent edit the task file.

**Definitions used in this step** (shared verbatim with `fsad-harness:ac` — keep all three definitions, `VERIFIER_TOOLS`, `trivial`, and `ENUM`, in sync):

```
VERIFIER_TOOLS = Read, Grep, Glob, Bash (read-only commands only)
```

- **Read-only `Bash`** means commands that inspect and never mutate: `grep`, `ls`, `cat`, `head`, `sed -n`, `wc`, `diff`, `cmp`, `git diff`, `git log`, `git show`, `git status`. Never `rm`, `git reset`, `git checkout`, `git stash`, `git clean`, package installs, build/dist scripts.
- **Never granted:** `Edit`, `Write`, `MultiEdit`, `NotebookEdit`. No verifier or refuter subagent may edit anything under any circumstances.
- **Enforcement is on the Agent call, not in the prompt.** Every verifier `Agent` call in 5e.1 and every refuter `Agent` call in 5e.2 passes the allowlist explicitly — `tools: VERIFIER_TOOLS` (or, where the `Agent` tool takes `subagent_type` instead of a `tools:` field, a read-only agent type such as `Explore` whose tool set is a subset of `VERIFIER_TOOLS`). A prompt sentence saying "read-only" is advisory; the allowlist is what prevents a verifier from editing the task file or reverting the build.

```
trivial = (files_changed ≤ 1) AND (lines_changed ≤ 10) AND non-behavioural
```

- `files_changed` / `lines_changed`: from `git diff --stat` of the change under verification (the worktree branch against its base), scoped to the files the task file names. `lines_changed` = insertions + deletions.
- `non-behavioural`: the diff touches only a docstring, comment, label, or copy text — no code path, config value, data, or build output changes.
- If the diff cannot be determined, or any AC needs runtime/browser evidence, the change is **not** trivial.

<!-- ENUM:begin -->
**`ENUM`** — the optional per-AC self-healing enumeration block. An AC may declare a deterministic, read-only enumeration command as an indented child bullet immediately beneath its `- [ ]` line:

```markdown
- [ ] <criterion text, unchanged>
  - enumerate: `<ENUM_CMD>`
```

Declaration syntax:
1. The child bullet is the very next non-blank line after the AC item, indented by at least two spaces, and begins `- enumerate:`. At most one per AC. Anything else beneath the item is ignored by the parser.
2. `ENUM_CMD` is one inline-code span on the line. Multi-line logic lives in a version-controlled script the command calls (e.g. `` `bash scripts/ac/no-cli-phrase.sh` ``).
3. `ENUM_CMD` runs from `$ROOT`, prints one line per violation on stdout (`path:line:text` recommended), and prints nothing when there are no violations, using grep exit-code semantics: `0`/`1` are normal, `≥2` is an error. The command is responsible for exiting `≥2` when its target does not exist; the canonical pattern is a leading guard, `test -d <dir> || exit 2;` (or `test -f <file> || exit 2;`), because `grep --include` on a missing directory exits `1` silently on macOS.
4. `ENUM_CMD` must be read-only in the `VERIFIER_TOOLS` sense — the orchestrator refuses to run a command matching a forbidden form (`rm`, `git reset`, `git checkout`, `git stash`, `git clean`, package installs, or redirection into the tree) and treats it as `enum.status = error` rather than running it.

The canonical runner. Bash tool shell state does not persist between separate tool calls, so a shell function declared in one call is gone in the next; the orchestrator therefore writes this runner once per run to a script file (e.g. `${TMPDIR:-/tmp}/enum_gate.sh`) via the `Write` tool before its first use, then invokes it by path in every call — never as an inline function re-declared per call:

```bash
#!/usr/bin/env bash
# enum_gate.sh — usage: bash enum_gate.sh '<ENUM_CMD>'
# invoked as: (cd "$ROOT" && bash "$SCRIPT_PATH" '<ENUM_CMD>')
out=$(bash -c "set -o pipefail; $1" 2>"${TMPDIR:-/tmp}/enum.err"); rc=$?
err=$(cat "${TMPDIR:-/tmp}/enum.err")
if [ "$rc" -ge 2 ]; then
  printf 'ENUM_ERROR rc=%s\n%s\n' "$rc" "$err"
  exit 2
fi
n=$(printf '%s\n' "$out" | grep -c .)
printf '%s\n' "$out"; printf 'ENUM_COUNT %s\n' "$n"
[ "$n" -eq 0 ]
```

`set -o pipefail` inside the inner `bash -c` subshell means a piped `ENUM_CMD` (e.g. `rg … | sort`) now surfaces an earlier stage's failure — a missing tool, `command not found` — as the subshell's own exit code, so the `rc -ge 2` guard catches it and reports `ENUM_ERROR` instead of silently scoring zero violations.

The gate predicate is `converged ⇔ enum_gate exits 0 ∧ survivors_after_spot_check = ∅`, where a "survivor" is a location the blind refuter (below) still stands behind after the orchestrator spot-checks its claim:

| `enum_gate` exit | blind refuter | outcome |
|---|---|---|
| 0 | no survivors | `PASS` (eligible for checkbox flip) |
| 0 | survivor(s) stand spot-check | `FAIL`, `root_cause = enumeration_undercovers` |
| 1 | anything | `FAIL` — the subagent's view is recorded but cannot change the verdict |
| 2 | not consulted | `UNCLEAR`, `enum.status = error`, stop-and-ask |

**Ownership.** A `- enumerate:` declaration is authored and edited by a human only — a verifier, refuter, or repair agent never authors or edits a declaration line; an agent that identifies a need for one proposes it in prose for a human to add.
<!-- ENUM:end -->
`$ROOT` is the worktree under verification (Step 5c) — the same tree `trivial`'s `git diff --stat` is computed against.

**5e.0 — Trivial-change fast path.** After 5d, evaluate `trivial` from `git diff --stat` and announce which path was taken: "Change is trivial (N file, M lines, non-behavioural) — single verifier, refuter gate skipped" or "Change is not trivial — full fan-out with refuter gate". If `trivial`:
- Spawn **one** verifier `Agent` with `tools: VERIFIER_TOOLS` and give it the whole AC list. Its only admissible evidence is a direct read-back of the diff (`git diff` output quoted per AC) — anchoring is not a risk when the diff is the evidence.
- Skip 5e.2 (the refuter gate) entirely. A `PASS` goes straight to 5e.4; a `FAIL` or `UNCLEAR` is handled exactly as on the full path (5e.3 repair loop, or the 5e.4 stop-and-ask). Record `trivial: true` in the handoff so the skipped gate is visible.
- The trivial fast path does not exempt declared ACs: `enum_gate` still runs for every AC that carries an `- enumerate:` child, the blind refuter is skipped exactly like the ordinary verifier is, and a non-zero exit is `FAIL` regardless of what the single verifier reports.

If the change is not `trivial`, continue with the full fan-out below.

**5e.1 — Fan out.** Collect every `- [ ]` item from `## Acceptance Criteria`. Spawn one `Agent` per AC with `tools: VERIFIER_TOOLS` (batch 2–3 per agent only for very long lists — never mix more than 3 into one agent, since that erodes independence). Send **all Agent calls in a single message**. Each verifier gets the AC text, the task file's Summary/Assessment/Plan sections (not the sibling ACs — avoid anchoring), and read-only codebase access via the allowlist — never `Edit`/`Write`/`MultiEdit`/`NotebookEdit`. Instruct each to gather evidence and return **only** this structure as its final message:

```
{ac_id, verdict, evidence, file, line, confidence}
```

`verdict` is one of `PASS` / `FAIL` / `UNCLEAR`. `UNCLEAR` applies when the AC is unfalsifiable as written or needs runtime/browser evidence static reading can't produce — instruct the verifier to default to `UNCLEAR` rather than guess `PASS` under ambiguity. `confidence` (`high`/`medium`/`low`) reflects how directly the evidence proves the claim. **Declared ACs:** for an AC carrying an `- enumerate:` child (see `ENUM` above), skip the ordinary verifier and instead run the declared-AC procedure: run `enum_gate` from `$ROOT` via read-only `Bash`; spawn one **blind refuter** `Agent` with `tools: VERIFIER_TOOLS` given only the criterion text — no diff, no `ENUM_CMD` output, no sibling ACs, no Plan section; spot-check every survivor it reports at its cited `file:line`, exactly as a `REFUTED` claim is spot-checked below; evaluate the gate predicate from `ENUM` above; and return the extended record `{ac_id, verdict, evidence, file, line, confidence, trivial, enum, survivors}` (`architecture.md` §6.7). The `- enumerate:` declaration wins over the browser-AC keyword heuristic below when both would otherwise apply. A declared AC that fails the gate enters the convergent repair loop at 5e.3b, not 5e.3a. **Browser ACs:** when an AC needs browser evidence (renders / visible / navigates / highlights / font-size / contrast / scroll state), if a browser-verification skill is installed (for example `browser-verify`), invoke it (via the `Skill` tool) on the built output first and use its `{ac_id, verdict, evidence}` row as the verifier result — fall back to `UNCLEAR` only for criteria that skill reports as un-automatable (`manual`).

**5e.2 — Adversarial refuter gate.** Every `PASS` verdict is a claim, not yet a fact. Spawn one independent refuter `Agent` per PASS claim, each with `tools: VERIFIER_TOOLS` (batch all refuter calls into a single message; the refuter must not be the same agent instance that produced the claim it's checking). Give it the claim's `evidence`/`file`/`line` and instruct it to open the location itself and try to refute the claim — `CONFIRMED` only if the evidence is direct and holds up under its own reading; **default to `REFUTED` on indirect evidence** (inferred from naming/structure rather than behavior, incomplete, or unverifiable from the cited location). It returns `{ac_id, refuter_verdict: CONFIRMED|REFUTED, reason, file, line}`. `FAIL` and `UNCLEAR` verdicts skip this gate — there's no claim to refute. Declared ACs get no second refuter: the blind refuter run as part of the declared-AC procedure in 5e.1 *is* the refuter, each survivor it reports is spot-checked exactly as a `REFUTED` claim is below, and a survivor that does not hold is recorded `REFUTATION_REJECTED`.

**Orchestrator spot-check of every `REFUTED`.** A refutation is also a claim, and refuters default to `REFUTED` on doubt, so some refutations are wrong. Before any `REFUTED` downgrades an AC to `FAIL` and enters 5e.3, you (the orchestrator, not a subagent) open the refuter's cited `file:line` with `Read` and check whether its stated reason actually holds there:
- Reason holds under your own reading → the refutation **stands**; the `PASS` downgrades to `FAIL` with the refuter's reason recorded, and the AC enters the 5e.3 repair loop.
- Reason does not hold (the cited location shows what the verifier said, the refuter misread it, or the refuter's `file:line` does not support its reason) → record `REFUTATION_REJECTED` with a one-line note and let the verifier's `PASS` stand. Do not enter 5e.3 for it.

The spot-check is a read of one location, not a re-verification — if deciding requires more than the cited location, treat the refutation as standing and repair.

**5e.3a — Bounded repair loop for undeclared ACs (including refuter-downgraded).** For each *undeclared* AC still `FAIL` after 5e.2 — for a refuter-downgraded one, only after the 5e.2 spot-check confirmed the refutation stands — attempt a repair: fix the specific gap the evidence/refuter reason identified, then re-run 5e.1–5e.2 for that AC only. Allow **up to 2 repair attempts per AC** (3 total verify passes). Record, per attempt, what was fixed and what new failure (if any) the re-verify revealed — 5e.5's exhaustion report needs both. If it still doesn't reach a refuter-confirmed `PASS` after 2 repairs, stop looping on it — treat as a hard-stop `FAIL` and report (see 5e.5). Do not silently retry beyond 2 attempts, and do not loop on `UNCLEAR` — that's a stop-and-ask, not a repair target. A **declared** AC that fails the gate does not enter this loop — see 5e.3b.

**5e.3b — Convergent repair loop for declared ACs.** For each *declared* AC still `FAIL` after its 5e.1 gate evaluation, run up to 3 iterations. One iteration is exactly one atomic repair pass followed by one gate evaluation; the entry gate from 5e.1 is not itself an iteration, so a declared AC gets at most 3 repair passes and 4 gate evaluations in total.

For iteration k (k = 1, 2, 3):
1. **Enumerate** — run `enum_gate` from `$ROOT` (via the script-file delivery in the `ENUM` block above) and take its complete `locations` list as the work set.
2. **Repair** — fix every listed location in one atomic pass: no re-enumeration between edits, and the pass is complete or aborted, never partial.
3. **Refute** — re-run the 5e.1 declared-AC procedure for this AC only: `enum_gate` again, plus a **fresh blind refuter** `Agent` (`architecture.md` §6.4 — a new instance every iteration, `tools: VERIFIER_TOOLS`, no diff, no `ENUM_CMD` output, no sibling ACs, no Plan section), plus the orchestrator's spot-check of every survivor.
4. **Gate** — converged (`enum_gate` exits `0` and no survivor stands the spot-check)? Flip the checkbox and leave the loop — go to 5e.4. Not converged and `k < 3`? Start iteration `k + 1`. Not converged and `k = 3`? Non-convergence — go to the 5e.5 exhaustion report with `root_cause` set.

**Early exits** — end the loop immediately, before spending remaining iterations, and always produce the 5e.5 exhaustion report: the repair phase finding that an enumerated location is not actually a violation (`root_cause = enumeration_overmatches` — editing it would be changing code to make the test pass, not fixing a real gap); the refuter reporting a survivor the enumeration command cannot express, when the same survivor class reappears in iteration 2 after the orchestrator has already repaired it once (`root_cause = enumeration_undercovers`). `enum.status = error` (`enum_gate` exits `2`) is not an early exit of this loop — it routes to the 5e.4 `UNCLEAR` stop-and-ask instead, with no `root_cause` set.

5e.3a's cap never applies to a declared AC and 5e.3b's cap never applies to an undeclared one — the two loops are keyed on whether the AC carries an `- enumerate:` child, and neither substitutes for the other.

**5e.4 — Orchestrator applies results.** This agent (not any subagent) makes every task-file edit — avoids concurrent-write races across parallel verifiers/refuters. **Which copy of the task file:** AC checkbox flips and the 5e.5 timestamp go to the copy this session can write — the worktree copy when the task file is tracked or was copied in at 5c step 2 (edit it with `Edit`); otherwise the main-tree copy, written via Bash (`sed -i` on the absolute path) — never `Edit`/`Write`, because the worktree sandbox rejects main-tree paths from a worktree session. For each AC, in original list order:
- **Refuter-confirmed `PASS`** (or the single verifier's `PASS` on the 5e.0 trivial path): edit the task file to flip `- [ ]` → `- [x]`. Use enough surrounding context in `old_string` for an unambiguous match. **Mark progressively** as each resolves, not in one batch — for ≥3 ACs resolved together at the end of a phase, replacing the entire AC block in one `Edit` is acceptable, provided each was proved individually first.
- **`FAIL`** (post-repair-loop, 5e.3a or 5e.3b): do not flip. Record what broke and, if refuter-downgraded, the refuter's reason. For a declared AC that exhausted 5e.3b without converging, also record `root_cause` — one of `enumeration_undercovers`, `enumeration_overmatches`, `fix_reintroduces`, `fix_incomplete`, `enumeration_error`, `unfalsifiable` (`architecture.md` §6.6) — alongside the failure.
- **`UNCLEAR`**: do not flip. **Stop-and-ask** (log it through `## Asking the user`) — surface the AC text and why it's unfalsifiable or needs runtime evidence this flow can't produce; ask the user how to proceed (rewrite the AC, supply the missing evidence, or explicitly accept the risk with a manual verdict). Never auto-resolve `UNCLEAR` to `PASS` or `FAIL`. A declared AC whose `enum_gate` exits `2` (`enum.status = error`) routes down this same `UNCLEAR` bullet, with the stderr captured in `evidence`; no verifier is spawned in its place, and the legacy verifier path is never used as a fallback for a declared AC.

Never edit AC text to make a failing or unclear item pass.

**AC status file.** Write each AC's final verdict to the status file as soon as it is final, and before any `UNCLEAR` stop-and-ask or `FAIL` hand-off, so the record exists while the user decides. Mods (the fleet pane) read it; the task file alone records only `[x]` and `[ ]`.

- **Path:** the task file's path with `.md` replaced by `.acs.json`, in the same directory and the same copy (worktree or main tree) as the task file you edit. Example: `planning/to do/task-tbs-103.5.md` → `planning/to do/task-tbs-103.5.acs.json`.
- **Shape:** a JSON array, one entry per AC, sorted by `index`:
  `[{ "index": 1, "verdict": "pass", "date": "YYYY-MM-DD", "refuter": "confirmed" }]`
  - `index`: the AC's 1-based position in the `## Acceptance Criteria` list.
  - `verdict`: `pass`, `fail`, or `unclear`, the final verdict above, lowercased.
  - `date`: the real system date (`date +%F`).
  - `refuter`: `confirmed` (refuter confirmed the `PASS`), `rejected` (`REFUTATION_REJECTED`, the `PASS` stands), `refuted` (the refutation stood, now `FAIL`), or `skipped` (no refuter ran: a `FAIL` or `UNCLEAR` from the verifier, or the trivial path). A declared AC records `confirmed` when no survivor stands, `refuted` when one does.
- **Update, do not rewrite:** read the file if it exists. Replace the entry for each AC this run resolved, keep every other entry as it is, and write the array back. An AC already `[x]` before this run keeps its entry.
- **Write it with `Write`** when the task file is the worktree copy; for a main-tree task file from a worktree session, write it via Bash redirection on the absolute path.
- **Never touch the AC text for this.** The status file is the only place a `fail` or `unclear` verdict persists.

**5e.5 — Timestamp and stop condition.** When every AC is `[x]`, add a note immediately above the AC list using the real system date (`date +%F`, not prose substitution):
```
All criteria verified YYYY-MM-DD before commit.
```
If any AC is still `FAIL` after the repair budget is exhausted, or any AC is `UNCLEAR`, stop here and report — do not proceed to 5f.

**Exhaustion report (mandatory when the 5e.3a or 5e.3b budget is exhausted).** For each AC that hit the hard-stop `FAIL`, the handoff message must contain fields 1–5 always, plus field 6 for a declared AC — an AC that fails repair is usually underspecified, and this report is what lets the user fix the AC rather than guess at the code:
1. **AC demand** — what the AC text literally requires, quoted, and what evidence would satisfy it; for a declared AC, also the `ENUM_CMD` quoted.
2. **Per-attempt fix** — 5e.3a: for each repair attempt (1 and 2), what was changed, with `file:line`. 5e.3b: for each iteration (1–3), the `ENUM_COUNT` before repair, the complete `locations` list, and the `git diff --stat` of that iteration's atomic pass.
3. **Per-attempt new failure** — 5e.3a: for each repair attempt, what the re-verify (or spot-checked refutation) reported afterwards, and whether it was the same failure or a new one. 5e.3b: for each iteration, the `ENUM_COUNT` after repair, the spot-checked survivors, and any `REFUTATION_REJECTED` notes.
4. **Underspecified verdict** — `underspecified: yes|no`, with one sentence: is the AC unfalsifiable as written, contradicted by another AC or the plan, or dependent on evidence the flow can't produce? (`no` means the implementation is genuinely wrong and the AC is fine.)
5. **Proposed rewording** — a tightened `- [ ]` line that is falsifiable from static evidence, or, when `underspecified: no`, the sentence "AC stands as written". For a declared AC, may additionally propose a new or corrected `- enumerate:` line — the AC line itself is proposed only, never edited (Guardrails).
6. **`root_cause`** (declared ACs only, absent for undeclared) — one of `enumeration_undercovers`, `enumeration_overmatches`, `fix_reintroduces` (count drops then rises across iterations), `fix_incomplete` (count falls but not to zero across 3 iterations), `enumeration_error` (exit `2`), `unfalsifiable` (criterion cannot be expressed as a location list) — `architecture.md` §6.6.

Then stop and wait. Do not edit the AC text yourself (Guardrails); do not attempt a third repair attempt (5e.3a) or a fourth iteration (5e.3b); do not proceed to 5f.

### 5f. Optional code review

All ACs have passed. Ask the user exactly once, through `## Asking the user`:

> "All acceptance criteria passed. Would you like to run `/fsad-harness:code-review-team` on this diff before wrapping up?"

- **Yes** — Invoke the `fsad-harness:code-review-team` skill (via `Skill` tool). Wait for it to complete. The skill writes `REVIEW-REPORT.md`; note any critical findings in the handoff message. Then continue to 5g.
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

> **Write directly to the main working tree, via Bash.** Use the absolute path `{project_root}/{cfg.todo_file}` — not a relative path. The CWD is the worktree; a relative path would write to the worktree copy and create a merge conflict at ship time. The `[x]` mark is intentionally committed from main, not included in the worktree branch. Use Bash (`sed -i` or redirection), **not `Edit`/`Write`** — the worktree sandbox rejects main-tree paths from a worktree session ("This session is isolated in the worktree … Edit the worktree copy"), so an `Edit` here either fails or lands on the wrong copy.

Change the entry's `- [ ]` to `- [x]` at `{project_root}/{cfg.todo_file}` with a `sed -i` anchored on the canonical identifier (macOS `sed` needs the empty `-i ''`):

```bash
sed -i '' 's/^- \[ \] `{ID}`/- [x] `{ID}`/' "{project_root}/{cfg.todo_file}"
grep "{ID}" "{project_root}/{cfg.todo_file}"   # confirm exactly one line now reads `- [x]`
```

Do not reorder lines or touch other entries.

### 5i. Hand off — do not auto-commit

Call `ExitWorktree` with `action: "keep"` to return the session to the original working directory while leaving the worktree branch intact on disk.

Open the handoff message with a bold header on its own line:

```
**{ID} — {title}**
```

Then provide a concise summary covering: what was implemented, which ACs were verified, which files changed, whether the CHANGELOG was updated, whether the todo entry was marked done, whether a version was bumped (or why it was skipped), and whether the code review was run (e.g., "Code review report written to `REVIEW-REPORT.md`") or skipped. Include the worktree branch name (e.g., `worktree-task-tbs-024`) and tell the user their changes are isolated on that branch. Suggest running `fsad-harness:ship-it` (or `git merge <branch>`) to bring the changes into the main branch before pushing. **Wait for the user to say "commit"** before doing so.

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
- **Never mark an AC complete without evidence that survived the adversarial refuter gate.** A verifier subagent's PASS claim alone is not sufficient — see Step 5e.
- **The implementing agent never self-judges its own ACs.** Verification and refutation happen in independent subagent instances, not the context that wrote the code.
- **The gate for a declared AC is `enum_gate`'s exit status, not a subagent's opinion.** No verifier, refuter, or spot-check can turn a non-zero exit into `PASS` — the orchestrator tests `$?`, never a verdict string.
- **No agent creates, edits, or synthesises an `- enumerate:` line.** A `- enumerate:` declaration is human-authored and human-edited only; an agent that identifies a need for one proposes it in prose (e.g. in a report) for a human to add, and never runs a legacy verifier as a substitute when enumeration is broken or absent.
- **`UNCLEAR` is a real verdict, not an escape hatch.** Use it only for genuinely unfalsifiable ACs or ones needing runtime/browser evidence the flow can't produce statically — never collapse it into `PASS` to keep moving. It always stops and asks.
- **Repair loops are bounded** — at most 2 repair attempts per failing undeclared AC (Step 5e.3a), at most 3 iterations per failing declared AC (Step 5e.3b), before either is a hard-stop `FAIL`. Don't loop indefinitely chasing a pass. When the budget is exhausted, the exhaustion report in Step 5e.5 is mandatory (five fields, six for a declared AC) — never a bare "AC failed".
- **The orchestrator, not a subagent, runs `enum_gate` and performs the atomic repair pass.** Step 5e.3b's enumerate and repair phases are the orchestrating agent's own actions; no subagent is asked to run `enum_gate` or told to edit the AC's target locations on the orchestrator's behalf.
- **Verifiers and refuters are read-only by allowlist, not by request.** Every verifier and refuter `Agent` call (and the 5a survey agent) passes `tools: VERIFIER_TOOLS`; `Edit`, `Write`, `MultiEdit`, `NotebookEdit` are never granted to them. If a subagent reports having edited or reverted anything, discard its result and re-run with the allowlist.
- **A `REFUTED` verdict is a claim too.** The orchestrator spot-checks every refutation at the cited `file:line` before it downgrades an AC (Step 5e.2); a refutation that does not hold is recorded as `REFUTATION_REJECTED` and the verifier's `PASS` stands. Never downgrade on an unchecked refutation.
- **The `trivial` predicate is the only way to skip the refuter gate.** It requires `files_changed ≤ 1`, `lines_changed ≤ 10`, and a non-behavioural diff, and the single verifier's evidence must be a direct read-back of the diff (Step 5e.0). Anything larger, or anything behavioural, takes the full 5e.1 → 5e.2 path.
- **Ask once, up front.** Every blocking ambiguity goes into the single numbered list in Step 5a, logged through `## Asking the user`; after the user answers, the only permitted mid-run pause in 5d–5e is an `UNCLEAR` AC stop-and-ask.
- **Main-tree writes from a worktree session use Bash, never `Edit`/`Write`.** The worktree sandbox rejects main-tree paths; `todo.md` (Step 5h) and any main-tree task-file copy (Step 5e.4) are written with `sed -i` or redirection on the absolute path.
- **Never copy real production config into a worktree** (Step 5c) — fixture/example config only.
- **Mark ACs progressively, not in a batch.**
- **In multi-task mode, only the orchestrator writes `todo.md`** — never let a dispatched agent edit the shared main-tree todo file; it returns `todo_marked: false` and the orchestrator batches the edits after every agent returns (Step 0.5).
- **Don't propose CHANGELOG content not anticipated by the plan without asking.** Surprise changelog churn is hard to undo.
- **Don't bump versions opportunistically** — only when the plan explicitly calls for it. When bumping, keep all version sources aligned.
- **Don't auto-commit or push.** The user owns the release decision.
- **Don't run destructive git operations** at any point.
- **Always enter a worktree in single-task execute mode** — call `EnterWorktree` in Step 5c before any file modifications. Never modify the main working tree directly during execution.
