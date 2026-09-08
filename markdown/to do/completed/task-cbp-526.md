# CBP-526 — Add `--append-subagent-system-prompt-file` to CLI Launch Flags table

## Summary
Claude Code v2.1.261 added `--append-subagent-system-prompt-file`, a new CLI flag that reads the subagent system prompt from a file. This is useful for prompts too large to pass on the command line.

## Assessment
Not present in the playbook. The CLI Launch Flags table in `src/pages/practices.html` has a "System prompt & config" subsection. The closest existing flag is `--append-system-prompt` at line 2063. The new flag `--append-subagent-system-prompt-file` should be added after it.

## Plan
1. Edit `src/pages/practices.html`
2. After the `--append-system-prompt` row (line 2063), insert a new `<tr>` for `--append-subagent-system-prompt-file`

## Insertion point (after line 2063)
```html
          <tr><td><code>--append-subagent-system-prompt-file &lt;path&gt;</code></td><td>Read the subagent system prompt from a file — useful for prompts too large to pass on the command line (v2.1.261).</td></tr>
```

## Acceptance Criteria
- `--append-subagent-system-prompt-file` appears in the CLI Launch Flags table, after `--append-system-prompt`
- Description explains it reads from a file for large prompts
- Version tag v2.1.261 present
