import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
    },
    timeout: 30000,
    reporter: [
        ['line'],
        ['allure-playwright']
    ]
};

export default config;
