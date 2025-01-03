import { test, expect } from '@playwright/test';
import { login } from '../helpers/loginHelper';
import { CartPage } from '../pages/cart.page';

test.describe('Checkout with Empty Cart', () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('Verify checkout flow with empty cart', async ({ page }) => {
        // Navigate to cart page
        await page.goto('https://www.saucedemo.com/cart.html');
        await page.waitForLoadState('networkidle');
        
        // Verify the cart is empty
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(0);
        console.log('Verified cart is empty.');

        // Verify checkout button is present and clickable
        const cartPage = new CartPage(page);
        await cartPage.checkout();
        
        // Verify we are taken to the checkout page
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        
        // Verify we're on the checkout information page
        const checkoutForm = page.locator('#checkout_info_container');
        await expect(checkoutForm).toBeVisible();
    });
});