import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async getCartItemCount(): Promise<number> {
    return await this.page.locator('.cart_item').count();
  }

  async getCartBadgeText(): Promise<string> {
    return await this.page.locator('.shopping_cart_badge').innerText();
  }

  async removeItem(itemName: string) {
    const item = this.page.locator('.cart_item').filter({ hasText: itemName });
    await item.locator('button').click();
  }

  async checkout() {
    await this.page.click('#checkout');
  }

  async addToCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button:has-text("Add to cart")').click();
  }

  async viewCart() {
    await this.page.click('.shopping_cart_link');
  }
}