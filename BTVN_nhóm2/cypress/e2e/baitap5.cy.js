/// <reference types="cypress" />
describe("CB_5 - Tìm kiếm sản phẩm", () => {
  it('CB_5 - Tìm kiếm sản phẩm ', () => {
      cy.visit('https://demowebshop.tricentis.com/');
      cy.get('#small-searchterms').type('computer');
      cy.get('input[value="Search"]').click();
      cy.get('.product-item').should('exist');
   });v
    });
  


