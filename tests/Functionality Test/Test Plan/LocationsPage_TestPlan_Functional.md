# Hand & Stone Locations Page - Comprehensive Test Plan

## Application Overview

The Hand & Stone Locations Page is a location finder and booking interface that enables users to search for and select spa locations across 600+ nationwide locations. The page features an enhanced in-memory search system with intelligent Google Places API fallback, providing fast local search with seamless fallback for broader location queries.

**Key Features**:

- **In-Memory Index Search**: Fast local search across all H&T spa data (names, cities, states, ZIP codes) loaded on page initialization
- **Smart Autocomplete**: Shows local suggestions immediately when matches are found (no API delay)
- **Google Places Fallback**: Automatically falls back to Google Places API when no local matches exist
- **Intelligent Radius Filtering**: 200 miles for states, 50 miles for cities/ZIP codes/addresses
- **Geographic Center Calculation**: Map centers on calculated center of H&T spas in searched area
- **Location Search**: Text input with autocomplete for ZIP code, city, address, or state
- **Geolocation Support**: "Use my current location" button for automatic location detection
- **Interactive Google Maps**: Full map integration with location markers and clusters
- **Location Markers**: Numbered markers/clusters showing location counts per area
- **Map Controls**: Zoom in/out, "My Location" button, and "Open in Google Maps" link
- **Location Selection**: Click markers or search results to view location details
- **Service Context Preservation**: URL parameters (service_id, service_name) from category pages
- **Header Navigation**: Global navigation menu with logo, Book button (same as other pages)
- **Footer**: Comprehensive footer with legal, service, and social links (shared with other pages)

**User Journey**:
Homepage/Category Page → Click "Book Now" or "Book Service" → Locations Page → Search/Select Location → View Location Details → Book Appointment

**Test URL**: `https://custom-booking-app-release-hand-and-stone.vercel.app/locations/`

---

## Test Scenarios

### 1. Page Load & Initial Display

#### 1.1 Verify Page Loads Successfully
**Steps:**
1. Navigate to locations page at `https://custom-booking-app-release-hand-and-stone.vercel.app/locations/`
2. Wait for page to fully load
3. Observe initial page state

**Expected Results:**
- Page loads without errors
- URL matches `/locations/` pattern
- Page title displays "Hand & Stone" (or appropriate title)
- All main sections are visible:
  - Header navigation
  - Search section with input field
  - Map region
  - Footer
- No console errors (except known third-party warnings)

#### 1.2 Verify Page Initial State Without Search
**Steps:**
1. Navigate to locations page
2. Observe page before any search input
3. Check map default state

**Expected Results:**
- Search input field is empty and focused/ready for input
- "Use my current location" button is visible
- Map displays with default zoom level
- Location markers/clusters are visible on map
- Map shows all Hand & Stone locations initially
- Map attribution is visible

#### 1.3 Verify Header Navigation Display
**Steps:**
1. Navigate to locations page
2. Observe header section
3. Verify all header elements

**Expected Results:**
- Header is visible at top of page
- Menu button (hamburger icon) is visible on mobile (aria-label: "show-menu-navigation")
- Hand & Stone logo is visible and clickable
- "Book" button/CTA is visible in header (aria-label: "cta-book-now")
- Header layout matches other pages (homepage, category page)
- Header is sticky/fixed at top during scroll

#### 1.4 Verify Footer Display
**Steps:**
1. Navigate to locations page
2. Scroll to bottom of page
3. Observe footer section

**Expected Results:**
- Footer is visible with background image "Global Footer BG"
- Breadcrumbs display: "Home • locations"
- Hand & Stone logo is present
- Footer sections are organized:
  - About Us (8 links)
  - SERVICES (5 links)
  - MEMBERSHIP (2 links)
  - TERMS & CONDITIONS (5 links)
- Social media icons are visible (6 platforms)
- Privacy policy links are present
- Copyright and disclaimer text are displayed
- Footer matches structure from other pages

### 2. Location Search Functionality

#### 2.0 Verify In-Memory Index Loads on Page Initialization
**Steps:**
1. Navigate to locations page
2. Open browser developer tools (Network tab)
3. Wait for page to fully load
4. Verify network requests

**Expected Results:**
- Page loads successfully
- Network request to `/api/center/get-all/` is made on page load
- Request returns 200 status code with spa location index data
- Index data is loaded into memory for local search
- No errors in console related to index loading
- Page is ready for immediate local search without API delays

#### 2.1 Verify Search Input Field Display
**Steps:**
1. Navigate to locations page
2. Locate search input field
3. Verify input field properties

**Expected Results:**
- Search input field is visible
- Placeholder text displays: "Enter ZIP, City, Address or State"
- Input field has proper label/aria-label
- Input field is accessible (can be focused via keyboard)
- Input field is empty on initial load
- Input type is "text" or "search"

#### 2.2 Verify Search Input Focus Behavior
**Steps:**
1. Navigate to locations page
2. Click in search input field
3. Observe input behavior

**Expected Results:**
- Input field can be focused by clicking
- Focus indicator is visible (border highlight or similar)
- Cursor appears in input field
- Input field is ready to accept text
- No autocomplete suggestions appear until typing begins

#### 2.3 Verify Local Autocomplete Suggestions Display (H&T Spa Locations)
**Steps:**
1. Navigate to locations page
2. Click in search input field
3. Type "New York" (known location with H&T spas)
4. Observe autocomplete behavior
5. Check Network tab for API calls

**Expected Results:**
- Local suggestions appear immediately (< 500ms, no API delay)
- Suggestions are retrieved from in-memory index (no Google Places API call)
- Network tab shows NO requests to `maps.googleapis.com/maps/api/place/autocomplete`
- Suggestions show format: "City Name ST" (e.g., "New York NY")
- Suggestions appear as user types (case-insensitive matching)
- Suggestions are clickable/selectable
- Multiple suggestions may appear if multiple cities/locations match
- Suggestions are relevant to input text

#### 2.4 Verify Google Places API Fallback (Non-H&T Locations)
**Steps:**
1. Navigate to locations page
2. Type a location with no H&T spas (e.g., "Paris, France" or specific address)
3. Observe autocomplete behavior
4. Check Network tab for API calls

**Expected Results:**
- No local index matches are found (0 matches)
- System automatically falls back to Google Places API autocomplete
- Network tab shows request to Google Places AutocompleteService
- Google Places suggestions appear in dropdown
- Suggestions show full addresses/location details
- Suggestions are formatted per Google Places standards
- User can select from Google Places suggestions
- Fallback happens seamlessly without errors

