describe("TB_4 Find value 48.48 in table", () => {
    it("TB_4Scroll and find the cell with text 48.48", () => {
        cy.visit('/large');

        // Scroll đến cell
        cy.contains("td", "48.48")
            .scrollIntoView({ duration: 10000 }) // cuộn xuống vị trí thật
            .should("be.visible").click(); // xác nhận cell hiển thị và click vào
    });
});