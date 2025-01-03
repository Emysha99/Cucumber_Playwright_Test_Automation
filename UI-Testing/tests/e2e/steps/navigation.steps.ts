import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('the user is viewing the cart', async function(this: CustomWorld) {
    const page = this.getPage();
    await page.click('.shopping_cart_link');
});

When('the user clicks continue shopping', async function(this: CustomWorld) {
    const page = this.getPage();
    await page.click('[data-test="continue-shopping"]');
});

Then('the user should return to the inventory page', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page).toHaveURL(/.*inventory.html/);
}); 