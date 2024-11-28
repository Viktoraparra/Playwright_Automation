const { test, expect } = require("@playwright/test");
const { WriteExcelTest } = require("../../utils/ExcelUtils");
const path = require("path");
const fs = require("fs");

test('Upload and Download excel validation',async ({page})=>{
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name:'Download'}).click();
    const download = await downloadPromise;

    const downloadPath = path.resolve('/Users/victorparrapineda/Downloads', 'download.xlsx');
    await download.saveAs(downloadPath);

    WriteExcelTest('Mango',350,{rowChange:0,colChange:2},downloadPath);
    if (!fs.existsSync(downloadPath)) {
        throw new Error(`El archivo modificado no existe en la ruta: ${downloadPath}`);
    }
    await page.locator('#fileinput').click();
    //ONLY work wwith component type="file" won't work Request Dev to place the type work
    await page.locator('#fileinput').setInputFiles(downloadPath);
    const successMsg = await page.locator("[class='Toastify__toast Toastify__toast-theme--light Toastify__toast--success Toastify__toast--close-on-click']");
    await expect(successMsg).toBeVisible();

    const textLocator = page.getByText(textSearch);
    const desirerow = await page.getByRole('row').filter({has: textLocator});
    await expect(desirerow.locator('#cell-4-undefined')).toContainText(updateValue);
})