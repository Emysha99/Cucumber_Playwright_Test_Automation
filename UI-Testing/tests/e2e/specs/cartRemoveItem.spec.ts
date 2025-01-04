import { test, expect } from '@playwright/test';
import { login } from '../helpers/loginHelper';

test.describe('Cart Item Removal', () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('Remove an item from the cart', async ({ page }) => {
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

        // Click the "Remove" button
        const removeButton = page.locator('.cart_item button:text("Remove")');
        await removeButton.click();
        console.log(`Clicked "Remove" button for item: ${itemName}`);

        // Verify the item is removed
        await expect(cartItem).toHaveCount(0);
        console.log(`Verified item was removed from the cart.`);
    });

    test.afterEach(async ({ page }) => {
        await page.context().clearCookies();
    });
});
