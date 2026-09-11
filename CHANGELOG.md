## Changes in This Version

### v4.1.21 — 2026-09-11

**Claude Code v2.1.268 auto-update (CBP-545 through CBP-549)**

Five documentation updates covering plugin menu auto-apply behavior, updated task-tracking model scope, a new WebFetch deadline env var, and a new WebFetch/Artifact permission rule note.

- **[Claude] CBP-545 — `/reload-plugins` cheat sheet update.** As of v2.1.268, installing, enabling, or disabling a plugin through the `/plugin` menu takes effect when you close the menu; added a note to the Cheat Sheet row.
- **[Claude] CBP-546 — Plugins collapsible menu auto-apply note.** Added a bullet explaining the v2.1.268 immediate-apply behavior and updated the code block comment to clarify when `/reload-plugins` is still useful.
- **[Claude] CBP-547 — Todo Tools card — precise model list.** Updated to reflect the v2.1.268 model scope: TaskCreate/Get/Update/List and TodoWrite are available by default only on Claude 3.x, Opus 4.0–4.7, Sonnet 4.0–4.6, and Haiku 4.5.
- **[Claude] CBP-548 — `CLAUDE_CODE_WEBFETCH_DEADLINE_MS` env var.** Added a new env vars table row for the v2.1.268 hard-timeout env var (default 300 s; set to `0` to disable).
- **[Claude] CBP-549 — WebFetch/Artifact permission rule separation.** Added a Notable Settings bullet noting that plain `WebFetch` deny/ask rules no longer gate Artifact reads as of v2.1.268; use an `Artifact` rule or `WebFetch(domain:claude.ai)` instead.

### v4.1.20 — 2026-09-10

**CBP-543 — Harness Engineering page refactor**

Restructured the Harness Engineering page from 8 to 12 sections around the Task Contract / Context + State / Capability Plane / Control + Trust / Graph + Loop Engineering / Observe + Improve / Durable Runtime Substrate framework, with 3 new hand-built dual-theme SVG diagrams and an extended 15-item checklist.

- **CBP-543 — New "Harness Engineering — at a Glance" infographic.** Added a hand-coded dual-theme SVG summary figure beneath the page hero, showing the Model vs. Harness split and the 7-chip job row.
- **CBP-543 — Fixed duplicate theme diagrams.** The Graph Engineering, Loop Engineering, and Permission Check diagrams were rendering both dark and light variants at once; each now shows only the PNG matching the active theme.

### v4.1.19 — 2026-09-10

**Codex CLI rust-v0.154.0 auto-update (CBP-537 through CBP-542)**

Six documentation updates covering experimental worktree sessions, inline async questions, Vim replace mode, richer `/copy` behavior, and the full removal of `codex mcp-server`.

- **[Codex] CBP-537 — `/worktree` slash command.** Codex CLI rust-v0.154.0 adds experimental worktree support: a new `/worktree` TUI command (and `--worktree` CLI flag) creates an isolated checkout for a new or forked session, and lets you browse and resume existing worktree sessions. Added a new Cheat Sheet row.
- **[Codex] CBP-538 — Worktree Sessions collapsible.** Beyond the Cheat Sheet row, isolated git-worktree-backed session checkouts, forking into a worktree, and browsing/resuming worktree sessions are substantial enough to warrant their own explanatory collapsible in the Power Usage section. Added a new "Worktree Sessions" collapsible.
- **[Codex] CBP-539 — Inline Async Questions collapsible.** Codex CLI rust-v0.154.0 adds asynchronous inline questions: while Codex keeps working in the background, it can surface a question with suggested-choice or free-text answers, and answering it does not discard whatever reply draft you were already composing. Added a new "Inline Async Questions" collapsible in Power Usage.
- **[Codex] CBP-540 — Vim `R` replace mode.** Codex CLI rust-v0.154.0 adds `R` (multi-character replace mode, distinct from the single-character `r<char>` already documented) to Vim modal editing, with undo and dot-repeat support. Updated the Vim Editing Mode collapsible.
- **[Codex] CBP-541 — `/copy` rich-text formatting + status/field copy.** Codex CLI rust-v0.154.0 extends `/copy`: copied content now preserves formatting when pasted into rich-text applications, and the picker can also copy `/status`-style output or individual session fields, not just response content. Updated the Cheat Sheet `/copy` row.
- **[Codex] CBP-542 — `codex mcp-server` fully removed.** The playbook's "Codex as MCP Server" callout said `codex mcp-server` was deprecated as of 2026-08-24; Codex CLI rust-v0.154.0 has since fully removed the command. Updated the callout's wording from deprecated to removed.

