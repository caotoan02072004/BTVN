/// <reference types="cypress" />
describe("Lấy URL trang chủ DemoQA", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
  });

  it("CB_1 - Truy cập trang chủ thành công", () => {
    // Kiểm tra URL đúng
    cy.url().should("eq", "https://demoqa.com/");
    // Kiểm tra card "Forms" hiển thị
    cy.contains(".card-body", "Forms").should("be.visible"); /// 
  });

});
