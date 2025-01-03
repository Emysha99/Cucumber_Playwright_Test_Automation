import { test, expect } from '@playwright/test';
import { login } from './loginHelper';

test.describe('Add to Cart Functionality', () => {
    test.beforeEach(async ({ page }) => {
        // Perform login before each test
        await login(page);
    });

    test('Can add an item to the cart', async ({ page }) => {
        // Navigate to the inventory page
        await page.goto('https://www.saucedemo.com/v1/inventory.html');

        // Add the first item to the cart
        const firstItem = page.locator('.inventory_item').first();
        const itemName = await firstItem.locator('.inventory_item_name').innerText();
        await firstItem.locator('text=Add to cart').click();
        console.log(`Added item to cart: ${itemName}`);

        // Navigate to the cart page
        await page.goto('https://www.saucedemo.com/v1/cart.html');
        await expect(page).toHaveURL('https://www.saucedemo.com/v1/cart.html');

        // Verify the item is in the cart
        const cartItem = page.locator('.cart_item .inventory_item_name');
        await expect(cartItem).toHaveText(itemName);
        console.log(`Verified item in cart: ${itemName}`);
    });

    test.afterEach(async ({ page }) => {
        // Clear cookies after each test to reset the session
        await page.context().clearCookies();
    });
});
