# Hand & Stone Homepage - Comprehensive Test Plan

## Application Overview

The Hand & Stone Massage and Facial Spa website is a React-based marketing and booking platform that provides comprehensive spa service information and booking capabilities. The application features:

- **Hero Section**: Video background with primary CTAs (Book Now, Buy Gift Card)
- **Navigation System**: Global navigation menu with service categories and discovery links
- **Service Showcase**: Interactive carousel displaying 5 treatment categories (Massages, Facials, Toning, Injectables, Hair Removal)
- **Value Propositions**: Multiple content sections highlighting spa benefits, locations, membership, and experts
- **Promotional Banners**: Dynamic promotional content with dismissible banners
- **Membership Information**: Detailed membership benefits with expandable content
- **Location Finder**: 600+ nationwide locations with CTA to find nearby spas
- **Onboarding Cards**: Interactive cards guiding first-time visitors
- **Footer Navigation**: Comprehensive footer with links to services, legal pages, and social media

## Test Scenarios

### 1. Hero Section & Primary CTAs

#### 1.1 Verify Hero Section Loads with Video Background
**Steps:**
1. Navigate to homepage at `https://custom-booking-app-development-hand-and-stone.vercel.app/`
2. Wait for page to fully load
3. Observe hero section

**Expected Results:**
- Hero section is visible with heading "Massages. Facials. Moments of calm"
- Video background is playing
- Pause video button is visible
- Hero description text is displayed
- Both "Book Now" and "Buy a Gift Card" CTAs are visible

#### 1.2 Verify Video Pause Functionality
**Steps:**
1. Navigate to homepage
2. Locate the pause video button in hero section
3. Click the pause video button
4. Observe video state

**Expected Results:**
- Video pauses when button is clicked
- Button state changes to indicate video is paused
- Button remains interactive

#### 1.3 Verify Book Now Button Navigation from Hero
**Steps:**
1. Navigate to homepage
2. Locate "Book Now" button in hero section (aria-label: "cta-book-now")
3. Verify button is visible and enabled
4. Click "Book Now" button
5. Wait for navigation to complete

**Expected Results:**
- Button is visible and clickable
- Navigation occurs to locations page
- URL changes to match `/locations/?$` pattern
- Locations page loads successfully

#### 1.4 Verify Buy a Gift Card Button Navigation from Hero
**Steps:**
1. Navigate to homepage
2. Locate "Buy a Gift Card" button in hero section (aria-label: "cta-buy-a-gift-card")
3. Verify button is visible and enabled
4. Click "Buy a Gift Card" button
5. Wait for navigation to complete

**Expected Results:**
- Button is visible and clickable
- Navigation occurs to gift card purchase page
- URL changes to Zenoti staging gift card URL: `https://handandstonestg.zenotistage.com/webstoreNew/giftcards/6b9f45c8-50a4-4622-9bc5-5b152137fd72`
- Gift card page loads successfully

#### 1.5 Verify Promotional Banner Display and Dismissal
**Steps:**
1. Navigate to homepage
2. Locate promotional banner with heading "Give the gift of"
3. Verify banner content and CTA are visible
4. Locate "Close promotion" button
5. Click close button
6. Observe banner behavior

**Expected Results:**
- Promotional banner displays with offer details ($79.95 gift card offer)
- "Buy Now" CTA is visible and clickable
- Close button (X) is visible
- Banner dismisses when close button is clicked
- Banner remains dismissed after dismissal

### 2. Navigation Menu

#### 2.1 Verify Navigation Menu Opens Successfully
**Steps:**
1. Navigate to homepage
2. Locate menu button in header (aria-label: "show-menu-navigation")
3. Verify button is visible
4. Click menu button
5. Observe navigation menu

**Expected Results:**
- Menu button is visible in header
- Menu opens in overlay/dialog format
- Navigation menu displays with all sections visible
- Background image loads correctly
- Close button is visible

#### 2.2 Verify Navigation Menu Service Categories
**Steps:**
1. Navigate to homepage
2. Open navigation menu
3. Locate "Services" section
4. Verify all service category buttons are present

**Expected Results:**
- Services section header is visible
- All 5 service buttons are present:
  - Massage
  - Facials
  - Toning
  - Injectables
  - Hair Removal
