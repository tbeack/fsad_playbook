// DELIBERATELY VULNERABLE fixture. Do not deploy.
use tauri_plugin_sql::{Builder as SqlBuilder, Migration, MigrationKind};

pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        description: "initial_schema",
        sql: include_str!("db/schema.sql"),
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .plugin(
            SqlBuilder::default()
                .add_migrations("sqlite:vuln.db", migrations)   // VULN: plaintext sqlite
                .build(),
        )
        .invoke_handler(tauri::generate_handler![])              // VULN: no custom Rust gate
        .run(tauri::generate_context!())
        .expect("error while running tauri application");        // VULN: panic on startup
}
