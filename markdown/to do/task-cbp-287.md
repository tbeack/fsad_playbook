# CBP-287 — [Claude] Update model table + aliases: Claude Sonnet 5 as new default (v2.1.197)

## Summary
Claude Code v2.1.197 introduced Claude Sonnet 5 as the new default model. It has a native 1M-token context window and promotional pricing of $2/$10 per MTok through August 31, 2026.

## Assessment
The playbook's Models section (page-practices, model selection subsection) currently shows:
- Model comparison table: Fable 5, Opus 4.8, Opus 4.7, Sonnet 4.6, Haiku 4.5 (lines ~9695–9709)
- Model alias table row: `sonnet` → "Latest Sonnet (4.6 on API; 4.5 on Bedrock / Vertex / Foundry)" (line ~9720)
- Model alias table row: `default` → mentions Sonnet 4.6 for API/Pro/Enterprise users (line ~9717)
- Effort level callout mentions "Sonnet 4.6" explicitly (line ~9798)

Claude Sonnet 5 is NOT in the playbook at all. This is a high-impact gap — it's now the default model.

## Plan
1. Update `sonnet` alias row (line ~9720): change to "Claude Sonnet 5 (as of v2.1.197; 4.5 on Bedrock / Vertex / Foundry)" with the $2/$10 promotional pricing note.
2. Update `default` alias row (line ~9717): change "Sonnet 4.6" references to "Sonnet 5" for API/Pro/Team Std/Enterprise users.
3. Update the effort level callout (line ~9798): update "Sonnet 4.6" references to include Sonnet 5 where relevant.

Note: Rather than redesigning the 5-column model comparison table, add a callout note about Sonnet 5 immediately after the table.

## Acceptance Criteria
- `sonnet` alias row reflects Sonnet 5 as the new default
- `default` alias row updated for API/Pro/Enterprise to Sonnet 5
- A brief note exists indicating Sonnet 5 is now the Claude Code default with promotional pricing
- No Sonnet 4.6 references remain as "the current default"
