# CBP-704 — Document usage-limit warning on resuming inactive conversations

## Summary

Claude Code v2.1.304 adds a warning on Pro and Max plans when resuming an inactive conversation would use a noticeable share of the 5-hour usage limit: you can resume anyway, or start a new conversation and Claude can look up the previous one if you refer to it.

## Assessment

Not yet documented. The `/resume` row in `src/pages/practices.html` (line ~1774) is the natural anchor — it already documents several resume-time behaviors (stale-session summarization, PR URL jump, background sessions in the picker).

## Plan

1. Open `src/pages/practices.html`.
2. Find the `/resume` row (line ~1774).
3. Append a sentence to the end of its description cell:

```html
As of v2.1.304, on Pro and Max plans, resuming an inactive conversation that would use a noticeable share of your 5-hour usage limit shows a warning — resume anyway, or start a new conversation and Claude can look up the previous one if you refer to it.
```

4. Save the file.

## Acceptance Criteria

- The `/resume` row documents the new usage-limit warning and its two options.
- No other rows are affected.
