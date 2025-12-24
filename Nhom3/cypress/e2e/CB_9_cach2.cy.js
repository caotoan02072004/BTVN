describe("CB_9 dùng should ", () => {
    it.only("CB_9-Enable/Disable", () => {
        cy.visit('/dynamic-controls');
        const inputBox = () => cy.get("#input-example");

        //Click Enable
        inputBox().contains("button", "Enable").click();

        //  Chờ cho đến khi quá trình tải hoàn tất.
        inputBox().find("#loading").should("not.be.visible");

        // Check input = enabled 
        inputBox()
            .find('input[type="text"]')
            .should("be.enabled");

        // Click Disable
        inputBox().contains("button", "Disable").click();

        // Wait loading invisible and check disabled
        inputBox().find("#loading").should("not.be.visible");

        inputBox()
            .find('input[type="text"]')
            .should("be.disabled");
    });
});