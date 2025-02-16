import { Page, expect } from '@playwright/test';

export async function login(page: Page) {
    await page.goto('https://www.saucedemo.com/v1/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);
} 