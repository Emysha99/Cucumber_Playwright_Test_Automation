import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/v1/inventory.html');
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async addToCart(productName: string) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    await product.locator('text=Add to cart').click();
  }

  async isOnProductDetailsPage(): Promise<boolean> {
    try {
      await this.page.waitForSelector('.inventory_details', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getProductDetails() {
    return {
        name: await this.page.locator('.inventory_details_name').innerText(),
        description: await this.page.locator('.inventory_details_desc').innerText(),
        price: await this.page.locator('.inventory_details_price').innerText()
    };
  }

  async clickProductName(productName: string) {
    await this.page.click(`.inventory_item:has-text("${productName}") .inventory_item_name`);
    await this.page.waitForSelector('.inventory_details');
  }
}