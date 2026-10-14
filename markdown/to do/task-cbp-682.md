# CBP-682: Add `CLAUDE_CODE_DISABLE_FILE_MENTIONS` env var (v2.1.299)

## Summary
Claude Code v2.1.299 added `CLAUDE_CODE_DISABLE_FILE_MENTIONS`. When set, `@` file mentions pass the file path to Claude for it to read with its file tools. They do not inline the file contents into the prompt. This reduces token use for large files and gives Claude control over when to read them.

## Assessment
The env vars table in `src/pages/practices.html` does not yet mention `CLAUDE_CODE_DISABLE_FILE_MENTIONS`. The @mention card at line 2095 says "Claude includes file contents automatically" — this is now optionally overridable and worth a brief note there too.

**Placement 1:** After line 2748 (`CLAUDE_CODE_WORKFLOW_SUBAGENT_MODEL`), add a new `<tr>` row in the env vars table.

**Placement 2:** Append a sentence to the @mention card at line 2096.

## Plan

### Step 1: Add env var row
In `src/pages/practices.html`, after the `CLAUDE_CODE_WORKFLOW_SUBAGENT_MODEL` row at line 2748, insert:

```html
<tr><td><code>CLAUDE_CODE_DISABLE_FILE_MENTIONS</code></td><td>When set, <code>@</code> file mentions pass the file path to Claude instead of inlining the file contents. Claude reads the file with its own tools when it needs the content. Use this to reduce prompt size for large files. (v2.1.299)</td></tr>
```

### Step 2: Update @mention card
In `src/pages/practices.html` at line 2096, append to the card's `<p>`:

Add after "Claude includes file contents automatically.":
` Set <code>CLAUDE_CODE_DISABLE_FILE_MENTIONS</code> to pass paths instead, so Claude reads files on demand (v2.1.299).`

## Acceptance Criteria
- The env vars table has a row for `CLAUDE_CODE_DISABLE_FILE_MENTIONS` with a clear description and version tag.
- The @mention card mentions the env var as a way to pass paths instead of contents.
- No surrounding rows are broken.
