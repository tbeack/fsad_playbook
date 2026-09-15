# CBP-561: [Claude] Document lowered default Dynamic Workflow size — Dynamic Workflows collapsible (v2.1.271)

## Summary
Claude Code v2.1.271 changed the default dynamic workflow size to `small` on Pro plans and lowered the `medium` size guideline from 15 to 10 agents.

## Assessment
The Dynamic Workflows collapsible (`src/pages/practices.html`, `power-usage--dynamic-workflows`) already tracks per-version workflow-sizing changes in its "Trigger keyword: `ultracode`" callout, most recently the v2.1.269 `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS` bullet. The new default-size change belongs alongside it — it directly affects what users should expect out of the box, especially Pro-plan users who will now see smaller workflows by default.

**Action:** Append a bullet to the `callout-tip` in the Dynamic Workflows collapsible.

## Plan
1. Locate the `callout-tip` block in the Dynamic Workflows collapsible in `src/pages/practices.html`, after the `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS` paragraph.
2. Add a new paragraph: "As of v2.1.271, the default workflow size guideline is now `small` on Pro plans, and the `medium` size guideline was lowered from 15 to 10 agents — set `workflowSizeGuideline` explicitly (see Notable settings.json Keys) to override either default."

## Acceptance Criteria
- The Dynamic Workflows collapsible documents the new default sizing
- Version attribution (v2.1.271) included
- No existing content removed
