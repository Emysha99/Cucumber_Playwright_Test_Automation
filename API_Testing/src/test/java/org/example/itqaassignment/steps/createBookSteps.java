package org.example.itqaassignment.steps;

import com.microsoft.playwright.APIResponse;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.example.itqaassignment.model.Book;

import java.util.List;
import java.util.Map;

public class createBookSteps extends BaseSteps {
    private APIResponse response;
    private Book currentBook;

    @When("I create a new book with following details:")
    public void i_create_a_new_book_with_following_details(DataTable dataTable) {
        List<Map<String, String>> bookDataList = dataTable.asMaps(String.class, String.class);
        for (Map<String, String> bookData : bookDataList) {
            Book book = Book.fromMap(bookData);
            response = bookApiService.createBook(book);
            try {
                if (response.ok()) {
                    currentBook = bookApiService.extractBookFromResponse(response);
                    logger.info("Created book: {}", currentBook);
                }
            } catch (Exception e) {
                logger.error("Error processing create response: {}", e.getMessage());
            }
        }
    }

    @Then("the book should be created successfully")
    public void the_book_should_be_created_successfully() {
        assert response.ok() : "Expected successful response, but got " + response.status();
        assert currentBook != null : "Book was not created successfully";
    }
} 