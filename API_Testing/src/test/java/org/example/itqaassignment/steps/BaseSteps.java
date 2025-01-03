package org.example.itqaassignment.steps;

import org.example.itqaassignment.config.PlaywrightConfig;
import org.example.itqaassignment.service.BookApiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BaseSteps {
    protected static final Logger logger = LoggerFactory.getLogger(BaseSteps.class);
    protected final PlaywrightConfig playwrightConfig;
    protected final BookApiService bookApiService;

    public BaseSteps() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.bookApiService = new BookApiService();
    }
}