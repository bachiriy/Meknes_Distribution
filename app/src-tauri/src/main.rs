#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, Window};

#[tauri::command]
async fn close_splashscreen(window: Window) {
    // Close splashscreen
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap_or_else(|e| {
            eprintln!("Failed to close splashscreen: {}", e);
        });
    } else {
        eprintln!("No window labeled 'splashscreen' found");
    }

    // Show main window
    if let Some(main_window) = window.get_window("main") {
        main_window.show().unwrap_or_else(|e| {
            eprintln!("Failed to show main window: {}", e);
        });
    } else {
        eprintln!("No window labeled 'main' found");
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
