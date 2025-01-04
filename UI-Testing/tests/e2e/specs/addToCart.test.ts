import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { login } from '../helpers/loginHelper';

test.describe('Add to Cart Functionality', () => {
    test('Can add an item to the cart', async ({ page }) => {
        await login(page);
        await page.waitForLoadState('networkidle');

        // Navigate to inventory and add item
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.navigate();
        const firstItemName = await inventoryPage.getFirstItemName();
        await inventoryPage.addFirstItemToCart();
        
        // Wait for cart badge to appear
        await page.waitForSelector('.shopping_cart_badge');

        // View cart using cart icon
        const cartPage = new CartPage(page);
        await cartPage.viewCart();
        
        // Verify item in cart
        const cartItems = await cartPage.getCartItems();
        expect(cartItems).toContain(firstItemName);
    });
});
