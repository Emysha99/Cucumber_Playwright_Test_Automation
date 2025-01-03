import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';

Given('I am logged in', async function () {
  const page = this.getPage();
  await page.fill('input[data-test="username"]', 'standard_user');
  await page.fill('input[data-test="password"]', 'secret_sauce');
  await page.click('input[data-test="login-button"]');
});

When('I add three items to the cart', async function () {
  const inventoryPage = new InventoryPage(this.getPage());
  await inventoryPage.addMultipleItemsToCart(3);
});

Then('the cart badge should show "3"', async function () {
  const cartPage = new CartPage(this.getPage());
  const cartBadgeText = await cartPage.getCartBadgeText();
  await expect(cartBadgeText).toBe('3');
});

Then('there should be 3 "Remove" buttons', async function () {
  const cartPage = new CartPage(this.getPage());
  await cartPage.navigate();
  const removeButtonsCount = await this.getPage().locator('.inventory_item button:has-text("Remove")').count();
  await expect(removeButtonsCount).toBe(3);
}); 