import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { login } from '../helpers/loginHelper';

test.describe('Checkout with Filled Cart', () => {
    test('Complete checkout process', async ({ page }) => {
        await login(page);
        await page.waitForLoadState('networkidle');
        
        // Add item to cart
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.navigate();
        await inventoryPage.addFirstItemToCart();
        
        // Go to cart using cart icon instead of direct navigation
        const cartPage = new CartPage(page);
        await cartPage.viewCart();
        
        // Complete checkout process
        await cartPage.checkout();
        await page.waitForLoadState('networkidle');
        
        await cartPage.fillCheckoutInfo('John', 'Doe', '12345');
        await page.waitForLoadState('networkidle');
        
        await cartPage.finishCheckout();
        await page.waitForLoadState('networkidle');
        
        expect(await cartPage.isCheckoutComplete()).toBeTruthy();
    });
}); 