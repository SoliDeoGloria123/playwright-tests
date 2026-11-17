import { expect, test } from "@playwright/test";
import { DEMO_PASSWORD, LOCKED_OUT_USER, LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";

test.describe("Login", () => {
  test("standard user reaches the inventory", async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.loginAsStandardUser();
    await inventory.expectLoaded();

    await expect(inventory.title).toHaveText("Products");
    await expect(inventory.items).toHaveCount(6);
  });

  test("locked out user sees an error", async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(LOCKED_OUT_USER, DEMO_PASSWORD);

    await expect(login.error).toBeVisible();
    await expect(login.error).toContainText("Sorry, this user has been locked out");
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });

  test("empty credentials show a validation error", async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.loginButton.click();

    await expect(login.error).toHaveText("Epic sadface: Username is required");
  });
});
