import { test, expect } from '@playwright/test';
import { login } from './loginHelper';

test.describe('Checkout with Empty Cart', () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('Verify checkout is not allowed with an empty cart', async ({ page }) => {
        // Navigate directly to the cart page
        await page.goto('https://www.saucedemo.com/v1/cart.html');
        await expect(page).toHaveURL('https://www.saucedemo.com/v1/cart.html');

        // Verify the cart is empty
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(0);
        console.log('Verified cart is empty.');

        // Attempt to proceed to checkout
        const checkoutButton = page.locator('text=Checkout');
        await checkoutButton.click();
        console.log('Clicked on "Checkout" button.');

        // Verify whether the user can proceed with an empty cart
        const errorMessage = page.locator('.error-message-container');
        if (await errorMessage.isVisible()) {
            console.log('Checkout prevented with an empty cart.');
        } else {
            console.log('Checkout allowed with an empty cart - this is unexpected!');
        }

        // Add an assertion to enforce the expected behavior
        await expect(errorMessage).toBeVisible();
        console.log('Verified that checkout is not allowed with an empty cart.');
    });

    test.afterEach(async ({ page }) => {
        await page.context().clearCookies();
    });
});