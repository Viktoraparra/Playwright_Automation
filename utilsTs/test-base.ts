// const { base } = require("@playwright/test");

import {test as baseTest} from "@playwright/test";

interface TestDataForOrder{
    username : string;
    password : string;
    productName : string;
    countryId: string;
    country: string;
};

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>
({
    testDataForOrder:{
        username : "viksparra@gmail.com",
        password : "G34d26X99",
        productName : "ZARA COAT 3",
        countryId: "ind",
        country: "India"
      }
})