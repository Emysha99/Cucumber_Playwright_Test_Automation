import { test, expect, Page } from '@playwright/test';
import { login } from '../helpers/loginHelper';

// Helper function to extract item names as an array of strings
async function getItemNames(page: Page): Promise<string[]> {
    return await page.locator('.inventory_item_name').allTextContents();
}

test.describe('Verify Item Name Sorting Functionality (A to Z and Z to A)', () => {
    test.beforeEach(async ({ page }) => {
        // Log in and navigate to the inventory page
        await login(page);
        await page.goto('https://www.saucedemo.com/v1/inventory.html');
    });

    test('Verify sorting by item name (A to Z)', async ({ page }) => {
        console.log('Selecting "Name (A to Z)" filter...');

        // Select the filter option
        await page.selectOption('.product_sort_container', { label: 'Name (A to Z)' });

        // Wait for the sorting to apply
        await page.waitForTimeout(1000);

        // Extract item names and verify they are sorted alphabetically
        const names: string[] = await getItemNames(page);
        console.log('Names after sorting (A to Z):', names);

        const isSortedAscending = names.every((name, i, arr) => i === 0 || arr[i - 1] <= name);
        expect(isSortedAscending).toBeTruthy();
        console.log('Verified that items are sorted by name (A to Z).');
    });

    test('Verify sorting by item name (Z to A)', async ({ page }) => {
        console.log('\nSelecting "Name (Z to A)" filter...');

        // Select the filter option
        await page.selectOption('.product_sort_container', { label: 'Name (Z to A)' });

        // Wait for the sorting to apply
        await page.waitForTimeout(1000);

        // Extract item names and verify they are sorted in reverse alphabetical order
        const names: string[] = await getItemNames(page);
        console.log('Names after sorting (Z to A):', names);

        const isSortedDescending = names.every((name, i, arr) => i === 0 || arr[i - 1] >= name);
        expect(isSortedDescending).toBeTruthy();
        console.log('Verified that items are sorted by name (Z to A).');
    });

    test.afterEach(async ({ page }) => {
        await page.context().clearCookies();
    });
});
