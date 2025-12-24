describe("CB_8 dùng should", () => {
  it("CB_8-Remove/Checkbox ", () => {
    cy.visit('/dynamic-controls');
    const box = () => cy.get("#checkbox-example");

    // Click "Remove"
    box().within(() => {
      cy.contains("button", /^Remove$/).click();
    });

    // Chờ xử lý async xong: loading biến mất + message xuất hiện
    box().find("#loading").should("not.be.visible");      // loading ẩn khỏi DOM
    box().find("#message").should("be.visible");         // có message báo kết quả

    //  Kiểm tra checkbox được xóa chưa
    box().find('input[type="checkbox"]').should("not.exist");

    // Click "Add"
    box().within(() => {
      cy.contains("button", /^Add$/).click();
    });

    // Chờ async xong
    box().find("#loading").should("not.be.visible");
    box().find("#message").should("be.visible");

    //  Kiểm tra checkbox được thêm lại chưa
    box().find('input[type="checkbox"]').should("exist").and("be.visible");
  });
});