// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for login functionality
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login')
  cy.get('[data-cy=username]').type(username)
  cy.get('[data-cy=password]').type(password)
  cy.get('[data-cy=login-button]').click()
  cy.url().should('not.include', '/login')
})

// Custom command for API requests with authentication
Cypress.Commands.add('apiRequest', (method: string, endpoint: string, options: any = {}) => {
  const defaultOptions = {
    method: method,
    url: `${Cypress.env('apiBaseUrl')}${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    failOnStatusCode: false
  }

  const requestOptions = { ...defaultOptions, ...options }
  
  return cy.request(requestOptions)
})

// Custom command to validate API response structure
Cypress.Commands.add('validateApiResponse', (response: any, expectedFields: string[]) => {
  expect(response.status).to.be.oneOf([200, 201, 204])
  
  if (response.body) {
    expectedFields.forEach(field => {
      expect(response.body).to.have.property(field)
    })
  }
})

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.window().its('document').its('readyState').should('eq', 'complete')
})

// Custom command to check if element is visible and clickable
Cypress.Commands.add('shouldBeVisibleAndClickable', (selector: string) => {
  cy.get(selector).should('be.visible').should('not.be.disabled')
})

// Override visit command to include custom logic
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  // Avoid cy.* inside overwrites to prevent mixing command queues
  Cypress.log({ name: 'visit', message: String(url) })
  return originalFn(url as any, options as any)
})

// Custom command for form validation
Cypress.Commands.add('validateForm', (formSelector: string, validationRules: any) => {
  cy.get(formSelector).within(() => {
    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field]
      
      if (rule.required) {
        cy.get(`[name="${field}"]`).should('have.attr', 'required')
      }
      
      if (rule.type) {
        cy.get(`[name="${field}"]`).should('have.attr', 'type', rule.type)
      }
      
      if (rule.placeholder) {
        cy.get(`[name="${field}"]`).should('have.attr', 'placeholder', rule.placeholder)
      }
    })
  })
})

// Custom command for API response time validation
Cypress.Commands.add('validateResponseTime', (maxTime: number = 3000) => {
  cy.get('@apiRequest').then((response: any) => {
    expect(response.duration).to.be.lessThan(maxTime)
  })
})

// Custom command for checking accessibility
Cypress.Commands.add('checkAccessibility', () => {
  cy.injectAxe()
  cy.checkA11y()
})

// Custom command for mobile viewport testing
Cypress.Commands.add('testMobileView', () => {
  cy.viewport('iphone-x')
  cy.get('body').should('be.visible')
})

// Custom command for desktop viewport testing
Cypress.Commands.add('testDesktopView', () => {
  cy.viewport(1920, 1080)
  cy.get('body').should('be.visible')
})

// Export for TypeScript
export {}
