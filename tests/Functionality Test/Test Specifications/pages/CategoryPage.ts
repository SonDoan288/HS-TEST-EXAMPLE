import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Category Page
 * @description POM for category-specific pages (Massages, Facials, Toning, etc.)
 */
export class CategoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ============ Navigation ============
  
  async goto(url?: string): Promise<void> {
    const targetUrl = url || 'https://custom-booking-app-release-hand-and-stone.vercel.app/category-page-dummy/';
    await this.page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  }

  async scrollToSection(section: Locator, options?: { timeout?: number }): Promise<void> {
    const timeout = options?.timeout ?? 10000;
    
    try {
      await section.waitFor({ state: 'visible', timeout });
      await section.scrollIntoViewIfNeeded({ timeout: 5000 });
      // Wait for scroll animations to complete
      await this.page.waitForLoadState('networkidle', { timeout: 3000 }).catch(() => {});
    } catch (error) {
      // Fallback: force scroll via evaluate
      await section.evaluate((el) => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      await this.page.waitForTimeout(300);
    }
  }

  async scrollToElement(element: Locator): Promise<void> {
    await this.scrollToSection(element);
  }

  async waitForNavigation(pattern: RegExp, timeout = 15000): Promise<void> {
    await this.page.waitForURL(pattern, { timeout });
  }

  async clickAndWaitForNavigation(element: Locator, pattern: RegExp, options?: { timeout?: number }): Promise<void> {
    const timeout = options?.timeout ?? 15000;
    await Promise.all([
      this.page.waitForURL(pattern, { timeout }),
      element.click()
    ]);
  }

  // ============ Hero Section ============
  
  get heroSection(): Locator {
    return this.page.getByTestId('serviceHero');
  }

  get heroHeading(): Locator {
    return this.heroSection.locator('h1, h2').first();
  }

  get heroDuration(): Locator {
    return this.heroSection.locator('span, p').filter({ hasText: /\d+\s*min/i }).first();
  }

  get heroKeyBenefits(): Locator {
    return this.heroSection.locator('ul li, [class*="benefit"]');
  }

  get heroDescription(): Locator {
    return this.heroSection.locator('p').filter({ hasText: /.{10,}/ }).first();
  }

  get heroBookServiceButton(): Locator {
    return this.heroSection.getByRole('link', { name: /Book Now|cta-location-finder/i });
  }

  get heroAvailabilityTag(): Locator {
    return this.heroSection.locator('[class*="tag"], [class*="badge"]');
  }

  // ============ Header Navigation (Desktop) ============
  
  get header(): Locator {
    return this.page.locator('header, [role="banner"]').first();
  }

  get headerLogo(): Locator {
    return this.header.getByRole('link', { name: /logo|home/i });
  }

  get servicesButton(): Locator {
    return this.header.getByRole('button', { name: /services/i }).or(
      this.header.getByRole('link', { name: /services/i })
    );
  }

  get membershipButton(): Locator {
    return this.header.getByRole('button', { name: /membership/i }).or(
      this.header.getByRole('link', { name: /membership/i })
    );
  }

  get giftCardsButton(): Locator {
    return this.header.getByRole('button', { name: /gift card/i }).or(
      this.header.getByRole('link', { name: /gift card/i })
    );
  }

  get locationsLink(): Locator {
    return this.header.getByRole('link', { name: /locations/i });
  }

  get franchiseLink(): Locator {
    return this.header.getByRole('link', { name: /franchise/i });
  }

  get accountLink(): Locator {
    return this.header.getByRole('link', { name: /account/i });
  }

  get headerBookButton(): Locator {
    return this.header.getByRole('link', { name: /book|cta-location-finder/i });
  }

  // ============ Category Details Section ============
  
  get detailsSection(): Locator {
    return this.page.getByTestId('serviceDetailSection');
  }

  get detailsLabel(): Locator {
    return this.detailsSection.locator('[class*="label"], [class*="tag"]').first();
  }

  get detailsHeading(): Locator {
    return this.detailsSection.locator('h2, h3').first();
  }

  get detailsDescription(): Locator {
    return this.detailsSection.locator('p').first();
  }

  get detailsBenefitsList(): Locator {
    return this.detailsSection.locator('ul li, [class*="benefit"]');
  }

  get detailsBookTodayLink(): Locator {
    return this.detailsSection.getByRole('link', { name: /book|cta-location-finder/i }).first();
  }

  get detailsVideo(): Locator {
    return this.detailsSection.locator('video, [class*="video"]');
  }

  get detailsPauseButton(): Locator {
    return this.detailsSection.getByRole('button', { name: /pause/i });
  }

  // ============ Intro Offer Banner ============
  
  get introOfferBanner(): Locator {
    // Find section by its heading content instead of missing/incorrect test ID
    return this.page.locator('generic, section, div').filter({ 
      has: this.page.getByRole('heading', { name: /first glow|your first/i }) 
    }).first();
  }

  get introOfferImage(): Locator {
    return this.introOfferBanner.locator('img').first();
  }

  get introOfferLabel(): Locator {
    return this.introOfferBanner.getByText(/intro.*offer/i).first();
  }

  get introOfferHeading(): Locator {
    return this.introOfferBanner.locator('h2, h3').first();
  }

  get introOfferDescription(): Locator {
    return this.introOfferBanner.locator('p').filter({ hasText: /experience|treatment|exclusive/i }).first();
  }

  get introOfferBookServiceLink(): Locator {
    return this.introOfferBanner.getByRole('link', { name: /book|cta/i });
  }

  // ============ Service Cards Section ============
  
  get serviceCardsSection(): Locator {
    // Find section by its heading content instead of potentially missing/incorrect test ID
    return this.page.locator('generic, section, div').filter({ 
      has: this.page.getByRole('heading', { name: /find your signature|skincare treatment/i }) 
    }).first();
  }

  get serviceCardsLabel(): Locator {
    return this.serviceCardsSection.locator('p').filter({ hasText: /skincare|treatment/i }).first();
  }

  get serviceCardsHeading(): Locator {
    return this.serviceCardsSection.locator('h2, h3').first();
  }

  get serviceCards(): Locator {
    return this.serviceCardsSection.locator('article');
  }

  async getServiceCard(index: number): Promise<Locator> {
    const cards = this.serviceCards;
    await cards.nth(index).waitFor({ state: 'visible', timeout: 5000 });
    return cards.nth(index);
  }

  async getServiceCardByTitle(title: string): Promise<Locator> {
    return this.serviceCards.filter({ has: this.page.locator(`text="${title}"`) }).first();
  }

  get serviceCardImages(): Locator {
    return this.serviceCards.locator('img');
  }

  get serviceCardHeadings(): Locator {
    return this.serviceCards.locator('h3, h4');
  }

  get serviceCardLearnMoreLinks(): Locator {
    return this.serviceCards.getByRole('link', { name: /learn more/i });
  }

  get serviceCardBookServiceLinks(): Locator {
    return this.serviceCards.getByRole('link', { name: /Book|cta-location-finder/i });
  }

  get advancedServicesHeading(): Locator {
    return this.page.locator('h2, h3').filter({ hasText: /advanced/i });
  }

  // ============ Membership Banner ============
  
  get membershipBanner(): Locator {
    // return this.page.locator('[class*="membership"]').first();
    return this.page.locator('generic, section, div').filter({ 
      has: this.page.getByRole('heading', { name: /make it a ritual|membership/i }) 
    }).first();
  }

  get membershipBannerHeading(): Locator {
    return this.membershipBanner.locator('h2, h3').first();
  }

  get membershipBannerDescription(): Locator {
    return this.membershipBanner.locator('p').first();
  }

  get membershipBannerLink(): Locator {
    return this.membershipBanner.getByRole('link', { name: /member|cta-membership/i });
  }

  get membershipBannerImage(): Locator {
    return this.membershipBanner.locator('img').first();
  }

  // ============ Service Carousel ============
  
  get serviceCarouselSection(): Locator {
    // Find the parent section by its heading content, not just the carousel element
    return this.page.locator('generic, section, div').filter({ 
      has: this.page.getByRole('heading', { name: /treatments that restore/i }) 
    }).first();
  }

  get serviceCarouselLabel(): Locator {
    return this.serviceCarouselSection.locator('p').filter({ hasText: /service/i }).first();
  }

  get serviceCarouselHeading(): Locator {
    return this.serviceCarouselSection.locator('h2, h3').first();
  }

  get serviceCarouselDescription(): Locator {
    return this.serviceCarouselSection.locator('p').first();
  }

  get serviceCarouselCards(): Locator {
    // Carousel cards are buttons within the carousel region
    return this.serviceCarouselSection.getByRole('region', { name: /carousel/i }).getByRole('button', { name: /view details/i });
  }

  get serviceCarouselNextButton(): Locator {
    return this.serviceCarouselSection.getByRole('button', { name: /next/i });
  }

  get serviceCarouselPreviousButton(): Locator {
    return this.serviceCarouselSection.getByRole('button', { name: /previous|prev/i });
  }

  get serviceCarouselDisclaimer(): Locator {
    return this.serviceCarouselSection.locator('[class*="disclaimer"], small').first();
  }

  // ============ Footer ============
  
  get footer(): Locator {
    return this.page.locator('footer, [role="contentinfo"]');
  }

  get footerBreadcrumbs(): Locator {
    return this.footer.locator('[class*="breadcrumb"]').or(
      this.footer.locator('nav').first()
    );
  }

  get footerLogo(): Locator {
    return this.footer.locator('img[alt*="logo"], [class*="logo"]').first();
  }

  get footerCopyright(): Locator {
    return this.footer.locator('[class*="copyright"]').or(
      this.footer.getByText(/©|copyright|2025/i)
    );
  }

  get footerDisclaimers(): Locator {
    // Disclaimers are paragraphs with asterisk-prefixed text or long legal text
    return this.footer.locator('p').filter({ hasText: /^\*|Independently Owned|Introductory offers/i });
  }

  // Footer Sections
  get footerAboutUsSection(): Locator {
    // Target the paragraph heading in desktop view (last one, as mobile is rendered first)
    return this.footer.getByText('About Us', { exact: true }).last();
  }

  get footerServicesSection(): Locator {
    return this.footer.getByText('SERVICES', { exact: true }).last();
  }

  get footerMembershipSection(): Locator {
    return this.footer.getByText('MEMBERSHIP', { exact: true }).last();
  }

  get footerTermsSection(): Locator {
    return this.footer.getByText('TERMS & CONDITIONS', { exact: true }).last();
  }

  // Footer Links - About Us
  get footerOurStoryLink(): Locator {
    return this.footer.getByRole('link', { name: /our story/i });
  }

  get footerLocationsLink(): Locator {
    return this.footer.getByRole('link', { name: /locations/i });
  }

  get footerFranchiseLink(): Locator {
    return this.footer.getByRole('link', { name: /franchise/i });
  }

  // Footer Links - Services
  get footerMassagesLink(): Locator {
    return this.footer.getByRole('link', { name: /^massages$/i });
  }

  get footerFacialsLink(): Locator {
    return this.footer.getByRole('link', { name: /^facials$/i });
  }

  get footerToningLink(): Locator {
    return this.footer.getByRole('link', { name: /toning/i });
  }

  get footerInjectablesLink(): Locator {
    return this.footer.getByRole('link', { name: /injectables/i });
  }

  get footerHairRemovalLink(): Locator {
    return this.footer.getByRole('link', { name: /hair removal/i });
  }

  // Footer Links - Membership
  get footerExploreMembershipsLink(): Locator {
    return this.footer.getByRole('link', { name: /explore membership/i });
  }

  get footerRewardPointsLink(): Locator {
    return this.footer.getByRole('link', { name: /reward.*point/i });
  }

  // Footer Links - Terms & Conditions
  get footerCustomerBillLink(): Locator {
    return this.footer.getByRole('link', { name: /customer bill/i });
  }

  get footerGiftCardTermsLink(): Locator {
    return this.footer.getByRole('link', { name: /gift card.*term/i });
  }

  get footerCaliforniaLink(): Locator {
    return this.footer.getByRole('link', { name: /california/i });
  }

  get footerRulesTermsLink(): Locator {
    return this.footer.getByRole('link', { name: /rules.*term/i });
  }

  get footerNonDiscriminationLink(): Locator {
    return this.footer.getByRole('link', { name: /discrimination/i });
  }

  // Footer Links - Privacy
  get footerPrivacyPolicyLink(): Locator {
    return this.footer.getByRole('link', { name: /privacy policy/i });
  }

  get footerCookiePolicyLink(): Locator {
    return this.footer.getByRole('link', { name: /cookie policy/i });
  }

  get footerConsentPreferencesLink(): Locator {
    return this.footer.getByRole('link', { name: /consent preference/i });
  }

  // Footer Links - Social Media
  get footerInstagramLink(): Locator {
    return this.footer.getByRole('link', { name: /instagram/i });
  }

  get footerFacebookLink(): Locator {
    return this.footer.getByRole('link', { name: /facebook/i });
  }

  get footerXLink(): Locator {
    return this.footer.getByRole('link', { name: /\bx\b|twitter/i });
  }

  get footerLinkedInLink(): Locator {
    return this.footer.getByRole('link', { name: /linkedin/i });
  }

  get footerYouTubeLink(): Locator {
    return this.footer.getByRole('link', { name: /youtube/i });
  }

  get footerTikTokLink(): Locator {
    return this.footer.getByRole('link', { name: /tiktok/i });
  }

  getSocialMediaLink(platform: 'Instagram' | 'Facebook' | 'X' | 'LinkedIn' | 'YouTube' | 'TikTok'): Locator {
    const patterns: Record<string, RegExp> = {
      instagram: /instagram/i,
      facebook: /facebook/i,
      x: /\b(x|twitter)\b/i,
      linkedin: /linkedin/i,
      youtube: /youtube/i,
      tiktok: /tiktok/i
    };
    return this.footer.getByRole('link', { name: patterns[platform.toLowerCase()] });
  }

  // ============ Utility Methods ============
  
  async verifyImageLoaded(image: Locator, options?: { timeout?: number }): Promise<boolean> {
    const timeout = options?.timeout ?? 5000;
    try {
      await image.waitFor({ state: 'visible', timeout });
      return await image.evaluate((img: HTMLImageElement) => {
        return img.complete && img.naturalWidth > 0;
      });
    } catch {
      return false;
    }
  }

  async waitForAllImagesToLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    const allImagesLoaded = await this.page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return Promise.all(
        images.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.addEventListener('load', resolve);
                img.addEventListener('error', resolve);
              })
        )
      );
    });
  }

  async verifyNoHorizontalScroll(): Promise<void> {
    const bodyWidth = await this.page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = this.page.viewportSize()!.width;
    if (bodyWidth > viewportWidth + 10) {
      throw new Error(`Horizontal scroll detected: body width ${bodyWidth} > viewport ${viewportWidth}`);
    }
  }

  async verifyAccessibleFocus(): Promise<void> {
    const focusVisible = await this.page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return false;
      const styles = window.getComputedStyle(el);
      return styles.outline !== 'none' || styles.boxShadow !== 'none';
    });
    if (!focusVisible) {
      throw new Error('Focus indicator not visible');
    }
  }

  async getHeadingHierarchy(): Promise<number[]> {
    return await this.page.$$eval('h1, h2, h3, h4, h5, h6', (elements) =>
      elements.map((el) => parseInt(el.tagName.substring(1)))
    );
  }

  async countBrokenImages(): Promise<number> {
    await this.page.waitForLoadState('domcontentloaded');
    return await this.page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter((img) => !img.complete || img.naturalWidth === 0).length;
    });
  }

  async getVisibleText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }

  async isElementVisible(locator: Locator, options?: { timeout?: number }): Promise<boolean> {
    const timeout = options?.timeout ?? 1000;
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async waitForSectionToLoad(section: Locator, options?: { timeout?: number }): Promise<void> {
    const timeout = options?.timeout ?? 10000;
    await section.waitFor({ state: 'visible', timeout });
    // Wait for any animations/transitions
    await this.page.waitForTimeout(200);
  }
}