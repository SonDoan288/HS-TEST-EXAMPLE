import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Locations Page
 * @description POM for location finder and booking interface with Google Maps integration
 */
export class LocationsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ============ Navigation ============
  
  async goto(url?: string): Promise<void> {
    const targetUrl = url || 'https://custom-booking-app-release-hand-and-stone.vercel.app/locations/';
    await this.page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  }

  async gotoWithServiceContext(serviceId: string, serviceName: string): Promise<void> {
    const url = `https://custom-booking-app-release-hand-and-stone.vercel.app/locations/?service_id=${serviceId}&service_name=${encodeURIComponent(serviceName)}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async waitForNavigation(pattern: RegExp, timeout = 15000): Promise<void> {
    await this.page.waitForURL(pattern, { timeout });
  }

  async scrollToSection(section: Locator): Promise<void> {
    await section.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
  }

  // ============ Header ============
  
  get header(): Locator {
    return this.page.locator('header').first();
  }

  get headerLogo(): Locator {
    return this.header.getByRole('link', { name: /logo|home/i });
  }

  get menuButton(): Locator {
    return this.header.getByRole('button', { name: /show-menu-navigation|menu/i });
  }

  get headerBookButton(): Locator {
    return this.header.getByRole('link', { name: /book|cta-location-finder/i });
  }

  get headerLocationsLink(): Locator {
    return this.header.getByRole('link', { name: /location/i });
  }

  get headerMenuButton(): Locator {
    return this.menuButton; // Alias for consistency
  }

  // ============ Search Section ============
  
  get searchInput(): Locator {
    return this.page.getByLabel(/Enter ZIP.*City.*Address.*State/i).or(
      this.page.locator('input#zipCode-field')
    );
  }

  get searchInputLabel(): Locator {
    return this.page.locator('label[for="zipCode-field"]');
  }

  get searchButton(): Locator {
    return this.page.getByRole('button', { name: /search/i }).or(
      this.page.locator('button[type="submit"]').first()
    );
  }

  get clearSearchButton(): Locator {
    // Clear button (X button) that appears after search is executed
    // Try multiple selectors to find the clear button near the search input
    return this.searchInput.locator('..').locator('button[aria-label*="clear" i], button[aria-label*="Clear" i]').or(
      this.searchInput.locator('..').locator('button[title*="clear" i], button[title*="Clear" i]')
    ).or(
      this.searchInput.locator('..').locator('button[class*="clear" i], button[class*="close" i]')
    ).or(
      this.page.locator('button').filter({ hasText: /^[xX×]$/ }).first()
    ).or(
      this.page.locator('svg[class*="close" i], svg[class*="clear" i]').locator('..').first()
    );
  }

  get useCurrentLocationButton(): Locator {
    // Target the main button, not the map control button
    return this.page.getByRole('button', { name: /use.*current location/i });
  }

  get useMyLocationButton(): Locator {
    return this.useCurrentLocationButton; // Alias for consistency
  }

  get autocompleteSuggestions(): Locator {
    return this.page.locator('[role="listbox"], [class*="autocomplete"], [class*="suggestion"]');
  }

  get autocompleteSuggestionItems(): Locator {
    return this.autocompleteSuggestions.locator('[role="option"], li, [class*="item"]');
  }

  async getAutocompleteSuggestion(index: number): Promise<Locator> {
    return this.autocompleteSuggestionItems.nth(index);
  }

  async typeInSearch(text: string): Promise<void> {
    await this.searchInput.fill(text);
    await this.page.waitForTimeout(500); // Wait for autocomplete
  }

  async selectAutocompleteSuggestion(index: number): Promise<void> {
    const suggestion = await this.getAutocompleteSuggestion(index);
    await suggestion.click();
  }

  async performSearch(searchTerm: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }

  async clearSearchInput(): Promise<void> {
    await this.searchInput.clear();
  }

  // ============ Google Maps ============
  
  get mapContainer(): Locator {
    // Map container is always present, but location-search-panel may not exist after search
    // Use the div with order-1 class which contains the map - this works both before and after search
    return this.page.locator('div.order-1').first();
  }

  get mapAttribution(): Locator {
    return this.page.getByText(/Map Data.*Google/i).first();
  }

  get mapTermsLink(): Locator {
    return this.page.getByRole('link', { name: /terms/i });
  }

  get locationMarkers(): Locator {
    return this.page.locator('[role="button"][title*="location"], [aria-label*="marker"]');
  }

  get clusterMarkers(): Locator {
    return this.page.locator('[aria-label*="cluster"], [class*="cluster"]');
  }

  get zoomInButton(): Locator {
    return this.page.getByRole('button', { name: /zoom in|\+/i }).or(
      this.page.locator('[aria-label*="Zoom in"]')
    );
  }

  get zoomOutButton(): Locator {
    return this.page.getByRole('button', { name: /zoom out|\-/i }).or(
      this.page.locator('[aria-label*="Zoom out"]')
    );
  }

  get myLocationMapButton(): Locator {
    return this.page.locator('[aria-label*="Show your location"], [title*="location"]').first();
  }

  get openInGoogleMapsLink(): Locator {
    return this.page.getByRole('link', { name: /open in google maps/i });
  }

  get keyboardShortcutsButton(): Locator {
    return this.page.getByRole('button', { name: /keyboard shortcuts/i });
  }

  async clickLocationMarker(index: number): Promise<void> {
    await this.locationMarkers.nth(index).click();
  }

  async zoomIn(): Promise<void> {
    await this.zoomInButton.click();
    await this.page.waitForTimeout(500);
  }

  async zoomOut(): Promise<void> {
    await this.zoomOutButton.click();
    await this.page.waitForTimeout(500);
  }

  async panMap(deltaX: number, deltaY: number): Promise<void> {
    const mapBox = await this.mapContainer.boundingBox();
    if (mapBox) {
      await this.page.mouse.move(mapBox.x + mapBox.width / 2, mapBox.y + mapBox.height / 2);
      await this.page.mouse.down();
      await this.page.mouse.move(mapBox.x + mapBox.width / 2 + deltaX, mapBox.y + mapBox.height / 2 + deltaY);
      await this.page.mouse.up();
    }
  }

  // ============ Location List/Results ============
  
  get locationList(): Locator {
    return this.page.locator('[class*="location-list"], [class*="results"]').first();
  }

  get locationListItems(): Locator {
    return this.locationList.locator('[class*="location-item"], li, article');
  }

  get locationCount(): Locator {
    return this.page.getByText(/found.*locations?|.*results?/i);
  }

  get noResultsMessage(): Locator {
    return this.page.getByText(/no locations found|no results/i);
  }

  get geolocationError(): Locator {
    return this.page.getByText(/location.*denied|enable.*location|geolocation.*error/i);
  }

  async getLocationListItem(index: number): Promise<Locator> {
    return this.locationListItems.nth(index);
  }

  async clickLocationListItem(index: number): Promise<void> {
    const item = await this.getLocationListItem(index);
    await item.click();
  }

  // ============ Location Details Panel ============
  
  get locationDetailsPanel(): Locator {
    return this.page.locator('[class*="location-detail"], [class*="info-window"]').first();
  }

  get locationName(): Locator {
    return this.locationDetailsPanel.locator('h2, h3, [class*="name"]').first();
  }

  get locationAddress(): Locator {
    return this.locationDetailsPanel.locator('[class*="address"], address').first();
  }

  get locationPhone(): Locator {
    return this.locationDetailsPanel.getByRole('link', { name: /tel:|phone/i }).or(
      this.locationDetailsPanel.locator('[href^="tel:"]')
    );
  }

  get locationHours(): Locator {
    return this.locationDetailsPanel.locator('[class*="hours"]').first();
  }

  get locationServices(): Locator {
    return this.locationDetailsPanel.locator('[class*="service"]');
  }

  get bookAppointmentButton(): Locator {
    return this.locationDetailsPanel.getByRole('button', { name: /book|appointment/i }).or(
      this.locationDetailsPanel.getByRole('link', { name: /book|appointment/i })
    );
  }

  get getDirectionsLink(): Locator {
    return this.locationDetailsPanel.getByRole('link', { name: /directions/i });
  }

  get closeDetailsButton(): Locator {
    return this.locationDetailsPanel.getByRole('button', { name: /close/i }).or(
      this.locationDetailsPanel.locator('[aria-label*="close"], button[class*="close"]')
    );
  }

  async closeLocationDetails(): Promise<void> {
    await this.closeDetailsButton.click();
  }

  // ============ Footer ============
  
  get footer(): Locator {
    return this.page.locator('footer');
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

  // Footer Sections
  get footerAboutUsSection(): Locator {
    // Target the visible desktop paragraph heading (last one, as mobile is rendered first)
    return this.footer.getByText('About Us', { exact: true }).last();
  }

  get footerServicesSection(): Locator {
    // Target the visible desktop paragraph heading, avoiding hidden mobile accordion headers
    return this.footer.getByText('SERVICES', { exact: true }).last();
  }

  get footerMembershipSection(): Locator {
    // Target the visible desktop paragraph heading, avoiding hidden mobile accordion headers
    return this.footer.getByText('MEMBERSHIP', { exact: true }).last();
  }

  get footerTermsSection(): Locator {
    // Target the visible desktop paragraph heading, avoiding hidden mobile accordion headers
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

  get footerLinks(): Locator {
    return this.footer.locator('a');
  }

  get footerSocialLinks(): Locator {
    return this.footer.locator('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"], a[href*="linkedin"], a[href*="youtube"], a[href*="tiktok"]');
  }

  // ============ Utility Methods ============
  
  async verifyMapLoaded(): Promise<boolean> {
    try {
      await this.mapContainer.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(2000); // Wait for map tiles to load
      return true;
    } catch {
      return false;
    }
  }

  async verifyNoHorizontalScroll(): Promise<void> {
    const bodyWidth = await this.page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = this.page.viewportSize()!.width;
    if (bodyWidth > viewportWidth + 10) {
      throw new Error(`Horizontal scroll detected: body width ${bodyWidth} > viewport ${viewportWidth}`);
    }
  }

  async grantGeolocationPermission(): Promise<void> {
    await this.page.context().grantPermissions(['geolocation']);
  }

  async denyGeolocationPermission(): Promise<void> {
    await this.page.context().clearPermissions();
  }

  async setGeolocation(latitude: number, longitude: number): Promise<void> {
    await this.page.context().setGeolocation({ latitude, longitude });
  }

  async verifyURLParameters(expectedParams: Record<string, string>): Promise<boolean> {
    const url = new URL(this.page.url());
    for (const [key, value] of Object.entries(expectedParams)) {
      if (url.searchParams.get(key) !== value) {
        return false;
      }
    }
    return true;
  }

  async getURLParameter(param: string): Promise<string | null> {
    const url = new URL(this.page.url());
    return url.searchParams.get(param);
  }

  async countBrokenImages(): Promise<number> {
    return await this.page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter((img) => !img.complete || img.naturalWidth === 0).length;
    });
  }

  async getConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    return errors;
  }
}

