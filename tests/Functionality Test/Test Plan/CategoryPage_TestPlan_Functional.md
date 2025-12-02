# Hand & Stone Category Page - Comprehensive Test Plan

## Application Overview

The Hand & Stone Category Page is a service-specific template page that users reach after selecting a treatment category from the homepage. This page provides detailed information about specific services within a category (e.g., Facials, Massages) and enables users to book appointments or learn more about individual treatments.

**Key Features**:

- **Category Hero Section**: Service-specific hero with treatment name, duration, key benefits, description, and primary booking CTA
- **Category Details Section**: Video/image content with "Why [Category]" information highlighting 3 main benefits
- **Intro Offer Banner**: Promotional banner showcasing first-time visitor offers
- **Service Cards Section**: Multiple service cards displaying individual treatments with images, benefits, descriptions, and dual CTAs (Learn More + Book Service)
- **Membership Banner**: Conversion-focused section encouraging membership signup
- **Service Carousel**: Related services carousel for cross-category exploration
- **Desktop Navigation**: Full navigation menu in header (vs mobile hamburger on homepage)
- **Footer**: Comprehensive footer with legal, service, and social links (shared with homepage)

**User Journey**:
Homepage → Click Treatment Card → Category Page → Select Specific Service → Book or Learn More

**Test URL**: `https://custom-booking-app-release-hand-and-stone.vercel.app/category-page-dummy/`

---

## Test Scenarios

### 1. Category Hero Section

#### 1.1 Verify Hero Section Initial Display
**Steps:**
1. Navigate to category page URL
2. Wait for page to fully load
3. Observe hero section at top of page

**Expected Results:**
- Hero section is visible with background image "Service Hero"
- Service name heading is displayed (e.g., "Hydrating Facial")
- Duration indicator shows (e.g., "50 mins") with clock icon
- 3 key benefits are listed with icons:
  - Each benefit has an icon
  - Each benefit has descriptive text (e.g., "Replenish Moisture", "Boost Elasticity", "Restore Complexion")
- Service description paragraph is visible
- Availability service tag is displayed with icon and text (e.g., "ASDFASDFG")
- "Book Service" CTA button is visible and prominent

#### 1.2 Verify Hero Service Duration Display
**Steps:**
1. Navigate to category page
2. Locate duration indicator in hero section
3. Verify icon and text display

**Expected Results:**
- Clock icon is visible
- Duration text displays (e.g., "50 mins")
- Duration is formatted consistently
- Icon and text are properly aligned

#### 1.3 Verify Hero Key Benefits Display
**Steps:**
1. Navigate to category page
2. Locate benefits list in hero section
3. Count and verify all benefits

**Expected Results:**
- Exactly 3 benefits are displayed as list items
- Each benefit has:
  - An icon/image
  - Descriptive text
- Benefits are relevant to the service
- Benefits are formatted as a vertical or horizontal list
- All icons load successfully

#### 1.4 Verify Hero Book Service CTA
**Steps:**
1. Navigate to category page
2. Locate "Book Service" button (aria-label: "cta-book-now")
3. Verify button state
4. Click "Book Service" button
5. Observe navigation

**Expected Results:**
- Button is visible and prominently displayed
- Button text reads "Book Service"
- Button is enabled and clickable
- Clicking navigates to locations page with service parameters
- URL includes query parameters:
  - `service_id` parameter present
  - `service_name` parameter present
  - Example: `/locations?service_id=291de098-85a6-43f8-bb96-a56407867b62&service_name=Himalayan+Salt+Stone+Massage`
- Locations page loads successfully

#### 1.5 Verify Hero Availability Tag Display
**Steps:**
1. Navigate to category page
2. Locate availability service tag in hero
3. Verify tag content

**Expected Results:**
- Availability tag container is visible
- Tag icon is displayed
- Tag text is readable (e.g., "ASDFASDFG" or actual availability message)
- Tag is properly styled and positioned

### 2. Header Navigation (Desktop)

#### 2.1 Verify Header Structure and Elements
**Steps:**
1. Navigate to category page
2. Observe header at top of page
3. Verify all header elements

**Expected Results:**
- Header is visible and fixed/sticky at top
- Logo is displayed on left side
- Main navigation menu is displayed (desktop view):
  - Services button
  - Membership button
  - Gift Cards button
  - Locations link
  - Franchise link
- Right-side elements are visible:
  - Account link with icon
  - Book button (primary CTA)
- Header layout is different from homepage (no hamburger menu)

#### 2.2 Verify Services Button Dropdown/Navigation
**Steps:**
1. Navigate to category page
2. Locate "Services" button in main navigation
3. Hover over or click Services button
4. Observe dropdown/menu behavior

**Expected Results:**
- Services button is visible and interactive
- Button has proper hover state
- Clicking/hovering opens services submenu or navigates
- Submenu (if present) shows service categories
- Button has aria-haspopup attribute
- Navigation is accessible via keyboard

#### 2.3 Verify Membership Button Navigation
**Steps:**
1. Navigate to category page
2. Locate "Membership" button in navigation
3. Click Membership button
4. Observe the Buy a Gift Card button
5. Click on the Buy a Gift Card button 
6. Observe the navigation

**Expected Results:**
- Membership button is visible and clickable
- Button Buy a Gift Card display
- Clicking on the Buy a Gift Card navigates to memberships page
- URL matches `/memberships/` pattern
- Memberships page loads successfully

#### 2.4 Verify Gift Card Button Navigation
**Steps:**
1. Navigate to category page
2. Locate "Gift Card" button in navigation
3. Click Gift Card button
4. Observe the Buy a Gift Card button
5. Click on the Buy a Gift Card button 
6. Observe the navigation

