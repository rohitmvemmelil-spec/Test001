Feature: Self-contained Web Smoke Test
  As a tester
  I want to open an inline page
  So that I can validate web steps without internet access

  Scenario: Open inline page and see heading
    Given I open an inline page with heading "Hello World"
    Then I should see text "Hello World"
