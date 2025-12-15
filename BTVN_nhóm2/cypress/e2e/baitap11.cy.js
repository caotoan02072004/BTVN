/// <reference types="cypress" />
describe("TB_11 - Kéo ô vuông vào ô hình chữ nhật", () => {
  beforeEach(() => {
    cy.visit("https://webdriveruniversity.com/Actions/index.html");
  });
  it('TB_11 Di chuyển ô vuông vào ô hình chữ nhật', () => {
      cy.visit('https://webdriveruniversity.com/Actions/index.html');
      cy.get('#draggable').drag('#droppable', { force: true });
      cy.contains("DROP HERE!").should('not.exist');
      cy.get('#droppable').should('contain', 'Dropped!');
   })
});
