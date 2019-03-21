const pdfMakePrinter = require('pdfmake/src/printer');

const fontDescriptors = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};

export const generatePdf = (docDefinition, callback) => {
    try {
        const printer = new pdfMakePrinter(fontDescriptors);
        const doc = printer.createPdfKitDocument(docDefinition);

        let chunks = [];

        doc.on('data', (chunk) => {
            chunks.push(chunk);
        });

        doc.on('end', () => {
            callback(Buffer.concat(chunks));
        });

        doc.end();

    } catch (err) {
        throw (err);
    }
}

export const generatePdfContent = (externalDataRetrievedFromServer) => {
    console.log(externalDataRetrievedFromServer);


    function buildTableBody(data, columns) {
        var body = [];
        var headers = [{
            hora: { text: 'Intervalo', style: 'tableHeader', alignment: 'center', bold: true, margin: [8, 2, 8, 2], fillColor: '#CCCCCC' },
            curso: { text: 'Curso', style: 'tableHeader', alignment: 'center', bold: true, margin: [8, 2, 8, 2], fillColor: '#CCCCCC' },
            profesor: { text: 'Profesor que falta', style: 'tableHeader', alignment: 'center', bold: true, margin: [8, 2, 8, 2], fillColor: '#CCCCCC' },
            nuevoProfesor: { text: 'Profesor que sustituye', style: 'tableHeader', alignment: 'center', bold: true, margin: [8, 2, 8, 2], fillColor: '#CCCCCC' }
        }]

        headers.forEach(row => {
            var headerRow = [];
            columns.forEach(col => headerRow.push(row[col]))
            body.push(headerRow);
        })

        data.forEach((row) => {
            var dataRow = [];
            columns.forEach((column) => dataRow.push(row[column].toString()))
            body.push(dataRow);
        });

        return body;
    }

    function table(data, columns) {
        return {
            style: { alignment: 'center' },
            table: {
                headerRows: 1,
                widths: [70, 100, '*', '*'],
                body: buildTableBody(data, columns)
            }
        };
    }

    return {
        pageOrientation: 'portrait',
        content: [
            { text: ['Sustituciones del día'], alignment: 'center', bold: true, fontSize: 24 },
            table(externalDataRetrievedFromServer, ['hora', 'curso', 'profesor', 'nuevoProfesor'])
        ]
    }
}