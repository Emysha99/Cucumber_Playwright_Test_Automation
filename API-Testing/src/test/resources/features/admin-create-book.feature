Feature: Create Book API

  Background:
    Given I am authenticated as "admin"

  Scenario: Create a new book successfully
    When I create a new book with following details:
      |id| title     | author      |
      |1 | Test Book1 | Test Author |
    Then the book should be created successfully

  Scenario: Create book with missing fields
    When I create a new book with following details:
      | title | author      |
      |       |             |
    Then I should see a 400 error message

  Scenario: Create a book with missing title
    When I create a new book with following details:
      | title | author |
      |       | david  |
    Then I should see a 400 error message

  Scenario: Create a book with missing author
    When I create a new book with following details:
      | title | author |
      |   2   |        |
    Then I should see a 400 error message