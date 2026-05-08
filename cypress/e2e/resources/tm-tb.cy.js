const { qase } = require('cypress-qase-reporter/mocha');

describe('Translation Memory and Term Base', () => {
  beforeEach(function () {
    if (!Cypress.env('userEmail') || !Cypress.env('userPassword') || !Cypress.env('userMfaSecret')) {
      this.skip();
    }

    cy.loginAs('admin');
  });

  it(qase(41, 'Create Translation Memory'), () => {
    cy.visit('/tm');

    cy.contains('h1', 'Translation Memories').should('be.visible');
    cy.contains('Qase Test TM').should('be.visible');
    cy.contains('en').should('be.visible');
    cy.contains('es').should('be.visible');
    cy.contains('button', 'Upload TMX').should('be.visible');
  });

  it(qase(42, 'Create Term Base'), () => {
    cy.visit('/tb');

    cy.contains('h1', 'Term Bases').should('be.visible');
    cy.contains('Qase Test Term Base').should('be.visible');
    cy.contains('en').should('be.visible');
    cy.contains('es').should('be.visible');
    cy.contains('button', 'Upload TBX').should('be.visible');
  });

  it(qase(43, 'Attach writable TM to project'), () => {
    cy.openProjectByName();
    cy.contains('button', 'Resources').click();

    cy.contains('Qase Test TM').should('be.visible');
    cy.contains('(Writable)').should('be.visible');
  });

  it(qase(44, 'Attach Term Base to project'), () => {
    cy.openProjectByName();
    cy.contains('button', 'Resources').click();

    cy.contains('Qase Test Term Base').should('be.visible');
  });
});
