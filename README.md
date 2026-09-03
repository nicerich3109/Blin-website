# Blin Dashboard

Frontend for Blin Bot. The visual design is intentionally dark and minimal; the live Dashboard uses the same API exposed by `Blin-bot`.

## Architecture

`Discord OAuth2 → Blin Dashboard → Blin Bot API → Discord`

The browser never receives the bot token, Discord client secret, or `BLIN_API_SECRET`. Discord OAuth2 is handled server-side by the bot API. Discord documents OAuth2 as the standard authorization mechanism and recommends validating the OAuth `state` value. The API implements that flow and only exposes guilds where the signed-in user has Manage Server/Administrator permissions. 

## Local setup

1. Run `Blin-bot` and expose its Dashboard API over HTTPS.
2. Copy the public API URL into `config.js`:

```js
window.BLIN_API_BASE = 'https://your-api.example.com';
```

3. In the Discord Developer Portal, configure the OAuth2 redirect URI to:

```text
https://your-api.example.com/auth/callback
```

Use the `identify` and `guilds` scopes for Dashboard login.
4. In the bot `.env`, set `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `DISCORD_REDIRECT_URI`, `BLIN_DASHBOARD_URL`, and `BLIN_API_ALLOWED_ORIGINS`.
5. Publish this repository with GitHub Pages. `index.html` is the public landing page and `dashboard.html` is the authenticated Dashboard.

## Important

GitHub Pages is static hosting, so it hosts the frontend only. The Blin Bot API must run on a server/container with HTTPS. Do not put `BLIN_API_SECRET`, a bot token, or `DISCORD_CLIENT_SECRET` into this repository or into browser JavaScript.
