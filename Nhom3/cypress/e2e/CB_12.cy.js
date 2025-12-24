describe('New Window page', () => {
    it('CB_12 Find text on new window page', () => {
        cy.visit('/windows');

        cy.contains('a', 'Click Here')
            .invoke('removeAttr', 'target')
            .click();

        cy.contains(
            'Example of a new window page for Automation Testing Practice',
            { timeout: 10000 }
        ).should('be.visible');
    });
});