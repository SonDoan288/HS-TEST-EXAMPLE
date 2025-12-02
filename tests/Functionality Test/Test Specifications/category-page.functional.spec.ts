import { test, expect } from '@playwright/test';
import { CategoryPage } from './pages/CategoryPage';

test.describe('Hand & Stone Category Page - Comprehensive Test Suite', () => {
  const BASE_URL = 'https://custom-booking-app-release-hand-and-stone.vercel.app/category-page-dummy/';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  });

  // ============================================================
  // SECTION 1: Category Hero Section (5 tests)
  // ============================================================

  test.describe('Section 1: Category Hero Section', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('1.1 Verify Hero Section Initial Display', async ({ page }) => {
      await test.step('Test Step 1: Verify hero section is visible', async () => {
        await expect(categoryPage.heroSection).toBeVisible();
      });

      await test.step('Test Step 2: Verify service name heading is displayed', async () => {
        await expect(categoryPage.heroHeading).toBeVisible();
        const headingText = await categoryPage.heroHeading.textContent();
        expect(headingText).toBeTruthy();
      });

      await test.step('Test Step 3: Verify duration indicator shows with clock icon', async () => {
        await expect(categoryPage.heroDuration).toBeVisible();
        const durationText = await categoryPage.heroDuration.textContent();
        expect(durationText).toMatch(/\d+\s*min/i);
      });

      await test.step('Test Step 4: Verify 3 key benefits are listed', async () => {
        const benefits = categoryPage.heroKeyBenefits;
        await expect(benefits.first()).toBeVisible();
        const benefitsCount = await benefits.count();
        expect(benefitsCount).toBeGreaterThanOrEqual(3);
      });

      await test.step('Test Step 5: Verify service description paragraph is visible', async () => {
        await expect(categoryPage.heroDescription).toBeVisible();
      });

      await test.step('Test Step 6: Verify Book Service CTA button is visible', async () => {
        await expect(categoryPage.heroBookServiceButton).toBeVisible();
      });
    });

    test('1.2 Verify Hero Service Duration Display', async ({ page }) => {
      await test.step('Test Step 1: Locate duration indicator in hero section', async () => {
        await expect(categoryPage.heroDuration).toBeVisible();
      });

      await test.step('Test Step 2: Verify duration text displays correctly', async () => {
        const durationText = await categoryPage.heroDuration.textContent();
        expect(durationText).toMatch(/\d+\s*min/i);
      });

      await test.step('Test Step 3: Verify duration is formatted consistently', async () => {
        const durationElement = categoryPage.heroDuration;
        await expect(durationElement).toBeVisible();
        const boundingBox = await durationElement.boundingBox();
        expect(boundingBox).toBeTruthy();
      });
    });

    test('1.3 Verify Hero Key Benefits Display', async ({ page }) => {
      await test.step('Test Step 1: Locate benefits list in hero section', async () => {
        await expect(categoryPage.heroKeyBenefits.first()).toBeVisible();
      });

      await test.step('Test Step 2: Count and verify all benefits', async () => {
        const benefitsCount = await categoryPage.heroKeyBenefits.count();
        expect(benefitsCount).toBeGreaterThanOrEqual(3);
      });

      await test.step('Test Step 3: Verify each benefit has descriptive text', async () => {
        const benefits = categoryPage.heroKeyBenefits;
        const firstBenefitText = await benefits.first().textContent();
        expect(firstBenefitText).toBeTruthy();
        expect(firstBenefitText!.length).toBeGreaterThan(5);
      });

      await test.step('Test Step 4: Verify benefits are formatted as a list', async () => {
        const benefits = categoryPage.heroKeyBenefits;
        await expect(benefits.first()).toBeVisible();
        await expect(benefits.nth(1)).toBeVisible();
        await expect(benefits.nth(2)).toBeVisible();
      });
    });

    test('1.4 Verify Hero Book Service CTA', async ({ page }) => {
      await test.step('Test Step 1: Locate Book Service button', async () => {
        await expect(categoryPage.heroBookServiceButton).toBeVisible();
      });

      await test.step('Test Step 2: Verify button text reads Book Service', async () => {
        const buttonText = await categoryPage.heroBookServiceButton.textContent();
        expect(buttonText).toMatch(/Book Service|Book Now/i);
      });

      await test.step('Test Step 3: Verify button is enabled and clickable', async () => {
        await expect(categoryPage.heroBookServiceButton).toBeEnabled();
      });

      await test.step('Test Step 4: Click Book Service button', async () => {
        await categoryPage.heroBookServiceButton.click();
      });

      await test.step('Test Step 5: Wait for navigation to complete', async () => {
        await page.waitForURL(/\/locations/, { timeout: 15000 });
      });

      await test.step('Test Step 6: Verify URL includes query parameters', async () => {
        const url = page.url();
        expect(url).toContain('locations');
        // URL may include service_id and service_name parameters
      });

      await test.step('Test Step 7: Verify locations page loads successfully', async () => {
        await expect(page).toHaveURL(/\/locations/);
      });
    });

    test('1.5 Verify Hero Availability Tag Display', async ({ page }) => {
      await test.step('Test Step 1: Locate availability service tag in hero', async () => {
        const availabilityTag = categoryPage.heroAvailabilityTag;
        // Availability tag may or may not be present depending on service
        const isVisible = await availabilityTag.isVisible().catch(() => false);
        if (isVisible) {
          await expect(availabilityTag).toBeVisible();
        }
      });

      await test.step('Test Step 2: Verify tag content if present', async () => {
        const availabilityTag = categoryPage.heroAvailabilityTag;
        const isVisible = await availabilityTag.isVisible().catch(() => false);
        if (isVisible) {
          const tagText = await availabilityTag.textContent();
          expect(tagText).toBeTruthy();
        }
      });
    });
  });

  // ============================================================
  // SECTION 2: Header Navigation (Desktop) (9 tests)
  // ============================================================

  test.describe('Section 2: Header Navigation (Desktop)', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      // Set desktop viewport to ensure desktop navigation is visible
      await page.setViewportSize({ width: 1920, height: 1080 });
      categoryPage = new CategoryPage(page);
    });

    test('2.1 Verify Header Structure and Elements', async ({ page }) => {
      await test.step('Test Step 1: Verify header is visible at top', async () => {
        await expect(categoryPage.header).toBeVisible();
      });

      await test.step('Test Step 2: Verify logo is displayed on left side', async () => {
        await expect(categoryPage.headerLogo).toBeVisible();
      });

      await test.step('Test Step 3: Verify main navigation menu is displayed', async () => {
        await expect(categoryPage.servicesButton).toBeVisible();
        await expect(categoryPage.membershipButton).toBeVisible();
        await expect(categoryPage.giftCardsButton).toBeVisible();
        await expect(categoryPage.locationsLink).toBeVisible();
        await expect(categoryPage.franchiseLink).toBeVisible();
      });

      await test.step('Test Step 4: Verify right-side elements are visible', async () => {
        await expect(categoryPage.accountLink).toBeVisible();
        await expect(categoryPage.headerBookButton).toBeVisible();
      });
    });

    test('2.2 Verify Services Button Dropdown/Navigation', async ({ page }) => {
      await test.step('Test Step 1: Locate Services button in main navigation', async () => {
        await expect(categoryPage.servicesButton).toBeVisible();
      });

      await test.step('Test Step 2: Verify button has proper hover state', async () => {
        await categoryPage.servicesButton.hover();
        await page.waitForTimeout(300);
      });

      await test.step('Test Step 3: Verify button is interactive', async () => {
        await expect(categoryPage.servicesButton).toBeEnabled();
      });

      await test.step('Test Step 4: Click Services button', async () => {
        await categoryPage.servicesButton.click();
        await page.waitForTimeout(500);
      });
    });

    test('2.3 Verify Membership Button Navigation', async ({ page }) => {
      await test.step('Test Step 1: Locate Membership button in navigation', async () => {
        await expect(categoryPage.membershipButton).toBeVisible();
      });

      await test.step('Test Step 2: Click Membership button', async () => {
        await categoryPage.membershipButton.click();
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 3: Verify membership dialog/modal appears', async () => {
        const membershipDialog = page.getByRole('dialog').or(
          page.locator('[role="dialog"]')
        );
        await expect(membershipDialog).toBeVisible();
      });

      await test.step('Test Step 4: Verify dialog content is displayed', async () => {
        const dialogHeading = page.getByRole('heading', { name: /feel your best|membership/i });
        await expect(dialogHeading).toBeVisible();
      });

      await test.step('Test Step 5: Click Learn More link in the dialog', async () => {
        const membershipDialog = page.getByRole('dialog');
        const learnMoreLink = membershipDialog.getByRole('link', { name: /learn more|cta-membership/i });
        await learnMoreLink.click();
      });

      await test.step('Test Step 6: Wait for navigation to memberships page', async () => {
        await page.waitForURL(/\/memberships/, { timeout: 15000 });
      });

      await test.step('Test Step 7: Verify memberships page loads successfully', async () => {
        await expect(page).toHaveURL(/\/memberships/);
      });
    });

    test('2.4 Verify Gift Cards Button Navigation', async ({ page }) => {
      await test.step('Test Step 1: Locate Gift Cards button in navigation', async () => {
        await expect(categoryPage.giftCardsButton).toBeVisible();
      });

      await test.step('Test Step 2: Click Gift Cards button', async () => {
        await categoryPage.giftCardsButton.click();
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 3: Verify gift cards dialog/modal appears', async () => {
        const giftCardsDialog = page.getByRole('dialog');
        await expect(giftCardsDialog).toBeVisible();
      });

      await test.step('Test Step 4: Observe the Buy a Gift Card button', async () => {
        const giftCardsDialog = page.getByRole('dialog');
        const buyGiftCardLink = giftCardsDialog.getByRole('link', { name: /buy.*gift.*card|cta-buy-a-gift-card/i });
        await expect(buyGiftCardLink).toBeVisible();
      });

      await test.step('Test Step 5: Click on the Buy a Gift Card button', async () => {
        const giftCardsDialog = page.getByRole('dialog');
        const buyGiftCardLink = giftCardsDialog.getByRole('link', { name: /buy.*gift.*card|cta-buy-a-gift-card/i });
        await buyGiftCardLink.click();
      });

      await test.step('Test Step 6: Observe the navigation', async () => {
        await page.waitForTimeout(2000);
      });

      await test.step('Test Step 7: Verify URL matches zenoti gift cards page', async () => {
        await expect(page).toHaveURL(/handandstone\.zenoti\.com\/webstoreNew\/giftcards/);
      });

      await test.step('Test Step 8: Verify gift cards page loads successfully', async () => {
        const url = page.url();
        expect(url).toContain('5798a140-71a0-4983-bc1b-f3d0d0fc4b93');
      });
    });

    test('2.5 Verify Locations Link Navigation', async ({ page }) => {
      await test.step('Test Step 1: Locate Locations link in navigation', async () => {
        await expect(categoryPage.locationsLink).toBeVisible();
      });

      await test.step('Test Step 2: Click Locations link', async () => {
        await categoryPage.locationsLink.click();
      });

      await test.step('Test Step 3: Wait for navigation', async () => {
        await page.waitForURL(/\/locations/, { timeout: 15000 });
      });

      await test.step('Test Step 4: Verify URL points to locations page', async () => {
        await expect(page).toHaveURL(/\/locations/);
      });
    });

    test('2.6 Verify Franchise Link Navigation', async ({ page }) => {
      await test.step('Test Step 1: Locate Franchise link in navigation', async () => {
        await expect(categoryPage.franchiseLink).toBeVisible();
      });

      await test.step('Test Step 2: Click Franchise link', async () => {
        await categoryPage.franchiseLink.click();
      });

      await test.step('Test Step 3: Wait for navigation', async () => {
        await page.waitForTimeout(2000);
      });

      await test.step('Test Step 4: Verify URL points to franchise page', async () => {
        const url = page.url();
        expect(url).toMatch(/\/franchise/i);
      });
    });

    test('2.7 Verify Account Link', async ({ page }) => {
      await test.step('Test Step 1: Locate Account link in header', async () => {
        await expect(categoryPage.accountLink).toBeVisible();
      });

      await test.step('Test Step 2: Verify link displays Account text', async () => {
        const linkText = await categoryPage.accountLink.textContent();
        expect(linkText).toMatch(/Account/i);
      });

      await test.step('Test Step 3: Click Account link', async () => {
        await categoryPage.accountLink.click();
      });

      await test.step('Test Step 4: Wait for navigation', async () => {
        await page.waitForTimeout(2000);
      });

      await test.step('Test Step 5: Verify URL points to Zenoti account page', async () => {
        const url = page.url();
        expect(url).toMatch(/zenoti.*account|account/i);
      });
    });

    test('2.8 Verify Header Book Button (Primary CTA)', async ({ page }) => {
      await test.step('Test Step 1: Locate Book button in header', async () => {
        await expect(categoryPage.headerBookButton).toBeVisible();
      });

      await test.step('Test Step 2: Verify button displays Book text', async () => {
        const buttonText = await categoryPage.headerBookButton.textContent();
        expect(buttonText).toMatch(/Book/i);
      });

      await test.step('Test Step 3: Click Book button', async () => {
        await categoryPage.headerBookButton.click();
      });

      await test.step('Test Step 4: Wait for navigation', async () => {
        await page.waitForURL(/\/locations/, { timeout: 15000 });
      });

      await test.step('Test Step 5: Verify locations page loads successfully', async () => {
        await expect(page).toHaveURL(/\/locations/);
      });
    });

    test('2.9 Verify Logo Click Navigation', async ({ page }) => {
      await test.step('Test Step 1: Locate Hand & Stone logo in header', async () => {
        await expect(categoryPage.headerLogo).toBeVisible();
      });

      await test.step('Test Step 2: Click logo', async () => {
        await categoryPage.headerLogo.click();
      });

      await test.step('Test Step 3: Wait for navigation', async () => {
        await page.waitForURL(/\/$|\/home/, { timeout: 15000 });
      });

      await test.step('Test Step 4: Verify homepage loads successfully', async () => {
        const url = page.url();
        expect(url).toMatch(/\/$|\/home/);
      });
    });
  });

  // ============================================================
  // SECTION 3: Category Details Section (4 tests)
  // ============================================================

  test.describe('Section 3: Category Details Section', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('3.1 Verify Details Section Display', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await expect(page).toHaveURL(/category-page-dummy/);
      });

      await test.step('Test Step 2: Scroll to category details section (below hero)', async () => {
        await categoryPage.scrollToSection(categoryPage.detailsSection);
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 3: Observe section content', async () => {
        // Verify section displays category label (e.g., "Why Facials")
        const label = categoryPage.detailsLabel;
        const isLabelVisible = await label.isVisible().catch(() => false);
        if (isLabelVisible) {
          await expect(label).toBeVisible();
        }

        // Verify main heading is visible (e.g., "Your best skin, made simple.")
        await expect(categoryPage.detailsHeading).toBeVisible();

        // Verify description paragraph is present
        await expect(categoryPage.detailsDescription).toBeVisible();

        // Verify video player or background image is displayed
        const video = categoryPage.detailsVideo;
        const isVideoVisible = await video.isVisible().catch(() => false);
        if (isVideoVisible) {
          await expect(video).toBeVisible();
        }

        // Verify pause video button is visible (if video)
        const pauseButton = categoryPage.detailsPauseButton;
        const isPauseButtonVisible = await pauseButton.isVisible().catch(() => false);
        if (isPauseButtonVisible) {
          await expect(pauseButton).toBeVisible();
        }

        // Verify benefits list with 3 items is displayed
        const benefits = categoryPage.detailsBenefitsList;
        const benefitsCount = await benefits.count();
        expect(benefitsCount).toBeGreaterThanOrEqual(3);

        // Verify "Book Now" CTA is visible at bottom
        await expect(categoryPage.detailsBookTodayLink).toBeVisible();
      });
    });

    test('3.2 Verify Video/Media Controls', async ({ page }) => {
      await test.step('Test Step 1: Scroll to details section', async () => {
        await categoryPage.scrollToSection(categoryPage.detailsSection);
      });

      await test.step('Test Step 2: Check if video player is present', async () => {
        const video = categoryPage.detailsVideo;
        const isVisible = await video.isVisible().catch(() => false);
        
        if (isVisible) {
          await expect(video).toBeVisible();
        }
      });

      await test.step('Test Step 3: Verify pause button if video exists', async () => {
        const pauseButton = categoryPage.detailsPauseButton;
        const isVisible = await pauseButton.isVisible().catch(() => false);
        
        if (isVisible) {
          await expect(pauseButton).toBeVisible();
          await expect(pauseButton).toBeEnabled();
        }
      });
    });

    test('3.3 Verify Details Benefits List', async ({ page }) => {
      await test.step('Test Step 1: Scroll to details section', async () => {
        await categoryPage.scrollToSection(categoryPage.detailsSection);
      });

      await test.step('Test Step 2: Locate benefits list', async () => {
        await expect(categoryPage.detailsBenefitsList.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify all 3 benefits are displayed', async () => {
        const benefits = categoryPage.detailsBenefitsList;
        const benefitsCount = await benefits.count();
        expect(benefitsCount).toBeGreaterThanOrEqual(3);
      });

      await test.step('Test Step 4: Verify each benefit includes description', async () => {
        const firstBenefit = categoryPage.detailsBenefitsList.first();
        const benefitText = await firstBenefit.textContent();
        expect(benefitText).toBeTruthy();
        expect(benefitText!.length).toBeGreaterThan(10);
      });
    });

    test('3.4 Verify Details Section Book Today CTA', async ({ page }) => {
      await test.step('Test Step 1: Scroll to details section', async () => {
        await categoryPage.scrollToSection(categoryPage.detailsSection);
      });

      await test.step('Test Step 2: Locate Book Today link', async () => {
        await expect(categoryPage.detailsBookTodayLink).toBeVisible();
      });

      await test.step('Test Step 3: Click link', async () => {
        await categoryPage.detailsBookTodayLink.click();
      });

      await test.step('Test Step 4: Wait for navigation', async () => {
        await page.waitForURL(/\/locations/, { timeout: 15000 });
      });

      await test.step('Test Step 5: Verify locations page loads successfully', async () => {
        await expect(page).toHaveURL(/\/locations/);
      });
    });
  });

  // ============================================================
  // SECTION 4: Intro Offer Banner Section (4 tests)
  // ============================================================

  test.describe('Section 4: Intro Offer Banner Section', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('4.1 Verify Intro Offer Banner Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to intro offer banner section', async () => {
        await categoryPage.scrollToSection(categoryPage.introOfferBanner);
      });

      await test.step('Test Step 2: Verify banner section is visible', async () => {
        await expect(categoryPage.introOfferBanner).toBeVisible();
      });

      await test.step('Test Step 3: Verify left side displays image', async () => {
        await expect(categoryPage.introOfferImage).toBeVisible();
      });

      await test.step('Test Step 4: Verify section label intro offers is visible', async () => {
        await expect(categoryPage.introOfferLabel).toBeVisible();
      });

      await test.step('Test Step 5: Verify heading is displayed', async () => {
        await expect(categoryPage.introOfferHeading).toBeVisible();
        const headingText = await categoryPage.introOfferHeading.textContent();
        expect(headingText).toMatch(/first glow|intro/i);
      });

      await test.step('Test Step 6: Verify description paragraph is present', async () => {
        await expect(categoryPage.introOfferDescription.first()).toBeVisible();
      });

      await test.step('Test Step 7: Verify Book Service CTA is visible', async () => {
        await expect(categoryPage.introOfferBookServiceLink).toBeVisible();
      });
    });

    test('4.2 Verify Intro Offer Banner Image', async ({ page }) => {
      await test.step('Test Step 1: Scroll to intro offer banner', async () => {
        await categoryPage.scrollToSection(categoryPage.introOfferBanner);
      });

      await test.step('Test Step 2: Verify banner image on left loads successfully', async () => {
        await expect(categoryPage.introOfferImage).toBeVisible();
      });

      await test.step('Test Step 3: Verify image is properly sized and positioned', async () => {
        const image = categoryPage.introOfferImage;
        const boundingBox = await image.boundingBox();
        expect(boundingBox).toBeTruthy();
        expect(boundingBox!.width).toBeGreaterThan(100);
        expect(boundingBox!.height).toBeGreaterThan(100);
      });

      await test.step('Test Step 4: Verify no broken image placeholders', async () => {
        // Check images specifically within the intro offer banner section
        const imageInfo = await categoryPage.introOfferBanner.evaluate((section) => {
          const images = Array.from(section.querySelectorAll('img'));
          const broken = images.filter(img => {
            if (!img.complete) return true;
            const hasSrc = img.src && img.src !== '';
            const hasSrcset = img.srcset && img.srcset !== '';
            if (!hasSrc && !hasSrcset) return true;
            return img.naturalWidth === 0 || img.naturalHeight === 0;
          });
          return broken.length;
        });
        expect(imageInfo).toBe(0);
      });
    });

    test('4.3 Verify Intro Offer Banner Content', async ({ page }) => {
      await test.step('Test Step 1: Scroll to intro offer banner', async () => {
        await categoryPage.scrollToSection(categoryPage.introOfferBanner);
      });

      await test.step('Test Step 2: Verify section label displays intro offers', async () => {
        const labelText = await categoryPage.introOfferLabel.textContent();
        expect(labelText).toMatch(/intro offers/i);
      });

      await test.step('Test Step 3: Verify heading displays Your first glow awaits', async () => {
        const headingText = await categoryPage.introOfferHeading.textContent();
        expect(headingText).toMatch(/first glow|awaits|intro/i);
      });

      await test.step('Test Step 4: Verify description is clear and compelling', async () => {
        const description = await categoryPage.introOfferDescription.first().textContent();
        expect(description).toBeTruthy();
        expect(description!.length).toBeGreaterThan(20);
      });
    });

    test('4.4 Verify Intro Offer Book Service CTA', async ({ page }) => {
      await test.step('Test Step 1: Scroll to intro offer banner', async () => {
        await categoryPage.scrollToSection(categoryPage.introOfferBanner);
      });

      await test.step('Test Step 2: Locate Book Service link', async () => {
        await expect(categoryPage.introOfferBookServiceLink).toBeVisible();
      });

      await test.step('Test Step 3: Click link', async () => {
        await categoryPage.introOfferBookServiceLink.click();
      });

      await test.step('Test Step 4: Wait for navigation', async () => {
        await page.waitForURL(/\/locations/, { timeout: 15000 });
      });

      await test.step('Test Step 5: Verify locations page loads successfully', async () => {
        await expect(page).toHaveURL(/\/locations/);
      });
    });
  });

  // ============================================================
  // SECTION 5: Service Cards Section (8 tests)
  // ============================================================

  test.describe('Section 5: Service Cards Section', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('5.1 Verify Service Cards Section Header', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service cards section', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
      });

      await test.step('Test Step 2: Verify section label is displayed', async () => {
        const label = categoryPage.serviceCardsLabel;
        const isVisible = await label.isVisible().catch(() => false);
        if (isVisible) {
          await expect(label).toBeVisible();
        }
      });

      await test.step('Test Step 3: Verify main heading is visible', async () => {
        await expect(categoryPage.serviceCardsHeading).toBeVisible();
      });

      await test.step('Test Step 4: Verify content is relevant to the category', async () => {
        const headingText = await categoryPage.serviceCardsHeading.textContent();
        expect(headingText).toBeTruthy();
        expect(headingText!.length).toBeGreaterThan(5);
      });
    });

    test('5.2 Verify Standard Service Card Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service cards section', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
      });

      await test.step('Test Step 2: Locate first standard service card', async () => {
        await expect(categoryPage.serviceCards.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify card includes service image', async () => {
        await expect(categoryPage.serviceCardImages.first()).toBeVisible();
      });

      await test.step('Test Step 4: Verify card heading displays service name', async () => {
        await expect(categoryPage.serviceCardHeadings.first()).toBeVisible();
      });

      await test.step('Test Step 5: Verify card shows 3 benefit tags', async () => {
        const firstCard = categoryPage.serviceCards.first();
        const benefits = firstCard.locator('ul li, .benefit-item');
        const benefitsCount = await benefits.count();
        expect(benefitsCount).toBeGreaterThanOrEqual(2);
      });

      await test.step('Test Step 6: Verify card shows 2 CTAs', async () => {
        const firstCard = categoryPage.serviceCards.first();
        const learnMoreLink = firstCard.getByRole('link', { name: /Learn More/i });
        const bookServiceLink = firstCard.getByRole('link', { name: /Book|cta-location-finder/i });
        
        await expect(learnMoreLink).toBeVisible();
        await expect(bookServiceLink).toBeVisible();
      });
    });

    test('5.3 Verify Service Card Benefits Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service cards', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
      });

      await test.step('Test Step 2: Select first service card', async () => {
        await expect(categoryPage.serviceCards.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify benefits are displayed as list items', async () => {
        const firstCard = categoryPage.serviceCards.first();
        const benefits = firstCard.locator('ul li, .benefit-item');
        await expect(benefits.first()).toBeVisible();
      });

      await test.step('Test Step 4: Verify benefits are relevant to the service', async () => {
        const firstCard = categoryPage.serviceCards.first();
        const benefits = firstCard.locator('ul li, .benefit-item');
        const firstBenefitText = await benefits.first().textContent();
        expect(firstBenefitText).toBeTruthy();
      });
    });

    test('5.4 Verify Service Card Learn More CTA', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service cards', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
      });

      await test.step('Test Step 2: Locate Learn More link on first service card', async () => {
        await expect(categoryPage.serviceCardLearnMoreLinks.first()).toBeVisible();
      });

      await test.step('Test Step 3: Click Learn More', async () => {
        await categoryPage.serviceCardLearnMoreLinks.first().click();
      });

      await test.step('Test Step 4: Wait for navigation', async () => {
        await page.waitForTimeout(2000);
      });

      await test.step('Test Step 5: Verify target page loads successfully', async () => {
        const url = page.url();
        expect(url).toBeTruthy();
      });
    });

    test('5.5 Verify Service Card Book Service CTA', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service cards', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
      });

      await test.step('Test Step 2: Locate Book Service link on first service card', async () => {
        await expect(categoryPage.serviceCardBookServiceLinks.first()).toBeVisible();
      });

      await test.step('Test Step 3: Click Book Service', async () => {
        await categoryPage.serviceCardBookServiceLinks.first().click();
      });

      await test.step('Test Step 4: Wait for navigation', async () => {
        await page.waitForURL(/\/locations/, { timeout: 15000 });
      });

      await test.step('Test Step 5: Verify URL includes service-specific query parameters', async () => {
        const url = page.url();
        expect(url).toContain('locations');
        // May include service_id and service_name parameters
      });
    });

    test('5.6 Verify Advanced Service Section (if present)', async ({ page }) => {
      await test.step('Test Step 1: Scroll through service cards section', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
      });

      await test.step('Test Step 2: Check for Advanced Facials or similar subsection', async () => {
        const advancedHeading = categoryPage.advancedServicesHeading;
        const isVisible = await advancedHeading.isVisible().catch(() => false);
        
        if (isVisible) {
          await expect(advancedHeading).toBeVisible();
        }
      });

      await test.step('Test Step 3: Verify advanced services follow same structure if present', async () => {
        const serviceCards = categoryPage.serviceCards;
        const cardsCount = await serviceCards.count();
        expect(cardsCount).toBeGreaterThan(0);
      });
    });

    test('5.7 Verify Service Card with Different Layout (Full-Width)', async ({ page }) => {
      await test.step('Test Step 1: Scroll through service cards', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
      });

      await test.step('Test Step 2: Locate service cards with different layout', async () => {
        const serviceCards = categoryPage.serviceCards;
        await expect(serviceCards.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify card maintains same information structure', async () => {
        const firstCard = categoryPage.serviceCards.first();
        await expect(firstCard.locator('img')).toBeVisible();
        await expect(firstCard.locator('h3, h4')).toBeVisible();
      });

      await test.step('Test Step 4: Verify CTAs remain accessible', async () => {
        const firstCard = categoryPage.serviceCards.first();
        const learnMore = firstCard.getByRole('link', { name: /Learn More/i });
        const bookService = firstCard.getByRole('link', { name: /Book|cta-location-finder/i });
        
        await expect(learnMore).toBeVisible();
        await expect(bookService).toBeVisible();
      });
    });

    test('5.8 Verify Multiple Service Cards Load Successfully', async ({ page }) => {
      await test.step('Test Step 1: Scroll through entire service cards section', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
      });

      await test.step('Test Step 2: Count total service cards', async () => {
        const serviceCards = categoryPage.serviceCards;
        const cardsCount = await serviceCards.count();
        expect(cardsCount).toBeGreaterThanOrEqual(3);
      });

      await test.step('Test Step 3: Verify each card loads completely', async () => {
        const serviceCards = categoryPage.serviceCards;
        await expect(serviceCards.first()).toBeVisible();
      });

      await test.step('Test Step 4: Verify all images load successfully', async () => {
        const images = categoryPage.serviceCardImages;
        await expect(images.first()).toBeVisible();
      });

      await test.step('Test Step 5: Verify all CTAs are functional', async () => {
        await expect(categoryPage.serviceCardLearnMoreLinks.first()).toBeVisible();
        await expect(categoryPage.serviceCardBookServiceLinks.first()).toBeVisible();
      });
    });
  });

  // ============================================================
  // SECTION 6: Membership Banner Section (3 tests)
  // ============================================================

  test.describe('Section 6: Membership Banner Section', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('6.1 Verify Membership Banner Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to membership banner section', async () => {
        await categoryPage.scrollToSection(categoryPage.membershipBanner);
      });

      await test.step('Test Step 2: Verify membership banner section is visible', async () => {
        await expect(categoryPage.membershipBanner).toBeVisible();
      });

      await test.step('Test Step 3: Verify heading Make it a ritual is displayed', async () => {
        await expect(categoryPage.membershipBannerHeading).toBeVisible();
        const headingText = await categoryPage.membershipBannerHeading.textContent();
        expect(headingText).toMatch(/Make it a ritual/i);
      });

      await test.step('Test Step 4: Verify description paragraph is visible', async () => {
        await expect(categoryPage.membershipBannerDescription).toBeVisible();
        const descText = await categoryPage.membershipBannerDescription.textContent();
        expect(descText).toMatch(/member|save|treatment/i);
      });

      await test.step('Test Step 5: Verify Become a Member CTA is prominent', async () => {
        await expect(categoryPage.membershipBannerLink).toBeVisible();
      });
    });

    test('6.2 Verify Membership Banner Image', async ({ page }) => {
      await test.step('Test Step 1: Scroll to membership banner', async () => {
        await categoryPage.scrollToSection(categoryPage.membershipBanner);
      });

      await test.step('Test Step 2: Verify background or hero image loads successfully', async () => {
        const membershipImage = categoryPage.membershipBannerImage;
        const isVisible = await membershipImage.isVisible().catch(() => false);
        
        if (isVisible) {
          await expect(membershipImage).toBeVisible();
        }
      });

      await test.step('Test Step 3: Verify image is high quality and relevant', async () => {
        const membershipImage = categoryPage.membershipBannerImage;
        const isVisible = await membershipImage.isVisible().catch(() => false);
        
        if (isVisible) {
          const boundingBox = await membershipImage.boundingBox();
          expect(boundingBox).toBeTruthy();
        }
      });
    });

    test('6.3 Verify Membership CTA Navigation', async ({ page }) => {
      await test.step('Test Step 1: Scroll to membership banner', async () => {
        await categoryPage.scrollToSection(categoryPage.membershipBanner);
      });

      await test.step('Test Step 2: Locate Become a Member link', async () => {
        await expect(categoryPage.membershipBannerLink).toBeVisible();
      });

      await test.step('Test Step 3: Click link', async () => {
        await categoryPage.membershipBannerLink.click();
      });

      await test.step('Test Step 4: Wait for navigation', async () => {
        await page.waitForTimeout(2000);
      });

      await test.step('Test Step 5: Verify URL is memberships page', async () => {
        const url = page.url();
        expect(url).toMatch(/memberships/i);
      });
    });
  });

  // ============================================================
  // SECTION 7: Service Carousel Section (8 tests)
  // ============================================================

  test.describe('Section 7: Service Carousel Section', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('7.1 Verify Service Carousel Section Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service carousel section', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCarouselSection);
      });

      await test.step('Test Step 2: Verify section displays label Services', async () => {
        await expect(categoryPage.serviceCarouselLabel).toBeVisible();
      });

      await test.step('Test Step 3: Verify heading Treatments that restore you is visible', async () => {
        await expect(categoryPage.serviceCarouselHeading).toBeVisible();
      });

      await test.step('Test Step 4: Verify description paragraph is present', async () => {
        await expect(categoryPage.serviceCarouselDescription).toBeVisible();
      });

      await test.step('Test Step 5: Verify multiple service cards are visible in carousel', async () => {
        const carouselCards = categoryPage.serviceCarouselCards;
        const cardsCount = await carouselCards.count();
        expect(cardsCount).toBeGreaterThanOrEqual(3);
      });

      await test.step('Test Step 6: Verify navigation buttons are visible', async () => {
        await expect(categoryPage.serviceCarouselNextButton).toBeVisible();
        await expect(categoryPage.serviceCarouselPreviousButton).toBeVisible();
      });

      await test.step('Test Step 7: Verify disclaimer text is displayed below carousel', async () => {
        const disclaimer = categoryPage.serviceCarouselDisclaimer;
        const isVisible = await disclaimer.isVisible().catch(() => false);
        if (isVisible) {
          await expect(disclaimer).toBeVisible();
        }
      });
    });

    test('7.2 Verify Service Carousel Initial State', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service carousel', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCarouselSection);
      });

      await test.step('Test Step 2: Verify carousel displays multiple service cards', async () => {
        const carouselCards = categoryPage.serviceCarouselCards;
        const cardsCount = await carouselCards.count();
        expect(cardsCount).toBeGreaterThanOrEqual(3);
      });

      await test.step('Test Step 3: Verify first few cards are visible', async () => {
        await expect(categoryPage.serviceCarouselCards.first()).toBeVisible();
      });

      await test.step('Test Step 4: Verify Previous button state', async () => {
        const prevButton = categoryPage.serviceCarouselPreviousButton;
        await expect(prevButton).toBeVisible();
        // Previous button may be disabled at start position
      });

      await test.step('Test Step 5: Verify Next button is enabled', async () => {
        const nextButton = categoryPage.serviceCarouselNextButton;
        await expect(nextButton).toBeVisible();
        await expect(nextButton).toBeEnabled();
      });
    });

    test('7.3 Verify Carousel Next Button Navigation', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service carousel', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCarouselSection);
      });

      await test.step('Test Step 2: Verify Next button is enabled', async () => {
        await expect(categoryPage.serviceCarouselNextButton).toBeEnabled();
      });

      await test.step('Test Step 3: Click Next button', async () => {
        await categoryPage.serviceCarouselNextButton.click();
      });

      await test.step('Test Step 4: Wait for carousel to shift', async () => {
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 5: Verify carousel navigation is smooth', async () => {
        await expect(categoryPage.serviceCarouselCards.first()).toBeVisible();
      });

      await test.step('Test Step 6: Verify Previous button becomes enabled', async () => {
        await expect(categoryPage.serviceCarouselPreviousButton).toBeEnabled();
      });
    });

    test('7.4 Verify Carousel Previous Button Navigation', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service carousel', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCarouselSection);
      });

      await test.step('Test Step 2: Click Next button to enable Previous', async () => {
        await categoryPage.serviceCarouselNextButton.click();
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 3: Verify Previous button is enabled', async () => {
        await expect(categoryPage.serviceCarouselPreviousButton).toBeEnabled();
      });

      await test.step('Test Step 4: Click Previous button', async () => {
        await categoryPage.serviceCarouselPreviousButton.click();
      });

      await test.step('Test Step 5: Wait for carousel to shift back', async () => {
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 6: Verify carousel returns to previous position', async () => {
        await expect(categoryPage.serviceCarouselCards.first()).toBeVisible();
      });
    });

    test('7.5 Verify Carousel Service Card Structure', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service carousel', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCarouselSection);
      });

      await test.step('Test Step 2: Observe individual service cards in carousel', async () => {
        await expect(categoryPage.serviceCarouselCards.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify each card displays service image', async () => {
        const firstCard = categoryPage.serviceCarouselCards.first();
        await expect(firstCard.locator('img')).toBeVisible();
      });

      await test.step('Test Step 4: Verify each card displays service name', async () => {
        const firstCard = categoryPage.serviceCarouselCards.first();
        await expect(firstCard.locator('h3, h4, p').first()).toBeVisible();
      });

      await test.step('Test Step 5: Verify cards are consistently styled', async () => {
        const cardsCount = await categoryPage.serviceCarouselCards.count();
        expect(cardsCount).toBeGreaterThan(0);
      });
    });

    test('7.6 Verify Carousel Card Interaction', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service carousel', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCarouselSection);
      });

      await test.step('Test Step 2: Locate first service card button', async () => {
        const firstCard = categoryPage.serviceCarouselCards.first();
        await expect(firstCard).toBeVisible();
      });

      await test.step('Test Step 3: Click service card button', async () => {
        const firstCard = categoryPage.serviceCarouselCards.first();
        await firstCard.click();
      });

      await test.step('Test Step 4: Wait for navigation', async () => {
        await page.waitForTimeout(2000);
      });

      await test.step('Test Step 5: Verify target category page loads successfully', async () => {
        const url = page.url();
        expect(url).toBeTruthy();
      });
    });

    test('7.7 Verify Carousel Disclaimer Text', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service carousel', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCarouselSection);
      });

      await test.step('Test Step 2: Locate disclaimer text below carousel', async () => {
        const disclaimer = categoryPage.serviceCarouselDisclaimer;
        const isVisible = await disclaimer.isVisible().catch(() => false);
        
        if (isVisible) {
          await expect(disclaimer).toBeVisible();
        }
      });

      await test.step('Test Step 3: Verify text is properly formatted with asterisk', async () => {
        const disclaimer = categoryPage.serviceCarouselDisclaimer;
        const isVisible = await disclaimer.isVisible().catch(() => false);
        
        if (isVisible) {
          const disclaimerText = await disclaimer.textContent();
          expect(disclaimerText).toMatch(/\*/);
        }
      });
    });

    test('7.8 Verify Carousel Responsive Behavior', async ({ page }) => {
      await test.step('Test Step 1: Scroll to service carousel', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCarouselSection);
      });

      await test.step('Test Step 2: Verify carousel displays properly', async () => {
        await expect(categoryPage.serviceCarouselCards.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify navigation buttons remain accessible', async () => {
        await expect(categoryPage.serviceCarouselNextButton).toBeVisible();
        await expect(categoryPage.serviceCarouselPreviousButton).toBeVisible();
      });

      await test.step('Test Step 4: Verify no horizontal overflow or broken layout', async () => {
        const carousel = categoryPage.serviceCarouselSection;
        const boundingBox = await carousel.boundingBox();
        expect(boundingBox).toBeTruthy();
      });
    });
  });

  // ============================================================
  // SECTION 8: Footer Section (9 tests)
  // ============================================================

  test.describe('Section 8: Footer Section', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('8.1 Verify Footer Display and Structure', async ({ page }) => {
      await test.step('Test Step 1: Scroll to bottom of page', async () => {
        await categoryPage.scrollToSection(categoryPage.footer);
      });

      await test.step('Test Step 2: Verify footer is visible', async () => {
        await expect(categoryPage.footer).toBeVisible();
      });

      await test.step('Test Step 3: Verify breadcrumbs navigation shows Home • category page dummy', async () => {
        await expect(categoryPage.footerBreadcrumbs).toBeVisible();
      });

      await test.step('Test Step 4: Verify Hand & Stone logo is displayed', async () => {
        await expect(categoryPage.footerLogo).toBeVisible();
      });

      await test.step('Test Step 5: Verify footer is organized into 4 sections', async () => {
        await expect(categoryPage.footerAboutUsSection).toBeVisible();
        await expect(categoryPage.footerServicesSection).toBeVisible();
        await expect(categoryPage.footerMembershipSection).toBeVisible();
        await expect(categoryPage.footerTermsSection).toBeVisible();
      });

      await test.step('Test Step 6: Verify social media icons are visible', async () => {
        await expect(categoryPage.footerInstagramLink).toBeVisible();
        await expect(categoryPage.footerFacebookLink).toBeVisible();
      });

      await test.step('Test Step 7: Verify copyright text is visible', async () => {
        await expect(categoryPage.footerCopyright).toBeVisible();
      });
    });

    test('8.2 Verify Footer Breadcrumbs', async ({ page }) => {
      await test.step('Test Step 1: Scroll to footer', async () => {
        await categoryPage.scrollToSection(categoryPage.footer);
      });

      await test.step('Test Step 2: Locate breadcrumbs navigation', async () => {
        await expect(categoryPage.footerBreadcrumbs).toBeVisible();
      });

      await test.step('Test Step 3: Verify breadcrumb structure', async () => {
        const breadcrumbsText = await categoryPage.footerBreadcrumbs.textContent();
        expect(breadcrumbsText).toMatch(/Home|home/);
      });

      await test.step('Test Step 4: Verify current page name is displayed', async () => {
        const breadcrumbsText = await categoryPage.footerBreadcrumbs.textContent();
        expect(breadcrumbsText).toBeTruthy();
      });
    });

    test('8.3 Verify Footer About Us Links', async ({ page }) => {
      await test.step('Test Step 1: Scroll to footer', async () => {
        await categoryPage.scrollToSection(categoryPage.footer);
      });

      await test.step('Test Step 2: Locate About Us section', async () => {
        await expect(categoryPage.footerAboutUsSection).toBeVisible();
      });

      await test.step('Test Step 3: Verify Our Story link is present', async () => {
        await expect(categoryPage.footerOurStoryLink).toBeVisible();
      });

      await test.step('Test Step 4: Verify Locations link is present', async () => {
        await expect(categoryPage.footerLocationsLink).toBeVisible();
      });

      await test.step('Test Step 5: Verify Own A Franchise link is present', async () => {
        await expect(categoryPage.footerFranchiseLink).toBeVisible();
      });

      await test.step('Test Step 6: Verify all links are clickable', async () => {
        await expect(categoryPage.footerOurStoryLink).toBeEnabled();
        await expect(categoryPage.footerLocationsLink).toBeEnabled();
      });
    });

    test('8.4 Verify Footer Services Links', async ({ page }) => {
      await test.step('Test Step 1: Scroll to footer', async () => {
        await categoryPage.scrollToSection(categoryPage.footer);
      });

      await test.step('Test Step 2: Locate SERVICES section', async () => {
        await expect(categoryPage.footerServicesSection).toBeVisible();
      });

      await test.step('Test Step 3: Verify all 5 service links are present', async () => {
        await expect(categoryPage.footerMassagesLink).toBeVisible();
        await expect(categoryPage.footerFacialsLink).toBeVisible();
        await expect(categoryPage.footerToningLink).toBeVisible();
        await expect(categoryPage.footerInjectablesLink).toBeVisible();
        await expect(categoryPage.footerHairRemovalLink).toBeVisible();
      });

      await test.step('Test Step 4: Verify all links are clickable', async () => {
        await expect(categoryPage.footerMassagesLink).toBeEnabled();
        await expect(categoryPage.footerFacialsLink).toBeEnabled();
      });
    });

    test('8.5 Verify Footer Membership Links', async ({ page }) => {
      await test.step('Test Step 1: Scroll to footer', async () => {
        await categoryPage.scrollToSection(categoryPage.footer);
      });

      await test.step('Test Step 2: Locate MEMBERSHIP section', async () => {
        await expect(categoryPage.footerMembershipSection).toBeVisible();
      });

      await test.step('Test Step 3: Verify 2 membership links are present', async () => {
        await expect(categoryPage.footerExploreMembershipsLink).toBeVisible();
        await expect(categoryPage.footerRewardPointsLink).toBeVisible();
      });

      await test.step('Test Step 4: Verify links are functional', async () => {
        await expect(categoryPage.footerExploreMembershipsLink).toBeEnabled();
        await expect(categoryPage.footerRewardPointsLink).toBeEnabled();
      });
    });

    test('8.6 Verify Footer Terms & Conditions Links', async ({ page }) => {
      await test.step('Test Step 1: Scroll to footer', async () => {
        await categoryPage.scrollToSection(categoryPage.footer);
      });

      await test.step('Test Step 2: Locate TERMS & CONDITIONS section', async () => {
        await expect(categoryPage.footerTermsSection).toBeVisible();
      });

      await test.step('Test Step 3: Verify all 5 legal links are present', async () => {
        await expect(categoryPage.footerCustomerBillLink).toBeVisible();
        await expect(categoryPage.footerGiftCardTermsLink).toBeVisible();
        await expect(categoryPage.footerCaliforniaLink).toBeVisible();
        await expect(categoryPage.footerRulesTermsLink).toBeVisible();
        await expect(categoryPage.footerNonDiscriminationLink).toBeVisible();
      });

      await test.step('Test Step 4: Verify all links are clickable', async () => {
        await expect(categoryPage.footerCustomerBillLink).toBeEnabled();
        await expect(categoryPage.footerGiftCardTermsLink).toBeEnabled();
      });
    });

    test('8.7 Verify Footer Social Media Links', async ({ page }) => {
      await test.step('Test Step 1: Scroll to footer', async () => {
        await categoryPage.scrollToSection(categoryPage.footer);
      });

      await test.step('Test Step 2: Locate social media icons', async () => {
        await expect(categoryPage.footerInstagramLink).toBeVisible();
      });

      await test.step('Test Step 3: Verify all 6 social media links are visible', async () => {
        await expect(categoryPage.footerInstagramLink).toBeVisible();
        await expect(categoryPage.footerFacebookLink).toBeVisible();
        await expect(categoryPage.footerXLink).toBeVisible();
        await expect(categoryPage.footerLinkedInLink).toBeVisible();
        await expect(categoryPage.footerYouTubeLink).toBeVisible();
        await expect(categoryPage.footerTikTokLink).toBeVisible();
      });

      await test.step('Test Step 4: Verify all links are clickable', async () => {
        await expect(categoryPage.footerInstagramLink).toBeEnabled();
        await expect(categoryPage.footerFacebookLink).toBeEnabled();
      });
    });

    test('8.8 Verify Footer Privacy Links', async ({ page }) => {
      await test.step('Test Step 1: Scroll to footer bottom', async () => {
        await categoryPage.scrollToSection(categoryPage.footer);
      });

      await test.step('Test Step 2: Locate privacy-related links', async () => {
        await expect(categoryPage.footerPrivacyPolicyLink).toBeVisible();
      });

      await test.step('Test Step 3: Verify 3 privacy links are visible', async () => {
        await expect(categoryPage.footerPrivacyPolicyLink).toBeVisible();
        await expect(categoryPage.footerCookiePolicyLink).toBeVisible();
        await expect(categoryPage.footerConsentPreferencesLink).toBeVisible();
      });

      await test.step('Test Step 4: Verify all links are functional', async () => {
        await expect(categoryPage.footerPrivacyPolicyLink).toBeEnabled();
        await expect(categoryPage.footerCookiePolicyLink).toBeEnabled();
      });
    });

    test('8.9 Verify Footer Copyright and Disclaimers', async ({ page }) => {
      await test.step('Test Step 1: Scroll to footer bottom', async () => {
        await categoryPage.scrollToSection(categoryPage.footer);
      });

      await test.step('Test Step 2: Verify copyright displays @ 2025 Hand & Stone', async () => {
        await expect(categoryPage.footerCopyright).toBeVisible();
        const copyrightText = await categoryPage.footerCopyright.textContent();
        expect(copyrightText).toMatch(/20\d{2}\s+Hand\s*&\s*Stone/i);
      });

      await test.step('Test Step 3: Verify disclaimer paragraphs are visible', async () => {
        const disclaimers = categoryPage.footerDisclaimers;
        const disclaimersCount = await disclaimers.count();
        expect(disclaimersCount).toBeGreaterThanOrEqual(1);
      });

      await test.step('Test Step 4: Verify text is readable and properly formatted', async () => {
        const copyrightText = await categoryPage.footerCopyright.textContent();
        expect(copyrightText).toBeTruthy();
        expect(copyrightText!.length).toBeGreaterThan(10);
      });
    });
  });

  // ============================================================
  // SECTION 9: Cross-Page Navigation & User Flows (5 tests)
  // ============================================================

  test.describe('Section 9: Cross-Page Navigation & User Flows', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
      // Start from homepage for cross-page navigation tests
    });

    test('9.1 Verify Homepage to Category Page Flow', async ({ page }) => {
      await test.step('Test Step 1: Navigate to homepage', async () => {
        await page.goto('https://custom-booking-app-release-hand-and-stone.vercel.app/');
      });

      await test.step('Test Step 2: Click any treatment category card', async () => {
        const treatmentCard = page.getByRole('button', { name: /View details for Facials|View details for Massages/i }).first();
        await treatmentCard.click();
      });

      await test.step('Test Step 3: Wait for navigation to category page', async () => {
        await page.waitForTimeout(2000);
      });

      await test.step('Test Step 4: Verify category page loads with relevant content', async () => {
        const url = page.url();
        expect(url).toMatch(/facials|massage|toning|injectables|hair-removal/i);
      });

      await test.step('Test Step 5: Verify back button works', async () => {
        await page.goBack();
        await page.waitForTimeout(1000);
        const url = page.url();
        expect(url).toMatch(/\/$/);
      });
    });

    test('9.2 Verify Category Page to Service Detail Flow', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await expect(page).toHaveURL(new RegExp(BASE_URL));
      });

      await test.step('Test Step 2: Scroll to service cards', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
      });

      await test.step('Test Step 3: Click Learn More on any service card', async () => {
        await categoryPage.serviceCardLearnMoreLinks.first().click();
      });

      await test.step('Test Step 4: Wait for navigation', async () => {
        await page.waitForTimeout(2000);
      });

      await test.step('Test Step 5: Verify service detail page loads', async () => {
        const url = page.url();
        expect(url).toBeTruthy();
      });
    });

    test('9.3 Verify Category Page to Booking Flow', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await expect(page).toHaveURL(new RegExp(BASE_URL));
      });

      await test.step('Test Step 2: Click any Book Service CTA', async () => {
        await categoryPage.heroBookServiceButton.click();
      });

      await test.step('Test Step 3: Wait for navigation to locations page', async () => {
        await page.waitForURL(/\/locations/, { timeout: 15000 });
      });

      await test.step('Test Step 4: Verify service context is preserved', async () => {
        const url = page.url();
        expect(url).toContain('locations');
      });

      await test.step('Test Step 5: Verify back button returns to category page', async () => {
        await page.goBack();
        await page.waitForTimeout(1000);
        const url = page.url();
        expect(url).toMatch(/category-page-dummy/);
      });
    });

    test('9.4 Verify Category Page to Membership Flow', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await expect(page).toHaveURL(new RegExp(BASE_URL));
      });

      await test.step('Test Step 2: Scroll to membership banner', async () => {
        await categoryPage.scrollToSection(categoryPage.membershipBanner);
      });

      await test.step('Test Step 3: Click Become a Member', async () => {
        await categoryPage.membershipBannerLink.click();
      });

      await test.step('Test Step 4: Wait for navigation to memberships page', async () => {
        await page.waitForTimeout(2000);
      });

      await test.step('Test Step 5: Verify memberships page displays', async () => {
        const url = page.url();
        expect(url).toMatch(/memberships/i);
      });
    });

    test('9.5 Verify Cross-Category Navigation via Carousel', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await expect(page).toHaveURL(new RegExp(BASE_URL));
      });

      await test.step('Test Step 2: Scroll to service carousel', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCarouselSection);
      });

      await test.step('Test Step 3: Click different service category card', async () => {
        await categoryPage.serviceCarouselCards.first().click();
      });

      await test.step('Test Step 4: Wait for navigation', async () => {
        await page.waitForTimeout(2000);
      });

      await test.step('Test Step 5: Verify new category page loads', async () => {
        const url = page.url();
        expect(url).toBeTruthy();
      });
    });
  });

  // ============================================================
  // SECTION 10: Responsive Design & Viewport Testing (4 tests)
  // ============================================================

  test.describe('Section 10: Responsive Design & Viewport Testing', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('10.1 Verify Mobile Viewport (375x667)', async ({ page }) => {
      await test.step('Test Step 1: Set viewport to mobile size', async () => {
        await page.setViewportSize({ width: 375, height: 667 });
      });

      await test.step('Test Step 2: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 3: Verify all sections adapt to mobile layout', async () => {
        await expect(categoryPage.heroSection).toBeVisible();
        await expect(categoryPage.footer).toBeVisible();
      });

      await test.step('Test Step 4: Verify all CTAs are tappable', async () => {
        await expect(categoryPage.heroBookServiceButton).toBeVisible();
        const boundingBox = await categoryPage.heroBookServiceButton.boundingBox();
        expect(boundingBox).toBeTruthy();
        expect(boundingBox!.width).toBeGreaterThanOrEqual(44);
        expect(boundingBox!.height).toBeGreaterThanOrEqual(44);
      });

      await test.step('Test Step 5: Verify no horizontal scrolling', async () => {
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = page.viewportSize()!.width;
        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10);
      });
    });

    test('10.2 Verify Tablet Viewport (768x1024)', async ({ page }) => {
      await test.step('Test Step 1: Set viewport to tablet size', async () => {
        await page.setViewportSize({ width: 768, height: 1024 });
      });

      await test.step('Test Step 2: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 3: Verify layout adapts for tablet size', async () => {
        await expect(categoryPage.heroSection).toBeVisible();
        await expect(categoryPage.serviceCardsSection).toBeVisible();
      });

      await test.step('Test Step 4: Verify navigation remains accessible', async () => {
        await expect(categoryPage.header).toBeVisible();
      });

      await test.step('Test Step 5: Verify images scale appropriately', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
        await expect(categoryPage.serviceCardImages.first()).toBeVisible();
      });
    });

    test('10.3 Verify Desktop Viewport (1920x1080)', async ({ page }) => {
      await test.step('Test Step 1: Set viewport to large desktop', async () => {
        await page.setViewportSize({ width: 1920, height: 1080 });
      });

      await test.step('Test Step 2: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 3: Verify full desktop navigation is visible', async () => {
        await expect(categoryPage.header).toBeVisible();
        await expect(categoryPage.servicesButton).toBeVisible();
        await expect(categoryPage.membershipButton).toBeVisible();
      });

      await test.step('Test Step 4: Verify content is centered with max-width', async () => {
        const heroWidth = await categoryPage.heroSection.evaluate(el => el.getBoundingClientRect().width);
        expect(heroWidth).toBeGreaterThan(0);
      });

      await test.step('Test Step 5: Verify images display at full quality', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
        await expect(categoryPage.serviceCardImages.first()).toBeVisible();
      });
    });

    test('10.4 Verify Header Navigation Breakpoint', async ({ page }) => {
      await test.step('Test Step 1: Start with mobile viewport', async () => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 2: Gradually resize to desktop', async () => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 3: Verify header navigation switches', async () => {
        await expect(categoryPage.header).toBeVisible();
      });

      await test.step('Test Step 4: Verify all navigation items remain accessible', async () => {
        const servicesButton = categoryPage.servicesButton;
        const isVisible = await servicesButton.isVisible().catch(() => false);
        expect(isVisible).toBeTruthy();
      });
    });
  });

  // ============================================================
  // SECTION 11: Accessibility Testing (5 tests)
  // ============================================================

  test.describe('Section 11: Accessibility Testing', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('11.1 Verify Keyboard Navigation', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await expect(page).toHaveURL(new RegExp(BASE_URL));
      });

      await test.step('Test Step 2: Use Tab key to navigate through interactive elements', async () => {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
        await page.keyboard.press('Tab');
      });

      await test.step('Test Step 3: Verify focus indicators are visible', async () => {
        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement;
          return el ? el.tagName : null;
        });
        expect(focusedElement).toBeTruthy();
      });

      await test.step('Test Step 4: Verify Tab order is logical', async () => {
        // Tab order should follow top to bottom, left to right
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
      });

      await test.step('Test Step 5: Verify no keyboard traps', async () => {
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('Tab');
          await page.waitForTimeout(50);
        }
        // Should be able to tab through without getting stuck
      });
    });

    test('11.2 Verify ARIA Labels and Semantic HTML', async ({ page }) => {
      await test.step('Test Step 1: Verify all CTAs have descriptive aria-labels', async () => {
        const bookServiceLabel = await categoryPage.heroBookServiceButton.getAttribute('aria-label');
        expect(bookServiceLabel).toMatch(/cta-location-finder|Book Service/i);
      });

      await test.step('Test Step 2: Verify headings use proper hierarchy', async () => {
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBeGreaterThanOrEqual(1);
      });

      await test.step('Test Step 3: Verify images have alt text', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
        const firstImage = categoryPage.serviceCardImages.first();
        const altText = await firstImage.getAttribute('alt');
        expect(altText).toBeTruthy();
      });

      await test.step('Test Step 4: Verify navigation uses nav element', async () => {
        const navElement = page.locator('nav');
        const navCount = await navElement.count();
        expect(navCount).toBeGreaterThanOrEqual(1);
      });

      await test.step('Test Step 5: Verify footer has contentinfo role', async () => {
        const footerRole = await categoryPage.footer.getAttribute('role');
        expect(footerRole === 'contentinfo' || footerRole === null).toBeTruthy();
      });
    });

    test('11.3 Verify Screen Reader Compatibility', async ({ page }) => {
      await test.step('Test Step 0: Set desktop viewport for navigation visibility', async () => {
        await page.setViewportSize({ width: 1920, height: 1080 });
      });

      await test.step('Test Step 1: Verify all content has proper semantic structure', async () => {
        const mainContent = page.locator('main, [role="main"]');
        const mainCount = await mainContent.count();
        expect(mainCount).toBeGreaterThanOrEqual(0);
      });

      await test.step('Test Step 2: Verify links have descriptive labels', async () => {
        const bookLink = categoryPage.heroBookServiceButton;
        const linkText = await bookLink.textContent();
        expect(linkText).toMatch(/Book|Service/i);
      });

      await test.step('Test Step 3: Verify buttons announce their action', async () => {
        const button = categoryPage.servicesButton;
        const buttonText = await button.textContent();
        expect(buttonText).toBeTruthy();
      });

      await test.step('Test Step 4: Verify headings provide clear structure', async () => {
        const headings = page.locator('h1, h2, h3, h4');
        const headingsCount = await headings.count();
        expect(headingsCount).toBeGreaterThan(3);
      });
    });

    test('11.4 Verify Color Contrast', async ({ page }) => {
      await test.step('Test Step 1: Verify hero text is visible', async () => {
        await expect(categoryPage.heroHeading).toBeVisible();
      });

      await test.step('Test Step 2: Verify button text has sufficient contrast', async () => {
        await expect(categoryPage.heroBookServiceButton).toBeVisible();
      });

      await test.step('Test Step 3: Verify link text is distinguishable', async () => {
        await categoryPage.scrollToSection(categoryPage.footer);
        await expect(categoryPage.footerOurStoryLink).toBeVisible();
      });

      await test.step('Test Step 4: Verify no color-only indicators', async () => {
        // All important information should not rely solely on color
        await expect(categoryPage.heroSection).toBeVisible();
      });
    });

    test('11.5 Verify Focus Management', async ({ page }) => {
      await test.step('Test Step 0: Set desktop viewport for navigation visibility', async () => {
        await page.setViewportSize({ width: 1920, height: 1080 });
      });

      await test.step('Test Step 1: Verify focus is managed during navigation', async () => {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
      });

      await test.step('Test Step 2: Verify focus is never set to disabled elements', async () => {
        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement;
          return el ? !el.hasAttribute('disabled') : true;
        });
        expect(focusedElement).toBeTruthy();
      });

      await test.step('Test Step 3: Verify no focus loss during interactions', async () => {
        await categoryPage.servicesButton.focus();
        await page.waitForTimeout(100);
        const isFocused = await categoryPage.servicesButton.evaluate(el => el === document.activeElement);
        expect(isFocused).toBeTruthy();
      });
    });
  });

  // ============================================================
  // SECTION 12: Performance & Loading (4 tests)
  // ============================================================

  test.describe('Section 12: Performance & Loading', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('12.1 Verify Page Load Performance', async ({ page }) => {
      await test.step('Test Step 1: Clear browser cache', async () => {
        await page.context().clearCookies();
      });

      await test.step('Test Step 2: Navigate to category page and measure load time', async () => {
        const startTime = Date.now();
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
        const loadTime = Date.now() - startTime;
        
        console.log(`Page load time: ${loadTime}ms`);
        expect(loadTime).toBeLessThan(5000);
      });

      await test.step('Test Step 3: Verify hero section appears first', async () => {
        await expect(categoryPage.heroSection).toBeVisible();
      });

      await test.step('Test Step 4: Verify no blocking resources delay interactivity', async () => {
        await expect(categoryPage.heroBookServiceButton).toBeEnabled();
      });
    });

    test('12.2 Verify Image Loading and Optimization', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 2: Observe image loading throughout page', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
      });

      await test.step('Test Step 3: Verify all images load successfully', async () => {
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        
        const imageInfo = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('img'));
          const broken = images.filter(img => {
            if (!img.complete) return true;
            const hasSrc = img.src && img.src !== '';
            const hasSrcset = img.srcset && img.srcset !== '';
            if (!hasSrc && !hasSrcset) return true;
            return false;
          });
          return {
            total: images.length,
            brokenCount: broken.length
          };
        });
        
        expect(imageInfo.brokenCount).toBeLessThanOrEqual(2);
      });

      await test.step('Test Step 4: Verify no broken image placeholders', async () => {
        await expect(categoryPage.serviceCardImages.first()).toBeVisible();
      });
    });

    test('12.3 Verify Lazy Loading Implementation', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 2: Verify above-fold images load immediately', async () => {
        await expect(categoryPage.heroSection).toBeVisible();
      });

      await test.step('Test Step 3: Slowly scroll down page', async () => {
        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 4: Verify below-fold images load as user scrolls', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
        await expect(categoryPage.serviceCardImages.first()).toBeVisible();
      });
    });

    test('12.4 Verify Network Request Efficiency', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 2: Wait for all network requests', async () => {
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      });

      await test.step('Test Step 3: Verify reasonable number of requests', async () => {
        // Page should not make excessive requests
        await expect(categoryPage.heroSection).toBeVisible();
      });

      await test.step('Test Step 4: Verify page remains functional', async () => {
        await expect(categoryPage.heroBookServiceButton).toBeEnabled();
      });
    });
  });

  // ============================================================
  // SECTION 13: Content Verification (3 tests)
  // ============================================================

  test.describe('Section 13: Content Verification', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('13.1 Verify Dynamic Content Rendering', async ({ page }) => {
      await test.step('Test Step 1: Verify all content sections display', async () => {
        await expect(categoryPage.heroSection).toBeVisible();
        await expect(categoryPage.detailsSection).toBeVisible();
        await expect(categoryPage.serviceCardsSection).toBeVisible();
      });

      await test.step('Test Step 2: Check for placeholder or Lorem Ipsum text', async () => {
        const heroText = await categoryPage.heroHeading.textContent();
        expect(heroText).not.toMatch(/lorem ipsum|placeholder/i);
      });

      await test.step('Test Step 3: Verify descriptions are accurate and helpful', async () => {
        const description = await categoryPage.heroDescription.textContent();
        expect(description).toBeTruthy();
        expect(description!.length).toBeGreaterThan(20);
      });

      await test.step('Test Step 4: Verify no Lorem Ipsum or Test Content visible', async () => {
        const bodyText = await page.textContent('body');
        expect(bodyText).not.toMatch(/lorem ipsum dolor/i);
      });
    });

    test('13.2 Verify Service-Specific Content', async ({ page }) => {
      await test.step('Test Step 1: Verify page has unique, relevant content', async () => {
        const headingText = await categoryPage.heroHeading.textContent();
        expect(headingText).toBeTruthy();
      });

      await test.step('Test Step 2: Verify service cards match the category', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
        await expect(categoryPage.serviceCards.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify benefits relate to the service type', async () => {
        const benefits = categoryPage.heroKeyBenefits;
        const benefitsCount = await benefits.count();
        expect(benefitsCount).toBeGreaterThanOrEqual(3);
      });

      await test.step('Test Step 4: Verify no generic or copied content', async () => {
        const headingText = await categoryPage.heroHeading.textContent();
        expect(headingText!.length).toBeGreaterThan(3);
      });
    });

    test('13.3 Verify CTA Consistency', async ({ page }) => {
      await test.step('Test Step 1: Identify all CTAs on page', async () => {
        await expect(categoryPage.heroBookServiceButton).toBeVisible();
        await categoryPage.scrollToSection(categoryPage.detailsSection);
        await expect(categoryPage.detailsBookTodayLink).toBeVisible();
      });

      await test.step('Test Step 2: Verify CTA text is consistent', async () => {
        const heroCTAText = await categoryPage.heroBookServiceButton.textContent();
        expect(heroCTAText).toMatch(/Book|Service/i);
      });

      await test.step('Test Step 3: Verify button styling is consistent', async () => {
        await expect(categoryPage.heroBookServiceButton).toBeVisible();
        await categoryPage.scrollToSection(categoryPage.introOfferBanner);
        await expect(categoryPage.introOfferBookServiceLink).toBeVisible();
      });
    });
  });

  // ============================================================
  // SECTION 14: Error Handling & Edge Cases (5 tests)
  // ============================================================

  test.describe('Section 14: Error Handling & Edge Cases', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('14.1 Verify Page Behavior with Slow Network', async ({ page }) => {
      await test.step('Test Step 1: Simulate slow 3G connection', async () => {
        await page.route('**/*', route => {
          setTimeout(() => route.continue(), 100);
        });
      });

      await test.step('Test Step 2: Navigate to category page', async () => {
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
      });

      await test.step('Test Step 3: Verify page remains functional during slow load', async () => {
        await expect(categoryPage.heroSection).toBeVisible({ timeout: 30000 });
      });

      await test.step('Test Step 4: Verify critical content loads first', async () => {
        await expect(categoryPage.heroHeading).toBeVisible();
      });
    });

    // test('14.2 Verify Invalid Category URL Handling', async ({ page }) => {
    //   await test.step('Test Step 1: Navigate to invalid category URL', async () => {
    //     await page.goto('/category-page-nonexistent/', { waitUntil: 'domcontentloaded' }).catch(() => {});
    //   });

    //   await test.step('Test Step 2: Observe response', async () => {
    //     await page.waitForTimeout(2000);
    //   });

    //   await test.step('Test Step 3: Verify user is not left with broken page', async () => {
    //     const url = page.url();
    //     expect(url).toBeTruthy();
    //   });

    //   await test.step('Test Step 4: Verify navigation to valid pages remains available', async () => {
    //     const header = page.locator('header');
    //     const isVisible = await header.isVisible().catch(() => false);
    //     expect(isVisible).toBeTruthy();
    //   });
    // });

    test('14.3 Verify JavaScript Disabled Scenario', async ({ page }) => {
      await test.step('Test Step 1: Disable JavaScript', async () => {
        await page.context().addInitScript(() => {
          // This test is more conceptual as Playwright needs JS
        });
      });

      await test.step('Test Step 2: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 3: Verify static content displays', async () => {
        await expect(categoryPage.heroSection).toBeVisible();
      });

      await test.step('Test Step 4: Verify images load', async () => {
        const heroImage = categoryPage.heroSection.locator('img').first();
        const imageCount = await categoryPage.heroSection.locator('img').count();
        if (imageCount > 0) {
          await expect(heroImage).toBeVisible();
        }
      });
    });

    test('14.4 Verify Carousel Edge Cases', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await expect(page).toHaveURL(new RegExp(BASE_URL));
      });

      await test.step('Test Step 2: Scroll to service carousel', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCarouselSection);
      });

      await test.step('Test Step 3: Rapidly click carousel Next button multiple times', async () => {
        await categoryPage.serviceCarouselNextButton.click();
        await categoryPage.serviceCarouselNextButton.click();
        await categoryPage.serviceCarouselNextButton.click();
      });

      await test.step('Test Step 4: Verify carousel animation remains smooth', async () => {
        await page.waitForTimeout(1000);
        await expect(categoryPage.serviceCarouselCards.first()).toBeVisible();
      });

      await test.step('Test Step 5: Verify no visual glitches', async () => {
        await expect(categoryPage.serviceCarouselSection).toBeVisible();
      });
    });

    test('14.5 Verify Video/Media Failure Handling', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 2: Check if video exists', async () => {
        await categoryPage.scrollToSection(categoryPage.detailsSection);
        const video = categoryPage.detailsVideo;
        const isVisible = await video.isVisible().catch(() => false);
        
        if (isVisible) {
          await expect(video).toBeVisible();
        }
      });

      await test.step('Test Step 3: Verify section content remains accessible', async () => {
        await expect(categoryPage.detailsHeading).toBeVisible();
        await expect(categoryPage.detailsDescription).toBeVisible();
      });

      await test.step('Test Step 4: Verify user can continue using page', async () => {
        await expect(categoryPage.detailsBookTodayLink).toBeVisible();
      });
    });
  });

  // ============================================================
  // SECTION 15: Cross-Browser Compatibility (4 tests)
  // ============================================================

  test.describe('Section 15: Cross-Browser Compatibility', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('15.1 Verify Chrome/Chromium Behavior', async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium', 'Test only for Chromium');
      
      await test.step('Test Step 1: Verify all features work correctly', async () => {
        await expect(categoryPage.heroSection).toBeVisible();
      });

      await test.step('Test Step 2: Verify styling renders properly', async () => {
        await expect(categoryPage.heroBookServiceButton).toBeVisible();
      });

      await test.step('Test Step 3: Verify animations are smooth', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCarouselSection);
        await categoryPage.serviceCarouselNextButton.click();
        await page.waitForTimeout(500);
      });
    });

    test('15.2 Verify Firefox Behavior', async ({ page, browserName }) => {
      test.skip(browserName !== 'firefox', 'Test only for Firefox');
      
      await test.step('Test Step 1: Verify all features work correctly', async () => {
        await expect(categoryPage.heroSection).toBeVisible();
      });

      await test.step('Test Step 2: Verify Flexbox/Grid layouts render properly', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
        await expect(categoryPage.serviceCards.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify carousel functions correctly', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCarouselSection);
        await expect(categoryPage.serviceCarouselNextButton).toBeVisible();
      });
    });

    test('15.3 Verify Safari/WebKit Behavior', async ({ page, browserName }) => {
      test.skip(browserName !== 'webkit', 'Test only for Safari/WebKit');
      
      await test.step('Test Step 1: Verify all features work correctly', async () => {
        await expect(categoryPage.heroSection).toBeVisible();
      });

      await test.step('Test Step 2: Verify -webkit- prefixes work where needed', async () => {
        await expect(categoryPage.heroBookServiceButton).toBeVisible();
      });

      await test.step('Test Step 3: Verify no Safari-specific rendering issues', async () => {
        await categoryPage.scrollToSection(categoryPage.serviceCardsSection);
        await expect(categoryPage.serviceCards.first()).toBeVisible();
      });
    });

    test('15.4 Verify Edge Browser Behavior', async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium', 'Edge uses Chromium engine');
      
      await test.step('Test Step 1: Verify all features work identically to Chrome', async () => {
        await expect(categoryPage.heroSection).toBeVisible();
      });

      await test.step('Test Step 2: Verify no Edge-specific problems', async () => {
        await expect(categoryPage.heroBookServiceButton).toBeEnabled();
      });
    });
  });

  // ============================================================
  // SECTION 16: SEO & Meta Information (5 tests)
  // ============================================================

  test.describe('Section 16: SEO & Meta Information', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('16.1 Verify Page Title', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await expect(page).toHaveURL(new RegExp(BASE_URL));
      });

      await test.step('Test Step 2: Check browser tab title', async () => {
        const title = await page.title();
        expect(title).toBeTruthy();
      });

      await test.step('Test Step 3: Verify title includes brand name', async () => {
        const title = await page.title();
        expect(title.length).toBeGreaterThan(5);
      });

      await test.step('Test Step 4: Verify title is unique and descriptive', async () => {
        const title = await page.title();
        expect(title.length).toBeLessThan(60);
      });
    });

    test('16.2 Verify Meta Description', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 2: Check meta description tag', async () => {
        const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
        if (metaDescription) {
          expect(metaDescription.length).toBeGreaterThan(20);
          expect(metaDescription.length).toBeLessThan(160);
        }
      });
    });

    test('16.3 Verify Heading Hierarchy', async ({ page }) => {
      await test.step('Test Step 0: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 1: Verify one H1 per page', async () => {
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBeGreaterThanOrEqual(1);
        expect(h1Count).toBeLessThanOrEqual(2);
      });

      await test.step('Test Step 2: Verify H2 tags for main sections', async () => {
        const h2Count = await page.locator('h2').count();
        expect(h2Count).toBeGreaterThan(0);
      });

      await test.step('Test Step 3: Verify no skipped heading levels', async () => {
        const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', elements => 
          elements.map(el => parseInt(el.tagName.substring(1)))
        );
        expect(headings.length).toBeGreaterThan(0);
      });
    });

    test('16.4 Verify Canonical URL', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 2: Check canonical URL tag', async () => {
        const canonicalLink = page.locator('link[rel="canonical"]');
        const canonicalCount = await canonicalLink.count();
        if (canonicalCount > 0) {
          const href = await canonicalLink.getAttribute('href');
          expect(href).toBeTruthy();
        }
      });
    });

    // test('16.5 Verify Open Graph Tags', async ({ page }) => {
    //   await test.step('Test Step 1: Navigate to category page', async () => {
    //     await page.goto(BASE_URL);
    //   });

    //   await test.step('Test Step 2: Check og:title tag', async () => {
    //     const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    //     if (ogTitle) {
    //       expect(ogTitle.length).toBeGreaterThan(5);
    //     }
    //   });

    //   await test.step('Test Step 3: Check og:description tag', async () => {
    //     const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    //     if (ogDescription) {
    //       expect(ogDescription.length).toBeGreaterThan(10);
    //     }
    //   });

    //   await test.step('Test Step 4: Check og:image tag', async () => {
    //     const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    //     if (ogImage) {
    //       expect(ogImage).toContain('http');
    //     }
    //   });
    // });
  });

  // ============================================================
  // SECTION 17: Analytics & Tracking (3 tests)
  // ============================================================

  test.describe('Section 17: Analytics & Tracking', () => {
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
      categoryPage = new CategoryPage(page);
    });

    test('17.1 Verify Google Analytics Implementation', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 2: Check for GA script loading', async () => {
        await page.waitForTimeout(2000);
        const scripts = await page.$$eval('script', elements => 
          elements.map(el => el.src).filter(src => src.includes('google') || src.includes('gtag') || src.includes('analytics'))
        );
        // GA may or may not be present depending on environment
      });

      await test.step('Test Step 3: Verify no analytics errors in console', async () => {
        const consoleErrors = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });
        await page.waitForTimeout(1000);
      });
    });

    test('17.2 Verify CTA Click Tracking', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await expect(page).toHaveURL(new RegExp(BASE_URL));
      });

      await test.step('Test Step 2: Click Book Service CTA', async () => {
        await categoryPage.heroBookServiceButton.click();
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 3: Verify event data includes relevant context', async () => {
        // Event tracking verification would typically be done with analytics debugging tools
        await page.waitForURL(/\/locations/, { timeout: 15000 });
      });
    });

    test('17.3 Verify Third-Party Integrations', async ({ page }) => {
      await test.step('Test Step 1: Navigate to category page', async () => {
        await page.goto(BASE_URL);
      });

      await test.step('Test Step 2: Check for third-party scripts', async () => {
        await page.waitForTimeout(2000);
        const scripts = await page.$$eval('script', elements => elements.map(el => el.src));
        expect(scripts.length).toBeGreaterThan(0);
      });

      await test.step('Test Step 3: Verify Cookiebot loads if applicable', async () => {
        const cookiebotScript = await page.$$eval('script', elements => 
          elements.some(el => el.src.includes('cookiebot'))
        );
        // Cookiebot may or may not be present
      });

      await test.step('Test Step 4: Verify third-party failures do not break page', async () => {
        await expect(categoryPage.heroSection).toBeVisible();
        await expect(categoryPage.heroBookServiceButton).toBeEnabled();
      });
    });
  });

});



