describe("test description", () => {
    const account = {
        email: "minhmini1253@gmail.com",
        password: "123456",
        name: "test",
    };

    const note = {
        title: "test cypress",
        description: "test cypress description",
    };
    // code here
    it("CB_10 Test description", () => {
        // code here
        cy.visit('/notes/app');
        cy.get('[data-testid="open-register-view"]').click();
        //
        cy.get('[data-testid="register-email"]').type(account.email);
        cy.get('[data-testid="register-password"]').type(account.password);
        cy.get('[data-testid="register-name"]').type(account.name);
        cy.get('[data-testid="register-confirm-password"]').type(account.password);
        cy.get('[data-testid="register-submit"]').click();

        //
        cy.get('[data-testid="login-view"]').click();
        cy.get('[data-testid="login-email"]').type(account.email);
        cy.get('[data-testid="login-password"]').type(account.password);
        cy.get('[data-testid="login-submit"]').click();

        //add
        cy.get('[data-testid="add-new-note"]').click();
        cy.get('[data-testid="note-title"]').type(note.title);
        cy.get('[data-testid="note-description"]').type(note.description);
        cy.get('[data-testid="note-submit"]').click();

        //
        cy.contains(note.title).should("be.visible");

        //xóa
        cy.contains('[data-testid="note-card"]', note.title).within(() => {
            cy.get('[data-testid="note-delete"]').click();
        });

        cy.get('[data-testid="note-delete-confirm"]').click();

        cy.contains(note.title).should("not.exist");
    });
});
