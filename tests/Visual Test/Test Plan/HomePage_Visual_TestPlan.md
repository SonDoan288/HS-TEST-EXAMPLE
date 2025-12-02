# Hand & Stone Home Page - Visual Regression Test Plan

## Test Overview

This document outlines the comprehensive visual regression testing strategy for the Hand & Stone Home Page to ensure visual consistency across different viewports, browsers, and content states.

**Test URL**: `https://custom-booking-app-release-hand-and-stone.vercel.app/`

---

## Test Objectives

1. ✅ Verify visual consistency of all Home Page components across different viewport sizes
2. ✅ Ensure Contentful-managed content renders correctly
3. ✅ Detect unintended UI changes through screenshot comparison
4. ✅ Validate responsive design across desktop, tablet, and mobile viewports
5. ✅ Test interaction states (hover, focus, active)
6. ✅ Verify dynamic content (carousels, sliders) render correctly

---

## Technical Requirements

### Testing Framework
- **Tool**: Playwright Visual Testing
- **Methods**: `page.screenshot()` and `expect(page).toHaveScreenshot()`
- **Snapshot Storage**: `tests/Visual Test/Test Specifications/__snapshots__/`

### Browser Coverage
- ✅ Chromium (Desktop Chrome)
- ✅ Firefox (Desktop Firefox)
- ✅ WebKit (Desktop Safari)

### Viewport Specifications

**Desktop:**
- **XXL Mac - Chrome**: 1920x1080 (primary desktop)
- **XL Mac - Chrome**: 1440x900
- **L Mac - Safari**: 1280x720

**Tablet:**
- **M iPadOS - Chrome**: 768x1024

**Mobile:**
- **S iOS - Safari**: 375x667 (iPhone SE)

### Visual Comparison Settings

- **Threshold**: 0.2 (20% pixel difference tolerance)
- **Max Diff Pixels**: 100 (maximum pixel differences allowed)
- **Max Diff Pixel Ratio**: 0.01 (1% of total pixels)

---

## Test Coverage

### 1. Full Page Screenshots

#### 1.1 Initial Page Load
- **Purpose**: Capture homepage in initial state
- **Conditions**: 
  - Wait for network idle
  - Wait for all images to load
  - Mask dynamic content (timestamps, cookies)
- **Viewports**: All (1920x1080, 1440x900, 1280x720, 768x1024, 375x667)
- **Browsers**: Chromium, Firefox, WebKit

#### 1.2 After Scroll (Full Page)
- **Purpose**: Verify layout after scrolling to bottom
- **Conditions**: 
  - Scroll to bottom of page
  - Wait for lazy-loaded content
- **Viewports**: Desktop (1920x1080, 1440x900, 1280x720)
- **Browsers**: Chromium, Firefox, WebKit

#### 1.3 With Cookie Banner (if present)
- **Purpose**: Test page with cookie consent banner visible
- **Conditions**: 
  - Cookie banner visible
  - Mask cookie banner content
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 1.4 Without Cookie Banner
- **Purpose**: Test page after dismissing cookie banner
- **Conditions**: 
  - Cookie banner dismissed/not present
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

---

### 2. Component-Level Screenshots

#### 2.1 Hero Section
- **Component**: `heroSection` (data-testid: `serviceHero`)
- **Elements to Test**:
  - Hero video/background
  - Hero title and description
  - "Book Now" button
  - "Buy a Gift Card" button
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 2.2 Value Proposition Section
- **Component**: `valuePropositionSection` (data-testid: `valuePropositionSection`)
- **Elements to Test**:
  - Section heading
  - Value proposition content
  - "Book Now" CTA
  - "Join Today" CTA
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 2.3 Treatments Carousel Section
- **Component**: `treatmentsSection` (data-testid: `globalSpaIntroductoryOffers`)
- **Elements to Test**:
  - Carousel cards (first card, middle card, last card)
  - Navigation buttons (next/previous)
  - Card CTAs
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit
- **States**: Initial state, after navigation

#### 2.4 Find a Spa Section
- **Component**: `findSpaSection` (data-testid: `globalCareers` with text filter)
- **Elements to Test**:
  - Section heading
  - "Find a Spa" button
  - Background image
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 2.5 Membership Section
- **Component**: `membershipSection` (data-testid: `serviceFeatureCarousel`)
- **Elements to Test**:
  - Membership image
  - Membership content
  - Benefits (Monthly self-care, Member-only savings, Loyalty)
  - "Explore Memberships" CTA
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 2.6 Gift Cards Section
- **Component**: `giftCardsSection` (data-testid: `globalCareers` with text filter)
- **Elements to Test**:
  - Section heading
  - "Buy a Gift Card" button
  - Background image
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 2.7 Onboarding Cards Section
- **Component**: `onboardingSection` (data-testid: `onboardingCardsSection`)
- **Elements to Test**:
  - "Find a Spa" card
  - "Meet Our Providers" card
  - "Become a Member" card
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 2.8 Experts Section
- **Component**: `expertsSection` (data-testid: `globalCareers` with text filter)
- **Elements to Test**:
  - Section heading
  - "Learn More" link
  - "Join Our Team" link
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 2.9 Franchise Section
- **Component**: `franchiseSection` (data-testid: `globalCareers` with text filter)
- **Elements to Test**:
  - Background image
  - "Learn More" link
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 2.10 Header Navigation
- **Component**: `header`
- **Elements to Test**:
  - Logo
  - "Book" button
  - Menu button (mobile)
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 2.11 Footer
- **Component**: `footer`
- **Elements to Test**:
  - Footer navigation links
  - Service links
  - Legal/policy links
  - Social media icons
  - Copyright text
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

