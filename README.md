# Smartchatai (Native Programm)

Smartchatai wurde komplett von einer kleinen Website auf ein **natives Rust-Programm** umgestellt.

## Ziel

Du bekommst jetzt ein ausführbares Programm (z. B. `.exe` unter Windows) statt einer Browser-App.

## Starten

```bash
cargo run --bin smartchatai
```

## Release-Build (für EXE/ausführbare Datei)

```bash
cargo build --release --bin smartchatai
```

Die ausführbare Datei liegt dann unter:

- Linux/macOS: `target/release/smartchatai`
- Windows: `target\\release\\smartchatai.exe`

## Bedienung

Im Programm:

- Nachricht schreiben + Enter
- `/help` für Hilfe
- `/history` für Verlauf
- `/clear` zum Löschen
- `/exit` zum Beenden

Der Verlauf wird lokal in `.smartchatai_history.txt` gespeichert.
