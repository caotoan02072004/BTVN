describe('TB_5Challenging DOM - Get table data as array of objects', () => {

    it('TB_5 - Extract table data', () => {
        cy.visit('/challenging-dom');

        const tableData = [];
        cy.get('table thead th').then($headers => {

            const headers = [...$headers]
                .map(h => h.innerText.trim())
                .filter(h => h !== 'Action');

            cy.get('.table tbody tr').each($row => {

                const rowObj = {};

                cy.wrap($row)
                    .find('td')
                    .each(($cell, index) => {
                        if (index < headers.length) {
                            rowObj[headers[index]] = $cell.text().trim();
                        }
                    })
                    .then(() => {
                        tableData.push(rowObj);
                    });

            }).then(() => {

                // ✅ LOG ĐÚNG CHỖ
                cy.log(JSON.stringify(tableData, null, 2));

                // ✅ ASSERT ĐÚNG CHỖ
                expect(tableData.length).to.be.gt(0);

            });
        });

    });

});