import { test, expect } from '@playwright/test';
import { login } from './loginHelper';
import { CartPage } from '../../pages/cart.page';

test.describe('Checkout with Empty Cart', () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('Verify checkout is not allowed with an empty cart', async ({ page }) => {
        // Navigate to cart page
        await page.goto('https://www.saucedemo.com/v1/cart.html');
        await page.waitForLoadState('networkidle');
        
        // Verify the cart is empty
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(0);
        console.log('Verified cart is empty.');

        // Try to checkout
        const cartPage = new CartPage(page);
        await cartPage.viewCart();  // Make sure we're in the cart view
        
        // Verify we can't proceed with checkout (cart should be empty)
        const checkoutButton = page.locator('[data-test="checkout"]');
        await expect(checkoutButton).toBeDisabled();
        
        // Additional verification that we stay on cart page
        await expect(page).toHaveURL(/.*cart.html/);
    });
});