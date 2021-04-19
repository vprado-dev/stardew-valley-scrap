import puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';

export const withBrowser = async (
  handler: (browser: Browser, page: Page) => Promise<void>,
) => {
  const browser = await puppeteer.launch({
    headless: !!+(process.env.HEADLESS || 0),
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  });
  try {
    const [page] = await browser.pages();

    if (!page) {
      throw new Error('failed to create browser page');
    }

    await handler(browser, page);
  } finally {
    await browser.close();
  }
};
