# CBP-785: Update auto-mode callout — extended to Opus 4.6/Sonnet 4.6 on Bedrock/Agent Platform/Foundry/gateway (v2.1.328)

## Summary
Claude Code v2.1.328 added auto mode for Claude Opus 4.6 and Sonnet 4.6 on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and the Claude apps gateway; interactive sessions with no permission mode configured start in auto mode on these platforms too.

## Assessment
`src/pages/practices.html`'s "Auto Mode Is Now the Default Starting Mode" callout (~line 2057) already chains "As of vX.X.X" sentences documenting which sessions/providers start in auto mode by default. This is a direct continuation for the newer Opus 4.6/Sonnet 4.6 models on these specific platforms.

## Plan
1. Open `src/pages/practices.html`.
2. In the auto-mode callout paragraph (~line 2057), append a new sentence after the existing v2.1.302 sentence and before the closing `</p>`:
   ```
    As of v2.1.328, auto mode is also available for Claude Opus 4.6 and Sonnet 4.6 on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and the Claude apps gateway; interactive sessions with no permission mode configured start in it there too.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The auto-mode callout documents the v2.1.328 extension to Opus 4.6/Sonnet 4.6 on these platforms.
- HTML is valid (no unclosed tags).
