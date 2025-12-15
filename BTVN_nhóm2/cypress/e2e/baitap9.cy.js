/// <reference types="cypress" />
describe("TB_9 - Mua hàng thất bại vì không chọn điều khoản", () => {

  Cypress.on("uncaught:exception", () => false);

  const email = "autotest_teca@gmail.com";
  const password = "12345@";
  const productName = "Build your own expensive computer";

  beforeEach(() => {
    cy.log("Bước 1: Truy cập trang Demo Web Shop");
    cy.visit("https://demowebshop.tricentis.com/");
  });

  it("Checkout thất bại khi không chọn điều khoản", () => {

    // ===== LOGIN =====
    cy.log("Bước 2: Click Login");
    cy.get(".ico-login").click();

    cy.log("Bước 3: Nhập Email & Password");
    cy.get("#Email").type(email);
    cy.get("#Password").type(password);

    cy.log("Bước 4: Click Login");
    cy.get("input.login-button").click();

    cy.log("Bước 5: Xác nhận đăng nhập thành công");
    cy.get(".account").should("contain.text", email);

    // ===== SEARCH =====
    cy.log("Bước 6: Nhập từ khóa tìm kiếm");
    cy.get("#small-searchterms").type(productName);

    cy.log("Bước 7: Click Search");
    cy.get("input.search-box-button").click();

    cy.log("Bước 8: Click sản phẩm trong kết quả");
    cy.contains(".product-title a", productName).click();

    // ===== ADD TO CART =====
    cy.log("Bước 9: Thêm sản phẩm vào giỏ hàng");
    cy.get("input[id^='add-to-cart-button']")
      .first()
      .click();

    cy.get(".bar-notification.success")
      .should("be.visible")
      .and("contain.text", "The product has been added to your shopping cart");

    // Đóng notification
    cy.get(".bar-notification.success .close").click();

    // ===== CART =====
    cy.log("Bước 10: Vào Shopping Cart");
    cy.get(".cart-qty").click();

    // ===== CHECKOUT (KHÔNG TICK TERMS) =====
    cy.log("Bước 11: Click Checkout (không tick điều khoản)");
    cy.get("#checkout").click();

    // ===== VERIFY =====
    cy.log("Bước 12: Kiểm tra alert yêu cầu chọn điều khoản");

    cy.on("window:alert", (alertText) => {
      expect(alertText).to.contain(
        "Please accept the terms of service before the next step."
      );
    });
  });
});