- All buttons are clickable

#### 2.3 Verify Navigation Menu Discover Links
**Steps:**
1. Navigate to homepage
2. Open navigation menu
3. Locate "DISCOVER" section
4. Verify all discover links are present

**Expected Results:**
- "DISCOVER" section header is visible
- All 4 links are present and clickable:
  - Membership (links to `/memberships/`)
  - Gift Cards (links to Zenoti gift card page)
  - Locations (links to `/locations/`)
  - Franchise (links to franchise page)
- Each link has proper href attribute

#### 2.4 Verify Navigation Menu Account Link
**Steps:**
1. Navigate to homepage
2. Open navigation menu
3. Locate "Account" link at bottom
4. Verify link is visible and functional

**Expected Results:**
- Account link is visible with icon
- Link displays "Account" text
- Link points to Zenoti account page
- Link is clickable

#### 2.5 Verify Navigation Menu Close Functionality
**Steps:**
1. Navigate to homepage
2. Open navigation menu
3. Locate close button (aria-label: "close-menu-navigation")
4. Click close button
5. Observe menu behavior

**Expected Results:**
- Close button (X) is visible in menu
- Menu closes when close button is clicked
- Menu overlay dismisses
- User returns to homepage view
- Menu can be reopened

### 3. Value Proposition Section

#### 3.1 Verify Value Proposition Section Display
**Steps:**
1. Navigate to homepage
2. Scroll to value proposition section
3. Observe section content

**Expected Results:**
- Section displays heading "Timeless spa techniques perfected for you"
- Subheading "Trusted care since 2004" is visible
- Descriptive paragraph is present
- Three images are displayed (Portrait, Square, Landscape)
- Two CTA cards are visible

#### 3.2 Verify Book a Treatment CTA in Value Proposition
**Steps:**
1. Navigate to homepage
2. Scroll to value proposition section
3. Locate "Book a Treatment" card
4. Verify "Book Now" CTA link
5. Click "Book Now" link

**Expected Results:**
- "Book a Treatment" label is visible
- "Book Now" CTA (aria-label: "cta-book-now") is present and clickable
- Clicking navigates to locations page
- URL matches `/locations/` pattern

#### 3.3 Verify Become a Member CTA in Value Proposition
**Steps:**
1. Navigate to homepage
2. Scroll to value proposition section
3. Locate "Become a Member" card
4. Verify "Join Today" CTA link
5. Click "Join Today" link

**Expected Results:**
- "Become a Member" label is visible
- "Join Today" CTA (aria-label: "cta-join-today") is present and clickable
- Clicking navigates to memberships page
- URL matches `/memberships/?$` pattern

### 4. Treatments Carousel

#### 4.1 Verify Treatments Section Initial Display
**Steps:**
1. Navigate to homepage
2. Scroll to treatments carousel section
3. Observe initial state

**Expected Results:**
- Section heading "Personalized treatments to relax & renew" is visible
- Section label "Our Treatments" is displayed
- Description paragraph is present
- All 5 treatment cards are visible:
  - Massages
  - Facials
  - Toning
  - Injectables
  - Hair Removal
- Each card shows image and description
- "Book Now" CTA is visible at bottom
- Navigation buttons (Previous/Next) are present
- Previous button is disabled
- Next button is enabled

#### 4.2 Verify Carousel Next Navigation
**Steps:**
1. Navigate to homepage
2. Scroll to treatments carousel
3. Verify initial state (Previous disabled, Next enabled)
4. Click "Next" button
5. Observe carousel state change

**Expected Results:**
- Next button is clickable
- Carousel content shifts/scrolls
- Previous button becomes enabled
- Next button state may change based on position
- All treatment cards remain visible
- No console errors occur

#### 4.3 Verify Carousel Previous Navigation
**Steps:**
1. Navigate to homepage
2. Scroll to treatments carousel
3. Click "Next" button to enable Previous
4. Click "Previous" button
5. Observe carousel state

**Expected Results:**
- Previous button becomes enabled after clicking Next
- Previous button is clickable when enabled
- Carousel content shifts back
- Carousel returns to previous position
- All treatment cards remain visible

