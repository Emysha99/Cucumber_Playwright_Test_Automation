import { Page } from '@playwright/test';

export class ProductPage {
    readonly sortDropdown;
    readonly productTitle;
    readonly productPrice;
    readonly productDescription;
    readonly productImage;

    constructor(private page: Page) {
        this.sortDropdown = page.locator('.product_sort_container');
        this.productTitle = page.locator('.inventory_details_name');
        this.productPrice = page.locator('.inventory_details_price');
        this.productDescription = page.locator('.inventory_details_desc');
        this.productImage = page.locator('.inventory_details_img');
    }

    async sortBy(option: string) {
        await this.sortDropdown.selectOption({ label: option });
    }

    async clickProduct(productName: string) {
        await this.page.click(`.inventory_item_name:has-text("${productName}")`);
    }

    async getAllPrices(): Promise<number[]> {
        const prices = await this.page.$$eval('.inventory_item_price', 
            elements => elements.map(el => parseFloat(el.textContent!.replace('$', '')))
        );
        return prices;
    }

    async getAllProductNames(): Promise<string[]> {
        const names = await this.page.$$eval('.inventory_item_name', 
            elements => elements.map(el => el.textContent!)
        );
        return names;
    }
} 