Feature: List Invoices Page

    Scenario: Prints an old invoice
        Given I am logged in
        When I visit the invoice list for the year 2020
        Then I should see the invoice "202001-001"
        When I print the invoice "202001-001"
        Then I should see the printed invoice details

    Scenario: Should be able to get back to home page from wherever page by clicking at logo
        Given I am logged in
        When I visit a non-existent page
        Then I should see the "Page not found" message
        When I click the logo
        Then I should see the "Invoice List" page
