import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { login } from '../helpers/loginHelper';

Given('I am logged in', async function () {
  const page = this.page;
  await login(page);
});

Given('I am on the inventory page', async function () {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.navigate();
});

When('I select the {string} filter', async function (filterOption: string) {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.selectFilterOption(filterOption);
});

Then('the items should be sorted by price in ascending order', async function () {
  const inventoryPage = new InventoryPage(this.page);
  const prices = await inventoryPage.getAllItemPrices();
  const isSortedAscending = prices.every((price, i, arr) => i === 0 || arr[i - 1] <= price);
  expect(isSortedAscending).toBeTruthy();
});

Then('the items should be sorted by price in descending order', async function () {
  const inventoryPage = new InventoryPage(this.page);
  const prices = await inventoryPage.getAllItemPrices();
  const isSortedDescending = prices.every((price, i, arr) => i === 0 || arr[i - 1] >= price);
  expect(isSortedDescending).toBeTruthy();
}); 