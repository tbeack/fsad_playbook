# CBP-370 — [Claude] Add Building Skills callout for claude.ai-synced skill hardening

## Source
Claude Code v2.1.228

## Summary
v2.1.228 hardened skills synced from claude.ai: they no longer shadow local commands or MCP prompts, their descriptions are sanitized and labeled, and on your machine their bodies don't run `!` commands or expand `@` files.

## Assessment
`fsad-playbook.html`, `#building-skills` section (lines ~10243–10340). No existing content mentions claude.ai-synced skills, command/MCP-prompt shadowing, or sandboxing rules for synced skill bodies. The closest neighboring content is the priority-order line (line 10336: "Priority order: managed (enterprise) > user (global) > project > plugin") and the version-tagged callouts that follow it for "Nested skill directories" (v2.1.178) and "Stacked skill invocations" (v2.1.199) — this is a genuine gap, and the existing callouts establish a clear pattern to follow (a `<p>` with a bold lead-in and version tag, in the same `font-size:0.85rem` style).

## Plan

### Step 1 — Add a new callout paragraph after the "Stacked skill invocations" paragraph (after line 10338, before the `<!-- Skill Invocation -->` comment at line 10339)
Current:
```html
    <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.4rem;"><strong>Stacked skill invocations (v2.1.199):</strong> Prefix a prompt with multiple slash commands to load all of them — <code>/skill-a /skill-b do XYZ</code> loads both <code>skill-a</code> and <code>skill-b</code> before handing off to Claude. Up to 5 leading skills are loaded in order. Useful for chaining context across a single turn (e.g., <code>/fsd:plan /fsd:code-review-team audit the diff</code>).</p>

    <!-- Skill Invocation -->
```
Replace with:
```html
    <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.4rem;"><strong>Stacked skill invocations (v2.1.199):</strong> Prefix a prompt with multiple slash commands to load all of them — <code>/skill-a /skill-b do XYZ</code> loads both <code>skill-a</code> and <code>skill-b</code> before handing off to Claude. Up to 5 leading skills are loaded in order. Useful for chaining context across a single turn (e.g., <code>/fsd:plan /fsd:code-review-team audit the diff</code>).</p>
    <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.4rem;"><strong>Hardened skills synced from claude.ai (v2.1.228):</strong> skills synced down from claude.ai no longer shadow local commands or MCP prompts, their descriptions are sanitized and labeled so you can tell them apart from local skills, and on your machine their bodies can't run <code>!</code> shell commands or expand <code>@</code> file references.</p>

    <!-- Skill Invocation -->
```

## Acceptance Criteria
- New callout paragraph present in `#building-skills`, matching the existing `<p style="font-size:0.85rem;...">` pattern used by neighboring version-tagged callouts
- Version tag (v2.1.228) included in the bold lead-in
- Content accurately reflects all three hardening behaviors: no shadowing of local commands/MCP prompts, sanitized/labeled descriptions, no `!`/`@` expansion locally
- No changes to surrounding markup structure
