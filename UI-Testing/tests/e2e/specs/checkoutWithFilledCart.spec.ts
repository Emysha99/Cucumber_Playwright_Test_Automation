import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { login } from '../helpers/loginHelper';

test.describe('Checkout with Filled Cart', () => {
    test('Complete checkout process', async ({ page }) => {
        // Login and wait for page load
        await login(page);
        await page.waitForLoadState('networkidle');
        
        // Add item to cart
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.navigate();
        await inventoryPage.addFirstItemToCart();
        
        // Wait for cart badge and navigate to cart
        await page.waitForSelector('.shopping_cart_badge');
        const cartPage = new CartPage(page);
        await cartPage.viewCart();
        
        // Complete checkout process with waits between steps
        await cartPage.checkout();
        
        await cartPage.fillCheckoutInfo('John', 'Doe', '12345');
        
        await cartPage.finishCheckout();
        
        // Verify completion
        expect(await cartPage.isCheckoutComplete()).toBeTruthy();
    });
}); 