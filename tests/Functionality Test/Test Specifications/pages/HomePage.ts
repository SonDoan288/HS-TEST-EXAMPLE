import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Hand & Stone Homepage
 * @page /
 * @description Semantic, maintainable POM following Playwright best practices
 */
export class HandStonePage {
  readonly page: Page;

  // ============ Configuration ============
  private readonly CONFIG = {
    URLS: {
      HOME: '/',
      LOCATIONS: /\/locations\/?$/,
      GIFT_CARDS: 'https://handandstonestg.zenotistage.com/webstoreNew/giftcards/6b9f45c8-50a4-4622-9bc5-5b152137fd72',
      MEMBERSHIPS: /\/memberships?\/?$/,
      OUR_STORY: /\/our-story\/?$/,
      CAREERS: /\/careers|join-team\/?$/,
      FRANCHISE: /\/franchise\/?$/,
    },
    TIMEOUTS: {
      PAGE_LOAD: 15000,
      ELEMENT_VISIBLE: 5000,
      NAVIGATION: 30000,
    }
  } as const;

  constructor(page: Page) {
    this.page = page;
  }

  // ============ Header & Navigation ============
  get header(): Locator { 
    // Use the first top-level header element (site header), not inner section headers
    return this.page.locator('header').first(); 
  }

  get headerBookButton(): Locator { 
    return this.header.getByRole('link', { name: /book|cta-book-now|cta-location-finder/i }); 
  }

  get menuButton(): Locator { 
    return this.page.getByRole('button', { name: 'show-menu-navigation' }); 
  }

  get skipToContentLink(): Locator { 
    return this.page.getByRole('link', { name: 'Skip to content' }); 
  }

  // ============ Hero Section ============
  get heroSection(): Locator { 
    return this.page.getByTestId('serviceHero'); 
  }

  get heroVideo(): Locator { 
    return this.page.getByTestId('react-player'); 
  }

  get videoPauseButton(): Locator { 
    return this.page.getByRole('button', { name: 'pause-video' }); 
  }

  get heroBookNowButton(): Locator { 
    return this.heroSection.getByRole('link', { name: /book|cta-book-now|cta-location-finder/i }).first(); 
  }

  get heroGiftCardButton(): Locator { 
    return this.heroSection.getByRole('link', { name: /gift.*card|cta-buy-a-gift-card/i }); 
  }

  // ============ Value Proposition Section ============
  get valuePropositionSection(): Locator { 
    return this.page.getByTestId('valuePropositionSection'); 
  }

  get valuePropositionBookNow(): Locator { 
    return this.valuePropositionSection.getByRole('link', { name: /book|cta-book-now|cta-location-finder/i }); 
  }

  get valuePropositionJoinToday(): Locator { 
    return this.valuePropositionSection.getByRole('link', { name: /join.*today|cta-join-today|membership/i }); 
  }

  // ============ Treatments Carousel (Introductory Offers) ============
  get treatmentsSection(): Locator { 
    return this.page.getByTestId('globalSpaIntroductoryOffers'); 
  }

  get treatmentCards(): Locator { 
    return this.page.getByTestId('carousel-card-full-size'); 
  }

  get treatmentCardCTA(): Locator { 
    return this.page.getByTestId('card-cta'); 
  }

  get treatmentsNextButton(): Locator { 
    return this.treatmentsSection.getByTestId('offers-carousel-next-button'); 
  }

  get treatmentsBookNow(): Locator { 
    return this.treatmentsSection.getByRole('link', { name: /book|cta-book-now|cta-location-finder/i }); 
  }

  // Specific treatment cards
  getTreatmentCard(name: 'Massages' | 'Facials' | 'Toning' | 'Injectables' | 'Hair Removal'): Locator {
    return this.page.getByRole('button', { name: `View details for ${name}` });
  }

  // ============ Find a Spa Section ============
  get findSpaSection(): Locator {
    return this.page
      .getByTestId('globalCareers')
      .filter({ hasText: /600\+ Locations Nationwide|Find a location near you/i });
  }

  get findSpaButton(): Locator { 
    return this.page.getByRole('link', { name: 'cta-find-spa' }); 
  }

  // ============ Membership Section (50/50 Carousel) ============
  get membershipSection(): Locator { 
    return this.page.getByTestId('serviceFeatureCarousel'); 
  }

  get membershipImage(): Locator { 
    return this.page.getByTestId('fifty-fifty-hero-image'); 
  }

  get membershipContent(): Locator { 
    return this.page.getByTestId('fifty-fifty-content-container'); 
  }

  get membershipCTA(): Locator { 
    return this.page.getByRole('link', { name: 'cta-membership' }); 
  }

  // Membership benefits
  get monthlySelfCareBenefit(): Locator { 
    return this.page.getByTestId('Monthly self-care'); 
  }