### v4.1.18 — 2026-09-10

**Claude Code v2.1.267 auto-update (CBP-535 through CBP-536)**

Two documentation updates covering the new `maxEffortLevel` settings cap and the `--system-prompt-snapshot off` CLI flag.

- **CBP-535 — `maxEffortLevel` setting.** Claude Code v2.1.267 adds `maxEffortLevel`, a settings.json key that caps the maximum `/effort` level a session can run at — set top-level for a global cap or per model under `modelSettings`, applying across every provider including Bedrock, Vertex, and Foundry. Users can still pick a lower effort level than the cap. Added a new entry to the Notable `settings.json` Keys callout after `modelPricing`.
- **CBP-536 — `--system-prompt-snapshot off` CLI flag.** Claude Code v2.1.267 adds `--system-prompt-snapshot off`, which renders the system prompt fresh on every request instead of reusing the conversation's recorded prompt — useful when iterating on prompt text. Added a new row to the System prompt & config CLI flags table after `--append-system-prompt`.

### v4.1.17 — 2026-09-09

**Claude Code v2.1.266 auto-update (CBP-532 through CBP-534)**

Three documentation updates covering folder-of-plugins support for `--plugin-dir`, the new 1 GB tool-result disk cap, and mid-prompt slash-command autocomplete changes.

- **CBP-532 — `--plugin-dir` folder-of-plugins support.** Claude Code v2.1.265 lets `--plugin-dir` point at a folder containing multiple plugin subfolders, each with its own manifest; folders added or removed while Claude Code is running are picked up live. Updated the CLI plugin-dir example and the Plugins collapsible.
- **CBP-533 — 1 GB tool-result disk cap.** Claude Code v2.1.265 adds a 1 GB cap on tool results saved to disk; the in-conversation preview now says the saved file was truncated once the cap is hit. Updated the `bashOutputMaxChars` / `taskOutputMaxChars` entry in the Notable `settings.json` Keys callout.
- **CBP-534 — Mid-prompt slash-command autocomplete.** Claude Code v2.1.265 changes mid-prompt slash-command matches to show as a full list (`Tab` opens it outside fullscreen) instead of a single suggestion, and plugin skills are now found by their bare name with no `/plugin:` prefix required. Updated the Cheat Sheet `/commands` card.

### v4.1.16 — 2026-09-05

**Claude Code v2.1.261 follow-up (CBP-529)**

One documentation update, filling a gap from the same v2.1.261 cycle: wider dangerous-`rm` detection.

- **CBP-529 — Wider dangerous-`rm` detection.** Claude Code v2.1.261 extends the dangerous-`rm` safety prompt to also catch `rm -rf` on positional parameters and inside double-quoted `sh -c` scripts. Extended the Subprocess Sandboxing paragraph.

### v4.1.15 — 2026-09-05

**Claude Code v2.1.261 + Codex rust-v0.153.4 auto-update (CBP-524 through CBP-528)**

Five documentation updates covering the new `/skill-doctor` command, larger inline output limits, a subagent system-prompt file flag, the Bash keybinding default, and GPT-6-Astra on Amazon Bedrock.

