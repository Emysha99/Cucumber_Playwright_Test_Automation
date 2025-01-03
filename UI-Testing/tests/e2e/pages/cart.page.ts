import { Page } from '@playwright/test';

export class CartPage {
    readonly cartBadge;
    readonly cartItems;
    readonly cartLink;

    constructor(private page: Page) {
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async addToCart(productName: string) {
        const productContainer = this.page.locator('.inventory_item', { hasText: productName });
        await productContainer.locator('button', { hasText: 'Add to cart' }).click();
    }

    async removeFromCart(productName: string) {
        const productContainer = this.page.locator('.inventory_item', { hasText: productName });
        await productContainer.locator('button', { hasText: 'Remove' }).click();
    }

    async viewCart() {
        await this.cartLink.click();
    }
} 