// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rookie::enums::Cookie;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_cookies])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn get_cookies(domain: String) -> Result<Vec<Cookie>, String> {
  rookie::load(Some(vec![domain])).map_err(|err| err.to_string())
}