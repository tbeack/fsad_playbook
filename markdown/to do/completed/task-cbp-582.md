# CBP-582 — Add AGENTS.md fallback callout + update Codex Equivalent cross-reference (v2.1.277)

**Source:** Claude Code v2.1.277
**Tag:** [Claude]

## Summary
v2.1.277 adds AGENTS.md support: in a project with no CLAUDE.md, Claude Code now reads AGENTS.md instead — configurable under "Project instructions" in `/config`. Not yet on Bedrock, Vertex, or Foundry.

## Assessment
The Claude Best Practices page (`src/pages/practices.html`) already has a "Codex Equivalent" callout that frames `AGENTS.md` as purely a Codex CLI filename convention, parallel to `CLAUDE.md`. That framing is now stale: Claude Code itself reads `AGENTS.md` as a fallback. Add a new callout documenting the fallback behavior, and update the existing Codex Equivalent callout to note the convergence.

## Plan
1. Open `src/pages/practices.html`
2. Insert a new "AGENTS.md Fallback" callout before the existing "Codex Equivalent" callout, describing the v2.1.277 behavior, the `/config` toggle, and the Bedrock/Vertex/Foundry exclusion
3. Update the "Codex Equivalent" callout to cross-reference the new fallback behavior
4. Mark CBP-582 complete in `markdown/to do/todo.md`

## Acceptance Criteria
- Claude Best Practices page documents that Claude Code reads AGENTS.md when no CLAUDE.md exists (v2.1.277)
- Codex Equivalent callout no longer implies AGENTS.md is Codex-exclusive
- Build passes without errors
