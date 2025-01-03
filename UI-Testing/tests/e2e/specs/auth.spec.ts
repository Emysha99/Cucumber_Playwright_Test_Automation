import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';

test.describe('Authentication', () => {
    let authPage: AuthPage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        await authPage.goto();
    });

    test('should login with valid credentials', async ({ page }) => {
        await authPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('should show error with invalid credentials', async () => {
        await authPage.login('invalid_user', 'invalid_password');
        await expect(authPage.errorMessage).toBeVisible();
    });
}); 