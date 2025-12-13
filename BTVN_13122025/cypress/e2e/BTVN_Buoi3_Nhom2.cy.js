/// <reference types="cypress" />

describe('BTVN', () => {
   it('CB_1 - Truy cập trang chủ thành công', () => {
      cy.visit('https://demoqa.com/');
      cy.get('.card.mt-4.top-card .card-body').eq(1).should('have.text', 'Forms');
   });
   it('CB_2 - Kiểm tra nhập form hoàn tất', () => {
      cy.visit('https://demoqa.com/text-box');
      cy.get('#userName').type('Nguyen Van B');
      cy.get('#userEmail').type('testb@gmail.com');
      cy.get('#currentAddress').type('123 ABC Street');
      cy.get('#permanentAddress').type('456 XYZ Street');
      cy.get('#submit').click();
      cy.get('#output').should('be.visible');
      cy.get('#output #name').should('contain.text', 'Nguyen Van B');
      cy.get('#output #email').should('contain.text', 'testb@gmail.com');
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
      cy.get('#flash').should('contain.text', 'Your password is invalid!');
      cy.location('pathname').should('eq', '/login');
   });
   it('CB_5 - Tìm kiếm sản phẩm ', () => {
      cy.visit('https://demowebshop.tricentis.com/');
      cy.get('#small-searchterms').type('computer');
      cy.get('input[value="Search"]').click();
      cy.get('.product-item').should('exist');
   });
   it('CB_6 - Thêm sản phẩm vào giỏ hàng', () => {
      cy.visit('https://demowebshop.tricentis.com/apparel-shoes');
      cy.get('.product-title a[href="/blue-jeans"]').click();
      cy.get('input[value="Add to cart"]').first().click();
      cy.get('.content')
         .should('contain.text', 'The product has been added to your shopping cart');
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
      cy.get('#content').should('contain', 'File Uploaded!');
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

   it('TB_10 Kiểm tra tiến trình ', () => {
      cy.visit('https://demoqa.com/progress-bar', {
         timeout: 90000,
         failOnStatusCode: false
      });//API load lâu nên phải chờ
      cy.get('#startStopButton').click();
      cy.get('.progress-bar', { timeout: 20000 })
         .should('contain', '100%');
   });

   it('TB_11 Di chuyển ô vuông vào ô hình chữ nhật', () => {
      cy.visit('https://webdriveruniversity.com/Actions/index.html');
      cy.get('#draggable').drag('#droppable', { force: true });
      cy.get('#droppable').should('contain', 'Dropped!');
   });

   it('TB_12 Kiểm tra giá trị Age', () => {
      cy.visit('https://datatables.net/examples/data_sources/dom');
      cy.get('#dt-search-0').type('Ashton Cox');
      cy.get('#example tbody tr td')
         .eq(3)
         .invoke('text')
         .then(age => cy.log(age));
   });

   it('TB_13 Kiểm tra và xử lý text', () => {
      cy.visit('https://the-internet.herokuapp.com/iframe');
      cy.frameLoaded('#mce_0_ifr');
      cy.iframe('#mce_0_ifr')
         .invoke('attr', 'contenteditable', 'true')
         .clear()
         .type('Hello Cypress');
      cy.iframe('#mce_0_ifr')
         .should('contain.text', 'Hello Cypress');
   });
   it('TB_14 Hoàn thành đăng ký', () => {
      cy.visit('https://demoqa.com/automation-practice-form', {
         timeout: 90000,
         failOnStatusCode: false
      }); //API load lâu nên phải chờ
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#userEmail').type('john.doe@test.com');
      cy.get('label[for="gender-radio-1"]').click();
      cy.get('#userNumber').type('0987654321');
      cy.get('#dateOfBirthInput').type('15 May 1990{enter}');
      cy.get('#subjectsContainer').type('Maths, Physics, Computer Science');
      cy.get('label[for="hobbies-checkbox-1"]').click();
      cy.get('label[for="hobbies-checkbox-3"]').click();
      cy.get('#currentAddress').type('123 Test Street, Hanoi');
      cy.get('#state').click();
      cy.contains('div', 'NCR').click();
      cy.get('#city').click();
      cy.contains('div', 'Delhi').click();
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
