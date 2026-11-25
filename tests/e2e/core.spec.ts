import { expect, type Page, test } from "@playwright/test";

// Runs after auth.spec.ts, which created the password and finished setup with one bill (Rent).
async function signIn(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Password").fill("Homelab2026!");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Safe to spend")).toBeVisible();
}

test("marking a bill paid keeps safe-to-spend the same", async ({ page }) => {
  await signIn(page);
  await page.waitForTimeout(1200); // let the count-up settle
  const before = await page.locator(".big").textContent();
  await page.getByRole("link", { name: /^Bills/ }).click();
  await page.getByRole("button", { name: "Mark Rent paid" }).click();
  await expect(
    page.getByRole("button", { name: "Mark Rent unpaid" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByText("1 of 1 paid")).toBeVisible();
  await expect(page.locator(".big")).toHaveText(before ?? "");
});

test("logging an unexpected expense lowers safe-to-spend", async ({ page }) => {
  await signIn(page);
  await page.getByRole("link", { name: "Log an expense" }).click();
  await page.getByLabel("Amount").fill("480");
  await page.getByLabel("What was it?").fill("Brake repair");
  await page.getByRole("button", { name: "Log it" }).click();
  await expect(page.getByText("$480.00 unexpected")).toBeVisible();
});

test("cycles and calendar show the paydays ahead", async ({ page }) => {
  await signIn(page);
  await page.getByRole("link", { name: "Cycles", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Next six paydays" }),
  ).toBeVisible();
  await expect(page.getByText("Current cycle")).toBeVisible();
  await page.getByRole("link", { name: "Calendar", exact: true }).click();
  await expect(page.getByText("Payday or income")).toBeVisible();
  await page.getByRole("link", { name: "Week" }).click();
  await expect(page.locator(".wk")).toHaveCount(7);
});
