# CBP-092 — Update `--dangerously-skip-permissions` Cheat Sheet description

## Summary
In v2.1.126, `--dangerously-skip-permissions` was expanded to bypass prompts for writes to `.claude/`, `.git/`, `.vscode/`, shell config files, and other previously-protected paths. Catastrophic removal commands (like `rm -rf /`) still prompt as a safety net.

In v2.1.121, it was also updated to no longer prompt for `.claude/skills/`, `.claude/agents/`, and `.claude/commands/`.

## Assessment
The current Cheat Sheet description at line 6311 reads:
```
Skip all permission prompts (requires opt-in flag)
```

This is incomplete — it doesn't mention the expanded path coverage or the safety-net caveat for catastrophic commands. The Power Usage section at line 6372 has a note that says "Zero guardrails. CI/CD and trusted automation only." but that language is also slightly outdated now that catastrophic commands still prompt.

## Plan
1. Read lines 6308–6314 to confirm the exact current text.
2. Update the `--dangerously-skip-permissions` row description to reflect expanded path coverage and safety net.
3. Also update the Power Usage callout at line 6372 to note the safety net.

### Updated row description
```
Skip all permission prompts — including writes to .claude/, .git/, .vscode/, and shell config files. Catastrophic removal commands still prompt as a safety net. CI/CD and trusted automation only.
```

## Acceptance Criteria
- The `--dangerously-skip-permissions` Cheat Sheet row accurately reflects the expanded bypass and safety-net caveat
- The Power Usage callout (if present) is updated or consistent
- No other rows are changed
