/**
 * @file navigation.test.js
 * @description End-to-end tests for Pyrmont Brewery website navigation
 * Tests all links, buttons, and navigation flows to ensure no dead ends
 * @author Pyrmont Brewery
 * @version 1.0.0
 */

const { test, expect } = require('@playwright/test');

test.describe('Pyrmont Brewery Website Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('https://beerbrewing.github.io');
  });

  test('Homepage loads and contains core elements', async ({ page }) => {
    // Verify the page title
    await expect(page).toHaveTitle(/Pyrmont Brewery/);

    // Check that key elements are visible
    await expect(page.locator('.App-header')).toBeVisible();

    // Verify that main navigation links exist
    await expect(page.locator('a[href="/"]')).toBeVisible();

    // Check for age verification if it exists
    const ageVerification = page.locator('text=Are you over 18?');
    if (await ageVerification.count() > 0) {
      // Age verification is present, validate it works
      await expect(ageVerification).toBeVisible();

      // Find and click the "Yes" button
      await page.locator('.ButtonYes').click();

      // Verify we moved past age verification
      await expect(page.locator('text=Are you over 18?')).not.toBeVisible();
    }
  });

  test('Navigating to each primary page works', async ({ page }) => {
    // Array of main navigation paths to test
    const paths = [
      { path: '/about.html', pageTitle: 'Pyrmont Brewery - About' },
      { path: '/time.html', pageTitle: 'Pyrmont Brewery - Time' },
      { path: '/streams.html', pageTitle: 'Pyrmont Brewery - Streams' },
      { path: '/privacy.html', pageTitle: 'Pyrmont Brewery - Privacy' },
    ];

    // Test each path
    for (const { path, pageTitle } of paths) {
      // Navigate to the path
      await page.goto(`https://beerbrewing.github.io${path}`);

      // Verify we landed on the correct page
      await expect(page).toHaveTitle(new RegExp(pageTitle));

      // Verify we can navigate back to home
      const homeLink = page.locator('a[href="index.html"], a[href="/"], a:has-text("Return to Home")');
      if (await homeLink.count() > 0) {
        await homeLink.first().click();
        await expect(page).toHaveURL(/beerbrewing.github.io\/?$/);
      }
    }
  });

  test('Beer links navigate to proper destinations', async ({ page }) => {
    // Handle age verification if present
    const ageVerification = page.locator('text=Are you over 18?');
    if (await ageVerification.count() > 0) {
      await page.locator('.ButtonYes').click();
    }

    // Locate beer links (these vary based on your specific site structure)
    const beerLinks = await page.locator('.Beer-link').all();

    // Skip test if no beer links found (may be hidden behind age verification)
    if (beerLinks.length === 0) {
      test.skip('No beer links found to test');
      return;
    }

    // Test first 3 beer links to avoid excessive testing
    for (let i = 0; i < Math.min(3, beerLinks.length); i++) {
      // Store the current URL before clicking
      const currentUrl = page.url();

      // Click the beer link
      await beerLinks[i].click();

      // Check if it opened a new tab/window or changed the URL
      const newUrl = page.url();

      // If URL changed, we should be able to go back
      if (newUrl !== currentUrl) {
        await page.goBack();
        await expect(page).toHaveURL(currentUrl);
      }

      // If it was a mailto link, the URL would remain the same
      // We can't fully test email links in automated tests
    }
  });

  test('Social media links work correctly', async ({ page }) => {
    // Find social media links by their common patterns
    const socialLinks = await page.locator('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="instagram.com"]').all();

    if (socialLinks.length === 0) {
      test.skip('No social media links found');
      return;
    }

    for (const link of socialLinks) {
      // Get the href attribute
      const href = await link.getAttribute('href');

      // Verify the link has a valid URL
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);

      // We don't actually navigate to external sites in tests,
      // but we verify the links exist and have proper formats
    }
  });

  test('Footer links are functional', async ({ page }) => {
    // Scroll to the bottom of the page to ensure footer is visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Find all links in the footer
    const footerLinks = await page.locator('footer a, .footer a').all();

    if (footerLinks.length === 0) {
      test.skip('No footer links found');
      return;
    }

    // Test each footer link that points to an internal page
    for (const link of footerLinks) {
      const href = await link.getAttribute('href');

      // Only test internal links (skip external links and mailto)
      if (href && !href.startsWith('http') && !href.startsWith('mailto:')) {
        // Store current URL
        const currentUrl = page.url();

        // Click the link
        await link.click();

        // Check we navigated somewhere
        await expect(page).not.toHaveURL(currentUrl);

        // Go back for the next test
        await page.goBack();
      }
    }
  });

  test('No broken images on main pages', async ({ page }) => {
    // Function to check for broken images
    const checkImagesOnPage = async () => {
      // This evaluates in the browser context
      const brokenImages = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img'))
          .filter(img => !img.complete || img.naturalWidth === 0)
          .map(img => img.src);
      });

      expect(brokenImages).toEqual([]);
    };

    // Check homepage images
    await checkImagesOnPage();

    // Array of main pages to check
    const pagesToCheck = [
      '/about.html',
      '/time.html',
      '/privacy.html'
    ];

    // Test each page
    for (const path of pagesToCheck) {
      await page.goto(`https://beerbrewing.github.io${path}`);
      await checkImagesOnPage();
    }
  });

  test('Age verification functions properly', async ({ page }) => {
    // Go to home page
    await page.goto('https://beerbrewing.github.io');

    // Look for age verification
    const ageVerification = page.locator('text=Are you over 18?');
    if (await ageVerification.count() === 0) {
      test.skip('No age verification found');
      return;
    }

    // Test "No" path - should restrict access
    await page.locator('.ButtonNo').click();
    await expect(page.locator('text=/Sorry|Age restricted|Not old enough/')).toBeVisible();

    // Refresh and test "Yes" path
    await page.reload();
    await page.locator('.ButtonYes').click();

    // Should show beer content after confirming age
    await expect(page.locator('.Beer, .BeerTitle, h1:has-text("Pyrmont Brewery")')).toBeVisible();
  });
});
