const { qase } = require('cypress-qase-reporter/mocha');

describe('Document workflows', () => {
  beforeEach(function () {
    if (!Cypress.env('userEmail') || !Cypress.env('userPassword') || !Cypress.env('userMfaSecret')) {
      this.skip();
    }

    cy.loginAs('admin');
    cy.openProjectByName();
  });

  it(qase(22, 'Assignment modal lists document roles'), () => {
    cy.contains(Cypress.env('documentName'), { timeout: 15000 }).should('be.visible');
    cy.contains(Cypress.env('documentName')).then(($documentName) => {
      cy.wrap($documentName)
        .parents()
        .filter((_, element) => Cypress.$(element).find('button').length > 0)
        .first()
        .find('button')
        .last()
        .click();
    });

    cy.get('[class*="fixed"][class*="inset-0"]').last().within(() => {
      cy.contains(/assign|assignment/i).should('be.visible');
      cy.contains('Translator').should('be.visible');
      cy.contains('Reviewer 1').should('be.visible');
      cy.contains(/Movie Smith|You|Unassigned/).should('be.visible');
    });
  });

  it(qase(25, 'Document assignment filters return matching documents'), () => {
    cy.get('select[aria-label="Filter documents by assignment"], select').first().select('All documents');
    cy.contains(Cypress.env('documentName')).should('be.visible');

    cy.get('select[aria-label="Filter documents by assignment"], select').first().select('Assigned as Translator');
    cy.contains(Cypress.env('documentName')).should('be.visible');
  });

  it(qase(40, 'Mark Complete issue regression'), () => {
    cy.contains('a', Cypress.env('documentName')).click();

    cy.contains('h1', Cypress.env('documentName')).should('be.visible');
    cy.contains('Review').should('be.visible');
    cy.contains('button', 'Mark Complete').should('be.visible');
    cy.contains('3/3').should('be.visible');
    cy.contains('Reviewed').should('be.visible');
  });

  it(qase(37, 'Send translated document to review'), () => {
    cy.contains('a', Cypress.env('documentName')).click();

    cy.contains('h1', Cypress.env('documentName')).should('be.visible');
    cy.contains('Review').should('be.visible');
    cy.contains('3/3').should('be.visible');
  });
});
