# CBP-804: Update Code Mode collapsible — platform support + richer MCP tool search (v2.1.331)

## Summary
Claude Code v2.1.331 added Code Mode support in terminal sessions on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and the Claude Platform on AWS, and improved Code Mode's tool search to show more of each MCP tool's description, including its limits, formats, and defaults.

## Assessment
`src/pages/practices.html`'s Code Mode collapsible (`power-usage--code-mode`, ~line 2465) already tracks Code Mode's rollout (v2.1.323 base, v2.1.326 agent teams, v2.1.329 OpenTelemetry) but didn't cover platform availability or tool search quality.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the Code Mode paragraph, after the v2.1.329 OpenTelemetry sentence:
   ```
   As of v2.1.331, Code Mode also works in terminal sessions on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and the Claude Platform on AWS, and its tool search now shows more of each MCP tool's description, including its limits, formats, and defaults.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Code Mode collapsible documents v2.1.331 platform support and tool-search improvement.
- HTML is valid (no unclosed tags).

## Status
Implemented.
