import { test, expect } from '@playwright/test';
import { login } from './loginHelper';

test.describe('Social Media Icons', () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
        // Navigate to the page where the social media icons are present
        await page.goto('https://www.saucedemo.com/v1/inventory.html');
    });

    test('Verify social media icons are clickable and redirect correctly', async ({ page, context }) => {
        // Define the social media icons and expected redirection
        const socialMediaIcons = [
            { selector: 'li.social_facebook', expectedUrl: 'https://www.facebook.com/saucelabs' },
            { selector: 'li.social_twitter', expectedUrl: 'https://twitter.com/saucelabs' },
            { selector: 'li.social_linkedin', expectedUrl: 'https://www.linkedin.com/company/sauce-labs/' },
        ];

        for (const icon of socialMediaIcons) {
            // Verify the icon is visible
            const socialIcon = page.locator(icon.selector);
            await expect(socialIcon).toBeVisible();
            console.log(`Verified visibility for ${icon.selector}`);

            // Attempt to click the icon and validate redirection
            const [newPage] = await Promise.all([
                context.waitForEvent('page'), // Wait for a new tab to open
                socialIcon.click(), // Click the icon
            ]);

            await newPage.waitForLoadState('load');

            // Validate the redirection URL
            const redirectedUrl = newPage.url();
            console.log(`Clicked on ${icon.selector} and redirected to: ${redirectedUrl}`);
            expect(redirectedUrl).toContain(icon.expectedUrl);

            // Close the new tab
            await newPage.close();
        }
    });

    test.afterEach(async ({ page }) => {
        await page.context().clearCookies();
    });
});
