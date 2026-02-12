# Smartchatai

Ein einfacher KI-Chat-Prototyp mit React-Frontend und Express-API.

## Voraussetzungen

- Node.js 18+
- npm 9+

## Lokale Entwicklung

```bash
npm install
npm start
```

Danach ist die App unter `http://localhost:3000/agent_6c0eba99-1552-4151-8ab6-37f09ef64329` erreichbar.

## Build

```bash
npm run build
```

## Features

- Chat-Oberfläche mit Ladeindikator
- Persistente Chat-Historie im Browser (`localStorage`)
- Chat löschen per Button
- Robuste Fehlerbehandlung inklusive Timeout bei API-Anfragen

## API-Endpunkte

- `GET /api` – einfacher Status-Text
- `POST /api/chat` – erwartet `{ "message": "..." }` und liefert `{ "reply": "..." }`
