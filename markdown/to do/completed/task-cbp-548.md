# CBP-548 — Add `CLAUDE_CODE_WEBFETCH_DEADLINE_MS` env var row (v2.1.268)

## Summary

Claude Code v2.1.268 added a hard timeout on WebFetch: fetches now fail after 300 seconds if the server keeps the response open indefinitely. A new `CLAUDE_CODE_WEBFETCH_DEADLINE_MS` env var overrides this deadline; set to `0` to disable.

## Assessment

The env vars table in src/pages/practices.html has `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS` at line 2821. The new deadline env var is related and should be added immediately after it (before line 2822 `CLAUDE_CODE_PROJECT_DIR_NAME`).

## Plan

Insert a new `<tr>` row after the `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS` row (after line 2821).

New row to insert:
```html
              <tr><td><code>CLAUDE_CODE_WEBFETCH_DEADLINE_MS</code></td><td>Hard timeout for WebFetch requests, in milliseconds. Default <code>300000</code> (300 seconds). A fetch is cancelled and fails if the server keeps the response open past this deadline — prevents Claude from hanging indefinitely on slow or stuck servers. Set to <code>0</code> to disable the timeout entirely (v2.1.268).</td></tr>
```

## Acceptance Criteria

- `CLAUDE_CODE_WEBFETCH_DEADLINE_MS` row appears in the env vars table, after `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS`
- Row mentions the 300-second default and how to disable it
