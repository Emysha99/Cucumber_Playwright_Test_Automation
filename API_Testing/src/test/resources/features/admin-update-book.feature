Feature: Update Book API

  Background:
    Given I am authenticated as "admin"

  Scenario: Update an existing book
    When I update the book with following details:
      | id |     title         |    author      |
      | 1  | Updated Title87   | Updated Author |
    Then the book should be updated successfully
    And I should see the updated book details

  Scenario: Update an existing book with all missing values
    When I update the book with following details:
      | id |     title       |     author     |
      | 1  |                 |                |
    Then I should see a 400 error message

  Scenario: Update an existing book with missing title
    When I update the book with following details:
      | id |     title       |    author      |
      | 1  |                 |   newAuthor    |
    Then I should see a 400 error message

  Scenario: Update an existing book with missing author
    When I update the book with following details:
      | id |     title       |     author     |
      | 1  |   newTitle      |                |
    Then I should see a 400 error message

  Scenario: Update non-existent book
    When I update the book with following details:
      | id   |       title        |     author     |
      | 999  | Updated Title233   | Updated Author |
    Then I should see a 404 error message