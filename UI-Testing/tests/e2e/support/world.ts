import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export class CustomWorld extends World {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;

    async init() {
        try {
            // Close any existing browser instance
            await this.teardown();

            // Launch new browser
            this.browser = await chromium.launch({ 
                headless: false,
                slowMo: 500,
                timeout: 60000
            });
            this.context = await this.browser.newContext({
                viewport: { width: 1920, height: 1080 }
            });
            this.page = await this.context.newPage();
        } catch (error) {
            console.error('Browser initialization failed:', error);
            await this.teardown();
            throw error;
        }
    }

    async teardown() {
        try {
            if (this.page) {
                await this.page.close().catch(() => {});
                this.page = null;
            }
            if (this.context) {
                await this.context.close().catch(() => {});
                this.context = null;
            }
            if (this.browser) {
                await this.browser.close().catch(() => {});
                this.browser = null;
            }
        } catch (error) {
            console.error('Teardown failed:', error);
            // Force close any remaining chromium processes
            try {
                if (process.platform === 'win32') {
                    require('child_process').execSync('taskkill /F /IM chrome.exe /IM chromium.exe', { stdio: 'ignore' });
                } else {
                    require('child_process').execSync('pkill -f "chromium|chrome"', { stdio: 'ignore' });
                }
            } catch (e) {
                // Ignore if no processes to kill
            }
        }
    }

    getPage(): Page {
        if (!this.page) {
            throw new Error('Page is not initialized');
        }
        return this.page;
    }
}

setWorldConstructor(CustomWorld); 