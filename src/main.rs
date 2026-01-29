mod ui;
mod services;
mod utils;

use std::io;
use std::path::PathBuf;
use std::env;
use crossterm::{
    event::{self, DisableMouseCapture, EnableMouseCapture, Event, KeyCode, KeyModifiers},
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
};
use std::time::Duration;
use ratatui::{
    backend::CrosstermBackend,
    Terminal,
};

use crate::ui::app::{App, Screen};
use crate::services::claude;
use crate::utils::markdown::{render_markdown, MarkdownTheme, is_line_empty};

const VERSION: &str = env!("CARGO_PKG_VERSION");

fn print_help() {
    println!("cokacdir {} - Dual-panel terminal file manager", VERSION);
    println!();
    println!("USAGE:");
    println!("    cokacdir [OPTIONS]");
    println!();
    println!("OPTIONS:");
    println!("    -h, --help              Print help information");
    println!("    -v, --version           Print version information");
    println!("    --prompt <TEXT>         Send prompt to AI and print rendered response");
    println!();
    println!("HOMEPAGE: https://cokacdir.cokac.com");
}

fn print_version() {
    println!("cokacdir {}", VERSION);
}

fn handle_prompt(prompt: &str) {
    use crate::ui::theme::Theme;

    // Check if Claude is available
    if !claude::is_claude_available() {
        eprintln!("Error: Claude CLI is not available.");
        eprintln!("Please install Claude CLI: https://claude.ai/cli");
        return;
    }

    // Execute Claude command
    let current_dir = std::env::current_dir()
        .map(|p| p.display().to_string())
        .unwrap_or_else(|_| ".".to_string());
    let response = claude::execute_command(prompt, None, &current_dir);

    if !response.success {
        eprintln!("Error: {}", response.error.unwrap_or_else(|| "Unknown error".to_string()));
        return;
    }

    let content = response.response.unwrap_or_default();

    // Normalize empty lines first
    let normalized = normalize_consecutive_empty_lines(&content);

    // Render markdown
    let theme = Theme::default();
    let md_theme = MarkdownTheme::from_theme(&theme);
    let lines = render_markdown(&normalized, md_theme);

    // Remove consecutive empty lines from rendered output
    let mut prev_was_empty = false;
    for line in lines {
        let is_empty = is_line_empty(&line);
        if is_empty {
            if !prev_was_empty {
                println!();
            }
            prev_was_empty = true;
        } else {
            let content: String = line.spans.iter()
                .map(|s| s.content.as_ref())
                .collect();
            println!("{}", content);
            prev_was_empty = false;
        }
    }
}

/// Normalize consecutive empty lines to maximum of one
fn normalize_consecutive_empty_lines(text: &str) -> String {
    let lines: Vec<&str> = text.lines().collect();
    let mut result_lines: Vec<&str> = Vec::new();
    let mut prev_was_empty = false;

    for line in lines {
        let is_empty = line.chars().all(|c| c.is_whitespace());
        if is_empty {
            if !prev_was_empty {
                result_lines.push("");
            }
            prev_was_empty = true;
        } else {
            result_lines.push(line);
            prev_was_empty = false;
        }
    }

    result_lines.join("\n")
}

fn main() -> io::Result<()> {
    // Handle command line arguments
    let args: Vec<String> = env::args().collect();
    if args.len() > 1 {
        match args[1].as_str() {
            "-h" | "--help" => {
                print_help();
                return Ok(());
            }
            "-v" | "--version" => {
                print_version();
                return Ok(());
            }
            "--prompt" => {
                if args.len() < 3 {
                    eprintln!("Error: --prompt requires a text argument");
                    eprintln!("Usage: cokacdir --prompt \"your question\"");
                    return Ok(());
                }
                handle_prompt(&args[2]);
                return Ok(());
            }
            _ => {
                eprintln!("Unknown option: {}", args[1]);
                eprintln!("Use --help for usage information");
                return Ok(());
            }
        }
    }

    // Setup terminal
    enable_raw_mode()?;
    let mut stdout = io::stdout();
    // Clear screen before entering alternate screen
    execute!(
        stdout,
        crossterm::terminal::Clear(crossterm::terminal::ClearType::All),
        crossterm::cursor::MoveTo(0, 0),
        EnterAlternateScreen,
        EnableMouseCapture
    )?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;
    terminal.clear()?;

    // Create app state
    let left_path = std::env::current_dir().unwrap_or_else(|_| PathBuf::from("/"));
    let right_path = dirs::home_dir().unwrap_or_else(|| PathBuf::from("/"));
    let mut app = App::new(left_path, right_path);

    // Run app
    let result = run_app(&mut terminal, &mut app);

    // Restore terminal
    disable_raw_mode()?;
    execute!(
        terminal.backend_mut(),
        LeaveAlternateScreen,
        DisableMouseCapture,
        crossterm::terminal::Clear(crossterm::terminal::ClearType::All),
        crossterm::cursor::MoveTo(0, 0),
        crossterm::cursor::Show
    )?;

    if let Err(err) = result {
        eprintln!("Error: {}", err);
    }

    Ok(())
}

