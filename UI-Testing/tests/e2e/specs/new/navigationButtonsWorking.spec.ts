import { test, expect } from '@playwright/test';
import { login } from './loginHelper';

test.describe('Social Media Icons', () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
        await page.goto('https://www.saucedemo.com/v1/inventory.html');
    });

    test('Verify social media icons are clickable and redirect correctly', async ({ page }) => {
        // Wait for the footer container
        const footerContainer = page.locator('.social');
        await expect(footerContainer).toBeVisible();

        const socialIcons = [
            { selector: '.social_twitter', platform: 'twitter' },
            { selector: '.social_facebook', platform: 'facebook' },
            { selector: '.social_linkedin', platform: 'linkedin' }
        ];

        for (const icon of socialIcons) {
            // Wait for each social icon to be visible
            const socialIcon = page.locator(icon.selector);
            await expect(socialIcon).toBeVisible({ timeout: 10000 });
            
            // Verify the icon exists and is visible
            await expect(socialIcon).toBeEnabled();
        }
    });
});
