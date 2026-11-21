# CBP-801: Update `fallbackModel` bullet — fallback now carries to forks and their Bedrock region (v2.1.330)

## Summary
Claude Code v2.1.330 changed a subagent's model fallback to carry over: agents with no `model:` override, and any fork they then start, run on the fallback model too, and the agents they start use its Bedrock region.

## Assessment
`src/pages/practices.html`'s `fallbackModel` bullet (~line 623, Managed Settings section) documents the v2.1.247 subagent-fallback behavior but not this v2.1.330 extension to forks.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the end of the `fallbackModel` bullet, after the v2.1.247 sentence:
   ```
    As of v2.1.330, the fallback carries further: an agent with no model: override, and any fork it then starts, run on the fallback model too, and the agents they start use its Bedrock region.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The `fallbackModel` bullet documents the v2.1.330 fork-fallback extension.
- HTML is valid (no unclosed tags).

## Status
Implemented.
