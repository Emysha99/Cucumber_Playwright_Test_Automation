import { Page } from '@playwright/test';

export class CheckoutPage {
    readonly checkoutButton;
    readonly firstNameInput;
    readonly lastNameInput;
    readonly postalCodeInput;
    readonly continueButton;
    readonly finishButton;
    readonly confirmationMessage;
    readonly summaryItems;
    readonly totalPrice;
    readonly errorMessage;

    constructor(private page: Page) {
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.confirmationMessage = page.locator('.complete-header');
        this.summaryItems = page.locator('.cart_item');
        this.totalPrice = page.locator('.summary_total_label');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async startCheckout() {
        await this.checkoutButton.click();
    }

    async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
} 