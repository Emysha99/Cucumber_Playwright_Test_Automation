import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';

Given('I am logged in', async function () {
  const page = this.getPage();
  await page.fill('input[data-test="username"]', 'standard_user');
  await page.fill('input[data-test="password"]', 'secret_sauce');
  await page.click('input[data-test="login-button"]');
});

When('I navigate to the cart page', async function () {
  const cartPage = new CartPage(this.getPage());
  await cartPage.navigate();
});

Then('the cart should be empty', async function () {
  const cartPage = new CartPage(this.getPage());
  const cartItemCount = await cartPage.getCartItemCount();
  await expect(cartItemCount).toBe(0);
});

Then('the checkout button should be disabled', async function () {
  const cartPage = new CartPage(this.getPage());
  const isDisabled = await cartPage.isCheckoutButtonDisabled();
  await expect(isDisabled).toBe(true);
}); 