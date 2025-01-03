import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('the user proceeds to checkout', async function(this: CustomWorld) {
    const page = this.getPage();
    await page.click('.shopping_cart_link');
    await page.click('#checkout');
});

When('enters customer information:', async function(this: CustomWorld, dataTable) {
    const page = this.getPage();
    const customerInfo = dataTable.hashes()[0];
    await page.fill('#first-name', customerInfo.firstName);
    await page.fill('#last-name', customerInfo.lastName);
    await page.fill('#postal-code', customerInfo.postalCode);
    await page.click('#continue');
});

When('completes the purchase', async function(this: CustomWorld) {
    const page = this.getPage();
    await page.click('#finish');
});

Then('the order confirmation message should be displayed', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

Given('the user has completed the checkout process', async function(this: CustomWorld) {
    const page = this.getPage();
    await page.click(`[data-test="add-to-cart-sauce-labs-backpack"]`);
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');
});

When('the user views the order confirmation page', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page.locator('.complete-header')).toBeVisible();
});

Then('the order should be confirmed with a thank you message', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

Then('the total price should be the sum of all item prices', async function(this: CustomWorld) {
    const page = this.getPage();
    await page.waitForSelector('.cart_item');
    const prices = await page.$$eval('.inventory_item_price', 
        elements => elements.map(el => parseFloat(el.textContent!.replace('$', '')))
    );
    const total = prices.reduce((sum, price) => sum + price, 0);
    await page.waitForSelector('.summary_subtotal_label');
    const displayedTotal = await page.locator('.summary_subtotal_label').textContent();
    const actualTotal = parseFloat(displayedTotal!.split('$')[1]);
    expect(actualTotal).toBeCloseTo(total, 2);
});

Then('the summary should display all items and total price', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page.locator('.cart_item')).toBeVisible();
    await expect(page.locator('.summary_subtotal_label')).toBeVisible();
}); 