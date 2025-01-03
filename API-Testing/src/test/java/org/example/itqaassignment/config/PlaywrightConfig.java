package org.example.itqaassignment.config;

import com.microsoft.playwright.*;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class PlaywrightConfig {
    private static final Logger logger = LoggerFactory.getLogger(PlaywrightConfig.class);
    private static PlaywrightConfig instance;
    private final String backendServerUrl = System.getenv("BACKEND_URL") != null
            ? System.getenv("BACKEND_URL")
            : "http://127.0.0.1:7081";

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    @Getter
    private APIRequestContext request;

    private PlaywrightConfig() {
        initializePlaywright();
    }

    public static synchronized PlaywrightConfig getInstance() {
        if (instance == null) {
            instance = new PlaywrightConfig();
        }
        return instance;
    }

    public void initializePlaywright() {
        logger.info("Initializing Playwright with backend URL: {}", backendServerUrl);
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        Page page = context.newPage();
        request = playwright.request().newContext(new APIRequest.NewContextOptions()
                .setBaseURL(backendServerUrl));
    }

    public void updateAuthContext(String role) {
        logger.info("Updating auth context for role: {}", role);
        request = playwright.request().newContext(new APIRequest.NewContextOptions()
                .setBaseURL(backendServerUrl)
                .setHttpCredentials(role, "password"));
    }

    public void cleanup() {
        logger.info("Cleaning up Playwright resources");
        if (request != null) request.dispose();
        if (context != null) context.close();
        if (browser != null) browser.close();
        if (playwright != null) playwright.close();
    }
} 