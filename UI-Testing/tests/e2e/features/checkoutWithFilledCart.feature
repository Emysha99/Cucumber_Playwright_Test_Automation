Feature: Checkout with Filled Cart

  Background:
    Given I am logged in
    And I have added items to the cart

  Scenario: Complete checkout process
    When I navigate to the cart page
    And I proceed to checkout
    And I fill in the checkout information with "John", "Doe", "12345"
    Then I should be taken to the order confirmation page
    And the order should be confirmed successfully 