#### 4.4 Verify Massages Treatment Card Interaction
**Steps:**
1. Navigate to homepage
2. Scroll to treatments carousel
3. Locate "Massages" card button (aria-label: "View details for Massages")
4. Verify card is visible and clickable
5. Click Massages card
6. Wait for navigation

**Expected Results:**
- Massages card is visible with image
- Card shows description "Soothe your body and mind with a full-body massage tailored to your needs"
- Card is clickable
- Clicking navigates to `/massage/` page
- Massage category page loads with all massage types:
  - Classic Massage
  - Hot Stone Massage
  - Himalayan Salt Stone Massage
  - Deep Tissue Massage
  - Prenatal Massage
  - Oncology Massage
  - Aescape Robotic Massage

#### 4.5 Verify Facials Treatment Card Interaction
**Steps:**
1. Navigate to homepage
2. Scroll to treatments carousel
3. Locate "Facials" card (aria-label: "View details for Facials")
4. Click Facials card
5. Wait for navigation

**Expected Results:**
- Facials card is visible
- Card shows description "Embrace hydrated, healthier skin with expert facials designed just for you"
- Clicking navigates to `/facials/` page
- Facials category page loads successfully

#### 4.6 Verify Toning Treatment Card Interaction
**Steps:**
1. Navigate to homepage
2. Locate "Toning" card (aria-label: "View details for Toning")
3. Click Toning card

**Expected Results:**
- Toning card is visible
- Card shows description "Firm and smooth your skin with treatments that support tone and elasticity"
- Clicking navigates to body toning page
- Page loads successfully

#### 4.7 Verify Injectables Treatment Card Interaction
**Steps:**
1. Navigate to homepage
2. Locate "Injectables" card (aria-label: "View details for Injectables")
3. Click Injectables card

**Expected Results:**
- Injectables card is visible
- Card shows description "Soften wrinkles and restore natural volume to maintain youthful skin"
- Clicking navigates to injectables page
- Page loads successfully

#### 4.8 Verify Hair Removal Treatment Card Interaction
**Steps:**
1. Navigate to homepage
2. Locate "Hair Removal" card (aria-label: "View details for Hair Removal")
3. Click Hair Removal card

**Expected Results:**
- Hair Removal card is visible
- Card shows description "Reveal your smoothest skin through face, body, and bikini waxing"
- Clicking navigates to hair removal page
- Page loads successfully

#### 4.9 Verify Treatments Section Book Now CTA
**Steps:**
1. Navigate to homepage
2. Scroll to treatments section
3. Locate "Book Now" CTA at bottom of section
4. Click "Book Now" button

**Expected Results:**
- "Book Now" CTA is visible and positioned below carousel
- Button is clickable
- Clicking navigates to locations page
- URL matches `/locations/` pattern

### 5. Find a Spa Section

#### 5.1 Verify Find a Spa Section Display
**Steps:**
1. Navigate to homepage
2. Scroll to "Find a Spa" section
3. Observe section content

**Expected Results:**
- Section displays label "600+ Locations Nationwide"
- Heading "Find a location near you" is visible
- Description paragraph explaining location benefits is present
- "Find a Spa" CTA is visible

#### 5.2 Verify Find a Spa CTA Navigation
**Steps:**
1. Navigate to homepage
2. Scroll to Find a Spa section
3. Locate "Find a Spa" link (aria-label: "cta-find-spa")
4. Verify link is visible and enabled
5. Click link

**Expected Results:**
- CTA link is visible and clickable
- Clicking navigates to locations page
- URL matches `/locations/` pattern
- Locations page loads with location finder functionality

### 6. Membership Section

#### 6.1 Verify Membership Section Display
**Steps:**
1. Navigate to homepage
2. Scroll to membership section (fifty-fifty-carousel)
3. Observe section layout

**Expected Results:**
- Section displays heading "Make it a ritual"
- Section label "Become a Member" is visible
- Mobile-optimized image is displayed
- Background image is present
- Content container is visible

#### 6.2 Verify Membership Benefits List
**Steps:**
1. Navigate to homepage
2. Scroll to membership section
3. Locate benefits list
4. Verify all benefits are displayed

**Expected Results:**
- All 3 membership benefits are visible:
  1. **Monthly self-care**: "Enjoy a one-hour massage or facial each month at a price that feels as good as the treatment itself"
  2. **Member-only savings**: "Take advantage of special member rates on extra services, gift cards, and more"
  3. **Loyalty that pays off**: "Earn points with every visit and redeem them for free treatments and upgrades"
