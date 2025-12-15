/// <reference types="cypress" />

describe("TB_13 - Kiểm tra và xử lý text trong iframe", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/iframe");
  });

<<<<<<<

=======
  it("Xóa text cũ và nhập 'Hello Cypress'", () => {
    cy.get('#mce_0_ifr').then($iframe => {
  const body = $iframe.contents().find('body');
  // Set body là editable nếu chưa có
  cy.wrap(body)
    .invoke("attr", "contenteditable", "true")
    .invoke("removeClass", "mce-content-readonly");
  // Truy cập element typeable trong body và type
  cy.wrap(body)
    .find('p')         // TinyMCE mặc định có <p>
    .clear()
    .type("Hello Cypress");
  // Assert
  cy.wrap(body).should('contain.text', 'Hello Cypress');
});
>>>>>>> daf9c158c7cb514446c286e09bd83566556c0367
  });
});
