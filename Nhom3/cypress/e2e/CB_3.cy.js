
describe('CB_3 Dùng stub', () => {

    it('CB_3 Attach click handler to shadow button and verify alert', () => {

        cy.visit('/shadowdom');

        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.window().then((win) => {

            const shadowBtn =
                win.document
                    .querySelector('#shadow-host')
                    .shadowRoot
                    .querySelector('#my-btn');

            shadowBtn.addEventListener('click', () => {
                win.alert('OK');
            });
        });

        cy.get('#shadow-host')
            .shadow()
            .find('#my-btn')
            .click();

        cy.wrap(alertStub).should('have.been.calledOnceWith', 'OK');
    });

});
