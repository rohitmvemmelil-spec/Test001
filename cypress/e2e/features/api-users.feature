Feature: API User Management
  As a developer
  I want to test the user API endpoints
  So that I can ensure the API is working correctly

  Background:
    Given the API base URL is "https://jsonplaceholder.typicode.com"

  Scenario: Get all users
    When I send a GET request to "/users"
    Then the response status should be 200
    And the response should contain an array of users
    And each user should have an "id" field
    And each user should have a "name" field
    And each user should have an "email" field

  Scenario: Get a specific user by ID
    When I send a GET request to "/users/1"
    Then the response status should be 200
    And the response should contain a user object
    And the user should have an "id" field with value "1"
    And the user should have a "name" field
    And the user should have an "email" field

  Scenario: Create a new user
    When I send a POST request to "/users" with the following data:
      | name    | email              | phone       |
      | John Doe| john.doe@test.com | 123-456-7890|
    Then the response status should be 201
    And the response should contain the created user data
    And the response should have an "id" field

  Scenario: Update an existing user
    When I send a PUT request to "/users/1" with the following data:
      | name        | email                | phone         |
      | Jane Smith  | jane.smith@test.com | 987-654-3210  |
    Then the response status should be 200
    And the response should contain the updated user data
    And the user name should be "Jane Smith"
    And the user email should be "jane.smith@test.com"

  Scenario: Delete a user
    When I send a DELETE request to "/users/1"
    Then the response status should be 200
