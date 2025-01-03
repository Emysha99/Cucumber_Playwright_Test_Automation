import { Given, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// Increase global timeout
setDefaultTimeout(120000); // 2 minutes

Before(async function(this: CustomWorld) {
    await this.init();
    const page = this.getPage();
    await page.goto('https://www.saucedemo.com', { timeout: 60000 });
});

After(async function(this: CustomWorld) {
    await this.teardown();
});

Given('the user is logged in with credentials:', async function(this: CustomWorld, dataTable) {
    const page = this.getPage();
    const credentials = dataTable.hashes()[0];
    
    // Add retry logic and increase timeout
    await page.waitForSelector('[data-test="username"]', { 
        timeout: 30000,
        state: 'visible'
    });
    
    // Add delay between actions
    await page.fill('[data-test="username"]', credentials.username);
    await page.waitForTimeout(1000);
    await page.fill('[data-test="password"]', credentials.password);
    await page.waitForTimeout(1000);
    await page.click('[data-test="login-button"]');
    
    // Wait for navigation with increased timeout
    await page.waitForURL('https://www.saucedemo.com/inventory.html', { 
        timeout: 30000 
    });
});

Then('the user should be on the inventory page', async function(this: CustomWorld) {
    const page = this.getPage();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.inventory_list')).toBeVisible();
}); 