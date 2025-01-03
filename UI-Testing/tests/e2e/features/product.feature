Feature: Product Management and Display

  Background:
    Given the user is logged in with credentials:
      | username      | password     |
      | standard_user | secret_sauce |

  Scenario: User can sort products
    When the user sorts products by "Price (low to high)"
    Then the products should be sorted by price in ascending order

  Scenario: User can view product details
    When the user clicks on product "Sauce Labs Backpack"
    Then the product details should be displayed:
      | title   | price  | description                          |
      | visible | $29.99 | carry.allTheThings() with the sleek |

  Scenario: User verifies the price of a product
    When the user checks the price of "Sauce Labs Backpack"
    Then the price should be "$29.99"

  Scenario: User verifies the description of a product
    When the user checks the description of "Sauce Labs Backpack"
    Then the description should match the expected text

  Scenario: User verifies the product image
    When the user views the image of "Sauce Labs Backpack"
    Then the image should be displayed correctly

  Scenario: User verifies product availability
    When the user checks the availability of "Sauce Labs Backpack"
    Then the product should be available for purchase

  Scenario: User sorts items by name
    When the user sorts products by "Name (A to Z)"
    Then the items should be displayed in alphabetical order 