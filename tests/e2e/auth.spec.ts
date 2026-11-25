import { expect, test } from "@playwright/test";

const PASSWORD = "Homelab2026!";

test("first run sets a password and pay profile, then sign out and back in", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/onboarding$/);

  await page.getByLabel("Password", { exact: true }).fill(PASSWORD);
  await page.getByLabel("Confirm password").fill(PASSWORD);
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/\/setup$/);

  await page.getByLabel("Pay amount, after tax").fill("2150");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByRole("button", { name: "Add a bill" }).click();
  await page.getByLabel("Bill", { exact: true }).fill("Rent");
  await page.getByLabel("Amount", { exact: true }).fill("1200");
  await page.getByRole("button", { name: "Finish" }).click();

  await expect(page.getByText("Safe to spend")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();

  await page.getByRole("link", { name: "Settings" }).click();
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/login$/);

  await page.getByLabel("Password").fill("wrong-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("That password isn't right.")).toBeVisible();

  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Safe to spend")).toBeVisible();
});

test("onboarding is closed once a password exists", async ({ page }) => {
  await page.goto("/onboarding");
  await expect(page).toHaveURL(/\/login$/);
});
