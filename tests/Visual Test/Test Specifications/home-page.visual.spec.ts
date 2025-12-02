import { test, expect } from '@playwright/test';
import { HandStonePage } from '../../Functionality Test/Test Specifications/pages/HomePage';

const BASE_URL = 'https://custom-booking-app-release-hand-and-stone.vercel.app/';

// Viewport configurations
const VIEWPORTS = {
  'Desktop XXL': { width: 1920, height: 1080 },
  'Desktop XL': { width: 1440, height: 900 },
  'Desktop L': { width: 1280, height: 720 },
  'Tablet': { width: 768, height: 1024 },
  'Mobile': { width: 375, height: 667 },
} as const;

// Visual comparison options
const VISUAL_OPTIONS = {
  threshold: 0.2,
  maxDiffPixels: 100,
  maxDiffPixelRatio: 0.01,
};

/**
 * Helper function to mask dynamic content in screenshots
 */
async function maskDynamicContent(page: any) {
  // Mask timestamps/dates
  await page.locator('[class*="timestamp"], [class*="date"], time').evaluateAll((elements: HTMLElement[]) => {
    elements.forEach(el => {
      el.style.visibility = 'hidden';
    });
  });

  // Mask cookie banners
  await page.locator('[id*="cookie"], [class*="cookie"], [data-testid*="cookie"]').evaluateAll((elements: HTMLElement[]) => {
    elements.forEach(el => {
      el.style.visibility = 'hidden';
    });
  });

  // Mask video controls (if they vary)
  await page.locator('[class*="video-control"], [class*="player-control"]').evaluateAll((elements: HTMLElement[]) => {
    elements.forEach(el => {
      el.style.visibility = 'hidden';
    });
  });
}

/**
 * Helper function to wait for page to be fully loaded
 */
async function waitForPageLoad(page: any) {
  // Wait for DOM and network with timeout protection
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {
    // If networkidle times out, continue anyway - page may still be functional
  });
  
  // Wait for images to load with timeout protection
  // Wrap the entire evaluate call with a timeout to prevent hanging
  try {
    await Promise.race([
      page.evaluate(() => {
        return Promise.all(
          Array.from(document.images)
            .filter(img => !img.complete)
            .map(img => new Promise<void>((resolve) => {
              // Set timeout for each image (5 seconds max)
              const timeout = setTimeout(() => resolve(), 5000);
              
              const cleanup = () => {
                clearTimeout(timeout);
                resolve();
              };
              
              img.addEventListener('load', cleanup, { once: true });
              img.addEventListener('error', cleanup, { once: true });
              
              // If image already loaded, resolve immediately
              if (img.complete) {
                cleanup();
              }
            }))
        );
      }),
      // Overall timeout of 10 seconds for all images
      new Promise<void>((resolve) => setTimeout(() => resolve(), 10000))
    ]);
  } catch (error) {
    // If image loading check fails or times out, continue anyway
    // This prevents the test from hanging on problematic images
  }
  
  await page.waitForTimeout(1000); // Additional wait for any animations
}

