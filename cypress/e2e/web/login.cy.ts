import { LoginCredentials, FormValidationRule } from '../../support/types'

describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.fixture('users.json').as('usersData')
    // Navigate to login page - replace with your actual login URL
    cy.visit('/login')
  })

  describe('Page Load and Structure', () => {
    it('should load login page successfully', () => {
      cy.waitForPageLoad()
      cy.get('body').should('be.visible')
      cy.title().should('contain', 'Login')
    })

    it('should display all required login form elements', () => {
      cy.get('[data-cy=username]').should('be.visible')
      cy.get('[data-cy=password]').should('be.visible')
      cy.get('[data-cy=login-button]').should('be.visible')
    })

    it('should have proper form validation attributes', () => {
      const validationRules: Record<string, FormValidationRule> = {
        username: { required: true, type: 'text' },
        password: { required: true, type: 'password' }
      }
      
      cy.validateForm('[data-cy=login-form]', validationRules)
    })

    it('should be accessible', () => {
      cy.checkAccessibility()
    })
  })

  describe('Valid Login Scenarios', () => {
    it('should login successfully with valid credentials', () => {
      cy.get('@usersData').then((usersData: any) => {
        const credentials = usersData.loginCredentials.valid
        
        cy.get('[data-cy=username]').type(credentials.username)
        cy.get('[data-cy=password]').type(credentials.password)
        cy.get('[data-cy=login-button]').click()
        
        // Verify successful login
        cy.url().should('not.include', '/login')
        cy.get('[data-cy=welcome-message]').should('be.visible')
      })
    })

    it('should show success message after login', () => {
      cy.get('@usersData').then((usersData: any) => {
        const credentials = usersData.loginCredentials.valid
        
        cy.login(credentials.username, credentials.password)
        cy.get('[data-cy=success-message]').should('be.visible')
      })
    })

    it('should redirect to dashboard after login', () => {
      cy.get('@usersData').then((usersData: any) => {
        const credentials = usersData.loginCredentials.valid
        
        cy.login(credentials.username, credentials.password)
        cy.url().should('include', '/dashboard')
      })
    })
  })

  describe('Invalid Login Scenarios', () => {
    it('should show error message for invalid credentials', () => {
      cy.get('@usersData').then((usersData: any) => {
        const credentials = usersData.loginCredentials.invalid
        
        cy.get('[data-cy=username]').type(credentials.username)
        cy.get('[data-cy=password]').type(credentials.password)
        cy.get('[data-cy=login-button]').click()
        
        cy.get('[data-cy=error-message]').should('be.visible')
        cy.get('[data-cy=error-message]').should('contain', 'Invalid credentials')
      })
    })

    it('should not redirect on invalid login', () => {
      cy.get('@usersData').then((usersData: any) => {
        const credentials = usersData.loginCredentials.invalid
        
        cy.get('[data-cy=username]').type(credentials.username)
        cy.get('[data-cy=password]').type(credentials.password)
        cy.get('[data-cy=login-button]').click()
        
        cy.url().should('include', '/login')
      })
    })

    it('should handle empty form submission', () => {
      cy.get('[data-cy=login-button]').click()
      cy.get('[data-cy=error-message]').should('be.visible')
    })

    it('should validate required fields', () => {
      // Try to submit with empty username
      cy.get('[data-cy=password]').type('password123')
      cy.get('[data-cy=login-button]').click()
      cy.get('[data-cy=username-error]').should('be.visible')
      
      // Try to submit with empty password
      cy.get('[data-cy=username]').clear().type('testuser')
      cy.get('[data-cy=password]').clear()
      cy.get('[data-cy=login-button]').click()
      cy.get('[data-cy=password-error]').should('be.visible')
    })
  })

  describe('Form Interaction Tests', () => {
    it('should handle keyboard navigation', () => {
      cy.get('[data-cy=username]').focus()
      cy.get('[data-cy=username]').should('be.focused')
      
      cy.get('[data-cy=username]').type('testuser')
      cy.get('[data-cy=password]').focus()
      cy.get('[data-cy=password]').should('be.focused')
      
      cy.get('[data-cy=password]').type('password123')
      cy.get('[data-cy=login-button]').focus()
      cy.get('[data-cy=login-button]').should('be.focused')
    })

    it('should handle Enter key submission', () => {
      cy.get('[data-cy=username]').type('testuser')
      cy.get('[data-cy=password]').type('password123{enter}')
      
      // Should attempt login
      cy.url().should('not.include', '/login')
    })

    it('should clear form fields properly', () => {
      cy.get('[data-cy=username]').type('testuser')
      cy.get('[data-cy=password]').type('password123')
      
      cy.get('[data-cy=username]').clear()
      cy.get('[data-cy=password]').clear()
      
      cy.get('[data-cy=username]').should('have.value', '')
      cy.get('[data-cy=password]').should('have.value', '')
    })
  })

  describe('Security Tests', () => {
    it('should not expose password in URL', () => {
      cy.get('[data-cy=username]').type('testuser')
      cy.get('[data-cy=password]').type('password123')
      cy.get('[data-cy=login-button]').click()
      
      cy.url().should('not.contain', 'password123')
    })

    it('should use HTTPS for login', () => {
      cy.url().should('match', /^https:\/\//)
    })

    it('should have proper input types for security', () => {
      cy.get('[data-cy=username]').should('have.attr', 'type', 'text')
      cy.get('[data-cy=password]').should('have.attr', 'type', 'password')
    })
  })

  describe('Responsive Design Tests', () => {
    it('should work on mobile devices', () => {
      cy.testMobileView()
      cy.get('[data-cy=login-form]').should('be.visible')
      cy.get('[data-cy=username]').should('be.visible')
      cy.get('[data-cy=password]').should('be.visible')
      cy.get('[data-cy=login-button]').should('be.visible')
    })

    it('should work on desktop devices', () => {
      cy.testDesktopView()
      cy.get('[data-cy=login-form]').should('be.visible')
      cy.get('[data-cy=username]').should('be.visible')
      cy.get('[data-cy=password]').should('be.visible')
      cy.get('[data-cy=login-button]').should('be.visible')
    })

    it('should maintain form functionality on different screen sizes', () => {
      const viewports = [
        { width: 375, height: 667 }, // iPhone
        { width: 768, height: 1024 }, // iPad
        { width: 1920, height: 1080 } // Desktop
      ]
      
      viewports.forEach(viewport => {
        cy.viewport(viewport.width, viewport.height)
        cy.get('[data-cy=username]').should('be.visible')
        cy.get('[data-cy=password]').should('be.visible')
        cy.get('[data-cy=login-button]').should('be.visible')
      })
    })
  })

  describe('Performance Tests', () => {
    it('should load login page within acceptable time', () => {
      cy.visit('/login', { timeout: 10000 })
      cy.get('[data-cy=login-form]').should('be.visible')
    })

    it('should handle rapid form submissions', () => {
      cy.get('[data-cy=username]').type('testuser')
      cy.get('[data-cy=password]').type('password123')
      
      // Rapid clicks should not cause issues
      for (let i = 0; i < 3; i++) {
        cy.get('[data-cy=login-button]').click()
      }
      
      // Should still function normally
      cy.get('[data-cy=login-form]').should('be.visible')
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      // Simulate network error by intercepting requests
      cy.intercept('POST', '/api/login', { forceNetworkError: true })
      
      cy.get('[data-cy=username]').type('testuser')
      cy.get('[data-cy=password]').type('password123')
      cy.get('[data-cy=login-button]').click()
      
      cy.get('[data-cy=error-message]').should('be.visible')
    })

    it('should handle server errors', () => {
      cy.intercept('POST', '/api/login', { statusCode: 500 })
      
      cy.get('[data-cy=username]').type('testuser')
      cy.get('[data-cy=password]').type('password123')
      cy.get('[data-cy=login-button]').click()
      
      cy.get('[data-cy=error-message]').should('be.visible')
    })
  })
})