- **CBP-524 — `/skill-doctor` slash command.** Claude Code v2.1.261 added `/skill-doctor`, a new slash command that shows which loaded skills go unused and what they cost in context, so you can prune them. Added a new Cheat Sheet row after `/doctor`.
- **CBP-525 — `bashOutputMaxChars` / `taskOutputMaxChars` settings.** Claude Code v2.1.261 added two new settings, `bashOutputMaxChars` and `taskOutputMaxChars`, which allow raising how much command and background-task output Claude receives inline (before it is saved to a file), up to 128K characters. Added new entries to the Notable `settings.json` Keys callout after `managedMcpServers`.
- **CBP-526 — `--append-subagent-system-prompt-file` CLI flag.** Claude Code v2.1.261 added `--append-subagent-system-prompt-file`, a new CLI flag that reads the subagent system prompt from a file — useful for prompts too large to pass on the command line. Added a new row to the CLI Launch Flags table after `--append-system-prompt`.
- **CBP-527 — Bash-style word-editing keys are now the default.** Claude Code v2.1.261 changed the prompt's word-editing keys to match Bash by default: `Ctrl+W` deletes back to whitespace, `Alt+F` and `Alt+D` stop at word end, punctuation separates words. As a result, `keybindingFlavor` no longer has any effect — the Bash keybinding behavior is now the permanent default. Updated the `keybindingFlavor` settings entry and the `Ctrl+W` keyboard shortcuts row.
- **[Codex] CBP-528 — GPT-6-Astra on Amazon Bedrock.** Codex rust-v0.153.3 added GPT-6-Astra to the Amazon Bedrock model picker for Mantle and Runtime global/US routes. In rust-v0.153.4, Astra was made the default model in the bundled model picker when no model is explicitly configured. Updated the Codex Bedrock provider table and collapsible prose.

### v4.1.14 — 2026-09-04

**Claude Code v2.1.260 auto-update (CBP-515 through CBP-523)**

Nine documentation updates covering the fullscreen live diff panel, prompt-cache miss diagnostics, headless `/advisor` and `/reload-plugins`, fullscreen transcript clearing, the bash-mode sandbox escape, the Chrome org admin setting, 1M auto-compact, longer `/ultrareview` waits, and unlimited subagent background commands. Codex rust-v0.153.1 / 0.153.2 reviewed: no playbook impact.

- **CBP-515 — `/diff` fullscreen live diff panel.** Claude Code v2.1.260 adds a diff panel that opens beside the conversation in fullscreen mode and shows uncommitted changes live as Claude edits, toggled with `/diff`. Updated the `/diff` Cheat Sheet row.
- **CBP-516 — Prompt-cache miss cause on `/cost` and `/effort` cache note.** Claude Code v2.1.260 adds a likely cause for prompt-cache misses (tool definitions or system prompt changed, idle past the TTL) to `/cost` and the status line `prompt_cache` object, and changing `/effort` mid-session on Claude Fable 5.1 no longer invalidates the prompt cache. Updated the `/usage` and `/effort` Cheat Sheet rows.
- **CBP-517 — `/advisor` text form and headless `/reload-plugins`.** Claude Code v2.1.260 adds a text form of `/advisor` (`/advisor <model>`, `/advisor off`) usable from the desktop app, Remote Control and headless (`-p` / Agent SDK) sessions, and makes `/reload-plugins` available in headless sessions. Added a new `/advisor` Cheat Sheet row and a note on the `/reload-plugins` row.
- **CBP-518 — `Ctrl+L` / `Cmd+K` clear transcript in fullscreen.** Claude Code v2.1.260 changes `Ctrl+L` / `Cmd+K` in fullscreen mode to clear the transcript view like a terminal `clear`; scroll up to see earlier messages. Updated the keyboard shortcuts row.
- **CBP-519 — `!` bash-mode escapes strict sandbox.** Claude Code v2.1.260 runs commands typed at the `!` bash-mode prompt outside the sandbox even when `sandbox.allowUnsandboxedCommands: false` is set, like typing into your own terminal. Noted in the sandbox settings table row.
- **CBP-520 — Claude in Chrome follows org admin setting.** Claude Code v2.1.260 makes Claude in Chrome follow the organization's Claude in Chrome admin setting; when an admin turns it off, `--chrome`, `/chrome` and the browser tools are unavailable. Updated the Chrome Integration collapsible.
- **CBP-521 — 1M auto-compact for Opus and Fable.** Claude Code v2.1.260 improves auto-compact on 1M-context models: Opus and Fable sessions now compact shortly before the 1M-token limit, and recovery compaction on very large contexts no longer times out at 10 minutes. Added a bullet to the context-management list.
- **CBP-522 — `/ultrareview` waits up to 45 minutes.** Claude Code v2.1.260 makes `/ultrareview` and `claude ultrareview` wait up to 45 minutes (previously 30) for long-running cloud reviews. Updated the `/ultrareview` Cheat Sheet row.
- **CBP-523 — Subagent background-command time limit removed.** Claude Code v2.1.260 removes the one-hour time limit on background commands started by subagents; they now run until exit or stopped, matching the main session. Updated the Monitor Tool collapsible.

