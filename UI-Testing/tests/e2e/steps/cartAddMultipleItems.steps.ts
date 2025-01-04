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

When('I navigate to the inventory page', async function () {
  const inventoryPage = new InventoryPage(this.getPage());
  await inventoryPage.navigate();
});

When('I add multiple items to the cart', async function () {
  const inventoryPage = new InventoryPage(this.getPage());
  await inventoryPage.addMultipleItemsToCart(3);
});

Then('the cart badge should update accordingly', async function () {
  const cartPage = new CartPage(this.getPage());
  const cartBadgeText = await cartPage.getCartBadgeText();
  await expect(cartBadgeText).toBe('3');
});

Then('the number of items in the cart should match the badge count', async function () {
  const cartPage = new CartPage(this.getPage());
  await cartPage.navigate();
  const cartItemCount = await cartPage.getCartItemCount();
  await expect(cartItemCount).toBe(3);
}); 