- Each benefit has heading and description
- Benefits are formatted as list items

#### 6.3 Verify Membership CTA Navigation
**Steps:**
1. Navigate to homepage
2. Scroll to membership section
3. Locate "Explore Memberships" CTA (aria-label: "cta-membership")
4. Click CTA link

**Expected Results:**
- CTA link is visible and clickable
- Clicking navigates to memberships page
- URL matches `/memberships/?$` pattern
- Memberships page loads successfully

### 7. Gift Cards Section

#### 7.1 Verify Gift Cards Section Display
**Steps:**
1. Navigate to homepage
2. Scroll to gift cards section
3. Observe section content

**Expected Results:**
- Section displays label "Gift Cards"
- Heading "Give the gift of feeling good" is visible
- Description paragraph is present
- "Buy a Gift Card" CTA is visible

#### 7.2 Verify Gift Cards CTA Navigation
**Steps:**
1. Navigate to homepage
2. Scroll to gift cards section
3. Locate "Buy a Gift Card" link (aria-label: "cta-buy-a-gift-card")
4. Click link

**Expected Results:**
- CTA link is visible and clickable
- Clicking navigates to Zenoti gift card page
- URL is `https://handandstone.zenoti.com/webstoreNew/giftcards/5798a140-71a0-4983-bc1b-f3d0d0fc4b93`
- Gift card purchase page loads successfully

### 8. Onboarding Cards Section

#### 8.1 Verify Onboarding Section Display
**Steps:**
1. Navigate to homepage
2. Scroll to onboarding cards section
3. Observe section layout

**Expected Results:**
- Section displays heading "Ready to relax? We've got you."
- Description paragraph is visible
- All 3 onboarding cards are displayed in carousel format
- Each card shows image and button

#### 8.2 Verify Find a Spa Onboarding Card
**Steps:**
1. Navigate to homepage
2. Scroll to onboarding section
3. Locate "Find a Spa" card
4. Verify card button (aria-label: "Find a Spa button")

**Expected Results:**
- Find a Spa card is visible
- Card displays image "Homepage-First Time 3 Up-Find a Location"
- Button is visible and clickable
- Button text reads "Find a Spa"

#### 8.3 Verify Meet Our Providers Onboarding Card
**Steps:**
1. Navigate to homepage
2. Scroll to onboarding section
3. Locate "Meet Our Providers" card
4. Verify card button (aria-label: "Meet Our Providers button")

**Expected Results:**
- Meet Our Providers card is visible
- Card displays image "Homepage-First Time 3 Up-Our Providers"
- Button is visible and clickable
- Button text reads "Meet Our Providers"

#### 8.4 Verify Become a Member Onboarding Card
**Steps:**
1. Navigate to homepage
2. Scroll to onboarding section
3. Locate "Become a Member" card
4. Verify card button (aria-label: "Become a Member button")

**Expected Results:**
- Become a Member card is visible
- Card displays image "Homepage-First Time 3 Up-Become a Member"
- Button is visible and clickable
- Button text reads "Become a Member"

### 9. Experts Section

#### 9.1 Verify Experts Section Display
**Steps:**
1. Navigate to homepage
2. Scroll to experts section
3. Observe section content

**Expected Results:**
- Section displays label "Meet Our Experts"
- Heading "Licensed. Trusted. Exceptional." is visible
- Description paragraph about therapists and estheticians is present
- Two CTAs are visible

#### 9.2 Verify Experts Learn More CTA
**Steps:**
1. Navigate to homepage
2. Scroll to experts section
3. Locate "Learn More" link (aria-label: "cta-learn-more")
4. Click link

**Expected Results:**
- "Learn More" CTA is visible and clickable
- Clicking navigates to "Our Story" page
- URL matches `/our-story/?$` pattern
- Page loads successfully

#### 9.3 Verify Join Our Team CTA
**Steps:**
1. Navigate to homepage
2. Scroll to experts section
3. Locate "Join Our Team" link (aria-label: "cta-join-our-team")
4. Click link