### v4.1.13 — 2026-09-03

**Claude Code v2.1.259 + Codex rust-v0.153.0 auto-update (CBP-510 through CBP-514)**

Five documentation updates covering a new headless permission flag, org-wide managed MCP servers, Vim mode undo/redo, plugin CLI listing, and a new auto-recap config toggle.

- **CBP-510 — `--permission-prompts none` headless flag.** Claude Code v2.1.259 adds `--permission-prompts none`: any action that would display a permission prompt is automatically denied, making it safe for unattended headless hosts. Added as a new row in the Cheat Sheet CLI flags table between `--permission-mode` and `--allowedTools`.
- **CBP-511 — `managedMcpServers` org-level MCP setting.** Claude Code v2.1.259 adds `managedMcpServers` as a managed setting — orgs can push HTTP/SSE MCP servers to every user via org/MDM policy, with the same entry shape as `.mcp.json`. Accompanied by a behavior change: `allowedMcpServers` now governs only user-added servers; use `deniedMcpServers` to block managed ones. Added as a new list item in the Notable `settings.json` Keys callout.
- **CBP-512 — Codex Vim mode undo/redo.** Codex rust-v0.153.0 adds undo (`u`) and redo (`Ctrl+R`) to the Vim mode TUI composer, preserving complete drafts including pasted content and attachments. Updated the Vim section paragraph in the Codex Best Practices page.
- **CBP-513 — `codex plugin list` and remote marketplace CLI.** Codex rust-v0.153.0 makes the plugin CLI able to list, install, and remove plugins from remote marketplaces. Added `codex plugin list` to the plugin CLI code block and a note about remote marketplace CLI support in the plugin section paragraph.
- **CBP-514 — `tui.auto_recap` config row.** Codex rust-v0.153.0 adds `tui.auto_recap = false` to disable automatic recaps while keeping the manual `/recap` command available. Added as a new row in the config.toml reference table.

### v4.1.12 — 2026-09-02

**Claude Code v2.1.258 auto-update (CBP-506 through CBP-509)**

Four documentation updates covering the new default Fable 5.1 model, a subagent model-forcing env var, a session-only effort shortcut, and two new auto-mode safety controls.

- **CBP-506 — Claude Fable 5.1 default model.** Claude Code v2.1.257 added Claude Fable 5.1 (`claude-fable-5-1`), which is now the default Fable model, carrying 1M context, $10/$50 per Mtok, and $0.25/Mtok cache reads — updated from Fable 5 (`claude-fable-5`), which previously showed no pricing.
- **CBP-507 — `CLAUDE_CODE_SUBAGENT_MODEL_FORCE`.** Claude Code v2.1.257 added `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` to apply `CLAUDE_CODE_SUBAGENT_MODEL` (or the main model) to every subagent, ignoring per-spawn and agent-definition `model:` overrides — the forcing escape hatch for the v2.1.251 default-only behavior (CBP-494).
- **CBP-508 — `/effort` session-only `s` shortcut.** Claude Code v2.1.257 added `s` in `/effort` to change effort for the current session only, matching the existing `/model` picker's `s` shortcut.
- **CBP-509 — Auto-mode Containment Escape rule + working-directory read guard.** Claude Code v2.1.257 added a Containment Escape rule to auto mode — cloud metadata-credential fetches, egress evasion, and cross-tenant reach are no longer auto-approved unless the environment marks them expected — plus a one-time prompt before the first file read outside the working directories, with an opt-in hard block via `permissions.blockReadsOutsideWorkingDirectories`.

### v4.1.11 — 2026-09-01

**Rework Harness Engineering diagrams + turn checklist into an actual checklist (CBP-505)**

The model-vs-harness diagram now labels the seven harness jobs with the source reference's own terminology (CONTRACT/CONTEXT/TOOLS/STATE/SENSORS/POLICY/TRACES paired with DEFINE/SELECT/ACT/REMEMBER/VERIFY/AUTHORIZE/EXPLAIN); a new horizontal seven-box pipeline diagram was added directly under "What a Production Harness Actually Does"; and the 12-item self-assessment checklist is now a real interactive checklist with checkbox state persisted via `localStorage`.

