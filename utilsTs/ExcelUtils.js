const ExcelJs = require("exceljs");

async function WriteExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    
    try {
        await workbook.xlsx.readFile(filePath);
        const workSheet = workbook.getWorksheet('Sheet1');
        if (!workSheet) {
            console.log('La hoja "Sheet1" no existe.');
            return;
        }

        const output = await readExcel(workSheet, searchText);
        if (output.row !== -1 && output.column !== -1) {
            const cell = workSheet.getCell(output.row, output.column + change.colChange);
            cell.value = replaceText;
            await workbook.xlsx.writeFile(filePath);
            console.log(`Celda modificada: (${output.row}, ${output.column + change.colChange})`);
        } else {
            console.log('No se encontró el texto buscado en el Excel.');
        }
    } catch (error) {
        console.log(`Error al manejar el archivo Excel: ${error.message}`);
    }
}

async function readExcel(workSheet, searchText) {
    let output = { row: -1, column: -1 };
    try {
        workSheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === searchText) {
                    output.row = rowNumber;
                    output.column = colNumber;
                }
            });
        });
    } catch (error) {
        console.log(`Error al leer el Excel: ${error.message}`);
    }
    return output;
}


module.exports = {WriteExcelTest}
