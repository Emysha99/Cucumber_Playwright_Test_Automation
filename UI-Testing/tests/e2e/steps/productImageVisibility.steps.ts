import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { login } from '../helpers/loginHelper';

Given('I am logged in', async function () {
  const page = this.page;
  await login(page);
});

Given('I am on the inventory page', async function () {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.navigate();
});

Then('all product images should be visible', async function () {
  const page = this.page;
  const productImages = page.locator('.inventory_item_img');
  const imageCount = await productImages.count();
  
  for (let i = 0; i < imageCount; i++) {
    const image = productImages.nth(i);
    await expect(image).toBeVisible();
  }
}); 