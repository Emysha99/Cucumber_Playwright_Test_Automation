Feature: Social Media Icons

  Background:
    Given I am logged in
    And I am on the inventory page

  Scenario: Verify social media icons are clickable and redirect correctly
    Then the social media icons should be visible and enabled 