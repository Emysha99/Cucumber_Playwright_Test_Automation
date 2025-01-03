Feature: Update Book API

  Background:
    Given I am authenticated as "user"

  Scenario: Update an existing book
    When I update the book with following details:
      | id | title           | author         |
      | 1  | Updated Title233   | Updated Author |
    Then I should see a 403 error message