fn run_app<B: ratatui::backend::Backend>(
    terminal: &mut Terminal<B>,
    app: &mut App,
) -> io::Result<()> {
    loop {
        terminal.draw(|f| ui::draw::draw(f, app))?;

        // For AI screen, FileInfo with calculation, ImageViewer loading, or file operation progress, use fast polling
        let is_file_info_calculating = app.current_screen == Screen::FileInfo
            && app.file_info_state.as_ref().map(|s| s.is_calculating).unwrap_or(false);
        let is_image_loading = app.current_screen == Screen::ImageViewer
            && app.image_viewer_state.as_ref().map(|s| s.is_loading).unwrap_or(false);
        let is_progress_active = app.file_operation_progress
            .as_ref()
            .map(|p| p.is_active)
            .unwrap_or(false);

        let poll_timeout = if app.current_screen == Screen::AIScreen || is_file_info_calculating || is_image_loading || is_progress_active {
            Duration::from_millis(100) // Fast polling for spinner animation / progress updates
        } else {
            Duration::from_millis(250)
        };

        // Poll for AI responses if on AI screen
        if app.current_screen == Screen::AIScreen {
            if let Some(ref mut state) = app.ai_state {
                state.poll_response();
            }
        }

        // Poll for file info calculation if on FileInfo screen
        if app.current_screen == Screen::FileInfo {
            if let Some(ref mut state) = app.file_info_state {
                state.poll();
            }
        }

        // Poll for image loading if on ImageViewer screen
        if app.current_screen == Screen::ImageViewer {
            if let Some(ref mut state) = app.image_viewer_state {
                state.poll();
            }
        }

        // Poll for file operation progress
        let progress_message: Option<String> = if let Some(ref mut progress) = app.file_operation_progress {
            let still_active = progress.poll();
            if !still_active {
                // Operation completed - extract result info before releasing borrow
                let msg = if let Some(ref result) = progress.result {
                    let op_name = match progress.operation_type {
                        crate::services::file_ops::FileOperationType::Copy => "Copied",
                        crate::services::file_ops::FileOperationType::Move => "Moved",
                    };
                    let total = result.success_count + result.failure_count;
                    if result.failure_count == 0 {
                        Some(format!("{} {} file(s)", op_name, result.success_count))
                    } else {
                        Some(format!("{} {}/{}. Error: {}",
                            op_name,
                            result.success_count,
                            total,
                            result.last_error.as_deref().unwrap_or("Unknown error")
                        ))
                    }
                } else {
                    None
                };
                msg
            } else {
                None
            }
        } else {
            None
        };

        // Handle progress completion (outside of borrow)
        if progress_message.is_some() {
            if let Some(msg) = progress_message {
                app.show_message(&msg);
            }
            app.file_operation_progress = None;
            app.dialog = None;
            app.refresh_panels();
        }

        // Check for key events with timeout
        if event::poll(poll_timeout)? {
            if let Event::Key(key) = event::read()? {
                match app.current_screen {
                    Screen::DualPanel => {
                        if handle_dual_panel_input(app, key.code, key.modifiers) {
                            return Ok(());
                        }
                    }
                    Screen::FileViewer => {
                        ui::file_viewer::handle_input(app, key.code, key.modifiers);
                    }
                    Screen::FileEditor => {
                        ui::file_editor::handle_input(app, key.code, key.modifiers);
                    }
                    Screen::FileInfo => {
                        ui::file_info::handle_input(app, key.code);
                    }
                    Screen::ProcessManager => {
                        ui::process_manager::handle_input(app, key.code);
                    }
                    Screen::Help => {
                        // Any key closes help
                        app.current_screen = Screen::DualPanel;
                    }
                    Screen::AIScreen => {
                        if let Some(ref mut state) = app.ai_state {
                            if ui::ai_screen::handle_input(state, key.code, key.modifiers) {
                                // Save session before leaving
                                app.save_ai_session();
                                app.current_screen = Screen::DualPanel;
                                app.ai_state = None;
                            }
                        }
                    }
                    Screen::SystemInfo => {
                        if ui::system_info::handle_input(&mut app.system_info_state, key.code) {
                            app.current_screen = Screen::DualPanel;
                        }
                    }
                    Screen::ImageViewer => {
                        ui::image_viewer::handle_input(app, key.code);
                    }
                    Screen::SearchResult => {
                        let should_close = ui::search_result::handle_input(
                            &mut app.search_result_state,
                            key.code,
                        );
                        if should_close {
                            if key.code == KeyCode::Enter {
                                // Enter: 선택한 경로로 이동
                                app.goto_search_result();
                            } else {
                                // Esc: 검색 결과 화면 닫기
                                app.search_result_state.active = false;
                                app.current_screen = Screen::DualPanel;
                            }
                        }
                    }
                }
            }
        }
    }
}

