import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

test("completes a checkout for a standard user", async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.loginAsStandardUser();
  await inventory.expectLoaded();

  await inventory.addToCart("sauce-labs-fleece-jacket");
  await inventory.openCart();
  await cart.expectLoaded();
  await cart.checkout();

  await checkout.fillCustomer("Juan", "Mahecha", "110111");
  await checkout.finish();

  await expect(checkout.completeHeader).toHaveText("Thank you for your order!");
});
