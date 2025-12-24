describe('CB_5', () => {

    beforeEach(() => {
        cy.visit('/js-dialogs');
    });

    it('TC01 - Alert - Click OK', () => {
        cy.get('#js-alert').click();

        cy.on('window:alert', (text) => {
            expect(text).to.contains('I am a Js Alert');
        });

        // cy.contains('Click for JS Alert').click();

        cy.get('#dialog-response')
            .should('have.text', 'OK');
    });

    it('TC02 - Prompt - Input text successfully', () => {

        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('Nhập liệu thành công');
        });

        cy.get('#js-prompt').click();

        cy.get('#dialog-response')
            .should('have.text', 'Nhập liệu thành công');
    });
    it('TC03 - Confirm - Click Cancel', () => {

        cy.on('window:confirm', () => false);

        cy.get('#js-confirm').click();

        cy.get('#dialog-response')
            .should('have.text', 'Cancel');
    });

});