**Expected Results:**
- Gift Card button is visible and clickable
- Button Buy a Gift Card display
- Clicking on the Buy a Gift Card navigates to zenoti page
- URL matches https://handandstone.zenoti.com/webstoreNew/giftcards/5798a140-71a0-4983-bc1b-f3d0d0fc4b93
- Gift Card page loads successfully

#### 2.5 Verify Locations Link Navigation
**Steps:**
1. Navigate to category page
2. Locate "Locations" link in navigation
3. Click Locations link
4. Observe navigation

**Expected Results:**
- Locations link is visible
- Link points to `https://handandstone.com/locations/`
- Clicking navigates to locations page
- Locations page loads successfully

#### 2.6 Verify Franchise Link Navigation
**Steps:**
1. Navigate to category page
2. Locate "Franchise" link in navigation
3. Click Franchise link
4. Observe navigation

**Expected Results:**
- Franchise link is visible
- Link points to `https://handandstone.com/franchise/?SRC=consumer`
- Clicking navigates to franchise page
- Franchise page loads successfully (may open in new tab)

#### 2.7 Verify Account Link
**Steps:**
1. Navigate to category page
2. Locate "Account" link in header (right side)
3. Verify link display and functionality
4. Click Account link

**Expected Results:**
- Account link is visible with icon
- Link displays "Account" text
- Icon is visible
- Clicking navigates to Zenoti account page
- URL is `https://handandstone.zenoti.com/webstoreNew/guest/account`
- Account page loads successfully

#### 2.8 Verify Header Book Button (Primary CTA)
**Steps:**
1. Navigate to category page
2. Locate "Book" button in header (right side)
3. Click Book button
4. Observe navigation

**Expected Results:**
- Book button is visible and prominent
- Button displays "Book" text (aria-label: "cta-book-now")
- Button is styled as primary CTA
- Clicking navigates to `/locations`
- Locations page loads successfully

#### 2.9 Verify Logo Click Navigation
**Steps:**
1. Navigate to category page
2. Locate Hand & Stone logo in header
3. Click logo
4. Observe navigation

**Expected Results:**
- Logo is clickable
- Clicking returns user to homepage
- URL changes to homepage URL
- Homepage loads successfully

### 3. Category Details Section

#### 3.1 Verify Details Section Display
**Steps:**
1. Navigate to category page
2. Scroll to category details section (below hero)
3. Observe section content

**Expected Results:**
- Section displays category label (e.g., "Why Facials")
- Main heading is visible (e.g., "Your best skin, made simple.")
- Description paragraph is present
- Video player or background image is displayed
- Pause video button is visible (if video)
- Benefits list with 3 items is displayed
- "Book Now" CTA is visible at bottom

#### 3.2 Verify Video/Media Controls
**Steps:**
1. Navigate to category page
2. Scroll to details section
3. Locate video player (if present)
4. Locate pause button (aria-label: "pause-video")
5. Click pause button
6. Observe video behavior

**Expected Results:**
- Video plays automatically (if applicable)
- Pause button is visible and clickable
- Clicking pause button pauses video
- Button state changes to indicate video is paused
- Video controls are accessible

#### 3.3 Verify Details Benefits List
**Steps:**
1. Navigate to category page
2. Scroll to details section
3. Locate benefits list
4. Verify all 3 benefits are displayed

**Expected Results:**
- All 3 benefits are visible as list items
- Each benefit includes:
  - Benefit heading/label (e.g., "Made for your skin")
  - Benefit description paragraph (e.g., "Expert estheticians personalize your facial...")
- Benefits are properly formatted
- Text is readable
- Benefits are relevant to the category

#### 3.4 Verify Details Section Book Today CTA
**Steps:**
1. Navigate to category page
2. Scroll to details section
3. Locate "Book Today" link (aria-label: "cta-book-now")
4. Click link
5. Observe navigation

**Expected Results:**
- "Book Today" CTA is visible at bottom of section
- Link is clickable
- Clicking navigates to `/locations`
- Locations page loads successfully

### 4. Intro Offer Banner Section

#### 4.1 Verify Intro Offer Banner Display
**Steps:**
1. Navigate to category page
2. Scroll to intro offer banner section
3. Observe banner layout and content

**Expected Results:**
- Banner section is visible
- Left side displays image "Detailed Section Image"
- Right side displays content container
- Section label "intro offers" is visible (lowercase/styled)
- Heading "Your first glow awaits" is displayed
- Description paragraph is present
- "Book Now" CTA is visible

#### 4.2 Verify Intro Offer Banner Image
**Steps:**
1. Navigate to category page
2. Scroll to intro offer banner
3. Observe banner image on left

**Expected Results:**
- Image "Detailed Section Image" loads successfully
- Image is properly sized and positioned
- Image is visually appealing and relevant
- No broken image placeholders

#### 4.3 Verify Intro Offer Banner Content
**Steps:**
1. Navigate to category page
2. Scroll to intro offer banner
3. Read banner content

**Expected Results:**
- Section label displays "intro offers"
- Heading displays "Your first glow awaits"
- Description reads: "Experience our most-loved treatments at exclusive first-visit rates."
- Content is clear and compelling
- Text is properly formatted

#### 4.4 Verify Intro Offer Book Service CTA
**Steps:**
1. Navigate to category page
2. Scroll to intro offer banner
3. Locate "Book Service" link (aria-label: "cta-book-now")
4. Click link
5. Observe navigation

**Expected Results:**
- "Book Service" CTA is visible and prominent
- Link is clickable
- Clicking navigates to `/locations`
- Locations page loads successfully

