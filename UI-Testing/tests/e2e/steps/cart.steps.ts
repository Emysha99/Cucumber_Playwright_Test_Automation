import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('the user adds {string} to the cart', async function(this: CustomWorld, productName: string) {
    const page = this.getPage();
    const productContainer = page.locator('.inventory_item', { hasText: productName });
    await productContainer.locator('button', { hasText: 'Add to cart' }).click();
});

Then('the shopping cart badge should show {string}', async function(this: CustomWorld, count: string) {
    const page = this.getPage();
    await expect(page.locator('.shopping_cart_badge')).toHaveText(count);
});

Given('the user has added {string} to the cart', async function(this: CustomWorld, productName: string) {
    const page = this.getPage();
    const productContainer = page.locator('.inventory_item', { hasText: productName });
    await productContainer.locator('button', { hasText: 'Add to cart' }).click();
});

When('the user clicks the remove button for {string}', async function(this: CustomWorld, productName: string) {
    const page = this.getPage();
    const productContainer = page.locator('.inventory_item', { hasText: productName });
    await productContainer.locator('button', { hasText: 'Remove' }).click();
});

Then('the shopping cart badge should not be visible', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
});

When('the user views the cart', async function(this: CustomWorld) {
    const page = this.getPage();
    await page.click('.shopping_cart_link');
});

Then('the cart should contain {int} items', async function(this: CustomWorld, expectedCount: number) {
    const page = this.getPage();
    const badge = await page.locator('.shopping_cart_badge').textContent();
    expect(parseInt(badge || '0')).toBe(expectedCount);
});

Given('the user has {int} items in the cart', async function(this: CustomWorld, itemCount: number) {
    const page = this.getPage();
    await page.click(`[data-test="add-to-cart-sauce-labs-backpack"]`);
    await page.click(`[data-test="add-to-cart-sauce-labs-bike-light"]`);
    const badge = await page.locator('.shopping_cart_badge').textContent();
    expect(parseInt(badge || '0')).toBe(itemCount);
});

When('the user views the cart badge', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page.locator('.shopping_cart_badge')).toBeVisible();
});

Then('the cart badge should display {string}', async function(this: CustomWorld, expectedCount: string) {
    const page = this.getPage();
    await expect(page.locator('.shopping_cart_badge')).toHaveText(expectedCount);
});

Then('the {string} button should change to {string}', async function(this: CustomWorld, fromText: string, toText: string) {
    const page = this.getPage();
    const buttonSelector = '[data-test="add-to-cart-sauce-labs-backpack"], [data-test="remove-sauce-labs-backpack"]';
    await expect(page.locator(buttonSelector)).toHaveText(toText);
});

When('the user clicks on the shopping cart', async function(this: CustomWorld) {
    const page = this.getPage();
    await page.click('.shopping_cart_link');
});

Then('the cart page should be displayed', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page).toHaveURL(/.*cart.html/);
});

Then('the cart should show correct item details', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page.locator('.cart_item_label')).toBeVisible();
    await expect(page.locator('.inventory_item_price')).toBeVisible();
    await expect(page.locator('.inventory_item_desc')).toBeVisible();
});

When('the user adds {string} and {string} to the cart', async function(this: CustomWorld, item1: string, item2: string) {
    const page = this.getPage();
    const addToCartButton1 = page.locator('.inventory_item', { hasText: item1 })
        .locator('button', { hasText: 'Add to cart' });
    const addToCartButton2 = page.locator('.inventory_item', { hasText: item2 })
        .locator('button', { hasText: 'Add to cart' });
    
    await addToCartButton1.click();
    await addToCartButton2.click();
}); 