describe('CB_9 dùng timeout', () => {
    it('CB_9 Enable and disable input successfully', () => {
        cy.visit('/dynamic-controls');

        const input = '#input-example input';

        cy.contains('button', 'Enable').click();


        cy.get(input, { timeout: 10000 })
            .should('be.enabled');


        cy.get('#message')
            .should('have.text', "It's enabled!");


        cy.contains('button', 'Disable').click();


        cy.get(input, { timeout: 10000 })
            .should('be.disabled');

        cy.get('#message')
            .should('have.text', "It's disabled!");
    });
});