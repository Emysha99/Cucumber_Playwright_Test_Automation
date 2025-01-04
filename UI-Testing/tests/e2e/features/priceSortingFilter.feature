Feature: Verify Price Sorting Functionality

  Background:
    Given I am logged in
    And I am on the inventory page

  Scenario: Verify sorting by price (low to high)
    When I select the "Price (low to high)" filter
    Then the items should be sorted by price in ascending order

  Scenario: Verify sorting by price (high to low)
    When I select the "Price (high to low)" filter
    Then the items should be sorted by price in descending order 