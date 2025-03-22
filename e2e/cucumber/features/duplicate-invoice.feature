Feature: Create New Invoice Via Invoice Duplication Feature

    Background:
        Given I am logged in

    Scenario: Can create new Invoice by duplicate from existing one
        Given I duplicate invoice "202001-007" to "202001-008" with date "2020-01-01" and items:
            | description     | rate | quantity |
            | Technical coach | 1000 | 12       |
            | UX              | 2000 | 10       |
        When I edit invoice "202001-008" with date "2020-01-02" and items:
            | description         | rate | quantity |
            | Fullstack developer | 1000 | 10       |
            | UX/UI               | 3000 | 10       |
        Then I should see the invoice with number "202001-008" and amount "THB 40,000.00"
        And I cleanup documents with invoice "202001-008"
