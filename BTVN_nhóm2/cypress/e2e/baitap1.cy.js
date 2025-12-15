/// <reference types="cypress" />
describe("Lấy URL trang chủ DemoQA", () => {
  it("CB_1 - Truy cập trang chủ thành công", () => {
    // Kiểm tra URL đúng
      cy.visit("https://demoqa.com/");
    cy.url().should("eq", "https://demoqa.com/");
    // Kiểm tra card "Forms" hiển thị
    cy.contains(".card-body", "Forms").should("be.visible"); /// 
  });

});
