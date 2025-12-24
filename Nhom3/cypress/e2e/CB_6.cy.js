describe('Context Menu - Right click shows alert', () => {
    it('CB_6 - Right click on the box and verify alert text', () => {
        cy.visit('/context-menu');

        cy.get('#hot-spot').rightclick();

        cy.on('window:alert', (text) => {
            expect(text).to.eq('You selected a context menu');
        });
    });
});