import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SocialMediaPage } from '../pages/socialMedia.page';

Given('I am logged in', async function () {
  const page = this.getPage();
  await page.fill('input[data-test="username"]', 'standard_user');
  await page.fill('input[data-test="password"]', 'secret_sauce');
  await page.click('input[data-test="login-button"]');
});

Given('I am on the inventory page', async function () {
  const page = this.getPage();
  await page.goto('https://www.saucedemo.com/v1/inventory.html');
});

Then('the social media icons should be visible and enabled', async function () {
  const socialMediaPage = new SocialMediaPage(this.getPage());
  await socialMediaPage.verifySocialMediaIcons();
}); 