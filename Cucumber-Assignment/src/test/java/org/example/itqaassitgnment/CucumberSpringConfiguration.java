package org.example.itqaassitgnment;

import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

@CucumberContextConfiguration
@SpringBootTest(classes = ItqaAssitgnmentApplication.class)
public class CucumberSpringConfiguration {
    // This class is used to configure the Spring context for Cucumber tests
}