### 5. Service Cards Section

#### 5.1 Verify Service Cards Section Header
**Steps:**
1. Navigate to category page
2. Scroll to service cards section
3. Observe section header

**Expected Results:**
- Section label is displayed (e.g., "Skincare Treatment")
- Main heading is visible (e.g., "Find your signature facial")
- Description paragraph is present
- Content is relevant to the category

#### 5.2 Verify Standard Service Card Display
**Steps:**
1. Navigate to category page
2. Scroll to service cards section
3. Locate first standard service card (e.g., "Classic Facial")
4. Observe card structure

**Expected Results:**
- Service card is displayed as article element
- Card includes service image "Service Card Image"
- Card heading displays service name (H4, e.g., "Classic Facial")
- Card shows 3 benefit tags with icons:
  - Each benefit has icon
  - Each benefit has text (e.g., "Sensitive skin", "Relaxation", "Redness relief")
- Card displays description paragraph
- Card shows 2 CTAs:
  - "Learn More" link
  - "Book Service" link
- Card layout is clean and organized

#### 5.3 Verify Service Card Benefits Display
**Steps:**
1. Navigate to category page
2. Scroll to service cards
3. Select any service card
4. Verify benefits list

**Expected Results:**
- Each service card shows exactly 3 benefits
- Benefits are displayed as list items
- Each benefit includes:
  - Icon/image
  - Descriptive text
- Benefits are horizontally or vertically aligned
- All icons load successfully
- Benefits are relevant to the service

#### 5.4 Verify Service Card Learn More CTA
**Steps:**
1. Navigate to category page
2. Scroll to service cards
3. Locate "Learn More" link on any service card
4. Click "Learn More"
5. Observe navigation

**Expected Results:**
- "Learn More" link is visible on service card
- Link is clickable and styled appropriately
- Clicking navigates to service detail page
- URL points to appropriate destination (varies by service)
- Target page loads successfully
- Some cards link to `https://handandstone.com/memberships/` (may be placeholder)
- Some cards link to service-specific pages (e.g., `https://handandstone.com/massage/deep-tissue-massage/`)

#### 5.5 Verify Service Card Book Service CTA
**Steps:**
1. Navigate to category page
2. Scroll to service cards
3. Locate "Book Service" link on any service card (aria-label: "cta-book-now")
4. Click "Book Service"
5. Observe navigation and URL parameters

**Expected Results:**
- "Book Service" link is visible on each service card
- Link is clickable and styled as primary CTA
- Clicking navigates to locations page
- URL includes service-specific query parameters:
  - `service_id` parameter (UUID format)
  - `service_name` parameter (URL-encoded)
  - Example: `/locations?service_id=291de098-85a6-43f8-bb96-a56407867b62&service_name=Himalayan+Salt+Stone+Massage`
- Locations page loads successfully
- Service context is preserved in URL

#### 5.6 Verify Advanced Service Section (if present)
**Steps:**
1. Navigate to category page
2. Scroll through service cards section
3. Locate "Advanced Facials" or similar subsection heading
4. Observe subsection structure

**Expected Results:**
- Subsection heading is displayed (H3, e.g., "Advanced Facials")
- Subsection description is present
- Advanced services are grouped separately from standard services
- Advanced service cards follow same structure as standard cards
- Visual distinction between standard and advanced services

#### 5.7 Verify Service Card with Different Layout (Full-Width)
**Steps:**
1. Navigate to category page
2. Scroll through service cards
3. Locate service cards with different layout (e.g., image on left, content on right)
4. Observe layout differences

**Expected Results:**
- Some service cards may have alternate layout
- Full-width cards display image on one side, content on other
- Card maintains same information structure
- Layout is responsive and visually balanced
- CTAs remain accessible

#### 5.8 Verify Multiple Service Cards Load Successfully
**Steps:**
1. Navigate to category page
2. Scroll through entire service cards section
3. Count total service cards
4. Verify all cards display properly

**Expected Results:**
- All service cards are visible (typically 3-7 cards)
- Each card loads completely
- All images load successfully
- All CTAs are functional
- No missing content or broken layouts
- Cards are consistently styled

### 6. Membership Banner Section

#### 6.1 Verify Membership Banner Display
**Steps:**
1. Navigate to category page
2. Scroll to membership banner section
3. Observe banner layout

**Expected Results:**
- Membership banner section is visible
- Banner displays background/hero image
- Heading "Make it a ritual" is displayed (H2)
- Description paragraph is visible: "Find calm you can count on. Become a member and save on every treatment."
- "Become a Member" CTA is prominent
- Banner is visually distinct from other sections

#### 6.2 Verify Membership Banner Image
**Steps:**
1. Navigate to category page
2. Scroll to membership banner
3. Observe banner background/hero image

**Expected Results:**
- Background image or hero image loads successfully
- Image is high quality and relevant
- Image enhances the membership message
- No broken image placeholders

#### 6.3 Verify Membership CTA Navigation
**Steps:**
1. Navigate to category page
2. Scroll to membership banner
3. Locate "Become a Member" link
4. Click link
5. Observe navigation

**Expected Results:**
- "Become a Member" link is visible and prominent
- Link is clickable
- Clicking navigates to memberships page
- URL is `https://handandstone.com/memberships/`
- Memberships page loads successfully

### 7. Service Carousel Section

#### 7.1 Verify Service Carousel Section Display
**Steps:**
1. Navigate to category page
2. Scroll to service carousel section (near bottom)
3. Observe section structure

