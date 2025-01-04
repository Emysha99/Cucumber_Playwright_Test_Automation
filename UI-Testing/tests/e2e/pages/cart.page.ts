import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.click('.shopping_cart_link');
    await this.page.waitForURL('**/cart.html');
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
    await this.page.click('.checkout_button');
  }

  async addToCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button:has-text("Add to cart")').click();
  }

  async viewCart() {
    await this.page.click('.shopping_cart_link');
  }

  async isCheckoutButtonDisabled(): Promise<boolean> {
    const checkoutButton = this.page.locator('#checkout');
    return await checkoutButton.isDisabled();
  }

  async getCartItems(): Promise<string[]> {
    return await this.page.locator('.cart_item .inventory_item_name').allTextContents();
  }

  async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', zipCode);
    await this.page.click('.cart_button');
  }

  async finishCheckout() {
    await this.page.click('.cart_button');
  }

  async isCheckoutComplete(): Promise<boolean> {
    return await this.page.locator('.complete-header').isVisible();
  }
}