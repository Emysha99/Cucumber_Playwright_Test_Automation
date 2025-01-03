import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/product.page';
import { AuthPage } from '../pages/auth.page';

test.describe('Product Management', () => {
    let productPage: ProductPage;
    let authPage: AuthPage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        productPage = new ProductPage(page);
        
        await authPage.goto();
        await authPage.login('standard_user', 'secret_sauce');
    });

    test('should sort products by price low to high', async () => {
        await productPage.sortBy('Price (low to high)');
        const prices = await productPage.getAllPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('should display product details', async () => {
        await productPage.clickProduct('Sauce Labs Backpack');
        await expect(productPage.productTitle).toBeVisible();
        await expect(productPage.productPrice).toBeVisible();
        await expect(productPage.productDescription).toBeVisible();
    });

    test('should sort products alphabetically', async () => {
        await productPage.sortBy('Name (A to Z)');
        const names = await productPage.getAllProductNames();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    });

    test('should show product images', async () => {
        await productPage.clickProduct('Sauce Labs Backpack');
        await expect(productPage.productImage).toBeVisible();
    });
}); 