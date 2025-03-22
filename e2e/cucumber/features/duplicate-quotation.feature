Feature: Create New Quotation Via Duplication Feature

    Background:
        Given I am logged in

    Scenario: Can create new Quotation by duplicate from existing one
        Given I duplicate quotation "202001-001" to "202001-008" with date "2020-01-01" and items:
            | description     | rate   | quantity |
            | Technical coach | 1000.5 | 12.5     |
        When I edit quotation "202001-008" with date "2020-01-02" and items:
            | description         | rate | quantity |
            | Fullstack developer | 1000 | 10       |
        Then I should see the quotation with number "202001-008" and amount "USD 10,000.00"
        And I cleanup documents with quotation "202001-008"
