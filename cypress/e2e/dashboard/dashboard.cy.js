const { qase } = require('cypress-qase-reporter/mocha');

describe('Dashboard workflows', () => {
  beforeEach(function () {
    if (!Cypress.env('userEmail') || !Cypress.env('userPassword') || !Cypress.env('userMfaSecret')) {
      this.skip();
    }

    cy.loginAs('admin');
  });

  it(qase(10, 'Dashboard displays organization summary metrics'), () => {
    cy.visit('/dashboard');

    cy.contains('h1', 'Dashboard').should('be.visible');
    cy.contains('Qase Test Org').should('be.visible');
    cy.contains(/Active Projects/i).should('be.visible');
    cy.contains(/Translation Memories/i).should('be.visible');
    cy.contains(/Term Bases/i).should('be.visible');
    cy.contains(/Total Segments/i).should('be.visible');
    cy.contains('Overall Progress').should('be.visible');
    cy.contains('Segment Status').should('be.visible');
  });

  it(qase(11, 'Dashboard metric cards navigate to feature pages'), () => {
    cy.visit('/dashboard');

    cy.contains('a', /Active Projects/i).click();
    cy.location('pathname').should('eq', '/projects');

    cy.visit('/dashboard');
    cy.contains('a', /Translation Memories/i).click();
    cy.location('pathname').should('eq', '/tm');

    cy.visit('/dashboard');
    cy.contains('a', /Term Bases/i).click();
    cy.location('pathname').should('eq', '/tb');

    cy.visit('/dashboard');
    cy.contains('a', /Total Segments/i).click();
    cy.location('pathname').should('eq', '/analytics');
  });

  it(qase(12, 'Recent projects links open project detail'), () => {
    cy.visit('/dashboard');

    cy.contains('a', Cypress.env('projectName'), { timeout: 15000 }).click();
    cy.contains('h1', Cypress.env('projectName')).should('be.visible');
    cy.location('pathname').should('include', '/projects/');
  });

  it(qase(13, 'Recent activity records key actions'), () => {
    cy.visit('/dashboard');

    cy.contains('Recent Activity').should('be.visible');
    cy.contains(/created|uploaded|translated|reviewed|attached/i, { timeout: 15000 }).should('be.visible');
  });
});
