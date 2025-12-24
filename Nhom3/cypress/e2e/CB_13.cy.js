describe('Geolocation - Where Am I', () => {
    it('CB_13 Allow geolocation and verify city', () => {

        cy.visit('/geolocation', {
            onBeforeLoad(win) {
                cy.stub(win.navigator.geolocation, 'getCurrentPosition')
                    .callsFake((cb) => {
                        return cb({
                            coords: {
                                latitude: 21.028511,
                                longitude: 105.804817
                            }
                        });
                    });
            }
        });
        cy.get('#geoBtn').click();

        cy.contains('City:', { timeout: 10000 })
            .should('be.visible')
            .and('contain.text', 'Unknown');
    });
});