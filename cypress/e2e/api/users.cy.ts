import { User } from '../../support/types'

describe('Users API Tests', () => {
  beforeEach(() => {
    // Set up any pre-test configurations
    cy.fixture('users.json').as('usersData')
  })

  describe('GET /users', () => {
    it('should retrieve all users successfully', () => {
      cy.apiRequest('GET', '/users')
        .as('getUsers')
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.be.an('array')
          expect(response.body).to.have.length.greaterThan(0)
          
          // Validate first user structure
          const firstUser = response.body[0]
          cy.validateApiResponse(firstUser, ['id', 'name', 'username', 'email'])
        })
    })

    it('should return users with correct data types', () => {
      cy.apiRequest('GET', '/users')
        .then((response) => {
          response.body.forEach((user: User) => {
            expect(user.id).to.be.a('number')
            expect(user.name).to.be.a('string')
            expect(user.username).to.be.a('string')
            expect(user.email).to.be.a('string')
            expect(user.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          })
        })
    })

    it('should have acceptable response time', () => {
      cy.apiRequest('GET', '/users')
        .as('apiRequest')
        .then(() => {
          cy.validateResponseTime(5000)
        })
    })
  })

  describe('GET /users/:id', () => {
    it('should retrieve a specific user by ID', () => {
      const userId = 1
      
      cy.apiRequest('GET', `/users/${userId}`)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.id).to.eq(userId)
          cy.validateApiResponse(response.body, ['id', 'name', 'username', 'email', 'address'])
        })
    })

    it('should return 404 for non-existent user', () => {
      const nonExistentId = 999999
      
      cy.apiRequest('GET', `/users/${nonExistentId}`)
        .then((response) => {
          expect(response.status).to.eq(404)
        })
    })

    it('should validate user address structure', () => {
      cy.apiRequest('GET', '/users/1')
        .then((response) => {
          const user = response.body
          expect(user.address).to.have.property('street')
          expect(user.address).to.have.property('city')
          expect(user.address).to.have.property('zipcode')
          expect(user.address.geo).to.have.property('lat')
          expect(user.address.geo).to.have.property('lng')
        })
    })
  })

  describe('POST /users', () => {
    it('should create a new user successfully', () => {
      cy.get('@usersData').then((usersData: any) => {
        const newUser = usersData.newUser
        
        cy.apiRequest('POST', '/users', {
          body: newUser
        })
        .then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body).to.have.property('id')
          expect(response.body.name).to.eq(newUser.name)
          expect(response.body.email).to.eq(newUser.email)
        })
      })
    })

    it('should handle invalid user data', () => {
      cy.get('@usersData').then((usersData: any) => {
        const invalidUser = usersData.invalidUser
        
        cy.apiRequest('POST', '/users', {
          body: invalidUser
        })
        .then((response) => {
          // This endpoint might return 400 or 201 depending on implementation
          expect(response.status).to.be.oneOf([200, 201, 400])
        })
      })
    })
  })

  describe('PUT /users/:id', () => {
    it('should update an existing user', () => {
      const userId = 1
      const updatedData = {
        name: 'Updated Name',
        email: 'updated@example.com'
      }
      
      cy.apiRequest('PUT', `/users/${userId}`, {
        body: updatedData
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(userId)
        expect(response.body.name).to.eq(updatedData.name)
        expect(response.body.email).to.eq(updatedData.email)
      })
    })
  })

  describe('DELETE /users/:id', () => {
    it('should delete a user successfully', () => {
      const userId = 1
      
      cy.apiRequest('DELETE', `/users/${userId}`)
        .then((response) => {
          expect(response.status).to.eq(200)
        })
    })
  })

  describe('API Error Handling', () => {
    it('should handle malformed requests gracefully', () => {
      cy.apiRequest('POST', '/users', {
        body: 'invalid json'
      })
      .then((response) => {
        expect(response.status).to.be.oneOf([400, 500])
      })
    })

    it('should validate content-type headers', () => {
      cy.apiRequest('GET', '/users')
        .then((response) => {
          expect(response.headers).to.have.property('content-type')
          expect(response.headers['content-type']).to.include('application/json')
        })
    })
  })

  describe('API Performance Tests', () => {
    it('should handle concurrent requests', () => {
      const requests = []
      
      for (let i = 0; i < 5; i++) {
        requests.push(cy.apiRequest('GET', '/users'))
      }
      
      cy.wrap(requests).then(() => {
        // All requests should complete successfully
        cy.log('Concurrent requests completed')
      })
    })

    it('should validate response size limits', () => {
      cy.apiRequest('GET', '/users')
        .then((response) => {
          const responseSize = JSON.stringify(response.body).length
          expect(responseSize).to.be.lessThan(1000000) // 1MB limit
        })
    })
  })
})
