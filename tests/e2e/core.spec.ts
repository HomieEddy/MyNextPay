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

test("editing then deleting a logged expense", async ({ page }) => {
  await signIn(page);
  await page.goto("/?sheet=spend");
  await page.getByRole("link", { name: /Brake repair/ }).click();
  await expect(
    page.getByRole("heading", { name: "Edit expense" }),
  ).toBeVisible();
  await page.getByLabel("Amount").fill("300");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("$300.00 unexpected")).toBeVisible();
  await page.goto("/?sheet=spend");
  await page.getByRole("link", { name: /Brake repair/ }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText("$300.00 unexpected")).toBeHidden();
});

test("mark all paid ticks every bill", async ({ page }) => {
  await signIn(page);
  await page.goto("/?sheet=bills");
  await page.getByRole("button", { name: "Mark Rent unpaid" }).click();
  await page.getByRole("button", { name: "Mark all paid" }).click();
  await expect(
    page.getByRole("button", { name: "Mark Rent unpaid" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Mark all paid" }),
  ).toBeHidden();
});

test("backup, sample data, restore and erase", async ({ page }) => {
  await signIn(page);
  await page.goto("/settings");
  const downloading = page.waitForEvent("download");
  await page.getByRole("link", { name: /Download a backup/ }).click();
  const file = await (await downloading).path();

  const sample = page.getByRole("button", { name: /Reload sample data/ });
  await sample.click();
  await sample.click();
  await page.goto("/recurring");
  await expect(page.getByText("Internet").first()).toBeVisible();

  await page.goto("/settings");
  await page.locator('input[type="file"]').setInputFiles(file);
  await expect(page.getByText("Backup restored")).toBeVisible();
  await page.goto("/recurring");
  await expect(page.getByText("Internet")).toHaveCount(0);

  await page.goto("/settings");
  const erase = page.getByRole("button", { name: /Erase everything/ });
  await erase.click();
  await erase.click();
  await expect(page).toHaveURL(/\/setup/);
});
