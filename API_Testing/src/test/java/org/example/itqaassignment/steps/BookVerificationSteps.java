package org.example.itqaassignment.steps;

import com.microsoft.playwright.APIResponse;
import io.cucumber.java.en.Then;
import org.example.itqaassignment.model.Book;
import org.example.itqaassignment.util.ResponseManager;

public class BookVerificationSteps extends BaseSteps {
    @Then("I should see a {int} error message")
    public void i_should_see_a_error_message(int statusCode) {
        APIResponse response = ResponseManager.getInstance().getResponse();
        assert response != null : "Response is null";
        assert response.status() == statusCode :
                "Expected status " + statusCode + ", but got " + response.status();
    }

    @Then("I should see the book information")
    public void i_should_see_the_book_information() {
        APIResponse response = ResponseManager.getInstance().getResponse();
        assert response.ok() : "Expected successful response, but got " + response.status();
        try {
            Book book = bookApiService.extractBookFromResponse(response);
            logger.info("Retrieved book details: {}", book);
        } catch (Exception e) {
            logger.error("Error processing book details: {}", e.getMessage());
            throw new AssertionError("Failed to process book details: " + e.getMessage());
        }
    }

    @Then("the book should be deleted successfully")
    public void the_book_should_be_deleted_successfully() {
        APIResponse response = ResponseManager.getInstance().getResponse();
        assert response.ok() : "Expected successful response, but got " + response.status();
    }
}
