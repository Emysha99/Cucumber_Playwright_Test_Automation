import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { login } from '../helpers/loginHelper';

Given('I am logged in', async function () {
  const page = this.page;
  await login(page);
});

Given('I have added items to the cart', async function () {
  const page = this.page;
  const cartPage = new CartPage(page);
  await cartPage.addToCart('Sauce Labs Backpack'); // Example item
});

When('I navigate to the cart page', async function () {
  const cartPage = new CartPage(this.page);
  await cartPage.navigate();
});

When('I proceed to checkout', async function () {
  const cartPage = new CartPage(this.page);
  await cartPage.checkout();
});

When('I fill in the checkout information with {string}, {string}, {string}', async function (firstName: string, lastName: string, postalCode: string) {
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
});

Then('I should be taken to the order confirmation page', async function () {
  const page = this.page;
  await expect(page).toHaveURL(/.*checkout-complete.html/);
});

Then('the order should be confirmed successfully', async function () {
  const page = this.page;
  const confirmationMessage = await page.locator('.complete-header').innerText();
  expect(confirmationMessage).toBe('THANK YOU FOR YOUR ORDER');
}); 