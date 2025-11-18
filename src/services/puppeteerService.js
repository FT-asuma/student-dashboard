// Puppeteer browser management service
const puppeteer = require('puppeteer');
const config = require('../config/config');
const logger = require('../utils/logger');
const helpers = require('../utils/helpers');

class PuppeteerService {
  constructor() {
    this.browsers = new Map(); // Store browser instances by session
    this.browserTimeout = config.BROWSER_TIMEOUT;
  }

  // Launch new browser instance
  async launchBrowser(headless = true) {
    try {
      const browser = await puppeteer.launch({
        headless,
        args: config.PUPPETEER_ARGS,
        timeout: this.browserTimeout
      });
      
      logger.info('Browser launched successfully');
      return browser;
    } catch (error) {
      logger.error('Failed to launch browser:', error);
      throw error;
    }
  }

  // Perform authentication using puppeteer
  async authenticate({ username, password, headless = true }) {
    let browser = null;
    let page = null;

    try {
      // Validate credentials
      if (!username || !password) {
        throw new Error('Missing credentials');
      }

      browser = await this.launchBrowser(headless);
      page = await browser.newPage();
      await page.setDefaultNavigationTimeout(this.browserTimeout);
      await page.setViewport({ width: 1200, height: 800 });

      // Navigate to login page
      await page.goto('https://student.tcti.uz/dashboard/login', { 
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Fill login form with delays to avoid detection
      await page.type('#formstudentlogin-login', username, { delay: 50 });
      await page.type('#formstudentlogin-password', password, { delay: 50 });
      
      // Check and click remember me checkbox
      const rememberCheckbox = await page.$('input#rememberMe');
      if (rememberCheckbox && !(await page.$eval('input#rememberMe', el => el.checked))) {
        await page.click('label[for="rememberMe"]');
      }
      
      // Submit form and wait for navigation
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click('button[type="submit"]')
      ]);

      // Check if authentication was successful
      const currentUrl = page.url();
      if (currentUrl.includes('login')) {
        throw new Error('Authentication failed');
      }

      logger.info(`Authentication successful for user: ${username}`);
      return { browser, page, success: true };

    } catch (error) {
      logger.error('Authentication failed:', error.message);
      await helpers.cleanupBrowser(browser);
      throw error;
    }
  }

  // Close browser instance
  async closeBrowser(sessionId) {
    const browser = this.browsers.get(sessionId);
    if (browser) {
      await helpers.cleanupBrowser(browser);
      this.browsers.delete(sessionId);
    }
  }

  // Close all browsers
  async closeAllBrowsers() {
    for (const [sessionId, browser] of this.browsers) {
      await helpers.cleanupBrowser(browser);
    }
    this.browsers.clear();
  }
}

module.exports = new PuppeteerService();