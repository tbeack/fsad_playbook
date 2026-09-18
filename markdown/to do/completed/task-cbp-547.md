# CBP-547 — Update Todo Tools card with precise model list (v2.1.268)

## Summary

Claude Code v2.1.268 refined the task-tracking tools (TaskCreate/Get/Update/List, TodoWrite) availability: now specified as offered only on Claude 3.x, Opus 4.0–4.7, Sonnet 4.0–4.6, Haiku 4.5. Set `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` to enable on other models.

## Assessment

Current card (src/pages/practices.html lines 1621-1624):
```html
<div class="card ">
  <h3>Todo Tools Are Opt-In on Newer Models</h3>
  <p>TaskCreate, TaskUpdate, TaskList, and TodoWrite are no longer available by default on Opus 4.8, Sonnet 5, Fable 5, Mythos 5, and newer models (v2.1.233). Set <code>CLAUDE_CODE_ENABLE_TODO_TOOLS=1</code> to restore them.</p>
</div>
```

The current note uses a negative framing ("not available on X"). v2.1.268 provides a precise positive list of supported models. Update to use both: the specific models they ARE available on, plus the env var for other models.

## Plan

Edit lines 1622-1623 of src/pages/practices.html:

Old `<p>`:
```
TaskCreate, TaskUpdate, TaskList, and TodoWrite are no longer available by default on Opus 4.8, Sonnet 5, Fable 5, Mythos 5, and newer models (v2.1.233). Set <code>CLAUDE_CODE_ENABLE_TODO_TOOLS=1</code> to restore them.
```

New `<p>`:
```
TaskCreate, TaskGet, TaskUpdate, TaskList, and TodoWrite are available by default only on Claude 3.x, Opus 4.0–4.7, Sonnet 4.0–4.6, and Haiku 4.5 (v2.1.268). Set <code>CLAUDE_CODE_ENABLE_TODO_TOOLS=1</code> to enable them on other models.
```

## Acceptance Criteria

- Todo Tools card uses the precise v2.1.268 model list (positive framing, includes TaskGet)
- `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` env var still mentioned
