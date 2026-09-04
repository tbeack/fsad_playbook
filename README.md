# FSAD Playbook — Full Stack Agentic Development

A comprehensive, interactive single-page guide that documents best practices for adopting Claude Code, Codex CLI, and agentic development workflows. Built as a shareable HTML artifact for engineering teams transitioning to AI-augmented development.

## What's Inside

- **FSAD Methodology** — spec-driven, agentic-first development where small cross-functional pods use markdown as a common language to direct teams of AI agents
- **Pod Compositions** — team structures and role definitions for different project types
- **Workflows** — concrete end-to-end walkthroughs of skills and rituals an FSAD pod uses day-to-day (starts with the Squad Setup Skill)
- **Harness Engineering** — why reliable agents come from the environment around the model — context, tools, memory, permissions, and traces — not from prompt tweaks or bigger models alone
- **Claude Best Practices** — getting started guides, project anatomy, CLAUDE.md configuration, integrations (MCP), code review agents, custom skills, cheat sheet, and power usage
- **Codex Best Practices** — equivalent coverage for OpenAI's Codex CLI: AGENTS.md setup, TOML-based MCP config, approval modes, sandbox security, multi-agent workflows, and more
- **KPIs to Measure Impact** — metrics framework for measuring FSAD adoption, productivity, and ROI
- **Interactive UI** — 11-page navigation, collapsible sections, searchable content, code blocks with copy buttons, dark/light/auto theme toggle

## Tech Stack

- HTML5 single-page application, assembled from a `src/` tree (template + page partials + JS fragments)
- Inter + IBM Plex Mono fonts
- Custom CSS (dark/light/auto theme, purple/violet accent palette, CSS custom properties) in `src/styles.css`
- MiniSearch (vendored) for full-text + fuzzy search
- Vanilla JavaScript (no framework), fragments in `src/js/`

## Usage

Open the self-contained distribution file directly in a browser:

```bash
open "dist/fsad-playbook.html"
```

Or, for development, build and serve the working copy:

```bash
python3 scripts/build-source.py
python -m http.server 8000    # then browse to /fsad-playbook.html
```

## Build

The source of truth is the `src/` tree. Two build steps:

```bash
# Assemble src/ into the working copy (gitignored generated file)
python3 scripts/build-source.py    # writes fsad-playbook.html

# Produce the fully self-contained distribution file
# (fonts and playgrounds inlined, embeddings injected, no external requests)
python3 scripts/build-dist.py      # writes dist/fsad-playbook.html
```

Output: `dist/fsad-playbook.html` — a single file that works offline and can be shared without companion files. The `dist/` directory is tracked in git and included in every release commit. The intermediate `fsad-playbook.html` is generated and gitignored — edit `src/*`, never the generated file.

## Version

| Field | Value |
|-------|-------|
| **Current version** | v4.1.14 |
| **Date updated** | 2026-09-04 |
| **File** | `dist/fsad-playbook.html` (built from `src/`) |

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes by version.

## Skills (`fsad-harness:` plugin namespace)

Reusable Claude Code skills bundled under `skills/`. Install as a plugin (see `.claude-plugin/plugin.json`) to invoke via `/fsad-harness:<name>`.

### Installing the plugin

**Local, single session** (quickest for testing — loads the plugin from the checkout):

```bash
claude --plugin-dir /path/to/fsad_playbook
```

**Persistent, via the bundled marketplace** (run inside a Claude Code session):

```
/plugin marketplace add tbeack/fsad_playbook
/plugin install fsad-harness@fsad-playbook
```

The marketplace name is `fsad-playbook` and the plugin name is `fsad-harness`, both defined in `.claude-plugin/marketplace.json`. To install from a local clone instead of GitHub, pass the checkout path to `marketplace add`:

```
/plugin marketplace add /path/to/fsad_playbook
```

Once installed, skills resolve as `/fsad-harness:<name>` — e.g. `/fsad-harness:do-task`, `/fsad-harness:ship`, `/fsad-harness:next`.

#### Context-monitor hook and statusline

Two companion scripts ship alongside the skills. They work as a pair: the statusline writes per-session context metrics to a bridge file (`/tmp/claude-ctx-<session_id>.json`), and the hook reads that file after every tool call to warn the *agent* when remaining context drops below 35% / 25%. Both need Node.js on `PATH`.

| Script | Purpose |
|--------|---------|
| `scripts/statusline.js` | Claude Code statusline showing model, current task, directory, and context usage. Also writes the bridge file the hook depends on. |
| `hooks/context-monitor.js` | `PostToolUse` hook that injects context-pressure warnings into the agent's conversation. Registered automatically by `hooks/hooks.json` when the plugin is installed via `/plugin`. |

Copy both into your Claude config directory:

```bash
mkdir -p ~/.claude/hooks
cp /path/to/fsad_playbook/scripts/statusline.js ~/.claude/hooks/statusline.js
cp /path/to/fsad_playbook/hooks/context-monitor.js ~/.claude/hooks/context-monitor.js
```

Then merge the following into `~/.claude/settings.json` (keep any existing keys). Omit the `hooks` block if you installed via `/plugin` — the plugin already registers the hook, and registering it twice just runs it twice per tool call.

```json
{
  "statusLine": {
    "type": "command",
    "command": "node \"$HOME/.claude/hooks/statusline.js\""
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$HOME/.claude/hooks/context-monitor.js\"",
            "async": true
          }
        ]
      }
    ]
  }
}
```

Restart Claude Code. The statusline appears immediately; the hook only speaks up once context is actually running low.

#### Let Claude Code do the install

Paste this prompt into a Claude Code session to have it clone the repo, install the plugin, and set up the statusline and context-monitor hook for you. It needs read access to the repo (SSH key or `gh auth login`). The `/plugin` lines are Claude Code slash commands, so Claude may hand them back for you to type.

