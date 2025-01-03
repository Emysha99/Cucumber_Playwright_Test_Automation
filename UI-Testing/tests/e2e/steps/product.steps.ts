import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('the user clicks on product {string}', async function(this: CustomWorld, productName: string) {
    const page = this.getPage();
    await page.click(`.inventory_item_name:has-text("${productName}")`);
});

Then('the product details should be displayed:', async function(this: CustomWorld, dataTable) {
    const page = this.getPage();
    const expectedDetails = dataTable.hashes()[0];
    if (expectedDetails.title === 'visible') {
        await expect(page.locator('.inventory_details_name')).toBeVisible();
    }
    await expect(page.locator('.inventory_details_price')).toHaveText(expectedDetails.price);
    await expect(page.locator('.inventory_details_desc')).toContainText(expectedDetails.description);
});

When('the user checks the price of {string}', async function(this: CustomWorld, productName: string) {
    const page = this.getPage();
    const priceElement = page.locator('.inventory_item', { hasText: productName })
        .locator('.inventory_item_price');
    await expect(priceElement).toBeVisible();
});

Then('the price should be {string}', async function(this: CustomWorld, expectedPrice: string) {
    const page = this.getPage();
    const price = await page.locator('.inventory_item_price').first().textContent();
    expect(price).toBe(expectedPrice);
});

When('the user checks the description of {string}', async function(this: CustomWorld, productName: string) {
    const page = this.getPage();
    await page.click(`.inventory_item_name:has-text("${productName}")`);
});

Then('the description should match the expected text', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page.locator('.inventory_details_desc')).toBeVisible();
});

When('the user sorts products by {string}', async function(this: CustomWorld, sortOption: string) {
    const page = this.getPage();
    await page.selectOption('.product_sort_container', {
        label: sortOption
    });
});

Then('the products should be sorted by price in ascending order', async function(this: CustomWorld) {
    const page = this.getPage();
    const prices = await page.$$eval('.inventory_item_price',
        elements => elements.map(el => parseFloat(el.textContent!.replace('$', '')))
    );
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
});

Then('the items should be displayed in alphabetical order', async function(this: CustomWorld) {
    const page = this.getPage();
    const names = await page.$$eval('.inventory_item_name', 
        elements => elements.map(el => el.textContent)
    );
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
});

When('the user views the image of {string}', async function(this: CustomWorld, productName: string) {
    const page = this.getPage();
    await page.click(`.inventory_item_name:has-text("${productName}")`);
});

Then('the image should be displayed correctly', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page.locator('.inventory_details_img')).toBeVisible();
});

When('the user checks the availability of {string}', async function(this: CustomWorld, productName: string) {
    const page = this.getPage();
    await page.click(`.inventory_item_name:has-text("${productName}")`);
});

Then('the product should be available for purchase', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page.locator('[data-test^="add-to-cart"]')).toBeVisible();
}); 