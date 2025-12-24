describe('CB_8 dùng timeout', () => {
    it('CB_8 Remove and add checkbox successfully', () => {
        cy.visit('/dynamic-controls');
        cy.contains('button', 'Remove').click();
        cy.get('#checkbox', { timeout: 10000 }).should('not.exist');
        cy.get('#message').should('have.text', "It's gone!");
        cy.contains('button', 'Add').click();
        cy.get('#checkbox', { timeout: 10000 }).should('exist');
        cy.get('#message').should('have.text', "It's back!");
    });
});