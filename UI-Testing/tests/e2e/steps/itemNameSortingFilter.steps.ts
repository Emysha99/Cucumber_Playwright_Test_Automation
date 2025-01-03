import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';

Given('I am logged in', async function () {
  const page = this.getPage();
  await page.fill('input[data-test="username"]', 'standard_user');
  await page.fill('input[data-test="password"]', 'secret_sauce');
  await page.click('input[data-test="login-button"]');
});

Given('I am on the inventory page', async function () {
  const inventoryPage = new InventoryPage(this.getPage());
  await inventoryPage.navigate();
});

When('I select the {string} filter', async function (filterOption: string) {
  const inventoryPage = new InventoryPage(this.getPage());
  await inventoryPage.selectFilterOption(filterOption);
});

Then('the items should be sorted alphabetically', async function () {
  const inventoryPage = new InventoryPage(this.getPage());
  const names = await inventoryPage.getAllItemNames();
  const isSortedAscending = names.every((name, i, arr) => i === 0 || arr[i - 1] <= name);
  expect(isSortedAscending).toBeTruthy();
});

Then('the items should be sorted in reverse alphabetical order', async function () {
  const inventoryPage = new InventoryPage(this.getPage());
  const names = await inventoryPage.getAllItemNames();
  const isSortedDescending = names.every((name, i, arr) => i === 0 || arr[i - 1] >= name);
  expect(isSortedDescending).toBeTruthy();
}); 