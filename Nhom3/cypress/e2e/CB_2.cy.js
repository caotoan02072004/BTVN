
describe('CB_2 Truy vấn các element thông qua các dạng locator', () => {
    beforeEach(() => {
        cy.visit('/locators');
    });
    it('1. getByRole: Ở phần getByRole: tìm nút "Contact" bằng thuộc tính role', () => {
        cy.get('[role="link"]')
            .contains(/contact/i)
            .should("be.visible");
    });
    it('2. getByText: Tìm phần tử chứa text “Hot Deal: Buy 1 Get 1 Free” ', () => {
        cy.findByText("🔥 Hot Deal: Buy 1 Get 1 Free").should("be.visible");
    });
    it('3.Tìm 2 input theo label', () => {
        cy.findByLabelText('Choose a country').should("be.visible");
        cy.findByLabelText('Email for newsletter').should("be.visible");
    });
    it('4. getByPlaceHolder: Tìm input có placeholder là "Search the site"', () => {
        cy.findByPlaceholderText("Search the site").should("be.visible");
        cy.get('[placeholder="Search the site"]').should("be.visible");
    });
    it('5. getByAltText: Tìm phần tử ảnh có mô tả là "User avatar"', () => {
        cy.findByAltText("User avatar").should("be.visible");
        cy.get('[alt="User avatar"]').should("be.visible");
    });
    it('6. getByTitle: Tìm phần tử có tooltip là "Settings panel"', () => {
        cy.findByTitle("Settings panel").should("be.visible");
        cy.get('[title="Settings panel"]').should("be.visible");
    });
    it('7. getByTestId: Tìm phần tử có thuộc tính data-testid là "status-message" và "user-name"', () => {
        cy.findByTestId("status-message").should("be.visible");
        cy.get('[data-testid="status-message"]').should("be.visible");

        cy.findByTestId("user-name").should("be.visible");
        cy.get('[data-testid="user-name"]').should("be.visible");

    });
    it('8. Tìm phần tử có Legacy class .legacy-target', () => {
        cy.get('.legacy-css').should('be.visible');
    });
    it('9. Tìm phần tử theo XPath – List: Sử dụng XPath đếm số <li> trong #tasks (kỳ vọng 3).', () => {
        cy.xpath('//ul[contains(@class, "legacy-list")]/li')
            .should("have.length", 3);
    });
    it('10. Lấy stock và sum', () => {
        cy.xpath('//tr[td[1][contains(text(),"Headphones")]]/td[3]')
            .invoke("text")
            .then((stock) => {
                expect(Number(stock.trim())).to.equal(12);
            });

        cy.xpath('//tr[td[2][contains(text(),"Available")]]/td[3]')
            .then(($cells) => {
                let total = 0;
                $cells.each((i, el) => {
                    total += Number(el.innerText.trim());
                });
                expect(total).to.equal(17);  // 12 + 5
            });
    });
});