#### 2.5 Verify Autocomplete Suggestion Selection - Local Index
**Steps:**
1. Navigate to locations page
2. Type "New York" in search input
3. Wait for local autocomplete suggestions to appear
4. Click on a local suggestion (e.g., "New York NY")
5. Observe page behavior

**Expected Results:**
- Clicking suggestion selects it
- Selected location is entered into search field
- Search is executed automatically
- Map centers on geographic center of all H&T spas in that area
- Map zoom adjusts appropriately for the area size
- Location markers update to show spas within radius
- Results list appears showing filtered spa locations
- Each result displays: spa name, address, phone, "Book Now" button

#### 2.6 Verify Autocomplete Suggestion Selection - Google Places
**Steps:**
1. Navigate to locations page
2. Type a specific address (e.g., "123 Main St, Anytown")
3. Wait for Google Places suggestions
4. Click on a Google Places suggestion
5. Observe page behavior

**Expected Results:**
- Clicking suggestion selects it
- System retrieves lat/lng coordinates from Google Places
- Map centers on selected address coordinates
- Map shows H&T spas within 50-mile radius of address
- Results list displays nearby spa locations (within 50 miles)
- If no spas within radius, appropriate message displays

#### 2.7 Verify Search with ZIP Code (H&T Spa Location)
**Steps:**
1. Navigate to locations page
2. Enter a ZIP code with H&T spas (e.g., "90210") in search input
3. Observe autocomplete and search results
4. Check Network tab for API calls

**Expected Results:**
- Local index suggests ZIP code immediately
- NO Google Places API call is made (local index match)
- Search executes successfully
- Map centers on geographic center of spas in that ZIP area
- Map shows locations within 50-mile radius of ZIP code
- Location markers/clusters update
- Results list displays spas within 50-mile radius
- Distance filtering is accurate (50 miles for ZIP codes)

#### 2.8 Verify Search with ZIP Code (No H&T Spa)
**Steps:**
1. Navigate to locations page
2. Enter a ZIP code with no H&T spas (e.g., "00000" or remote area ZIP)
3. Observe autocomplete and search results
4. Check Network tab for API calls

**Expected Results:**
- No local index match (0 results)
- System falls back to Google Places API
- Google Places may or may not return suggestions
- If valid ZIP, map centers on ZIP location
- Map shows H&T spas within 50-mile radius (if any)
- If no spas within radius, "No locations found" message displays

#### 2.9 Verify Search with City Name (H&T Spa Location)
**Steps:**
1. Navigate to locations page
2. Enter a city name with H&T spas (e.g., "Los Angeles") in search input
3. Select from local autocomplete suggestions
4. Observe search results and check Network tab

**Expected Results:**
- City name triggers local index match
- Local suggestion appears (e.g., "Los Angeles CA")
- NO Google Places API call for autocomplete
- Map centers on geographic center of all H&T spas in that city
- Map shows locations within 50-mile radius of city center
- Multiple locations are displayed if city has multiple spas
- Location markers are visible on map
- Distance filtering uses 50-mile radius for cities

#### 2.10 Verify Search with City Name (No H&T Spa)
**Steps:**
1. Navigate to locations page
2. Enter a city name with no H&T spas (e.g., "Anchorage, Alaska")
3. Observe autocomplete behavior
4. Select from Google Places suggestions

**Expected Results:**
- No local index match
- Google Places API provides autocomplete suggestions
- User can select from Google Places suggestions
- Map centers on selected city coordinates
- Map shows H&T spas within 50-mile radius (if any exist)
- If no spas within 50 miles, appropriate message displays

#### 2.11 Verify Search with State Name (H&T Spa Location)
**Steps:**
1. Navigate to locations page
2. Enter a state name with H&T spas (e.g., "California" or "New York")
3. Select from local autocomplete suggestions
4. Observe search results and verify radius

**Expected Results:**
- State name triggers local index match
- Local suggestion appears (e.g., "California CA")
- NO Google Places API call for autocomplete
- Map centers on geographic center of all H&T spas in that state
- Map shows locations within 200-mile radius (states use 200-mile radius, not 50)
- Map adjusts zoom to fit state-wide locations
- Location markers/clusters are visible throughout state
- Multiple locations are displayed
- Distance filtering uses 200-mile radius for states (different from cities/ZIP)

#### 2.12 Verify Search with Full Address
**Steps:**
1. Navigate to locations page
2. Enter a full address (e.g., "123 Main St, New York, NY") in search input
3. Observe autocomplete behavior
4. Select from Google Places suggestions
5. Check Network tab for API calls

**Expected Results:**
- Specific addresses are NOT in local index (by design)
- Google Places API autocomplete is triggered automatically
- Google Places provides address suggestions
- User selects from address suggestions
- System retrieves lat/lng coordinates from Google Places
- Map centers on selected address coordinates
- Map shows H&T spas within 50-mile radius of address
- Nearby location markers are displayed
- Distance filtering uses 50-mile radius for addresses

#### 2.13 Verify Search Button/Icon Functionality
**Steps:**
1. Navigate to locations page
2. Enter text in search input field (e.g., "New York")
3. Locate search button/icon next to input
4. Click search button
5. Observe search execution

**Expected Results:**
- Search button/icon is visible next to input field
- Button has appropriate icon (magnifying glass or similar)
- Clicking button executes search
- Search results update (local or Google Places depending on match)
- Map updates to show search results with appropriate radius filtering
- Button is accessible and clickable

#### 2.14 Verify Search with Enter Key
**Steps:**
1. Navigate to locations page
2. Enter text in search input field (e.g., "California")
3. Press Enter key (without selecting autocomplete suggestion)
4. Observe search execution

**Expected Results:**
- Pressing Enter executes search
- Search is triggered without clicking button or selecting suggestion
- Local index search is performed if matches exist
- Map updates to show results with appropriate radius
- Input field maintains focus (or loses focus appropriately)
- No form submission occurs (no page reload)

#### 2.15 Verify Search Input Clearing
**Steps:**
1. Navigate to locations page
2. Enter text in search input field
3. Perform a search to display results
4. Clear the input (backspace or clear button)
5. Observe behavior

**Expected Results:**
- Input can be cleared using backspace/delete
- If clear button exists, it removes text when clicked
- Clearing input resets map to default view (showing all locations)
- Location markers update to show all locations
- Autocomplete suggestions disappear
- Results list clears or resets

