describe("TB_3 dùng intercept", () => {
    // code here
    it("TB_3 Test description", () => {
        cy.intercept("GET", "/slow-external").as("slowTask");
        // code here
        cy.visit('/slow');
        cy.wait("@slowTask");
        cy.contains("The slow task has finished. Thanks for waiting!").should(
            "be.visible"
        );
    });
});