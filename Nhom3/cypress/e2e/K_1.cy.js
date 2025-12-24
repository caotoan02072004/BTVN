describe('K_1 Dùng cywindow', () => {
    it('K_1 Spin and click correct color on first try', () => {

        cy.visit('/color-wheel', {
            onBeforeLoad(win) {
                Object.defineProperty(win, '__getColorSelected', {
                    get() {
                        return win.eval('colorSelected');
                    }
                });
            }
        });

        cy.window()
            .its('__getColorSelected')
            .should('be.a', 'string')
            .then(color => {
                cy.log('Correct color:', color);

                cy.get('#answers')
                    .contains('button', new RegExp(`^${color}$`, 'i'))
                    .click();
            });

        cy.get('#result')
            .should('not.contain.text', 'Incorrect');
    });
});