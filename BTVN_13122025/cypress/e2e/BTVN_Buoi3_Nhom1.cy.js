/// <reference types="cypress" />


const depositMoney = (amount) => { // helper cho bài 11,12,13
    cy.contains('button', 'Deposit').click();
    cy.get('input[type="number"]').clear().type(amount);
    cy.get('button[type="submit"]').click();

};
const withdrawMoney = (amount) => {
    cy.contains('button', 'Withdrawl').click();
    cy.contains('label', 'Amount to be Withdrawn')
        .parent('.form-group')
        .find('input[type="number"]')
        .clear()
        .type(amount);
    cy.get('button[type="submit"]').click();

};

describe('Câu 1 đến câu 9', () => {
    it('CB_1 - Truy cập demoqa.com hiển thị card Elements', () => {
        cy.visit('https://demoqa.com/');
        cy.get('.card.mt-4.top-card .card-body').first().should('have.text', 'Elements');
    });
    it('CB_2 - Điền form Text Box demoqa thành công', () => {
        cy.visit('https://demoqa.com/text-box');
        cy.get('#userName').type('Nguyen Van A');
        cy.get('#userEmail').type('test@gmail.com');
        cy.get('#currentAddress').type('123 ABC Street');
        cy.get('#permanentAddress').type('456 XYZ Street');
        cy.get('#submit').click();
        cy.get('#output').should('be.visible');
        cy.get('#output #name').should('contain.text', 'Nguyen Van A');
        cy.get('#output #email').should('contain.text', 'test@gmail.com');
        cy.get('#output #currentAddress').should('contain.text', '123 ABC Street');
        cy.get('#output #permanentAddress').should('contain.text', '456 XYZ Street');
    });
    it('CB_3 - Login thành công', () => {
        cy.visit('https://the-internet.herokuapp.com/login');
        cy.get('#username').type('tomsmith');
        cy.get('#password').type('SuperSecretPassword!');
        cy.get('button[type="submit"]').click();
        cy.get('#flash').should('contain.text', 'You logged into a secure area!');
        cy.get('a[href="/logout"]').should('be.visible');
    });
    it('CB_4 - Login thất bại - sai password', () => {
        cy.visit('https://the-internet.herokuapp.com/login');
        cy.get('#username').type('tomsmith');
        cy.get('#password').type('wrongpass');
        cy.get('button[type="submit"]').click();
        cy.get('#flash').should('be.visible').and('contain.text', 'Your password is invalid!');
        cy.url().should('include', '/login');
    });
    it('CB_5 - Tìm kiếm sản phẩm trên Demo Web Shop', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('#small-searchterms').type('computer');
        cy.get('input[value="Search"]').click();
        cy.get('.product-grid').should('contain', 'computer');
        cy.get('.product-item').should('have.length.greaterThan', 0);
    });
    it('CB_6 - Thêm sản phẩm vào giỏ hàng', () => {
        cy.visit('https://demowebshop.tricentis.com/apparel-shoes');
        cy.get('.cart-qty').should('contain.text', '(0)');
        cy.get('.product-title a[href="/blue-jeans"]').click();
        cy.get('input#add-to-cart-button-36').click();
        cy.get('.content').should('contain.text', 'The product has been added to your shopping cart');
        cy.get('.cart-qty').should('contain.text', '(1)');
    });
    it('TB_7 - API Testing', () => {
        cy.request('https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('userId', 1);
                expect(response.body).to.have.property('title');
                expect(response.body).to.have.property('body');
            });
    });
    it('TB_8 Upload file', () => {
        cy.visit('https://the-internet.herokuapp.com/upload');
        cy.get('#file-upload').click();
        cy.get("input[type=file]").attachFile("example.txt");
        cy.get('#file-submit').click();
        cy.get('#content').should('contain', 'File Uploaded!').and('contain', 'example.txt');
    });

    it('TB_9 Mua hàng thất bại vì không chọn điều khoản', () => {
        cy.visit("https://demowebshop.tricentis.com/apparel-shoes");
        cy.get(".ico-login").click();
        cy.get("#Email").type("autotest_teca@gmail.com");
        cy.get("#Password").type("12345@");
        cy.get('[value="Log in"]').click();
        cy.get("#small-searchterms").type("Build your own expensive computer");
        cy.get('[value="Search"]').click();
        cy.get('[value="Add to cart"]').click().click();
        cy.get("#topcartlink", { timeout: 90000 }).click();
        cy.contains("Shopping cart").click();
        cy.get("#checkout").click();
        cy.contains("Please accept the terms of service before the next step.").should("be.visible");
    });
});
describe('Câu 10 đến câu 13', () => {
    beforeEach(() => {
        cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
        cy.get('button').contains('Customer Login').click();
        cy.get('#userSelect').select('Harry Potter');
        cy.get('button').contains('Login').click();
    });
    it('TB_10 Login với customer thành công', () => {
        cy.url().should('include', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/account');
        cy.contains('Welcome Harry Potter !!').should('be.visible');
        cy.contains('Account Number : 1004 , Balance : 0 , Currency : Dollar').should('be.visible');
    });
    it('TB_11 Gửi tiền vào tài khoản', () => {
        depositMoney(500); //dùng helper
        cy.contains('Deposit Successful').should('be.visible');
        cy.contains('Balance : 500').should('be.visible');
        cy.contains('button', 'Deposit').should('have.class', 'btn-primary');
    });
    it('TB_12 Rút tiền từ tài khoản', () => {
        depositMoney(500);
        withdrawMoney(300);
        cy.contains('Transaction successful').should('be.visible');
        cy.contains('Balance : 200').should('be.visible');
        cy.contains('button', 'Withdrawl').should('have.class', 'btn-primary');
    });
    it('TB_13 Xem lịch sử giao dịch', () => {
        depositMoney(500);
        withdrawMoney(300);
        cy.wait(1000);
        cy.contains('button', 'Transactions').click();
        cy.get('table tbody tr')
            .should('have.length', 2);
        //Xác minh đúng số tiền giao dịch
        cy.contains('td', 'Credit')
            .parent('tr')
            .within(() => {
                cy.contains('td', '500').should('be.visible');
            });
        cy.contains('td', 'Debit')
            .parent('tr')
            .within(() => {
                cy.contains('td', '300').should('be.visible');
            });
    });
});
describe('Câu 14 đến câu 15', () => {
    it('TB_14 Hoàn thành đăng ký', () => {
        cy.visit('https://demoqa.com/automation-practice-form', {
            timeout: 120000,
            failOnStatusCode: false
        }); //API load lâu nên phải chờ
        cy.get('#firstName').type('John');
        cy.get('#lastName').type('Doe');
        cy.get('#userEmail').type('john.doe@test.com');
        cy.get('label[for="gender-radio-1"]').click();
        cy.get('#userNumber').type('0987654321');
        cy.get('#dateOfBirthInput').type('15 May 1990{enter}');
        cy.get('#subjectsContainer').click().type('Maths{enter}').type('Physics{enter}').type('Computer Science{enter}');
        cy.get('label[for="hobbies-checkbox-1"]').click();
        cy.get('label[for="hobbies-checkbox-3"]').click();
        cy.get('#currentAddress').type('123 Test Street, Hanoi');
        cy.get('#state').click();
        cy.get('.css-1n7v3ny-option').contains('NCR').click();
        cy.get('#city').click();
        cy.get('.css-1n7v3ny-option').contains('Delhi').click();
        cy.get('#uploadPicture').click();
        cy.get("input[type=file]").attachFile("test_img.jpg");
        cy.get('#submit').click();
        cy.contains('Thanks for submitting the form').should('be.visible');
        cy.contains('tr', 'Student Name').should('contain.text', 'John Doe');
    });
    it('TB_15 Cập nhật thông tin liên hệ', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click();
        cy.get('.oxd-main-menu-item').contains('My Info').click();
        cy.get('.orangehrm-tabs-item').contains('Contact Details').click();
        cy.contains('label', 'Street 1')
            .parents('.oxd-input-group')
            .find('input')
            .clear()
            .type('123 Test St');
        cy.contains('label', 'Mobile')
            .parents('.oxd-input-group')
            .find('input')
            .clear()
            .type('0901234567');
        cy.contains('label', 'Work Email')
            .parents('.oxd-input-group')
            .find('input')
            .clear()
            .type('test@email.com');
        cy.get('button').contains(' Save ').click();
        cy.get('.oxd-toast-container').should("contain.text", "Successfully Updated");
        cy.verifyInputByLabel('Street 1', '123 Test St'); //dùng command để tối ưu code
        cy.verifyInputByLabel('Mobile', '0901234567');
        cy.verifyInputByLabel('Work Email', 'test@email.com');
    });

})
