
describe('TB6 dùng stub', () => {

    it('TB_6 Get number drawn on canvas', () => {

        cy.visit('/challenging-dom', {
            onBeforeLoad(win) {

                // Spy vào fillText
                cy.stub(win.CanvasRenderingContext2D.prototype, 'fillText')
                    .as('fillText');
            }
        });

        // Đảm bảo canvas đã render
        cy.get('#canvas').should('exist');

        // Lấy text đã được vẽ lên canvas
        cy.get('@fillText').then(stub => {

            // Lấy argument đầu tiên của lần gọi cuối
            const text = stub.lastCall.args[0];
            // Ví dụ: "Answer: 99900"

            cy.log(`Canvas text: ${text}`);

            // Tách số
            const number = text.match(/\d+/)[0];

            cy.log(`Extracted number: ${number}`);

            expect(number).to.match(/^\d+$/);
        });
    });

});
