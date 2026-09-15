# CBP-302 — Add `omitClaudeMd` to agent definition example (v2.1.271)

## Summary

Claude Code v2.1.271 added `omitClaudeMd` to agent frontmatter and `--agents` JSON. When set to `true`, the subagent runs without loading user, project, and local CLAUDE.md files. Managed policy files still load. This lets practitioners create clean-room review agents that are not influenced by project-specific instructions.

## Assessment

The playbook shows a code reviewer agent definition at line 9118 with `name`, `description`, and `tools` frontmatter. There is no mention of `omitClaudeMd` anywhere in the file. Adding a tip callout after the agent example at line 9138 is the best fit — it is close to the definition, visible to practitioners writing their first agents, and matches the callout pattern used elsewhere in this section.

## Plan

1. Read the code reviewer agent block at lines 9113–9152 in `fsad-playbook.html`.
2. Insert a `callout callout-tip` div after line 9138 (the "Then run: …" paragraph).

## New content

```html
    <div class="callout callout-tip" style="margin-top:0.75rem; margin-bottom:0.5rem;">
      <div class="callout-title">Tip — <code>omitClaudeMd: true</code></div>
      <p>Add <code>omitClaudeMd: true</code> to agent frontmatter to run the subagent without loading user, project, and local CLAUDE.md files. Managed policy files still load. Use this for clean-room review agents that must not inherit project-specific instructions (v2.1.271).</p>
    </div>
```

## Acceptance Criteria

- A callout tip about `omitClaudeMd: true` appears after the code reviewer "Then run:" paragraph.
- The callout explains what the property does and when to use it.
- No other content is changed.
