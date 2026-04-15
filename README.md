# FSAD Playbook — Full Stack Agentic Development

A comprehensive, interactive single-page guide that documents best practices for adopting Claude Code, Codex CLI, and agentic development workflows. Built as a shareable HTML artifact for engineering teams transitioning to AI-augmented development.

## What's Inside

- **FSAD Methodology** — spec-driven, agentic-first development where small cross-functional pods use markdown as a common language to direct teams of AI agents
- **Pod Compositions** — team structures and role definitions for different project types
- **Workflows** — concrete end-to-end walkthroughs of skills and rituals an FSAD pod uses day-to-day (starts with the Squad Setup Skill)
- **Claude Best Practices** — getting started guides, project anatomy, CLAUDE.md configuration, integrations (MCP), code review agents, custom skills, cheat sheet, and power usage
- **Codex Best Practices** — equivalent coverage for OpenAI's Codex CLI: AGENTS.md setup, TOML-based MCP config, approval modes, sandbox security, multi-agent workflows, and more
- **KPIs to Measure Impact** — metrics framework for measuring FSAD adoption, productivity, and ROI
- **Interactive UI** — 6-page navigation, collapsible sections, searchable content, code blocks with copy buttons, dark/light/auto theme toggle

## Tech Stack

- HTML5 single-page application
- Inter + IBM Plex Mono fonts
- Custom CSS (dark/light/auto theme, purple/violet accent palette, CSS custom properties)
- Mermaid.js for flowcharts and diagrams
- Highlight.js for code syntax highlighting
- Vanilla JavaScript (no framework)

## Usage

Open the latest version directly in a browser:

```bash
open "fsad-playbook.html"
```

Or serve locally for development:

```bash
python -m http.server 8000
```

## Version

| Field | Value |
|-------|-------|
| **Current version** | v22 |
| **Date updated** | 2026-04-14 |
| **File** | `fsad-playbook.html` |

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes by version.

