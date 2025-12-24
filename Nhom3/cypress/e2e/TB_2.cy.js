
describe("TB _2 test description", () => {
    const name = "dodo";
    const number = {
        numberValid: "012-3456789",
        numberInvalid: "abc",
    };

    const form = {
        contactName: '[name="ContactName"]',
        contactNumber: '[name="contactnumber"]',
        pickDate: '[name="pickupdate"]',
        paymentMethod: '[name="payment"]',
        submit: '[type="submit"]',
    };

    const register = (name, number, date, payment) => {
        cy.get(form.contactName).clear().type(name);
        cy.get(form.contactNumber).clear().type(number);
        cy.get(form.pickDate).clear().type(date);
        cy.get(form.paymentMethod).select(payment);
        cy.get(form.submit).click();
    };

    beforeEach(() => {
        cy.visit('/form-validation');
    });

    it("Tiêu đề", () => {
        //tiêu đề
        cy.contains(
            "h1",
            "Form Validation page for Automation Testing Practice"
        ).should("be.visible");
    });

    it("name", () => {
        cy.get("#validationCustom01")
            .clear()
            .type(name + "{enter}");
        cy.get(".valid-feedback")
            .should("be.visible")
            .and("contain.text", "Looks good!");
    });

    it.only("số k hợp lệ", () => {
        cy.get("#validationCustom05").type(number.numberInvalid + "{enter}");
        cy.contains(
            ".invalid-feedback",
            "Please provide your Contact number."
        ).should("be.visible");
        cy.get("#validationCustom05").should(
            "have.css",
            "border-color",
            "rgb(220, 53, 69)"
        );
        cy.get("#validationCustom05")
            .should("have.css", "background-image")
            .and("include", "data:image/svg+xml")
            .and("include", "%23dc3545");
    });

    it("số hợp lệ", () => {
        cy.get("#validationCustom05").type(number.numberValid + "{enter}");
        cy.get("#validationCustom05")
            .siblings(".invalid-feedback")
            .should("not.be.visible");
    });

    it("ngày tháng", () => {
        cy.get('[name="pickupdate"]').type("2025-02-11");
        cy.get('[type="submit"]').click();
        cy.contains("Please provide valid Date.").should("not.be.visible");
    });

    it("option", () => {
        cy.get('[name="payment"]').select("card");
    });

    it("Đăng nhập lỗi", () => {
        register(name, number.numberInvalid, "2025-02-11", "card");
        cy.contains("Please provide your Contact number.").should("be.visible");
        // vẫn ở lại trang form
        cy.url().should("include", "form-validation");
    });

    it("đăng nhập thành công", () => {
        register(name, number.numberValid, "2025-02-11", "card");
        cy.contains("Thank you for validating your ticket").should("be.visible");
    });
});
