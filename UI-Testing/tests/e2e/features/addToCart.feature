Feature: Add to Cart
  Scenario: Add item to cart
    Given I am logged in
    When I add "Sauce Labs Backpack" to the cart
    Then I should see "Sauce Labs Backpack" in the cart