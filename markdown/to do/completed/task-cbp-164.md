# CBP-164: [Codex] Add Codex Chrome Extension to Integrations section

## Source
OpenAI developers.openai.com/codex/changelog — 2026-05-07 entry: "New Codex Chrome extension for browser integration — works in parallel across tabs without taking over browser; users control which websites Codex can access"

## Summary
OpenAI released a Codex Chrome extension that enables browser integration. It runs in parallel across tabs without taking over the browser, and users can control per-site access. This is a meaningful new integration surface for teams that work heavily in web-based tools (Jira, Figma, Notion, etc.).

## Assessment
The `#codex-integrations` section (line 8471) focuses on MCP connections. The Chrome extension is a distinct integration surface — it gives Codex direct browser access rather than going through MCP. A brief callout or table row covering the Chrome extension is warranted to make teams aware of this option.

## Plan
1. Read the end of `#codex-integrations` section to find insertion point (after the MCP steps, before the section ends).
2. Add a small callout or note block about the Chrome extension covering:
   - What it is (browser integration via Chrome extension)
   - How it works (parallel across tabs, per-site access control)
   - Where to install (Chrome Web Store)
   - When to use vs. MCP (for web-based tools; MCP for API-based tools)

## Acceptance Criteria
- Codex Integrations section mentions the Chrome extension
- Description covers parallel-tab behavior and per-site access control
- Differentiated from MCP integrations (different integration surface)
