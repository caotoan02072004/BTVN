/// <reference types="cypress" />
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