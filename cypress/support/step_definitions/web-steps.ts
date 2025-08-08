import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('I am on the login page', () => {
  // For demo purposes, we'll use a mock login page
  // In a real scenario, you would navigate to your actual login page
  cy.visit('https://example.com/login')
  // Alternative: cy.visit('/login') if using relative paths
})

Given('I visit {string}', (url: string) => {
  cy.visit(url)
})

Then('I should see text {string}', (text: string) => {
  cy.contains(text).should('be.visible')
})

Given('I open an inline page with heading {string}', (heading: string) => {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Inline</title></head><body><h1>${heading}</h1></body></html>`
  cy.document().then((doc) => {
    doc.open()
    doc.write(html)
    doc.close()
  })
})

When('I enter {string} in the email field', (email: string) => {
  cy.get('[data-testid="email-input"], input[type="email"], #email').type(email)
})

When('I enter {string} in the password field', (password: string) => {
  cy.get('[data-testid="password-input"], input[type="password"], #password').type(password)
})

When('I click the login button', () => {
  cy.get('[data-testid="login-button"], button[type="submit"], #login-btn').click()
})

When('I leave the email field empty', () => {
  cy.get('[data-testid="email-input"], input[type="email"], #email').clear()
})

When('I leave the password field empty', () => {
  cy.get('[data-testid="password-input"], input[type="password"], #password').clear()
})

When('I click the password visibility toggle', () => {
  cy.get('[data-testid="password-toggle"], .password-toggle, #password-toggle').click()
})

When('I check the {string} checkbox', (checkboxLabel: string) => {
  cy.get(`[data-testid="${checkboxLabel.toLowerCase().replace(/\s+/g, '-')}"], input[type="checkbox"]`).check()
})

Then('I should be redirected to the dashboard', () => {
  cy.url().should('include', '/dashboard')
  // Alternative: cy.url().should('eq', 'https://example.com/dashboard')
})

Then('I should see a welcome message', () => {
  cy.get('[data-testid="welcome-message"], .welcome-message, h1').should('be.visible')
})

Then('I should see my user profile information', () => {
  cy.get('[data-testid="user-profile"], .user-profile, #profile').should('be.visible')
})

Then('I should see an error message', () => {
  cy.get('[data-testid="error-message"], .error-message, .alert-danger').should('be.visible')
})

Then('I should remain on the login page', () => {
  cy.url().should('include', '/login')
})

Then('I should see validation error messages', () => {
  cy.get('[data-testid="validation-error"], .validation-error, .error').should('be.visible')
})

Then('the form should not be submitted', () => {
  // This could be verified by checking that we're still on the login page
  // or that no network request was made
  cy.url().should('include', '/login')
})

Then('the password should be hidden by default', () => {
  cy.get('[data-testid="password-input"], input[type="password"], #password').should('have.attr', 'type', 'password')
})

Then('the password should be visible', () => {
  cy.get('[data-testid="password-input"], input[type="password"], #password').should('have.attr', 'type', 'text')
})

Then('the password should be hidden again', () => {
  cy.get('[data-testid="password-input"], input[type="password"], #password').should('have.attr', 'type', 'password')
})

Then('my login credentials should be remembered for next time', () => {
  // This could be verified by checking localStorage or cookies
  cy.get('[data-testid="remember-me"], input[name="remember"]').should('be.checked')
})
