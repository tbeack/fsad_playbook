# CBP-494 — Extend `CLAUDE_CODE_SUBAGENT_MODEL` cost-optimization note

## Summary
Claude Code v2.1.251 changed `CLAUDE_CODE_SUBAGENT_MODEL` to set the *default* subagent model rather than override everything: an agent definition's `model:` frontmatter and an explicit per-spawn model now take precedence over it.

## Assessment
`src/pages/practices.html` `#model-effort` section documents `CLAUDE_CODE_SUBAGENT_MODEL` in two spots: the code-block example (~line 1718-1719, `# Route sub-agents to Haiku (single biggest cost lever after opusplan)` / `export CLAUDE_CODE_SUBAGENT_MODEL=haiku`) and the Cost Optimization Checklist callout (~line 1760, "Route sub-agents to Haiku via `CLAUDE_CODE_SUBAGENT_MODEL=haiku`"). Neither currently notes that a per-agent `model:` or a per-spawn model override now takes precedence — a practitioner relying on the checklist bullet could be surprised when a named agent with its own `model:` frontmatter doesn't route to Haiku as expected. This is a direct behavioral correction to existing documented guidance.

## Plan
1. In `src/pages/practices.html`, code-block comment above the `CLAUDE_CODE_SUBAGENT_MODEL` example (~line 1718), update to:
   ```
   # Route sub-agents to Haiku (single biggest cost lever after opusplan) — sets the default only; an agent's own `model:` frontmatter or an explicit per-spawn model override it (v2.1.251)
   ```
2. In `src/pages/practices.html`, Cost Optimization Checklist callout (~line 1760), update the bullet to:
   ```html
   <li>Route sub-agents to Haiku via <code>CLAUDE_CODE_SUBAGENT_MODEL=haiku</code> — sets the default only; an agent's own <code>model:</code> frontmatter or an explicit per-spawn model takes precedence (v2.1.251).</li>
   ```

## Acceptance Criteria
- [ ] Code-block comment updated to note the default-only precedence behavior (v2.1.251).
- [ ] Cost Optimization Checklist bullet updated with the same precedence caveat.
