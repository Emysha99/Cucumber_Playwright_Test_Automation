Feature: Delete Book API

  Background:
    Given I am authenticated as "user"

  Scenario: Delete an existing book
    When I delete the book with ID "1"
    Then I should see a 403 error message
# this operation is permitted for the role "user". so this gets 200 response if the given book is exists