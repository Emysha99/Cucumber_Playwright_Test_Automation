Feature: Invalid Cart Limit

  Background:
    Given I am logged in

  Scenario: Cannot add more than three items to the cart
    When I add three items to the cart
    Then the cart badge should show "3"
    And there should be 3 "Remove" buttons 