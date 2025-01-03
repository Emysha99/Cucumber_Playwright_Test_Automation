package org.example.itqaassignment.steps;

import com.microsoft.playwright.APIResponse;
import io.cucumber.java.en.When;
import org.example.itqaassignment.model.Book;

public class DeleteBookSteps extends BaseSteps {
    private APIResponse response;
    private Book currentBook;

    @When("I delete the book with ID {string}")
    public void i_delete_the_book_with_id(String id) {
        response = bookApiService.deleteBook(id);
        if (currentBook != null) {
            currentBook.setId(id);
        }
    }
} 