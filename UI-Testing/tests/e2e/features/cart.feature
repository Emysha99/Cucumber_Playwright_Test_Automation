Feature: Shopping Cart Functionality

  Background:
    Given the user is logged in with credentials:
      | username      | password     |
      | standard_user | secret_sauce |

  Scenario: User can add items to cart
    When the user adds "Sauce Labs Backpack" to the cart
    Then the shopping cart badge should show "1"
    And the "Add to cart" button should change to "Remove"

  Scenario: User can remove items from cart
    Given the user has added "Sauce Labs Backpack" to the cart
    When the user clicks the remove button for "Sauce Labs Backpack"
    Then the shopping cart badge should not be visible
    And the "Remove" button should change to "Add to cart"

  Scenario: User adds multiple items to cart
    When the user adds "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    Then the cart should contain 2 items

  Scenario: User verifies the cart badge count
    Given the user has 2 items in the cart
    When the user views the cart badge
    Then the cart badge should display "2"

  Scenario: User can access the shopping cart
    Given the user has added "Sauce Labs Backpack" to the cart
    When the user clicks on the shopping cart
    Then the cart page should be displayed

  Scenario: User can return to shopping
    Given the user is viewing the cart
    When the user clicks continue shopping
    Then the user should return to the inventory page

  Scenario: User verifies item details in cart
    Given the user has added "Sauce Labs Backpack" to the cart
    When the user views the cart
    Then the cart should show correct item details 