describe('Flaky Test - reload based', () => {

    beforeEach(() => {
        cy.visit('/flaky-test');
    });
    it.only("CB_11 Should eventually show Success after reloads", { retries: 10 }, () => {
        // cy.visit('https://practice.expandtesting.com/flaky-test');
        cy.contains("Ready")
            .should("exist")
            .should("be.visible")
            .click();
    });
});