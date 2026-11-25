# CBP-815: Add skills from MCP servers (beta) note (v2.1.332)

## Summary
Claude Code v2.1.332 added skills from MCP servers (beta). They show as `server:skill` in the `/` menu; other skills keep their own names.

## Assessment
`src/pages/practices.html`'s "Building Your Own Skills" section already documents namespacing conventions for plugin skills (`/plugin:skill-name`) and nested-directory name clashes (`<dir>:<name>`) in a run of small dated notes right after the Project-Level/Global/Plugin Skills cards (~line 1264-1267). The new MCP-server-skills note fits that same run.

## Plan
1. Open `src/pages/practices.html`.
2. After the "Terminal sync from claude.ai (v2.1.275)" paragraph (~line 1267), add:
   ```
   <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.4rem;"><strong>Skills from MCP servers (v2.1.332, beta):</strong> an MCP server can now expose skills directly. They show as <code>server:skill</code> in the <code>/</code> menu, the same namespacing pattern as plugin skills; other skills keep their own names.</p>
   ```

## Acceptance Criteria
- The skills section documents MCP-server-sourced skills and their `server:skill` naming.
- HTML is valid (no unclosed tags).

## Status
Implemented.
