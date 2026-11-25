import { expect, test } from "@playwright/test";

test("the app is installable", async ({ page, request }) => {
  const manifest = await (await request.get("/manifest.webmanifest")).json();
  expect(manifest.display).toBe("standalone");
  expect(manifest.icons).toHaveLength(3);
  expect((await request.get("/icons/icon-512.png")).ok()).toBe(true);
  expect((await request.get("/sw.js")).ok()).toBe(true);

  await page.goto("/offline");
  await expect(
    page.getByRole("heading", { name: "You're offline" }),
  ).toBeVisible();
  const ready = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    return Boolean(registration.active);
  });
  expect(ready).toBe(true);
});
