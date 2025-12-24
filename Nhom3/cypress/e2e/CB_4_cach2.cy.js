describe('CB_4 dùng for', () => {
    it('CB_4 should click yellow button 10 times with redirect wait', () => {
        cy.visit('/challenging-dom');

        for (let i = 0; i < 10; i++) {
            cy.log(`Clicking yellow button - Attempt ${i + 1}/10`);

            cy.get('.btn-warning')
                .should('be.visible')
                .click();

            cy.url().should('include', '/challenging-dom');

            cy.get('table').should('be.visible');

            cy.wait(1000);
        }
    });
});

