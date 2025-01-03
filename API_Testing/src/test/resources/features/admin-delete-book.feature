Feature: Delete Book API
# this is not permitted operation for the role "admin". so this fails

  Background:
    Given I am authenticated as "admin"

  Scenario: Delete an existing book
    When I delete the book with ID "1"
    Then the book should be deleted successfully

  Scenario: Delete non-existent book
    When I delete the book with ID "999"
    Then I should see a 404 error message