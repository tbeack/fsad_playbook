# CBP-569 — Extend Subprocess Sandboxing paragraph: special shell-variable Bash checks + worktree nested-expansion refusal (v2.1.274)

**Source:** Claude Code v2.1.274
**Tag:** [Claude]

## Summary
v2.1.274 tightens Bash permission checking in two ways:
- Commands that loop over or assign certain special shell variables now ask for permission (previously could skip the check).
- Worktree-isolated sessions now refuse Bash commands with certain nested shell expansions that were previously accepted.

## Assessment
The Subprocess Sandboxing collapsible's opening paragraph in `src/pages/practices.html` (line 2762) already documents a running list of permission-check tightenings by version (zsh conditionals in v2.1.238, dangling `&&`/`||` in v2.1.246, `rm -rf` on positional params in v2.1.261, per-command `allowed_domains` in v2.1.271). This follows the same pattern — append two more sentences for v2.1.274.

## Plan
1. Open `src/pages/practices.html`
2. Find the end of the paragraph at line 2762, which currently ends:
   ```
   ...the hosts a specific command needs are reviewed with it and opened for that command alone, instead of widening the session's whole domain allowlist.</p>
   ```
3. Insert before the closing `</p>`:
   ```html
    As of v2.1.274, Bash commands that loop over or assign certain special shell variables now require approval, closing another gap in permission-check coverage. As of v2.1.274, worktree-isolated sessions also refuse Bash commands containing certain nested shell expansions that were previously accepted.
   ```
4. Mark CBP-569 complete in `markdown/to do/todo.md`

## Acceptance Criteria
- The paragraph at line 2762 notes both v2.1.274 tightenings
- Build passes without errors
