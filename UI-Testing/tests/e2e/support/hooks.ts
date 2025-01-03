import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world';

setDefaultTimeout(120000);

Before(async function(this: CustomWorld) {
    await this.init();
    const page = this.getPage();
    
    // Add retry logic for page navigation
    let retries = 3;
    while (retries > 0) {
        try {
            await page.goto('https://www.saucedemo.com', { 
                timeout: 30000,
                waitUntil: 'networkidle'
            });
            break;
        } catch (error) {
            retries--;
            if (retries === 0) throw error;
            await page.waitForTimeout(2000); // Wait before retry
        }
    }
});

After(async function(this: CustomWorld, scenario) {
    try {
        // Take screenshot if scenario failed
        if (scenario.result?.status === 'FAILED') {
            const page = this.getPage();
            const screenshot = await page.screenshot({
                path: `./test-results/screenshots/${scenario.pickle.name.replace(/ /g, '_')}.png`,
                fullPage: true
            });
            await this.attach(screenshot, 'image/png');
        }
    } catch (error) {
        console.error('Failed to take screenshot:', error);
    } finally {
        // Always close the browser
        await this.teardown();
    }
}); 