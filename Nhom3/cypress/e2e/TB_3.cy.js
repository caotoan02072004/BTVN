describe('TB_3 dùng timeout', () => {

    it('TB_3 - Wait until slow task is completed without using wait(ms)', () => {

        cy.visit('/slow');
        cy.get('.spinner-border[role="status"]')
            .should('be.visible');

        cy.get('.spinner-border[role="status"]', { timeout: 20000 })
            .should('not.exist');

        cy.contains('The slow task has finished. Thanks for waiting!')
            .should('be.visible');
    });

});