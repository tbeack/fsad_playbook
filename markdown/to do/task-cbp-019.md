# CBP-019 — Add --exclude-dynamic-system-prompt-sections Flag to Cheat Sheet

## Summary
Claude Code v2.1.98 added `--exclude-dynamic-system-prompt-sections` to print mode. This flag strips dynamic sections from the system prompt, enabling cross-user prompt caching — meaning teams running the same automation can share cached prompts across users. Currently missing from the Cheat Sheet's "Print / programmatic mode" flags table.

## Assessment
The print/programmatic mode flags table (lines 3896–3908) has 6 entries. This new flag fits naturally there as it's exclusively relevant to print mode scripting.

## Plan

1. Read lines 3895–3910 (print mode flags table)
2. Add the new flag row after `--max-budget-usd`:
   ```html
   <tr><td><code>--exclude-dynamic-system-prompt-sections</code></td><td>Strip dynamic prompt sections to enable cross-user prompt cache sharing</td></tr>
   ```

## Acceptance Criteria
- [ ] `--exclude-dynamic-system-prompt-sections` appears in the print/programmatic mode flags table
- [ ] Description explains the prompt caching benefit
- [ ] Row matches existing pattern
