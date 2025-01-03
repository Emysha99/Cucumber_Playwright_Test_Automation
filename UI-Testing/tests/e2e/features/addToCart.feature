 Feature: Add to Cart Functionality

  Background:
    Given I am logged in

  Scenario: Can add an item to the cart
    When I navigate to the inventory page
    And I add the first item to the cart
    Then I should see the item in the cart