# CBP-600: Add `--system-prompt-file` / `--append-system-prompt-file` flags + self-hosted runner compat note (v2.1.281)

## Summary

v2.1.281 changed self-hosted runners to pass system prompts to Claude Code as private files instead of command-line text, so large prompts no longer fail the launch. A wrapper or `command` hook that appends `--system-prompt` or `--append-system-prompt` must switch to the new `--system-prompt-file` or `--append-system-prompt-file` flags.

## Assessment

`src/pages/practices.html`'s System prompt & config table (~line 2074-2077) documents `--system-prompt`, `--append-system-prompt`, and the existing `--append-subagent-system-prompt-file <path>` flag but not the new top-level file-based flags. The Self-Hosted Runner collapsible (~line 2540) is where readers running automation would look for the migration note.

## Plan

1. In the System prompt & config table in `src/pages/practices.html`, add two new rows after the `--append-subagent-system-prompt-file` row (~line 2077):

```html
<tr><td><code>--system-prompt-file &lt;path&gt;</code></td><td>Replace the entire system prompt, read from a file instead of the command line — required for self-hosted runner wrappers/hooks that previously used <code>--system-prompt</code> directly with large prompt text (v2.1.281).</td></tr>
<tr><td><code>--append-system-prompt-file &lt;path&gt;</code></td><td>Append to the default system prompt, read from a file instead of the command line — required for self-hosted runner wrappers/hooks that previously used <code>--append-system-prompt</code> directly with large prompt text (v2.1.281).</td></tr>
```

2. In the Self-Hosted Runner collapsible in `src/pages/practices.html` (after the paragraph ending "...Available on Team and Enterprise plans (v2.1.224)." at ~line 2547), append a sentence:

```html
As of v2.1.281, self-hosted runners pass system prompts to Claude Code as private files instead of command-line text, so large prompts no longer fail the launch — a wrapper or <code>command</code> hook that appends <code>--system-prompt</code> or <code>--append-system-prompt</code> must switch to <code>--system-prompt-file</code> or <code>--append-system-prompt-file</code>.
```

## Acceptance Criteria

- The System prompt & config table includes both new file-based flags with accurate descriptions.
- The Self-Hosted Runner collapsible notes the breaking change for wrappers/hooks using the old flags.
