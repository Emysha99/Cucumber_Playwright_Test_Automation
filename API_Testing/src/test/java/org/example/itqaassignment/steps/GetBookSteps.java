package org.example.itqaassignment.steps;

import com.microsoft.playwright.APIResponse;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.example.itqaassignment.model.Book;

import java.util.List;

public class GetBookSteps extends BaseSteps {
    private APIResponse response;

    @When("I visit the library page")
    public void i_visit_the_library_page() {
        response = bookApiService.getBooks();
    }

    @Then("I should see the list of books")
    public void i_should_see_the_list_of_books() {
        assert response.ok() : "Expected successful response, but got " + response.status();
        try {
            List<Book> books = bookApiService.parseBookList(response);
            logger.info("Retrieved {} books", books.size());
        } catch (Exception e) {
            logger.error("Error processing book list: {}", e.getMessage());
            throw new AssertionError("Failed to process book list: " + e.getMessage());
        }
    }

    @When("I request a book with ID {string}")
    public void i_request_a_book_with_id(String id) {
        response = bookApiService.getBook(id);
    }
} 