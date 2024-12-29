package org.example.itqaassitgnment;

import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.jupiter.api.Assertions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

@SpringBootTest
public class BookApiSteps {

    private static final Logger logger = LoggerFactory.getLogger(BookApiSteps.class);

    private final String backendServerUrl = "http://localhost:7081";

    private final RestTemplate restTemplate;
    private ResponseEntity<String> response;
    private String bookId;
    private String role;

    public BookApiSteps() {
        this.restTemplate = new RestTemplate();
    }

    // Authentication
    @Given("I am authenticated as {string}")
    public void i_am_authenticated_as(String role) {
        logger.info("Authenticating as role: {}", role);
        this.role = role;
    }

    private HttpHeaders createAuthHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(role, "password");
        return headers;
    }

    // Create
    @When("I create a new book with following details:")
    public void i_create_a_new_book_with_following_details(DataTable dataTable) {
        List<Map<String, String>> bookDataList = dataTable.asMaps(String.class, String.class);
        for (Map<String, String> bookData : bookDataList) {
            logger.info("Creating a new book with details: {}", bookData);
            String url = backendServerUrl + "/api/books";
            HttpHeaders headers = createAuthHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("title", bookData.get("title"));
            requestBody.put("author", bookData.get("author"));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            try {
                response = restTemplate.postForEntity(url, entity, String.class);
                logger.info("Response: {}", response.getBody());

                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> responseBody = objectMapper.readValue(response.getBody(), new TypeReference<Map<String, Object>>(){});
                String id = responseBody.get("id").toString();
                this.bookId = id;

            } catch (HttpClientErrorException e) {
                logger.error("Error creating book: {}", e.getMessage());
                response = new ResponseEntity<>(e.getStatusCode());
            } catch (JsonProcessingException e) {
                logger.error("Error parsing JSON response: {}", e.getMessage());
            }
        }
    }

    @Then("the book should be created successfully")
    public void the_book_should_be_created_successfully() {
        logger.info("Verifying book creation");
        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Then("I should see the new book in the list")
    public void i_should_see_the_new_book_in_the_list() {
        logger.info("Verifying the new book is in the list");
        String url = backendServerUrl + "/api/books";
        HttpHeaders headers = createAuthHeaders();
        response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), String.class);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<Map<String, Object>> books = objectMapper.readValue(response.getBody(), new TypeReference<List<Map<String, Object>>>(){});

            boolean bookFound = books.stream().anyMatch(book -> bookId.equals(book.get("id").toString()));
            Assertions.assertTrue(bookFound, "The new book should be in the list");
            logger.info("The new book with ID {} is in the list", bookId);

        } catch (JsonProcessingException e) {
            logger.error("Error processing JSON response: {}", e.getMessage());
            Assertions.fail("Failed to parse the response body as JSON");
        }
    }

    // Get
    @When("I visit the library page")
    public void i_visit_the_library_page() {
        logger.info("Visiting the library page as {}", role);
        String url = backendServerUrl + "/api/books";
        HttpHeaders headers = createAuthHeaders();
        response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), String.class);
    }

    @Then("I should see the list of books")
    public void i_should_see_the_list_of_books() {
        logger.info("Verifying the list of books");
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<Map<String, Object>> books = objectMapper.readValue(response.getBody(), new TypeReference<List<Map<String, Object>>>(){});
            if (books.isEmpty()) {
                logger.info("The list of books is empty, which is acceptable.");
                return;
            }
            logger.info("List of books: {}", books);

        } catch (JsonProcessingException e) {
            logger.error("Error processing JSON response: {}", e.getMessage());
            Assertions.fail("Failed to parse the response body as JSON");
        }
    }

    @When("I request a book with ID {string}")
    public void i_request_a_book_with_id(String id) {
        logger.info("Requesting book with ID {} as {}", id, role);
        String url = backendServerUrl + "/api/books/" + id;
        HttpHeaders headers = createAuthHeaders();
        try {
            response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), String.class);
        } catch (HttpClientErrorException e) {
            logger.error("Error requesting book with ID {}: {}", id, e.getMessage());
            response = new ResponseEntity<>(e.getStatusCode());
        }
    }

    @Then("I should see the book information")
    public void i_should_see_the_book_information() {
        logger.info("Verifying book information");
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> bookDetails = objectMapper.readValue(response.getBody(), new TypeReference<Map<String, Object>>(){});

            if (bookDetails.isEmpty()) {
                logger.info("No book found with id {}", bookId);
                return;
            }

            logger.info("Book details: {}", bookDetails);

        } catch (JsonProcessingException e) {
            logger.error("Error processing JSON response: {}", e.getMessage());
            Assertions.fail("Failed to parse the response body as JSON");
        }
    }

    @Then("I should see a {int} error message")
    public void i_should_see_a_error_message(int statusCode) {
        logger.info("Verifying error message with status code {}", statusCode);
        Assertions.assertEquals(statusCode, response. getStatusCode().value());
    }

    // Update
    @When("I update the book with following details:")
    public void i_update_the_book_with_following_details(DataTable dataTable) {
        List<Map<String, String>> bookDataList = dataTable.asMaps(String.class, String.class);
        for (Map<String, String> bookData : bookDataList) {
            String id = bookData.get("id");
            logger.info("Updating book with ID {} with details: {}", id, bookData);
            String url = backendServerUrl + "/api/books/" + id;
            HttpHeaders headers = createAuthHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("id", bookData.get("id"));
            requestBody.put("title", bookData.get("title"));
            requestBody.put("author", bookData.get("author"));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            try {
                response = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);
            } catch (HttpClientErrorException e) {
                logger.error("Error updating book with ID {}: {}", id, e.getMessage());
                response = new ResponseEntity<>(e.getStatusCode());
            }
        }
    }

    @Then("the book should be updated successfully")
    public void the_book_should_be_updated_successfully() {
        logger.info("Verifying book update");
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Then("I should see the updated book details")
    public void i_should_see_the_updated_book_details() {
        logger.info("Verifying the updated book details");
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> updatedBookDetails = objectMapper.readValue(response.getBody(), new TypeReference<Map<String, Object>>(){});

            if (updatedBookDetails.isEmpty()) {
                logger.info("No updated book details found.");
                return;
            }

            logger.info("Updated book details: {}", updatedBookDetails);

        } catch (JsonProcessingException e) {
            logger.error("Error processing JSON response: {}", e.getMessage());
            Assertions.fail("Failed to parse the response body as JSON");
        }
    }

    @When("I delete the book with ID {string}")
    public void i_delete_the_book_with_id(String id) {
        logger.info("Deleting book with ID {}", id);
        String url = backendServerUrl + "/api/books/" + id;
        HttpHeaders headers = createAuthHeaders();

        try {
            response = restTemplate.exchange(url, HttpMethod.DELETE, new HttpEntity<>(headers), String.class);
            this.bookId = id;
        } catch (HttpClientErrorException e) {
            logger.error("Error deleting book with ID {}: {}", id, e.getMessage());
            response = new ResponseEntity<>(e.getStatusCode());
        }
    }

    @Then("the book should be deleted successfully")
    public void the_book_should_be_deleted_successfully() {
        logger.info("Verifying book deletion");
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Then("the book should not appear in the list")
    public void the_book_should_not_appear_in_the_list() {
        logger.info("Verifying the book is not in the list");
        String url = backendServerUrl + "/api/books";
        HttpHeaders headers = createAuthHeaders();
        response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), String.class);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<Map<String, Object>> books = objectMapper.readValue(response.getBody(), new TypeReference<List<Map<String, Object>>>(){});

            boolean bookFound = books.stream().anyMatch(book -> bookId.equals(book.get("id").toString()));
            Assertions.assertFalse(bookFound, "The book should not be in the list");
            logger.info("The book with ID {} is not in the list", bookId);

        } catch (JsonProcessingException e) {
            logger.error("Error processing JSON response: {}", e.getMessage());
            Assertions.fail("Failed to parse the response body as JSON");
        }
    }

}