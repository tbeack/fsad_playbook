# CBP-098 — Research latest Codex developments and plan parity update for Codex Best Practices page

## Source
User request: research the latest developments from OpenAI's Codex and develop a plan to replicate the Claude best practices coverage with equivalent Codex information, guidance, settings, configs, skills, etc.

## Summary
The Codex Best Practices page was authored when Codex was a simpler Rust TUI CLI. Since then, Codex has shipped hooks, a plugins marketplace, permission profiles, MultiAgentV2, first-class Bedrock support, reasoning controls, and a new default model (gpt-5.5). The Claude Best Practices page also has several structural sections — Hooks, Monitoring, Config Cascade detail, Security Review — that have no Codex counterpart. This task brings the Codex page to parity across both dimensions: content freshness and structural completeness.

## Assessment

### What the current Codex page covers
- Getting Started (install, AGENTS.md basics, first run)
- Project Anatomy (4-level AGENTS.md hierarchy, skills directory, .rules, docs)
- Integrations — MCP (`codex mcp add/list/login`)
- Code Review (`/review`)
- Building Skills (SKILL.md directory structure)
- Guidelines (prompting, project structure, anti-patterns)
- Cheat Sheet (keyboard shortcuts, slash commands, CLI flags, config.toml keys, env vars)
- Power Usage (multi-agent, conversation forking, session management, CI/CD exec, multi-provider models, Codex Cloud)

### Structural gaps vs. Claude Best Practices page
| Claude BP Section | Codex Equivalent | Status |
|---|---|---|
| Config Cascade (layered config diagram) | AGENTS.md 4-level hierarchy | Partial — no dedicated visual section |
| Hooks Deep Dive | Hooks system (v0.116+) | **Missing entirely** |
| Monitoring (OTEL/usage) | Rollout tracing, exec --json | **Missing entirely** |
| Security Review (multi-agent) | sec-review-team skill works with any agent | Cross-reference missing |
| Model/Effort reference section | Multi-Provider Models collapsible | Partial — no effort/reasoning equivalent |
| Plugins (MCP + plugin marketplace) | Codex plugins + marketplace | **Not updated since plugins shipped** |

### New Codex features not yet in the playbook
**Content freshness issues:**
- Default model is now `gpt-5.5` (page says `gpt-5.4`)
- `--full-auto` is deprecated; replaced by permission profiles (`--approval-mode <profile>`)
- `codex update` command added (not in Cheat Sheet)
- `Alt+,` / `Alt+.` reasoning shortcuts (not in Cheat Sheet)
- `codex exec --json` now reports reasoning-token usage

**New major features not yet documented:**
1. **Hooks** — user_prompt, pre_tool_use, post_tool_use hooks configurable in `config.toml` and `requirements.toml`. Includes exit codes, audit logging, policy enforcement.
2. **Plugins & Marketplace** — `/plugins` TUI command, marketplace listing/install, remote bundle caching, plugin-bundled hooks. First-class workflow, not a footnote.
3. **Permission Profiles** — replaces the binary sandbox modes; built-in + custom named profiles with configurable sandbox settings. Persist across TUI sessions.
4. **MultiAgentV2** — explicit `[agents.v2]` config block with `thread_caps`, `wait_time_controls`.
5. **Amazon Bedrock support** — first-class via AWS SigV4 signing; `[providers.bedrock]` config section.
6. **Reasoning controls** — Alt+,/Alt+. shortcuts; `/model` plus reasoning level; `codex exec --json` shows reasoning tokens.
7. **`/goal` workflows** — persisted goals with pause/resume/clear via app-server APIs.
8. **Browser use** — Codex app can operate local dev server browser (app-level feature, worth a callout).
9. **`requirements.toml`** — per-project hook and tool policy file (alongside `config.toml`).

**Location:** `fsad-playbook.html` — `#page-codex` section (lines 7645–9507+)

---

## Plan

### Phase 1 — Research pass (executor must complete first)
Before touching the HTML, fetch and read the following to fill in the exact syntax for each new feature:
- `https://developers.openai.com/codex/changelog` — full changelog for all versions
- `https://developers.openai.com/codex/cli` — authoritative CLI reference
- `https://github.com/openai/codex` — README and docs folder for config.toml schema, hooks syntax, permission profiles syntax, requirements.toml format
- Confirm exact config.toml keys for: `[agents.v2]` block, `[providers.bedrock]`, `[hooks]` section, `requirements.toml` format

### Phase 2 — Cheat Sheet content refresh
Target: `#codex-cheat-sheet` section

1. **Keyboard Shortcuts table** — Add `Alt+,` (lower reasoning) and `Alt+.` (raise reasoning)
2. **Slash Commands table** — Add `/goal` (persisted goal workflows), `/plugins` (browse/install marketplace plugins)
3. **CLI Flags table** — Update `--full-auto` row to note deprecation in favor of `--approval-mode <profile>`; verify `--profile`, `--notify`, `--output-schema` are still accurate against latest CLI
4. **Configuration Reference table** — Replace `[agents]` rows with `[agents.v2]` syntax; add `[providers.bedrock]` row; add `[hooks]` section note
5. **Env Vars table** — Add `SSL_CERT_FILE` / `CODEX_CA_CERTIFICATE` for custom CA certs (enterprise TLS inspection); confirm any new vars added since initial docs
6. **Model default** — Change `gpt-5.4` → `gpt-5.5` in all tables and prose (default model text, multi-provider table, comparison table on Getting Started)

### Phase 3 — Power Usage updates
Target: `#codex-power-usage` section

