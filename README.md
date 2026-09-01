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
| **Current version** | v4.2.0 |
| **Date updated** | 2026-09-01 |
| **File** | `dist/fsad-playbook.html` (built from `src/`) |

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes by version.

## Skills (`fsad-harness:` plugin namespace)

Reusable Claude Code skills bundled under `skills/`. Install as a plugin (see `.claude-plugin/plugin.json`) to invoke via `/fsad-harness:<name>`.

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