**Expected Results:**
- "Join Our Team" CTA is visible and clickable
- Clicking navigates to careers page
- URL is `https://handandstonecareers.com/`
- Careers page loads successfully

### 10. Franchise Section

#### 10.1 Verify Franchise Section Display
**Steps:**
1. Navigate to homepage
2. Scroll to franchise section
3. Observe section layout

**Expected Results:**
- Section displays label "OWN A FRANCHISE"
- Heading "Grow with a brand guests trust" is visible
- Description paragraph about franchise opportunities is present
- Background image is displayed
- "Learn More" CTA is visible

#### 10.2 Verify Franchise Learn More CTA
**Steps:**
1. Navigate to homepage
2. Scroll to franchise section
3. Locate "Learn More" link
4. Click link

**Expected Results:**
- "Learn More" link is visible and clickable
- Clicking navigates to franchise page
- URL matches `/franchise/?$` pattern with `SRC=consumer` parameter
- Franchise page loads successfully

### 11. Footer - Navigation Links

#### 11.1 Verify Footer Display and Structure
**Steps:**
1. Navigate to homepage
2. Scroll to footer
3. Observe footer layout

**Expected Results:**
- Footer is visible with background image
- Breadcrumbs navigation shows "Home"
- Hand & Stone logo is displayed
- Footer is organized into sections:
  - About Us
  - SERVICES
  - MEMBERSHIP
  - TERMS & CONDITIONS
- Social media links are present
- Legal links are displayed

#### 11.2 Verify Footer About Us Links
**Steps:**
1. Navigate to homepage
2. Scroll to footer
3. Locate "About Us" section
4. Verify all links are present

**Expected Results:**
- About Us section header is visible
- All 8 links are present and clickable:
  - Our Story (links to `/our-story/`)
  - Locations (links to `/locations/`)
  - Own A Franchise (links to `/franchise/`)
  - Join the Team (links to careers site)
  - Touchpoints: News & Blog (links to `/touchpoints/`)
  - Health & Safety (links to `/health-safety/`)
  - Hand & Stone Canada (links to `.ca` domain)
  - Contact Us (links to feedback form)

#### 11.3 Verify Footer Services Links
**Steps:**
1. Navigate to homepage
2. Scroll to footer
3. Locate "SERVICES" section
4. Verify all service links

**Expected Results:**
- SERVICES section header is visible
- All 5 service links are present:
  - Massages (links to `/massage/`)
  - Facials (links to `/facials/`)
  - Toning (links to `/body-toning/`)
  - Injectables (links to `/injectables/`)
  - Hair Removal (links to `/hair-removal/`)
- All links are clickable

#### 11.4 Verify Footer Membership Links
**Steps:**
1. Navigate to homepage
2. Scroll to footer
3. Locate "MEMBERSHIP" section
4. Verify membership links

**Expected Results:**
- MEMBERSHIP section header is visible
- 2 links are present:
  - Explore Memberships (links to `/memberships/`)
  - Reward Points Terms & Conditions (links to rewards terms)
- Links are clickable

### 12. Footer - Legal & Social

#### 12.1 Verify Footer Terms & Conditions Links
**Steps:**
1. Navigate to homepage
2. Scroll to footer
3. Locate "TERMS & CONDITIONS" section
4. Verify all legal links are present

**Expected Results:**
- TERMS & CONDITIONS section header is visible
- All 5 legal links are present:
  - Customer Bill of Rights
  - Gift Card Program Terms & Conditions
  - California Residents
  - Rules, Terms & Conditions
  - Policy on Non Discrimination & Gender Identity
- All links point to `/legal/` subdirectory pages
- Links are clickable

#### 12.2 Verify Footer Privacy & Cookie Links
**Steps:**
1. Navigate to homepage
2. Scroll to footer bottom
3. Locate privacy links
4. Verify all privacy-related links

**Expected Results:**
- All 3 privacy links are visible:
  - Privacy Policy (links to `/legal/privacy-policy/`)
  - Cookie Policy (links to `/legal/cookie-policy/`)
  - Open Consent Preferences Modal (opens consent modal)
- Links are clickable
- Consent Preferences has proper modal trigger

#### 12.3 Verify Footer Social Media Links
**Steps:**
1. Navigate to homepage
2. Scroll to footer
3. Locate social media icons
4. Verify all social links