---

### 3. Interaction States

#### 3.1 Button Hover States
- **Elements**:
  - "Book Now" buttons
  - "Buy a Gift Card" buttons
  - "Join Today" button
  - "Find a Spa" button
  - Carousel navigation buttons
- **Viewports**: Desktop (1920x1080, 1440x900, 1280x720)
- **Browsers**: Chromium, Firefox, WebKit

#### 3.2 Link Focus States
- **Elements**:
  - All footer links
  - Navigation links
  - CTA links
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 3.3 Mobile Menu States
- **States**:
  - Collapsed (default)
  - Expanded (after clicking menu button)
- **Viewports**: Mobile (375x667), Tablet (768x1024)
- **Browsers**: Chromium, Firefox, WebKit

#### 3.4 Carousel Navigation States
- **Elements**:
  - Treatments carousel (first card, after next click)
  - Membership carousel (if applicable)
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

---

### 4. Content Verification

#### 4.1 Contentful Text Rendering
- **Verify**: All Contentful-managed text displays correctly
- **Sections**: All sections with dynamic content
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 4.2 Image Loading
- **Verify**: All images load correctly
- **Check**: No broken image placeholders
- **Sections**: Hero, sections with background images
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

#### 4.3 Layout Shift Detection
- **Verify**: No layout shifts during content load
- **Method**: Compare screenshots at different load stages
- **Viewports**: All
- **Browsers**: Chromium, Firefox, WebKit

---

### 5. Edge Cases

#### 5.1 Slow Network Conditions
- **Condition**: Throttle to "Slow 3G"
- **Verify**: Loading states render correctly
- **Viewports**: Mobile (375x667)
- **Browsers**: Chromium

#### 5.2 Content Loading States
- **Verify**: Skeleton loaders or placeholders (if present)
- **Viewports**: All
- **Browsers**: Chromium

#### 5.3 Empty States
- **Condition**: Simulate Contentful returning no content
- **Verify**: Graceful degradation/empty state handling
- **Viewports**: All
- **Browsers**: Chromium

---

## Dynamic Content Masking

The following elements will be masked in screenshots to prevent false positives:

1. **Timestamps/Dates**: Any date/time displays
2. **Cookie Banners**: Cookie consent banners (when testing with banner)
3. **Personalized Content**: User-specific content (if any)
4. **Video Controls**: Video player controls (if they vary)
5. **Animation States**: Carousel auto-rotation states
6. **Network-Dependent Content**: Content that may vary by network speed

---

## Test Execution

### Local Execution
```bash
# Run all visual tests
npx playwright test tests/Visual\ Test/Test\ Specifications/home-page.visual.spec.ts

# Run specific viewport
npx playwright test tests/Visual\ Test/Test\ Specifications/home-page.visual.spec.ts --project=chromium

# Update snapshots (after intentional changes)
npx playwright test tests/Visual\ Test/Test\ Specifications/home-page.visual.spec.ts --update-snapshots
```

### CI/CD Integration
- Run visual tests on pull requests
- Fail build on visual regressions
- Generate visual comparison reports
- Store snapshots in version control or artifact storage

---

## Snapshot Management

### Updating Snapshots
- **When**: After intentional UI changes
- **How**: Run with `--update-snapshots` flag
- **Review**: Always review diff before committing updated snapshots

### Snapshot Review Process
1. Run visual tests
2. Review failed comparisons
3. Determine if changes are intentional or regressions
4. Update snapshots if intentional
5. Fix code if regression

---

## Maintenance

### Regular Updates
- Update snapshots when Contentful content changes
- Review and adjust thresholds as needed
- Add new components as they're added to the page
- Remove obsolete tests for removed components

### Performance Considerations
- Limit full-page screenshots to critical viewports
- Use component-level screenshots for detailed testing
- Optimize test execution time with parallel runs

---

## Test Plan Version

- **Version**: 1.0
- **Created**: 2025-01-XX
- **Last Updated**: 2025-01-XX
- **Status**: Active

---

## References

- [Playwright Visual Testing Documentation](https://playwright.dev/docs/test-snapshots)
- [HomePage POM](./../../Functionality%20Test/Test%20Specifications/pages/HomePage.ts)
- [HS.md](./../../HS.md)
- [Test URL](https://custom-booking-app-release-hand-and-stone.vercel.app/)

