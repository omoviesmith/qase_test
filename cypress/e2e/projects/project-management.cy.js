const { qase } = require('cypress-qase-reporter/mocha');

describe('Project management', () => {
  beforeEach(function () {
    if (!Cypress.env('userEmail') || !Cypress.env('userPassword') || !Cypress.env('userMfaSecret')) {
      this.skip();
    }

    cy.loginAs('admin');
  });

  it(qase(15, 'Required project fields are validated'), () => {
    cy.visit('/projects');
    cy.contains('button', 'New Project').click();

    cy.contains('h2', 'Create Project').should('be.visible');
    cy.contains('button', /^Create Project$/).should('be.disabled');

    cy.get('input[placeholder*="Website Localization"]').type('Validation Check Project');
    cy.contains('button', /^Create Project$/).should('be.disabled');
  });

  it(qase(16, 'Filter project list by status'), () => {
    cy.visit('/projects');

    cy.contains('h1', 'Projects').should('be.visible');
    cy.get('select[aria-label="Filter projects by status"], select').first().select('Active');
    cy.contains(Cypress.env('projectName')).should('be.visible');

    cy.get('select[aria-label="Filter projects by status"], select').first().select('All statuses');
    cy.contains(Cypress.env('projectName')).should('be.visible');
  });

  it(qase(17, 'Edit project details as permitted manager'), () => {
    const description = `Black-box exploration project for Cypress and Qase test planning. Run ${Date.now()}`;

    cy.openProjectByName();
    cy.contains('button', 'Settings').click();

    cy.contains('Project Details').should('be.visible');
    cy.get('textarea[placeholder="Optional project description..."]')
      .clear()
      .type(description);
    cy.contains('button', 'Save Changes').click();
    cy.contains(/saved|updated|success/i, { timeout: 15000 }).should('exist');
    cy.get('textarea[placeholder="Optional project description..."]').should('have.value', description);
  });
});