  get memberSavingsBenefit(): Locator { 
    return this.page.getByTestId('Member-only savings'); 
  }

  get loyaltyBenefit(): Locator { 
    return this.page.getByTestId('Loyalty that pays off'); 
  }

  // ============ Gift Cards Section ============
  get giftCardsSection(): Locator {
    return this.page
      .getByTestId('globalCareers')
      .filter({ hasText: /Gift Cards|Give the gift of/i });
  }

  get giftCardsButton(): Locator { 
    return this.giftCardsSection.getByRole('link', { name: 'cta-buy-a-gift-card' }); 
  }

  // ============ Onboarding Cards Section ============
  get onboardingSection(): Locator { 
    return this.page.getByTestId('onboardingCardsSection'); 
  }

  get findSpaCard(): Locator { 
    return this.page.getByRole('button', { name: 'Find a Spa button' }); 
  }

  get meetProvidersCard(): Locator { 
    return this.page.getByRole('button', { name: 'Meet Our Providers button' }); 
  }

  get becomeMemberCard(): Locator { 
    return this.page.getByRole('button', { name: 'Become a Member button' }); 
  }

  // ============ Experts Section ============
  get expertsSection(): Locator {
    return this.page
      .getByTestId('globalCareers')
      .filter({ hasText: /Meet Our Experts|Licensed\. Trusted\. Exceptional\./i });
  }

  get expertsLearnMore(): Locator { 
    return this.expertsSection.getByRole('link', { name: 'cta-learn-more' }); 
  }

  get expertsJoinTeam(): Locator { 
    return this.expertsSection.getByRole('link', { name: 'cta-join-our-team' }); 
  }

  // ============ Franchise Section ============
  get franchiseSection(): Locator {
    // Historically this was a dedicated franchise marketing section.
    // In the current UI, \"Franchise\" is surfaced via footer links.
    // For visual tests, we treat the footer \"Franchise\" column as the franchise section.
    const footerFranchiseLink = this.footer.getByRole('link', { name: /Franchise/i }).first();
    // Use the immediate div ancestor of the footer franchise link as the section container.
    return footerFranchiseLink.locator('xpath=ancestor::div[1]');
  }

  get franchiseBackgroundImage(): Locator { 
    return this.page.getByTestId('cta-desktop-background-image'); 
  }

  get franchiseLearnMore(): Locator { 
    return this.page.getByRole('link', { name: 'Learn More' }); 
  }

  // ============ Footer ============
  get footer(): Locator { 
    return this.page.locator('footer'); 
  }

  // Footer navigation links
  get footerOurStory(): Locator { 
    return this.page.getByRole('link', { name: 'Our Story' }); 
  }

  get footerLocations(): Locator { 
    return this.page.getByRole('link', { name: 'Locations' }); 
  }

  get footerFranchise(): Locator { 
    return this.page.getByRole('link', { name: 'Own A Franchise' }); 
  }

  get footerCareers(): Locator { 
    return this.page.getByRole('link', { name: 'Join the Team' }); 
  }

  get footerContact(): Locator { 
    return this.page.getByRole('link', { name: 'Contact Us' }); 
  }

  // Footer service links
  get footerMassages(): Locator { 
    return this.page.getByRole('link', { name: 'Massages' }); 
  }

  get footerFacials(): Locator { 
    return this.page.getByRole('link', { name: 'Facials' }); 
  }

  get footerToning(): Locator { 
    return this.page.getByRole('link', { name: 'Toning' }); 
  }

  get footerInjectables(): Locator { 
    return this.page.getByRole('link', { name: 'Injectables' }); 
  }

  get footerHairRemoval(): Locator { 
    return this.page.getByRole('link', { name: 'Hair Removal' }); 
  }

  get footerMemberships(): Locator { 
    return this.page.getByRole('link', { name: 'Explore Memberships' }); 
  }

  // Footer legal & policy links
  get footerPrivacyPolicy(): Locator { 
    return this.page.getByRole('link', { name: 'Privacy Policy' }); 
  }

  get footerCookiePolicy(): Locator { 
    return this.page.getByRole('link', { name: 'Cookie Policy' }); 
  }

  get footerConsentPreferences(): Locator { 
    return this.page.getByRole('link', { name: 'Open Consent Preferences Modal' }); 
  }

  get footerCustomerBillOfRights(): Locator { 
    return this.page.getByRole('link', { name: 'Customer Bill of Rights' }); 
  }

  get footerGiftCardTerms(): Locator { 
    return this.page.getByRole('link', { name: 'Gift Card Program Terms & Conditions' }); 
  }

  get footerCaliforniaResidents(): Locator { 
    return this.page.getByRole('link', { name: 'California Residents' }); 
  }

