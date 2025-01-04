Feature: Add Multiple Items to Cart

  Background:
    Given I am logged in

  Scenario: Add multiple items and verify cart badge
    When I navigate to the inventory page
    And I add multiple items to the cart
    Then the cart badge should update accordingly
    And the number of items in the cart should match the badge count 