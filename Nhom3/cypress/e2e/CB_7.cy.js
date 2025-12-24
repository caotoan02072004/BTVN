describe('Horizontal Slider', () => {
    it('CB_7Set slider to 3 (trigger events)', () => {
        cy.visit('/horizontal-slider');

        cy.get('input[type="range"]').then(($el) => {
            const el = $el[0];

            el.value = '3';

            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        });

        cy.get('#range', { timeout: 10000 }).should('have.text', '3');
    });
});