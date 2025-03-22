Feature: Create New Receipt For Multiple Invoices

    Scenario: Create new Receipt from multiple invoices
        Given I am logged in
        And I duplicate invoice "202001-007" to "202001-008" with date "2020-01-01" and items:
            | description     | rate | quantity |
            | Technical coach | 1000 | 12       |
            | UX              | 2000 | 10       |
        When I create a receipt from invoices "202001-007" and "202001-008" with number "R202001-002"
        Then I should see the receipt with number "R202001-002" and amount "THB 432,800.00"
        And I cleanup documents with invoice "202001-008" and receipt "R202001-002"