**Expected Results:**
- Section displays label "Services"
- Heading "Treatments that restore you" is visible (H2)
- Description paragraph is present
- Carousel region is displayed
- Multiple service cards are visible in carousel
- Navigation buttons (Previous/Next) are visible
- Disclaimer text is displayed below carousel

#### 7.2 Verify Service Carousel Initial State
**Steps:**
1. Navigate to category page
2. Scroll to service carousel
3. Observe initial carousel state

**Expected Results:**
- Carousel displays 6 service cards:
  1. Facial (custom card with "1 hour" duration)
  2. Massages
  3. Hair Removal
  4. Injectables
  5. Toning
  6. Facials
- First few cards are visible (typically 3-4 depending on viewport)
- Previous button is disabled (at start position)
- Next button is enabled
- All visible cards display properly

#### 7.3 Verify Carousel Next Button Navigation
**Steps:**
1. Navigate to category page
2. Scroll to service carousel
3. Verify Next button is enabled
4. Click "Next" button
5. Observe carousel behavior

**Expected Results:**
- Next button is visible and clickable
- Clicking scrolls/shifts carousel content
- New service cards become visible
- Previous button becomes enabled
- Carousel navigation is smooth
- Cards maintain proper spacing

#### 7.4 Verify Carousel Previous Button Navigation
**Steps:**
1. Navigate to category page
2. Scroll to service carousel
3. Click "Next" button to enable Previous
4. Click "Previous" button
5. Observe carousel behavior

**Expected Results:**
- Previous button becomes enabled after clicking Next
- Previous button is clickable
- Clicking scrolls carousel backward
- Previously visible cards return to view
- If at start position, Previous button disables
- Navigation is smooth and responsive

#### 7.5 Verify Carousel Service Card Structure
**Steps:**
1. Navigate to category page
2. Scroll to service carousel
3. Observe individual service cards in carousel
4. Verify card structure

**Expected Results:**
- Each carousel card displays:
  - Service image (e.g., "Category Page Carousel Massages")
  - Service name (e.g., "Massages")
  - Service description (e.g., "Soothe your body and mind...")
  - Arrow/chevron button for interaction
- First card (Facial) has additional duration indicator ("1 hour")
- Cards are consistently styled
- All images load successfully

#### 7.6 Verify Carousel Card Interaction
**Steps:**
1. Navigate to category page
2. Scroll to service carousel
3. Locate any service card button (e.g., "View details for Massages")
4. Click service card button
5. Observe navigation

**Expected Results:**
- Each carousel card is clickable button
- Button has descriptive aria-label (e.g., "View details for Massages")
- Clicking navigates to corresponding service category page
- URL changes to service-specific page (e.g., `/massage/`)
- Target category page loads successfully

#### 7.7 Verify Carousel Disclaimer Text
**Steps:**
1. Navigate to category page
2. Scroll to service carousel
3. Locate disclaimer text below carousel

**Expected Results:**
- Disclaimer text is visible: "*Disclaimer test" (or actual disclaimer)
- Text is properly formatted with asterisk
- Text is readable
- Text is positioned below carousel

#### 7.8 Verify Carousel Responsive Behavior
**Steps:**
1. Navigate to category page
2. Scroll to service carousel
3. Resize browser window or test on different viewports
4. Observe carousel adaptation

**Expected Results:**
- Carousel adapts to viewport size
- Fewer cards visible on mobile (1-2)
- More cards visible on tablet/desktop (3-4)
- Navigation buttons remain accessible
- Card sizing adjusts appropriately
- No horizontal overflow or broken layout

### 8. Footer Section

#### 8.1 Verify Footer Display and Structure
**Steps:**
1. Navigate to category page
2. Scroll to bottom of page
3. Observe footer

**Expected Results:**
- Footer is visible with background image "Global Footer BG"
- Breadcrumbs navigation shows: "Home • category page dummy"
- Hand & Stone logo is displayed
- Footer is organized into 4 sections:
  - About Us (8 links)
  - SERVICES (5 links)
  - MEMBERSHIP (2 links)
  - TERMS & CONDITIONS (5 links)
- Social media icons are visible (6 icons)
- Privacy policy links are displayed
- Copyright text is visible
- Disclaimer paragraphs are present

#### 8.2 Verify Footer Breadcrumbs
**Steps:**
1. Navigate to category page
2. Scroll to footer
3. Locate breadcrumbs navigation
4. Verify breadcrumb structure

**Expected Results:**
- Breadcrumbs display: "Home • category page dummy"
- "Home" is a clickable link
- Separator bullet (•) is visible
- Current page name is displayed (not clickable)
- Clicking "Home" navigates to homepage

#### 8.3 Verify Footer About Us Links
**Steps:**
1. Navigate to category page
2. Scroll to footer
3. Locate "About Us" section
4. Verify all links are present and functional

**Expected Results:**
- All 8 About Us links are visible:
  - Our Story → `/our-story/`
  - Locations → `/locations/`
  - Own A Franchise → `/franchise/?SRC=consumer`
  - Join the Team → `https://handandstonecareers.com/`
  - Touchpoints: News & Blog → `/touchpoints/`
  - Health & Safety → `/health-safety/`
  - Hand & Stone Canada → `https://handandstone.ca/`
  - Contact Us → Feedback form URL
- All links are clickable
- External links open appropriately

#### 8.4 Verify Footer Services Links
**Steps:**
1. Navigate to category page
2. Scroll to footer
3. Locate "SERVICES" section
4. Test service links

**Expected Results:**
- All 5 service links are present:
  - Massages → `/massage/`
  - Facials → `/facials/`
  - Toning → `/body-toning/`
  - Injectables → `/injectables/`
  - Hair Removal → `/hair-removal/`
