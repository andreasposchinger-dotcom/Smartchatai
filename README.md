# Smartchatai

Ein einfacher KI-Chat-Prototyp mit React-Frontend und **Rust-Backend (Axum)**.

## Voraussetzungen

- Node.js 18+
- npm 9+
- Rust (stable) + Cargo

## Lokale Entwicklung

Frontend (React Dev Server):

```bash
npm install
npm start
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

## Features

- Chat-Oberfläche mit Ladeindikator
- Persistente Chat-Historie im Browser (`localStorage`)
- Chat löschen per Button
- Robuste Fehlerbehandlung inklusive Timeout bei API-Anfragen
- Rust-basierte API mit Axum

## API-Endpunkte

- `GET /api` – einfacher Status-Text
- `POST /api/chat` – erwartet `{ "message": "..." }` und liefert `{ "reply": "..." }`