- **CBP-505 — Rework Harness Engineering section diagrams + checklist.** Reworked `#model-vs-harness` diagram terminology, added a new seven-box pipeline diagram to `#seven-jobs`, and converted the `#checklist` section's 12 cards into real checkboxes with `localStorage`-backed persistence (new `src/js/harness-checklist.js`).

### v4.1.10 — 2026-09-01

**Remove `fsd-memory-recommend.sh` Stop hook**

Unregisters the memory-recommendation hook from `hooks/hooks.json` and removes the script and its Hooks Library documentation card from the Skills Library page; the plugin now ships only the `context-monitor.js` `PostToolUse` hook.

### v4.1.9 — 2026-09-01

**New "Harness Engineering" section (CBP-500)**

A new left-nav section, positioned between Workflows and Practical Best Practices, makes the case that reliable agents come from the environment built around the model — not from prompt tweaks or bigger models alone — walking through the seven jobs a harness performs (contract, map, tools, memory, sensors, permissions, traces), the bounded-retry-loop pattern, failure-driven system upgrades, the brain/hands/history separation, a four-level maturity ladder, and a 12-item self-assessment checklist.

- **CBP-500 — Add a "Harness Engineering" section to the main left nav.** New `src/pages/harness.html` module wired into the build via `@include`, with two theme-aware inline SVG diagrams (model-vs-harness overview, four-level maturity ladder) matching the playbook's existing diagram convention, full sidebar nav and router registry wiring, and live full-text search coverage.

### v4.1.7 — 2026-09-01

**Codex CLI rust-v0.152.0 auto-update (CBP-501 through CBP-504)**

Four documentation updates covering Vim mode draft search, rate-limit banner inline actions, per-MCP-tool output token limits with resume-consistent truncation, and the planning tool's new disabled-by-default configuration.

- **[Codex] CBP-501 — Vim mode `/` and `?` draft search.** Codex's Vim editing mode gained forward (`/`) and backward (`?`) search within the current draft, with match highlighting and repeat navigation via `n`/`N`.
- **[Codex] CBP-502 — Rate-limit banner inline actions.** Rate-limit banners now offer direct actions to check usage, manage credits, reset limits, or manage the plan, in addition to the existing `/usage` command.
- **[Codex] CBP-503 — Per-MCP-tool `output_token_limit` + resume-consistent truncation.** Individual MCP tools can now be configured with a per-tool `output_token_limit`, and truncation behavior is now consistent across session resumes.
- **[Codex] CBP-504 — `tools.update_plan.enabled` config row.** Codex's internal planning tool is now disabled by default; users who relied on it must opt in via `tools.update_plan.enabled = true` in `config.toml`.

### v4.1.6 — 2026-08-31

**FSAD Harness plugin (CBP-499)**

The playbook's own skill set now ships as an actual installable Claude Code plugin — `.claude-plugin/plugin.json` and `hooks/hooks.json` at the repo root — so skills resolve as `/fsad-harness:<name>` once installed, replacing the previously aspirational `fsd:` references in the README and Skills Library.

- **CBP-499 — Package the playbook's skills as the "FSAD Harness" plugin.** Adds a valid plugin manifest and hook wiring, renames every `fsd:` skill cross-reference across `README.md`, `skills/*/SKILL.md`, and the Skills Library page to `fsad-harness:`, and verifies the new invocation prefix resolves via a live plugin install.

### v4.1.5 — 2026-08-31

**Skills Library — 5 new `fsd:` skills + Hooks Library (CBP-497)**

Documents the 5 new planning/review skills ported by `TBS-083` — `plan`, `set-context`, `prompt-improver`, `spec-review`, `plan-review` — in the Skills Library, plus a new Hooks Library section covering `context-monitor.js` and `fsd-memory-recommend.sh`.

- **CBP-497 — Document 5 new `fsd:` skills and 2 new hooks in the Skills Library.** Adds full `SKILL.md` source embeds for `plan`, `set-context`, `prompt-improver`, `spec-review`, `plan-review` under a new "Planning & Specification" group; nested Specialist Definitions (`spec-review`, 10 lenses) and Lens Definitions (`plan-review`, 7 lenses) sub-sections matching the existing Code/Security Review Team card pattern; inline SVG orchestration diagrams (dark + light) for `plan`'s named-agent resume flow and `plan-review`'s inventory → parallel-lens → verify → adjudicate → completeness-critic pipeline; and a new Hooks Library section with full source embeds for both hooks, including an explicit statusline-dependency caveat on `context-monitor.js`.

