import { test, expect } from '@playwright/test';
import { login } from '../helpers/loginHelper';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';

test.describe('Invalid Cart Limit Test', () => {
  test.beforeEach(async ({ page }) => {
    // Perform login before each test
    await login(page);
  });

  test('Cannot add more than three items to the cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    
    // Add three items
    const products = await productPage.getAllProductNames();
    for (let i = 0; i < 3; i++) {
        await cartPage.addToCart(products[i]);
        console.log(`Item ${i + 1} added to cart.`);
    }

    // Verify cart badge shows "3"
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('3');

    // Verify that we have 3 "Remove" buttons (items that were added)
    const removeButtons = page.locator('.inventory_item button:has-text("Remove")');
    await expect(removeButtons).toHaveCount(3);
  });

  test.afterEach(async ({ page }) => {
    // Clear cookies after each test to reset the session
    await page.context().clearCookies();
  });
});
