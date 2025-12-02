# Visual Regression Testing - Hand & Stone

This directory contains visual regression tests for the Hand & Stone booking application using Playwright's visual comparison capabilities.

## 📁 Directory Structure

```
Visual Test/
├── README.md (this file)
├── Test Plan/
│   └── HomePage_Visual_TestPlan.md
└── Test Specifications/
    ├── home-page.visual.spec.ts
    └── __snapshots__/ (auto-generated)
```

## 🚀 Quick Start

### Running Visual Tests

```bash
# Run all visual tests
npx playwright test tests/Visual\ Test/Test\ Specifications/home-page.visual.spec.ts

# Run specific browser
npx playwright test tests/Visual\ Test/Test\ Specifications/home-page.visual.spec.ts --project=chromium

# Run specific viewport test
npx playwright test tests/Visual\ Test/Test\ Specifications/home-page.visual.spec.ts -g "Desktop XXL"

# Run in UI mode (interactive)
npx playwright test tests/Visual\ Test/Test\ Specifications/home-page.visual.spec.ts --ui
```

### Updating Snapshots

When you make intentional UI changes, update the snapshots:

```bash
# Update all snapshots
npx playwright test tests/Visual\ Test/Test\ Specifications/home-page.visual.spec.ts --update-snapshots

# Update specific test snapshots
npx playwright test tests/Visual\ Test/Test\ Specifications/home-page.visual.spec.ts -g "Hero Section" --update-snapshots
```

## 📸 Snapshot Management

### Snapshot Storage

Snapshots are stored in:
```
tests/Visual Test/Test Specifications/__snapshots__/
```

### Reviewing Failed Tests

When a test fails, Playwright generates:
- **Diff images**: Shows what changed (red = removed, green = added)
- **Actual images**: Current state
- **Expected images**: Previous baseline

View them in the HTML report:
```bash
npx playwright show-report
```

### Best Practices

1. **Review Before Updating**: Always review diffs before updating snapshots
2. **Commit Snapshots**: Include snapshot updates in the same PR as code changes
3. **Version Control**: Keep snapshots in version control (Git)
4. **CI/CD Integration**: Run visual tests on every PR

## ⚙️ Configuration

### Visual Comparison Thresholds

Current settings in `home-page.visual.spec.ts`:
- **Threshold**: 0.2 (20% pixel difference tolerance)
- **Max Diff Pixels**: 100
- **Max Diff Pixel Ratio**: 0.01 (1%)

Adjust these values if you need stricter or more lenient comparisons.

### Viewports Tested

- **Desktop XXL**: 1920x1080
- **Desktop XL**: 1440x900
- **Desktop L**: 1280x720
- **Tablet**: 768x1024
- **Mobile**: 375x667

### Browsers Tested

- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- WebKit (Desktop Safari)

## 📋 Test Coverage

### Full Page Tests
- ✅ Initial page load (all viewports)
- ✅ After scroll
- ✅ With/without cookie banner

### Component Tests
- ✅ Hero section
- ✅ Value proposition section
- ✅ Treatments carousel
- ✅ Find a Spa section
- ✅ Membership section
- ✅ Gift Cards section
- ✅ Onboarding cards
- ✅ Experts section
- ✅ Franchise section
- ✅ Header navigation
- ✅ Footer

### Interaction States
- ✅ Button hover states
- ✅ Link focus states
- ✅ Mobile menu (collapsed/expanded)
- ✅ Carousel navigation

### Edge Cases
- ✅ Slow network conditions
- ✅ Content loading states
- ✅ Layout shift detection

## 🔧 Troubleshooting

### Test Failures

**Issue**: Tests fail with "Screenshot mismatch"

**Solutions**:
1. Review the diff image to see what changed
2. If change is intentional: Update snapshots with `--update-snapshots`
3. If change is a bug: Fix the code, then update snapshots

**Issue**: Tests timeout

**Solutions**:
1. Check network connectivity
2. Increase timeout in test configuration
3. Verify the base URL is accessible

**Issue**: Dynamic content causes false positives

**Solutions**:
1. Add more content to the `maskDynamicContent()` function
2. Adjust visual comparison thresholds
3. Use more specific selectors

### Snapshot Updates

**When to Update**:
- ✅ After intentional UI/design changes
- ✅ After Contentful content updates
- ✅ After responsive design adjustments

**When NOT to Update**:
- ❌ When tests fail due to bugs
- ❌ When only code logic changes (no UI impact)
- ❌ When tests fail due to flakiness

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Visual Regression Tests

on:
  pull_request:
    branches: [main, develop]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test tests/Visual\ Test/Test\ Specifications/ --reporter=html
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📚 Resources

- [Playwright Visual Testing Docs](https://playwright.dev/docs/test-snapshots)
- [Test Plan](./Test%20Plan/HomePage_Visual_TestPlan.md)
- [HomePage POM](../Functionality%20Test/Test%20Specifications/pages/HomePage.ts)

## 📝 Notes

- Snapshots are stored per browser and viewport
- Dynamic content (cookies, timestamps) is masked automatically
- Tests wait for network idle and image loading
- Full page screenshots capture entire scrollable area

---

**Last Updated**: 2025-01-XX  
**Maintained By**: QA Team

