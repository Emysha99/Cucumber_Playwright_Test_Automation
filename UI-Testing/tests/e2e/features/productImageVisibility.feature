Feature: Product Image Visibility

  Background:
    Given I am logged in
    And I am on the inventory page

  Scenario: Verify all product images are visible
    Then all product images should be visible 