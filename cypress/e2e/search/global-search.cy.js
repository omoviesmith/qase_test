const { qase } = require('cypress-qase-reporter/mocha');

describe('Global search and navigation', () => {
  beforeEach(function () {
    if (!Cypress.env('userEmail') || !Cypress.env('userPassword') || !Cypress.env('userMfaSecret')) {
      this.skip();
    }

    cy.loginAs('admin');
  });

  it(qase(69, 'Global search finds project by name'), () => {
    cy.visit('/dashboard');

    cy.get('input[placeholder*="Search projects"]').clear().type('Qase');
    cy.contains(Cypress.env('projectName'), { timeout: 15000 }).should('be.visible');
  });

  it(qase(71, 'Dashboard stale count regression check'), () => {
    cy.visit('/dashboard');

    cy.contains(/Active Projects/i).should('be.visible');
    cy.contains(/Translation Memories/i).should('be.visible');
    cy.contains(/Term Bases/i).should('be.visible');
    cy.contains(/Total Segments/i).should('be.visible');
    cy.contains(Cypress.env('projectName'), { timeout: 15000 }).should('be.visible');
  });
});
