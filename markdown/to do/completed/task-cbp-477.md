# CBP-477 — Sonnet 5's auto-compact window widened to its full 1M context

## Summary
Claude Code v2.1.247 changed Sonnet 5's default auto-compact window to its full 1M context, so sessions on the 1M window now auto-compact at about 967K tokens instead of about 934K.

## Assessment
The Context Management collapsible in Power Usage (`src/pages/practices.html` ~line 2676-2681) has a bullet list tracking auto-compact behavior, including the v2.1.235 "toggleable in /config" bullet. This is the natural home for the new threshold — append a bullet there rather than the `CLAUDE_CODE_DISABLE_1M_CONTEXT` env var row, which covers holding 1M models to 200K (opt-out), not the default 1M threshold itself.

## Plan
1. In `src/pages/practices.html`, locate the Context Management bullet list (~line 2676-2681).
2. Append a new bullet after the existing v2.1.235 auto-compact bullet:
   ```html
   <li>Sonnet 5's default auto-compact window now uses its full 1M-token context — sessions on the 1M window auto-compact at about 967K tokens instead of about 934K (v2.1.247)</li>
   ```

## Acceptance Criteria
- [x] v2.1.247 967K/934K auto-compact threshold change documented in the Context Management bullet list.
