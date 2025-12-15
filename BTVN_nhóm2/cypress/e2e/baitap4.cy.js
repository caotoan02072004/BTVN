/// <reference types="cypress" />
describe("CB_3 - Login thất bại", () => {
  beforeEach(() => {
    cy.log("Bước 1: Truy cập trang Login");
    cy.visit("https://the-internet.herokuapp.com/login");
  });
  it("Đăng nhập thành công với user hợp lệ", () => {
    cy.log("Bước 2: Điền Username");
    cy.get("#username").type("tomsmith");
    cy.log("Bước 3: Điền Password");
    cy.get("#password").type("wrongpass");
    cy.log("Bước 4: Click Login");
    cy.get("button[type='submit']").click();
    cy.log("Bước 5: Kiểm tra thông báo thành công");
    cy.get("#flash", { timeout: 10000 }).should("be.visible")
      .and("contain.text", "Your password is invalid!");
      // vẫn ở trang login
      cy.log("Bước 6: Kiểm tra vẫn ở trang Login");
      cy.url().should("include", "/login");
  });
});
