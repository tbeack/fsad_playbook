# CBP-466 — Config: Bash allow-rule wildcard-before-subcommand startup warning

## Summary
Claude Code v2.1.246 added a startup warning for Bash permission allow rules with a wildcard before the subcommand (e.g. `Bash(git * main)`), since such rules also match options inserted before the subcommand — a pattern that can unintentionally widen the allow rule's scope.

## Assessment
The Notable settings.json Keys callout (in `#config-cascade`) already documents a closely related v2.1.210 startup warning for `Write(path)` / `NotebookEdit(path)` / `Glob(path)` permission rules (line 10470) — this is the established pattern for permission-rule-hygiene warnings in the playbook. The new v2.1.246 warning is a distinct case (wildcard placement in Bash rules) with no existing coverage.

## Plan
1. In `fsad-playbook.html`, locate the last two `<li>` items in the Notable settings.json Keys callout (lines 10476–10478):
   ```html
        <li style="margin-bottom:0.4rem;"><code>modelPicker</code> — Curate the <code>/model</code> picker with an ordered, labeled list of models (any id spelling, including Vertex/Bedrock ids) — append to or replace the built-in lineup (v2.1.243).</li>
        <li style="margin-bottom:0;"><code>modelPricing</code> — Managed setting: use an organization's contracted per-model rates and discount multiplier for <code>/cost</code>, the status line, and telemetry cost figures instead of list price. Configure via org/MDM managed settings (v2.1.243).</li>
      </ul>
   ```
2. Change `modelPricing`'s `margin-bottom:0` to `margin-bottom:0.4rem` and append a new final bullet:
   ```html
        <li style="margin-bottom:0.4rem;"><code>modelPicker</code> — Curate the <code>/model</code> picker with an ordered, labeled list of models (any id spelling, including Vertex/Bedrock ids) — append to or replace the built-in lineup (v2.1.243).</li>
        <li style="margin-bottom:0.4rem;"><code>modelPricing</code> — Managed setting: use an organization's contracted per-model rates and discount multiplier for <code>/cost</code>, the status line, and telemetry cost figures instead of list price. Configure via org/MDM managed settings (v2.1.243).</li>
        <li style="margin-bottom:0;"><strong>Bash allow-rule wildcard-before-subcommand warning</strong> — As of v2.1.246, Claude Code logs a startup warning for Bash permission rules with a wildcard positioned before the subcommand (e.g. <code>Bash(git * main)</code>), because such rules also match options inserted before the subcommand — unintentionally widening what the rule allows. Place wildcards after the subcommand (e.g. <code>Bash(git commit *)</code>) to scope the rule precisely.</li>
      </ul>
   ```

## Acceptance Criteria
- [ ] New bullet documents the v2.1.246 Bash wildcard-before-subcommand startup warning, with an example of the safer pattern.
- [ ] `modelPricing` bullet's `margin-bottom` is restored to `0.4rem` and the new bullet carries `margin-bottom:0`.
- [ ] `<ul>` remains well-formed.