### v4.1.4 — 2026-08-29

**Codex CLI rust-v0.151.0 auto-update (CBP-495 through CBP-496)**

Two documentation updates covering a configurable MCP discovery grace period for optional servers, extension-level MCP tool-result interception, and plugin catalog per-repository configuration improvements in Codex CLI rust-v0.151.0.

- **CBP-495 — [Codex] Configurable MCP grace period for optional servers.** Codex rust-v0.151.0 adds a `startup_grace_sec` config key in `~/.codex/config.toml` that controls how long the session waits for an optional MCP server to finish tool discovery before proceeding — pair with `alwaysLoad: true` to pre-load tools from servers that start in time.
- **CBP-496 — [Codex] Extension MCP result interception + plugin catalog per-repo config.** Extensions can now inspect or replace MCP tool results before the model sees them — useful for redacting sensitive output, reformatting responses, or injecting context. Plugin catalogs now also merge per-repository configuration with global and workspace sources, and report invalid project marketplace entries without hiding valid plugins from other catalog sources.

### v4.1.3 — 2026-08-28

**Claude Code v2.1.251 auto-update (CBP-490 through CBP-494)**

Five documentation updates covering two new model-switch hook events (plus a hook-count correction), background-session shell subcommands, live subagent streaming to Remote Control, prompt-cache and per-model effort persistence, and a sub-agent model routing precedence clarification in Claude Code v2.1.251.

- **CBP-490 — [Claude] `PreModelSwitch`/`PostModelSwitch` hook events.** Claude Code v2.1.251 added `PreModelSwitch` and `PostModelSwitch` hook events to block, confirm, or annotate a model switch; `SessionStart` resume hooks now also receive the session's staleness and the estimated re-cache cost. This also corrected a pre-existing stale hook-event count in the Hooks Deep-Dive callout (26 → 30, aligned with the Cheat Sheet).
- **CBP-491 — [Claude] Background-session CLI subcommands.** Claude Code v2.1.251 added `attach`, `logs`, `stop`, `respawn`, and `rm` to `claude --help` for managing a background session directly from the shell; the `--resume` message for a running background session now names the exact `claude attach <id>` command.
- **CBP-492 — [Claude] Live subagent streaming to Remote Control.** As of v2.1.251, a foreground subagent's tool calls and results stream live to Remote Control clients as they happen; background subagents, the default, still show status only.
- **CBP-493 — [Claude] `/usage` prompt-cache line + `/effort` per-model persistence.** As of v2.1.251, a per-session prompt-cache line (hit ratio, misses, tokens re-cached, warm/cold) is shown on `/cost` with a matching `prompt_cache` object for status line scripts; `/effort` now saves your default effort level per model, so each model keeps its own setting when you switch.
- **CBP-494 — [Claude] `CLAUDE_CODE_SUBAGENT_MODEL` precedence.** As of v2.1.251, `CLAUDE_CODE_SUBAGENT_MODEL` sets the default subagent model only — an agent definition's `model:` frontmatter or an explicit per-spawn model now takes precedence over it.

### v4.1.2 — 2026-08-28

**Claude Code v2.1.248 auto-update (CBP-484 through CBP-489)**

Six documentation updates covering a restricted-mode lockdown flag, per-agent prompt cache TTL, cross-session messaging platform expansion, self-hosted runner labeling, `/loop` availability, and Enterprise usage-credit requests in Claude Code v2.1.248.