  get footerTermsConditions(): Locator { 
    return this.page.getByRole('link', { name: 'Rules, Terms & Conditions' }); 
  }

  get footerNonDiscrimination(): Locator { 
    return this.page.getByRole('link', { name: 'Policy on Non Discrimination & Gender Identity' }); 
  }

  // Footer social media
  get footerInstagram(): Locator { 
    return this.page.getByRole('link', { name: 'Social - Instagram' }); 
  }

  get footerFacebook(): Locator { 
    return this.page.getByRole('link', { name: 'Social - Facebook' }); 
  }

  get footerTwitter(): Locator { 
    return this.page.getByRole('link', { name: 'Social - X' }); 
  }

  get footerLinkedIn(): Locator { 
    return this.page.getByRole('link', { name: 'Social - LinkedIn' }); 
  }

  get footerYouTube(): Locator { 
    return this.page.getByRole('link', { name: 'Social - YouTube' }); 
  }

  get footerTikTok(): Locator { 
    return this.page.getByRole('link', { name: 'Social - Tiktok' }); 
  }

  // ============ Navigation Actions ============

  /**
   * Navigate to the homepage
   * @param baseUrl - Optional base URL override (defaults to env variable)
   * Dev: https://custom-booking-app-development-hand-and-stone.vercel.app/
   * Staging: https://custombookingapp-env-staging-hand-and-stone.vercel.app/
   */
  async goto(baseUrl?: string): Promise<void> {
    const url = baseUrl || process.env.BASE_URL || 'https://custom-booking-app-development-hand-and-stone.vercel.app/';
    // Staging URL: 'https://custombooking-app-env-staging-hand-and-stone.vercel.app/'
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.heroSection.waitFor({ 
      state: 'visible', 
      timeout: this.CONFIG.TIMEOUTS.PAGE_LOAD 
    });
  }

  /**
   * Open the mobile navigation menu
   */
  async openNavigationMenu(): Promise<void> {
    await this.menuButton.click();
    // Add wait for menu to open if needed
    // await this.page.waitForSelector('[data-testid="navigation-menu"]', { state: 'visible' });
  }

  /**
   * Click Book Now button in hero section and wait for navigation
   */
  async clickHeroBookNow(): Promise<void> {
    await this.heroBookNowButton.click();
    await this.page.waitForURL(this.CONFIG.URLS.LOCATIONS, { 
      timeout: this.CONFIG.TIMEOUTS.NAVIGATION 
    });
  }

  /**
   * Click Gift Card button in hero section and wait for navigation
   */
  async clickHeroGiftCard(): Promise<void> {
    await this.heroGiftCardButton.click();
    await this.page.waitForURL(this.CONFIG.URLS.GIFT_CARDS, { 
      timeout: this.CONFIG.TIMEOUTS.NAVIGATION 
    });
  }

