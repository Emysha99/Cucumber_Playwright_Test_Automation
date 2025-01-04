import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { login } from '../helpers/loginHelper';

test.describe('Cart Item Removal', () => {
    test('Remove an item from the cart', async ({ page }) => {
        await login(page);

        // Add item to cart
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.navigate();
        const firstItemName = await inventoryPage.getFirstItemName();
        await inventoryPage.addFirstItemToCart();
        
        // Verify item in cart and remove it
        const cartPage = new CartPage(page);
        await cartPage.viewCart();  // Use viewCart instead of navigate
        
        const cartItems = await cartPage.getCartItems();
        expect(cartItems).toContain(firstItemName);
        
        await cartPage.removeItem(firstItemName);
        
        // Verify item was removed
        const updatedCartItems = await cartPage.getCartItems();
        expect(updatedCartItems).not.toContain(firstItemName);
    });
});
