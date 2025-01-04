import { test, expect } from '@playwright/test';
import { login } from '../helpers/loginHelper';

test.describe('Inventory and Cart', () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('Add item to cart and verify in cart page on SauceDemo', async ({ page }) => {
        // Navigate to the inventory page
        await page.goto('https://www.saucedemo.com/inventory.html');
        await page.waitForLoadState('networkidle');

        // Locate the first inventory item and get its name
        const firstItem = page.locator('.inventory_item').first();
        const itemName = await firstItem.locator('.inventory_item_name').innerText();

        // Add the first item to the cart
        await firstItem.locator('button:has-text("Add to cart")').click();

        // Verify the cart badge shows 1 item
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');

        // Navigate to the cart page
        await page.click('.shopping_cart_link');
        await page.waitForURL('https://www.saucedemo.com/cart.html');

        // Verify the item name in the cart
        const cartItemName = page.locator('.cart_item .inventory_item_name');
        await expect(cartItemName).toHaveText(itemName);
    });
}); 