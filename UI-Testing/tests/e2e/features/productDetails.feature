Feature: Product Details

  Background:
    Given I am logged in

  Scenario: View product details
    When I navigate to the inventory page
    And I click on a product name
    Then I should be taken to the product details page
    And the product details should be displayed correctly 