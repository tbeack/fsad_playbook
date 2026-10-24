# CBP-716 — Update Monitor Tool section for Bedrock/Vertex/Foundry availability (v2.1.310)

## Summary

Claude Code v2.1.310 added Monitor tool and plugin monitor support on Bedrock, Vertex, and Foundry (and in sessions with telemetry or nonessential traffic disabled). Long foreground sleeps are also blocked on those platforms now. Previously, Monitor only worked in standard interactive sessions.

## Assessment

The Monitor Tool collapsible exists at `src/pages/practices.html`, `id="power-usage--monitor-tool"` (around line 2681). The current paragraph mentions v2.1.260 and v2.1.271 changes but says nothing about platform availability. No mention of Bedrock, Vertex, or Foundry exists anywhere in the Monitor tool section.

**Action: Update existing** — append a sentence to the Monitor tool description paragraph.

## Plan

1. Open `src/pages/practices.html`.
2. Find the Monitor tool paragraph (ends with `...replacing the previous no-timeout <code>persistent</code> option.`).
3. Append this sentence before the closing `</p>`:

```
 As of v2.1.310, the Monitor tool and plugin monitors also work on Bedrock, Vertex, and Foundry, and in sessions with telemetry or nonessential traffic disabled; long foreground sleeps are blocked on those platforms too.
```

4. Mark task complete in `todo.md`.

## Acceptance Criteria

- The Monitor Tool paragraph contains "v2.1.310" and "Bedrock, Vertex, and Foundry".
- No other content is changed.
- `build-source.py` and `build-dist.py` run without errors.
