describe("TB_8 - Upload file", () => {

  // Bỏ qua lỗi uncaught exception nếu có
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.log("Bước 1: Truy cập trang Upload")
    cy.visit("https://the-internet.herokuapp.com/upload");
  });

  it("Upload file example.txt thành công", () => {
    const fileName = "example.txt";

    cy.log("Bước 2: Chọn file để upload");
    cy.get("input#file-upload").attachFile(fileName);

    cy.log("Bước 3: Click nút Upload");
    cy.get("input#file-submit").click();

    cy.log("Bước 4: Kiểm tra thông báo 'File Uploaded!'");
    cy.contains("h3", "File Uploaded!").should("be.visible");

    cy.log("Bước 5: Kiểm tra tên file xuất hiện trên trang");
    cy.get("#uploaded-files").should("contain.text", fileName);
  });
});
