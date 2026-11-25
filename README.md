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
