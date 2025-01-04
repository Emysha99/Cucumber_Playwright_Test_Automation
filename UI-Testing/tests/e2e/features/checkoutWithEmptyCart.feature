Feature: Checkout with Empty Cart

  Background:
    Given I am logged in

  Scenario: Verify checkout is not allowed with an empty cart
    When I navigate to the cart page
    Then the cart should be empty
    And the checkout button should be disabled 