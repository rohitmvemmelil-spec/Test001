// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add custom type definitions
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with credentials
       * @example cy.login('username', 'password')
       */
      login(username: string, password: string): Chainable<void>
      
      /**
       * Custom command to make authenticated API requests
       * @example cy.apiRequest('GET', '/users', { token: 'abc123' })
       */
      apiRequest(method: string, endpoint: string, options?: any): Chainable<any>
      
      /**
       * Custom command to validate API response structure
       * @example cy.validateApiResponse(response, ['id', 'name', 'email'])
       */
      validateApiResponse(response: any, expectedFields: string[]): Chainable<void>

      /** Wait for page to be fully loaded */
      waitForPageLoad(): Chainable<void>

      /** Element should be visible and not disabled */
      shouldBeVisibleAndClickable(selector: string): Chainable<void>

      /** Validate form attributes for fields */
      validateForm(
        formSelector: string,
        validationRules: Record<string, { required?: boolean; type?: string; placeholder?: string }>
      ): Chainable<void>

      /** Validate API response time */
      validateResponseTime(maxTime?: number): Chainable<void>

      /** Run basic accessibility checks */
      checkAccessibility(): Chainable<void>

      /** Set mobile viewport and basic visibility */
      testMobileView(): Chainable<void>

      /** Set desktop viewport and basic visibility */
      testDesktopView(): Chainable<void>
    }
  }
}
