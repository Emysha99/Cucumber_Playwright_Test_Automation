Feature: Checkout Process

  Background:
    Given the user is logged in with credentials:
      | username      | password     |
      | standard_user | secret_sauce |

  Scenario: User can complete checkout
    Given the user has added "Sauce Labs Backpack" to the cart
    When the user proceeds to checkout
    And enters customer information:
      | firstName | lastName | postalCode |
      | John     | Doe      | 12345      |
    And completes the purchase
    Then the order confirmation message should be displayed

  Scenario: User verifies the checkout overview
    Given the user has added "Sauce Labs Backpack" to the cart
    When the user proceeds to checkout
    And enters customer information:
      | firstName | lastName | postalCode |
      | John     | Doe      | 12345      |
    Then the summary should display all items and total price

  Scenario: User verifies order completion
    Given the user has completed the checkout process
    When the user views the order confirmation page
    Then the order should be confirmed with a thank you message 