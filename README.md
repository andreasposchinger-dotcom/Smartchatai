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

## Replit-Start (empfohlen)

Dieses Repo ist für Replit vorkonfiguriert:

- `.replit` startet automatisch `npm run start:replit`
- `start:replit` baut das Frontend und startet den Express-Server auf `0.0.0.0:3000`
- Replit mapped Port `3000` auf den öffentlichen Web-Port

Falls nötig manuell in der Shell:

```bash
npm install
npm run start:replit
```

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
