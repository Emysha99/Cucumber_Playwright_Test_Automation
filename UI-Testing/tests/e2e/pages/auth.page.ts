import { Page } from '@playwright/test';

export class AuthPage {
    readonly usernameInput;
    readonly passwordInput;
    readonly loginButton;
    readonly errorMessage;

    constructor(private page: Page) {
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Actions
    async goto() {
        await this.page.goto('https://www.saucedemo.com');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
} 