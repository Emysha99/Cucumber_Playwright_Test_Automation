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

When('I add the first item to the cart', async function () {
  const inventoryPage = new InventoryPage(this.getPage());
  await inventoryPage.addFirstItemToCart();
});

Then('the cart badge should show 1 item', async function () {
  const cartPage = new CartPage(this.getPage());
  const cartBadgeText = await cartPage.getCartBadgeText();
  await expect(cartBadgeText).toBe('1');
});

Then('the item should be present in the cart', async function () {
  const cartPage = new CartPage(this.getPage());
  await cartPage.navigate();
  const cartItemCount = await cartPage.getCartItemCount();
  await expect(cartItemCount).toBe(1);
}); 