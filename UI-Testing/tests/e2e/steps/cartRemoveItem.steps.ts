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

When('I add an item to the cart', async function () {
  const inventoryPage = new InventoryPage(this.getPage());
  await inventoryPage.addFirstItemToCart();
});

When('I navigate to the cart page', async function () {
  const cartPage = new CartPage(this.getPage());
  await cartPage.navigate();
});

Then('I should see the item in the cart', async function () {
  const cartPage = new CartPage(this.getPage());
  const cartItemCount = await cartPage.getCartItemCount();
  await expect(cartItemCount).toBe(1);
});

When('I remove the item from the cart', async function () {
  const cartPage = new CartPage(this.getPage());
  const itemName = await this.page.locator('.cart_item .inventory_item_name').first().innerText();
  await cartPage.removeItem(itemName);
});

Then('the item should be removed from the cart', async function () {
  const cartPage = new CartPage(this.getPage());
  const cartItemCount = await cartPage.getCartItemCount();
  await expect(cartItemCount).toBe(0);
}); 