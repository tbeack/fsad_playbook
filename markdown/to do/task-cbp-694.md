# CBP-694 — Add model-switch summarization note to context management section (v2.1.301)

## Summary
Claude Code v2.1.301 improved switching to a model with a smaller context window. When a conversation is too long for the new model, the previous model now summarizes it first before the switch. This prevents cost surprises (the previous model writes the summary, not the new one) and ensures a clean transition.

## Assessment
The context management section in `src/pages/practices.html` (around line 2627–2652) covers auto-compact, idle compaction, and context window settings, but does not mention the model-switch summarization behavior. The idle compaction bullet at line 2652 is the most recent addition to this list. The new note should follow the idle compaction bullet.

## Plan
1. Read `src/pages/practices.html` around line 2650–2655.
2. After the idle compaction bullet (`<li>...</li>` at line 2652), add a new bullet:
   "Model-switch context summarization (v2.1.301): when you switch to a model with a smaller context window and the conversation is too long for the new model, the previous model summarizes the conversation first — the new model starts from a compact summary rather than a truncated context."

## Acceptance Criteria
- The context management section includes the model-switch summarization note.
- The note follows the idle compaction bullet.
- No other bullets or content are altered.
