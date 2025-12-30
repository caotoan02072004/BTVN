/// <reference types="cypress" />

describe("TB_12 - Kiểm tra Age của Ashton Cox", () => {
  it("Đọc Age", () => {
    cy.visit("https://datatables.net/examples/data_sources/dom");
    cy.get('input[type="search"]').type("Ashton Cox");
    cy.get('#example tbody tr')
      .contains('Ashton Cox')
      .parents('tr')
      .find('td:nth-child(4)')
      .invoke('text')
      .then(age => {
        cy.log('Tuổi của Ashton Cox là: ' + age.trim());
        expect(age.trim()).to.equal('66');
      });
  });
});
