import { Page } from '@playwright/test';

export class InventoryPage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/v1/inventory.html');
    }

    async getFirstItemName(): Promise<string> {
        return await this.page.locator('.inventory_item').first().locator('.inventory_item_name').innerText();
    }

    async addFirstItemToCart() {
        await this.page.locator('.inventory_item').first().locator('text=Add to cart').click();
    }

    async addMultipleItemsToCart(count: number) {
        const addToCartButtons = this.page.locator('button:text("Add to cart")');
        for (let i = 0; i < count; i++) {
            await addToCartButtons.nth(i).click();
        }
    }

    async selectFilterOption(option: string) {
        await this.page.selectOption('.product_sort_container', { label: option });
    }

    async getAllItemNames(): Promise<string[]> {
        return await this.page.locator('.inventory_item_name').allTextContents();
    }

    async getAllItemPrices(): Promise<number[]> {
        const priceElements = await this.page.$$('.inventory_item_price');
        return Promise.all(
            priceElements.map(async (element) => {
                const priceText = await element.textContent() || '';
                return parseFloat(priceText.replace('$', ''));
            })
        );
    }
}