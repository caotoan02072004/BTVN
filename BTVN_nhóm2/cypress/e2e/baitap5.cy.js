describe("CB_5 - Tìm kiếm sản phẩm", () => {

  // Bỏ qua lỗi uncaught exception nếu có
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.log("Bước 1: Truy cập trang Demo Web Shop");
    cy.visit("https://demowebshop.tricentis.com/");
  });

  it("Tìm kiếm sản phẩm với từ khóa 'computer'", () => {
    const keyword = "computer";

    cy.log("Bước 2: Nhập từ khóa vào ô Search");
    cy.get("input#small-searchterms").type(keyword);

    cy.log("Bước 3: Click nút Search");
    cy.get("input.button-1.search-box-button").click();

    cy.log("Bước 4: Kiểm tra danh sách kết quả tìm kiếm");
    cy.get(".product-item").should("have.length.greaterThan", 0);

    cy.log("Bước 5: Kiểm tra mỗi sản phẩm có chứa từ khóa 'computer'");
    cy.get(".product-item").each(($el) => {
      cy.wrap($el)
        .find("h2.product-title")
        .invoke("text")
        .should("match", new RegExp(keyword, "i"));
    });
  });
});
