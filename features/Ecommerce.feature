Feature: Ecommerce validation

    Scenario: Placing the Order
        Given a login to Ecommerce application with "viksparra@gmail.com" and "G34d26X99"
        When Add "ZARA COAT 3" to Cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and place the Order
        Then Verify order is present in the OrderHistory