#### 2.16 Verify Invalid Search Input Handling
**Steps:**
1. Navigate to locations page
2. Enter invalid/nonsensical text (e.g., "xyz123nonexistent")
3. Press Enter or click search
4. Observe error handling
5. Check Network tab

**Expected Results:**
- Local index returns 0 matches
- System falls back to Google Places API
- Google Places may or may not find suggestions
- If no results found, "No locations found" message displays
- Map may show default view or remain unchanged
- No JavaScript errors occur
- Page remains functional
- User can correct input and search again

#### 2.17 Verify Empty Search Handling
**Steps:**
1. Navigate to locations page
2. Click search button/icon with empty input
3. Press Enter with empty input
4. Observe behavior

**Expected Results:**
- Empty search doesn't break functionality
- Map may show all locations (default view)
- No error messages for empty search
- Input field remains functional
- User can enter text and search again

#### 2.18 Verify Case-Insensitive Local Search
**Steps:**
1. Navigate to locations page
2. Type "new york" (lowercase) in search input
3. Observe suggestions
4. Clear input
5. Type "NEW YORK" (uppercase) in search input
6. Observe suggestions

**Expected Results:**
- Both lowercase and uppercase queries return same local suggestions
- Case does not affect local index search results
- Suggestions appear consistently regardless of case
- Search behavior is case-insensitive

#### 2.19 Verify Partial Match Search in Local Index
**Steps:**
1. Navigate to locations page
2. Type "New" (partial text) in search input
3. Observe suggestions
4. Verify suggestions include locations starting with "New"

**Expected Results:**
- Partial matches are found in local index
- Suggestions appear for partial text (e.g., "New York", "New Jersey")
- Results are relevant to partial input
- User doesn't need to type complete location name
- Autocomplete aids in location discovery

#### 2.20 Verify Special Characters in Search Input
**Steps:**
1. Navigate to locations page
2. Type "New York, NY" (with comma) in search input
3. Observe suggestions
4. Clear and type "New York - NY" (with dash)
5. Observe suggestions

**Expected Results:**
- Special characters are handled gracefully
- Commas, dashes, and other punctuation don't break search
- Local index search still works with punctuation
- Suggestions appear appropriately
- No JavaScript errors occur

#### 2.21 Verify Geographic Center Calculation for States
**Steps:**
1. Navigate to locations page
2. Type and select "California" (state with many H&T spas)
3. Observe map centering
4. Note the center coordinates

