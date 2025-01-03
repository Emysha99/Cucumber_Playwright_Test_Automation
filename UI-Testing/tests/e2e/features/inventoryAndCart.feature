Feature: Inventory and Cart

  Background:
    Given I am logged in

  Scenario: Add item to cart and verify in cart page on SauceDemo
    When I navigate to the inventory page
    And I add the first item to the cart
    Then the cart badge should show 1 item
    And the item should be present in the cart 