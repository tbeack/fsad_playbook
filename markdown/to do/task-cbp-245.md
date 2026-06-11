# CBP-245 — [Claude] Update sub-agent guidance to document 5-level nesting depth (v2.1.172)

## Summary

Claude Code v2.1.172 introduced the ability for sub-agents to spawn their own sub-agents, up to **5 levels deep**. Previously sub-agents could not themselves spawn other agents. This enables more complex hierarchical workflows where an orchestrator spawns task-agents that each spawn their own research or analysis sub-agents.

## Assessment

The playbook documents subagent usage in multiple places:

- **Line 8204–8208** — `### 2. Subagent Strategy` bullet list inside the example CLAUDE.md block (inside a `<pre><code>` block). This is markdown embedded as code, not editable as live HTML.
- **Line 10318** — Dynamic Workflows collapsible intro paragraph: "Dynamic workflows run tens to hundreds of parallel subagents in a single session..."
- **Line 10340** — Dynamic Workflows token cost callout.

The nesting depth capability (5 levels) is **not mentioned anywhere** in the playbook. The best location to add it is the Dynamic Workflows intro paragraph (line 10318), since that's where multi-agent orchestration patterns are described. A parenthetical note on nesting depth fits naturally there.

## Plan

**Target:** Line 10318 — the opening `<p>` of the Dynamic Workflows collapsible.

**Current text:**
```
Dynamic workflows run tens to hundreds of parallel subagents in a single session — tackling problems too large for a single-pass solution. Claude decomposes the prompt, distributes subtasks across agents working simultaneously, verifies results through independent checking and adversarial refutation, and iterates until answers converge. <em>"Work you'd normally plan in quarters now finishes in days."</em>
```

**New text:** Add a sentence noting that sub-agents can themselves spawn sub-agents up to 5 levels deep, enabling hierarchical orchestration:
```
Dynamic workflows run tens to hundreds of parallel subagents in a single session — tackling problems too large for a single-pass solution. Claude decomposes the prompt, distributes subtasks across agents working simultaneously, verifies results through independent checking and adversarial refutation, and iterates until answers converge. Sub-agents can themselves spawn sub-agents (up to 5 levels deep), enabling hierarchical orchestration where task-agents fan out their own analysis agents (v2.1.172). <em>"Work you'd normally plan in quarters now finishes in days."</em>
```

## Acceptance Criteria

- The Dynamic Workflows collapsible intro paragraph mentions sub-agents spawning sub-agents up to 5 levels deep.
- The sentence is added between the verification sentence and the closing em quote.
- No other HTML is changed.
- Version reference: v2.1.172.
