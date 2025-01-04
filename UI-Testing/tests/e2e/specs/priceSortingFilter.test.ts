import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { login } from '../helpers/loginHelper';

test.describe('Price Sorting Filter', () => {
  test('should sort items by price low to high', async ({ page }) => {
    await login(page);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await inventoryPage.selectFilterOption('Price (low to high)');
    
    const prices = await inventoryPage.getAllItemPrices();
    const isSortedAscending = prices.every((price, i, arr) => i === 0 || arr[i - 1] <= price);
    expect(isSortedAscending).toBeTruthy();
  });

  test('should sort items by price high to low', async ({ page }) => {
    await login(page);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await inventoryPage.selectFilterOption('Price (high to low)');
    
    const prices = await inventoryPage.getAllItemPrices();
    const isSortedDescending = prices.every((price, i, arr) => i === 0 || arr[i - 1] >= price);
    expect(isSortedDescending).toBeTruthy();
  });
}); 