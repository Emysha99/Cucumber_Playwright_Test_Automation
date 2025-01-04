Feature: Verify Item Name Sorting Functionality

  Background:
    Given I am logged in
    And I am on the inventory page

  Scenario: Verify sorting by item name (A to Z)
    When I select the "Name (A to Z)" filter
    Then the items should be sorted alphabetically

  Scenario: Verify sorting by item name (Z to A)
    When I select the "Name (Z to A)" filter
    Then the items should be sorted in reverse alphabetical order 