# CBP-609: Add Sonnet 5.5 release entry to Key Dates callout (v2.1.284)

## Summary

The "Key Dates" callout tracks each new model's release with date, API ID, context/pricing, and the Claude Code version required. Sonnet 5.5 (v2.1.284) needs the same entry the Opus 5.5, Fable 5.1, Opus 5, and Fable 5 releases already have.

## Assessment

- `src/pages/practices.html`'s "Key Dates" callout (~line 1786-1798) lists releases in descending chronological order, most recent first. Sonnet 5.5 (released with v2.1.284, today's date) belongs at the top of the list, above the September 22, 2026 Opus 5.5 entry.

## Plan

1. In `src/pages/practices.html`, insert a new `<li>` at the top of the Key Dates list (~line 1789, before the Opus 5.5 entry):
   ```html
   <li><strong>September 29, 2026</strong> — <strong>Claude Sonnet 5.5 released</strong> (<code>claude-sonnet-5-5</code>). Now the default Sonnet model on the Anthropic API. 1M context; $2/$10 per MTok, $0.20/Mtok cache reads. Requires Claude Code v2.1.284+.</li>
   ```

## Acceptance Criteria

- The Key Dates callout lists the Sonnet 5.5 release first (most recent), matching the format of the existing entries.
