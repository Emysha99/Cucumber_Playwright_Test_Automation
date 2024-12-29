Feature: Update Book API

  Background:
    Given I am authenticated as "admin"

  Scenario: Update an existing book
    When I update the book with following details:
      | id | title           | author         |
      | 1  | Updated Title87   | Updated Author |
    Then the book should be updated successfully
    And I should see the updated book details

  Scenario: Update non-existent book
    When I update the book with following details:
      | id | title           | author         |
      | 999  | Updated Title233   | Updated Author |
    Then I should see a 404 error message