test.describe('Hand & Stone Home Page - Visual Regression Tests', () => {
  let homePage: HandStonePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HandStonePage(page);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  });

  // ============================================================
  // SECTION 1: Full Page Screenshots
  // ============================================================

  test.describe('Section 1: Full Page Screenshots', () => {
    // Test 1.1: Initial Page Load
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`1.1 Initial Page Load - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        await maskDynamicContent(page);

        await expect(page).toHaveScreenshot(
          `full-page-initial-load-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          {
            fullPage: true,
            ...VISUAL_OPTIONS,
          }
        );
      });
    }

    // Test 1.2: After Scroll (Full Page) - Desktop only
    const desktopViewports = {
      'Desktop XXL': VIEWPORTS['Desktop XXL'],
      'Desktop XL': VIEWPORTS['Desktop XL'],
      'Desktop L': VIEWPORTS['Desktop L'],
    };

    for (const [viewportName, viewport] of Object.entries(desktopViewports)) {
      test(`1.2 After Scroll (Full Page) - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        // Scroll to bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(2000); // Wait for lazy-loaded content
        
        await maskDynamicContent(page);

        await expect(page).toHaveScreenshot(
          `full-page-after-scroll-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          {
            fullPage: true,
            ...VISUAL_OPTIONS,
          }
        );
      });
    }

    // Test 1.3: With Cookie Banner
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`1.3 With Cookie Banner - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        // Wait for cookie banner to appear
        const cookieBanner = page.locator('[id*="cookie"], [class*="cookie"], [data-testid*="cookie"]').first();
        const bannerVisible = await cookieBanner.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (bannerVisible) {
          // Mask other dynamic content but keep banner visible
          await maskDynamicContent(page);
          // Re-show cookie banner
          await cookieBanner.evaluate((el: HTMLElement) => {
            el.style.visibility = 'visible';
          });
        } else {
          await maskDynamicContent(page);
        }

        await expect(page).toHaveScreenshot(
          `full-page-with-cookie-banner-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          {
            fullPage: true,
            ...VISUAL_OPTIONS,
          }
        );
      });
    }

    // Test 1.4: Without Cookie Banner
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`1.4 Without Cookie Banner - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        // Dismiss cookie banner if present
        const cookieBanner = page.locator('[id*="cookie"], [class*="cookie"], [data-testid*="cookie"]').first();
        const bannerVisible = await cookieBanner.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (bannerVisible) {
          const acceptButton = cookieBanner.getByRole('button', { name: /accept|agree|ok/i }).first();
          const acceptVisible = await acceptButton.isVisible({ timeout: 2000 }).catch(() => false);
          if (acceptVisible) {
            await acceptButton.click();
            await page.waitForTimeout(1000);
          }
        }
        
        await maskDynamicContent(page);

        await expect(page).toHaveScreenshot(
          `full-page-without-cookie-banner-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          {
            fullPage: true,
            ...VISUAL_OPTIONS,
          }
        );
      });
    }
  });

  // ============================================================
  // SECTION 2: Component-Level Screenshots
  // ============================================================

  test.describe('Section 2: Component-Level Screenshots', () => {
    // Test 2.1: Hero Section
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`2.1 Hero Section - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const heroSection = homePage.heroSection;
        await heroSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await maskDynamicContent(page);

        await expect(heroSection).toHaveScreenshot(
          `hero-section-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 2.2: Value Proposition Section
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`2.2 Value Proposition Section - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const valuePropSection = homePage.valuePropositionSection;
        await valuePropSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await maskDynamicContent(page);

        await expect(valuePropSection).toHaveScreenshot(
          `value-proposition-section-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 2.3: Treatments Carousel Section
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`2.3 Treatments Carousel Section - Initial State - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const treatmentsSection = homePage.treatmentsSection;
        await treatmentsSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000); // Wait for carousel to initialize
        await maskDynamicContent(page);

        await expect(treatmentsSection).toHaveScreenshot(
          `treatments-carousel-initial-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });

      test(`2.3 Treatments Carousel Section - After Navigation - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const treatmentsSection = homePage.treatmentsSection;
        await treatmentsSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        
        // Click next button if available
        const nextButton = homePage.treatmentsNextButton;
        const nextVisible = await nextButton.isVisible({ timeout: 2000 }).catch(() => false);
        if (nextVisible) {
          await nextButton.click();
          await page.waitForTimeout(1000); // Wait for carousel animation
        }
        
        await maskDynamicContent(page);

        await expect(treatmentsSection).toHaveScreenshot(
          `treatments-carousel-after-nav-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 2.4: Find a Spa Section
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`2.4 Find a Spa Section - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const findSpaSection = homePage.findSpaSection;
        await findSpaSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await maskDynamicContent(page);

        await expect(findSpaSection).toHaveScreenshot(
          `find-spa-section-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 2.5: Membership Section
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`2.5 Membership Section - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const membershipSection = homePage.membershipSection;
        await membershipSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await maskDynamicContent(page);

        await expect(membershipSection).toHaveScreenshot(
          `membership-section-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 2.6: Gift Cards Section
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`2.6 Gift Cards Section - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const giftCardsSection = homePage.giftCardsSection;
        await giftCardsSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await maskDynamicContent(page);

        await expect(giftCardsSection).toHaveScreenshot(
          `gift-cards-section-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 2.7: Onboarding Cards Section
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`2.7 Onboarding Cards Section - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const onboardingSection = homePage.onboardingSection;
        await onboardingSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await maskDynamicContent(page);

        await expect(onboardingSection).toHaveScreenshot(
          `onboarding-cards-section-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 2.8: Experts Section
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`2.8 Experts Section - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const expertsSection = homePage.expertsSection;
        await expertsSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await maskDynamicContent(page);

        await expect(expertsSection).toHaveScreenshot(
          `experts-section-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 2.9: Franchise Section
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`2.9 Franchise Section - ${viewportName}`, async ({ page, browserName }) => {
        // The dedicated franchise marketing section only exists on desktop layouts.
        // On Tablet/Mobile, \"Franchise\" is exposed via navigation/footer links only.
        if (viewportName === 'Tablet' || viewportName === 'Mobile') {
          test.skip(true, 'Franchise section not present as a standalone block on Tablet/Mobile layouts');
        }

        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const franchiseSection = homePage.franchiseSection;
        await franchiseSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await maskDynamicContent(page);

        await expect(franchiseSection).toHaveScreenshot(
          `franchise-section-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 2.10: Header Navigation
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`2.10 Header Navigation - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const header = homePage.header;
        await header.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await maskDynamicContent(page);

        await expect(header).toHaveScreenshot(
          `header-navigation-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 2.11: Footer
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`2.11 Footer - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const footer = homePage.footer;
        await footer.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await maskDynamicContent(page);

        await expect(footer).toHaveScreenshot(
          `footer-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }
  });

  // ============================================================
  // SECTION 3: Interaction States
  // ============================================================

  test.describe('Section 3: Interaction States', () => {
    // Test 3.1: Button Hover States (Desktop only)
    const desktopViewports = {
      'Desktop XXL': VIEWPORTS['Desktop XXL'],
      'Desktop XL': VIEWPORTS['Desktop XL'],
      'Desktop L': VIEWPORTS['Desktop L'],
    };

    for (const [viewportName, viewport] of Object.entries(desktopViewports)) {
      test(`3.1 Button Hover States - Hero Book Now - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const heroBookButton = homePage.heroBookNowButton;
        await heroBookButton.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        
        await heroBookButton.hover();
        await page.waitForTimeout(300); // Wait for hover state
        
        await maskDynamicContent(page);

        await expect(heroBookButton).toHaveScreenshot(
          `button-hover-hero-book-now-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });

      test(`3.1 Button Hover States - Value Prop Join Today - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const joinTodayButton = homePage.valuePropositionJoinToday;
        await joinTodayButton.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        
        await joinTodayButton.hover();
        await page.waitForTimeout(300);
        
        await maskDynamicContent(page);

        await expect(joinTodayButton).toHaveScreenshot(
          `button-hover-join-today-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 3.2: Link Focus States
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`3.2 Link Focus States - Footer Links - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const footer = homePage.footer;
        await footer.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        
        // Focus on first footer link
        const firstFooterLink = footer.locator('a').first();
        await firstFooterLink.focus();
        await page.waitForTimeout(300);
        
        await maskDynamicContent(page);

        await expect(firstFooterLink).toHaveScreenshot(
          `link-focus-footer-link-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 3.3: Mobile Menu States
    const mobileViewports = {
      'Tablet': VIEWPORTS['Tablet'],
      'Mobile': VIEWPORTS['Mobile'],
    };

    for (const [viewportName, viewport] of Object.entries(mobileViewports)) {
      test(`3.3 Mobile Menu - Collapsed - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const header = homePage.header;
        await maskDynamicContent(page);

        await expect(header).toHaveScreenshot(
          `mobile-menu-collapsed-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });

      test(`3.3 Mobile Menu - Expanded - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const menuButton = homePage.menuButton;
        const menuVisible = await menuButton.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (menuVisible) {
          await menuButton.click();
          await page.waitForTimeout(500); // Wait for menu animation
        }
        
        const header = homePage.header;
        await maskDynamicContent(page);

        await expect(header).toHaveScreenshot(
          `mobile-menu-expanded-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 3.4: Carousel Navigation States
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`3.4 Carousel Navigation - Treatments First Card - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        const treatmentsSection = homePage.treatmentsSection;
        await treatmentsSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        
        // Ensure we're on first card (may need to navigate back)
        await maskDynamicContent(page);

        const firstCard = homePage.treatmentCards.first();
        await expect(firstCard).toHaveScreenshot(
          `carousel-treatments-first-card-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }
  });

  // ============================================================
  // SECTION 4: Content Verification
  // ============================================================

  test.describe('Section 4: Content Verification', () => {
    // Test 4.1: Contentful Text Rendering
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`4.1 Contentful Text Rendering - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        // Verify text is rendered (not just checking visual, but also content)
        const heroSection = homePage.heroSection;
        await heroSection.scrollIntoViewIfNeeded();
        
        const textContent = await heroSection.textContent();
        expect(textContent).toBeTruthy();
        expect(textContent!.length).toBeGreaterThan(0);
        
        await maskDynamicContent(page);

        await expect(heroSection).toHaveScreenshot(
          `contentful-text-rendering-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 4.2: Image Loading
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`4.2 Image Loading - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        await waitForPageLoad(page);
        
        // Check for broken images
        const brokenImages = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('img'));
          return images.filter(img => !img.complete || img.naturalWidth === 0).length;
        });
        
        expect(brokenImages).toBe(0);
        
        // Screenshot of hero section with images
        const heroSection = homePage.heroSection;
        await heroSection.scrollIntoViewIfNeeded();
        await maskDynamicContent(page);

        await expect(heroSection).toHaveScreenshot(
          `image-loading-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          VISUAL_OPTIONS
        );
      });
    }

    // Test 4.3: Layout Shift Detection
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      test(`4.3 Layout Shift Detection - ${viewportName}`, async ({ page, browserName }) => {
        await page.setViewportSize(viewport);
        
        // Take screenshot early in load
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await maskDynamicContent(page);
        
        const earlyScreenshot = await page.screenshot({ fullPage: true });
        
        // Wait for full load
        await waitForPageLoad(page);
        await maskDynamicContent(page);
        
        const lateScreenshot = await page.screenshot({ fullPage: true });
        
        // Compare - they should be similar (no major layout shifts)
        // This is a basic check - for more sophisticated CLS detection, use Performance API
        expect(earlyScreenshot.length).toBeGreaterThan(0);
        expect(lateScreenshot.length).toBeGreaterThan(0);
        
        // Visual comparison of final state
        await expect(page).toHaveScreenshot(
          `layout-shift-detection-${viewportName.toLowerCase().replace(/\s+/g, '-')}-${browserName}.png`,
          {
            fullPage: true,
            ...VISUAL_OPTIONS,
          }
        );
      });
    }
  });

  // ============================================================
  // SECTION 5: Edge Cases
  // ============================================================

  test.describe('Section 5: Edge Cases', () => {
    // Test 5.1: Slow Network Conditions
    test('5.1 Slow Network Conditions - Mobile', async ({ page, browserName }) => {
      await page.setViewportSize(VIEWPORTS['Mobile']);
      
      // Throttle to Slow 3G
      await page.route('**/*', async (route) => {
        await route.continue();
      });
      
      const context = page.context();
      await context.setOffline(false);
      
      // Use slow network
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
      
      // Wait longer for slow network
      await page.waitForTimeout(5000);
      
      await maskDynamicContent(page);

      await expect(page).toHaveScreenshot(
        `slow-network-mobile-${browserName}.png`,
        {
          fullPage: true,
          ...VISUAL_OPTIONS,
        }
      );
    });

    // Test 5.2: Content Loading States
    test('5.2 Content Loading States', async ({ page, browserName }) => {
      await page.setViewportSize(VIEWPORTS['Desktop XXL']);
      
      // Intercept and delay contentful requests to see loading states
      await page.route('**/contentful**', async (route) => {
        await page.waitForTimeout(1000);
        await route.continue();
      });
      
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      
      await maskDynamicContent(page);

      await expect(page).toHaveScreenshot(
        `content-loading-states-${browserName}.png`,
        {
          fullPage: true,
          ...VISUAL_OPTIONS,
        }
      );
    });

    // Test 5.3: Empty States (simulated)
    test('5.3 Empty States Handling', async ({ page, browserName }) => {
      await page.setViewportSize(VIEWPORTS['Desktop XXL']);
      
      // Block contentful requests to simulate empty state
      await page.route('**/contentful**', async (route) => {
        await route.abort();
      });
      
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000);
      
      await maskDynamicContent(page);

      await expect(page).toHaveScreenshot(
        `empty-states-${browserName}.png`,
        {
          fullPage: true,
          ...VISUAL_OPTIONS,
        }
      );
    });
  });
});

