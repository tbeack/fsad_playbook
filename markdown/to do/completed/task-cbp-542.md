# CBP-542: Update the "Codex as MCP Server" callout — `codex mcp-server` is now removed, not just deprecated

## Source
Codex CLI rust-v0.154.0 release notes, Documentation/Chores: "Remove deprecated `codex mcp-server` command" (#42993).

## Summary
The playbook's "Codex as MCP Server" callout currently states that `codex mcp-server` was deprecated as of 2026-08-24, pointing readers to the Codex app server instead. As of rust-v0.154.0, the command has been fully removed — this is a breaking change for anyone still relying on the deprecated command, so the callout's wording needs to move from "deprecated" to "removed."

## Assessment
`src/pages/codex.html` `#codex-integrations` section has a `callout-tip` titled "Codex as MCP Server" (~line 540-543) that reads: "...2026-08-24, `codex mcp-server` command **deprecated** — use [Codex app server] instead for programmatic integration...". This is a direct **update-existing** — the command no longer exists at all, so "deprecated" must become "removed," and the guidance should be more emphatic since there's no fallback to the old command.

## Plan
1. Open `src/pages/codex.html`, locate the "Codex as MCP Server" callout (~line 540-543).
2. Update the wording from deprecated to removed:
   ```html
   <div class="callout callout-tip" style="margin-top:1.5rem;">
     <div class="callout-title">Codex as MCP Server</div>
     <p>Unlike Claude Code, Codex can act as an MCP server that other agents invoke. The <code>codex mcp-server</code> command was deprecated on 2026-08-24 and has since been fully <strong>removed</strong> as of rust-v0.154.0 — use the <a href="https://developers.openai.com/codex/app-server" target="_blank" style="color:var(--accent-blue);">Codex app server</a> instead for programmatic integration. To use Codex from within Claude Code specifically, use the <a href="https://github.com/openai/codex-plugin-cc" target="_blank" style="color:var(--accent-blue);">Codex plugin for Claude Code</a>. Full MCP docs at <a href="https://developers.openai.com/codex/mcp/" target="_blank" style="color:var(--accent-blue);">developers.openai.com/codex/mcp</a>.</p>
   </div>
   ```
3. Consider changing the callout class from `callout-tip` to a warning/breaking-change style if the codebase has one (check other callouts in the file for a `callout-warning` or similar class before changing); if no such class exists, keep `callout-tip` and rely on the wording change alone.

## Acceptance Criteria
- [ ] The callout no longer says `codex mcp-server` is merely "deprecated" — it states the command has been removed, citing rust-v0.154.0.
- [ ] The 2026-08-24 deprecation date and existing links (Codex app server, Codex plugin for Claude Code, MCP docs) are preserved.
- [ ] `python3 scripts/build-source.py` completes without error after the edit.
