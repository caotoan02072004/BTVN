describe('CB_4 dùng count ', () => {
    it('CB_4 - Click yellow button 10 times with wait for reload', () => {

        cy.visit('/challenging-dom');
        const clickYellow = (count) => {

            if (count <= 0) return;

            cy.get('.btn.btn-warning.mb-2')
                .should('be.visible')
                .click();

            cy.get('table')
                .should('be.visible')
                .then(() => {
                    clickYellow(count - 1);
                });
        };

        clickYellow(10);

    });
});
