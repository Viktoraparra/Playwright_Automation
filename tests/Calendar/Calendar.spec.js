const { test, expect } = require("@playwright/test");

test("@Web Handling Calendar", async ({ page }) => {
    const month = '6';
    const date = '15';
    const year = '2027';
    const expectedList =[month, date, year]
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.getByText(year).click();

    await page.locator('.react-calendar__year-view__months__month').nth(month-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    const inputs = page.locator('.react-date-picker__inputGroup input');

    for (let i = 1; i < await inputs.count(); i++) {
        const value = await inputs.nth(i).getAttribute('value');
        console.log(value);
        console.log(expectedList[i-1]);
        await expect(value).toEqual(expectedList[i-1]);
    }
});

async function validateInputs(locator, expectedValues) {
    const inputCount = await locator.count(); // Número de inputs encontrados

    console.log(`Cantidad de inputs: ${inputCount}`);

    for (let i = 1; i < inputCount; i++) { // Comenzamos desde el segundo elemento (índice 1)
        const value = await locator.nth(i).getAttribute('value'); // Obtén el valor del input
        console.log(`Valor del input ${i + 1}: ${value}`);
        console.log(`Valor esperado: ${expectedValues[i - 1]}`); // Ajusta el índice para expectedList
        expect(value).toBe(expectedValues[i - 1]); // Compara con el valor esperado
    }
}