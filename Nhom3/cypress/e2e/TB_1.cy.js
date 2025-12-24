describe('TB_1 - Drag and Drop Circles (using plugin)', () => {

    it('TB_1 - Drag circles in order: Red -> Blue -> Green', () => {

        cy.visit('/drag-and-drop-circles');
        const items = [
            "#source .red",
            "#source .blue",
            "#source .green"
        ];

        const target = "#target";

        const dataTransfer = new DataTransfer();

        for (let i = 0; i < items.length; i++) {

            cy.get(items[i])
                .should("be.visible")
                .trigger("dragstart", { dataTransfer });

            cy.get(target)
                .trigger("drop", { dataTransfer })
                .trigger("dragend", { dataTransfer });

        }


        cy.get('#target').children().should('have.length', 3);

        cy.get('#target').children().eq(0).should('have.class', 'red');
        cy.get('#target').children().eq(1).should('have.class', 'blue');
        cy.get('#target').children().eq(2).should('have.class', 'green');
    });


});