- All links navigate correctly
- Category pages load successfully

#### 8.5 Verify Footer Membership Links
**Steps:**
1. Navigate to category page
2. Scroll to footer
3. Locate "MEMBERSHIP" section
4. Test membership links

**Expected Results:**
- 2 membership links are present:
  - Explore Memberships → `/memberships/`
  - Reward Points Terms & Conditions → rewards terms page
- Links are functional
- Target pages load successfully

#### 8.6 Verify Footer Terms & Conditions Links
**Steps:**
1. Navigate to category page
2. Scroll to footer
3. Locate "TERMS & CONDITIONS" section
4. Verify all legal links

**Expected Results:**
- All 5 legal links are present:
  - Customer Bill of Rights
  - Gift Card Program Terms & Conditions
  - California Residents
  - Rules, Terms & Conditions
  - Policy on Non Discrimination & Gender Identity
- All links point to `/legal/` subdirectory
- Links are clickable and load properly

#### 8.7 Verify Footer Social Media Links
**Steps:**
1. Navigate to category page
2. Scroll to footer
3. Locate social media icons
4. Verify all social links

**Expected Results:**
- All 6 social media icons are visible with links:
  - Instagram → `https://www.instagram.com/handandstoneusa/`
  - Facebook → `https://www.facebook.com/handandstoneusa/`
  - X/Twitter → `https://www.twitter.com/handandstoneusa`
  - LinkedIn → Company LinkedIn page
  - YouTube → `https://www.youtube.com/user/handandstone`
  - TikTok → `https://www.tiktok.com/@handandstoneusa`
- Icons load successfully
- Links are clickable
- Links open to correct social profiles

#### 8.8 Verify Footer Privacy Links
**Steps:**
1. Navigate to category page
2. Scroll to footer bottom
3. Locate privacy-related links
4. Test privacy links

**Expected Results:**
- 3 privacy links are visible:
  - Privacy Policy → `/legal/privacy-policy/`
  - Cookie Policy → `/legal/cookie-policy/`
  - Consent Preferences → Opens consent modal
- All links are functional
- Consent Preferences triggers modal (not navigation)

#### 8.9 Verify Footer Copyright and Disclaimers
**Steps:**
1. Navigate to category page
2. Scroll to footer bottom
3. Read copyright and disclaimer text

**Expected Results:**
- Copyright displays: "@ 2025 Hand & Stone Franchise Corp."
- 3 disclaimer paragraphs are visible:
  - Introductory offers disclaimer
  - Enhancements disclaimer
  - Age restrictions and medical conditions disclaimer
- Text is readable and properly formatted
- All disclaimers are complete

### 9. Cross-Page Navigation & User Flows

#### 9.1 Verify Homepage to Category Page Flow
**Steps:**
1. Navigate to homepage
2. Click any treatment category card (e.g., "Facials")
3. Observe navigation to category page
4. Verify page loads correctly

**Expected Results:**
- Clicking treatment card navigates to category page
- URL changes to category-specific path (e.g., `/facials/`)
- Category page loads with relevant content
- Page title updates
- Back button returns to homepage

#### 9.2 Verify Category Page to Service Detail Flow
**Steps:**
1. Navigate to category page
2. Click "Learn More" on any service card
3. Observe navigation to service detail page
4. Verify content is service-specific

**Expected Results:**
- Clicking "Learn More" navigates to service detail page
- URL changes to service-specific path
- Service detail page loads with detailed information
- Back button returns to category page
- Navigation context is maintained

#### 9.3 Verify Category Page to Booking Flow
**Steps:**
1. Navigate to category page
2. Click any "Book Service" CTA
3. Observe navigation to locations page
4. Verify service context is preserved

**Expected Results:**
- Clicking "Book Service" navigates to locations page
- URL includes service parameters (service_id, service_name)
- Locations page may pre-select or highlight the chosen service
- User can proceed with booking
- Back button returns to category page

#### 9.4 Verify Category Page to Membership Flow
**Steps:**
1. Navigate to category page
2. Click "Become a Member" in membership banner
3. Observe navigation to memberships page
4. Verify memberships page loads

**Expected Results:**
- Clicking navigates to memberships page
- Memberships page displays membership options and benefits
- User can explore membership details
- Back button returns to category page

#### 9.5 Verify Cross-Category Navigation via Carousel
**Steps:**
1. Navigate to any category page (e.g., Facials)
2. Scroll to service carousel
3. Click different service category card (e.g., "Massages")
4. Observe navigation to different category page

**Expected Results:**
- Clicking carousel card navigates to new category page
- URL changes to new category path
- New category page loads with appropriate content
- User can explore multiple categories
- Browser history tracks navigation

### 10. Responsive Design & Viewport Testing

#### 10.1 Verify Mobile Viewport (375x667)
**Steps:**
1. Set viewport to mobile size (375x667)
2. Navigate to category page
3. Scroll through all sections
4. Test interactions

**Expected Results:**
- All sections adapt to mobile layout
- Hero section stacks vertically
- Service cards display one per row
- Carousel shows 1-2 cards at a time
- Navigation buttons remain accessible
- Footer sections stack vertically
- All CTAs are tappable (min 44x44px)
- No horizontal scrolling
- Text remains readable

#### 10.2 Verify Tablet Viewport (768x1024)
**Steps:**
1. Set viewport to tablet size (768x1024)
2. Navigate to category page
3. Observe layout adaptations

**Expected Results:**
- Layout adapts for tablet size
- Service cards display 2 per row
- Carousel shows 2-3 cards
- Navigation remains accessible
- Images scale appropriately
- Footer has intermediate layout
- Touch targets are appropriate

