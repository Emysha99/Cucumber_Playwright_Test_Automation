package org.example.itqaassignment.steps;

import com.microsoft.playwright.APIResponse;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.When;
import org.example.itqaassignment.model.Book;

import java.util.List;
import java.util.Map;

public class UpdateBookSteps extends BaseSteps {
    private APIResponse response;

    @When("I update the book with following details:")
    public void i_update_the_book_with_following_details(DataTable dataTable) {
        List<Map<String, String>> bookDataList = dataTable.asMaps(String.class, String.class);
        for (Map<String, String> bookData : bookDataList) {
            Book book = Book.fromMap(bookData);
            response = bookApiService.updateBook(book);
        }
    }
} 