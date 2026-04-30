# desktop-tauri-vulnerable — Test Fixture

**DO NOT DEPLOY.** Deliberately-vulnerable Tauri fixture mirroring the classes of findings surfaced against `recall` during CBP-060 validation.

## Planted vulnerabilities

| # | Root issue | Specialist | Severity | Location |
|---|---|---|---|---|
| 1 | `csp-null` | frontend-security-auditor (fallback: data-exposure-auditor) | high | `src-tauri/tauri.conf.json:9` |
| 2 | `unscoped-sql-capability` | auth-authz-auditor | high | `src-tauri/capabilities/default.json:6-11` |
| 3 | `plaintext-sqlite-no-sqlcipher` | secrets-crypto-auditor | high | `src-tauri/Cargo.toml:14`, `src-tauri/src/lib.rs:14` |
| 4 | `wal-plaintext-sidecars` | data-exposure-auditor | medium | `src-tauri/src/db/schema.sql:2` |
| 5 | `empty-invoke-handler-no-gate` | auth-authz-auditor | medium | `src-tauri/src/lib.rs:17` |
| 6 | `unused-plugin-opener-dep` | auth-authz-auditor | low | `src-tauri/Cargo.toml:16` |
| 7 | `startup-panic-on-error` | silent-failure-hunter | low | `src-tauri/src/lib.rs:19` |
| 8 | `scaffold-default-cargo-metadata` | dependency-supplychain-auditor | low | `src-tauri/Cargo.toml:5-6` |

See `../webapp-express-vulnerable/README-FIXTURE.md` for harness assertion semantics.
