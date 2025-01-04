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
    return await this.page.locator('.inventory_details').isVisible();
  }

  async getProductDetails() {
    return {
      name: await this.page.locator('.inventory_details_name').innerText(),
      description: await this.page.locator('.inventory_details_desc').innerText(),
      price: await this.page.locator('.inventory_details_price').innerText()
    };
  }
}