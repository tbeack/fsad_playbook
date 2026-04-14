# CBP-027 — Update skill description character cap (250 → 1,536)

## Source
Claude Code v2.1.105: "Improved skill description handling: raised the listing cap from 250 to 1,536 characters and added a startup warning when descriptions are truncated."

## Summary
The Building Skills frontmatter reference table contains an outdated value. The `description` field row says "Truncated at 250 chars." — this was raised to 1,536 characters in v2.1.105.

## Assessment
Content exists and is incorrect. Needs a targeted one-field update.

**Location:** `fsad-playbook.html` line 3259

Current text:
```
What the skill does. Claude uses this for auto-invocation matching. Front-load the key use case. Truncated at 250 chars.
```

## Plan
1. Edit line 3259: change "Truncated at 250 chars." → "Truncated at 1,536 chars (startup warning shown when exceeded)."

## Acceptance Criteria
- [x] Frontmatter table shows "Truncated at 1,536 chars" for the `description` field
- [x] No other content changed
