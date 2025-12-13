describe("CB_3 - Login thành công", () => {

  // Bỏ qua lỗi uncaught exception từ trang nếu có
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.log("Bước 1: Truy cập trang Login");
    cy.visit("https://the-internet.herokuapp.com/login");
  });

  it("Đăng nhập thành công với user hợp lệ", () => {
    cy.log("Bước 2: Điền Username");
    cy.get("#username").type("tomsmith");
    cy.log("Bước 3: Điền Password");
    cy.get("#password").type("SuperSecretPassword!");
    cy.log("Bước 4: Click Login");
    cy.get("button[type='submit']").click();
    cy.log("Bước 5: Kiểm tra thông báo thành công");
    cy.get("#flash", { timeout: 10000 }).should("be.visible")
      .and("contain.text", "You logged into a secure area!");
    cy.log("Bước 6: Kiểm tra nút Logout xuất hiện");
    cy.get("a.button", { timeout: 10000 }).should("be.visible")
      .and("contain.text", "Logout");
  });
});
