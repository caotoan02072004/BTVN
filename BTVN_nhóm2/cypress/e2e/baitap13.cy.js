it('Verify text in iframe', () => {
  cy.visit('https://the-internet.herokuapp.com/iframe');

  cy.frameLoaded('#mce_0_ifr');
  cy.iframe('#mce_0_ifr')
    .find('p')
    .should('have.text', 'Your content goes here.');
});
