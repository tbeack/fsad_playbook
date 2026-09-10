# CBP-533: Add 1 GB tool result disk cap to Context Management collapsible (v2.1.265)

## Summary
Claude Code v2.1.265 added a 1 GB cap on tool results saved to disk. When a saved tool result exceeds 1 GB, the in-conversation preview notes that the saved file was truncated. This is relevant context for power users running large Bash commands or reading very large files who might otherwise be surprised by truncated output.

## Assessment
The Context Management collapsible (`#power-usage--context-management`, around line 2685 of `src/pages/practices.html`) has a `<ul>` with bullets about context management. There is currently no mention of tool result disk caps. This is the most natural place to add this note, as it relates to managing what gets stored in context.

**Action:** Add a bullet to the Context Management collapsible's `<ul>` list.

## Plan
1. Find the Context Management collapsible `<ul>` (around lines 2700–2713 in `src/pages/practices.html`)
2. Append a new `<li>` after the last existing bullet (the Opus/Fable 1M auto-compact bullet):
   ```html
   <li>Tool results saved to disk are capped at 1 GB; the in-conversation preview notes when a saved file was truncated (v2.1.265)</li>
   ```

## Acceptance Criteria
- New bullet appears in the Context Management collapsible list
- The note mentions the 1 GB cap, that it applies to tool results saved to disk, and that the truncation is signaled in-conversation
- Version attribution (v2.1.265) is included
- No existing content is removed or reordered
