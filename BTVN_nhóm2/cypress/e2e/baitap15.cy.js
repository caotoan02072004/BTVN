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
    // 1. Login
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    // Verify login success
    cy.url().should("include", "/dashboard");

    // 2. Vào My Info
    cy.contains("My Info").click();

    // 3. Chuyển tab Contact Details
    cy.contains("Contact Details").click();

    // 4. Hàm điền input theo label
    const fillInput = (labelText, value) => {
      cy.contains("label", labelText)
        .parents(".oxd-input-group")
        .find("input")
        .clear()
        .type(value);
    };

    fillInput("Street 1", contactData.street1);
    fillInput("Street 2", contactData.street2);
    fillInput("City", contactData.city);
    fillInput("State/Province", contactData.state);
    fillInput("Zip/Postal Code", contactData.zip);
    fillInput("Mobile", contactData.mobile);
    fillInput("Work", contactData.work);
    fillInput("Work Email", contactData.workEmail);
    fillInput("Other Email", contactData.otherEmail);

    // 5. Chọn Country (dropdown custom của OrangeHRM)
    cy.contains("label", "Country")
      .parents(".oxd-input-group")
      .find(".oxd-select-text")
      .click();

    cy.get(".oxd-select-dropdown")
      .contains(".oxd-select-option", contactData.country)
      .click();

    // 6. Save
    cy.contains("button", "Save").click();

    // 7. Verify message Successfully Updated
    cy.contains("Successfully Updated").should("be.visible");

    // 8. Verify dữ liệu
    cy.contains("label", "Street 1")
      .parents(".oxd-input-group")
      .find("input")
      .should("have.value", contactData.street1);

    cy.contains("label", "City")
      .parents(".oxd-input-group")
      .find("input")
      .should("have.value", contactData.city);

    cy.contains("label", "Mobile")
      .parents(".oxd-input-group")
      .find("input")
      .should("have.value", contactData.mobile);
  });
});
