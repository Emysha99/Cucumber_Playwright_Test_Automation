# IS3440 IT Quality Assurance Group Assignment

## Introduction
This project is part of our IS3440 IT Quality Assurance module. The assignment involves **test automation** for both **UI** and **API testing**. The goal is to implement and 
demonstrate effective test automation strategies using modern tools and methodologies.
## Group Members
- 204165T - ⁠Premanayake M.M.D.D
- 204050L - Ekanayaka E.M.S.P
- 204147P - Nuwantha K.A.C
- 204114M - Lamahewage D.R.
- 204117B - Madhubhashini P.H.A.E
- 204109D - Kumarasingha M.M.J.S

## Tools and Frameworks
- **Cucumber**: Used for Behavior-Driven Development (BDD) to write human-readable test scenarios.
- **Playwright**: A modern test automation framework for reliable, fast, and scalable UI testing.

## Project Details
- **UI Testing**: The testing was performed on [Sauce Demo](https://www.saucedemo.com/).
- **API Testing**: A provided JAR file was used for testing.

## Features
- **BDD Approach**: We wrote Gherkin scenarios for clear and understandable test cases.
- **Page Object Model (POM)**: Organized UI test scripts for maintainability and scalability.
- **CI/CD Integration**: Used for automated test runs.

## How to Run
1. Clone the repository.
2. Open the project in your preferred IDE:
   - Recommended IDEs:
     - IntelliJ IDEA (for Java-based automation)
     - Visual Studio Code (for Playwright and Cucumber feature files)
3. Install dependencies:
   
   ```bash
   npm install   # For Playwright
   mvn install   # For Maven
4. Execute the tests.
      - UI tests :
        ```bash
        npx cucumber-js features/ui_tests
      - API tests :
        ```bash
        mvn test -Dtest=ApiTestRunner

