use std::fs;
use std::io::{self, Write};
use std::path::PathBuf;

const HISTORY_FILE: &str = ".smartchatai_history.txt";

fn main() {
    println!("Smartchatai (Native EXE Mode)");
    println!("Tippe eine Nachricht und drücke Enter.");
    println!("Befehle: /help, /history, /clear, /exit\n");

    let mut history = load_history();

    loop {
        print!("> ");
        if io::stdout().flush().is_err() {
            eprintln!("Fehler beim Schreiben auf stdout.");
            break;
        }

        let mut input = String::new();
        if io::stdin().read_line(&mut input).is_err() {
            eprintln!("Fehler beim Lesen der Eingabe.");
            continue;
        }

        let input = input.trim();
        if input.is_empty() {
            continue;
        }

        match input {
            "/exit" => {
                println!("Auf Wiedersehen.");
                break;
            }
            "/help" => print_help(),
            "/history" => print_history(&history),
            "/clear" => {
                history.clear();
                if save_history(&history).is_ok() {
                    println!("Verlauf gelöscht.");
                } else {
                    eprintln!("Verlauf konnte nicht gelöscht werden.");
                }
            }
            _ => {
                let response = generate_bot_response(input);
                println!("Bot: {response}");
                history.push(format!("User: {input}"));
                history.push(format!("Bot: {response}"));

                if let Err(err) = save_history(&history) {
                    eprintln!("Warnung: Verlauf konnte nicht gespeichert werden ({err}).");
                }
            }
        }
    }
}

fn print_help() {
    println!("\nBefehle:");
    println!("  /help    - Hilfe anzeigen");
    println!("  /history - Chatverlauf anzeigen");
    println!("  /clear   - Chatverlauf löschen");
    println!("  /exit    - Programm beenden\n");
}

fn print_history(history: &[String]) {
    if history.is_empty() {
        println!("Noch kein Verlauf vorhanden.");
        return;
    }

    println!("\n--- Verlauf ---");
    for line in history {
        println!("{line}");
    }
    println!("---------------\n");
}

fn generate_bot_response(input: &str) -> String {
    format!("Bot-Antwort: {input}")
}

fn history_path() -> PathBuf {
    std::env::current_dir()
        .unwrap_or_else(|_| PathBuf::from("."))
        .join(HISTORY_FILE)
}

fn load_history() -> Vec<String> {
    let path = history_path();
    let Ok(content) = fs::read_to_string(path) else {
        return Vec::new();
    };

    content
        .lines()
        .map(str::trim)
        .filter(|line| !line.is_empty())
        .map(ToOwned::to_owned)
        .collect()
}

fn save_history(history: &[String]) -> io::Result<()> {
    let path = history_path();
    let content = if history.is_empty() {
        String::new()
    } else {
        format!("{}\n", history.join("\n"))
    };

    fs::write(path, content)
}

#[cfg(test)]
mod tests {
    use super::generate_bot_response;

    #[test]
    fn bot_response_contains_input() {
        let response = generate_bot_response("Hallo");
        assert_eq!(response, "Bot-Antwort: Hallo");
    }
}