#### 10.3 Verify Desktop Viewport (1920x1080)
**Steps:**
1. Set viewport to large desktop (1920x1080)
2. Navigate to category page
3. Verify layout scaling

**Expected Results:**
- Full desktop navigation is visible in header
- Hero section uses horizontal layout
- Service cards display 2-3 per row
- Carousel shows 3-4 cards
- Content is centered with max-width
- Images display at full quality
- No excessive white space
- Footer displays full multi-column layout

#### 10.4 Verify Header Navigation Breakpoint
**Steps:**
1. Gradually resize viewport from mobile to desktop
2. Observe header navigation changes
3. Note breakpoint where navigation switches

**Expected Results:**
- Header switches from mobile (hamburger) to desktop navigation at specific breakpoint
- Transition is smooth
- All navigation items remain accessible
- No broken layouts during transition
- Breakpoint is appropriate (typically 768px or 1024px)

### 11. Accessibility Testing

#### 11.1 Verify Keyboard Navigation
**Steps:**
1. Navigate to category page
2. Use Tab key to navigate through all interactive elements
3. Use Enter/Space to activate buttons and links
4. Verify focus indicators

**Expected Results:**
- All interactive elements are keyboard accessible
- Tab order is logical (top to bottom, left to right)
- Focus indicators are visible on all elements
- Enter key activates links and buttons
- Space key activates buttons
- No keyboard traps
- Skip to content link works

#### 11.2 Verify ARIA Labels and Semantic HTML
**Steps:**
1. Navigate to category page
2. Inspect elements with developer tools
3. Verify ARIA attributes and semantic elements

**Expected Results:**
- All CTAs have descriptive aria-labels:
  - "cta-book-now"
  - "cta-learn-more"
  - "pause-video"
- Carousel has proper region label
- Service cards use article elements
- Headings use proper hierarchy (H1 → H2 → H3 → H4)
- Lists use proper ul/ol/li elements
- Images have alt text
- Navigation uses nav element
- Footer uses contentinfo role

#### 11.3 Verify Screen Reader Experience
**Steps:**
1. Enable screen reader (NVDA, JAWS, VoiceOver)
2. Navigate through category page
3. Listen to content announcements

**Expected Results:**
- All content is announced properly
- Images have descriptive alt text
- Links announce their purpose and destination
- Buttons announce their action
- Headings provide clear structure
- Lists are announced with item count
- Forms (if any) have proper labels
- Focus changes are announced

#### 11.4 Verify Color Contrast
**Steps:**
1. Navigate to category page
2. Use contrast checker tool (e.g., axe DevTools)
3. Check all text and interactive elements

**Expected Results:**
- All text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Button text has sufficient contrast
- Link text is distinguishable
- Focus indicators meet 3:1 contrast ratio
- No color-only information conveyance
- Icons have sufficient contrast

#### 11.5 Verify Focus Management
**Steps:**
1. Navigate to category page
2. Click various CTAs that navigate to new pages
3. Observe focus handling after navigation
4. Test modal interactions (if any)

**Expected Results:**
- Focus is managed appropriately during navigation
- After page load, focus is set to logical starting point
- Modal opening sets focus to first element in modal
- Modal closing returns focus to trigger element
- No focus loss during interactions
- Focus is never set to disabled elements

### 12. Performance & Loading

#### 12.1 Verify Page Load Performance
**Steps:**
1. Clear browser cache
2. Navigate to category page
3. Measure load time with DevTools Performance tab
4. Observe loading sequence

**Expected Results:**
- Page loads within acceptable time (< 3 seconds for hero content)
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.5s
- No blocking resources prevent interaction
- Critical content loads first

#### 12.2 Verify Image Loading and Optimization
**Steps:**
1. Navigate to category page
2. Open Network tab
3. Filter by Images
4. Observe image loading

**Expected Results:**
- All images load successfully
- Images are properly sized (not oversized)
- Images use modern formats (WebP, AVIF) with fallbacks
- Below-fold images use lazy loading
- Image HTTP status codes are 200
- No broken images (404 errors)
- Images have reasonable file sizes
- Responsive images serve appropriate sizes

#### 12.3 Verify Lazy Loading Implementation
**Steps:**
1. Navigate to category page
2. Observe initial page load
3. Slowly scroll down page
4. Monitor Network tab for image loads

**Expected Results:**
- Above-fold images load immediately
- Below-fold images load as user scrolls near them
- Lazy loading improves initial page load time
- No visual jumping as images load
- Placeholder dimensions prevent layout shift

#### 12.4 Verify Network Request Efficiency
**Steps:**
1. Navigate to category page
2. Open Network tab
3. Observe all network requests
4. Check for failed requests or inefficiencies

**Expected Results:**
- Reasonable number of requests (< 100)
- No failed requests (except known third-party issues)
- CSS and JS are bundled/minified
- Resources are cached appropriately
- No duplicate resource requests
- CDN is used for static assets
- HTTP/2 or HTTP/3 is used

### 13. Content Verification

#### 13.1 Verify Dynamic Content Rendering
**Steps:**
1. Navigate to category page
2. Verify all content sections display
3. Check for placeholder or Lorem Ipsum text

**Expected Results:**
- All content is real and relevant (no placeholder text)
- Service names match category
- Descriptions are accurate and helpful
- Benefits are specific and meaningful
- Prices (if shown) are current
- No "Lorem Ipsum" or "Test Content" visible

#### 13.2 Verify Service-Specific Content
**Steps:**
1. Navigate to different category pages (Facials, Massages, etc.)
2. Compare content across pages
3. Verify content is category-appropriate

