# CBP-800: Update rm safety paragraph — more `rm` targets near root/home/working folder now ask approval (v2.1.330)

## Summary
Claude Code v2.1.330 changed more `rm` commands aimed at the root, home, a top-level folder, or the working folder to ask for approval; where nobody can answer, they're refused.

## Assessment
`src/pages/practices.html`'s Subprocess Sandboxing paragraph (~line 2751) already documents the dangerous-`rm` safety prompt's evolution across many versions (v2.1.261, v2.1.274, v2.1.281, v2.1.309, v2.1.325) but was missing this v2.1.330 widening.

## Plan
1. Open `src/pages/practices.html`.
2. Append to the end of the Subprocess Sandboxing paragraph, after the v2.1.325 sentence:
   ```
    As of v2.1.330, more rm commands aimed at the root, home, a top-level folder, or the working folder now ask for approval; where nobody can answer, they're refused.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Subprocess Sandboxing paragraph documents the v2.1.330 `rm` safety widening.
- HTML is valid (no unclosed tags).

## Status
Implemented.
