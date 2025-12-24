describe('CB_3 Bài cơ bản 3 dùng theo cách event handler', () => {
    it('CB_3 Thực hiện các thao tác', () => {
        cy.visit('/shadowdom');
        cy.contains("This button is inside a Shadow DOM.", { includeShadowDom: true })
            .click()

        cy.on('window:alert', (text) => {
            expect(text).to.eq('OK');

        })
    })
});
