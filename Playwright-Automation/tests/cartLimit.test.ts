import { test, expect } from '@playwright/test';
import { login } from './loginHelper';

test.describe('Invalid Cart Limit Test', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Cannot add more than three items to the cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/inventory.html');

    const items = page.locator('.inventory_item');
    const addToCartButtons = items.locator('text=Add to cart');

    // Add three items to the cart
    for (let i = 0; i < 3; i++) {
      await addToCartButtons.nth(i).click(); 
      console.log(`Item ${i + 1} added to cart.`);
    }

    // Attempt to add a fourth item
    await addToCartButtons.nth(3).click(); 
    console.log('Attempted to add a fourth item to the cart.');

    // Navigate to the cart page
    await page.goto('https://www.saucedemo.com/v1/cart.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/cart.html');

    // Verify that only three items are in the cart
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(3);
    console.log('Verified only three items are in the cart.');

    // Check for any error message or restriction
    const errorMessage = page.locator('text=Cannot add more than three items'); 
    if (await errorMessage.isVisible()) {
      console.log('Error message displayed: Cannot add more than three items.');
    } else {
      console.log('No error message displayed.');
    }
  });

  test.afterEach(async ({ page }) => {
    // Clear cookies after each test to reset the session
    await page.context().clearCookies();
  });
});
