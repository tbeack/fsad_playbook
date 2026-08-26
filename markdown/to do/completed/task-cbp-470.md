# CBP-470 — [Codex] `codex mcp-server` deprecated → Codex app server / Codex plugin for Claude Code

## Source
Codex CLI — OpenAI developers changelog (`https://developers.openai.com/codex/changelog`, entry dated 2026-08-24, "Codex MCP server command deprecated"). Not tied to a version bump (Codex CLI itself unchanged at rust-v0.149.1).

## Summary
The `codex mcp-server` command is now deprecated. OpenAI's guidance: use the Codex app server instead for programmatic/API-style integration, or use the Codex plugin for Claude Code (`https://github.com/openai/codex-plugin-cc`) for using Codex from within Claude Code.

## Assessment
The `#codex-integrations` section has a "Codex as MCP Server" callout (line 14273–14276) that currently presents `codex mcp-server` as Codex's live, undeprecated way to act as an MCP server for other agents to invoke — this is now stale and should be corrected rather than left to mislead readers into adopting a deprecated command.

## Plan
1. In `fsad-playbook.html`, locate the "Codex as MCP Server" callout (lines 14273–14276):
   ```html
   <div class="callout callout-tip" style="margin-top:1.5rem;">
     <div class="callout-title">Codex as MCP Server</div>
     <p>Unlike Claude Code, Codex can also act as an MCP server (<code>codex mcp-server</code>), allowing other agents to invoke Codex as a tool. Full docs at <a href="https://developers.openai.com/codex/mcp/" target="_blank" style="color:var(--accent-blue);">developers.openai.com/codex/mcp</a>.</p>
   </div>
   ```
2. Replace with an updated version reflecting the deprecation and both replacement paths:
   ```html
   <div class="callout callout-tip" style="margin-top:1.5rem;">
     <div class="callout-title">Codex as MCP Server</div>
     <p>Unlike Claude Code, Codex can act as a tool other agents invoke. As of 2026-08-24, the <code>codex mcp-server</code> command is <strong>deprecated</strong> — use the <a href="https://developers.openai.com/codex/app-server" target="_blank" style="color:var(--accent-blue);">Codex app server</a> instead for programmatic integration. To use Codex from within Claude Code specifically, use the <a href="https://github.com/openai/codex-plugin-cc" target="_blank" style="color:var(--accent-blue);">Codex plugin for Claude Code</a>. Full MCP docs at <a href="https://developers.openai.com/codex/mcp/" target="_blank" style="color:var(--accent-blue);">developers.openai.com/codex/mcp</a>.</p>
   </div>
   ```

## Acceptance Criteria
- [ ] "Codex as MCP Server" callout no longer presents `codex mcp-server` as the current recommended path.
- [ ] Callout documents both replacement paths: the Codex app server, and the Codex plugin for Claude Code.
- [ ] Callout remains well-formed HTML with working links.
