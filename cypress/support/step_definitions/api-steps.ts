import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'

let apiBaseUrl: string
let response: any

Given('the API base URL is {string}', (url: string) => {
  apiBaseUrl = url
})

When('I send a GET request to {string}', (endpoint: string) => {
  cy.request({
    method: 'GET',
    url: `${apiBaseUrl}${endpoint}`,
    failOnStatusCode: false
  }).then((res) => {
    response = res
  })
})

When('I send a POST request to {string} with the following data:', (endpoint: string, dataTable: DataTable) => {
  const data = dataTable.hashes()[0]
  cy.request({
    method: 'POST',
    url: `${apiBaseUrl}${endpoint}`,
    body: data,
    failOnStatusCode: false
  }).then((res) => {
    response = res
  })
})

When('I send a PUT request to {string} with the following data:', (endpoint: string, dataTable: DataTable) => {
  const data = dataTable.hashes()[0]
  cy.request({
    method: 'PUT',
    url: `${apiBaseUrl}${endpoint}`,
    body: data,
    failOnStatusCode: false
  }).then((res) => {
    response = res
  })
})

When('I send a DELETE request to {string}', (endpoint: string) => {
  cy.request({
    method: 'DELETE',
    url: `${apiBaseUrl}${endpoint}`,
    failOnStatusCode: false
  }).then((res) => {
    response = res
  })
})

Then('the response status should be {int}', (statusCode: number) => {
  expect(response.status).to.equal(statusCode)
})

Then('the response should contain an array of users', () => {
  expect(response.body).to.be.an('array')
  expect(response.body.length).to.be.greaterThan(0)
})

Then('the response should contain a user object', () => {
  expect(response.body).to.be.an('object')
  expect(response.body).to.have.property('id')
})

Then('each user should have an {string} field', (fieldName: string) => {
  response.body.forEach((user: any) => {
    expect(user).to.have.property(fieldName)
  })
})

Then('each user should have a {string} field', (fieldName: string) => {
  response.body.forEach((user: any) => {
    expect(user).to.have.property(fieldName)
  })
})

Then('the user should have an {string} field with value {string}', (fieldName: string, value: string) => {
  const actualValue = response.body[fieldName]
  expect(String(actualValue)).to.equal(String(value))
})

Then('the user should have a {string} field', (fieldName: string) => {
  expect(response.body).to.have.property(fieldName)
})

Then('the user should have an {string} field', (fieldName: string) => {
  expect(response.body).to.have.property(fieldName)
})

Then('the response should contain the created user data', () => {
  expect(response.body).to.be.an('object')
  expect(response.body).to.have.property('id')
})

Then('the response should have an {string} field', (fieldName: string) => {
  expect(response.body).to.have.property(fieldName)
})

Then('the response should contain the updated user data', () => {
  expect(response.body).to.be.an('object')
  // Basic sanity: updated user payload should echo back name/email
  expect(response.body).to.have.property('name')
})

Then('the user name should be {string}', (name: string) => {
  expect(response.body.name).to.equal(name)
})

Then('the user email should be {string}', (email: string) => {
  expect(response.body.email).to.equal(email)
})
