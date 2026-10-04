# CBP-598: Extend Subprocess Sandboxing paragraph — dangerous-rm timeout + substitution-output rm prompt (v2.1.281)

## Summary

v2.1.281 made two dangerous-`rm` safety changes:
1. The dangerous-`rm` prompt in `--dangerously-skip-permissions` and auto mode now waits 2 minutes for an answer, then denies the command with a rewrite hint so unattended sessions keep going. `CLAUDE_CODE_DISABLE_DANGEROUS_RM_TIMEOUT=1` turns this off.
2. A recursive `rm` whose target is only command-substitution output (e.g. `rm -rf "$(pwd)"`) now prompts even with a matching Bash allow rule, unless run with `CLAUDE_CODE_DISABLE_SUBSTITUTION_RM_PROMPT=1` — closing a gap where this previously ran unprompted.

## Assessment

`src/pages/practices.html`'s Subprocess Sandboxing collapsible paragraph (~line 2768) already tracks the dangerous-`rm` safety-net history chronologically (v2.1.261 positional-parameter catch, etc.). Both new changes extend that same running sentence.

## Plan

Append two sentences to the end of the paragraph at ~line 2768 in `src/pages/practices.html`, after "...worktree-isolated sessions also refuse Bash commands containing certain nested shell expansions that were previously accepted.":

```html
As of v2.1.281, the dangerous-<code>rm</code> prompt in <code>--dangerously-skip-permissions</code> and auto mode waits 2 minutes for an answer, then denies the command with a rewrite hint so unattended sessions keep going (set <code>CLAUDE_CODE_DISABLE_DANGEROUS_RM_TIMEOUT=1</code> to turn this off). As of v2.1.281, a recursive <code>rm</code> whose target is only command-substitution output (e.g. <code>rm -rf "$(pwd)"</code>) now prompts even with a matching Bash allow rule, unless run with <code>CLAUDE_CODE_DISABLE_SUBSTITUTION_RM_PROMPT=1</code>.
```

## Acceptance Criteria

- The Subprocess Sandboxing paragraph documents the 2-minute dangerous-rm timeout/deny behavior and its opt-out env var.
- It also documents the command-substitution-output rm prompt closing and its opt-out env var.
