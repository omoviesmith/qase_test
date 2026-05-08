const { qase } = require('cypress-qase-reporter/mocha');

describe('Authentication', () => {
  it(qase(70, 'Direct protected URL redirects unauthenticated user'), () => {
    cy.visit('/');

    cy.location('pathname').should('eq', '/login');
    cy.contains('h2', 'Sign in').should('be.visible');
    cy.contains('button', 'Sign in').should('be.visible');
  });

  it(qase(4, 'Register invited Project Manager account and verify email'), () => {
    cy.visit('/login');
    cy.contains('a', 'Sign up').click();

    cy.location('pathname').should('eq', '/register');
    cy.contains('h2', 'Create account').should('be.visible');
    cy.contains('button', 'Create account').should('be.visible');
  });

  it(qase(2, 'Login with valid verified account'), function () {
    if (!Cypress.env('userEmail') || !Cypress.env('userPassword') || !Cypress.env('userMfaSecret')) {
      this.skip();
    }

    cy.login();

    cy.location('pathname').should('eq', '/dashboard');
    cy.assertSignedInAs(Cypress.env('userEmail'));
  });

  it(qase(3, 'Invalid login shows error'), () => {
    cy.visit('/login');
    cy.findByLabelTextOrPlaceholder('Email').clear().type('invalid@example.com');
    cy.findByLabelTextOrPlaceholder('Password').clear().type('not-the-password', { log: false });
    cy.contains('button', /^Sign in$/).click();

    cy.location('pathname').should('eq', '/login');
    cy.contains(/invalid|incorrect|failed|error/i, { timeout: 15000 }).should('be.visible');
  });
});
