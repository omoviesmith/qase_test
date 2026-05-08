const { qase } = require('cypress-qase-reporter/mocha');

describe('Role-based permissions', () => {
  it(qase(49, 'Project Manager cannot invite Admin'), function () {
    if (!Cypress.env('projectManagerEmail') || !Cypress.env('projectManagerPassword') || !Cypress.env('projectManagerMfaSecret')) {
      this.skip();
    }

    cy.loginAs('projectManager');
    cy.visit('/settings');
    cy.contains('button', 'Invite Member').click();
    cy.findByLabelTextOrPlaceholder('user@example.com').clear().type(`pm-admin-${Date.now()}@example.com`);
    cy.get('select').select('Admin');
    cy.contains('button', 'Send Invitation').click();

    cy.contains('Only admins can invite other admins', { timeout: 15000 }).should('be.visible');
  });

  it(qase(18, 'Project Manager cannot delete project'), function () {
    if (!Cypress.env('projectManagerEmail') || !Cypress.env('projectManagerPassword') || !Cypress.env('projectManagerMfaSecret')) {
      this.skip();
    }

    cy.loginAs('projectManager');
    cy.openProjectByName('PM Permission Test Project');
    cy.contains('button', 'Settings').click();
    cy.contains('button', 'Delete Project').click();
    cy.get('[class*="fixed"][class*="inset-0"] input').clear().type('PM Permission Test Project');
    cy.contains('button', /^Delete$/).click();

    cy.contains('API Error: 403', { timeout: 15000 }).should('be.visible');
    cy.contains('h1', 'PM Permission Test Project').should('be.visible');
  });

  it(qase(61, 'Translator cannot edit document in Review 1 stage'), function () {
    if (!Cypress.env('translatorEmail') || !Cypress.env('translatorPassword') || !Cypress.env('translatorMfaSecret')) {
      this.skip();
    }

    cy.loginAs('translator');
    cy.openProjectByName();
    cy.contains('a', Cypress.env('documentName')).click();

    cy.contains('h1', Cypress.env('documentName')).should('be.visible');
    cy.contains('No reviewer 1 is assigned to this document').should('be.visible');
    cy.contains('Welcome to Termp.').click();
    cy.contains('button', 'Approve').should('not.exist');
    cy.contains('button', 'Confirm').should('not.exist');
  });

  it(qase(67, 'Translator cannot create projects'), function () {
    if (!Cypress.env('translatorEmail') || !Cypress.env('translatorPassword') || !Cypress.env('translatorMfaSecret')) {
      this.skip();
    }

    cy.loginAs('translator');
    cy.visit('/projects');

    cy.contains('button', 'New Project').should('not.exist');
  });

  it(qase(68, 'Translator cannot manage TM/TB resources'), function () {
    if (!Cypress.env('translatorEmail') || !Cypress.env('translatorPassword') || !Cypress.env('translatorMfaSecret')) {
      this.skip();
    }

    cy.loginAs('translator');
    cy.visit('/tm');
    cy.contains('button', 'New TM').should('not.exist');
    cy.contains('button', 'Delete TM').should('not.exist');

    cy.visit('/tb');
    cy.contains('button', 'New Term Base').should('not.exist');
    cy.contains('button', 'Delete Term Base').should('not.exist');
  });
});
