import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';

When('I add {string} to the cart', async function(itemName: string) {
  const cartPage = new CartPage(this.getPage());
  await cartPage.addToCart(itemName);
});

Then('I should see {string} in the cart', async function(itemName: string) {
  const cartPage = new CartPage(this.page);
  await cartPage.viewCart();
  const itemInCart = this.page.locator('.cart_item').filter({ hasText: itemName });
  await expect(itemInCart).toBeVisible();
});

Then('the cart badge should show {string}', async function(count: string) {
  const badge = await this.page.locator('.shopping_cart_badge').innerText();
  expect(badge).toBe(count);
});