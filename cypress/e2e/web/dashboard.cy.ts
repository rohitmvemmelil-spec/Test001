import { User } from '../../support/types'

describe('Dashboard Tests', () => {
  beforeEach(() => {
    cy.fixture('users.json').as('usersData')
    // Login before accessing dashboard
    cy.get('@usersData').then((usersData: any) => {
      const credentials = usersData.loginCredentials.valid
      cy.login(credentials.username, credentials.password)
    })
  })

  describe('Dashboard Load and Structure', () => {
    it('should load dashboard successfully after login', () => {
      cy.url().should('include', '/dashboard')
      cy.get('[data-cy=dashboard-container]').should('be.visible')
    })

    it('should display user information', () => {
      cy.get('[data-cy=user-info]').should('be.visible')
      cy.get('[data-cy=user-name]').should('be.visible')
      cy.get('[data-cy=user-email]').should('be.visible')
    })

    it('should display navigation menu', () => {
      cy.get('[data-cy=navigation-menu]').should('be.visible')
      cy.get('[data-cy=nav-item]').should('have.length.greaterThan', 0)
    })

    it('should display dashboard widgets', () => {
      cy.get('[data-cy=dashboard-widget]').should('have.length.greaterThan', 0)
    })

    it('should be accessible', () => {
      cy.checkAccessibility()
    })
  })

  describe('Navigation Tests', () => {
    it('should navigate to different sections', () => {
      const navItems = ['profile', 'settings', 'reports', 'analytics']
      
      navItems.forEach(item => {
        cy.get(`[data-cy=nav-${item}]`).shouldBeVisibleAndClickable()
        cy.get(`[data-cy=nav-${item}]`).click()
        cy.url().should('include', `/${item}`)
        cy.get(`[data-cy=${item}-page]`).should('be.visible')
      })
    })

    it('should maintain active navigation state', () => {
      cy.get('[data-cy=nav-profile]').click()
      cy.get('[data-cy=nav-profile]').should('have.class', 'active')
      
      cy.get('[data-cy=nav-settings]').click()
      cy.get('[data-cy=nav-settings]').should('have.class', 'active')
      cy.get('[data-cy=nav-profile]').should('not.have.class', 'active')
    })

    it('should handle breadcrumb navigation', () => {
      cy.get('[data-cy=breadcrumb]').should('be.visible')
      cy.get('[data-cy=breadcrumb-item]').should('have.length.greaterThan', 0)
      
      // Click on breadcrumb item
      cy.get('[data-cy=breadcrumb-item]').first().click()
      cy.url().should('include', '/dashboard')
    })
  })

  describe('Data Display Tests', () => {
    it('should load and display user data', () => {
      cy.get('@usersData').then((usersData: any) => {
        const user = usersData.validUser
        
        cy.get('[data-cy=user-name]').should('contain', user.name)
        cy.get('[data-cy=user-email]').should('contain', user.email)
      })
    })

    it('should display recent activity', () => {
      cy.get('[data-cy=recent-activity]').should('be.visible')
      cy.get('[data-cy=activity-item]').should('have.length.greaterThan', 0)
    })

    it('should display statistics widgets', () => {
      cy.get('[data-cy=stats-widget]').should('have.length.greaterThan', 0)
      cy.get('[data-cy=stat-value]').should('be.visible')
    })

    it('should handle data loading states', () => {
      // Intercept API call to simulate loading
      cy.intercept('GET', '/api/dashboard-data', { delay: 1000 })
      
      cy.visit('/dashboard')
      cy.get('[data-cy=loading-spinner]').should('be.visible')
      cy.get('[data-cy=loading-spinner]').should('not.exist')
    })
  })

  describe('Interactive Elements', () => {
    it('should handle button interactions', () => {
      cy.get('[data-cy=action-button]').shouldBeVisibleAndClickable()
      cy.get('[data-cy=action-button]').click()
      cy.get('[data-cy=action-result]').should('be.visible')
    })

    it('should handle form submissions', () => {
      cy.get('[data-cy=quick-form]').within(() => {
        cy.get('[data-cy=form-input]').type('Test input')
        cy.get('[data-cy=form-submit]').click()
      })
      
      cy.get('[data-cy=form-success]').should('be.visible')
    })

    it('should handle modal interactions', () => {
      cy.get('[data-cy=open-modal]').click()
      cy.get('[data-cy=modal]').should('be.visible')
      cy.get('[data-cy=modal-close]').click()
      cy.get('[data-cy=modal]').should('not.exist')
    })

    it('should handle dropdown selections', () => {
      cy.get('[data-cy=dropdown]').click()
      cy.get('[data-cy=dropdown-option]').first().click()
      cy.get('[data-cy=dropdown]').should('contain', 'Selected Option')
    })
  })

  describe('Responsive Design', () => {
    it('should work on mobile devices', () => {
      cy.testMobileView()
      cy.get('[data-cy=dashboard-container]').should('be.visible')
      cy.get('[data-cy=navigation-menu]').should('be.visible')
    })

    it('should work on tablet devices', () => {
      cy.viewport('ipad-2')
      cy.get('[data-cy=dashboard-container]').should('be.visible')
      cy.get('[data-cy=dashboard-widget]').should('be.visible')
    })

    it('should work on desktop devices', () => {
      cy.testDesktopView()
      cy.get('[data-cy=dashboard-container]').should('be.visible')
      cy.get('[data-cy=sidebar]').should('be.visible')
    })

    it('should handle responsive navigation', () => {
      cy.viewport(375, 667) // Mobile
      cy.get('[data-cy=mobile-menu-toggle]').should('be.visible')
      cy.get('[data-cy=mobile-menu-toggle]').click()
      cy.get('[data-cy=navigation-menu]').should('be.visible')
    })
  })

  describe('Performance Tests', () => {
    it('should load dashboard within acceptable time', () => {
      cy.visit('/dashboard', { timeout: 10000 })
      cy.get('[data-cy=dashboard-container]').should('be.visible')
    })

    it('should handle rapid interactions', () => {
      // Rapid clicks on different elements
      for (let i = 0; i < 5; i++) {
        cy.get('[data-cy=action-button]').click()
        cy.get('[data-cy=nav-profile]').click()
        cy.get('[data-cy=nav-settings]').click()
      }
      
      // Should still function normally
      cy.get('[data-cy=dashboard-container]').should('be.visible')
    })

    it('should handle data updates efficiently', () => {
      cy.get('[data-cy=refresh-data]').click()
      cy.get('[data-cy=loading-indicator]').should('be.visible')
      cy.get('[data-cy=loading-indicator]').should('not.exist')
    })
  })

  describe('Error Handling', () => {
    it('should handle API errors gracefully', () => {
      cy.intercept('GET', '/api/dashboard-data', { statusCode: 500 })
      cy.visit('/dashboard')
      cy.get('[data-cy=error-message]').should('be.visible')
    })

    it('should handle network errors', () => {
      cy.intercept('GET', '/api/dashboard-data', { forceNetworkError: true })
      cy.visit('/dashboard')
      cy.get('[data-cy=error-message]').should('be.visible')
    })

    it('should handle unauthorized access', () => {
      // Clear authentication and try to access dashboard
      cy.clearCookies()
      cy.visit('/dashboard')
      cy.url().should('include', '/login')
    })
  })

  describe('Security Tests', () => {
    it('should not expose sensitive data in DOM', () => {
      cy.get('body').should('not.contain', 'password')
      cy.get('body').should('not.contain', 'token')
    })

    it('should use secure connections', () => {
      cy.url().should('match', /^https:\/\//)
    })

    it('should handle session timeout', () => {
      // Simulate session timeout
      cy.intercept('GET', '/api/dashboard-data', { statusCode: 401 })
      cy.visit('/dashboard')
      cy.url().should('include', '/login')
    })
  })

  describe('Accessibility Tests', () => {
    it('should have proper ARIA labels', () => {
      cy.get('[data-cy=action-button]').should('have.attr', 'aria-label')
      cy.get('[data-cy=navigation-menu]').should('have.attr', 'role', 'navigation')
    })

    it('should support keyboard navigation', () => {
      cy.get('body').tab()
      cy.focused().should('exist')
      
      // Navigate through interactive elements
      cy.get('[data-cy=action-button]').focus()
      cy.get('[data-cy=action-button]').should('be.focused')
    })

    it('should have proper color contrast', () => {
      // This would require a color contrast checking library
      cy.get('[data-cy=dashboard-container]').should('be.visible')
    })
  })

  describe('Data Validation', () => {
    it('should validate displayed data format', () => {
      cy.get('[data-cy=user-email]').invoke('text').then((email) => {
        expect(email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      })
      
      cy.get('[data-cy=stat-value]').each(($el) => {
        const value = $el.text()
        expect(value).to.match(/^\d+$/)
      })
    })

    it('should handle empty data states', () => {
      cy.intercept('GET', '/api/recent-activity', { body: [] })
      cy.visit('/dashboard')
      cy.get('[data-cy=empty-state]').should('be.visible')
    })
  })
})
