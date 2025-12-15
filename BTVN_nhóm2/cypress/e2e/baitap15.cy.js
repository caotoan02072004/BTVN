describe("TB_15 - Update Contact Details", () => {
  const contactData = {
    street1: "123 Test St",
    street2: "123 Test St",
    city: "hhh",
    state: "Test State",
    zip: "12345",
    mobile: "0901234567",
    work: "112-898-7612",
    workEmail: "test@email.com",
    otherEmail: "other@email.com",
    country: "United States"
  };

  it("User can update contact information successfully", () => {
    // Login
    cy.loginOrangeHRM("Admin", "admin123");

    // My Info → Contact Details
    cy.contains("My Info").click();
    cy.contains("Contact Details").click();

    // Fill form
    cy.fillInputByLabel("Street 1", contactData.street1);
    cy.fillInputByLabel("Street 2", contactData.street2);
    cy.fillInputByLabel("City", contactData.city);
    cy.fillInputByLabel("State/Province", contactData.state);
    cy.fillInputByLabel("Zip/Postal Code", contactData.zip);
    cy.fillInputByLabel("Mobile", contactData.mobile);
    cy.fillInputByLabel("Work", contactData.work);
    cy.fillInputByLabel("Work Email", contactData.workEmail);
    cy.fillInputByLabel("Other Email", contactData.otherEmail);

    cy.selectDropdownByLabel("Country", contactData.country);

    // Save
    cy.contains("button", "Save").click();

    // Verify
    cy.contains("Successfully Updated").should("be.visible");

    
  });
});
