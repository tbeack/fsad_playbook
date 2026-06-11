# CBP-245: Document sub-agent nesting depth (up to 5 levels)

## Summary
Claude Code v2.1.172 introduced a new capability: sub-agents can now spawn their own sub-agents, up to 5 levels deep. Previously, nesting was limited. This enables complex hierarchical multi-agent architectures.

## Assessment
The playbook's Power Usage section has a "Parallel Subagents" collapsible (and references to subagents throughout). The `[agents].max_depth` setting in the Codex Best Practices section shows `max_depth: 1` as the default. The Claude Code side does not document a max depth. The Parallel Subagents collapsible should be updated with a note about nested subagents and the 5-level limit.

**Location:** Power Usage section, "Parallel Subagents" collapsible. Search for `Parallel Subagents` in the file to find the header.

## Plan
1. Read the Parallel Subagents collapsible to find the exact lines.
2. Add a bullet note inside the collapsible body explaining that sub-agents can now spawn their own sub-agents (up to 5 levels deep), enabling hierarchical multi-agent architectures like orchestrator → specialist → worker trees.

## HTML Pattern to Follow
Add a bullet `<li>` inside the existing `<ul>` in the Parallel Subagents collapsible body.

## Acceptance Criteria
- The Parallel Subagents collapsible mentions the 5-level nesting capability.
- No existing bullets are removed or reformatted.
