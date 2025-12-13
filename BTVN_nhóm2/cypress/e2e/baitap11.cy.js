/// <reference types="cypress" />
describe("TB_11 - Kéo ô vuông vào ô hình chữ nhật", () => {
  beforeEach(() => {
    cy.visit("https://webdriveruniversity.com/Actions/index.html");
  });
  it("Kéo ô 'DRAG ME TO MY TARGET!' vào 'DROP HERE!'", () => {
    cy.log("Bước 1: Xác định phần tử nguồn và mục tiêu");
    const source = cy.contains("DRAG ME TO MY TARGET!");
    cy.contains("DROP HERE!").scrollIntoView(); 
    cy.log("Bước 2: Kéo thả sử dụng trigger mouse events");
    source.trigger("mousedown", { which: 1, force: true });
    cy.contains("DROP HERE!")
      .trigger("mousemove", { force: true })
      .trigger("mouseenter", { force: true })
      .trigger("mouseover", { force: true })
      .trigger("mouseup", { force: true });
    cy.log("Bước 3: Kiểm tra chữ 'Dropped!' xuất hiện");
    cy.contains("Dropped!").should("exist");
  });
});
