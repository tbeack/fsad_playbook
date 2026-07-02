# CBP-293 — Power Usage: Explore agent model + extended thinking inheritance

## Summary
Claude Code v2.1.198 made two related improvements to agent model inheritance:
1. The built-in Explore agent now inherits the main session's model (capped at opus) instead of always running on haiku
2. Subagents and context compaction now inherit the session's extended thinking configuration

## Assessment
Neither fact appears in `fsad-playbook.html`. Both are relevant to the Power Usage section (specifically the extended thinking/effort collapsible). Teams currently believe the Explore agent always uses haiku, and may not know that extended thinking carries through to subagents and compaction.

## Plan
1. Read fsad-playbook.html to find the Extended Thinking / Model & Effort section (around line 9817 based on earlier grep)
2. Find the extended thinking collapsible or relevant section
3. Add a callout or expand the existing note to mention:
   - Subagents and context compaction now inherit extended thinking configuration (v2.1.198)
   - The built-in Explore agent inherits the session model (capped at opus) instead of defaulting to haiku (v2.1.198)

## Acceptance Criteria
- Power Usage section mentions that subagents and compaction inherit extended thinking config
- Note about Explore agent model inheritance (capped at opus) is included
- Version reference `v2.1.198` included
