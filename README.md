# NextPay

How much can I safely spend before my next payday? A self-hosted, single-person cash-flow PWA built around paydays.

- Product spec: [PRD.md](PRD.md)
- Approved design: [docs/design/mockup.html](docs/design/mockup.html)
- How the code is organised: [CLAUDE.md](CLAUDE.md)

## Run it locally

```bash
pnpm install
pnpm dev          # http://localhost:3000, first visit opens onboarding
pnpm db:seed      # optional: load the sample data
```

## Run it on a homelab

```bash
docker compose up -d --build
```

Data lives in `./data/nextpay.db`. Put HTTPS in front (Caddy, Traefik or Tailscale) so the app can be installed on a phone.

## Install it on your phone

The browser only offers to install the app over HTTPS. Put a reverse proxy (Caddy, Traefik, Nginx Proxy Manager) or Tailscale (`tailscale serve`) in front of the container, and set `TRUST_PROXY=true`.

- **iPhone (Safari):** open the site, tap Share, then "Add to Home Screen".
- **Android (Chrome):** open the site, then tap "Install app" in the menu.

It opens full screen, like a native app. Your data stays on the server. When the server can't be reached, the app shows an offline page instead of old numbers.
