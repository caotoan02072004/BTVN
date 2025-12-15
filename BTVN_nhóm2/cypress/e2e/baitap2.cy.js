/// <reference types="cypress" />
describe("CB_2 - Kiểm tra nhập form hoàn tất", () => {
  beforeEach(() => {
    cy.log(" Truy cập trang Text Box");
    cy.visit("https://demoqa.com/text-box");
  });

  it("Điền form và kiểm tra kết quả", () => {
    cy.log(" Điền Full Name");
    cy.get("#userName").type("Nguyen Van B");

    cy.log(" Điền Email");
    cy.get("#userEmail").type("testb@gmail.com");

    cy.log(" Điền Current Address");
    cy.get("#currentAddress").type("123 ABC Street");

    cy.log(" Điền Permanent Address");
    cy.get("#permanentAddress").type("456 XYZ Street");

    cy.log(" Click nút Submit");
    cy.get("#submit").click({ force: true });

    cy.log("Kiểm tra khối kết quả xuất hiện");
    cy.get("#output").should("be.visible");

    cy.log(" Kiểm tra Full Name hiển thị đúng");
    cy.get("#output #name").should("contain.text", "Nguyen Van B");

    cy.log(" Kiểm tra Email hiển thị đúng");
    cy.get("#output #email").should("contain.text", "testb@gmail.com");

    cy.log(" Kiểm tra Current Address hiển thị đúng");
    cy.get("#output #currentAddress").should("contain.text", "123 ABC Street");

    cy.log(" Kiểm tra Permanent Address hiển thị đúng");
    cy.get("#output #permanentAddress").should("contain.text", "456 XYZ Street");
  });
});
