# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app

FROM base AS deps
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0 \
  DATABASE_PATH=/data/nextpay.db TZ=America/Toronto
RUN groupadd --system nextpay && useradd --system --gid nextpay nextpay \
  && mkdir /data && chown nextpay:nextpay /data
COPY --from=build --chown=nextpay:nextpay /app/.next/standalone ./
COPY --from=build --chown=nextpay:nextpay /app/.next/static ./.next/static
COPY --from=build --chown=nextpay:nextpay /app/public ./public
COPY --from=build --chown=nextpay:nextpay /app/drizzle ./drizzle
USER nextpay
VOLUME /data
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD node -e "fetch('http://localhost:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
