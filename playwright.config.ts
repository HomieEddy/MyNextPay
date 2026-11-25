import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://localhost:3100",
    ...devices["iPhone 13"],
    browserName: "chromium",
    // Optional: point at an already-installed Chromium instead of `playwright install`.
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || undefined },
  },
  webServer: {
    command: "rm -rf ./data/e2e && pnpm build && pnpm start --port 3100",
    url: "http://localhost:3100/api/health",
    reuseExistingServer: false,
    timeout: 180_000,
    env: { DATABASE_PATH: "./data/e2e/nextpay.db" },
  },
});
