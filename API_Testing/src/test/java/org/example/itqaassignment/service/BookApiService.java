package org.example.itqaassignment.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microsoft.playwright.APIResponse;
import com.microsoft.playwright.options.RequestOptions;
import org.example.itqaassignment.config.PlaywrightConfig;
import org.example.itqaassignment.model.Book;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.example.itqaassignment.util.ApiRequestHandler;

import java.util.List;

@Service
public class BookApiService {
    private static final Logger logger = LoggerFactory.getLogger(BookApiService.class);
    private final PlaywrightConfig playwrightConfig;
    private final ObjectMapper objectMapper;

    public BookApiService() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.objectMapper = new ObjectMapper();
    }

    public APIResponse createBook(Book book) {
        return ApiRequestHandler.handleApiRequest(() -> playwrightConfig.getRequest().post("/api/books",
                RequestOptions.create().setData(book.toMap())), "Creating new book: " + book, logger);
    }

    public APIResponse getBooks() {
        return ApiRequestHandler.handleApiRequest(() -> playwrightConfig.getRequest().get("/api/books"), "Fetching all books", logger);
    }

    public APIResponse getBook(String id) {
        return ApiRequestHandler.handleApiRequest(() -> playwrightConfig.getRequest().get("/api/books/" + id), "Fetching book with ID: " + id,logger);
    }

    public APIResponse deleteBook(String id) {
        return ApiRequestHandler.handleApiRequest(() -> playwrightConfig.getRequest().delete("/api/books/" + id), "Deleting book with ID: " + id, logger);
    }

    public Book extractBookFromResponse(APIResponse response) throws Exception {
        return objectMapper.readValue(response.text(), Book.class);
    }

    public APIResponse updateBook(Book book) {
        return ApiRequestHandler.handleApiRequest(() -> playwrightConfig.getRequest().put("/api/books/" + book.getId(),
                RequestOptions.create().setData(book.toMap())), "Updating book: " + book, logger);
    }

    public List<Book> parseBookList(APIResponse response) throws Exception {
        return objectMapper.readValue(response.text(),
                new TypeReference<List<Book>>() {
                });
    }
}
