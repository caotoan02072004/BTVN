/// <reference types="cypress" />
describe("CB_6 - Thêm sản phẩm vào giỏ hàng qua thanh tìm kiếm", () => {
  it("Tìm kiếm 'Blue Jeans' và thêm vào giỏ hàng", () => {
     cy.log("Bước 1: Truy cập trang Demo Web Shop");
    cy.visit("https://demowebshop.tricentis.com/");
    const productName = "Blue Jeans";
    cy.log("Bước 2: Nhập từ khóa vào thanh Search");
    cy.get("input#small-searchterms").type(productName);

    cy.log("Bước 3: Click nút Search");
    cy.get("input.button-1.search-box-button").click();

    cy.log(`Bước 4: Click vào sản phẩm '${productName}' trong kết quả tìm kiếm`);
    cy.contains(".product-title a", productName).click();

    cy.log("Bước 5: Click nút 'Add to cart'");
    cy.get("input#add-to-cart-button-36").click(); // Kiểm tra ID thực tế trong DOM

    cy.log("Bước 6: Kiểm tra thông báo thêm sản phẩm thành công");
    cy.get(".bar-notification.success")
      .should("be.visible")
      .and("contain.text", "The product has been added to your shopping cart");

    cy.log("Bước 7: Kiểm tra số lượng giỏ hàng tăng lên 1");
    cy.get(".cart-qty")
      .should("contain.text", "(1)");
  });
});
