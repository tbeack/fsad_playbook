# CBP-768 — Add model provider browser and custom provider editing from TUI, plus `tui.notification_method` config entry (rust-v0.168.0 + rust-v0.169.0)

## Summary

Codex rust-v0.168.0 adds a provider browser under Sessions → Model providers: browse all configured providers and set the default for new chats from the TUI. Rust-v0.169.0 adds the ability to add or edit custom model providers from the terminal, with device-code support for SSH/headless environments.

Rust-v0.168.0 also adds `tui.notification_method = "osc777"` for OSC 777 terminal notifications. Approval notifications show longer command previews and distinguish terminal input from network access requests.

## Assessment

The Multi-Provider Models section (around line 1360) covers providers via config.toml but says nothing about the TUI provider browser or in-terminal editing. The config.toml table (around line 1070) has a `tui.auto_recap` row but no `tui.notification_method` row.

## Plan

1. After the Multi-Provider Models table (after the closing `</table>` and before the callout div), add a paragraph describing:
   - Sessions → Model providers: browse providers, set default for new chats (rust-v0.168.0)
   - Add/edit custom providers from the terminal with device-code for SSH/headless (rust-v0.169.0)

2. In the config.toml table, add a new row for `tui.notification_method` after the `tui.auto_recap` row:
   - Key: `tui.notification_method`
   - Purpose: Terminal notification method. Set to `"osc777"` for OSC 777 notifications; approval notifications include longer command previews and distinguish terminal input from network access requests (rust-v0.168.0).
   - Default: —

## Acceptance Criteria

- Multi-Provider section mentions the TUI provider browser (rust-v0.168.0) and in-terminal custom provider editing with device-code (rust-v0.169.0).
- The config.toml table has a `tui.notification_method` row.
