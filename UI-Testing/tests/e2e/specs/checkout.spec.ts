import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout.page';
import { AuthPage } from '../pages/auth.page';
import { CartPage } from '../pages/cart.page';

test.describe('Checkout Process', () => {
    let checkoutPage: CheckoutPage;
    let authPage: AuthPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        
        // Setup: Login and add item to cart
        await authPage.goto();
        await authPage.login('standard_user', 'secret_sauce');
        await cartPage.addToCart('Sauce Labs Backpack');
    });

    test('should complete checkout process', async () => {
        await cartPage.viewCart();
        await checkoutPage.startCheckout();
        await checkoutPage.fillCustomerInfo('John', 'Doe', '12345');
        await checkoutPage.continueToOverview();
        await checkoutPage.finishCheckout();
        await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
    });

    test('should show correct order summary', async () => {
        await cartPage.viewCart();
        await checkoutPage.startCheckout();
        await checkoutPage.fillCustomerInfo('John', 'Doe', '12345');
        await checkoutPage.continueToOverview();
        await expect(checkoutPage.summaryItems).toBeVisible();
        await expect(checkoutPage.totalPrice).toBeVisible();
    });

    test('should validate customer information', async () => {
        await cartPage.viewCart();
        await checkoutPage.startCheckout();
        await checkoutPage.continueToOverview();
        await expect(checkoutPage.errorMessage).toBeVisible();
    });
}); 