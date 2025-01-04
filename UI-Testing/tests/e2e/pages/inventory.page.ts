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
        const addButtons = await this.page.$$('button:has-text("Add to cart")');
        for (let i = 0; i < Math.min(count, addButtons.length); i++) {
            await addButtons[i].click();
            // Wait for cart badge to update
            await this.page.waitForSelector(`.shopping_cart_badge:has-text("${i + 1}")`);
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

    async getCartBadgeCount(): Promise<number> {
        try {
            const badge = await this.page.locator('.shopping_cart_badge');
            const text = await badge.innerText();
            return parseInt(text);
        } catch {
            return 0;
        }
    }
}