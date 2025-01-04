import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { login } from '../helpers/loginHelper';

test.describe('Product Image Visibility', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Verify all product images are visible', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    
    const productImages = page.locator('.inventory_item_img');
    const imageCount = await productImages.count();
    
    for (let i = 0; i < imageCount; i++) {
      const image = productImages.nth(i);
      await expect(image).toBeVisible();
    }
  });
}); 