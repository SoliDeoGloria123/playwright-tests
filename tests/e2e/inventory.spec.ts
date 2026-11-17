import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";

test.describe("Inventory and cart", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAsStandardUser();
    await new InventoryPage(page).expectLoaded();
  });

  test("adds two products and shows them in the cart", async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addToCart("sauce-labs-backpack");
    await inventory.addToCart("sauce-labs-bike-light");
    await expect(inventory.cartBadge).toHaveText("2");

    await inventory.openCart();
    await cart.expectLoaded();
    await expect(cart.itemNames).toHaveText(["Sauce Labs Backpack", "Sauce Labs Bike Light"]);
  });

  test("sorts products from Z to A", async ({ page }) => {
    const inventory = new InventoryPage(page);

    const original = await inventory.names();
    await inventory.sortBy("za");
    const sorted = await inventory.names();

    expect(sorted).toEqual([...original].sort((a, b) => b.localeCompare(a)));
    expect(sorted[0]).toBe("Test.allTheThings() T-Shirt (Red)");
  });
});
