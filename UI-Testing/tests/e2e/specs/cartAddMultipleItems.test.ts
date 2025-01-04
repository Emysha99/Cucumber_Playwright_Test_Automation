import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { login } from '../helpers/loginHelper';

test.describe('Add Multiple Items to Cart', () => {
    test('Add multiple items and verify cart badge', async ({ page }) => {
        await login(page);
        
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.navigate();
        
        // Add items and verify badge count
        await inventoryPage.addMultipleItemsToCart(2);
        const badgeCount = await inventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe(2);
        
        // Verify items in cart
        const cartPage = new CartPage(page);
        await cartPage.navigate();
        const cartItems = await cartPage.getCartItems();
        expect(cartItems.length).toBe(2);
    });
});
