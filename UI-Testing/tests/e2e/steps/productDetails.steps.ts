import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { ProductPage } from '../pages/product.page';
import { login } from '../helpers/loginHelper';

Given('I am logged in', async function () {
  const page = this.page;
  await login(page);
});

When('I navigate to the inventory page', async function () {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.navigate();
});

When('I click on a product name', async function () {
  const inventoryPage = new InventoryPage(this.page);
  const firstProductName = await inventoryPage.getFirstItemName();
  const productPage = new ProductPage(this.page);
  await productPage.addToCart(firstProductName);
});

Then('I should be taken to the product details page', async function () {
  const productPage = new ProductPage(this.page);
  const isOnProductDetailsPage = await productPage.isOnProductDetailsPage();
  expect(isOnProductDetailsPage).toBe(true);
});

Then('the product details should be displayed correctly', async function () {
  const productPage = new ProductPage(this.page);
  const productDetails = await productPage.getProductDetails();
  expect(productDetails).toMatchObject({
    name: expect.any(String),
    description: expect.any(String),
    price: expect.any(String),
  });
}); 