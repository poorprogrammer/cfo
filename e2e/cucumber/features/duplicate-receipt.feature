Feature: Create New Receipt Via Duplication Feature

    Background:
        Given I am logged in

    Scenario: Can create new Receipt by duplicate from existing one
        Given I duplicate receipt "202001-001" to "202001-008" with date "2020-01-01" and items:
            | description     | rate | quantity |
            | Technical coach | 1000 | 12       |
        When I edit receipt "202001-008" with date "2020-01-02" and items:
            | description         | rate | quantity |
            | Fullstack developer | 1000 | 10       |
        Then I should see the receipt at duplicate with number "202001-008" and amount "USD 10,000.00"
        And I cleanup documents with receipt "202001-008"
