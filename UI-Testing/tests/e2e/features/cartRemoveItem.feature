Feature: Cart Item Removal

  Background:
    Given I am logged in

  Scenario: Remove an item from the cart
    When I add an item to the cart
    And I navigate to the cart page
    Then I should see the item in the cart
    When I remove the item from the cart
    Then the item should be removed from the cart 