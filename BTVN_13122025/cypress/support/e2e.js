import 'cypress-file-upload';
import '@4tw/cypress-drag-drop';
import 'cypress-iframe';
import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
