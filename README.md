# thinkpalm-agentai-Amritha-Panicker-Lab-2-QA-AI-Test-Case-Generator

##  Overview
This project demonstrates how AI (ChatGPT) can be used to generate test cases and Playwright automation scripts for an e-commerce workflow.

---

##  Feature Description

**Feature: Product and Cart Management**

The application allows users to log in, view products, and manage items in the cart.

### Functional Flow:
- User logs into the application
- User is navigated to product listing page
- User adds products to cart
- Cart count increases
- User removes products from cart
- Cart count decreases
- User views products in cart

### Validations:
- Login validation (valid, invalid, empty)
- Product list visibility
- Cart count updates correctly
- Cart persists across navigation and logout

---

## Prompt Used:

Generate Playwright test scripts for an e-commerce product and cart management feature.

Requirements:
- Include login validation
- Include positive, negative, and edge test scenarios
- Cover add/remove cart functionality
- Use JavaScript with Playwright
- Include assertions
- Follow best practices

---

## Test Cases:

Feature: Product and Cart Management

  Scenario: Successful login with valid credentials
    Given user is on login page
    When user enters valid username and password
    And clicks login button
    Then user should be redirected to product page

  Scenario: Login with invalid credentials
    Given user is on login page
    When user enters invalid username and password
    And clicks login button
    Then error message should be displayed

  Scenario: Login with empty credentials
    Given user is on login page
    When user clicks login without entering credentials
    Then validation message should be displayed

  Scenario: View product list after login
    Given user is logged in
    Then product list should be visible

  Scenario: Add single product to cart
    Given user is on product page
    When user adds a product to cart
    Then cart count should be 1

  Scenario: Add multiple products to cart
    Given user is on product page
    When user adds multiple products
    Then cart count should increase accordingly

  Scenario: Remove product from cart
    Given user has added a product to cart
    When user removes the product
    Then cart count should decrease

  Scenario: View products in cart
    Given user has added products
    When user navigates to cart page
    Then added products should be visible

  Scenario: Cart persists after navigation
    Given user has added a product
    When user navigates away and comes back
    Then cart count should remain unchanged

  Scenario: Cart persists after logout
    Given user has added a product
    When user logs out and logs back in
    Then cart should still contain the product


