Feature: Web Login Functionality
  As a user
  I want to log into the application
  So that I can access my account

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I enter "testuser@example.com" in the email field
    And I enter "password123" in the password field
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see a welcome message
    And I should see my user profile information

  Scenario: Failed login with invalid credentials
    When I enter "invalid@example.com" in the email field
    And I enter "wrongpassword" in the password field
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  Scenario: Login with empty fields
    When I leave the email field empty
    And I leave the password field empty
    And I click the login button
    Then I should see validation error messages
    And the form should not be submitted

  Scenario: Password visibility toggle
    When I enter "testpassword" in the password field
    Then the password should be hidden by default
    When I click the password visibility toggle
    Then the password should be visible
    When I click the password visibility toggle again
    Then the password should be hidden again

  Scenario: Remember me functionality
    When I enter "testuser@example.com" in the email field
    And I enter "password123" in the password field
    And I check the "Remember me" checkbox
    And I click the login button
    Then I should be redirected to the dashboard
    And my login credentials should be remembered for next time
