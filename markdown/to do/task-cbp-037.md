# CBP-037 — Update Skills "Programmatic" card for built-in Skill tool discovery

## Summary
Claude Code v2.1.108 expanded what the Skill tool can do: the model itself (not just subagents/API integrations) can now discover and invoke built-in slash commands like `/init`, `/review`, and `/security-review` via the Skill tool. The current playbook text at line 4008 only says "Subagents and API integrations invoke skills via the Skill tool."

## Assessment
- **Existing coverage**: Line 4008 describes the Programmatic invocation mode for skills but is incomplete — it omits that Claude itself can discover and invoke built-in commands this way.
- **Target location**: Line 4008 in the "Programmatic" card in the Building Skills section.

## Plan

1. Read `fsad-playbook.html` lines 4002–4015 to confirm the card structure.
2. Update the "Programmatic" card `<p>` text from:
   > "Subagents and API integrations invoke skills via the Skill tool. Skills can also run in isolated context with `context: fork`."
   
   To:
   > "Subagents and API integrations invoke skills via the Skill tool. Claude itself can also discover and invoke built-in commands (like `/init`, `/review`, `/security-review`) this way. Skills can also run in isolated context with `context: fork`."

3. Mark task complete in todo.md.

## Acceptance Criteria
- The "Programmatic" card mentions that Claude (not just subagents) can discover built-in slash commands via the Skill tool.
- Examples `/init`, `/review`, `/security-review` are included.
- No other content in the card changes.
