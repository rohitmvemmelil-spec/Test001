Feature: Web Smoke Test
  As a tester
  I want to verify the site loads
  So that I know the web flow is wired up

  Scenario: Visit example.com and see heading
    Given I visit "https://example.com"
    Then I should see text "Example Domain"
