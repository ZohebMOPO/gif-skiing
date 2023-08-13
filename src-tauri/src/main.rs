// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            Ok(())
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::FileDrop(drop_event) => {
                match drop_event {
                    tauri::FileDropEvent::Dropped(dropped) => {
                        // only the first path is fetched
                        let dropped_path = dropped.first();
                        println!("File dropped: {:?}", dropped_path);
                    }
                    _ => {}
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
