# Cypress TypeScript Project with Cucumber BDD

![Cypress](https://github.com/rohitmvemmelil-spec/Test001/actions/workflows/cypress.yml/badge.svg)

This project demonstrates automated testing using Cypress with TypeScript and Cucumber for Behavior Driven Development (BDD).

## Features

- **Cypress E2E Testing**: Web and API testing capabilities
- **TypeScript Support**: Full TypeScript integration for type safety
- **Cucumber BDD**: Behavior Driven Development with Gherkin syntax
- **API Testing**: REST API testing with JSON validation
- **Web Testing**: UI automation with modern selectors
- **HTML Reports**: Cucumber HTML reports for test results
- **JSON Reports**: Structured test reports for CI/CD integration

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. **Install Node.js** (if not already installed):
   ```bash
   # Using Homebrew (macOS)
   brew install node
   
   # Or download from https://nodejs.org/
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

## Project Structure

```
cypress-typescript-project/
├── cypress/
│   ├── e2e/
│   │   ├── api/                    # Traditional Cypress API tests
│   │   │   └── users.cy.ts
│   │   ├── web/                    # Traditional Cypress web tests
│   │   │   ├── dashboard.cy.ts
│   │   │   └── login.cy.ts
│   │   ├── features/               # Cucumber feature files
│   │   │   ├── api-users.feature
│   │   │   └── web-login.feature
│   │   └── step-definitions/       # Cucumber step definitions
│   │       ├── api-steps.ts
│   │       └── web-steps.ts
│   ├── fixtures/
│   │   └── users.json
│   ├── support/
│   │   ├── commands.ts
│   │   ├── e2e.ts
│   │   └── types.ts
│   └── reports/                    # Test reports
│       ├── cucumber-html/
│       ├── cucumber-json/
│       └── cucumber-messages/
├── cypress.config.ts               # Cypress configuration
├── cypress.config.json             # Cucumber configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Available Scripts

### Traditional Cypress Tests
```bash
# Run all traditional Cypress tests
npm run cypress:run

# Run only web tests
npm run test:web

# Run only API tests
npm run test:api
```

### Cucumber BDD Tests
```bash
# Run all Cucumber feature tests
npm run test:cucumber

# Run specific feature files
npx cypress run --spec "cypress/e2e/features/api-users.feature"
npx cypress run --spec "cypress/e2e/features/web-login.feature"
```

### Development
```bash
# Open Cypress Test Runner
npm run cypress:open
```

## Cucumber Features

### API Testing (`api-users.feature`)
- **Get all users**: Tests GET /users endpoint
- **Get specific user**: Tests GET /users/{id} endpoint
- **Create new user**: Tests POST /users endpoint
- **Update user**: Tests PUT /users/{id} endpoint
- **Delete user**: Tests DELETE /users/{id} endpoint

### Web Testing (`web-login.feature`)
- **Successful login**: Tests valid credentials
- **Failed login**: Tests invalid credentials
- **Empty fields**: Tests form validation
- **Password visibility**: Tests password toggle functionality
- **Remember me**: Tests persistent login functionality

## Step Definitions

### API Steps (`api-steps.ts`)
- HTTP request methods (GET, POST, PUT, DELETE)
- Response status validation
- JSON response structure validation
- Data table handling for request bodies

### Web Steps (`web-steps.ts`)
- Page navigation
- Form interactions (input, click, check)
- Element visibility and state validation
- URL validation
- Error message verification

## Configuration

### Cypress Configuration (`cypress.config.ts`)
- Base URL configuration
- Cucumber preprocessor setup
- Test patterns for both traditional and Cucumber tests
- Viewport and timeout settings

### Cucumber Configuration (`cypress.config.json`)
- Step definitions path
- HTML report generation
- JSON report generation
- Message report generation

## Reports

After running Cucumber tests, reports are generated in:
- `cypress/reports/cucumber-html/cucumber-report.html` - HTML report
- `cypress/reports/cucumber-json/cucumber-report.json` - JSON report
- `cypress/reports/cucumber-messages/cucumber-report.ndjson` - Messages report

## Writing New Features

1. **Create a feature file** in `cypress/e2e/features/`:
   ```gherkin
   Feature: My New Feature
     As a user
     I want to perform some action
     So that I can achieve a goal

     Scenario: Basic scenario
       Given I am on the page
       When I perform an action
       Then I should see the expected result
   ```

2. **Create step definitions** in `cypress/e2e/step-definitions/`:
   ```typescript
   import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

   Given('I am on the page', () => {
     cy.visit('/my-page')
   })

   When('I perform an action', () => {
     cy.get('[data-testid="button"]').click()
   })

   Then('I should see the expected result', () => {
     cy.get('[data-testid="result"]').should('be.visible')
   })
   ```

## Best Practices

1. **Use data-testid attributes** for reliable element selection
2. **Keep step definitions reusable** across multiple scenarios
3. **Use Background sections** for common setup steps
4. **Write descriptive scenario names** that explain the business value
5. **Use data tables** for complex input data
6. **Generate comprehensive reports** for stakeholders

## Troubleshooting

### Common Issues

1. **TypeScript errors**: Ensure all dependencies are installed
   ```bash
   npm install
   ```

2. **Cucumber not running**: Check the configuration files
   - Verify `cypress.config.ts` has Cucumber preprocessor setup
   - Ensure `cypress.config.json` has correct step definitions path

3. **Step definitions not found**: Check the path in `cypress.config.json`
   ```json
   {
     "cypress-cucumber-preprocessor": {
       "stepDefinitions": ["cypress/e2e/step-definitions/**/*.ts"]
     }
   }
   ```

4. **Reports not generating**: Ensure the reports directory exists
   ```bash
   mkdir -p cypress/reports/cucumber-{html,json,messages}
   ```

## Contributing

1. Follow the existing code structure
2. Add new features in the `features/` directory
3. Create corresponding step definitions
4. Update this README if adding new functionality
5. Ensure all tests pass before submitting changes

## License

MIT License - see LICENSE file for details