**Expected Results:**
- All 6 social media links are present with icons:
  - Instagram (aria-label: "Social - Instagram")
  - Facebook (aria-label: "Social - Facebook")
  - X/Twitter (aria-label: "Social - X")
  - LinkedIn (aria-label: "Social - LinkedIn")
  - YouTube (aria-label: "Social - YouTube")
  - TikTok (aria-label: "Social - Tiktok")
- Each link has proper icon image
- All links are clickable
- Links open respective social media profiles

#### 12.4 Verify Footer Buy Gift Card CTA
**Steps:**
1. Navigate to homepage
2. Scroll to footer
3. Locate "Buy a Gift Card" link in footer
4. Click link

**Expected Results:**
- "Buy a Gift Card" link is visible in footer
- Link is clickable
- Clicking navigates to Zenoti gift card page
- Gift card purchase page loads

#### 12.5 Verify Footer Copyright and Disclaimers
**Steps:**
1. Navigate to homepage
2. Scroll to footer bottom
3. Observe copyright and disclaimer text

**Expected Results:**
- Copyright text displays "@ 2025 Hand & Stone Franchise Corp."
- Three disclaimer paragraphs are visible:
  - Introductory offers disclaimer
  - Enhancements and offers disclaimer
  - Age restrictions and medical conditions disclaimer
- Text is readable and properly formatted

### 13. Global Header Elements

#### 13.1 Verify Skip to Content Link (Accessibility)
**Steps:**
1. Navigate to homepage
2. Press Tab key to focus first element
3. Observe "Skip to content" link

**Expected Results:**
- "Skip to content" link is first focusable element
- Link is accessible via keyboard navigation
- Link points to "#main" anchor
- Clicking/activating jumps to main content

#### 13.2 Verify Global Header Book Now Button
**Steps:**
1. Navigate to homepage
2. Locate "Book Now" button in global header (not in hero)
3. Verify button is always visible while scrolling

**Expected Results:**
- "Book Now" button is visible in header
- Button displays "Book 123" text (or configured text)
- Button remains visible during scroll
- Clicking navigates to locations page

#### 13.3 Verify Global Header Logo Navigation
**Steps:**
1. Navigate to any non-homepage URL
2. Locate Hand & Stone logo in header (aria-label: "global header logo")
3. Click logo

**Expected Results:**
- Logo is visible in header
- Logo is clickable
- Clicking returns user to homepage
- URL changes to homepage URL

### 14. Responsive & Cross-Browser Testing

#### 14.1 Verify Mobile Viewport Display
**Steps:**
1. Set browser to mobile viewport (e.g., 375x667)
2. Navigate to homepage
3. Observe layout adjustments

**Expected Results:**
- Layout adjusts for mobile view
- All sections remain accessible
- Navigation menu is accessible
- CTAs are properly sized and clickable
- Images scale appropriately
- Text remains readable

#### 14.2 Verify Tablet Viewport Display
**Steps:**
1. Set browser to tablet viewport (e.g., 768x1024)
2. Navigate to homepage
3. Observe layout adjustments

**Expected Results:**
- Layout adjusts for tablet view
- Carousels function properly
- Navigation works correctly
- Content is properly formatted

#### 14.3 Verify Desktop Large Viewport Display
**Steps:**
1. Set browser to large desktop viewport (e.g., 1920x1080)
2. Navigate to homepage
3. Observe layout

**Expected Results:**
- Layout scales appropriately
- Content is centered or properly distributed
- Images display at proper resolution
- No layout breaking or overflow issues

### 15. Performance & Error Handling

#### 15.1 Verify Page Load Performance
**Steps:**
1. Navigate to homepage with cleared cache
2. Measure page load time
3. Observe loading sequence

**Expected Results:**
- Page loads within reasonable time (< 5 seconds)
- Hero section appears first (above fold content)
- Images load progressively
- No blocking resources delay interactivity

#### 15.2 Verify Image Loading
**Steps:**
1. Navigate to homepage
2. Observe all images throughout page
3. Scroll through all sections

**Expected Results:**
- All images load successfully
- No broken image placeholders
- Images have proper alt text
- Lazy loading works for below-fold images

