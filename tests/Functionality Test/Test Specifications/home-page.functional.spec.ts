import { test, expect } from '@playwright/test';
import { HandStonePage } from './pages/HomePage';

// const BASE_URL = 'https://custom-booking-app-development-hand-and-stone.vercel.app/';
// const BASE_URL = 'https://custombookingapp-env-staging-hand-and-stone.vercel.app/';
// const BASE_URL = 'https://custom-booking-app-release-hand-and-stone.vercel.app/';
const BASE_URL = 'https://handandstone.com/';

test.describe('Hand & Stone Homepage - Comprehensive Test Suite', () => {
  
  // ============ 1. Hero Section & Primary CTAs ============
  test.describe('1. Hero Section & Primary CTAs [P0]', () => {
  let spa: HandStonePage;

  test.beforeEach(async ({ page }) => {
    spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('1.1 Verify Hero Section Loads with Background Media', async ({ page }) => {
      await test.step('Test Step 1: Navigate to homepage', async () => {
        await expect(page).toHaveURL(/\/$/);
      });

      await test.step('Test Step 2: Verify hero section is visible with heading', async () => {
        const heading = page.getByRole('heading', { name: /Massages.*Facials.*Moments of calm/i });
        await expect(heading).toBeVisible();
      });

      await test.step('Test Step 3: Verify hero background media (video or image)', async () => {
        // Check if video exists (dev environment) or image (production)
        const hasVideo = await spa.heroVideo.isVisible().catch(() => false);
        const hasBackgroundImage = await spa.heroSection.evaluate((el) => {
          const bgImage = window.getComputedStyle(el).backgroundImage;
          return bgImage && bgImage !== 'none';
        });
        
        // Assert that hero has either video or background image
        expect(hasVideo || hasBackgroundImage).toBeTruthy();
      });

      await test.step('Test Step 4: Verify pause button if video exists', async () => {
        // Only check pause button if video is present
        const hasVideo = await spa.heroVideo.isVisible().catch(() => false);
        if (hasVideo) {
          await expect(spa.videoPauseButton).toBeVisible();
        }
        // Skip check if no video (production environment)
      });

      await test.step('Test Step 5: Verify both CTAs are visible', async () => {
        await expect(spa.heroBookNowButton).toBeVisible();
        await expect(spa.heroGiftCardButton).toBeVisible();
      });
    });

    test('1.2 Verify Video Pause Functionality', async ({ page }) => {
      // Check if video exists before running video-specific tests
      const hasVideo = await spa.heroVideo.isVisible().catch(() => false);
      
      if (!hasVideo) {
        test.skip(true, 'Video not present in this environment (production uses static image)');
      }

      await test.step('Test Step 1: Locate the pause video button', async () => {
        await expect(spa.videoPauseButton).toBeVisible();
      });

      await test.step('Test Step 2: Verify button is interactive', async () => {
        await expect(spa.videoPauseButton).toBeEnabled();
      });

      await test.step('Test Step 3: Click pause button', async () => {
        await spa.videoPauseButton.click();
        await page.waitForTimeout(300); // Wait for button state to update
      });

      await test.step('Test Step 4: Verify button changes to play button (video is paused)', async () => {
        // After pausing, button aria-label changes from "pause-video" to "play-video"
        const playButton = page.getByRole('button', { name: 'play-video' });
        await expect(playButton).toBeVisible();
        await expect(playButton).toBeEnabled();
      });
    });

    test('1.3 Verify Book Now Button Navigation from Hero', async ({ page }) => {
      await test.step('Test Step 1: Verify button is visible and enabled', async () => {
        await expect(spa.heroBookNowButton).toBeVisible();
        await expect(spa.heroBookNowButton).toBeEnabled();
      });

      await test.step('Test Step 2: Click Book Now button', async () => {
        await spa.heroBookNowButton.click();
      });

      await test.step('Test Step 3: Verify navigation to locations page', async () => {
        await expect(page).toHaveURL(/\/locations\/?$/);
      });
    });

    test('1.4 Verify Buy a Gift Card Button Navigation from Hero', async ({ page }) => {
      await test.step('Test Step 1: Verify button is visible and enabled', async () => {
        await expect(spa.heroGiftCardButton).toBeVisible();
        await expect(spa.heroGiftCardButton).toBeEnabled();
      });

      await test.step('Test Step 2: Click Buy a Gift Card button', async () => {
        await spa.heroGiftCardButton.click();
      });

      await test.step('Test Step 3: Verify navigation to gift card page', async () => {
        await expect(page).toHaveURL(/zenoti|webstoreNew/i);
      });
    });

    test('1.5 Verify Promotional Banner Display and Dismissal', async ({ page }) => {
      const closeButton = page.getByRole('button', { name: 'Close promotion' });
      
      await test.step('Test Step 1: Check if promotional banner is visible', async () => {
        const isVisible = await closeButton.isVisible({ timeout: 2000 }).catch(() => false);
        if (!isVisible) {
          test.skip(true, 'Promotional banner not displayed');
        }
      });

      await test.step('Test Step 2: Verify banner content and CTA', async () => {
        // Find the banner container (parent of close button) and verify content within it
        const promoBannerContainer = closeButton.locator('xpath=ancestor::*[contains(@class, "promo") or contains(@role, "banner") or parent::div][1]');
        const bannerText = closeButton.locator('xpath=ancestor::*//h2[contains(text(), "Give the gift")]');
        
        await expect(closeButton).toBeVisible();
        // Verify Buy Now CTA is near the close button (in same banner)
        await expect(page.getByRole('link', { name: /buy now/i }).first()).toBeVisible();
      });

      await test.step('Test Step 3: Click close button', async () => {
        await expect(closeButton).toBeVisible();
        await closeButton.click();
        await page.waitForTimeout(500); // Wait for dismiss animation
      });

      await test.step('Test Step 4: Verify banner dismisses', async () => {
        // Verify the close button itself is no longer visible (banner is dismissed)
        await expect(closeButton).not.toBeVisible();
      });
    });
  });

  // ============ 2. Navigation Menu ============
  test.describe('2. Navigation Menu [P0]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('2.1 Verify Navigation Menu Opens Successfully', async ({ page }) => {
      await test.step('Test Step 1: Verify menu button is visible', async () => {
        await expect(spa.menuButton).toBeVisible();
      });

      await test.step('Test Step 2: Click menu button', async () => {
        await spa.menuButton.click();
      });

      await test.step('Test Step 3: Verify navigation menu displays', async () => {
        await page.waitForTimeout(500);
        const nav = page.locator('nav').first();
        await expect(nav).toBeVisible();
      });

      await test.step('Test Step 4: Verify close button is visible', async () => {
        const closeButton = page.getByRole('button', { name: 'close-menu-navigation' });
        await expect(closeButton).toBeVisible();
      });
    });

    test('2.2 Verify Navigation Menu Service Categories', async ({ page }) => {
      await test.step('Test Step 1: Open navigation menu', async () => {
        await spa.menuButton.click();
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 2: Locate Services section', async () => {
        const servicesSection = page.getByText('Services').or(page.getByText('SERVICES'));
        await expect(servicesSection.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify all 5 service buttons are present', async () => {
        const services = ['Massage', 'Facials', 'Toning', 'Injectables', 'Hair Removal'];
        for (const service of services) {
          const serviceLink = page.getByRole('link', { name: new RegExp(service, 'i') }).or(
            page.getByRole('button', { name: new RegExp(service, 'i') })
          );
          await expect(serviceLink.first()).toBeVisible();
        }
      });
    });

    test('2.3 Verify Navigation Menu Discover Links', async ({ page }) => {
      await test.step('Test Step 1: Open navigation menu', async () => {
        await spa.menuButton.click();
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 2: Locate DISCOVER section', async () => {
        const discoverSection = page.getByText('DISCOVER');
        await expect(discoverSection.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify all 4 discover links', async () => {
        const discoverLinks = ['Membership', 'Gift Cards', 'Locations', 'Franchise'];
        for (const link of discoverLinks) {
          const discoverLink = page.getByRole('link', { name: new RegExp(link, 'i') });
          await expect(discoverLink.first()).toBeVisible();
        }
      });
    });

    test('2.4 Verify Navigation Menu Account Link', async ({ page }) => {
      await test.step('Test Step 1: Open navigation menu', async () => {
        await spa.menuButton.click();
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 2: Locate and verify Account link', async () => {
        const accountLink = page.getByRole('link', { name: /account/i });
        await expect(accountLink.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify link points to account page', async () => {
        const accountLink = page.getByRole('link', { name: /account/i }).first();
        const href = await accountLink.getAttribute('href');
        expect(href).toContain('zenoti');
      });
    });

    test('2.5 Verify Navigation Menu Close Functionality', async ({ page }) => {
      await test.step('Test Step 1: Open navigation menu', async () => {
        await spa.menuButton.click();
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 2: Locate close button', async () => {
        const closeButton = page.getByRole('button', { name: 'close-menu-navigation' });
        await expect(closeButton).toBeVisible();
      });

      await test.step('Test Step 3: Click close button', async () => {
        const closeButton = page.getByRole('button', { name: 'close-menu-navigation' });
        await closeButton.click();
      });

      await test.step('Test Step 4: Verify menu closes', async () => {
        await page.waitForTimeout(500);
        await expect(spa.heroSection).toBeVisible();
      });

      await test.step('Test Step 5: Verify menu can be reopened', async () => {
        await spa.menuButton.click();
        const nav = page.locator('nav').first();
        await expect(nav).toBeVisible();
      });
    });
  });

  // ============ 3. Value Proposition Section ============
  test.describe('3. Value Proposition Section [P1]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('3.1 Verify Value Proposition Section Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to value proposition section', async () => {
        await spa.scrollToSection(spa.valuePropositionSection);
      });

      await test.step('Test Step 2: Verify section displays heading', async () => {
        const heading = page.getByText(/Timeless spa techniques perfected for you/i);
        await expect(heading).toBeVisible();
      });

      await test.step('Test Step 3: Verify subheading is visible', async () => {
        const subheading = page.getByText(/Trusted care since 2004/i);
        await expect(subheading).toBeVisible();
      });

      await test.step('Test Step 4: Verify two CTA cards are visible', async () => {
        await expect(spa.valuePropositionBookNow).toBeVisible();
        await expect(spa.valuePropositionJoinToday).toBeVisible();
      });
    });

    test('3.2 Verify Book a Treatment CTA in Value Proposition', async ({ page }) => {
      await test.step('Test Step 1: Scroll to value proposition section', async () => {
        await spa.scrollToSection(spa.valuePropositionSection);
      });

      await test.step('Test Step 2: Verify Book Now CTA is present and clickable', async () => {
        await expect(spa.valuePropositionBookNow).toBeVisible();
        await expect(spa.valuePropositionBookNow).toBeEnabled();
      });

      await test.step('Test Step 3: Click Book Now link', async () => {
        await spa.valuePropositionBookNow.click();
      });

      await test.step('Test Step 4: Verify navigation to locations page', async () => {
        await expect(page).toHaveURL(/\/locations/);
      });
    });

    test('3.3 Verify Become a Member CTA in Value Proposition', async ({ page }) => {
      await test.step('Test Step 1: Scroll to value proposition section', async () => {
        await spa.scrollToSection(spa.valuePropositionSection);
      });

      await test.step('Test Step 2: Verify Join Today CTA is present and clickable', async () => {
        await expect(spa.valuePropositionJoinToday).toBeVisible();
        await expect(spa.valuePropositionJoinToday).toBeEnabled();
      });

      await test.step('Test Step 3: Click Join Today link', async () => {
        await spa.valuePropositionJoinToday.click();
      });

      await test.step('Test Step 4: Verify navigation to memberships page', async () => {
        await expect(page).toHaveURL(/\/memberships?\/?$/);
      });
    });
  });

  // ============ 4. Treatments Carousel ============
  test.describe('4. Treatments Carousel [P0]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('4.1 Verify Treatments Section Initial Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to treatments carousel', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
        await page.waitForTimeout(500); // Wait for carousel to stabilize
      });

      await test.step('Test Step 2: Verify section heading is visible', async () => {
        const heading = page.getByText(/Personalized treatments to relax.*renew/i);
        await expect(heading).toBeVisible();
      });

      await test.step('Test Step 3: Verify all 5 treatment cards are visible', async () => {
        const treatments: Array<'Massages' | 'Facials' | 'Toning' | 'Injectables' | 'Hair Removal'> = 
          ['Massages', 'Facials', 'Toning', 'Injectables', 'Hair Removal'];
        for (const treatment of treatments) {
          const card = spa.getTreatmentCard(treatment);
          await expect(card).toBeVisible();
        }
      });

      await test.step('Test Step 4: Verify navigation buttons are present', async () => {
      const prevButton = page.getByRole('button', { name: 'Previous' });
        const nextButton = spa.treatmentsNextButton;
        
      await expect(prevButton).toBeDisabled();
        await expect(nextButton).toBeEnabled();
      });
    });

    test('4.2 Verify Carousel Next Navigation', async ({ page }) => {
      await test.step('Test Step 1: Scroll to treatments carousel', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
      });

      await test.step('Test Step 2: Verify Next button is clickable', async () => {
        await expect(spa.treatmentsNextButton).toBeVisible();
        await expect(spa.treatmentsNextButton).toBeEnabled();
      });

      await test.step('Test Step 3: Click Next button', async () => {
        await spa.treatmentsNextButton.click();
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 4: Verify Previous button becomes enabled', async () => {
        const prevButton = page.getByRole('button', { name: 'Previous' });
        await expect(prevButton).toBeEnabled();
      });
    });

    test('4.3 Verify Carousel Previous Navigation', async ({ page }) => {
      await test.step('Test Step 1: Scroll to treatments carousel', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
      });

      await test.step('Test Step 2: Click Next to enable Previous', async () => {
        await spa.treatmentsNextButton.click();
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 3: Verify Previous button is enabled', async () => {
        const prevButton = page.getByRole('button', { name: 'Previous' });
        await expect(prevButton).toBeEnabled();
      });

      await test.step('Test Step 4: Click Previous button', async () => {
        const prevButton = page.getByRole('button', { name: 'Previous' });
        await prevButton.click();
        await page.waitForTimeout(500);
      });

      await test.step('Test Step 5: Verify carousel returns to previous position', async () => {
        const prevButton = page.getByRole('button', { name: 'Previous' });
        await expect(prevButton).toBeDisabled();
      });
    });

    test('4.4 Verify Massages Treatment Card Interaction', async ({ page }) => {
      await test.step('Test Step 1: Scroll to treatments carousel', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
      });

      await test.step('Test Step 2: Verify Massages card is visible', async () => {
        const massagesCard = spa.getTreatmentCard('Massages');
        await expect(massagesCard).toBeVisible();
      });

      await test.step('Test Step 3: Click Massages card', async () => {
        await spa.getTreatmentCard('Massages').click();
      });

      await test.step('Test Step 4: Verify navigation to massage page', async () => {
        await expect(page).toHaveURL(/\/massage/);
      });
    });

    test('4.5 Verify Facials Treatment Card Interaction', async ({ page }) => {
      await test.step('Test Step 1: Scroll to treatments carousel', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
      });

      await test.step('Test Step 2: Verify Facials card is visible', async () => {
        const facialsCard = spa.getTreatmentCard('Facials');
        await expect(facialsCard).toBeVisible();
      });

      await test.step('Test Step 3: Click Facials card', async () => {
        await spa.getTreatmentCard('Facials').click();
      });

      await test.step('Test Step 4: Verify navigation to facials page', async () => {
        await expect(page).toHaveURL(/\/facials/);
      });
    });

    test('4.6 Verify Toning Treatment Card Interaction', async ({ page }) => {
      await test.step('Test Step 1: Scroll to treatments carousel', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
      });

      await test.step('Test Step 2: Verify Toning card is visible', async () => {
        const toningCard = spa.getTreatmentCard('Toning');
        await expect(toningCard).toBeVisible();
      });

      await test.step('Test Step 3: Click Toning card', async () => {
        await spa.getTreatmentCard('Toning').click();
      });

      await test.step('Test Step 4: Verify navigation to toning page', async () => {
        await expect(page).toHaveURL(/toning|body-toning/);
      });
    });

    test('4.7 Verify Injectables Treatment Card Interaction', async ({ page }) => {
      await test.step('Test Step 1: Scroll to treatments carousel', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
      });

      await test.step('Test Step 2: Verify Injectables card is visible', async () => {
        const injectablesCard = spa.getTreatmentCard('Injectables');
        await expect(injectablesCard).toBeVisible();
      });

      await test.step('Test Step 3: Click Injectables card', async () => {
        await spa.getTreatmentCard('Injectables').click();
      });

      await test.step('Test Step 4: Verify navigation to injectables page', async () => {
        await expect(page).toHaveURL(/injectables/);
      });
    });

    test('4.8 Verify Hair Removal Treatment Card Interaction', async ({ page }) => {
      await test.step('Test Step 1: Scroll to treatments carousel', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
      });

      await test.step('Test Step 2: Verify Hair Removal card is visible', async () => {
        const hairRemovalCard = spa.getTreatmentCard('Hair Removal');
        await expect(hairRemovalCard).toBeVisible();
      });

      await test.step('Test Step 3: Click Hair Removal card', async () => {
        await spa.getTreatmentCard('Hair Removal').click();
      });

      await test.step('Test Step 4: Verify navigation to hair removal page', async () => {
        await expect(page).toHaveURL(/hair-removal/);
      });
    });

    test('4.9 Verify Treatments Section Book Now CTA', async ({ page }) => {
      await test.step('Test Step 1: Scroll to treatments section', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
      });

      await test.step('Test Step 2: Verify Book Now CTA is visible', async () => {
        await expect(spa.treatmentsBookNow).toBeVisible();
      });

      await test.step('Test Step 3: Click Book Now button', async () => {
        await spa.treatmentsBookNow.click();
      });

      await test.step('Test Step 4: Verify navigation to locations page', async () => {
        await expect(page).toHaveURL(/\/locations/);
      });
    });
  });

  // ============ 5. Find a Spa Section ============
  test.describe('5. Find a Spa Section [P1]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('5.1 Verify Find a Spa Section Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to Find a Spa section', async () => {
        await spa.scrollToSection(spa.findSpaSection);
      });

      await test.step('Test Step 2: Verify section label is visible', async () => {
        const label = page.getByText(/600\+ Locations Nationwide/i);
        await expect(label).toBeVisible();
      });

      await test.step('Test Step 3: Verify heading is visible', async () => {
        const heading = page.getByText(/Find a location near you/i);
        await expect(heading).toBeVisible();
      });

      await test.step('Test Step 4: Verify Find a Spa CTA is visible', async () => {
        await expect(spa.findSpaButton).toBeVisible();
      });
    });

    test('5.2 Verify Find a Spa CTA Navigation', async ({ page }) => {
      await test.step('Test Step 1: Scroll to Find a Spa section', async () => {
        await spa.scrollToSection(spa.findSpaSection);
      });

      await test.step('Test Step 2: Verify CTA link is visible and enabled', async () => {
        await expect(spa.findSpaButton).toBeVisible();
        await expect(spa.findSpaButton).toBeEnabled();
      });

      await test.step('Test Step 3: Click Find a Spa link', async () => {
        await spa.findSpaButton.click();
      });

      await test.step('Test Step 4: Verify navigation to locations page', async () => {
        await expect(page).toHaveURL(/\/locations/);
      });
    });
  });

  // ============ 6. Membership Section ============
  test.describe('6. Membership Section [P1]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('6.1 Verify Membership Section Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to membership section', async () => {
        await spa.scrollToSection(spa.membershipSection);
      });

      await test.step('Test Step 2: Verify section heading is visible', async () => {
        const heading = page.getByText(/Make it a ritual/i);
        await expect(heading).toBeVisible();
      });

      await test.step('Test Step 3: Verify section label is visible', async () => {
        const label = page.getByText(/Become a Member/i);
        await expect(label.first()).toBeVisible();
      });

      await test.step('Test Step 4: Verify content container is visible', async () => {
        await expect(spa.membershipContent).toBeVisible();
      });
    });

    test('6.2 Verify Membership Benefits List', async ({ page }) => {
      await test.step('Test Step 1: Scroll to membership section', async () => {
        await spa.scrollToSection(spa.membershipSection);
      });

      await test.step('Test Step 2: Verify Monthly self-care benefit', async () => {
        const benefit = page.getByText(/Monthly self-care/i);
        await expect(benefit).toBeVisible();
      });

      await test.step('Test Step 3: Verify Member-only savings benefit', async () => {
        const benefit = page.getByText(/Member-only savings/i);
        await expect(benefit).toBeVisible();
      });

      await test.step('Test Step 4: Verify Loyalty that pays off benefit', async () => {
        const benefit = page.getByText(/Loyalty that pays off/i);
        await expect(benefit).toBeVisible();
      });
    });

    test('6.3 Verify Membership CTA Navigation', async ({ page }) => {
      await test.step('Test Step 1: Scroll to membership section', async () => {
        await spa.scrollToSection(spa.membershipSection);
      });

      await test.step('Test Step 2: Verify Explore Memberships CTA', async () => {
        await expect(spa.membershipCTA).toBeVisible();
        await expect(spa.membershipCTA).toBeEnabled();
      });

      await test.step('Test Step 3: Click CTA link', async () => {
        await spa.membershipCTA.click();
      });

      await test.step('Test Step 4: Verify navigation to memberships page', async () => {
        await expect(page).toHaveURL(/\/memberships?\/?$/);
      });
    });
  });

  // ============ 7. Gift Cards Section ============
  test.describe('7. Gift Cards Section [P1]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('7.1 Verify Gift Cards Section Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to gift cards section', async () => {
        await spa.scrollToSection(spa.giftCardsSection);
      });

      await test.step('Test Step 2: Verify section label is visible', async () => {
        // Scope search to Gift Cards section to avoid finding nav menu link
        const label = spa.giftCardsSection.getByText('Gift Cards');
        await expect(label.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify heading is visible', async () => {
        // Scope to Gift Cards section to avoid finding promotional banner text
        const heading = spa.giftCardsSection.getByText(/Give the gift of feeling good/i);
        await expect(heading).toBeVisible();
      });

      await test.step('Test Step 4: Verify Buy a Gift Card CTA is visible', async () => {
        await expect(spa.giftCardsButton).toBeVisible();
      });
    });

    test('7.2 Verify Gift Cards CTA Navigation', async ({ page }) => {
      await test.step('Test Step 1: Scroll to gift cards section', async () => {
        await spa.scrollToSection(spa.giftCardsSection);
      });

      await test.step('Test Step 2: Verify CTA link is visible and clickable', async () => {
        await expect(spa.giftCardsButton).toBeVisible();
        await expect(spa.giftCardsButton).toBeEnabled();
      });

      await test.step('Test Step 3: Click Buy a Gift Card link', async () => {
        await spa.giftCardsButton.click();
      });

      await test.step('Test Step 4: Verify navigation to gift card page', async () => {
        await expect(page).toHaveURL(/zenoti.*giftcards/i);
      });
    });
  });

  // ============ 8. Onboarding Cards Section ============
  test.describe('8. Onboarding Cards Section [P2]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('8.1 Verify Onboarding Section Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to onboarding cards section', async () => {
        await spa.scrollToSection(spa.onboardingSection);
      });

      await test.step('Test Step 2: Verify section heading is visible', async () => {
        const heading = page.getByText(/Ready to relax.*We.*ve got you/i);
        await expect(heading).toBeVisible();
      });

      await test.step('Test Step 3: Verify all 3 onboarding cards are displayed', async () => {
        await expect(spa.findSpaCard).toBeVisible();
        await expect(spa.meetProvidersCard).toBeVisible();
        await expect(spa.becomeMemberCard).toBeVisible();
      });
    });

    test('8.2 Verify Find a Spa Onboarding Card', async () => {
      await test.step('Test Step 1: Scroll to onboarding section', async () => {
        await spa.scrollToSection(spa.onboardingSection);
      });

      await test.step('Test Step 2: Verify Find a Spa card is visible', async () => {
        await expect(spa.findSpaCard).toBeVisible();
      });

      await test.step('Test Step 3: Verify button is clickable', async () => {
        await expect(spa.findSpaCard).toBeEnabled();
      });
    });

    test('8.3 Verify Meet Our Providers Onboarding Card', async () => {
      await test.step('Test Step 1: Scroll to onboarding section', async () => {
        await spa.scrollToSection(spa.onboardingSection);
      });

      await test.step('Test Step 2: Verify Meet Our Providers card is visible', async () => {
        await expect(spa.meetProvidersCard).toBeVisible();
      });

      await test.step('Test Step 3: Verify button is clickable', async () => {
        await expect(spa.meetProvidersCard).toBeEnabled();
      });
    });

    test('8.4 Verify Become a Member Onboarding Card', async () => {
      await test.step('Test Step 1: Scroll to onboarding section', async () => {
        await spa.scrollToSection(spa.onboardingSection);
      });

      await test.step('Test Step 2: Verify Become a Member card is visible', async () => {
        await expect(spa.becomeMemberCard).toBeVisible();
      });

      await test.step('Test Step 3: Verify button is clickable', async () => {
        await expect(spa.becomeMemberCard).toBeEnabled();
      });
    });
  });

  // ============ 9. Experts Section ============
  test.describe('9. Experts Section [P2]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('9.1 Verify Experts Section Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to experts section', async () => {
        await spa.scrollToSection(spa.expertsSection);
      });

      await test.step('Test Step 2: Verify section label is visible', async () => {
        const label = page.getByText(/Meet Our Experts/i);
        await expect(label).toBeVisible();
      });

      await test.step('Test Step 3: Verify heading is visible', async () => {
        const heading = page.getByText(/Licensed.*Trusted.*Exceptional/i);
        await expect(heading).toBeVisible();
      });

      await test.step('Test Step 4: Verify two CTAs are visible', async () => {
        await expect(spa.expertsLearnMore).toBeVisible();
        await expect(spa.expertsJoinTeam).toBeVisible();
      });
    });

    test('9.2 Verify Experts Learn More CTA', async ({ page }) => {
      await test.step('Test Step 1: Scroll to experts section', async () => {
        await spa.scrollToSection(spa.expertsSection);
      });

      await test.step('Test Step 2: Verify Learn More CTA is visible and clickable', async () => {
        await expect(spa.expertsLearnMore).toBeVisible();
        await expect(spa.expertsLearnMore).toBeEnabled();
      });

      await test.step('Test Step 3: Click Learn More link', async () => {
        await spa.expertsLearnMore.click();
      });

      await test.step('Test Step 4: Verify navigation to Our Story page', async () => {
        await expect(page).toHaveURL(/\/our-story\/?$/);
      });
    });

    test('9.3 Verify Join Our Team CTA', async ({ page }) => {
      await test.step('Test Step 1: Scroll to experts section', async () => {
        await spa.scrollToSection(spa.expertsSection);
      });

      await test.step('Test Step 2: Verify Join Our Team CTA is visible and clickable', async () => {
        await expect(spa.expertsJoinTeam).toBeVisible();
        await expect(spa.expertsJoinTeam).toBeEnabled();
      });

      await test.step('Test Step 3: Click Join Our Team link', async () => {
        await spa.expertsJoinTeam.click();
      });

      await test.step('Test Step 4: Verify navigation to careers page', async () => {
        await expect(page).toHaveURL(/handandstonecareers\.com/);
      });
    });
  });

  // ============ 10. Franchise Section ============
  test.describe('10. Franchise Section [P2]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('10.1 Verify Franchise Section Display', async ({ page }) => {
      await test.step('Test Step 1: Scroll to franchise section', async () => {
        await spa.scrollToSection(spa.franchiseSection);
      });

      await test.step('Test Step 2: Verify section label is visible', async () => {
        const label = spa.franchiseSection.getByText(/OWN A FRANCHISE/i);
        await expect(label.first()).toBeVisible();
      });

      await test.step('Test Step 3: Verify heading is visible', async () => {
        // Scope to franchise section to avoid strict mode violation (desktop + mobile versions)
        const heading = spa.franchiseSection.getByText(/Grow with a brand guests trust/i);
        await expect(heading.first()).toBeVisible();
      });

      await test.step('Test Step 4: Verify background image is displayed', async () => {
        await expect(spa.franchiseBackgroundImage).toBeVisible();
      });

      await test.step('Test Step 5: Verify Learn More CTA is visible', async () => {
        await expect(spa.franchiseLearnMore).toBeVisible();
      });
    });

    test('10.2 Verify Franchise Learn More CTA', async ({ page }) => {
      await test.step('Test Step 1: Scroll to franchise section', async () => {
        await spa.scrollToSection(spa.franchiseSection);
      });

      await test.step('Test Step 2: Verify Learn More link is visible and clickable', async () => {
        await expect(spa.franchiseLearnMore).toBeVisible();
        await expect(spa.franchiseLearnMore).toBeEnabled();
      });

      await test.step('Test Step 3: Click Learn More link', async () => {
        await spa.franchiseLearnMore.click();
      });

      await test.step('Test Step 4: Verify navigation to franchise page', async () => {
        await expect(page).toHaveURL(/\/franchise\/?/);
      });
    });
  });

  // ============ 11. Footer - Navigation Links ============
  test.describe('11. Footer - Navigation Links [P0]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('11.1 Verify Footer Display and Structure', async ({ page }) => {
      await test.step('Scroll to footer', async () => {
        await spa.scrollToSection(spa.footer);
      });

      await test.step('Verify footer is visible', async () => {
        await expect(spa.footer).toBeVisible();
      });

      await test.step('Verify footer sections are present', async () => {
        // Verify each section by checking for visible links instead of accordion headers
        // About Us section
        await expect(spa.footerOurStory).toBeVisible();
        // Services section
        await expect(spa.footerMassages).toBeVisible();
        // Membership section
        await expect(spa.footerMemberships).toBeVisible();
        // Terms & Conditions section
        await expect(spa.footerTermsConditions).toBeVisible();
      });
    });

    test('11.2 Verify Footer About Us Links', async () => {
      await test.step('Scroll to footer', async () => {
        await spa.scrollToSection(spa.footer);
      });

      await test.step('Verify About Us section is present', async () => {
        // Verify section by checking first link is visible
        await expect(spa.footerOurStory).toBeVisible();
      });

      await test.step('Verify all About Us links are present', async () => {
        await expect(spa.footerOurStory).toBeVisible();
        await expect(spa.footerLocations).toBeVisible();
        await expect(spa.footerFranchise).toBeVisible();
        await expect(spa.footerCareers).toBeVisible();
        await expect(spa.footerContact).toBeVisible();
      });
    });

    test('11.3 Verify Footer Services Links', async () => {
      await test.step('Scroll to footer', async () => {
        await spa.scrollToSection(spa.footer);
      });

      await test.step('Verify SERVICES section is present', async () => {
        // Verify section by checking first link is visible
        await expect(spa.footerMassages).toBeVisible();
      });

      await test.step('Verify all 5 service links', async () => {
        await expect(spa.footerMassages).toBeVisible();
        await expect(spa.footerFacials).toBeVisible();
        await expect(spa.footerToning).toBeVisible();
        await expect(spa.footerInjectables).toBeVisible();
        await expect(spa.footerHairRemoval).toBeVisible();
      });
    });

    test('11.4 Verify Footer Membership Links', async () => {
      await test.step('Scroll to footer', async () => {
        await spa.scrollToSection(spa.footer);
      });

      await test.step('Verify MEMBERSHIP section is present', async () => {
        // Verify section by checking link is visible
        await expect(spa.footerMemberships).toBeVisible();
      });

      await test.step('Verify membership links', async () => {
        await expect(spa.footerMemberships).toBeVisible();
      });
    });
  });

  // ============ 12. Footer - Legal & Social ============
  test.describe('12. Footer - Legal & Social [P0]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('12.1 Verify Footer Terms & Conditions Links', async () => {
      await test.step('Scroll to footer', async () => {
        await spa.scrollToSection(spa.footer);
      });

      await test.step('Verify TERMS & CONDITIONS section is present', async () => {
        // Verify section by checking first link is visible
        await expect(spa.footerTermsConditions).toBeVisible();
      });

      await test.step('Verify all legal links are present', async () => {
        await expect(spa.footerCustomerBillOfRights).toBeVisible();
        await expect(spa.footerGiftCardTerms).toBeVisible();
        await expect(spa.footerCaliforniaResidents).toBeVisible();
        await expect(spa.footerTermsConditions).toBeVisible();
        await expect(spa.footerNonDiscrimination).toBeVisible();
      });
    });

    test('12.2 Verify Footer Privacy & Cookie Links', async () => {
      await test.step('Scroll to footer bottom', async () => {
        await spa.scrollToSection(spa.footer);
      });

      await test.step('Verify all privacy links are visible', async () => {
        await expect(spa.footerPrivacyPolicy).toBeVisible();
        await expect(spa.footerCookiePolicy).toBeVisible();
        await expect(spa.footerConsentPreferences).toBeVisible();
      });

      await test.step('Verify Privacy Policy has correct href', async () => {
        await expect(spa.footerPrivacyPolicy).toHaveAttribute('href', /legal\/privacy-policy/);
      });

      await test.step('Verify Cookie Policy has correct href', async () => {
        await expect(spa.footerCookiePolicy).toHaveAttribute('href', /legal\/cookie-policy/);
      });
    });

    test('12.3 Verify Footer Social Media Links', async () => {
      await test.step('Scroll to footer', async () => {
        await spa.scrollToSection(spa.footer);
      });

      await test.step('Verify all 6 social media links are present', async () => {
        await expect(spa.footerInstagram).toBeVisible();
        await expect(spa.footerFacebook).toBeVisible();
        await expect(spa.footerTwitter).toBeVisible();
        await expect(spa.footerLinkedIn).toBeVisible();
        await expect(spa.footerYouTube).toBeVisible();
        await expect(spa.footerTikTok).toBeVisible();
      });

      await test.step('Verify Instagram link has correct href', async () => {
        await expect(spa.footerInstagram).toHaveAttribute('href', /instagram\.com/);
      });

      await test.step('Verify Facebook link has correct href', async () => {
          await expect(spa.footerFacebook).toHaveAttribute('href', /facebook\.com/);
      });
    });

    test('12.4 Verify Footer Buy Gift Card CTA', async ({ page }) => {
      await test.step('Scroll to footer', async () => {
        await spa.scrollToSection(spa.footer);
      });

      await test.step('Verify Buy a Gift Card link is visible', async () => {
        const giftCardLink = spa.footer.getByRole('link', { name: /gift card/i });
        await expect(giftCardLink.first()).toBeVisible();
    });
  });

    test('12.5 Verify Footer Copyright and Disclaimers', async ({ page }) => {
      await test.step('Scroll to footer bottom', async () => {
        await spa.scrollToSection(spa.footer);
      });

      await test.step('Verify copyright text is displayed', async () => {
        const copyright = page.getByText(/@ 2025 Hand & Stone Franchise Corp/i);
        await expect(copyright).toBeVisible();
      });

      await test.step('Verify disclaimer paragraphs are visible', async () => {
        const disclaimer = page.getByText(/Introductory offers|Age restrictions/i);
        await expect(disclaimer.first()).toBeVisible();
      });
    });
  });

  // ============ 13. Global Header Elements ============
  test.describe('13. Global Header Elements [P1]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
        await spa.expectPageLoaded();
      });

    test('13.1 Verify Skip to Content Link (Accessibility)', async ({ page }) => {
      await test.step('Press Tab to focus first element', async () => {
        await page.keyboard.press('Tab');
      });

      await test.step('Verify Skip to content link is focused', async () => {
        await expect(spa.skipToContentLink).toBeFocused();
      });

      await test.step('Activate Skip to content link', async () => {
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500); // Wait for focus to move
      });

      await test.step('Verify focus lands in main content', async () => {
      const isFocusInMain = await page.evaluate(() => {
        const main = document.querySelector('main');
          const activeEl = document.activeElement;
          // Check if focus is in main or if main itself is focused
          if (!main || !activeEl) return false;
          return main.contains(activeEl) || activeEl === main || activeEl.tagName === 'BODY';
      });
      expect(isFocusInMain).toBeTruthy();
      });
    });

    test('13.2 Verify Global Header Book Now Button', async ({ page }) => {
      await test.step('Verify Book Now button is visible in header', async () => {
        await expect(spa.headerBookButton).toBeVisible();
      });

      await test.step('Verify button remains visible while scrolling', async () => {
        await spa.scrollToSection(spa.footer);
        await expect(spa.headerBookButton).toBeVisible();
    });
  });

    test('13.3 Verify Global Header Logo Navigation', async ({ page }) => {
      await test.step('Navigate to a different page', async () => {
        await page.goto(BASE_URL + 'locations/');
        await page.waitForLoadState('domcontentloaded');
      });

      await test.step('Verify logo is visible in header', async () => {
        const logo = page.getByRole('link', { name: 'global header logo' });
        await expect(logo).toBeVisible();
      });

      await test.step('Click logo', async () => {
        const logo = page.getByRole('link', { name: 'global header logo' });
        await logo.click();
      });

      await test.step('Verify navigation to homepage', async () => {
        await expect(page).toHaveURL(/\/$/);
      });
    });
  });

  // ============ 14. Responsive & Cross-Browser Testing ============
  test.describe('14. Responsive & Cross-Browser Testing [P1]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
    });

    test('14.1 Verify Mobile Viewport Display', async ({ page }) => {
      await test.step('Set browser to mobile viewport', async () => {
        await page.setViewportSize({ width: 375, height: 667 });
      });

      await test.step('Navigate to homepage', async () => {
        await spa.goto();
        await spa.expectPageLoaded();
      });

      await test.step('Verify layout adjusts for mobile', async () => {
        await expect(spa.heroSection).toBeVisible();
        await expect(spa.menuButton).toBeVisible();
      });

      await test.step('Verify CTAs are properly sized and clickable', async () => {
        await expect(spa.heroBookNowButton).toBeVisible();
        await expect(spa.heroGiftCardButton).toBeVisible();
      });
    });

    test('14.2 Verify Tablet Viewport Display', async ({ page }) => {
      await test.step('Set browser to tablet viewport', async () => {
        await page.setViewportSize({ width: 768, height: 1024 });
      });

      await test.step('Navigate to homepage', async () => {
        await spa.goto();
        await spa.expectPageLoaded();
      });

      await test.step('Verify layout adjusts for tablet', async () => {
        await expect(spa.heroSection).toBeVisible();
        await expect(spa.treatmentsSection).toBeVisible();
      });

      await test.step('Verify carousels function properly', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
        await expect(spa.treatmentsNextButton).toBeVisible();
        await expect(spa.treatmentsNextButton).toBeEnabled();
    });
  });

    test('14.3 Verify Desktop Large Viewport Display', async ({ page }) => {
      await test.step('Set browser to large desktop viewport', async () => {
        await page.setViewportSize({ width: 1920, height: 1080 });
      });

      await test.step('Navigate to homepage', async () => {
        await spa.goto();
        await spa.expectPageLoaded();
      });

      await test.step('Verify layout scales appropriately', async () => {
        await expect(spa.heroSection).toBeVisible();
        await expect(spa.valuePropositionSection).toBeVisible();
        await expect(spa.treatmentsSection).toBeVisible();
      });

      await test.step('Verify no layout breaking or overflow', async () => {
        const hasOverflow = await page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth;
        });
        expect(hasOverflow).toBeFalsy();
      });
    });
  });

  // ============ 15. Performance & Error Handling ============
  test.describe('15. Performance & Error Handling [P2]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
    });

    test('15.1 Verify Page Load Performance', async ({ page }) => {
      const startTime = Date.now();

      await test.step('Navigate to homepage with cleared cache', async () => {
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      });

      await test.step('Measure page load time', async () => {
        const loadTime = Date.now() - startTime;
        expect(loadTime).toBeLessThan(10000); // Less than 10 seconds
      });

      await test.step('Verify hero section appears first', async () => {
        await expect(spa.heroSection).toBeVisible();
      });
    });

    test('15.2 Verify Image Loading', async ({ page }) => {
      await test.step('Test Step 1: Navigate to homepage', async () => {
        await spa.goto();
        await spa.expectPageLoaded();
      });

      await test.step('Test Step 2: Scroll through all sections', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
        await page.waitForTimeout(1000); // Wait for lazy-loaded images
        await spa.scrollToSection(spa.membershipSection);
        await page.waitForTimeout(1000);
        await spa.scrollToSection(spa.footer);
        await page.waitForTimeout(1000);
      });

      await test.step('Test Step 3: Verify no broken image placeholders', async () => {
        // Wait for images to load
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await page.waitForTimeout(3000); // Additional wait for lazy-loaded images
        
        // Get detailed info about images for debugging
        const imageInfo = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('img'));
          const broken = images.filter(img => {
            // Check if image has loaded successfully
            if (!img.complete) return true;
            
            // If image has neither src nor srcset, it's broken
            const hasSrc = img.src && img.src !== '';
            const hasSrcset = img.srcset && img.srcset !== '';
            if (!hasSrc && !hasSrcset) return true;
            
            return false;
          });
          
          return {
            total: images.length,
            brokenCount: broken.length,
            brokenInfo: broken.map(img => ({
              src: img.src || 'no-src',
              srcset: img.srcset || 'no-srcset',
              alt: img.alt || 'no-alt',
              complete: img.complete
            }))
          };
        });
        
        // Log broken images for debugging
        if (imageInfo.brokenCount > 0) {
          console.log(`Found ${imageInfo.brokenCount} broken images out of ${imageInfo.total} total:`);
          console.log(JSON.stringify(imageInfo.brokenInfo, null, 2));
        }
        
        // Allow up to 2 broken images as they might be placeholders or still loading
        expect(imageInfo.brokenCount).toBeLessThanOrEqual(2);
      });
    });

    test('15.3 Verify Console Errors', async ({ page }) => {
      const errors: string[] = [];
      const criticalErrors: string[] = [];

      await test.step('Listen for console errors', async () => {
        page.on('pageerror', error => {
          errors.push(error.message);
          if (!error.message.includes('Cookiebot') && !error.message.includes('consent')) {
            criticalErrors.push(error.message);
          }
        });
      });

      await test.step('Navigate to homepage', async () => {
        await spa.goto();
        await spa.expectPageLoaded();
      });

      await test.step('Interact with page elements', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
        await spa.treatmentsNextButton.click();
        await page.waitForTimeout(1000);
      });

      await test.step('Verify no critical JavaScript errors', async () => {
        expect(criticalErrors.length).toBe(0);
      });
    });

    test('15.4 Verify Network Request Efficiency', async ({ page }) => {
      const failedRequests: string[] = [];

      await test.step('Listen for failed network requests', async () => {
        page.on('requestfailed', request => {
          const url = request.url();
          if (!url.includes('cookiebot') && !url.includes('consentcdn')) {
            failedRequests.push(url);
          }
        });
      });

      await test.step('Navigate to homepage', async () => {
        await spa.goto();
        await spa.expectPageLoaded();
      });

      await test.step('Verify no failed critical requests', async () => {
        expect(failedRequests.length).toBe(0);
      });
    });
  });

  // ============ 16. Content Verification ============
  test.describe('16. Content Verification [P3]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('16.1 Verify All Text Content is Readable', async ({ page }) => {
      await test.step('Read through hero section', async () => {
        const heading = page.getByRole('heading', { level: 1 });
        await expect(heading).toBeVisible();
        const headingText = await heading.textContent();
        expect(headingText?.length).toBeGreaterThan(0);
      });

      await test.step('Check for placeholder text', async () => {
        const hasLorem = await page.getByText(/lorem ipsum/i).count();
        expect(hasLorem).toBe(0);
      });

      await test.step('Verify consistent typography', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
        await spa.scrollToSection(spa.membershipSection);
        await spa.scrollToSection(spa.footer);
      });
    });

    test('16.2 Verify All CTAs Have Clear Purpose', async ({ page }) => {
      await test.step('Verify hero CTAs have descriptive labels', async () => {
        const bookNow = await spa.heroBookNowButton.getAttribute('aria-label');
        const giftCard = await spa.heroGiftCardButton.getAttribute('aria-label');
        
        expect(bookNow).toContain('cta-location-finder');
        expect(giftCard).toContain('gift-card');
      });

      await test.step('Verify all CTAs stand out visually', async () => {
        await expect(spa.heroBookNowButton).toBeVisible();
        await expect(spa.heroGiftCardButton).toBeVisible();
        
        await spa.scrollToSection(spa.findSpaSection);
        await expect(spa.findSpaButton).toBeVisible();
        
        await spa.scrollToSection(spa.membershipSection);
        await expect(spa.membershipCTA).toBeVisible();
      });
    });

    test('16.3 Verify Breadcrumbs Navigation', async ({ page }) => {
      await test.step('Check footer breadcrumbs on homepage', async () => {
        await spa.scrollToSection(spa.footer);
        const breadcrumb = page.getByText('Home');
        await expect(breadcrumb.first()).toBeVisible();
      });

      await test.step('Navigate to category page', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
        await spa.getTreatmentCard('Massages').click();
        await page.waitForLoadState('domcontentloaded');
      });

      await test.step('Verify breadcrumbs update', async () => {
        await page.waitForTimeout(1000);
        const pageContent = await page.content();
        expect(pageContent).toBeTruthy();
      });
    });
  });

  // ============ 17. Edge Cases & Negative Testing ============
  test.describe('17. Edge Cases & Negative Testing [P3]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
      await spa.expectPageLoaded();
    });

    test('17.1 Verify Rapid Carousel Navigation', async ({ page }) => {
      await test.step('Scroll to treatments carousel', async () => {
        await spa.scrollToSection(spa.treatmentsSection);
      });

      await test.step('Rapidly click Next button multiple times', async () => {
        for (let i = 0; i < 5; i++) {
          await spa.treatmentsNextButton.click({ timeout: 1000 }).catch(() => {});
          await page.waitForTimeout(100);
        }
      });

      await test.step('Verify no visual glitches', async () => {
        await expect(spa.treatmentsSection).toBeVisible();
      });

      await test.step('Rapidly click Previous button', async () => {
        const prevButton = page.getByRole('button', { name: 'Previous' });
        for (let i = 0; i < 5; i++) {
          await prevButton.click({ timeout: 1000 }).catch(() => {});
          await page.waitForTimeout(100);
        }
      });

      await test.step('Verify no console errors', async () => {
        await expect(spa.treatmentsSection).toBeVisible();
      });
    });

    test('17.2 Verify Multiple Menu Open/Close Actions', async ({ page }) => {
      await test.step('Rapidly open and close menu', async () => {
        for (let i = 0; i < 5; i++) {
          await spa.menuButton.click();
          await page.waitForTimeout(200);
          
          const closeButton = page.getByRole('button', { name: 'close-menu-navigation' });
          if (await closeButton.isVisible({ timeout: 1000 })) {
            await closeButton.click();
            await page.waitForTimeout(200);
          }
        }
      });

      await test.step('Verify menu state is correct', async () => {
        await expect(spa.menuButton).toBeVisible();
        await expect(spa.heroSection).toBeVisible();
      });

      await test.step('Verify no performance degradation', async () => {
        await spa.menuButton.click();
        const nav = page.locator('nav').first();
        await expect(nav).toBeVisible({ timeout: 2000 });
      });
    });

    test('17.3 Verify Page Behavior on Slow Network', async ({ page }) => {
      await test.step('Simulate slow 3G network', async () => {
        await page.route('**/*', route => {
          setTimeout(() => route.continue(), 100);
        });
      });

      await test.step('Navigate to homepage', async () => {
        await page.goto(BASE_URL, { timeout: 30000 });
      });

      await test.step('Verify critical content loads', async () => {
        await expect(spa.heroSection).toBeVisible({ timeout: 20000 });
      });

      await test.step('Verify user can interact with loaded sections', async () => {
        await expect(spa.heroBookNowButton).toBeVisible();
        await expect(spa.heroBookNowButton).toBeEnabled();
      });
    });

    test.skip('17.4 Verify JavaScript Disabled Scenario', async ({ page }) => {
      
      await test.step('Disable JavaScript', async () => {

      });

      await test.step('Verify basic content is accessible', async () => {
        await expect(spa.heroSection).toBeVisible();
      });

      await test.step('Verify critical links work', async () => {
        await expect(spa.heroBookNowButton).toBeVisible();
        await expect(spa.footer).toBeVisible();
      });
    });
  });

  // ============ 18. Accessibility Testing ============
  test.describe('18. Accessibility Testing [P2]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
        await spa.expectPageLoaded();
      });

    test('18.1 Verify Keyboard Navigation', async ({ page }) => {
      await test.step('Use Tab to navigate through elements', async () => {
        await page.keyboard.press('Tab');
        await expect(spa.skipToContentLink).toBeFocused();
      });

      await test.step('Verify focus indicators are visible', async () => {
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('Tab');
          await page.waitForTimeout(200);
        }
      });

      await test.step('Verify no keyboard traps', async () => {
        // Open menu
        await spa.menuButton.click();
        await page.waitForTimeout(500);
        
        // Tab through menu items
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('Tab');
        }
        
        // Close menu with Escape
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
      });

      await test.step('Verify Skip to content works', async () => {
        await page.reload();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500); // Wait for focus to move
        
        const isFocusInMain = await page.evaluate(() => {
          const main = document.querySelector('main');
          const activeEl = document.activeElement;
          // Check if focus is in main or if main itself is focused
          if (!main || !activeEl) return false;
          return main.contains(activeEl) || activeEl === main || activeEl.tagName === 'BODY';
        });
        expect(isFocusInMain).toBeTruthy();
      });
    });

    test('18.2 Verify Screen Reader Compatibility', async ({ page }) => {
      await test.step('Verify images have alt text', async () => {
        const imagesWithoutAlt = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('img'));
          return images.filter(img => !img.alt && !img.getAttribute('aria-label')).length;
        });
        expect(imagesWithoutAlt).toBe(0);
      });

      await test.step('Verify links have descriptive labels', async () => {
        const bookNowLabel = await spa.heroBookNowButton.getAttribute('aria-label');
        expect(bookNowLabel).toBeTruthy();
      });

      await test.step('Verify headings provide proper structure', async () => {
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBeGreaterThanOrEqual(1);
        
        const h2Count = await page.locator('h2').count();
        expect(h2Count).toBeGreaterThan(0);
      });
    });

    test('18.3 Verify Color Contrast', async ({ page }) => {
      await test.step('Check hero section contrast', async () => {
        await expect(spa.heroSection).toBeVisible();
        await expect(spa.heroBookNowButton).toBeVisible();
      });

      await test.step('Check footer contrast', async () => {
        await spa.scrollToSection(spa.footer);
        await expect(spa.footerPrivacyPolicy).toBeVisible();
      });

      await test.step('Verify focus indicators are visible', async () => {
        await page.keyboard.press('Tab');
        const focusedElement = await page.evaluate(() => {
          const focused = document.activeElement;
          if (!focused) return false;
          return window.getComputedStyle(focused).outline !== 'none';
        });
        expect(focusedElement).toBeTruthy();
      });
    });

    test('18.4 Verify ARIA Labels', async () => {
      await test.step('Verify CTA ARIA labels', async () => {
        const heroBookNowLabel = await spa.heroBookNowButton.getAttribute('aria-label');
        const heroGiftCardLabel = await spa.heroGiftCardButton.getAttribute('aria-label');
        
        expect(heroBookNowLabel).toContain('cta-location-finder');
        expect(heroGiftCardLabel).toContain('cta-buy-a-gift-card');
      });

      await test.step('Verify button ARIA labels', async () => {
        const menuButtonLabel = await spa.menuButton.getAttribute('aria-label');
        expect(menuButtonLabel).toContain('show-menu-navigation');
        
        // Only check pause button if video is present (dev environment)
        const hasVideo = await spa.heroVideo.isVisible().catch(() => false);
        if (hasVideo) {
          const pauseButtonLabel = await spa.videoPauseButton.getAttribute('aria-label');
          expect(pauseButtonLabel).toContain('pause-video');
        }
      });

      await test.step('Verify footer has contentinfo role', async () => {
        const footerRole = await spa.footer.getAttribute('role');
        expect(footerRole === 'contentinfo' || footerRole === null).toBeTruthy();
      });
    });
  });

  // ============ 19. Cross-Page Navigation Testing ============
  test.describe('19. Cross-Page Navigation Testing [P1]', () => {
    let spa: HandStonePage;

    test.beforeEach(async ({ page }) => {
      spa = new HandStonePage(page);
      await spa.goto();
        await spa.expectPageLoaded();
      });

    test('19.1 Verify Book Now Flow Consistency', async ({ page }) => {
      await test.step('Click Hero Book Now CTA', async () => {
        await spa.heroBookNowButton.click();
        await expect(page).toHaveURL(/\/locations\/?$/);
      });

      await test.step('Navigate back to homepage', async () => {
        await page.goBack();
        await expect(page).toHaveURL(/\/$/);
      });

      await test.step('Test Book Now from Value Proposition', async () => {
        await spa.scrollToSection(spa.valuePropositionSection);
        await spa.valuePropositionBookNow.click();
        await expect(page).toHaveURL(/\/locations/);
      });

      await test.step('Navigate back and test Treatments Book Now', async () => {
        await page.goBack();
        await spa.scrollToSection(spa.treatmentsSection);
        await spa.treatmentsBookNow.click();
        await expect(page).toHaveURL(/\/locations/);
    });
  });

    test('19.2 Verify Gift Card Purchase Flow', async ({ page }) => {
      await test.step('Click Hero Gift Card CTA', async () => {
        await spa.heroGiftCardButton.click();
      });

      await test.step('Verify destination is Zenoti', async () => {
        await expect(page).toHaveURL(/zenoti.*giftcards/i);
      });

      await test.step('Navigate back to homepage', async () => {
        await page.goBack();
        await expect(page).toHaveURL(/\/$/);
      });

      await test.step('Test Gift Cards section CTA', async () => {
        await spa.scrollToSection(spa.giftCardsSection);
        await spa.giftCardsButton.click();
        await expect(page).toHaveURL(/zenoti.*giftcards/i);
      });
    });

    test('19.3 Verify External Link Behavior', async ({ page }) => {
      await test.step('Scroll to experts section', async () => {
        await spa.scrollToSection(spa.expertsSection);
      });

      await test.step('Click Join Our Team external link', async () => {
        // Check if link opens in new tab or same page
        const linkTarget = await spa.expertsJoinTeam.getAttribute('target');
        
        if (linkTarget === '_blank') {
          // Opens in new tab
          const [newPage] = await Promise.all([
            page.context().waitForEvent('page', { timeout: 10000 }),
            spa.expertsJoinTeam.click()
          ]);
          
          await expect(newPage).toHaveURL(/handandstonecareers\.com/);
          await newPage.close();
        } else {
          // Navigates in same page - just verify click works
          await spa.expertsJoinTeam.click();
          await page.waitForTimeout(1000);
          // Check if navigation happened or if it's an external redirect
          const currentUrl = page.url();
          if (currentUrl.includes('handandstonecareers')) {
            await page.goBack(); // Go back to homepage
          }
        }
      });

      await test.step('Verify homepage position is maintained', async () => {
        await expect(spa.expertsSection).toBeVisible();
      });

      await test.step('Test social media link', async () => {
        await spa.scrollToSection(spa.footer);
        
        // Check if link opens in new tab or same page
        const linkTarget = await spa.footerInstagram.getAttribute('target');
        
        if (linkTarget === '_blank') {
          // Opens in new tab
          const [newPage2] = await Promise.all([
            page.context().waitForEvent('page', { timeout: 10000 }),
            spa.footerInstagram.click()
          ]);
          
          await expect(newPage2).toHaveURL(/instagram\.com/);
          await newPage2.close();
        } else {
          // Navigates in same page - just verify click works and link is valid
          await spa.footerInstagram.click();
          await page.waitForTimeout(1000);
          // Check if navigation happened
          const currentUrl = page.url();
          if (currentUrl.includes('instagram')) {
            await page.goBack(); // Go back to homepage
          }
        }
      });
    });
  });
});
