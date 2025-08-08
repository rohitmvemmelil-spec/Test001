# Quick Start Guide - Cypress with Cucumber

This guide will help you get started with the Cypress TypeScript project that includes Cucumber BDD support.

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)
```bash
# Make the setup script executable and run it
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Create report directories
mkdir -p cypress/reports/cucumber-{html,json,messages}

# Verify installation
npx cypress verify
```

## 🧪 Running Your First Tests

### 1. Open Cypress Test Runner
```bash
npm run cypress:open
```

### 2. Run Traditional Cypress Tests
```bash
# Run all traditional tests
npm run test:all

# Run only web tests
npm run test:web

# Run only API tests
npm run test:api
```

### 3. Run Cucumber BDD Tests
```bash
# Run all Cucumber features
npm run test:cucumber

# Run specific feature files
npx cypress run --spec "cypress/e2e/features/api-users.feature"
npx cypress run --spec "cypress/e2e/features/web-login.feature"
```

## 📁 Understanding the Project Structure

```
cypress/e2e/
├── api/                    # Traditional Cypress API tests
│   └── users.cy.ts
├── web/                    # Traditional Cypress web tests
│   ├── dashboard.cy.ts
│   └── login.cy.ts
├── features/               # Cucumber feature files (Gherkin)
│   ├── api-users.feature
│   └── web-login.feature
└── step-definitions/       # Cucumber step definitions (TypeScript)
    ├── api-steps.ts
    └── web-steps.ts
```

## 📝 Writing Your First Cucumber Test

### 1. Create a Feature File
Create `cypress/e2e/features/my-feature.feature`:

```gherkin
Feature: My First Feature
  As a user
  I want to test something
  So that I can verify it works

  Scenario: Basic test scenario
    Given I am on the homepage
    When I click the login button
    Then I should see the login form
```

### 2. Create Step Definitions
Create `cypress/e2e/step-definitions/my-steps.ts`:

```typescript
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('I am on the homepage', () => {
  cy.visit('/')
})

When('I click the login button', () => {
  cy.get('[data-testid="login-button"]').click()
})

Then('I should see the login form', () => {
  cy.get('[data-testid="login-form"]').should('be.visible')
})
```

### 3. Run Your Test
```bash
npx cypress run --spec "cypress/e2e/features/my-feature.feature"
```

## 🔍 Viewing Test Reports

After running Cucumber tests, reports are generated in:
- `cypress/reports/cucumber-html/cucumber-report.html` - HTML report
- `cypress/reports/cucumber-json/cucumber-report.json` - JSON report

Open the HTML report in your browser to see detailed test results.

## 🛠️ Common Commands

```bash
# Development
npm run cypress:open          # Open Cypress Test Runner

# Traditional Tests
npm run test:web             # Run web tests only
npm run test:api             # Run API tests only
npm run test:all             # Run all traditional tests

# Cucumber BDD Tests
npm run test:cucumber        # Run all Cucumber features

# Specific Test Files
npx cypress run --spec "cypress/e2e/features/api-users.feature"
npx cypress run --spec "cypress/e2e/web/login.cy.ts"
```

## 🐛 Troubleshooting

### Issue: "Cannot find module '@badeball/cypress-cucumber-preprocessor'"
**Solution**: Run `npm install` to install dependencies

### Issue: "Step definitions not found"
**Solution**: Check that your step definitions are in `cypress/e2e/step-definitions/` and the path is correct in `cypress.config.json`

### Issue: "Reports not generating"
**Solution**: Ensure the reports directories exist:
```bash
mkdir -p cypress/reports/cucumber-{html,json,messages}
```

### Issue: "TypeScript errors"
**Solution**: Make sure all dependencies are installed and `tsconfig.json` includes the step definitions path

## 📚 Next Steps

1. **Read the full README.md** for detailed documentation
2. **Explore the existing feature files** to understand the patterns
3. **Modify the step definitions** to match your application
4. **Add your own features** following the established patterns
5. **Customize the configuration** in `cypress.config.ts` and `cypress.config.json`

## 🆘 Need Help?

- Check the main `README.md` for comprehensive documentation
- Review the existing feature files and step definitions
- Ensure all dependencies are properly installed
- Verify your configuration files are correct

Happy testing! 🎉
