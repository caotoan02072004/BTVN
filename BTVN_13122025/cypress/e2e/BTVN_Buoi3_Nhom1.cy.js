/// <reference types="cypress" />


const depositMoney = (amount) => { // helper cho bài 11,12,13
    cy.contains('button', 'Deposit').click();
    cy.get('input[type="number"]').clear().type(amount);
    cy.get('button[type="submit"]').click();

};
const withdrawMoney = (amount) => { // helper cho bài 11,12,13
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
        cy.contains(".card-body", "Elements").should("be.visible");
    });
    it('CB_2 - Điền form Text Box demoqa thành công', () => {
        cy.visit('https://demoqa.com/text-box');
        cy.get('#userName').type('Nguyen Van A');
        cy.get('#userEmail').type('test@gmail.com');
        cy.get('#currentAddress').type('123 ABC Street');
        cy.get('#permanentAddress').type('456 XYZ Street');
        cy.get('#submit').click();
        cy.get('#output #name').should('contain.text', 'Name:Nguyen Van A');
        cy.get('#output #email').should('contain.text', 'Email:test@gmail.com');
        cy.get('#output #currentAddress').should('contain.text', 'Current Address :123 ABC Street');
        cy.get('#output #permanentAddress').should('contain.text', 'Permananet Address :456 XYZ Street');
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
        const email = "autotest_teca@gmail.com";
        const password = "12345@";
        const productName = "Build your own expensive computer";

        cy.log("Bước 1: Truy cập trang Demo Web Shop");
        cy.visit("https://demowebshop.tricentis.com/apparel-shoes");

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
        const student = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@test.com",
            gender: "Male",
            mobile: "0987654321",
            dob: {
                day: "15",
                month: "May",
                year: "1990"
            },
            subjects: ["Maths", "Physics", "Computer Science"],
            hobbies: ["Sports", "Music"],
            address: "123 Test Street, Hanoi",
            state: "NCR",
            city: "Delhi",
            file: "example.txt"
        };
        cy.visit("https://demoqa.com/automation-practice-form");
        // Điền thông tin cơ bản
        cy.get("#firstName").type(student.firstName);
        cy.get("#lastName").type(student.lastName);
        cy.get("#userEmail").type(student.email);
        cy.contains('label', student.gender).click();
        cy.get("#userNumber").type(student.mobile);

        // Date of Birth
        cy.get("#dateOfBirthInput").click();
        cy.get(".react-datepicker__month-select").select(student.dob.month);
        cy.get(".react-datepicker__year-select").select(student.dob.year);
        cy.get(`.react-datepicker__day--0${student.dob.day}`).not('.react-datepicker__day--outside-month').click();

        // Subjects
        student.subjects.forEach(subject => {
            cy.get("#subjectsInput").type(subject).type('{enter}');
        });

        // Hobbies
        student.hobbies.forEach(hobby => {
            cy.contains('label', hobby).click();
        });

        // Upload file (cần plugin cypress-file-upload)
        cy.get('#uploadPicture').attachFile(student.file);

        // Address
        cy.get("#currentAddress").type(student.address);

        // State & City
        cy.get("#state").click();
        cy.contains("div", student.state).click();
        cy.get("#city").click();
        cy.contains("div", student.city).click();

        // Submit form
        cy.get("#submit").click();

        // Kiểm tra popup hiển thị
        cy.get(".modal-content").should("be.visible");
        cy.contains(".modal-title", "Thanks for submitting the form").should("exist");

        // Kiểm tra Student Name hiển thị đúng
        cy.get("td")
            .contains("Student Name")
            .siblings("td")
            .should("have.text", `${student.firstName} ${student.lastName}`);
    });
    it('TB_15 Cập nhật thông tin liên hệ', () => {
        const contactData = {
            street1: "123 Test St",
            mobile: "0901234567",
            workEmail: "test@email.com",
        };
        // 1. Login
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        cy.get('[name="username"]').type("Admin");
        cy.get('[name="password"]').type("admin123");
        cy.get('button[type="submit"]').click();

        // Verify login success
        cy.url().should("include", "/dashboard");

        // 2. Vào My Info
        cy.contains("My Info").click();

        // 3. Chuyển tab Contact Details
        cy.contains("Contact Details").click();

        // 4. Hàm điền input theo label
        const fillInput = (labelText, value) => {
            cy.contains("label", labelText)
                .parents(".oxd-input-group")
                .find("input")
                .clear()
                .type(value);
        };

        fillInput("Street 1", contactData.street1);
        fillInput("Mobile", contactData.mobile);
        fillInput("Work Email", contactData.workEmail);

        // 5. Save
        cy.contains("button", "Save").click();

        // 6. Verify message Successfully Updated
        cy.contains("Successfully Updated").should("be.visible");

        // 7. Verify dữ liệu
        cy.verifyInputByLabel('Street 1', contactData.street1); //dùng command để tối ưu code
        cy.verifyInputByLabel('Mobile', contactData.mobile);
        cy.verifyInputByLabel('Work Email', contactData.workEmail);
    });

})
