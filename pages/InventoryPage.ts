import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortSelect: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
  }

  async expectLoaded(): Promise<void> {
    await this.page.waitForURL("**/inventory.html");
    await this.title.waitFor();
  }

  async addToCart(itemSlug: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${itemSlug}"]`).click();
  }

  async removeFromCart(itemSlug: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${itemSlug}"]`).click();
  }

  async sortBy(option: "az" | "za" | "lohi" | "hilo"): Promise<void> {
    await this.sortSelect.selectOption(option);
  }

  async names(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
