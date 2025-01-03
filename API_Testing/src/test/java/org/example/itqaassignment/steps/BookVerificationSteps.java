package org.example.itqaassignment.steps;

import com.microsoft.playwright.APIResponse;
import io.cucumber.java.en.Then;
import org.example.itqaassignment.util.ResponseManager;

public class BookVerificationSteps extends BaseSteps {
    @Then("I should see a {int} error message")
    public void i_should_see_a_error_message(int statusCode) {
        APIResponse response = ResponseManager.getInstance().getResponse();
        assert response != null : "Response is null";
        assert response.status() == statusCode :
                "Expected status " + statusCode + ", but got " + response.status();
    }
} 