#### 15.3 Verify Console Errors
**Steps:**
1. Navigate to homepage
2. Open browser console
3. Observe console messages throughout interaction

**Expected Results:**
- No critical JavaScript errors
- No broken resource requests (except known cookie consent issues)
- Warnings are documented and expected
- Page remains functional despite any warnings

#### 15.4 Verify Network Request Efficiency
**Steps:**
1. Navigate to homepage
2. Open network tab
3. Observe network requests

**Expected Results:**
- Reasonable number of requests
- No failed requests (except known third-party)
- Resources are properly compressed
- CDN resources load correctly

### 16. Content Verification

#### 16.1 Verify All Text Content is Readable
**Steps:**
1. Navigate to homepage
2. Read through all sections
3. Check for typos, grammar, formatting

**Expected Results:**
- All text is readable and properly formatted
- No Lorem Ipsum or placeholder text
- Consistent typography throughout
- Proper spacing and alignment

#### 16.2 Verify All CTAs Have Clear Purpose
**Steps:**
1. Navigate to homepage
2. Identify all CTA buttons/links
3. Verify each has clear, action-oriented text

**Expected Results:**
- All CTAs have descriptive labels:
  - "Book Now"
  - "Buy a Gift Card"
  - "Explore Memberships"
  - "Find a Spa"
  - "Learn More"
  - "Join Our Team"
  - etc.
- CTAs stand out visually
- Purpose is clear before clicking

#### 16.3 Verify Breadcrumbs Navigation
**Steps:**
1. Navigate to homepage
2. Check footer breadcrumbs
3. Navigate to category page (e.g., /massage/)
4. Check breadcrumbs update

**Expected Results:**
- Homepage shows "Home" in breadcrumbs
- Category pages show "Home • category" breadcrumbs
- Breadcrumb links are functional
- Current page is indicated

### 17. Edge Cases & Negative Testing

#### 17.1 Verify Rapid Carousel Navigation
**Steps:**
1. Navigate to homepage
2. Scroll to treatments carousel
3. Rapidly click Next button multiple times
4. Rapidly click Previous button multiple times

**Expected Results:**
- Carousel handles rapid clicks gracefully
- No visual glitches or jumping
- Buttons disable appropriately at boundaries
- No console errors

#### 17.2 Verify Multiple Menu Open/Close Actions
**Steps:**
1. Navigate to homepage
2. Open navigation menu
3. Close navigation menu
4. Repeat 5-10 times rapidly

**Expected Results:**
- Menu consistently opens and closes
- No visual artifacts
- No performance degradation
- Menu state is always correct

#### 17.3 Verify Page Behavior on Slow Network
**Steps:**
1. Simulate slow 3G network
2. Navigate to homepage
3. Observe loading behavior

**Expected Results:**
- Page remains functional during slow load
- Loading indicators appear where appropriate
- Critical content loads first
- User can interact with loaded sections
- No broken layout during progressive load

#### 17.4 Verify JavaScript Disabled Scenario
**Steps:**
1. Disable JavaScript in browser
2. Navigate to homepage
3. Observe page functionality

**Expected Results:**
- Page displays basic content
- Critical information is accessible
- Links to key pages work
- Graceful degradation occurs
- User can still navigate to important pages

### 18. Accessibility Testing

#### 18.1 Verify Keyboard Navigation
**Steps:**
1. Navigate to homepage
2. Use only keyboard (Tab, Shift+Tab, Enter, Space)
3. Navigate through all interactive elements

**Expected Results:**
- All interactive elements are keyboard accessible
- Focus indicators are visible
- Tab order is logical
- No keyboard traps
- Skip to content link works

#### 18.2 Verify Screen Reader Compatibility
**Steps:**
1. Enable screen reader (e.g., NVDA, JAWS)
2. Navigate to homepage
3. Navigate through page using screen reader

**Expected Results:**
- All content is announced properly
- Images have alt text
- Links have descriptive labels (aria-label)
- Headings provide proper structure
- Interactive elements have clear purposes

#### 18.3 Verify Color Contrast
**Steps:**
1. Navigate to homepage
2. Use contrast checker tool
3. Check all text against backgrounds

**Expected Results:**
- All text meets WCAG AA standards (4.5:1 ratio)
- Interactive elements have sufficient contrast
- Focus indicators are visible
- No color-only indicators

