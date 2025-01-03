package org.example.itqaassignment.steps;

import io.cucumber.java.AfterAll;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.Given;
import org.example.itqaassignment.config.PlaywrightConfig;

public class AuthenticationSteps extends BaseSteps {
    private String role;
    private static final PlaywrightConfig playwrightConfig = PlaywrightConfig.getInstance();

    @BeforeAll
    public static void setup() {
        playwrightConfig.initializePlaywright();
    }

    @AfterAll
    public static void globalCleanup() {
        playwrightConfig.cleanup();
    }

    @Given("I am authenticated as {string}")
    public void i_am_authenticated_as(String role) {
        logger.info("Authenticating as role: {}", role);
        this.role = role;
        playwrightConfig.updateAuthContext(role);
    }
}