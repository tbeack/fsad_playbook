# CBP-329: Add frontmatter boolean values note — `yes`/`no`/`on`/`off`/`1`/`0` accepted (v2.1.218)

## Summary
Claude Code v2.1.218 added `yes`/`no`/`on`/`off`/`1`/`0` (case-insensitive) as accepted values for skill and plugin frontmatter boolean fields, alongside the existing `true`/`false`.

## Assessment
The frontmatter reference table in the Building Skills section has a note at ~line 9414 about key casing (`display-name`, `default-enabled`, etc. accept kebab/snake/camelCase). Boolean fields like `disable-model-invocation` and `user-invocable` are documented in the table but the accepted value set isn't explicitly stated. Adding a brief note after the existing key-casing paragraph (or appending it to that paragraph) is the right approach.

## Plan
1. Open `fsad-playbook.html`.
2. Locate the frontmatter key casing paragraph at ~line 9414.
3. Append a sentence about accepted boolean values, or add as a separate `<p>` tag after it.

## Exact change

The simplest approach is to append to the existing key casing paragraph at ~line 9414. Currently it ends with: `...loads the skill body with empty metadata instead of failing silently.</p>`

Append before the closing `</p>`:
```
 <strong>Boolean values (v2.1.218):</strong> Frontmatter boolean fields (e.g., <code>disable-model-invocation</code>, <code>user-invocable</code>) accept <code>yes</code>/<code>no</code>, <code>on</code>/<code>off</code>, and <code>1</code>/<code>0</code> (case-insensitive) in addition to <code>true</code>/<code>false</code>.
```

## Acceptance Criteria
- A note about extended boolean values appears in the frontmatter reference section.
- The note lists all accepted forms: `yes`/`no`, `on`/`off`, `1`/`0`, `true`/`false`.
- The version reference v2.1.218 is included.
- No HTML formatting is broken.