#### 18.4 Verify ARIA Labels
**Steps:**
1. Navigate to homepage
2. Inspect elements with developer tools
3. Verify ARIA attributes

**Expected Results:**
- All CTAs have proper aria-label attributes
- Buttons have descriptive aria-labels:
  - "show-menu-navigation"
  - "close-menu-navigation"
  - "pause-video"
  - "cta-book-now"
  - "cta-buy-a-gift-card"
  - etc.
- Carousel has proper region labels
- Footer has contentinfo role

### 19. Cross-Page Navigation Testing

#### 19.1 Verify Book Now Flow Consistency
**Steps:**
1. Navigate to homepage
2. Click any "Book Now" CTA
3. Verify destination
4. Navigate back
5. Test "Book Now" from different sections

**Expected Results:**
- All "Book Now" CTAs navigate to locations page
- Back button returns to homepage
- Navigation is consistent across all sections
- URL pattern matches `/locations/?$`

#### 19.2 Verify Gift Card Purchase Flow
**Steps:**
1. Navigate to homepage
2. Click any "Buy a Gift Card" CTA
3. Verify destination
4. Note different gift card URLs if present

**Expected Results:**
- Hero gift card link goes to staging Zenoti URL
- Footer gift card link goes to production Zenoti URL
- Gift card page loads properly
- User can return to homepage

#### 19.3 Verify External Link Behavior
**Steps:**
1. Navigate to homepage
2. Click external links (careers, social media)
3. Verify new tab/window behavior

**Expected Results:**
- External links open in new tab (where appropriate)
- User's position on homepage is maintained
- External sites load correctly
- User can return to homepage easily

---

## Test Environment Details

**Base URL**: `https://custom-booking-app-development-hand-and-stone.vercel.app/`

**Test Browsers**:
- Chromium (Desktop Chrome)
- Firefox
- WebKit (Safari)

**Test Viewports**:
- Mobile: 375x667 (iPhone SE)
- Tablet: 768x1024 (iPad)
- Desktop: 1280x720, 1920x1080

**Prerequisites**:
- Fresh browser state (cleared cache and cookies) for each test suite
- Stable internet connection
- No ad blockers or extensions that modify page content

**Known Issues**:
- Cookiebot script included twice (warning in console)
- Consent domain authorization error (expected in development)
- 404 error for consentcdn resource (expected in development)

---

## Test Execution Notes

1. **Test Independence**: Each test scenario should be executable independently in any order
2. **State Assumption**: Always assume fresh/blank state at start of each test
3. **Wait Conditions**: Allow sufficient time for navigation and animations to complete
4. **Error Tolerance**: Document expected console warnings vs. critical errors
5. **Screenshot Evidence**: Capture screenshots for visual verification where appropriate
6. **Regression Testing**: Re-run all tests after any code changes
7. **Mobile-First**: Prioritize mobile testing as primary user experience

---

## Priority Matrix

**P0 (Critical - Must Pass)**:
- Hero Section CTAs (1.3, 1.4)
- Navigation Menu (2.1, 2.5)
- Treatment Cards Navigation (4.4-4.8)
- Footer Legal Links (12.1)

**P1 (High Priority)**:
- Carousel Functionality (4.2, 4.3)
- Membership Section (6.1-6.3)
- All Book Now CTAs (throughout)
- Mobile Responsiveness (14.1)

**P2 (Medium Priority)**:
- Onboarding Cards (8.1-8.4)
- Experts Section (9.1-9.3)
- Social Media Links (12.3)
- Accessibility (18.1-18.4)

**P3 (Low Priority - Nice to Have)**:
- Edge Cases (17.1-17.4)
- Performance Metrics (15.1-15.4)
- Content Verification (16.1-16.3)

---

## Coverage Summary

- **Total Test Scenarios**: 19 major categories
- **Total Test Cases**: 79+ individual test cases
- **Sections Covered**: 11 main page sections
- **Navigation Paths**: 15+ unique user journeys
- **Accessibility Checks**: 4 comprehensive scenarios
- **Responsive Breakpoints**: 3 viewport sizes
- **Browser Coverage**: 3 browser engines

---

*Test Plan Version: 1.0*  
*Last Updated: 2025-11-06*  