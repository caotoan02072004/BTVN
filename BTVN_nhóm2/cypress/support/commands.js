Cypress.Commands.add("fillInputByLabel", (labelText, value) => {
  cy.contains("label", labelText)
    .parents(".oxd-input-group")
    .find("input")
    .clear()
    .type(value);
});
Cypress.Commands.add("selectDropdownByLabel", (labelText, optionText) => {
  cy.contains("label", labelText)
    .parents(".oxd-input-group")
    .find(".oxd-select-text")
    .click();

  cy.get(".oxd-select-dropdown")
    .contains(".oxd-select-option", optionText)
    .click();
});
Cypress.Commands.add("loginOrangeHRM", (username, password) => {
  cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/dashboard");
});
