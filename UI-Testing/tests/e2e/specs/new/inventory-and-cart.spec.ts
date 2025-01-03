import { test, expect } from '@playwright/test';
import { login } from './loginHelper';

test.beforeEach(async ({ page }) => {
    await login(page);
});

test('Add item to cart and verify in cart page on SauceDemo', async ({ page }) => {
    // Navigate to the inventory page
    await page.goto('https://www.saucedemo.com/v1/inventory.html');

    // Locate the first inventory item and get its name
    const firstItem = page.locator('.inventory_item').first();
    const itemName = await firstItem.locator('.inventory_item_name').innerText();

    // Add the first item to the cart
    await firstItem.locator('text=ADD TO CART').click();

    // Verify the cart badge shows 1 item
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

    // Navigate to the cart page
    await page.goto('https://www.saucedemo.com/v1/cart.html');

    // Verify the item name in the cart
    const cartItemName = page.locator('.cart_item .inventory_item_name');
    await expect(cartItemName).toHaveText(itemName);

    await new Promise(resolve => setTimeout(resolve, 3000));
}); 