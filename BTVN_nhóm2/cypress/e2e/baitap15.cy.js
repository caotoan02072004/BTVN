describe("TB_15 - Update Contact Details", () => {
  const contactData = {
    street1: "123 Test St",
    mobile: "0901234567",
    workEmail: "test@email.com",
  };
  it("User can update contact information successfully", () => {
    // Login
    cy.loginOrangeHRM("Admin", "admin123");
    // My Info → Contact Details
    cy.contains("My Info").click();
    cy.contains("Contact Details").click();
    // Fill form
    cy.fillInputByLabel("Street 1", contactData.street1);
    cy.fillInputByLabel("Work Email", contactData.workEmail);
    cy.fillInputByLabel("Mobile", contactData.mobile);
    // Save
    cy.contains("button", "Save").click();
    // Verify
    cy.contains("Successfully Updated").should("be.visible");
    
  });
});
