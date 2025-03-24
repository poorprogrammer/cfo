Feature: Invoice Page 2020

    Scenario: Requires login to see an invoice
        Given I am a guest user
        When I try to view invoice "202001-001"
        Then I should be redirected to the login page

    Scenario: Authenticated user can view the original invoice
        Given I am an authenticated user
        When I view invoice "202001-001"
        Then I should see the original invoice details

    Scenario: Authenticated user can go back to the list of invoices from invoice detail page
        Given I am an authenticated user
        When I view invoice "202001-001"
        And I go back to the invoice list
        Then I should see the "Invoice List" page