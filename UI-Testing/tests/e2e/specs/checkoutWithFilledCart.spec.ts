import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { login } from '../helpers/loginHelper';

test.describe('Checkout with Filled Cart', () => {
    test('Complete checkout process', async ({ page }) => {
        await login(page);
        
        // Add item to cart
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.navigate();
        await inventoryPage.addFirstItemToCart();
        
        // Go to cart and checkout
        const cartPage = new CartPage(page);
        await cartPage.navigate();
        await cartPage.checkout();
        
        // Fill checkout information
        await cartPage.fillCheckoutInfo('John', 'Doe', '12345');
        
        // Complete checkout
        await cartPage.finishCheckout();
        
        // Verify checkout completion
        expect(await cartPage.isCheckoutComplete()).toBeTruthy();
    });
}); 