- **CBP-484 — [Claude] `--restricted` / `CLAUDE_CODE_RESTRICTED=1`.** Claude Code v2.1.248 added a full lockdown mode: removes the built-in tools that run commands or code and `WebFetch` (unless named in `--tools`), keeps file tools inside the working directory, refuses `bypassPermissions`, and ignores user, project, and local settings files.
- **CBP-485 — [Claude] Document `experimental.cacheTtl` agent frontmatter.** Claude Code v2.1.248 added a per-agent prompt cache TTL (`"5m"` or `"1h"`) used when no subagent TTL setting is configured.
- **CBP-486 — [Claude] Cross-session messaging platform expansion.** As of v2.1.248, `SendMessage`/`ListAgents` between sessions on the same machine works on Bedrock, Vertex, and Foundry, and when telemetry is disabled; also, a subagent's `SendMessage` reply is now delivered to the parent session's conversation, not the subagent.
- **CBP-487 — [Claude] Self-hosted runner `--client-label`.** Claude Code v2.1.248 added `claude self-hosted-runner --client-label <label>` (or `SELF_HOSTED_RUNNER_CLIENT_LABEL`) to override the label the runner registers with instead of using the hostname.
- **CBP-488 — [Claude] `/loop` dynamic mode available everywhere.** As of v2.1.248, self-paced dynamic mode and the no-prompt autonomous default for `/loop` are always available, including on Bedrock, Vertex, and Foundry.
- **CBP-489 — [Claude] `/usage-credits` Enterprise expansion.** As of v2.1.248, members of Enterprise organizations billed through AWS Marketplace, self-serve Enterprise, and Enterprise trials can use `/usage-credits` to request a higher usage limit from their admin.

### v4.1.1 — 2026-08-27

**Codex CLI rust-v0.150.1 auto-update (CBP-479 through CBP-483)**

Five documentation updates covering task mentions and terminal task tools, response copying and thread renaming, keybinding and Vim additions, a new hook event, and a trust-model hardening change in Codex CLI rust-v0.150.0/0.150.1.

- **CBP-479 — [Codex] `@` task mentions + terminal task tools.** Codex 0.150.0 extends the `@` unified context picker to tasks: you can `@`-mention other Codex tasks in the composer, and the agent gains TUI tools to read, create, or message tasks directly from the terminal.
- **CBP-480 — [Codex] `/copy` response target picker + `/rename`.** `/copy` now offers a picker to copy the full response, an individual code block, or a blockquote. Unnamed terminal tasks automatically receive descriptive titles, and a new `/rename` command suggests an editable, conversation-based title.
- **CBP-481 — [Codex] Permission-mode-cycling shortcuts + Vim dot-repeat.** You can now bind shortcuts (via `/keymap`) to cycle through TUI permission modes, and Vim mode gains `.` (dot-repeat) to repeat the last edit.
- **CBP-482 — [Codex] New `Interrupt` hook event.** Codex gains a ninth hook event type: `Interrupt`, firing when an active top-level turn is interrupted, able to run commands or MCP handlers.
- **CBP-483 — [Codex] Untrusted projects no longer load project-level AGENTS.md.** As of rust-v0.150.0, a project that has not been explicitly trusted no longer contributes its project-level `AGENTS.md` instructions to the session — closing a prompt-injection path from unfamiliar repos.

### v4.1.0 — 2026-08-27

**Modular source refactor — Option E (CBP-478)**

The playbook's source of truth moved from the 30 MB monolithic `fsad-playbook.html` to a modular `src/` tree, assembled by the new `scripts/build-source.py`. No content or behavior changed — the assembled playbook was byte-identical to v3.3.3 at the point of migration (verified against frozen sha256 baselines at every phase, plus a full 17-point behavior sweep across all 10 pages on both the working copy and the dist artifact).

- **CBP-478 — Decompose the monolith into `src/`.** Template (`src/playbook.tmpl.html`) + 10 page partials (`src/pages/`) + changelog modal partial + 16 JS fragments (`src/js/`) + extracted CSS (`src/styles.css`) + vendored MiniSearch (`src/vendor/`) + 16 PNG diagram assets decoded from base64 (`src/assets/`, re-inlined at build time via `@asset()`). The root `fsad-playbook.html` is now a gitignored generated intermediate with a divergence guard; `dist/fsad-playbook.html` remains the committed, self-contained artifact. The daily auto-updater (local `/cbp-update` skill, `playbook-updater` agent, and the cloud routine) was migrated to edit `src/` and run both build steps, with an abort guard for branches that predate the migration. Merged via PR #196. (Task originally filed as CBP-472; renumbered after the auto-updater reused that ID in PR #197.)


---

Older entries (before v4.1.0) are archived in [CHANGELOG-archive.md](CHANGELOG-archive.md).