**Expected Results:**
- Map centers on geographic center of all CA H&T spas (not state's geographic center)
- Center is calculated from actual spa locations
- Map zoom level is appropriate for state view
- All spas within 200-mile radius of center are displayed
- Centering provides optimal view of spa distribution

#### 2.22 Verify Geographic Center Calculation for Cities
**Steps:**
1. Navigate to locations page
2. Type and select "New York" (city with multiple H&T spas)
3. Observe map centering
4. Note the center coordinates

**Expected Results:**
- Map centers on geographic center of all NYC H&T spas
- Center is calculated from actual spa locations in city
- Map zoom level is appropriate for city view
- All spas within 50-mile radius of center are displayed
- Centering provides optimal view of city spa locations

#### 2.23 Verify Radius Filtering - States (200 Miles)
**Steps:**
1. Navigate to locations page
2. Select a state (e.g., "New York")
3. Observe results list
4. Verify distances (if displayed)
5. Check that all shown spas are within 200 miles of center

**Expected Results:**
- Only spas within 200-mile radius of state center are displayed
- 200-mile radius is specific to state searches
- Results list shows relevant locations within radius
- Map markers reflect 200-mile radius filtering
- Distance calculations are accurate

#### 2.24 Verify Radius Filtering - Cities/ZIP/Addresses (50 Miles)
**Steps:**
1. Navigate to locations page
2. Select a city (e.g., "Los Angeles")
3. Observe results list
4. Verify distances
5. Repeat for ZIP code and address searches

**Expected Results:**
- Only spas within 50-mile radius are displayed for cities, ZIP codes, and addresses
- 50-mile radius is applied consistently (not 200 miles like states)
- Results list shows relevant locations within 50-mile radius
- Map markers reflect 50-mile radius filtering
- Distance calculations are accurate for all three search types

### 3. Geolocation Functionality

#### 3.1 Verify "Use My Current Location" Button Display
**Steps:**
1. Navigate to locations page
2. Locate "Use my current location" button
3. Verify button properties

**Expected Results:**
- Button is visible below or near search input
- Button text reads "Use my current location"
- Button has location icon/image
- Button is enabled and clickable
- Button is properly labeled for accessibility

#### 3.2 Verify Current Location Button Click (With Permission)
**Steps:**
1. Navigate to locations page
2. Grant browser location permission (if prompted)
3. Click "Use my current location" button
4. Observe geolocation behavior

**Expected Results:**
- Browser prompts for location permission (first time)
- After granting permission, location is detected
- Map updates to show user's current location
- Map centers on user's location
- Nearby location markers are displayed
- Closest Hand & Stone locations are highlighted or shown
- Location marker may show user's position on map

#### 3.3 Verify Current Location Button Click (Permission Denied)
**Steps:**
1. Navigate to locations page
2. Deny browser location permission (if prompted)
3. Click "Use my current location" button
4. Observe error handling

**Expected Results:**
- Browser prompts for location permission
- After denying permission, appropriate error message displays
- Page remains functional
- User can still use manual search
- Error message is user-friendly
- No JavaScript errors occur

#### 3.4 Verify Current Location Button Click (Permission Already Granted)
**Steps:**
1. Grant location permission on previous visit
2. Navigate to locations page
3. Click "Use my current location" button
4. Observe geolocation behavior

**Expected Results:**
- No permission prompt appears
- Location is detected immediately
- Map updates to user's location
- Nearby locations are shown
- Behavior is faster than first-time permission request

#### 3.5 Verify Geolocation Accuracy
**Steps:**
1. Navigate to locations page
2. Click "Use my current location" button
3. Grant location permission
4. Verify location accuracy

**Expected Results:**
- Detected location is reasonably accurate
- Map centers on actual user location
- Nearby locations are relevant to user's position
- Distance calculations (if shown) are accurate
- Location updates if user moves (if supported)

#### 3.6 Verify Geolocation Error Handling
**Steps:**
1. Navigate to locations page
2. Simulate geolocation errors (timeout, unavailable, etc.)
3. Click "Use my current location" button
4. Observe error handling

**Expected Results:**
- Error is handled gracefully
- User-friendly error message displays
- Page remains functional
- Manual search remains available
- No broken states occur

### 4. Google Maps Integration

#### 4.1 Verify Map Initial Display
**Steps:**
1. Navigate to locations page
2. Observe Google Maps integration
3. Verify map loads successfully

**Expected Results:**
- Google Maps is embedded and visible
- Map displays with proper initial zoom level
- Map shows all Hand & Stone locations
- Location markers/clusters are visible
- Map controls are present
- Map attribution is visible ("Map Data ©2025 Google, INEGI")
- Map loads without errors (except known API warnings)

#### 4.2 Verify Location Markers on Map
**Steps:**
1. Navigate to locations page
2. Observe location markers on map
3. Verify marker display

**Expected Results:**
- Multiple location markers are visible on map
- Markers show numbers indicating location count in cluster
- Individual markers appear where only one location exists
- Cluster markers appear where multiple locations are nearby
- Markers are clickable/interactive
- Markers use Hand & Stone branding or appropriate icons

#### 4.3 Verify Location Marker Click
**Steps:**
1. Navigate to locations page
2. Click on a location marker (individual or cluster)
3. Observe marker interaction

**Expected Results:**
- Clicking marker opens location details (info window or sidebar)
- Location information displays:
  - Location name
  - Address
  - Phone number
  - Hours (if available)
  - Services offered
  - Book/View Details button
- Map may center on selected marker
- Other markers remain visible
- Info window can be closed

#### 4.4 Verify Map Zoom Controls
**Steps:**
1. Navigate to locations page
2. Locate zoom controls on map
3. Click "Zoom in" button
4. Click "Zoom out" button
5. Observe map behavior

**Expected Results:**
- Zoom controls are visible on map
- "Zoom in" button (+) is present and clickable
- "Zoom out" button (-) is present and clickable
- Clicking zoom in increases map zoom level
- Clicking zoom out decreases map zoom level
- Location markers adjust to zoom level
- Clusters may expand/contract with zoom

#### 4.5 Verify Map Mouse Wheel Zoom
**Steps:**
1. Navigate to locations page
2. Hover over map
3. Use mouse wheel to zoom in/out
4. Observe map behavior

**Expected Results:**
- Scrolling mouse wheel zooms map in/out
- Zoom behavior is smooth
- Location markers update appropriately
- Clusters expand/contract with zoom level
- Zoom is responsive to scroll speed

#### 4.6 Verify Map Pan/Drag Functionality
**Steps:**
1. Navigate to locations page
2. Click and drag map to pan
3. Observe map movement

**Expected Results:**
- Map can be dragged/panned with mouse or touch
- Map moves smoothly during drag
- Location markers move with map
- New locations appear as map is panned
- Map boundary handling works correctly

#### 4.7 Verify "My Location" Button on Map
**Steps:**
1. Navigate to locations page
2. Locate "My Location" button on map (bottom right or similar)
3. Click "My Location" button
4. Observe map behavior

**Expected Results:**
- "My Location" button is visible on map
- Button has location icon
- Clicking button centers map on user's location (if permission granted)
- If no permission, button may prompt for location access
- Map zooms to appropriate level for location
- Nearby location markers are displayed

#### 4.8 Verify "Open in Google Maps" Link
**Steps:**
1. Navigate to locations page
2. Locate "Open in Google Maps" link on map
3. Click link
4. Observe navigation

**Expected Results:**
- Link is visible on map (typically bottom right)
- Link text reads "Open in Google Maps" or similar
- Link has Google logo/branding
- Clicking link opens Google Maps in new tab/window
- Google Maps URL includes current map view parameters
- Link format: `https://maps.google.com/maps?ll=39.5,-98.35&z=4&t=m&hl=en-US&gl=US&mapclient=apiv3`
- New tab/window opens correctly

#### 4.9 Verify Map Keyboard Shortcuts Button
**Steps:**
1. Navigate to locations page
2. Locate "Keyboard shortcuts" button on map
3. Click button
4. Observe shortcuts information

**Expected Results:**
- "Keyboard shortcuts" button is visible on map
- Button is clickable
- Clicking displays keyboard shortcuts modal/info
- Shortcuts information is helpful and accurate
- Modal can be closed

#### 4.10 Verify Map Attribution Display
**Steps:**
1. Navigate to locations page
2. Locate map attribution text
3. Verify attribution content

**Expected Results:**
- Map attribution is visible (typically bottom left)
- Attribution text displays: "Map Data ©2025 Google, INEGI"
- "Terms" link is present and clickable
- Attribution meets Google Maps API requirements
- Attribution is always visible (not hidden)

#### 4.11 Verify Map Responsive Behavior
**Steps:**
1. Navigate to locations page
2. Resize browser window
3. Test on different viewports (mobile, tablet, desktop)
4. Observe map adaptation

**Expected Results:**
- Map resizes appropriately with viewport
- Map controls remain accessible
- Location markers remain clickable
- Map functionality works on all viewport sizes
- No horizontal scroll issues
- Map adjusts to container size

#### 4.12 Verify Map Loading Performance
**Steps:**
1. Navigate to locations page with cleared cache
2. Measure map load time
3. Observe loading sequence

**Expected Results:**
- Map loads within reasonable time (< 3 seconds)
- Map tiles load progressively
- Location markers appear as map loads
- No blocking of page interaction
- Loading states are handled appropriately

### 5. Location List/Display

#### 5.1 Verify Location List Appears After Search
**Steps:**
1. Navigate to locations page
2. Perform a search (e.g., type "New York NY" and select)
3. Observe location list display

**Expected Results:**
- Location list appears after search (if implemented)
- List shows matching locations
- Each location entry displays:
  - Location name
  - Address
  - Phone number
  - Distance (if available)
  - Book/View Details button
- List is scrollable if multiple locations
- List items are clickable

#### 5.2 Verify Location List Item Click
**Steps:**
1. Navigate to locations page
2. Perform a search to show location list
3. Click on a location list item
4. Observe behavior

**Expected Results:**
- Clicking list item selects location
- Map centers on selected location
- Location marker is highlighted on map
- Location details panel/window opens
- Connection between list and map is clear

#### 5.3 Verify Location Count Display
**Steps:**
1. Navigate to locations page
2. Perform a search that returns multiple locations
3. Verify location count is displayed

**Expected Results:**
- Total location count is shown (e.g., "Found 25 locations")
- Count updates with search results
- Count is accurate
- Count is visible and readable

#### 5.4 Verify Location List Sorting (if applicable)
**Steps:**
1. Navigate to locations page
2. Perform a search showing multiple locations
3. Check if sorting options are available
4. Test sorting functionality

**Expected Results:**
- Sorting options may be present (distance, name, etc.)
- Sorting works correctly
- List updates when sort option changes
- Selected sort option is indicated

#### 5.5 Verify Location List Pagination (if applicable)
**Steps:**
1. Navigate to locations page
2. Perform a search returning many locations
3. Check for pagination controls
4. Test pagination

**Expected Results:**
- Pagination controls appear if many results
- Previous/Next buttons work correctly
- Page numbers are clickable
- Results update when changing pages
- Current page is indicated

#### 5.6 Verify No Results Message
**Steps:**
1. Navigate to locations page
2. Perform a search with no matching locations
3. Observe no results handling

**Expected Results:**
- Appropriate message displays: "No locations found" or similar
- Message is clear and helpful
- Suggestions may be provided (try different search)
- Map may show default view or message
- User can modify search and try again

### 6. Location Details & Booking Flow

#### 6.1 Verify Location Details Panel/Window Display
**Steps:**
1. Navigate to locations page
2. Click on a location marker or search result
3. Observe location details display

**Expected Results:**
- Location details panel/window opens
- Details include:
  - Location name
  - Full address
  - Phone number
  - Hours of operation (if available)
  - Services offered
  - Directions link
- Panel/window is properly styled and readable
- Panel can be closed/dismissed

#### 6.2 Verify Location Name Display
**Steps:**
1. Navigate to locations page
2. Select a location
3. Verify location name

**Expected Results:**
- Location name is clearly displayed
- Name matches Hand & Stone branding
- Name is prominent in details view
- Name is accurate and consistent

#### 6.3 Verify Location Address Display
**Steps:**
1. Navigate to locations page
2. Select a location
3. Verify address information

**Expected Results:**
- Full address is displayed (street, city, state, ZIP)
- Address is formatted correctly
- Address is clickable for directions (if implemented)
- Address matches actual location

#### 6.4 Verify Location Phone Number Display
**Steps:**
1. Navigate to locations page
2. Select a location
3. Verify phone number

**Expected Results:**
- Phone number is displayed
- Phone number is properly formatted
- Phone number is clickable (tel: link)
- Clicking initiates phone call on mobile devices

#### 6.5 Verify Location Hours Display (if applicable)
**Steps:**
1. Navigate to locations page
2. Select a location
3. Check for hours of operation

**Expected Results:**
- Hours are displayed (if available)
- Hours include days of week
- Hours are current and accurate
- Hours format is readable

#### 6.6 Verify Services Offered Display (if applicable)
**Steps:**
1. Navigate to locations page
2. Select a location
3. Check for services information

**Expected Results:**
- Services offered are listed (if available)
- Services match location capabilities
- Services are clearly formatted
- Services may be clickable links

#### 6.7 Verify Book Appointment CTA
**Steps:**
1. Navigate to locations page
2. Select a location
3. Locate "Book Appointment" or "Book Now" button
4. Click button
5. Observe navigation

**Expected Results:**
- Book Appointment button is visible in location details
- Button is prominent and clickable
- Clicking navigates to booking flow
- Booking URL may include location ID/parameter
- Booking page loads successfully

#### 6.8 Verify Get Directions CTA
**Steps:**
1. Navigate to locations page
2. Select a location
3. Locate "Get Directions" or "Directions" link
4. Click link
5. Observe navigation

**Expected Results:**
- Directions link is visible in location details
- Link is clickable
- Clicking opens Google Maps or navigation app
- Directions URL includes location address
- External navigation opens correctly

#### 6.9 Verify Location Details Close/Dismiss
**Steps:**
1. Navigate to locations page
2. Open location details panel/window
3. Click close button or outside panel
4. Observe panel behavior

**Expected Results:**
- Close button is visible and clickable
- Clicking close button dismisses panel
- Clicking outside panel may dismiss it (if implemented)
- Panel closes smoothly
- Map remains interactive after closing

### 7. URL Parameters & Service Context

#### 7.1 Verify Service ID Parameter Handling
**Steps:**
1. Navigate from category page with service context
2. Click "Book Service" with service_id parameter
3. Navigate to locations page
4. Verify URL contains service_id parameter

**Expected Results:**
- URL includes service_id parameter: `/locations?service_id=XXX&service_name=YYY`
- Service context is preserved
- Selected service may be highlighted or pre-selected
- Booking flow maintains service context
- Parameter is correctly parsed and used

#### 7.2 Verify Service Name Parameter Handling
**Steps:**
1. Navigate from category page with service name
2. Navigate to locations page with service_name parameter
3. Verify parameter handling

**Expected Results:**
- URL includes service_name parameter (URL-encoded)
- Service name is preserved in booking flow
- Parameter is correctly decoded
- Service name may be displayed on page

#### 7.3 Verify Service Context in Location Booking
**Steps:**
1. Navigate to locations page with service parameters
2. Select a location
3. Click "Book Appointment"
4. Verify service context is maintained

**Expected Results:**
- Service context is passed to booking page
- Booking page pre-selects or highlights the service
- Service parameters are not lost
- User can proceed directly to booking that service

#### 7.4 Verify Direct URL Access with Parameters
**Steps:**
1. Navigate directly to locations URL with parameters:
   `/locations?service_id=291de098-85a6-43f8-bb96-a56407867b62&service_name=Himalayan+Salt+Stone+Massage`
2. Verify page loads correctly
3. Verify parameters are handled

**Expected Results:**
- Page loads successfully with parameters
- Parameters are preserved
- Service context is applied
- No errors occur from parameters
- Page functions normally

### 8. Navigation Elements

#### 8.1 Verify Header Logo Navigation
**Steps:**
1. Navigate to locations page
2. Click Hand & Stone logo in header
3. Observe navigation

**Expected Results:**
- Logo is clickable
- Clicking navigates to homepage
- URL changes to homepage URL
- Homepage loads successfully

#### 8.2 Verify Header Menu Button (Mobile)
**Steps:**
1. Navigate to locations page on mobile viewport
2. Locate menu button in header
3. Click menu button
4. Observe navigation menu

**Expected Results:**
- Menu button is visible on mobile
- Menu opens with services and links
- Menu structure matches other pages
- Menu can be closed
- Navigation works from menu

#### 8.3 Verify Header Book Button
**Steps:**
1. Navigate to locations page
2. Click "Book" button in header
3. Observe behavior

**Expected Results:**
- Book button is visible in header
- Button may navigate to locations (if not already there) or refresh
- Button behavior is consistent
- Button is accessible

#### 8.4 Verify Footer Links Functionality
**Steps:**
1. Navigate to locations page
2. Test various footer links:
   - About Us links
   - Services links
   - Membership links
   - Terms & Conditions links
   - Social media links
3. Verify each link works

**Expected Results:**
- All footer links are clickable
- Links navigate to correct destinations
- External links open appropriately
- Links match functionality from other pages
- Footer structure is consistent

#### 8.5 Verify Breadcrumbs Navigation
**Steps:**
1. Navigate to locations page
2. Locate breadcrumbs in footer
3. Click "Home" link
4. Observe navigation

**Expected Results:**
- Breadcrumbs display: "Home • locations"
- "Home" link is clickable
- Clicking "Home" navigates to homepage
- Current page (locations) is not clickable
- Breadcrumbs match other pages' format

### 9. Responsive Design

#### 9.1 Verify Mobile Viewport (375x667)
**Steps:**
1. Set viewport to mobile (375x667)
2. Navigate to locations page
3. Test all functionality

**Expected Results:**
- Search input is properly sized
- Map displays correctly in mobile view
- Location markers are clickable/tappable
- Map controls are accessible
- "Use my current location" button is visible
- Header menu button is visible
- Footer stacks appropriately
- No horizontal scrolling required
- Touch interactions work correctly

#### 9.2 Verify Tablet Viewport (768x1024)
**Steps:**
1. Set viewport to tablet (768x1024)
2. Navigate to locations page
3. Test functionality

**Expected Results:**
- Layout adapts for tablet size
- Map displays appropriately
- Search input and buttons are properly sized
- Location list (if present) displays well
- Touch interactions work
- Layout is optimized for tablet

#### 9.3 Verify Desktop Viewport (1920x1080)
**Steps:**
1. Set viewport to desktop (1920x1080)
2. Navigate to locations page
3. Verify layout

**Expected Results:**
- Full desktop navigation is visible
- Map uses available space effectively
- Search and map are properly positioned
- Location details panel (if sidebar) displays correctly
- Layout is optimized for large screens
- Content is centered or properly distributed

#### 9.4 Verify Map Responsive Behavior
**Steps:**
1. Navigate to locations page
2. Resize browser window gradually
3. Observe map adaptation

**Expected Results:**
- Map resizes smoothly with window
- Map controls remain accessible at all sizes
- Location markers remain clickable
- No layout breaking
- Map maintains aspect ratio appropriately

### 10. Accessibility Testing

#### 10.1 Verify Keyboard Navigation
**Steps:**
1. Navigate to locations page
2. Use only keyboard (Tab, Shift+Tab, Enter, Space, Arrow keys)
3. Navigate through all interactive elements

**Expected Results:**
- All interactive elements are keyboard accessible
- Tab order is logical
- Search input can be focused
- Buttons can be activated with Enter/Space
- Map can be navigated with keyboard (if supported)
- Focus indicators are visible
- No keyboard traps

#### 10.2 Verify ARIA Labels and Semantic HTML
**Steps:**
1. Navigate to locations page
2. Inspect elements with developer tools
3. Verify ARIA attributes

**Expected Results:**
- Search input has proper label/aria-label
- Buttons have descriptive aria-labels
- Map region has appropriate aria-label
- Location markers have accessible labels
- Interactive elements are properly marked up
- Semantic HTML is used appropriately

#### 10.3 Verify Screen Reader Compatibility
**Steps:**
1. Enable screen reader (NVDA, JAWS, VoiceOver)
2. Navigate through locations page
3. Listen to content announcements

**Expected Results:**
- Page structure is announced properly
- Search input purpose is clear
- Button actions are announced
- Location information is accessible
- Map alternative text or description is provided
- Content is logical and understandable

#### 10.4 Verify Color Contrast
**Steps:**
1. Navigate to locations page
2. Use contrast checker tool
3. Check all text and interactive elements

**Expected Results:**
- All text meets WCAG AA standards (4.5:1)
- Button text has sufficient contrast
- Search input text is readable
- Focus indicators meet 3:1 contrast
- Map controls are visible
- No color-only information

#### 10.5 Verify Skip to Content Link
**Steps:**
1. Navigate to locations page
2. Press Tab key to focus first element
3. Verify "Skip to content" link

**Expected Results:**
- "Skip to content" link is first focusable element
- Link is visible when focused
- Clicking jumps to main content
- Link works correctly

### 11. Performance & Loading

#### 11.1 Verify Page Load Performance
**Steps:**
1. Clear browser cache
2. Navigate to locations page
3. Measure load time with DevTools Performance tab

**Expected Results:**
- Page loads within reasonable time (< 3 seconds)
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.5s
- Map loads progressively
- No blocking resources

#### 11.2 Verify Map Loading Performance
**Steps:**
1. Navigate to locations page
2. Observe map loading sequence
3. Monitor Network tab for map resources

**Expected Results:**
- Map tiles load progressively
- Initial map view appears quickly
- Location markers load as map loads
- No long delays before interactivity
- Map API loads efficiently

#### 11.3 Verify Search Performance
**Steps:**
1. Navigate to locations page
2. Type in search input
3. Measure autocomplete response time

**Expected Results:**
- Autocomplete suggestions appear quickly (< 500ms)
- Search results update promptly
- No lag in typing response
- Search is responsive and smooth

#### 11.4 Verify Network Request Efficiency
**Steps:**
1. Navigate to locations page
2. Open Network tab
3. Observe all network requests

**Expected Results:**
- Reasonable number of requests
- Map tiles are cached appropriately
- No duplicate requests
- API calls are optimized
- Resources are compressed
- CDN is used for static assets

### 12. Error Handling & Edge Cases

#### 12.1 Verify Network Error Handling
**Steps:**
1. Navigate to locations page
2. Simulate offline network
3. Attempt to search or use geolocation

**Expected Results:**
- Appropriate error message displays
- User is informed of network issue
- Page doesn't break
- User can retry when network returns
- Offline state is handled gracefully

#### 12.2 Verify Map API Error Handling
**Steps:**
1. Navigate to locations page
2. Simulate Google Maps API failure
3. Observe error handling

**Expected Results:**
- Error is handled gracefully
- User-friendly error message displays
- Fallback content may be shown
- Page remains functional
- Manual location entry still works (if applicable)

#### 12.3 Verify Geolocation Timeout Handling
**Steps:**
1. Navigate to locations page
2. Click "Use my current location"
3. Simulate geolocation timeout
4. Observe error handling

**Expected Results:**
- Timeout error is handled
- Error message is clear
- User can retry or use manual search
- No broken states occur

#### 12.4 Verify Invalid Location Data Handling
**Steps:**
1. Navigate to locations page
2. Perform searches with edge case inputs
3. Observe handling

**Expected Results:**
- Invalid inputs are handled gracefully
- Error messages are helpful
- No JavaScript errors occur
- User can correct and retry

#### 12.5 Verify Rapid Search Input
**Steps:**
1. Navigate to locations page
2. Rapidly type and delete in search input
3. Observe behavior

**Expected Results:**
- No lag or freezing
- Autocomplete updates appropriately
- Search results don't flash or jump
- Performance remains stable
- No race conditions

#### 12.6 Verify Concurrent Map Interactions
**Steps:**
1. Navigate to locations page
2. Perform multiple map actions rapidly:
   - Click multiple markers
   - Zoom in/out quickly
   - Pan map while zooming
3. Observe behavior

**Expected Results:**
- Map handles concurrent actions gracefully
- No visual glitches
- No errors occur
- Map state remains consistent
- Interactions are smooth

#### 12.7 Verify Browser Back/Forward Navigation
**Steps:**
1. Navigate to locations page
2. Perform a search
3. Click browser Back button
4. Click browser Forward button
5. Observe state management

**Expected Results:**
- Back button returns to previous state
- Forward button restores state
- Search state may be preserved (if implemented)
- Map state updates correctly
- URL history is maintained

### 13. Cross-Browser Compatibility

#### 13.1 Verify Chrome/Chromium Behavior
**Steps:**
1. Open locations page in Chrome
2. Test all functionality
3. Verify Chrome-specific features

**Expected Results:**
- All features work correctly
- Map displays properly
- Geolocation works
- Search functions correctly
- No Chrome-specific issues

#### 13.2 Verify Firefox Behavior
**Steps:**
1. Open locations page in Firefox
2. Test all functionality
3. Check for Firefox-specific issues

**Expected Results:**
- All features work correctly
- Map renders properly
- Geolocation API works
- CSS styling is correct
- No Firefox-specific problems

#### 13.3 Verify Safari/WebKit Behavior
**Steps:**
1. Open locations page in Safari
2. Test all functionality
3. Verify WebKit compatibility

**Expected Results:**
- All features work correctly
- Map displays properly
- Geolocation works
- Touch gestures work (if applicable)
- No Safari-specific issues

#### 13.4 Verify Edge Browser Behavior
**Steps:**
1. Open locations page in Microsoft Edge
2. Test all functionality
3. Verify compatibility

**Expected Results:**
- All features work correctly
- Behavior matches Chrome (Chromium Edge)
- No Edge-specific issues

### 14. Integration Testing

#### 14.1 Verify Navigation from Homepage
**Steps:**
1. Navigate to homepage
2. Click "Book Now" button
3. Verify navigation to locations page

**Expected Results:**
- Navigation occurs to locations page
- URL is `/locations/`
- Locations page loads successfully
- Page state is clean (no previous search)

#### 14.2 Verify Navigation from Category Page
**Steps:**
1. Navigate to category page (e.g., `/facials/`)
2. Click "Book Service" button with service parameters
3. Verify navigation to locations page with parameters

**Expected Results:**
- Navigation occurs to locations page
- URL includes service parameters: `/locations?service_id=XXX&service_name=YYY`
- Service context is preserved
- Locations page loads with context

#### 14.3 Verify Service Context Preservation
**Steps:**
1. Navigate from category page with service
2. Arrive at locations page with parameters
3. Select a location
4. Click "Book Appointment"
5. Verify service context is maintained

**Expected Results:**
- Service parameters are preserved through booking flow
- Booking page receives service context
- Service is pre-selected in booking
- User journey is seamless

#### 14.4 Verify Return Navigation
**Steps:**
1. Navigate from homepage/category page to locations
2. Use browser Back button
3. Verify return to previous page

**Expected Results:**
- Back button returns to previous page
- Previous page state is maintained
- Navigation is smooth
- No errors occur

---

## Comparison with Existing Tests

### Current Test Coverage Analysis

**Existing Tests in `hand-and-stone.spec.ts`:**

1. **Test 1.3**: Verifies navigation to locations page from hero "Book Now" button
   - Only checks URL matches `/locations/?$` pattern
   - Does not test any locations page functionality

2. **Test 5.1**: Verifies "Find a Spa" CTA navigation to locations page
   - Only checks URL matches `/locations/` pattern
   - Does not test location finder features

3. **Test 13.3**: Uses locations page to test logo navigation back to homepage
   - Does not test locations page functionality
   - Only uses page as navigation test vehicle

**Gaps in Current Coverage:**

- ❌ No tests for search functionality
- ❌ No tests for autocomplete suggestions
- ❌ No tests for in-memory index search (POC2 enhancement)
- ❌ No tests for local vs. Google Places fallback logic (POC2 enhancement)
- ❌ No tests for geographic center calculation (POC2 enhancement)
- ❌ No tests for radius filtering differences (states: 200 miles, cities/ZIP/addresses: 50 miles) (POC2 enhancement)
- ❌ No tests for geolocation features
- ❌ No tests for Google Maps integration
- ❌ No tests for location markers/clusters
- ❌ No tests for map controls (zoom, pan, etc.)
- ❌ No tests for location selection/details
- ❌ No tests for URL parameter handling (service_id, service_name)
- ❌ No tests for booking flow from locations page
- ❌ No tests for responsive behavior
- ❌ No tests for accessibility
- ❌ No tests for error handling
- ❌ No tests for cross-browser compatibility

**Coverage Statistics:**

- **Current**: 3 test cases, all checking URL navigation only (0% functional coverage)
- **New Plan**: 100+ test cases covering all functionality (comprehensive coverage)

---

## Test Environment Details

**Base URL**: `https://custom-booking-app-release-hand-and-stone.vercel.app/`  
**Locations Page URL**: `https://custom-booking-app-release-hand-and-stone.vercel.app/locations/`

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
- Location permission handling (for geolocation tests)
- Google Maps API access (may require API key in test environment)

**Known Issues**:
- Cookiebot script included twice (console warning)
- Google Maps API warnings about AutocompleteService and PlacesService (expected for new customers after March 2025)
- Consent domain authorization error in non-production
- 404 error for consentcdn resource (expected in development)

**Special Considerations**:
- Geolocation tests require browser permission prompts
- Map functionality depends on Google Maps API availability
- Some features may require specific browser capabilities
- Network conditions affect map tile loading

---

## Priority Matrix

**P0 (Critical - Must Pass)**:
- Page Load & Initial Display (1.1-1.4)
- Search Input Field (2.1-2.2)
- Location Marker Click (4.3)
- Book Appointment CTA (6.7)
- URL Parameters Handling (7.1-7.3)
- Header Navigation (8.1-8.3)
- Mobile Viewport (9.1)

**P1 (High Priority)**:
- Autocomplete Suggestions (2.3-2.8)
- Search Execution (2.9-2.10)
- Geolocation Functionality (3.1-3.4)
- Map Controls (4.4-4.8)
- Location Details Display (6.1-6.6)
- Responsive Design (9.1-9.3)
- Keyboard Accessibility (10.1)

**P2 (Medium Priority)**:
- Map Integration Details (4.1-4.2, 4.9-4.12)
- Location List Display (5.1-5.6)
- Error Handling (12.1-12.4)
- Cross-Browser Testing (13.1-13.4)
- Performance Metrics (11.1-11.4)
- ARIA Labels (10.2)

**P3 (Low Priority)**:
- Edge Cases (12.5-12.7)
- Integration Testing (14.1-14.4)
- SEO Meta Tags (if applicable)
- Analytics Tracking (if applicable)
- Screen Reader Compatibility (10.3)

---

## Coverage Summary

- **Total Test Scenarios**: 14 major categories
- **Total Test Cases**: 110+ individual test cases
- **Page Sections Covered**: 6 main sections (Search, Map, Location Details, Navigation, Footer, URL Params)
- **Functionality Coverage**:
  - Search & Autocomplete: 24 test cases (enhanced with in-memory index, local vs. API fallback, radius filtering)
  - Geolocation: 6 test cases
  - Google Maps Integration: 12 test cases
  - Location Display: 6 test cases
  - Location Details & Booking: 9 test cases
  - URL Parameters: 4 test cases
  - Navigation: 5 test cases
  - Responsive Design: 4 test cases
  - Accessibility: 5 test cases
  - Performance: 4 test cases
  - Error Handling: 7 test cases
  - Cross-Browser: 4 test cases
  - Integration: 4 test cases

- **Responsive Breakpoints**: 3 viewport sizes
- **Browser Coverage**: 4 browser engines
- **Accessibility Standards**: WCAG 2.1 AA compliance
- **Priority Distribution**:
  - P0 (Critical): ~20 test cases
  - P1 (High): ~35 test cases
  - P2 (Medium): ~30 test cases
  - P3 (Low): ~15 test cases

---

## Test Execution Guidelines

1. **Test Order**: Execute P0 tests first for smoke testing, then proceed with P1-P3
2. **State Management**: Clear cookies/cache before each test suite; grant location permissions as needed
3. **Geolocation Testing**: Requires browser permission management; simulate both granted and denied scenarios
4. **Map Testing**: Account for Google Maps API loading times; test with varying network conditions
5. **URL Parameters**: Test with and without service context parameters
6. **Real Locations**: Test with actual city/ZIP codes to verify realistic results
7. **Documentation**: Screenshot failures; document unexpected map behavior or API errors
8. **Network Conditions**: Test with fast 3G, slow 3G, and offline scenarios
9. **Cross-Browser**: Prioritize Chrome and Safari for mobile; test all four browsers for desktop
10. **Regression**: Re-run all P0/P1 tests after any code changes to locations page or map integration

---

## Test Data & Test Cases

### Sample Search Terms for Testing:

**Valid Inputs:**
- ZIP Codes: "10001", "90210", "60601", "02134"
- Cities: "New York", "Los Angeles", "Chicago", "Houston"
- States: "California", "New York State", "Texas", "Florida"
- Addresses: "123 Main St, New York, NY", "Times Square, New York"
- Partial: "NY", "CA", "NYC", "LA"

**Invalid Inputs:**
- Random text: "xyz123abc"
- Special characters: "!@#$%"
- Empty string: ""
- Very long strings: 100+ characters

### Sample Location Selections:

- Urban areas (multiple locations): New York, Los Angeles, Chicago
- Suburban areas (fewer locations): Smaller cities
- Rural areas (limited locations): Sparse coverage areas
- Edge cases: State borders, coastal areas

---

## Comparison: Homepage vs Locations Page

**Similarities**:
- Header navigation structure
- Footer layout and links
- Accessibility standards
- Responsive breakpoints
- Browser compatibility requirements

**Differences**:
- **Functionality**: Locations page has map integration and search (unique)
- **Complexity**: Locations page has more interactive elements (map, geolocation)
- **User Journey**: Locations page is conversion-focused (booking flow)
- **Third-Party Dependencies**: Locations page depends on Google Maps API
- **Testing Scope**: Locations page requires more specialized testing (maps, geolocation)

---

## References

- [Homepage Test Plan](./HandAndStone_TestPlan.md) - For comparison and shared components
- [Category Page Test Plan](./CategoryPage_TestPlan.md) - For integration testing context
- [Hand & Stone Locations Page](https://custom-booking-app-release-hand-and-stone.vercel.app/locations/) - Test page
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) - Map integration documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) - Browser geolocation documentation

