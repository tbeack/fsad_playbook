# CBP-142 — Add `terminalSequence` hook output field

## Summary
Claude Code v2.1.141 added a `terminalSequence` field to hook JSON output. When a hook returns JSON containing `terminalSequence`, Claude Code will emit that string directly to the terminal — enabling hooks to send desktop notifications (via OSC codes), update window titles, ring the bell, or produce other terminal effects without needing a controlling TTY.

## Assessment
The playbook's Hooks Deep Dive has an "Exit Codes & Decision Control" collapsible (around line 7262) that documents hook output options including `hookSpecificOutput.updatedToolOutput` (PostToolUse output replacement) and `continueOnBlock`. The `terminalSequence` field is a new top-level hook output field that belongs in the same collapsible, alongside these existing output options.

No current mention of `terminalSequence` exists in the playbook.

## Plan
1. Read lines 7312–7342 (PostToolUse output replacement + continueOnBlock section) in `fsad-playbook.html`
2. After the `continueOnBlock` paragraph (after line 7341, before the closing `</div></div>` at 7342), insert a new paragraph block documenting `terminalSequence`
3. The new block should show a code example of a hook returning `terminalSequence` with an OSC bell or title-set sequence, plus an explanatory note

## HTML to insert (after the continueOnBlock paragraph block, before line 7342)
```html

        <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:1.25rem; margin-bottom:0.5rem;"><strong>Hook <code>terminalSequence</code> output</strong> — emit terminal escape codes without a controlling TTY:</p>
        <div class="code-block" style="margin-top:0.5rem;">
          <pre><code class="language-json">{
  "terminalSequence": ""
}</code></pre>
        </div>
        <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">Return a <code>terminalSequence</code> string from any hook (exit 0) to have Claude Code emit it directly to the terminal. Use OSC sequences to trigger desktop notifications, update the window title, or ring the bell — even in headless or piped environments where the hook script itself has no TTY. Example values: <code>""</code> (BEL bell), <code>"]0;My Title"</code> (set window title), <code>"]9;Task done"</code> (iTerm2 desktop notification).</p>
```

## Acceptance Criteria
- The playbook shows a `terminalSequence` block in the Exit Codes & Decision Control collapsible
- The block includes a code example and explanatory note with OSC sequence examples
- No existing content is changed or removed
