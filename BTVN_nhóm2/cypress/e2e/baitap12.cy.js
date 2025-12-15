/// <reference types="cypress" />

describe("TB_12 - Kiểm tra giá trị Age của Ashton Cox", () => {

  beforeEach(() => {
    cy.visit("https://datatables.net/examples/data_sources/dom");
  });
  it("Tìm Ashton Cox và đọc cột Age", () => {
    cy.get('input[type="search"]').type("Ashton Cox");
    cy.get('#example tbody tr').contains('Ashton Cox').parent('tr').within(() => {
      cy.get('td').eq(3).invoke('text').then(age => {
        cy.log("Tuổi của Ashton Cox là: " + age);
        expect(age.trim()).to.equal(age); 
      });
    });
  });
});
