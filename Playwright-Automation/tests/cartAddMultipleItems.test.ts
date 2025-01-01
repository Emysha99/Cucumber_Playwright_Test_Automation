import { test, expect } from '@playwright/test';
import { login } from './loginHelper';

test.describe('Add Multiple Items to Cart', () => {
    test.beforeEach(async ({ page }) => {
        // Log in before each test
        await login(page);
    });

    test('Add multiple items and verify cart badge', async ({ page }) => {
        // Navigate to the inventory page
        await page.goto('https://www.saucedemo.com/v1/inventory.html');

        // Select all "Add to Cart" buttons
        const addToCartButtons = page.locator('button:text("Add to cart")');
        const itemCount = await addToCartButtons.count();

        // Add multiple items to the cart and verify cart badge updates
        for (let i = 0; i < 3; i++) { // Add the first 3 items
            await addToCartButtons.nth(i).click();
            const cartBadge = page.locator('.shopping_cart_badge');
            await expect(cartBadge).toHaveText((i + 1).toString());
            console.log(`Item ${i + 1} added to cart. Verified cart badge: ${i + 1}`);
        }

        // Navigate to the cart page
        await page.goto('https://www.saucedemo.com/v1/cart.html');
        await expect(page).toHaveURL('https://www.saucedemo.com/v1/cart.html');

        // Verify the number of items in the cart matches the badge count
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(3);
        console.log('Verified all added items are present in the cart.');
    });

    test.afterEach(async ({ page }) => {
        // Clear cookies/session after each test for isolation
        await page.context().clearCookies();
    });
});