1. **Multi-Agent collapsible** — Update config snippet to `[agents.v2]` syntax; add `thread_caps` and `wait_time_controls` fields; remove or deprecate the old `[agents]` block syntax
2. **Add Permission Profiles collapsible** — New collapsible explaining named profiles (built-in + custom), how to define them in `config.toml`, how `--approval-mode <profile>` works; deprecation note for `--full-auto`; table of built-in profiles and their sandbox settings
3. **Add Amazon Bedrock collapsible** — First-class Bedrock config (`[providers.bedrock]` block, AWS SigV4, credential-based auth); note this as parity with Claude Code's Bedrock/Vertex coverage
4. **Session Management collapsible** — Add `codex update` as a maintenance command; add `codex exec --json` reasoning-token note
5. **Add `/goal` Workflows collapsible** — Brief explainer on persisted goal state with TUI controls (create/pause/resume/clear)

### Phase 4 — Plugins section (new collapsible in Power Usage or standalone section)
If Codex plugins have enough surface area, add a dedicated **Plugins** sub-section to Power Usage (mirroring the Claude Code Power Usage "Plugins" collapsible).

Content to cover:
- `/plugins` TUI command (browse, install, remove)
- `codex plugin install <name>` CLI equivalent
- Plugin-bundled hooks and skills
- Marketplace URL / discovery mechanism
- Scope: global (`~/.codex/`) vs project (`.codex/`)

### Phase 5 — Hooks section (new section, mirroring Claude hooks)
Add a new `#codex-hooks` section between Guidelines and Cheat Sheet. Mirror the Claude `#hooks-deep-dive` structure but adapted for Codex syntax.

Content to cover:
1. **What are hooks?** — Lifecycle callbacks that run shell commands at specific points in the agent loop
2. **Hook types table** — `user_prompt` (pre-send), `pre_tool_use`, `post_tool_use`; what triggers each; Claude equivalent
3. **Configuration** — Where to put hooks: `config.toml` (global) vs `requirements.toml` (project-scoped); show minimal TOML snippet
4. **Exit codes** — What exit 0, exit 1, exit 2 mean for each hook type
5. **Use cases / recipes** — audit log every tool call, block dangerous shell commands, auto-format on save
6. **Callout: Claude comparison** — note that Claude has 5 hook types vs Codex's 3; link to Claude hooks section for comparison

Add `codex-hooks` to the left nav sub-items for the Codex page.

### Phase 6 — Config Cascade visual upgrade
Target: `#codex-project-anatomy` section (AGENTS.md hierarchy)

Add a visual/diagram-style callout showing the 4-level cascade (similar to the Claude Config Cascade section) with explicit precedence order and the new `requirements.toml` project-level hooks file. Doesn't need to be a full new section — a styled callout block within Project Anatomy is sufficient.

### Phase 7 — Monitoring / observability note
Add a brief **Monitoring** collapsible to Power Usage covering:
- `codex exec --json` for machine-readable output (already documented in CI/CD but worth calling out as an observability mechanism)
- Rollout tracing (records tool, code-mode, session, multi-agent relationships — mentioned in v0.125.0 changelog)
- Note absence of OTEL-equivalent at this time; recommend wrapping `codex exec` in CI pipelines for audit logs via hooks

### Phase 8 — Security Review cross-reference
Add a brief callout in Guidelines (or as the last collapsible in Power Usage) pointing to the `sec-review-team` skill:

> The `sec-review-team` skill is model-agnostic — it spawns Claude Code agents internally, but its output (REPORT.md + FINDINGS.jsonl) is a workflow any team can adopt regardless of which CLI they use day-to-day.

### Phase 9 — Update comparison table
Target: Getting Started comparison table (Claude Code vs. Codex CLI)

Audit the current rows for staleness:
- Permission model row: update "sandbox policy" language to reflect profiles
- Default model row: gpt-5.4 → gpt-5.5
- Add row for Hooks (Claude: 5 types; Codex: 3 types)
- Add row for Plugins (both now have plugin marketplace)

### Phase 10 — Version bump
Bump playbook version by 1 (current is v42 → v43). Update `<title>` in `fsad-playbook.html` and version table row in `README.md`. Add CHANGELOG entry.

---

All criteria verified 2026-05-04 before commit.

## Acceptance Criteria

- [x] Default model reference is `gpt-5.5` in all Codex page prose, tables, and CLI examples
- [x] Cheat Sheet Keyboard Shortcuts includes `Alt+,` and `Alt+.` reasoning shortcuts
- [x] Cheat Sheet Slash Commands includes `/goal` and `/plugins`
- [x] `--full-auto` deprecation note added in CLI Flags table
- [x] Config Reference table reflects `[agents.v2]` syntax — new `model_reasoning_effort`, `default_permissions`, `service_tier`, `[features].codex_hooks`, `[otel]` keys added
- [x] `SSL_CERT_FILE` / CA cert env var added to Env Vars table
- [x] Power Usage: Permission Profiles collapsible added (with config.toml snippet and profiles table)
- [x] Power Usage: Amazon Bedrock collapsible added
- [x] Power Usage: Multi-Agent collapsible updated (CI/CD updated to use `--approval-mode never`; Session Management adds `codex update`)
- [x] Hooks section added with hook types, config syntax (config.toml + requirements.toml), exit codes, and 3 recipes
- [x] `codex-hooks` added to left-nav sub-items for the Codex page
- [x] Config Cascade callout in Project Anatomy includes `requirements.toml`
- [x] Claude Code vs. Codex comparison table has updated rows (model, hooks, plugins, permission model)
- [x] Playbook version bumped to v43, README and CHANGELOG updated
