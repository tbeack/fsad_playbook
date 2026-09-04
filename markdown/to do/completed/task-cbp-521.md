# CBP-521 — Add 1M Auto-Compact Bullet for Opus/Fable

## Source
Claude Code v2.1.260

## Summary
v2.1.260 improves auto-compact for 1M-context models: Opus and Fable sessions now compact shortly before the 1M-token limit, and recovery compaction on very large contexts no longer times out at 10 minutes.

## Assessment
`src/pages/practices.html` context-management list (lines 2699–2705) has a v2.1.247 bullet about Sonnet 5's 1M auto-compact window but nothing for Opus/Fable. Update existing (new bullet).

## Plan
1. Read lines 2699–2705.
2. Add after line 2704:
   ```html
   <li>Opus and Fable sessions on the 1M window now auto-compact shortly before the 1M-token limit, and recovery compaction on very large contexts no longer times out at 10 minutes (v2.1.260)</li>
   ```

## Acceptance Criteria
- New bullet present with v2.1.260 attribution
- HTML is valid
