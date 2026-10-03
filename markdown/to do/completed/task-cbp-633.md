# CBP-633: Document "You Should Know" built-in mod in Plugins section (v2.1.287)

## Summary

Claude Code v2.1.287 added "Claude Mods" — a new plugin category that lets plugins modify deeper behavior. The first shipped mod is "You Should Know" (`cc-plugin-you-should-know@builtin`), a side agent that watches for things you or Claude might miss during a session. It requires a first-party session with telemetry enabled.

## Assessment

The Plugins section in `src/pages/practices.html` (around line 2655–2710) has a detailed bullet list of plugin commands and features. The list does not mention Claude Mods or the `cc-plugin-you-should-know@builtin` plugin. This is new content.

## Plan

1. Open `src/pages/practices.html`.
2. Find the last `<li>` in the plugins bullet list (the item ending with "no more scrolling through long lists (v2.1.172)").
3. Insert a new `<li>` bullet **before** the closing `</ul>` of that list, describing Claude Mods and the You Should Know mod.

### New bullet to add (before the closing `</ul>`):

```html
          <li><strong>Claude Mods</strong> — Plugins may modify deeper Claude Code behavior via the Mods category. The first built-in mod is <strong>You Should Know</strong>: a background side-agent that watches your session and flags things you or Claude might miss. Enable it with <code>/plugin enable cc-plugin-you-should-know@builtin</code> — requires a first-party session with telemetry on (v2.1.287).</li>
```

## Acceptance Criteria

- A new bullet appears in the Plugins list describing Claude Mods.
- The bullet includes the exact command `/plugin enable cc-plugin-you-should-know@builtin`.
- The bullet notes the telemetry/first-party session requirement.
- No existing bullets are altered.
