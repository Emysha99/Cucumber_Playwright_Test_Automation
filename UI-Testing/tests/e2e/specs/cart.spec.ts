import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { AuthPage } from '../pages/auth.page';

test.describe('Shopping Cart', () => {
    let cartPage: CartPage;
    let authPage: AuthPage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        cartPage = new CartPage(page);
        
        // Login before each test
        await authPage.goto();
        await authPage.login('standard_user', 'secret_sauce');
    });

    test('should add item to cart', async () => {
        await cartPage.addToCart('Sauce Labs Backpack');
        await expect(cartPage.cartBadge).toHaveText('1');
    });

    test('should remove item from cart', async () => {
        await cartPage.addToCart('Sauce Labs Backpack');
        await cartPage.removeFromCart('Sauce Labs Backpack');
        await expect(cartPage.cartBadge).toBeHidden();
    });

    test('should add multiple items to cart', async () => {
        await cartPage.addToCart('Sauce Labs Backpack');
        await cartPage.addToCart('Sauce Labs Bike Light');
        await expect(cartPage.cartBadge).toHaveText('2');
    });

    test('should display correct items in cart', async () => {
        await cartPage.addToCart('Sauce Labs Backpack');
        await cartPage.viewCart();
        await expect(cartPage.cartItems).toHaveCount(1);
    });
}); 