```
Install the FSAD Harness Claude Code plugin from the tbeack/fsad_playbook GitHub repo.

Steps:
1. Clone the repo into ~/Repo/fsad_playbook if it isn't already there:
   git clone git@github.com:tbeack/fsad_playbook.git ~/Repo/fsad_playbook
   If SSH fails, retry with https://github.com/tbeack/fsad_playbook.git.
   If the clone already exists, run `git pull` on main instead.

2. Confirm the plugin manifest and marketplace file exist:
   ~/Repo/fsad_playbook/.claude-plugin/plugin.json  (name must be "fsad-harness")
   ~/Repo/fsad_playbook/.claude-plugin/marketplace.json  (name must be "fsad-playbook")
   Stop and tell me if either is missing.

3. Register the local checkout as a marketplace and install the plugin.
   These are Claude Code slash commands, so tell me to run them if you cannot run them yourself:
   /plugin marketplace add ~/Repo/fsad_playbook
   /plugin install fsad-harness@fsad-playbook

4. Verify the install:
   - `/plugin list` should show fsad-harness.
   - Skills should resolve under the fsad-harness namespace, e.g. /fsad-harness:do-task,
     /fsad-harness:ship, /fsad-harness:next, /fsad-harness:ac.
   If they don't appear, tell me to restart Claude Code and check again.

5. Set up the statusline. Confirm `node` is on PATH (stop and tell me if not), then:
   mkdir -p ~/.claude/hooks
   cp ~/Repo/fsad_playbook/scripts/statusline.js ~/.claude/hooks/statusline.js
   Edit ~/.claude/settings.json (create it if missing; merge, do not overwrite
   existing keys) so it contains:
   "statusLine": { "type": "command", "command": "node \"$HOME/.claude/hooks/statusline.js\"" }
   Show me the diff before writing it.

6. Set up the context-monitor hook:
   cp ~/Repo/fsad_playbook/hooks/context-monitor.js ~/.claude/hooks/context-monitor.js
   The plugin's hooks/hooks.json already registers this hook when installed via
   /plugin, so check /hooks (or the plugin's hooks.json) first. Only if it is NOT
   already registered, add a PostToolUse entry to ~/.claude/settings.json with
   matcher "" and command: node "$HOME/.claude/hooks/context-monitor.js", with
   "async": true. Show me the diff before writing it.

7. Verify: `node ~/.claude/hooks/statusline.js < /dev/null` should exit without
   throwing. Tell me to restart Claude Code and confirm the statusline renders.

8. Report back: the commit SHA that was installed, the list of fsad-harness skills
   available, whether the hook was registered by the plugin or by settings.json,
   and anything that failed.

Do not modify any files inside the repo. Do not install anything else.
```

To skip the local clone and install straight from GitHub, replace step 3's first line with `/plugin marketplace add tbeack/fsad_playbook` and drop steps 1 and 2. Steps 5 and 6 still need the two script files, so fetch them with `curl -O` from the raw GitHub URLs under `scripts/` and `hooks/` instead of `cp`.

### Available skills

| Skill | Description |
|-------|-------------|
| `do-task` | Plan or execute a task in any registered project (plan mode → execute mode) |
| `ship-it` | Wrap up finished work — CHANGELOG, version bump, commit, push, PR |
| `ship` | Short alias for `fsad-harness:ship-it` |
| `add-task` | Add a new task to any registered project's todo file |
| `next` | Auto-pick the next open task and hand off to `fsad-harness:do-task` |
| `sync` | Pre-flight sync check across registered projects |
| `ac` | Verify acceptance criteria independently from task execution |
| `code-review-team` | Multi-agent code review (7 specialists in parallel) |
| `estimate` | Fibonacci story point estimation for epics and tasks |
| `init` | Initialize a new project with standard folder structure and config |
| `sec-review-team` | Multi-agent security review (specialist roster selected by stack) |
| `sec-review-fixes` | Opens fix PRs for High findings from a `sec-review-team` report |
| `prd` | Write a PRD or feature spec — four-phase gated flow (Discovery → Specify → Plan → Tasks) |
| `playbook-assistant` | Answer "how do I…" questions from the FSAD Playbook's own content, offline, with section citations |
| `plan` | Plan a significant project, epic, or refactor — five gated planning artifacts (project, architecture, roadmap, verification, instructions) |
| `set-context` | Gather codebase/initiative context before planning — graphify build/query or manual repo sweep, writes a single context.md |
| `prompt-improver` | Rewrite a draft Claude prompt into a stronger, more reliable one using Anthropic's own prompt engineering techniques |
| `spec-review` | Adversarial multi-agent review of a spec/PRD/RFC/design doc — 10 specialist lenses, refutation pass, severity-ranked report |
| `plan-review` | Adversarial multi-agent review of an implementation plan against its baseline spec/ADR — 7 parallel lenses, verified findings |

All skills read project conventions from `~/.claude/commands/fsd/projects.yaml` — copy `skills/add-task/add-task-projects.yaml` to that path and customize for your projects.

## Companion Files

The Workflows page embeds interactive skill playgrounds via `<iframe>`. These files must be kept alongside `fsad-playbook.html` for the embedded examples to load:

| File | Used by |
|------|---------|
| `add-task-playground.html` | Workflows → Add-Task |
| `commit-changes-playground.html` | Workflows → Commit-Changes |

Each playground is a standalone single-file HTML artifact — no build step, no dependencies. If the playground files are missing, the Workflows sections still render normally (the iframe simply won't load). Remove the `<!-- BEGIN ... -->` / `<!-- END ... -->` embed blocks in the playbook to drop the iframes entirely.

