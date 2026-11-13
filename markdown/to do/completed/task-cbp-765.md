# CBP-765: [Claude] Add Bash allow-rule wildcard-in-variable-value warning (v2.1.323)

## Summary
Claude Code v2.1.323 added a start-up warning for Bash allow rules with a `*` in a variable's value, such as `Bash(PORT=* npm run dev)`.

## Assessment
`src/pages/practices.html`'s "Notable `settings.json` Keys" callout (~line 613-669) already documents a related but distinct startup warning at ~line 658: "Bash allow-rule wildcard-before-subcommand warning" (v2.1.246), which covers a wildcard positioned *before* the subcommand (e.g. `Bash(git * main)`). The new v2.1.323 warning covers a different pitfall — a wildcard inside a variable assignment's *value* (e.g. `Bash(PORT=* npm run dev)`), which can unintentionally widen the rule to match any value assigned to that variable. These are sibling warnings about different wildcard-placement footguns in the same permission-rule syntax, so the new one belongs immediately after the existing one.

## Plan
1. Open `src/pages/practices.html`.
2. In the "Notable `settings.json` Keys" list, immediately after the "Bash allow-rule wildcard-before-subcommand warning" `<li>` (~line 658), insert:
   ```html
   <li style="margin-bottom:0.4rem;"><strong>Bash allow-rule wildcard-in-variable-value warning</strong> — As of v2.1.323, Claude Code also logs a startup warning for Bash permission rules with a wildcard inside a variable's value, e.g. <code>Bash(PORT=* npm run dev)</code> — such a rule matches the command regardless of what value is assigned to <code>PORT</code>, unintentionally widening what the rule allows. Pin the variable to a specific value, or drop it from the rule, to scope the rule precisely.</li>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Notable `settings.json` Keys list documents the new wildcard-in-variable-value startup warning, immediately after the existing wildcard-before-subcommand warning bullet.
- HTML is valid (no unclosed tags).
