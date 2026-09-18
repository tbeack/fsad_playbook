# CBP-549 — Add WebFetch/Artifact permission rule separation note (v2.1.268)

## Summary

Claude Code v2.1.268 changed permission rule behavior: plain `WebFetch` deny and ask rules no longer apply to Artifact tool reads and updates. To block or gate Artifact reads, use an `Artifact` rule (or `WebFetch(domain:claude.ai)`).

## Assessment

The Notable Settings permission rules section (src/pages/practices.html around lines 631-653) has several `<li>` bullets about permission rule behavior. The last two relevant permission bullets are:
- Line 644: "Permission rule startup warnings for Write / NotebookEdit / Glob"
- Line 653: "Bash allow-rule wildcard-before-subcommand warning"

This is the right section to add a new bullet about the WebFetch/Artifact rule separation. Insert after line 653 (the Bash wildcard warning bullet), before line 654 (`feedbackDrafts`).

## Plan

Insert a new `<li>` after the Bash wildcard-before-subcommand bullet (line 653):

```html
        <li style="margin-bottom:0.4rem;"><strong>WebFetch rules do not gate Artifact reads (v2.1.268)</strong> — Plain <code>WebFetch</code> deny and ask permission rules no longer apply to Artifact tool reads and updates. To block or gate Artifact access, use an <code>Artifact</code> rule, or scope a WebFetch rule to the artifact host: <code>WebFetch(domain:claude.ai)</code>. This prevents unintentionally wide WebFetch rules from also blocking artifact operations.</li>
```

## Acceptance Criteria

- Notable Settings list contains a bullet about WebFetch/Artifact rule separation after the Bash wildcard note
- Bullet explains the workaround: `Artifact` rule or `WebFetch(domain:claude.ai)`
