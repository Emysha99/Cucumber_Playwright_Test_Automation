Feature: Get Books API

  Background:
    Given I am authenticated as "admin"

  Scenario: Get all books
    When I visit the library page
    Then I should see the list of books

  Scenario: Get book by ID
    When I request a book with ID "1"
    Then I should see the book information

  Scenario: Get non-existent book
    When I request a book with ID "999"
    Then I should see a 404 error message