  /**
   * Navigate through treatments carousel
   * @param times - Number of times to click next
   */
  async navigateTreatmentsCarousel(times: number = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.treatmentsNextButton.click();
      await this.page.waitForTimeout(500); // Wait for animation
    }
  }

  /**
   * Click on a specific treatment card
   */
  async clickTreatmentCard(treatment: 'Massages' | 'Facials' | 'Toning' | 'Injectables' | 'Hair Removal'): Promise<void> {
    await this.getTreatmentCard(treatment).click();
  }

  /**
   * Scroll to a specific section with retry logic for dynamic content
   */
  async scrollToSection(section: Locator): Promise<void> {
    // Retry logic to handle dynamic DOM re-renders
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        // Wait for element to be visible and stable
        await section.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(300); // Wait for any animations to complete
        
        // Try to scroll - this may fail if element detaches
        await section.scrollIntoViewIfNeeded();
        
        // If successful, break out of loop
        return;
      } catch (error) {
        attempts++;
        if (attempts >= maxAttempts) {
          // On final attempt, try using JavaScript scrollIntoView as fallback
          try {
            await section.evaluate((el) => {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
            await this.page.waitForTimeout(500);
            return;
          } catch (fallbackError) {
            throw new Error(`Failed to scroll to section after ${maxAttempts} attempts: ${error}`);
          }
        }
        // Wait before retrying
        await this.page.waitForTimeout(500);
      }
    }
  }

  // ============ Assertions ============

  /**
   * Verify page has loaded successfully
   */
  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/$/);
    await expect(this.heroSection).toBeVisible({ 
      timeout: this.CONFIG.TIMEOUTS.NAVIGATION 
    });
  }

  /**
   * High-level smoke test - verify all critical sections are visible
   */
  async expectHomepageSmoke(): Promise<void> {
    const criticalSections = [
      this.heroSection,
      this.valuePropositionSection,
      this.treatmentsSection,
      this.findSpaSection,
      this.membershipSection,
      this.giftCardsSection,
      this.onboardingSection,
      this.expertsSection,
      this.franchiseSection,
      this.footer
    ];

    for (const section of criticalSections) {
      await expect(section).toBeVisible();
    }
  }

  /**
   * Verify hero section is fully functional
   */
  async expectHeroSectionComplete(): Promise<void> {
    await expect(this.heroSection).toBeVisible();
    await expect(this.heroBookNowButton).toBeVisible();
    await expect(this.heroGiftCardButton).toBeVisible();
    await expect(this.heroVideo).toBeVisible();
  }

  /**
   * Verify treatments carousel is functional
   */
  async expectTreatmentsCarouselWorking(): Promise<void> {
    await expect(this.treatmentsSection).toBeVisible();
    await expect(this.treatmentCards.first()).toBeVisible();
    await expect(this.treatmentsNextButton).toBeVisible();
    await expect(this.treatmentsNextButton).toBeEnabled();
  }

  /**
   * Verify membership section displays all benefits
   */
  async expectMembershipBenefitsVisible(): Promise<void> {
    await expect(this.membershipSection).toBeVisible();
    await expect(this.monthlySelfCareBenefit).toBeVisible();
    await expect(this.memberSavingsBenefit).toBeVisible();
    await expect(this.loyaltyBenefit).toBeVisible();
    await expect(this.membershipCTA).toBeVisible();
  }

  /**
   * Verify onboarding cards are all visible
   */
  async expectOnboardingCardsVisible(): Promise<void> {
    await expect(this.onboardingSection).toBeVisible();
    await expect(this.findSpaCard).toBeVisible();
    await expect(this.meetProvidersCard).toBeVisible();
    await expect(this.becomeMemberCard).toBeVisible();
  }

  /**
   * Verify footer essential links are present
   */
  async expectFooterLinksVisible(): Promise<void> {
    await expect(this.footer).toBeVisible();
    
    const essentialLinks = [
      this.footerPrivacyPolicy,
      this.footerCookiePolicy,
      this.footerConsentPreferences,
      this.footerCustomerBillOfRights,
      this.footerGiftCardTerms,
      this.footerCaliforniaResidents,
      this.footerTermsConditions,
      this.footerNonDiscrimination
    ];

    for (const link of essentialLinks) {
      await expect(link).toBeVisible();
    }
  }

  /**
   * Verify footer navigation links
   */
  async expectFooterNavigationVisible(): Promise<void> {
    const navLinks = [
      this.footerOurStory,
      this.footerLocations,
      this.footerFranchise,
      this.footerCareers,
      this.footerContact
    ];

    for (const link of navLinks) {
      await expect(link).toBeVisible();
    }
  }

  /**
   * Verify footer service links
   */
  async expectFooterServicesVisible(): Promise<void> {
    const serviceLinks = [
      this.footerMassages,
      this.footerFacials,
      this.footerToning,
      this.footerInjectables,
      this.footerHairRemoval,
      this.footerMemberships
    ];

    for (const link of serviceLinks) {
      await expect(link).toBeVisible();
    }
  }

  /**
   * Verify social media links in footer
   */
  async expectFooterSocialMediaVisible(): Promise<void> {
    const socialLinks = [
      this.footerInstagram,
      this.footerFacebook,
      this.footerTwitter,
      this.footerLinkedIn,
      this.footerYouTube,
      this.footerTikTok
    ];

    for (const link of socialLinks) {
      await expect(link).toBeVisible();
    }
  }

  /**
   * Verify a specific element is visible with optional custom timeout
   */
  async expectVisible(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeVisible({ 
      timeout: timeout || this.CONFIG.TIMEOUTS.ELEMENT_VISIBLE 
    });
  }

  /**
   * Verify a specific element is enabled
   */
  async expectEnabled(locator: Locator): Promise<void> {
    await expect(locator).toBeEnabled();
  }

  // ============ Utility Methods ============

  /**
   * Check if an element is visible (returns boolean)
   */
  async isVisible(locator: Locator, timeout?: number): Promise<boolean> {
    try {
      await locator.waitFor({ 
        state: 'visible', 
        timeout: timeout || this.CONFIG.TIMEOUTS.ELEMENT_VISIBLE 
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ 
      state: 'visible', 
      timeout: timeout || this.CONFIG.TIMEOUTS.ELEMENT_VISIBLE 
    });
  }

  /**
   * Get count of elements matching a locator
   */
  async getElementCount(locator: Locator): Promise<number> {
    return await locator.count();
  }

  /**
   * Take screenshot of specific section
   */
  async screenshotSection(locator: Locator, filename: string): Promise<void> {
    await locator.screenshot({ path: filename });
  }
}