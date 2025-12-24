describe('TB_6 Dùng Canvas API Monkey Patching', () => {
    it('TB_6Lấy số answer từ canvas bằng JS', () => {
        cy.visit('/challenging-dom', {
            onBeforeLoad(win) {
                const originalFillText = win.CanvasRenderingContext2D.prototype.fillText;
                win.CanvasRenderingContext2D.prototype.fillText = function (text, x, y) {
                    win.__canvasText = text;
                    return originalFillText.call(this, text, x, y);
                };
            }
        });

        cy.window().then(win => {
            cy.log(`Canvas text: ${win.__canvasText}`);
        });
    });
})