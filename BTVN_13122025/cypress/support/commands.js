Cypress.Commands.add('verifyInputByLabel', (label, value) => {
  cy.contains('label', label)
    .parents('.oxd-input-group')
    .find('input')
    .should('have.value', value);
}); //command sử dụng cho việc xác minh các trường đã hiển thị đúng thông tin hay chưa ở bài 15


