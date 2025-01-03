import { Page } from '@playwright/test';

export async function login(page: Page) {
  // Navigate to the login page (note: no v1 in URL)
  await page.goto('https://www.saucedemo.com/');
  
  // Wait for the login form to be visible
  await page.waitForSelector('#user-name');
  
  // Enter credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  
  // Click login and wait for navigation
  await page.click('#login-button');
  await page.waitForURL('https://www.saucedemo.com/inventory.html');
} 