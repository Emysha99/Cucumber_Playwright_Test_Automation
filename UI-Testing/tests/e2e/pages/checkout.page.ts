import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/v1/checkout-step-one.html');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('input[data-test="firstName"]', firstName);
    await this.page.fill('input[data-test="lastName"]', lastName);
    await this.page.fill('input[data-test="postalCode"]', postalCode);
    await this.page.click('input[data-test="continue"]');
  }

  async isCheckoutButtonDisabled(): Promise<boolean> {
    return await this.page.locator('[data-test="checkout"]').isDisabled();
  }
}