fn handle_dual_panel_input(app: &mut App, code: KeyCode, modifiers: KeyModifiers) -> bool {
    // Handle advanced search dialog first
    if app.advanced_search_state.active {
        if let Some(criteria) = ui::advanced_search::handle_input(&mut app.advanced_search_state, code) {
            app.execute_advanced_search(&criteria);
        }
        return false;
    }

    // Handle dialog input first
    if app.dialog.is_some() {
        return ui::dialogs::handle_dialog_input(app, code, modifiers);
    }

    // Handle Ctrl key combinations first
    if modifiers.contains(KeyModifiers::CONTROL) {
        match code {
            // Clipboard operations
            KeyCode::Char('c') => {
                app.clipboard_copy();
                return false;
            }
            KeyCode::Char('x') => {
                app.clipboard_cut();
                return false;
            }
            KeyCode::Char('v') => {
                app.clipboard_paste();
                return false;
            }
            // AI screen - Ctrl+A
            KeyCode::Char('a') => {
                app.show_ai_screen();
                return false;
            }
            _ => {}
        }
    }

    match code {
        // Quit
        KeyCode::Char('0') | KeyCode::Char('q') | KeyCode::Char('Q') => return true,

        // Navigation
        KeyCode::Up => app.move_cursor(-1),
        KeyCode::Down => app.move_cursor(1),
        KeyCode::PageUp => app.move_cursor(-10),
        KeyCode::PageDown => app.move_cursor(10),
        KeyCode::Home => app.cursor_to_start(),
        KeyCode::End => app.cursor_to_end(),

        // Tab - switch panels
        KeyCode::Tab => app.switch_panel(),

        // Left/Right - switch panels (keep same index position)
        KeyCode::Left | KeyCode::Right => app.switch_panel_keep_index(),

        // Enter - open directory or file
        KeyCode::Enter => app.enter_selected(),

        // Escape - go to parent directory
        KeyCode::Esc => app.go_to_parent(),

        // Space - select/deselect file
        KeyCode::Char(' ') => app.toggle_selection(),

        // * - select/deselect all
        KeyCode::Char('*') => app.toggle_all_selection(),

        // Sort keys
        KeyCode::Char('n') | KeyCode::Char('N') => app.toggle_sort_by_name(),
        KeyCode::Char('s') | KeyCode::Char('S') => app.toggle_sort_by_size(),
        KeyCode::Char('d') | KeyCode::Char('D') => app.toggle_sort_by_date(),

        // Function keys (alphabet)
        KeyCode::Char('h') | KeyCode::Char('H') => app.show_help(),
        KeyCode::Char('o') | KeyCode::Char('O') => app.show_file_info(),
        KeyCode::Char('v') | KeyCode::Char('V') => app.view_file(),
        KeyCode::Char('e') | KeyCode::Char('E') => app.edit_file(),
        KeyCode::Char('c') | KeyCode::Char('C') => app.show_copy_dialog(),
        KeyCode::Char('m') | KeyCode::Char('M') => app.show_move_dialog(),
        KeyCode::Char('k') | KeyCode::Char('K') => app.show_mkdir_dialog(),
        KeyCode::Char('x') | KeyCode::Char('X') | KeyCode::Delete | KeyCode::Backspace => app.show_delete_dialog(),
        KeyCode::Char('p') | KeyCode::Char('P') => app.show_process_manager(),
        KeyCode::Char('r') | KeyCode::Char('R') => app.show_rename_dialog(),
        KeyCode::Char('f') => app.show_search_dialog(),
        KeyCode::Char('/') => app.show_goto_dialog(),
        KeyCode::Char('~') => {
            // 홈 폴더로 바로 이동
            if let Some(home) = dirs::home_dir() {
                app.execute_goto(&home.display().to_string());
            }
        }

        // AI screen - '.'
        KeyCode::Char('.') => app.show_ai_screen(),

        // System info - 'i' or 'I'
        KeyCode::Char('i') | KeyCode::Char('I') => app.show_system_info(),

        _ => {}
    }
    false
}
