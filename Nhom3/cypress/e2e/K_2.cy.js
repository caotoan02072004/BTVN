
describe("K_2 Dùng theo cách IMAP", () => {
  // code here
  it("K_2Test description", () => {
    // code here
    cy.visit("/otp-login");
    cy.get("#email").type("nguyencaotoan534@gmail.com");
    cy.get("#btn-send-otp").click();

    cy.task("getOtp").then((otp) => {
      expect(otp).to.not.be.null;
      cy.get("#otp").type(otp);
    });
    cy.get("#btn-send-verify").click();
    cy.contains("Logout").should("exist");
  });
});
