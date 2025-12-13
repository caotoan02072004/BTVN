/// <reference types="cypress" />

describe("TB_10 - Kiểm tra tiến trình Progress Bar", () => {

  Cypress.on("uncaught:exception", () => {
    return false;
  });

  beforeEach(() => {
    cy.log("Bước 1: Truy cập trang Progress Bar");
    cy.visit("https://demoqa.com/progress-bar");
  });

  it("Thanh tiến trình chạy đến 100%", () => {

    cy.log("Bước 2: Nhấn nút Start");
    cy.get("#startStopButton").click();

    cy.log("Bước 3: Chờ progress chạy đến 100%");
    cy.get(".progress-bar", { timeout: 20000 })
      .should("have.attr", "aria-valuenow", "100")
      .and("contain.text", "100%");

   cy.get(".progress-bar", { timeout: 20000 }) // timeout đủ dài để chạy hết
  .should("have.attr", "aria-valuenow", "100") // kiểm tra giá trị 100%
  .and("contain.text", "100%"); // kiểm tra chữ hiển thị
  });
});
