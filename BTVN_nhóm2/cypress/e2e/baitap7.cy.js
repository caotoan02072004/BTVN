/// <reference types="cypress" />
describe("TB_7 - API Testing", () => {
  it("Gửi GET request và kiểm tra response", () => {
    const endpoint = "https://jsonplaceholder.typicode.com/posts/1";

    cy.log("Bước 1: Gửi GET request tới endpoint");
    cy.request("GET", endpoint).then((response) => {
      cy.log("Bước 2: Kiểm tra status code = 200");
      expect(response.status).to.eq(200);

      cy.log("Bước 3: Kiểm tra response body có userId = 1");
      expect(response.body).to.have.property("userId", 1);

      cy.log("Bước 4: Kiểm tra response body có trường 'title' và 'body'");
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("body");
    });
  });
});
