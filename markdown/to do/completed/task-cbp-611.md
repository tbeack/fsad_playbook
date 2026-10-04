# CBP-611: Document auto mode as the default starting permission mode (every plan/provider) (v2.1.284)

## Summary

v2.1.284 changed interactive terminal and VS Code sessions to start in **auto mode** when no permission mode is configured, on every plan and provider; `permissions.defaultMode` still overrides it. This extends the Bedrock/Vertex/Foundry-only auto-mode default introduced in v2.1.207 (already documented via `disableAutoMode`, ~line 643) to every surface and plan.

## Assessment

- `src/pages/practices.html`'s "Permission Modes" section (~line 2099-2123) has cards describing each mode plus a line noting the `Shift+Tab` cycle order. It does not currently say which mode a session starts in by default, so it's stale after this change.
- The existing `disableAutoMode` bullet (~line 643, in Notable settings.json Keys) documents the earlier, narrower rollout (auto mode default on Bedrock/Vertex/Foundry only, v2.1.207) — this task adds the v2.1.284 broadening as a new callout in the Permission Modes section rather than editing that older, platform-specific bullet, since the new behavior is about interactive terminal/VS Code sessions on every plan/provider, not those three cloud platforms specifically.

## Plan

1. In `src/pages/practices.html`, after the "Cycle with `Shift+Tab`" line (~line 2123) in the Permission Modes section, add a new callout:
   ```html
   <div class="callout callout-tip" style="margin-top:0.75rem;">
     <div class="callout-title">Auto Mode Is Now the Default Starting Mode</div>
     <p>As of v2.1.284, interactive terminal and VS Code sessions start in <strong>auto</strong> mode when no permission mode is configured — on every plan and provider, not just Bedrock/Vertex/Foundry (auto mode's cloud-provider default since v2.1.207). Set <code>permissions.defaultMode</code> in <code>settings.json</code> to start sessions in a different mode instead.</p>
   </div>
   ```

## Acceptance Criteria

- The Permission Modes section documents that auto mode is now the default starting mode everywhere (v2.1.284), and how to override it via `permissions.defaultMode`.
