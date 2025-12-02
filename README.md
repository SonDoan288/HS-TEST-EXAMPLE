# 🎭 Test Example - Playwright TypeScript Test Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.56.1-blue.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

A comprehensive, enterprise-grade test automation framework built with Playwright and TypeScript. This framework provides robust end-to-end testing capabilities including functional testing, visual regression testing, and cross-browser validation for web applications.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Running Tests](#-running-tests)
- [Test Reports](#-test-reports)
- [Writing Tests](#-writing-tests)
- [CI/CD Integration](#-cicd-integration)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Project Overview

**Test Example** is a professional test automation framework designed to ensure quality and reliability of web applications through comprehensive automated testing. The framework leverages Playwright's powerful capabilities to provide:

- **Functional Testing**: Comprehensive end-to-end test coverage for critical user flows
- **Visual Regression Testing**: Automated visual comparison across different viewports and browsers
- **Cross-Browser Testing**: Support for Chromium, Firefox, and WebKit (Safari)
- **Responsive Testing**: Validation across multiple device viewports (Mobile, Tablet, Desktop)
- **Page Object Model**: Maintainable and scalable test architecture

## ✨ Key Features

- 🚀 **Parallel Test Execution**: Run multiple tests simultaneously for faster feedback
- 🌐 **Cross-Browser Testing**: Test on Chromium, Firefox, and WebKit browsers
- 📱 **Multi-Viewport Testing**: Validate responsive design across Desktop, Tablet, and Mobile
- 🎨 **Visual Regression Testing**: Automated screenshot comparison with configurable thresholds
- 📊 **Comprehensive Reporting**: HTML reports with detailed test results and traces
- 🔄 **Automatic Retries**: Built-in retry mechanism for flaky tests (CI environment)
- 🎭 **Page Object Model**: Clean, maintainable test architecture
- 🔍 **Trace Viewer**: Detailed execution traces for debugging failed tests
- ⚡ **Fast Execution**: Optimized for speed with parallel workers
- 🛡️ **Type Safety**: Full TypeScript support for better IDE assistance and error prevention

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Playwright** | ^1.56.1 | Core testing framework for browser automation |
| **TypeScript** | Latest | Type-safe test development |
| **Node.js** | 18+ | Runtime environment |
| **@playwright/test** | ^1.56.1 | Playwright test runner |
| **@playwright/mcp** | ^0.0.45 | Model Context Protocol integration |
| **@types/node** | ^24.9.2 | TypeScript definitions for Node.js |

## 📦 Prerequisites

Before installing the project, ensure you have the following installed on your system:

- **Node.js**: Version 18 or higher ([Download](https://nodejs.org/))
- **npm**: Comes bundled with Node.js (or use yarn/pnpm)
- **Git**: For cloning the repository ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended with Playwright extension

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB+ recommended for parallel execution)
- **Disk Space**: At least 500MB for dependencies and test artifacts

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd TestExample
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies including Playwright browsers.

### Step 3: Install Playwright Browsers

```bash
npx playwright install
```

This command downloads the browser binaries (Chromium, Firefox, WebKit) required for testing.

### Step 4: Verify Installation

```bash
npx playwright --version
```

You should see the Playwright version number if installation was successful.

### Step 5: Environment Configuration (Optional)

Create a `.env` file in the root directory for environment-specific variables:

```bash
# .env
BASE_URL=https://your-application-url.com
CI=false
```

> **Note**: The framework currently uses hardcoded URLs in test files. You can uncomment the dotenv configuration in `playwright.config.ts` to use environment variables.

## 📁 Project Structure

```
TestExample/
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
├── tests/                         # Test directory
│   ├── Functionality Test/        # Functional test suite
│   │   ├── Test Plan/            # Test plan documentation
│   │   │   ├── HomePage_TestPlan_Functional.md
│   │   │   ├── CategoryPage_TestPlan_Functional.md
│   │   │   └── LocationsPage_TestPlan_Functional.md
│   │   └── Test Specifications/  # Test implementation files
│   │       ├── home-page.functional.spec.ts
│   │       ├── category-page.functional.spec.ts
│   │       ├── locations-page.functional.spec.ts
│   │       └── pages/            # Page Object Model classes
│   │           ├── HomePage.ts
│   │           ├── CategoryPage.ts
│   │           └── LocationsPage.ts
│   └── Visual Test/              # Visual regression test suite
│       ├── Test Plan/
│       │   └── HomePage_Visual_TestPlan.md
│       └── Test Specifications/
│           ├── home-page.visual.spec.ts
│           └── home-page.visual.spec.ts-snapshots/  # Baseline screenshots
├── playwright-report/            # HTML test reports
├── test-results/                 # Test execution artifacts
└── README.md                     # This file
```

### Directory Overview

- **`tests/Functionality Test/`**: Contains functional end-to-end tests validating application behavior
- **`tests/Visual Test/`**: Contains visual regression tests for UI consistency
- **`tests/**/pages/`**: Page Object Model classes encapsulating page interactions
- **`playwright-report/`**: Generated HTML reports after test execution
- **`test-results/`**: Screenshots, traces, and other artifacts from test runs

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.ts`)

The framework is configured with the following key settings:

```typescript
export default defineConfig({
  testDir: './tests',              // Test files location
  fullyParallel: true,             // Enable parallel execution
  forbidOnly: !!process.env.CI,    // Prevent test.only in CI
  retries: process.env.CI ? 2 : 0, // Retry failed tests in CI
  workers: process.env.CI ? 1 : undefined, // Worker count
  reporter: 'html',                // HTML reporter
  use: {
    trace: 'on-first-retry',      // Capture trace on retry
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

### Key Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `testDir` | Directory containing test files | `./tests` |
| `fullyParallel` | Run tests in parallel | `true` |
| `retries` | Number of retries for failed tests | `0` (local), `2` (CI) |
| `workers` | Number of parallel workers | `undefined` (auto) |
| `reporter` | Test reporter format | `'html'` |
| `trace` | When to capture execution traces | `'on-first-retry'` |

### Environment Variables

The framework supports the following environment variables:

- `CI`: Set to `true` in CI environments to enable retries and single worker mode
- `BASE_URL`: Base URL for the application under test (currently commented out)

## 🏃 Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Specific Test File

```bash
# Functional tests
npx playwright test tests/Functionality\ Test/Test\ Specifications/home-page.functional.spec.ts

# Visual tests
npx playwright test tests/Visual\ Test/Test\ Specifications/home-page.visual.spec.ts
```

### Run Tests by Tag or Pattern

```bash
# Run tests matching a pattern
npx playwright test --grep "Hero Section"

# Run tests with specific tag
npx playwright test --grep @smoke
```

### Run in Headed Mode (See Browser)

```bash
npx playwright test --headed
```

### Run in Headless Mode (Default)

```bash
npx playwright test --headed=false
```

### Run on Specific Browser

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit (Safari) only
npx playwright test --project=webkit
```

### Run in Debug Mode

```bash
# Debug mode with Playwright Inspector
npx playwright test --debug

# Debug specific test file
npx playwright test home-page.functional.spec.ts --debug
```

### Parallel Execution

```bash
# Run with specific number of workers
npx playwright test --workers=4

# Run tests serially (one at a time)
npx playwright test --workers=1
```

### Update Visual Snapshots

```bash
# Update baseline screenshots for visual tests
npx playwright test --update-snapshots
```

### Additional Useful Commands

```bash
# Show test list without running
npx playwright test --list

# Run tests in UI mode (interactive)
npx playwright test --ui

# Generate code from user interactions
npx playwright codegen <url>
```

## 📊 Test Reports

### HTML Reporter

After test execution, an HTML report is automatically generated:

```bash
# View the HTML report
npx playwright show-report
```

The report includes:
- ✅ Test execution summary
- 📸 Screenshots of failed tests
- 🎬 Video recordings (if enabled)
- 🔍 Execution traces
- ⏱️ Performance metrics
- 📈 Test timeline

### Report Location

Reports are saved in the `playwright-report/` directory. Open `playwright-report/index.html` in a browser to view.

### Trace Viewer

For detailed debugging, use the trace viewer:

```bash
# Open trace viewer
npx playwright show-trace trace.zip
```

Traces are automatically captured when tests fail and retry (configured in `playwright.config.ts`).

## ✍️ Writing Tests

### Test Structure

The framework follows the **Page Object Model (POM)** pattern for maintainability and reusability.

### Example: Functional Test

```typescript
import { test, expect } from '@playwright/test';
import { HandStonePage } from './pages/HomePage';

const BASE_URL = 'https://example.com/';

test.describe('Homepage - Functional Tests', () => {
  let homePage: HandStonePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HandStonePage(page);
    await homePage.goto();
    await homePage.expectPageLoaded();
  });

  test('Verify Hero Section Loads', async ({ page }) => {
    await test.step('Navigate to homepage', async () => {
      await expect(page).toHaveURL(/\/$/);
    });

    await test.step('Verify hero section is visible', async () => {
      const heading = page.getByRole('heading', { name: /Massages/i });
      await expect(heading).toBeVisible();
    });
  });
});
```

### Example: Visual Regression Test

```typescript
import { test, expect } from '@playwright/test';

const VIEWPORTS = {
  'Desktop': { width: 1920, height: 1080 },
  'Tablet': { width: 768, height: 1024 },
  'Mobile': { width: 375, height: 667 },
} as const;

test.describe('Homepage - Visual Tests', () => {
  test('Verify header navigation across viewports', async ({ page }) => {
    await page.goto('https://example.com/');
    
    for (const [name, size] of Object.entries(VIEWPORTS)) {
      await page.setViewportSize(size);
      await expect(page).toHaveScreenshot(`header-${name.toLowerCase()}.png`, {
        threshold: 0.2,
        maxDiffPixels: 100,
      });
    }
  });
});
```

### Page Object Model Example

```typescript
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get heroSection(): Locator {
    return this.page.locator('[data-testid="hero-section"]');
  }

  get bookNowButton(): Locator {
    return this.page.getByRole('button', { name: 'Book Now' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async expectPageLoaded() {
    await this.page.waitForLoadState('networkidle');
  }
}
```

### Best Practices for Writing Tests

1. **Use Page Object Model**: Encapsulate page interactions in reusable classes
2. **Use Semantic Locators**: Prefer `getByRole`, `getByLabel`, `getByText` over CSS selectors
3. **Add Test Steps**: Use `test.step()` for better reporting and debugging
4. **Wait for Elements**: Use Playwright's auto-waiting instead of hardcoded `waitForTimeout`
5. **Use Descriptive Names**: Test names should clearly describe what is being tested
6. **Keep Tests Independent**: Each test should be able to run independently
7. **Handle Dynamic Content**: Use regular expressions or flexible locators for dynamic content

## 🔄 CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
      env:
        CI: true
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

### Jenkins Pipeline Example

```groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
            post {
                always {
                    publishHTML([
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Test Report'
                    ])
                }
            }
        }
    }
}
```

## 📚 Best Practices

### Test Organization

- ✅ Organize tests by feature or page
- ✅ Use descriptive test file names: `home-page.functional.spec.ts`
- ✅ Group related tests using `test.describe()` blocks
- ✅ Separate test plans from test implementations

### Code Quality

- ✅ Follow TypeScript best practices
- ✅ Use meaningful variable and function names
- ✅ Add comments for complex logic
- ✅ Keep functions small and focused
- ✅ Reuse page objects and utilities

### Test Reliability

- ✅ Use Playwright's auto-waiting mechanisms
- ✅ Avoid hardcoded timeouts (`waitForTimeout`)
- ✅ Use stable locators (prefer semantic locators)
- ✅ Handle dynamic content gracefully
- ✅ Clean up test data after tests

### Performance

- ✅ Run tests in parallel when possible
- ✅ Use `test.beforeEach()` for common setup
- ✅ Minimize test execution time
- ✅ Use `test.skip()` for temporarily disabled tests

### Maintenance

- ✅ Keep page objects up-to-date with UI changes
- ✅ Review and update test plans regularly
- ✅ Remove obsolete tests
- ✅ Document complex test scenarios

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: Tests fail with "Browser not found"

**Solution:**
```bash
npx playwright install
```

#### Issue: Tests timeout or hang

**Solution:**
- Check network connectivity
- Verify the application URL is accessible
- Increase timeout in `playwright.config.ts`:
  ```typescript
  use: {
    actionTimeout: 30000,
  }
  ```

#### Issue: Visual tests fail due to minor differences

**Solution:**
- Adjust threshold in visual test options:
  ```typescript
  await expect(page).toHaveScreenshot('image.png', {
    threshold: 0.3,  // Increase threshold
    maxDiffPixels: 500,
  });
  ```

#### Issue: Tests are flaky (intermittent failures)

**Solution:**
- Use `waitForLoadState()` before assertions
- Add explicit waits for dynamic content
- Increase retry count in CI:
  ```typescript
  retries: process.env.CI ? 2 : 0
  ```

#### Issue: Cannot find module errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: TypeScript compilation errors

**Solution:**
- Verify `tsconfig.json` configuration
- Ensure all types are installed: `npm install --save-dev @types/node`

### Debugging Tips

1. **Use Debug Mode**: Run tests with `--debug` flag to step through execution
2. **Check Traces**: Use `npx playwright show-trace` to view detailed execution traces
3. **Screenshots**: Failed tests automatically capture screenshots in `test-results/`
4. **Console Logs**: Check browser console for errors:
   ```typescript
   page.on('console', msg => console.log(msg.text()));
   ```

## 🤝 Contributing

We welcome contributions to improve the test automation framework! Please follow these guidelines:

### Contribution Process

1. **Fork the Repository**: Create your own fork of the project
2. **Create a Branch**: Use descriptive branch names (`feature/add-new-test`, `fix/flaky-test`)
3. **Write Tests**: Follow the existing patterns and best practices
4. **Run Tests**: Ensure all tests pass before submitting
5. **Submit Pull Request**: Provide clear description of changes

### Code Standards

- Follow TypeScript style guidelines
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Ensure tests are maintainable and readable

### Pull Request Checklist

- [ ] All tests pass locally
- [ ] New tests are added for new features
- [ ] Code follows project conventions
- [ ] Documentation is updated
- [ ] Commit messages are descriptive

## 📄 License

This project is licensed under the **ISC License**.

---

## 📞 Support

For questions, issues, or contributions, please open an issue in the repository or contact the project maintainers.

**Happy Testing! 🎭✨**

