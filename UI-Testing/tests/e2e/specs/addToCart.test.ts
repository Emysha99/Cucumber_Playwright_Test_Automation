import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { login } from '../helpers/loginHelper';

test.describe('Add to Cart Functionality', () => {
  test('Can add an item to the cart', async ({ page }) => {
    await login(page);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    
    const firstItemName = await inventoryPage.getFirstItemName();
    await inventoryPage.addFirstItemToCart();
    
    const cartPage = new CartPage(page);
    await cartPage.navigate();
    const cartItems = await cartPage.getCartItems();
    
    expect(cartItems).toContain(firstItemName);
  });
});
