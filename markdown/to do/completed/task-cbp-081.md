# CBP-081 — Add a section on how Claude manages the KV cache, and provide guidance on setting the TTL in the Claude config

## Summary
The "Prompt Caching & KV Cache" collapsible (Power Usage section) already documents the KV cache mechanism and the two TTL env vars. What's missing is guidance on **how to persist these settings** via a config file rather than just referencing them as env vars. This task enhances the existing collapsible with a "Persisting your TTL setting" subsection showing the `.env` file approach and the shell-profile alternative.

## Assessment
The existing collapsible at `fsad-playbook.html` line 6991 covers:
- How the KV cache works (prefix-based, 10% input cost)
- What gets cached in a Claude Code session
- TTL env vars (`ENABLE_PROMPT_CACHING_1H`, `FORCE_PROMPT_CACHING_5M`)
- A "Choosing your TTL" comparison table
- A "Structuring Prompts for Maximum Cache Hits" callout

**Gap:** The section shows *what* the env vars are but not *where* to set them persistently. Claude Code reads `.env` files from the project root automatically, and a shell profile export works for global defaults. Neither is demonstrated.

**Location:** `fsad-playbook.html` — inside the `#power-usage--prompt-caching` collapsible, after the "Choosing your TTL" table (around line 7030) and before the existing "Structuring Prompts" callout.

## Plan

1. Read `fsad-playbook.html` lines 7020–7040 to confirm the exact insertion context.
2. After the "Choosing your TTL" `</div>` closing tag (end of the comparison table) and before the `<div class="callout callout-tip"` for "Structuring Prompts", insert a new subsection:

```html
        <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:1rem; margin-bottom:0.4rem;">Persisting your TTL setting</p>
        <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.8; margin-top:0;">Set the env var once in a <code>.env</code> file at the project root — Claude Code reads this file automatically at startup:</p>
        <pre style="margin:0.4rem 0 0.75rem;"><code class="language-bash"># .env  (project root — add to .gitignore)
ENABLE_PROMPT_CACHING_1H=1</code></pre>
        <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.8; margin-top:0;">For a global default across all projects, export from your shell profile (<code>~/.zshrc</code> or <code>~/.bashrc</code>):</p>
        <pre style="margin:0.4rem 0 0;"><code class="language-bash">export ENABLE_PROMPT_CACHING_1H=1</code></pre>
```

3. Run the build script (`python3 scripts/build-dist.py`) to regenerate `dist/fsad-playbook.html`.
4. Mark the task complete in `todo.md`.

All criteria verified 2026-05-13 before commit.

## Acceptance Criteria
- [x] The "Prompt Caching & KV Cache" collapsible includes a "Persisting your TTL setting" subsection.
- [x] A `.env` file code snippet is shown with `ENABLE_PROMPT_CACHING_1H=1`.
- [x] A shell-profile (`export`) alternative is shown.
- [x] The subsection is positioned between the "Choosing your TTL" table and the "Structuring Prompts" callout.
- [x] HTML style matches the surrounding secondary-text paragraphs and `<pre>` blocks in the file.
- [x] `dist/fsad-playbook.html` is rebuilt and in sync.
