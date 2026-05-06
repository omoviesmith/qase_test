describe('Authentication', () => {
  it('Redirects unauthenticated users to the login page', () => {
    cy.visit('/');

    cy.location('pathname').should('eq', '/login');
    cy.contains('h2', 'Sign in').should('be.visible');
    cy.contains('button', 'Sign in').should('be.visible');
  });

  it('Displays the account registration form', () => {
    cy.visit('/login');
    cy.contains('a', 'Sign up').click();

    cy.location('pathname').should('eq', '/register');
    cy.contains('h2', 'Create account').should('be.visible');
    cy.contains('button', 'Create account').should('be.visible');
  });

  it('Accepts verified credentials and prompts for MFA setup', function () {
    if (!Cypress.env('userEmail') || !Cypress.env('userPassword')) {
      this.skip();
    }

    cy.login();

    cy.contains('Set up two-factor authentication', { timeout: 15000 }).should('be.visible');
    cy.contains('Enter the 6-digit code from your app').should('be.visible');
  });
});
