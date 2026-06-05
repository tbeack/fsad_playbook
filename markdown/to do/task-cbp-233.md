# CBP-233 — Update skills substitution note: \$ escape syntax for literal dollar sign (v2.1.163)

## Summary

Claude Code v2.1.163 added a `\$` escape syntax to skill command bodies. When a skill command body contains `\$` followed by a digit, the backslash-dollar is interpreted as a literal `$` and the digit is not treated as an argument substitution placeholder. This allows skills to embed literal shell variable references like `$1`, `$2` in generated scripts without triggering skill argument substitution.

## Assessment

**Does this content exist in the playbook?**

- Line 9012: The skills string substitutions paragraph currently reads: "**String substitutions:** `$ARGUMENTS` (all args), `$0` / `$1` (specific args), `${CLAUDE_SKILL_DIR}` (skill directory), `${CLAUDE_SESSION_ID}` (session ID), `${CLAUDE_EFFORT}` (current effort level — lets a skill branch on `low` / `medium` / `high` / `xhigh` / `max`)."

There is no mention of the `\$` escape sequence. This is a gap — users who try to include literal `$1` (e.g., in a generated shell script) will see it consumed as a skill argument substitution placeholder instead.

**What needs to change:** Append a note about `\$` escape to the string substitutions line.

## Plan

### Step 1: Update string substitutions note (line 9012)

Current:
```html
<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:1rem;"><strong>String substitutions:</strong> <code>$ARGUMENTS</code> (all args), <code>$0</code> / <code>$1</code> (specific args), <code>${CLAUDE_SKILL_DIR}</code> (skill directory), <code>${CLAUDE_SESSION_ID}</code> (session ID), <code>${CLAUDE_EFFORT}</code> (current effort level — lets a skill branch on <code>low</code> / <code>medium</code> / <code>high</code> / <code>xhigh</code> / <code>max</code>).</p>
```

New — append escape note at end:
```html
<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:1rem;"><strong>String substitutions:</strong> <code>$ARGUMENTS</code> (all args), <code>$0</code> / <code>$1</code> (specific args), <code>${CLAUDE_SKILL_DIR}</code> (skill directory), <code>${CLAUDE_SESSION_ID}</code> (session ID), <code>${CLAUDE_EFFORT}</code> (current effort level — lets a skill branch on <code>low</code> / <code>medium</code> / <code>high</code> / <code>xhigh</code> / <code>max</code>). Use <code>\$</code> to include a literal <code>$</code> before a digit (e.g. <code>\$1</code> in generated shell scripts) without triggering argument substitution.</p>
```

## Acceptance Criteria

- The string substitutions paragraph includes the `\$` escape syntax note
- The existing substitution variables are all preserved unchanged
- No other lines are affected