**Expected Results:**
- Each category page has unique, relevant content
- Service cards match the category
- Hero image and text are category-specific
- Benefits relate to the service type
- Related services in carousel make sense
- No generic or copied content

#### 13.3 Verify CTA Consistency
**Steps:**
1. Navigate to category page
2. Identify all CTAs on page
3. Verify CTA text and destinations are consistent

**Expected Results:**
- "Book Service" CTAs all navigate to locations with parameters
- "Learn More" CTAs navigate to relevant detail pages
- "Become a Member" CTAs navigate to memberships page
- CTA text is consistent across similar actions
- Button styling is consistent for same action types

### 14. Error Handling & Edge Cases

#### 14.1 Verify Page Behavior with Slow Network
**Steps:**
1. Simulate slow 3G connection in DevTools
2. Navigate to category page
3. Observe loading behavior and user experience

**Expected Results:**
- Page remains functional during slow load
- Loading indicators show where appropriate
- Critical content (hero) loads first
- User can interact with loaded sections
- No broken layout during progressive load
- Timeout errors don't break page

<!-- #### 14.2 Verify Invalid Category URL Handling
**Steps:**
1. Navigate to invalid category URL (e.g., `/category-page-nonexistent/`)
2. Observe response

**Expected Results:**
- 404 page displays (if URL doesn't exist)
- OR page redirects to valid category
- OR default/template content loads
- User is not left with broken page
- Navigation to valid pages remains available -->

#### 14.3 Verify JavaScript Disabled Scenario
**Steps:**
1. Disable JavaScript in browser
2. Navigate to category page
3. Observe content and functionality

**Expected Results:**
- Static content displays
- Images load
- Basic information is accessible
- Links work (non-JS navigation)
- Carousels show at least some items
- Graceful degradation occurs
- Critical CTAs remain clickable

#### 14.4 Verify Carousel Edge Cases
**Steps:**
1. Navigate to category page
2. Rapidly click carousel Next button multiple times
3. Click Previous at start position
4. Click Next at end position

**Expected Results:**
- Rapid clicks don't break carousel
- Previous button properly disabled at start
- Next button properly disabled at end (if applicable)
- No console errors
- Carousel animation remains smooth
- No visual glitches

#### 14.5 Verify Video/Media Failure Handling
**Steps:**
1. Navigate to category page
2. Block video resource or simulate failure
3. Observe section behavior

**Expected Results:**
- Page doesn't break if video fails to load
- Fallback image displays
- Pause button handles missing video gracefully
- Section content remains accessible
- No JavaScript errors break page
- User can continue using page

### 15. Cross-Browser Compatibility

#### 15.1 Verify Chrome/Chromium Behavior
**Steps:**
1. Open category page in Chrome
2. Test all functionality
3. Check for Chrome-specific issues

**Expected Results:**
- All features work correctly
- Styling renders properly
- Animations are smooth
- No console errors
- Video/media plays correctly

#### 15.2 Verify Firefox Behavior
**Steps:**
1. Open category page in Firefox
2. Test all functionality
3. Check for Firefox-specific issues

**Expected Results:**
- All features work correctly
- Flexbox/Grid layouts render properly
- CSS variables work
- Carousel functions correctly
- No Firefox-specific errors

#### 15.3 Verify Safari/WebKit Behavior
**Steps:**
1. Open category page in Safari
2. Test all functionality
3. Check for Safari-specific issues

**Expected Results:**
- All features work correctly
- -webkit- prefixes work where needed
- Video formats are supported
- Date/time inputs work (if any)
- No Safari-specific rendering issues

#### 15.4 Verify Edge Browser Behavior
**Steps:**
1. Open category page in Microsoft Edge
2. Test all functionality
3. Verify Chromium Edge compatibility

**Expected Results:**
- All features work identically to Chrome
- Legacy Edge issues don't affect Chromium Edge
- No Edge-specific problems

### 16. SEO & Meta Information

#### 16.1 Verify Page Title
**Steps:**
1. Navigate to category page
2. Check browser tab title
3. Inspect `<title>` tag

**Expected Results:**
- Page title is descriptive (e.g., "Category Page Dummy" or actual category name)
- Title includes brand name "Hand & Stone"
- Title is unique per category
- Title length is appropriate (< 60 characters)

#### 16.2 Verify Meta Description
**Steps:**
1. Navigate to category page
2. View page source
3. Check `<meta name="description">` tag

**Expected Results:**
- Meta description is present
- Description is relevant to category
- Description length is 150-160 characters
- Description is compelling and informative

#### 16.3 Verify Heading Hierarchy
**Steps:**
1. Navigate to category page
2. Inspect heading elements
3. Verify H1-H6 structure

**Expected Results:**
- One H1 per page (category name in hero)
- H2 tags for main sections
- H3 tags for subsections
- H4 tags for service cards
- No skipped heading levels
- Logical hierarchy maintained

#### 16.4 Verify Canonical URL
**Steps:**
1. Navigate to category page
2. View page source
3. Check `<link rel="canonical">` tag

**Expected Results:**
- Canonical URL is present
- Canonical points to correct category URL
- No duplicate content issues
- URL is absolute, not relative

#### 16.5 Verify Open Graph Tags
**Steps:**
1. Navigate to category page
2. View page source
3. Check for Open Graph meta tags

**Expected Results:**
- `og:title` is present and descriptive
- `og:description` is present
- `og:image` points to relevant category image
- `og:url` is correct
- `og:type` is set appropriately
- Tags enable proper social sharing

### 17. Analytics & Tracking

#### 17.1 Verify Google Analytics Implementation
**Steps:**
1. Navigate to category page
2. Open browser DevTools → Network tab
3. Filter for analytics requests
4. Check for GA pageview

**Expected Results:**
- GA script loads
- Pageview event fires
- Correct page path is tracked
- User interactions can be tracked
- No analytics errors in console

#### 17.2 Verify CTA Click Tracking
**Steps:**
1. Navigate to category page
2. Enable analytics debug mode or monitor Network
3. Click various CTAs
4. Verify tracking events fire

**Expected Results:**
- "Book Service" clicks are tracked
- "Learn More" clicks are tracked
- Carousel interactions are tracked
- Event data includes relevant context
- No duplicate events fire

#### 17.3 Verify Third-Party Integrations
**Steps:**
1. Navigate to category page
2. Check Network tab for third-party requests
3. Verify integrations load properly

**Expected Results:**
- Expected third-party scripts load
- Cookiebot (consent management) loads
- Marketing pixels fire (if applicable)
- No broken third-party requests cause errors
- Third-party failures don't break page

---

## Test Environment Details

**Base URL**: `https://custom-booking-app-release-hand-and-stone.vercel.app/`  
**Template URL**: `https://custom-booking-app-release-hand-and-stone.vercel.app/category-page-dummy/`  
**Category-Specific URLs**: `/massage/`, `/facials/`, `/body-toning/`, `/injectables/`, `/hair-removal/`

**Test Browsers**:
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari/WebKit (latest)
- Microsoft Edge (latest)

**Test Viewports**:
- Mobile: 375x667 (iPhone SE), 414x896 (iPhone 11)
- Tablet: 768x1024 (iPad), 820x1180 (iPad Air)
- Desktop: 1280x720, 1920x1080, 2560x1440

**Prerequisites**:
- Fresh browser state (cleared cache and cookies)
- Stable internet connection
- No browser extensions that modify content
- JavaScript enabled (except for degradation tests)

**Known Issues**:
- Cookiebot script included twice (console warning)
- Consent domain authorization error in non-production
- Some placeholder content (e.g., "ASDFASDFG" availability tag)
- Some "Learn More" links point to placeholder URLs

---

## Priority Matrix

**P0 (Critical - Must Pass)**:
- Hero Section Display and Book CTA (1.1, 1.4)
- Service Cards Display and CTAs (5.2, 5.4, 5.5)
- Navigation Header Elements (2.1, 2.8)
- Footer Legal Links (8.6)
- Mobile Responsiveness (10.1)

**P1 (High Priority)**:
- Category Details Section (3.1, 3.4)
- Intro Offer Banner (4.1, 4.4)
- Service Carousel (7.1, 7.3, 7.6)
- Membership Banner (6.1, 6.3)
- Cross-Page Navigation (9.1, 9.3)
- Keyboard Accessibility (11.1)

**P2 (Medium Priority)**:
- Video/Media Controls (3.2)
- Advanced Service Sections (5.6)
- Desktop Navigation Dropdown (2.2)
- Carousel Edge Cases (14.4)
- Screen Reader Compatibility (11.3)
- Image Loading Performance (12.2)

**P3 (Low Priority)**:
- Breadcrumbs (8.2)
- Social Media Links (8.7)
- SEO Meta Tags (16.1-16.5)
- Analytics Tracking (17.1-17.3)
- Content Consistency (13.2)

---

## Coverage Summary

- **Total Test Scenarios**: 17 major categories
- **Total Test Cases**: 102 individual test cases
- **Page Sections Covered**: 7 main sections (Hero, Details, Banner, Service Cards, Membership, Carousel, Footer)
- **Navigation Tests**: 15+ navigation flows
- **Responsive Tests**: 3 viewport sizes
- **Accessibility Tests**: 5 comprehensive scenarios
- **Browser Coverage**: 4 major browsers
- **Performance Tests**: 4 load and optimization scenarios
- **Error Handling Tests**: 5 edge case scenarios

---

## Test Execution Guidelines

1. **Test Order**: Execute tests top-to-bottom for initial run; for regression, prioritize P0/P1
2. **State Management**: Clear cookies/cache before each test suite
3. **Documentation**: Screenshot failures and document unexpected behavior
4. **Real URLs**: Test against actual category pages (not just dummy template)
5. **Service Variations**: Test multiple service types (Massages, Facials, etc.) to ensure template works universally
6. **Booking Flow**: Follow through to locations page to verify end-to-end flow
7. **Regression**: Re-run all P0/P1 tests after any code changes

---

## Comparison with Homepage Test Plan

**Similarities**:
- Footer structure and links (identical)
- Accessibility requirements
- Performance expectations
- Browser/viewport coverage

**Differences**:
- **Navigation**: Category page has desktop menu vs homepage hamburger
- **Hero**: Category hero shows specific service vs generic homepage hero
- **Service Cards**: Multiple detailed cards vs carousel overview on homepage
- **Focus**: Category page is conversion-focused (Book Service) vs homepage is exploratory
- **Content Depth**: More detailed service information on category page

---

## References

- [Homepage Test Plan](./HandAndStone_TestPlan.md) - For comparison and shared components
- [Hand & Stone Category Page (Dummy)](https://custom-booking-app-release-hand-and-stone.vercel.app/category-page-dummy/) - Template page
- [Hand & Stone Massage Category](https://custom-booking-app-release-hand-and-stone.vercel.app/massage/) - Live category example (reference)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards

---

*Test Plan Version: 1.0*  
*Last Updated: 2025-11-13*  
*Created by:*  
*Page Type: Category/Service Template Page*

