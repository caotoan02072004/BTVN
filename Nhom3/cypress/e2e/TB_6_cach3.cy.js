describe("TB6 dùng OCR", () => {
  it("TB_6 Đọc chữ từ element", () => {
    cy.visit('/challenging-dom'); 

    const screenshotName = `example_${Date.now()}`;

    // Chụp ảnh element
    cy.get("#canvas").screenshot(screenshotName);

    // Đường dẫn ảnh
    const imgPath = `cypress/screenshots/${screenshotName}.png`;

    // Gọi task OCR
    cy.task("ocr", { imagePath: imgPath }).then((text) => {
      cy.log("Số:", text);
    });
  });
});