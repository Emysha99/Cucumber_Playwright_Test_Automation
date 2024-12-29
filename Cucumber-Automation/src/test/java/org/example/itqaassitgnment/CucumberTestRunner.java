package org.example.itqaassitgnment;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = {
                "src/test/resources/features/admin-create-book.feature",
                "src/test/resources/features/user-create-book.feature",
                "src/test/resources/features/admin-get-books.feature",
                "src/test/resources/features/user-get-books.feature",
                "src/test/resources/features/admin-update-book.feature",
                "src/test/resources/features/user-update-book.feature",
                "src/test/resources/features/admin-delete-book.feature",
                "src/test/resources/features/user-delete-book.feature",
        },
    glue = "org.example.itqaassitgnment",
    plugin = {"pretty", "html:target/cucumber-reports.html"},
    monochrome = true
)
public class CucumberTestRunner {
} 