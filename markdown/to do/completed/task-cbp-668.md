# CBP-668 — [Claude] Add `onFailure: "block"` for command and HTTP hooks (v2.1.295)

## Summary
Claude Code v2.1.295 added an `onFailure: "block"` option for `command` and `http` hook types. When set, a hook that cannot start, times out, or exits with an unexpected code blocks the action instead of letting it through (fail-open is the default without this option).

## Assessment
Two places need updates in `src/pages/practices.html`:

1. The command hook example (near line 2928) shows `"type"`, `"command"`, `"timeout"` — no mention of `onFailure`. A note after the exec-form explanation paragraph should document this new option.

2. The HTTP Hooks callout (line 3471–3474) says "execution continues, it does not block" and "execution proceeds" — these statements are correct only when `onFailure: "block"` is absent. A note should clarify that `onFailure: "block"` changes this default.

## Plan
1. Read `src/pages/practices.html` lines 2920–2945 and 3465–3476 to confirm exact text.
2. After the exec-form note (line 2941), add a paragraph documenting `onFailure: "block"`.
3. In the HTTP Hooks callout (lines 3471, 3474), append a sentence clarifying that `onFailure: "block"` changes the fail-open default.

## Edit 1 — After exec-form explanation (line 2941)
After the `</p>` that ends the exec-form note, add:
```html
        <p style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.75rem; margin-bottom:0;"><strong><code>onFailure: "block"</code> (v2.1.295):</strong> By default, a hook that cannot start, times out, or exits with an unexpected code lets the action through (fail-open). Add <code>"onFailure": "block"</code> to any <code>command</code> or <code>http</code> hook to reverse this — the action is blocked when the hook fails. Use this for safety-critical gates where a silent failure must not let the action proceed.</p>
```

## Edit 2 — HTTP Hooks callout (line 3471)
Update line 3471 bullet to reference `onFailure: "block"`:
Append to the bullet: ` Set <code>"onFailure": "block"</code> on the hook to make errors blocking instead.`

## Acceptance Criteria
- The word "onFailure" appears in the hooks section of the playbook.
- The fail-open default is documented alongside its opt-out.
- No existing text is removed.
