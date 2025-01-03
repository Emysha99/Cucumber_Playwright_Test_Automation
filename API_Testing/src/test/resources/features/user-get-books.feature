Feature: Get Books API

  Background:
    Given I am authenticated as "user"

  Scenario: Get all books
    When I visit the library page
    Then I should see the list of books

  Scenario: Get book by ID
    When I request a book with ID "1"
    Then I should see the book information
#    this is not permitted operation for user role "user". so this fails