---

## POC 2 Enhancements

This test plan has been updated to reflect POC 2 architectural improvements:

✅ **In-Memory Index Search**: Section 2 now includes tests for local index loading and immediate suggestion display  
✅ **Smart Fallback Logic**: Tests distinguish between local index matches and Google Places API fallback  
✅ **Geographic Center Calculation**: Tests verify map centers on H&T spa cluster centers, not geographic centers  
✅ **Radius Filtering**: Tests verify 200-mile radius for states, 50-mile radius for cities/ZIP/addresses  
✅ **API Call Optimization**: Tests verify no API calls when local matches exist (1-5+ matches)  
✅ **Enhanced Search Behavior**: Tests cover case-insensitive search, partial matching, and special character handling

**Key Changes in Section 2: Location Search Functionality**
- Added test 2.0 for in-memory index loading
- Enhanced tests 2.3-2.12 to distinguish local vs. Google Places behavior
- Added tests 2.18-2.24 for new POC2 features (case-insensitive, partial match, geographic center, radius filtering)
- Updated expected results to reflect API call behavior and radius differences

---

*Test Plan Version: 2.0 (POC 2 Enhanced)*  
*Last Updated: 2025-01-XX*  
*Created by:*  
*Page Type: Locations Finder & Booking Interface with In-Memory Search*

