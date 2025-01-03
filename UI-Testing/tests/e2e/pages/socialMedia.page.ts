import { Page } from '@playwright/test';

export class SocialMediaPage {
  constructor(private page: Page) {}

  async verifySocialMediaIcons() {
    const socialIcons = [
      '.social_twitter',
      '.social_facebook',
      '.social_linkedin'
    ];

    for (const selector of socialIcons) {
      const socialIcon = this.page.locator(selector);
      await socialIcon.isVisible();
      await socialIcon.isEnabled();
    }
  }
} 