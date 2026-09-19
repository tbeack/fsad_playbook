# CBP-584 — Add AGENTS.md Fallback Note for Claude Code (v2.1.277)

## Summary

Claude Code v2.1.277 added AGENTS.md support: in a project with no CLAUDE.md, Claude Code now reads AGENTS.md instead. The active file can be changed under "Project instructions" in `/config`. Not yet available on Bedrock, Vertex, or Foundry.

## Assessment

The playbook currently has a "Codex Equivalent" callout in `src/pages/practices.html` at lines 712-716 that says:

> "OpenAI's Codex CLI uses the same layered architecture with different filenames: `AGENTS.md` instead of `CLAUDE.md`..."

This callout implies AGENTS.md is Codex-exclusive. That is no longer accurate — Claude Code now also reads AGENTS.md as a fallback. The callout should be updated to reflect this.

## Plan

1. Open `src/pages/practices.html`.
2. Find the "Codex Equivalent" callout at lines 712-716 (the `<div class="callout callout-tip">` before `</section>` for the CLAUDE.md section).
3. Update the callout paragraph to mention that as of v2.1.277, Claude Code itself falls back to AGENTS.md when no CLAUDE.md is present, making cross-tool interoperability easier for teams using both tools.

New paragraph text:
"OpenAI's Codex CLI uses the same layered architecture with different filenames: `AGENTS.md` instead of `CLAUDE.md`, `.rules/` for guardrails, and `.agents/skills/` for reusable workflows. The cascade model (org → project → user) is identical. See the **Codex Best Practices** page for the full mapping. As of v2.1.277, Claude Code itself also reads `AGENTS.md` when no `CLAUDE.md` is present in a project — change the active file under 'Project instructions' in `/config`. (Not yet available on Bedrock, Vertex, or Foundry.)"

## Acceptance Criteria

- The callout now mentions that Claude Code reads AGENTS.md as a fallback when CLAUDE.md is absent.
- The `/config` path to change the active file is noted.
- The Bedrock/Vertex/Foundry exclusion is noted.
- Version `v2.1.277` is cited.
- The existing Codex cross-reference content is preserved.
