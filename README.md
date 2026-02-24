# Smartchatai (Native Programm)

Ein einfacher KI-Chat-Prototyp mit React-Frontend und **Rust-Backend (Axum)**.

## Ziel

- Node.js 18+
- npm 9+
- Rust (stable) + Cargo

## Starten

Frontend (React Dev Server):

```bash
cargo run --bin smartchatai
```

Backend (Rust API + statische Auslieferung des Builds):

```bash
npm run build
cargo run --bin server
```

Danach ist die App unter `http://localhost:3000/agent_6c0eba99-1552-4151-8ab6-37f09ef64329` erreichbar.

## Build

```bash
npm run build
cargo build --bin server
```

Die ausführbare Datei liegt dann unter:

- Linux/macOS: `target/release/smartchatai`
- Windows: `target\\release\\smartchatai.exe`

## Bedienung

- Chat-Oberfläche mit Ladeindikator
- Persistente Chat-Historie im Browser (`localStorage`)
- Chat löschen per Button
- Robuste Fehlerbehandlung inklusive Timeout bei API-Anfragen
- Rust-basierte API mit Axum

- Nachricht schreiben + Enter
- `/help` für Hilfe
- `/history` für Verlauf
- `/clear` zum Löschen
- `/exit` zum Beenden

Der Verlauf wird lokal in `.smartchatai_history.txt` gespeichert.
